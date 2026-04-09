import { useDeferredValue, useEffect, useMemo, useState } from "react";

import { FileText, Filter, MessagesSquare, Search, TreePine } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { runKnowledgeDocumentSearch, runKnowledgeSearch } from "@/knowledge/search";
import { statusMeta } from "@/knowledge/presentation";
import { initialSuggestedQuestions, topicMeta, wisdomTree } from "@/knowledge/topics";
import type {
  DocumentSearchResult,
  KnowledgeIndex,
  KnowledgeViewMode,
  ReviewStatus,
  SearchResult,
  TopicId,
} from "@/knowledge/types";

const WissensindexPrototyp = () => {
  const [index, setIndex] = useState<KnowledgeIndex | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<KnowledgeViewMode>("qa");
  const [query, setQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState<TopicId | "alle">("alle");
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | "alle">("alle");

  const [selectedQaSlug, setSelectedQaSlug] = useState<string | null>(null);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    let active = true;

    const loadKnowledge = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await fetch(`${import.meta.env.BASE_URL}knowledge/innovation-fund-index.json`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Wissensindex konnte nicht geladen werden (${response.status}).`);
        }

        const data = (await response.json()) as KnowledgeIndex;
        if (active) {
          setIndex(data);
        }
      } catch (error) {
        if (active) {
          setLoadError(error instanceof Error ? error.message : "Unbekannter Ladefehler");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadKnowledge();

    return () => {
      active = false;
    };
  }, []);

  const qaResults = useMemo(
    () =>
      runKnowledgeSearch({
        query: deferredQuery,
        topicFilter,
        statusFilter,
        index,
      }),
    [deferredQuery, index, statusFilter, topicFilter],
  );

  const docResults = useMemo(
    () =>
      runKnowledgeDocumentSearch({
        query: deferredQuery,
        topicFilter,
        statusFilter,
        index,
      }),
    [deferredQuery, index, statusFilter, topicFilter],
  );

  useEffect(() => {
    if (qaResults.length === 0) {
      setSelectedQaSlug(null);
      return;
    }

    if (!selectedQaSlug || !qaResults.some((result) => result.slug === selectedQaSlug)) {
      setSelectedQaSlug(qaResults[0].slug);
    }
  }, [qaResults, selectedQaSlug]);

  useEffect(() => {
    if (docResults.length === 0) {
      setSelectedDocId(null);
      return;
    }

    if (!selectedDocId || !docResults.some((result) => result.id === selectedDocId)) {
      setSelectedDocId(docResults[0].id);
    }
  }, [docResults, selectedDocId]);

  const selectedQaResult = qaResults.find((result) => result.slug === selectedQaSlug) ?? null;
  const selectedDocResult = docResults.find((result) => result.id === selectedDocId) ?? null;

  const documentMap = useMemo(() => {
    const map = new Map<string, string>();
    index?.documents.forEach((document) => map.set(document.id, document.titel));
    return map;
  }, [index]);

  const sectionCount = useMemo(
    () => index?.documents.reduce((count, document) => count + document.abschnitte.length, 0) ?? 0,
    [index],
  );

  const hasActiveFilters = query.trim().length > 0 || topicFilter !== "alle" || statusFilter !== "alle";

  const applyQuestion = (question: string, topicId?: TopicId) => {
    setViewMode("qa");
    setQuery(question);

    if (topicId) {
      setTopicFilter(topicId);
    }
  };

  const resetFilters = () => {
    setQuery("");
    setTopicFilter("alle");
    setStatusFilter("alle");
  };

  const getQaSourceLabel = (result: SearchResult, sourceId: string) => {
    const title = documentMap.get(sourceId) ?? sourceId;
    const sourceRef = result.answer.quellen.find((source) => source.dokumentId === sourceId);

    if (sourceRef?.seite) {
      return `${title} (Seite ${sourceRef.seite})`;
    }

    return title;
  };

  const getDocTopicLabels = (result: DocumentSearchResult) => {
    if (result.matchedTopicIds.length === 0) {
      return ["Ohne Themenzuordnung"];
    }

    return result.matchedTopicIds.map((topicId) => topicMeta[topicId].label);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="section-padding pt-24 md:pt-32">
        <div className="container mx-auto">
          <header className="mb-8 rounded-3xl border border-border/70 bg-card p-6 shadow-[0_20px_60px_-34px_hsl(222_70%_10%_/_0.45)] md:p-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.26em] text-accent">Wissensindex</p>
            <h1 className="text-2xl font-extrabold text-foreground md:text-4xl">
              Orientierung im Innovationsfonds mit nachvollziehbaren Quellen
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Wir verbinden kuratierte Antworten mit einem transparenten Dokumenten-Explorer. So finden Sie schneller,
              was wirklich gilt: mit Status, Fundstelle und klarer Einordnung.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-border/60 bg-background px-4 py-3">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Dokumente</p>
                <p className="mt-1 text-lg font-bold text-foreground">{index?.documents.length ?? 0}</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-background px-4 py-3">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Abschnitte</p>
                <p className="mt-1 text-lg font-bold text-foreground">{sectionCount}</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-background px-4 py-3">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Verfügbare Antworten</p>
                <p className="mt-1 text-lg font-bold text-foreground">{qaResults.length}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setViewMode("qa")}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
                  viewMode === "qa"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-accent/50 hover:text-accent"
                }`}
              >
                <MessagesSquare size={16} />
                Q&A
              </button>
              <button
                type="button"
                onClick={() => setViewMode("docs")}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
                  viewMode === "docs"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-accent/50 hover:text-accent"
                }`}
              >
                <FileText size={16} />
                Dokumenten-Explorer
              </button>
            </div>
          </header>

          <div className="mb-6 rounded-2xl border border-border/70 bg-card p-5 md:p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_220px] lg:grid-cols-[minmax(0,1fr)_220px_220px_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" size={16} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Suche starten, z. B. 'Welche Unterlagen brauche ich?'"
                  className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-10 text-sm text-foreground outline-none transition-colors focus:border-accent"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-3 text-muted-foreground transition-colors hover:text-foreground"
                    title="Suche leeren"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Thema</label>
                <Select value={topicFilter} onValueChange={(value) => setTopicFilter(value as TopicId | "alle")}>
                  <SelectTrigger className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent">
                    <SelectValue placeholder="Alle Themen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alle">Alle Themen</SelectItem>
                    {Object.entries(topicMeta).map(([topicId, meta]) => (
                      <SelectItem key={topicId} value={topicId}>
                        {meta.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Review-Status</label>
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as ReviewStatus | "alle")}
                >
                  <SelectTrigger className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent">
                    <SelectValue placeholder="Alle Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alle">Alle Status</SelectItem>
                    <SelectItem value="roh">{statusMeta.roh.label}</SelectItem>
                    <SelectItem value="in_review">{statusMeta.in_review.label}</SelectItem>
                    <SelectItem value="freigegeben">{statusMeta.freigegeben.label}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={resetFilters}
                  disabled={!hasActiveFilters}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Filter zurücksetzen
                </button>
              </div>
            </div>
          </div>

          {isLoading && (
            <div className="rounded-2xl border border-border/70 bg-card p-6 text-sm text-muted-foreground">
              Wissensindex wird geladen ...
            </div>
          )}

          {loadError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
              <h3 className="font-semibold text-red-900">Fehler beim Laden des Wissensindex</h3>
              <p className="mt-1 text-red-700">{loadError}</p>
              <p className="mt-3 text-xs text-red-600">
                Bitte laden Sie die Seite neu. Wenn der Fehler bestehen bleibt, kontaktieren Sie uns direkt per E-Mail.
              </p>
            </div>
          )}

          {!isLoading && !loadError && (
            <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
              <aside className="space-y-6">
                <section className="rounded-2xl border border-border/70 bg-card p-5">
                  <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                    <FileText size={16} className="text-accent" />
                    Schnellstart
                  </p>
                  <p className="mb-4 text-xs text-muted-foreground">
                    Nutzen Sie eine Startfrage oder wechseln Sie direkt in den Dokumenten-Explorer.
                  </p>
                  <div className="space-y-2">
                    {initialSuggestedQuestions.map((question) => (
                      <button
                        type="button"
                        key={question}
                        onClick={() => applyQuestion(question)}
                        className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-left text-xs text-foreground transition-colors hover:border-accent/30 hover:text-accent"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl border border-border/70 bg-card p-5">
                  <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                    <TreePine size={16} className="text-accent" />
                    Themenbaum
                  </p>
                  <div className="space-y-4">
                    {wisdomTree.map((node) => (
                      <div key={node.id} className="rounded-xl border border-border/60 bg-background p-4">
                        <p className="text-sm font-bold text-foreground">{node.label}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {node.topics.map((topicId) => (
                            <button
                              type="button"
                              key={`${node.id}-${topicId}`}
                              onClick={() => setTopicFilter(topicId)}
                              className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                            >
                              {topicMeta[topicId].label}
                            </button>
                          ))}
                        </div>
                        <div className="mt-3 space-y-2">
                          {node.fragen.map((question) => (
                            <button
                              type="button"
                              key={`${node.id}-${question}`}
                              onClick={() => applyQuestion(question, node.topics[0])}
                              className="block w-full rounded-lg border border-transparent bg-muted/45 px-3 py-2 text-left text-xs text-foreground transition-colors hover:border-accent/30 hover:bg-muted"
                            >
                              {question}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </aside>

              <section className="space-y-6">
                {viewMode === "qa" ? (
                  <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
                    <div className="rounded-2xl border border-border/70 bg-card p-5">
                      <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Filter size={16} className="text-accent" />
                        Q&A-Ergebnisse ({qaResults.length})
                      </p>

                      {qaResults.length === 0 ? (
                        <p className="rounded-xl border border-border/60 bg-background px-3 py-4 text-sm text-muted-foreground">
                          Keine passenden Antworten gefunden. Bitte Suche oder Filter anpassen.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {qaResults.map((result) => {
                            const status = statusMeta[result.status];

                            return (
                              <button
                                type="button"
                                key={result.slug}
                                onClick={() => setSelectedQaSlug(result.slug)}
                                className={`w-full rounded-xl border px-3 py-3 text-left transition-colors ${
                                  selectedQaSlug === result.slug
                                    ? "border-accent bg-accent/5"
                                    : "border-border/60 bg-background hover:border-accent/40"
                                }`}
                              >
                                <div className="mb-2 flex items-center justify-between gap-2">
                                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                                    {topicMeta[result.topicId].label}
                                  </span>
                                  <span className={`rounded-full border px-2 py-0.5 text-[11px] ${status.className}`}>
                                    {status.label}
                                  </span>
                                </div>
                                <p className="text-sm font-semibold text-foreground">{result.frage}</p>
                                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                  {result.answer.antwort_kurz}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="rounded-2xl border border-border/70 bg-card p-6">
                      {selectedQaResult ? (
                        <div>
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <span className="rounded-full border border-border/70 bg-background px-2.5 py-1 text-xs text-muted-foreground">
                              {topicMeta[selectedQaResult.topicId].label}
                            </span>
                            <span
                              className={`rounded-full border px-2.5 py-1 text-xs ${
                                statusMeta[selectedQaResult.status].className
                              }`}
                            >
                              {statusMeta[selectedQaResult.status].label}
                            </span>
                          </div>

                          <h2 className="text-2xl font-extrabold text-foreground">{selectedQaResult.frage}</h2>
                          <p className="mt-4 text-base font-semibold text-foreground">
                            {selectedQaResult.answer.antwort_kurz}
                          </p>
                          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                            {selectedQaResult.answer.antwort_lang}
                          </p>

                          <div className="mt-6">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Quellen</h3>
                            <ul className="mt-3 space-y-2">
                              {Array.from(
                                new Set(selectedQaResult.answer.quellen.map((source) => source.dokumentId)),
                              ).map((sourceId) => (
                                <li
                                  key={sourceId}
                                  className="rounded-lg border border-border/60 bg-background px-3 py-2 text-sm"
                                >
                                  {getQaSourceLabel(selectedQaResult, sourceId)}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-6">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Fundstellen</h3>
                            <div className="mt-3 space-y-3">
                              {selectedQaResult.snippets.map((snippet) => (
                                <div
                                  key={`${snippet.abschnittId}-${snippet.seite}`}
                                  className="rounded-lg border border-border/60 bg-background px-3 py-3"
                                >
                                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                    {documentMap.get(snippet.dokumentId) ?? snippet.dokumentId} · Seite {snippet.seite}
                                  </p>
                                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{snippet.text}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-xl border border-border/60 bg-background p-4 text-sm text-muted-foreground">
                          Bitte wählen Sie links eine Frage aus, um die Antwortdetails zu sehen.
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
                    <div className="rounded-2xl border border-border/70 bg-card p-5">
                      <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Filter size={16} className="text-accent" />
                        Dokumenttreffer ({docResults.length})
                      </p>

                      {docResults.length === 0 ? (
                        <p className="rounded-xl border border-border/60 bg-background px-3 py-4 text-sm text-muted-foreground">
                          Keine passenden Fundstellen gefunden. Bitte Suche oder Filter anpassen.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {docResults.map((result) => {
                            const status = statusMeta[result.status];

                            return (
                              <button
                                type="button"
                                key={result.id}
                                onClick={() => setSelectedDocId(result.id)}
                                className={`w-full rounded-xl border px-3 py-3 text-left transition-colors ${
                                  selectedDocId === result.id
                                    ? "border-accent bg-accent/5"
                                    : "border-border/60 bg-background hover:border-accent/40"
                                }`}
                              >
                                <div className="mb-2 flex items-center justify-between gap-2">
                                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                                    {result.dokumenttyp}
                                  </span>
                                  <span className={`rounded-full border px-2 py-0.5 text-[11px] ${status.className}`}>
                                    {status.label}
                                  </span>
                                </div>
                                <p className="text-sm font-semibold text-foreground">{result.abschnittTitel}</p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                  {result.dokumentTitel} · Seite {result.seite}
                                </p>
                                <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{result.snippet}</p>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="rounded-2xl border border-border/70 bg-card p-6">
                      {selectedDocResult ? (
                        <div>
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <span className="rounded-full border border-border/70 bg-background px-2.5 py-1 text-xs text-muted-foreground">
                              {selectedDocResult.dokumenttyp}
                            </span>
                            <span
                              className={`rounded-full border px-2.5 py-1 text-xs ${
                                statusMeta[selectedDocResult.status].className
                              }`}
                            >
                              {statusMeta[selectedDocResult.status].label}
                            </span>
                          </div>

                          <h2 className="text-2xl font-extrabold text-foreground">{selectedDocResult.abschnittTitel}</h2>
                          <p className="mt-2 text-sm text-muted-foreground">{selectedDocResult.dokumentTitel}</p>
                          <p className="mt-1 text-sm text-muted-foreground">Seite {selectedDocResult.seite}</p>

                          <div className="mt-6 rounded-xl border border-border/60 bg-background p-4">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Fundstelle</h3>
                            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                              {selectedDocResult.snippet}
                            </p>
                          </div>

                          <div className="mt-6">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Themenbezug</h3>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {getDocTopicLabels(selectedDocResult).map((label) => (
                                <span
                                  key={`${selectedDocResult.id}-${label}`}
                                  className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
                                >
                                  {label}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-6">
                            <button
                              type="button"
                              onClick={() => setViewMode("qa")}
                              className="rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent"
                            >
                              Zur Q&A-Ansicht wechseln
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-xl border border-border/60 bg-background p-4 text-sm text-muted-foreground">
                          Bitte wählen Sie links einen Dokumenttreffer aus, um Details zu sehen.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WissensindexPrototyp;
