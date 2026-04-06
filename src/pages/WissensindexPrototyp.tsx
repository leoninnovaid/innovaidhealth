import { useDeferredValue, useEffect, useMemo, useState } from "react";

import { Search, TreePine, FileText, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { runKnowledgeSearch } from "@/knowledge/search";
import { statusMeta } from "@/knowledge/presentation";
import { initialSuggestedQuestions, topicMeta, wisdomTree } from "@/knowledge/topics";
import type { KnowledgeIndex, ReviewStatus, SearchResult, TopicId } from "@/knowledge/types";

const WissensindexPrototyp = () => {
  const [index, setIndex] = useState<KnowledgeIndex | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState<TopicId | "alle">("alle");
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | "alle">("alle");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    let active = true;

    const loadKnowledge = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await fetch("/knowledge/innovation-fund-index.json", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Index konnte nicht geladen werden (${response.status}).`);
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

  const results = useMemo(
    () =>
      runKnowledgeSearch({
        query: deferredQuery,
        topicFilter,
        statusFilter,
        index,
      }),
    [deferredQuery, index, statusFilter, topicFilter],
  );

  useEffect(() => {
    if (results.length === 0) {
      setSelectedSlug(null);
      return;
    }

    if (!selectedSlug || !results.some((result) => result.slug === selectedSlug)) {
      setSelectedSlug(results[0].slug);
    }
  }, [results, selectedSlug]);

  const selectedResult = results.find((result) => result.slug === selectedSlug) ?? null;
  const documentMap = useMemo(() => {
    const map = new Map<string, string>();
    index?.documents.forEach((doc) => map.set(doc.id, doc.titel));
    return map;
  }, [index]);

  const sectionCount = useMemo(
    () => index?.documents.reduce((count, doc) => count + doc.abschnitte.length, 0) ?? 0,
    [index],
  );

  const applyQuestion = (question: string, topicId?: TopicId) => {
    setQuery(question);
    if (topicId) {
      setTopicFilter(topicId);
    }
  };

  const getSourceLabel = (result: SearchResult, sourceId: string) => {
    const title = documentMap.get(sourceId) ?? sourceId;
    const sourceRef = result.answer.quellen.find((source) => source.dokumentId === sourceId);
    if (sourceRef?.seite) {
      return `${title} (Seite ${sourceRef.seite})`;
    }
    return title;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="section-padding pt-24 md:pt-32">
        <div className="container mx-auto">
          <header className="mb-8 rounded-3xl border border-border/70 bg-card p-6 shadow-[0_20px_60px_-34px_hsl(222_70%_10%_/_0.45)] md:p-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.26em] text-accent">Internes Experiment</p>
            <h1 className="text-2xl font-extrabold text-foreground md:text-4xl">Wissensindex Innovationsfonds</h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Kein Chatbot, sondern ein kuratierter Frage-Antwort-Explorer mit Regel-Matching, Volltext-Fundstellen
              und Review-Status fuer spaetere SEO-Seiten.
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
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Antwortobjekte</p>
                <p className="mt-1 text-lg font-bold text-foreground">{results.length}</p>
              </div>
            </div>
          </header>

          <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
            <aside className="space-y-6">
              <section className="rounded-2xl border border-border/70 bg-card p-5">
                <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                  <TreePine size={16} className="text-accent" />
                  Wisdom Tree
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
                        {node.fragen.map((frage) => (
                          <button
                            type="button"
                            key={`${node.id}-${frage}`}
                            onClick={() => applyQuestion(frage, node.topics[0])}
                            className="block w-full rounded-lg border border-transparent bg-muted/45 px-3 py-2 text-left text-xs text-foreground transition-colors hover:border-accent/30 hover:bg-muted"
                          >
                            {frage}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-border/70 bg-card p-5">
                <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                  <FileText size={16} className="text-accent" />
                  Schnellfragen
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
            </aside>

            <section className="space-y-6">
              <div className="rounded-2xl border border-border/70 bg-card p-5 md:p-6">
                <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px_220px]">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" size={16} />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Frage eingeben, z. B. 'Welche Unterlagen brauche ich?'"
                      className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-10 text-sm text-foreground outline-none transition-colors focus:border-accent"
                    />
                    {query && (
                      <button
                        onClick={() => setQuery("")}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        title="Suche leeren"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-muted-foreground">Themenfilter</label>
                      {topicFilter !== "alle" && (
                        <button 
                          onClick={() => setTopicFilter("alle")}
                          className="text-[10px] text-accent hover:underline"
                        >
                          Zurücksetzen
                        </button>
                      )}
                    </div>
                    <Select
                      value={topicFilter}
                      onValueChange={(value) => setTopicFilter(value as TopicId | "alle")}
                    >
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
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-muted-foreground">Review-Status</label>
                      {statusFilter !== "alle" && (
                        <button 
                          onClick={() => setStatusFilter("alle")}
                          className="text-[10px] text-accent hover:underline"
                        >
                          Zurücksetzen
                        </button>
                      )}
                    </div>
                    <Select
                      value={statusFilter}
                      onValueChange={(value) => setStatusFilter(value as ReviewStatus | "alle")}
                    >
                      <SelectTrigger className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent">
                        <SelectValue placeholder="Alle Stati" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alle">Alle Stati</SelectItem>
                        <SelectItem value="roh">Roh</SelectItem>
                        <SelectItem value="in_review">In Review</SelectItem>
                        <SelectItem value="freigegeben">Freigegeben</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {isLoading && (
                <div className="rounded-2xl border border-border/70 bg-card p-6 text-sm text-muted-foreground">
                  Wissensindex wird geladen...
                </div>
              )}

              {loadError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-900">Fehler beim Laden des Wissensindex</h3>
                      <p className="mt-1 text-red-700">{loadError}</p>
                      <p className="mt-2 text-xs text-red-600">Bitte versuchen Sie, die Seite zu aktualisieren oder kontaktieren Sie den Support.</p>
                    </div>
                  </div>
                </div>
              )}

              {!isLoading && !loadError && (
                <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
                  <div className="rounded-2xl border border-border/70 bg-card p-5">
                    <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Filter size={16} className="text-accent" />
                      Ergebnisliste ({results.length})
                    </p>
                    <div className="space-y-3">
                      {results.map((result) => {
                        const status = statusMeta[result.status];
                        return (
                          <button
                            type="button"
                            key={result.slug}
                            onClick={() => setSelectedSlug(result.slug)}
                            className={`w-full rounded-xl border px-3 py-3 text-left transition-colors ${
                              selectedSlug === result.slug
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
                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{result.answer.antwort_kurz}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-card p-6">
                    {selectedResult ? (
                      <div>
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <span className="rounded-full border border-border/70 bg-background px-2.5 py-1 text-xs text-muted-foreground">
                            {topicMeta[selectedResult.topicId].label}
                          </span>
                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs ${
                              statusMeta[selectedResult.status].className
                            }`}
                          >
                            {statusMeta[selectedResult.status].label}
                          </span>
                        </div>

                        <h2 className="text-2xl font-extrabold text-foreground">{selectedResult.frage}</h2>
                        <p className="mt-4 text-base font-semibold text-foreground">{selectedResult.answer.antwort_kurz}</p>
                        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                          {selectedResult.answer.antwort_lang}
                        </p>

                        <div className="mt-6">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Quellen</h3>
                          <ul className="mt-3 space-y-2">
                            {Array.from(new Set(selectedResult.answer.quellen.map((source) => source.dokumentId))).map(
                              (sourceId) => (
                                <li key={sourceId} className="rounded-lg border border-border/60 bg-background px-3 py-2 text-sm">
                                  {getSourceLabel(selectedResult, sourceId)}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>

                        <div className="mt-6">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Fundstellen</h3>
                          <div className="mt-3 space-y-3">
                            {selectedResult.snippets.map((snippet) => (
                              <div key={`${snippet.abschnittId}-${snippet.seite}`} className="rounded-lg border border-border/60 bg-background px-3 py-3">
                                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                  {documentMap.get(snippet.dokumentId) ?? snippet.dokumentId} · Seite {snippet.seite}
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{snippet.text}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Verwandte Fragen</h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {selectedResult.answer.verwandte_fragen.map((related) => (
                              <button
                                type="button"
                                key={related}
                                onClick={() => applyQuestion(related, selectedResult.topicId)}
                                className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                              >
                                {related}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="rounded-2xl border border-border/70 bg-card p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                              <Search className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-base font-semibold text-foreground mb-2">Keine passenden Ergebnisse gefunden</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Versuchen Sie, Ihre Suche zu verfeinern oder einen anderen Suchbegriff zu verwenden.
                              </p>
                              <div className="space-y-2">
                                <p className="text-xs font-medium text-foreground uppercase tracking-widest">Tipps zur Suche:</p>
                                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                                  <li>Verwenden Sie einfachere oder allgemeinere Begriffe</li>
                                  <li>Überprüfen Sie die Schreibweise Ihrer Suchbegriffe</li>
                                  <li>Versuchen Sie, Synonyme oder verwandte Begriffe zu nutzen</li>
                                  <li>Nutzen Sie die Themenfilter auf der linken Seite</li>
                                  <li>Probieren Sie eine der Schnellfragen aus</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WissensindexPrototyp;
