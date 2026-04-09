import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { CheckSquare, FileText, Filter, Search } from "lucide-react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCategoriesForEntry, knowledgeCategoryMeta } from "@/knowledge/categories";
import { statusMeta } from "@/knowledge/presentation";
import { runKnowledgeDocumentSearch, runKnowledgeSearch } from "@/knowledge/search";
import { topicMeta } from "@/knowledge/topics";
import type {
  KnowledgeCategoryId,
  KnowledgeDocumentType,
  KnowledgeIndex,
  ReviewStatus,
  SearchResult,
  TopicId,
} from "@/knowledge/types";

type ContentFilter = "alle" | "antworten" | "dokumente";

const documentTypeLabel: Record<KnowledgeDocumentType, string> = {
  Foerderbekanntmachung: "Förderbekanntmachung",
  Leitfaden: "Leitfaden",
  FAQ: "FAQ",
  ANBest: "ANBest",
  Personalmittelsaetze: "Personalmittelsätze",
};

const WissensindexPrototyp = () => {
  const [index, setIndex] = useState<KnowledgeIndex | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [contentFilter, setContentFilter] = useState<ContentFilter>("alle");
  const [topicFilter, setTopicFilter] = useState<TopicId | "alle">("alle");
  const [categoryFilter, setCategoryFilter] = useState<KnowledgeCategoryId | "alle">("alle");
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | "alle">("alle");
  const [selectedDocTypes, setSelectedDocTypes] = useState<KnowledgeDocumentType[]>([]);
  const [expandedAnswerSlug, setExpandedAnswerSlug] = useState<string | null>(null);

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

        if (!active) {
          return;
        }

        setIndex(data);

        const uniqueTypes = Array.from(new Set(data.documents.map((document) => document.dokumenttyp)));
        setSelectedDocTypes(uniqueTypes);
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

  const documentMeta = useMemo(() => {
    const map = new Map<string, { titel: string; dokumenttyp: KnowledgeDocumentType }>();
    index?.documents.forEach((document) => {
      map.set(document.id, { titel: document.titel, dokumenttyp: document.dokumenttyp });
    });
    return map;
  }, [index]);

  const availableDocTypes = useMemo(
    () => Array.from(new Set(index?.documents.map((document) => document.dokumenttyp) ?? [])),
    [index],
  );

  const filteredAnswers = useMemo(() => {
    return qaResults.filter((result) => {
      const sourceTypes = result.answer.quellen
        .map((source) => documentMeta.get(source.dokumentId)?.dokumenttyp)
        .filter((type): type is KnowledgeDocumentType => Boolean(type));
      const docTypeMatch = selectedDocTypes.length === 0 || sourceTypes.some((type) => selectedDocTypes.includes(type));
      const categoryMatch =
        categoryFilter === "alle" || getCategoriesForEntry(result.answer).includes(categoryFilter);

      return docTypeMatch && categoryMatch;
    });
  }, [categoryFilter, documentMeta, qaResults, selectedDocTypes]);

  const filteredDocs = useMemo(() => {
    return docResults.filter((result) => {
      const docTypeMatch = selectedDocTypes.length === 0 || selectedDocTypes.includes(result.dokumenttyp);
      if (categoryFilter === "alle") {
        return docTypeMatch;
      }

      const categoryTopics = knowledgeCategoryMeta[categoryFilter].topicIds;
      const categoryMatch = result.matchedTopicIds.some((topicId) => categoryTopics.includes(topicId));
      return docTypeMatch && categoryMatch;
    });
  }, [categoryFilter, docResults, selectedDocTypes]);

  const showAnswers = contentFilter !== "dokumente";
  const showDocs = contentFilter !== "antworten";

  const toggleDocType = (docType: KnowledgeDocumentType, checked: boolean) => {
    setSelectedDocTypes((previous) => {
      if (checked) {
        if (previous.includes(docType)) {
          return previous;
        }
        return [...previous, docType];
      }

      return previous.filter((type) => type !== docType);
    });
  };

  const resetFilters = () => {
    setQuery("");
    setContentFilter("alle");
    setTopicFilter("alle");
    setCategoryFilter("alle");
    setStatusFilter("alle");
    setSelectedDocTypes(availableDocTypes);
    setExpandedAnswerSlug(null);
  };

  const formatAnswerSources = (result: SearchResult) => {
    const grouped = new Map<string, { titel: string; pages: number[] }>();

    result.answer.quellen.forEach((source) => {
      const meta = documentMeta.get(source.dokumentId);
      const key = source.dokumentId;
      const current = grouped.get(key) ?? {
        titel: meta?.titel ?? source.dokumentId,
        pages: [],
      };

      if (source.seite && !current.pages.includes(source.seite)) {
        current.pages.push(source.seite);
      }

      grouped.set(key, current);
    });

    return Array.from(grouped.values()).map((entry) => {
      const pageLabel = entry.pages.length > 0 ? ` · Seite ${entry.pages.sort((a, b) => a - b).join(", ")}` : "";
      return `${entry.titel}${pageLabel}`;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="section-padding pt-24 md:pt-32">
        <div className="container mx-auto">
          <header className="mb-8 rounded-3xl border border-border/70 bg-card p-6 md:p-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">Wissensindex Beta</p>
            <h1 className="text-2xl font-extrabold text-foreground md:text-4xl">Kuratierte Antworten und Quellen</h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Minimaler Einstieg wie in einem Q&amp;A-Feed: links filtern, rechts direkt lesen.
            </p>
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Beta-Hinweis: Inhalte werden laufend redaktionell geprüft und können sich ändern. Verbindlich sind
              ausschließlich die Originaldokumente.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(knowledgeCategoryMeta).map(([categoryId, meta]) => (
                <Link
                  key={categoryId}
                  to={`/wissensindex-beta/kategorie/${categoryId}`}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground transition-colors hover:border-accent/40 hover:text-accent"
                >
                  {meta.label}
                </Link>
              ))}
            </div>

            <div className="relative mt-6">
              <Search className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" size={16} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Suche nach Frage, Begriff oder Dokument ..."
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
          </header>

          <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="space-y-5 lg:sticky lg:top-24 lg:h-fit">
              <section className="rounded-2xl border border-border/70 bg-card p-5">
                <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Filter size={16} className="text-accent" />
                  Inhalt
                </p>
                <div className="space-y-2">
                  {([
                    { value: "alle", label: "Alle" },
                    { value: "antworten", label: "Antworten" },
                    { value: "dokumente", label: "Dokumente" },
                  ] as const).map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setContentFilter(option.value)}
                      className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                        contentFilter === option.value
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border/60 bg-background text-foreground hover:border-accent/40"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-border/70 bg-card p-5">
                <p className="mb-3 text-sm font-semibold text-foreground">Thema</p>
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
              </section>

              <section className="rounded-2xl border border-border/70 bg-card p-5">
                <p className="mb-3 text-sm font-semibold text-foreground">Kategorie</p>
                <Select
                  value={categoryFilter}
                  onValueChange={(value) => setCategoryFilter(value as KnowledgeCategoryId | "alle")}
                >
                  <SelectTrigger className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent">
                    <SelectValue placeholder="Alle Kategorien" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alle">Alle Kategorien</SelectItem>
                    {Object.entries(knowledgeCategoryMeta).map(([categoryId, meta]) => (
                      <SelectItem key={categoryId} value={categoryId}>
                        {meta.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </section>

              <section className="rounded-2xl border border-border/70 bg-card p-5">
                <p className="mb-3 text-sm font-semibold text-foreground">Status</p>
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
              </section>

              <section className="rounded-2xl border border-border/70 bg-card p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                    <CheckSquare size={16} className="text-accent" />
                    Dokumenttypen
                  </p>
                  <button type="button" onClick={resetFilters} className="text-xs text-accent hover:underline">
                    Zurücksetzen
                  </button>
                </div>

                <div className="space-y-3">
                  {availableDocTypes.map((docType) => (
                    <label key={docType} className="flex items-start gap-3 rounded-lg border border-border/60 bg-background p-3">
                      <Checkbox
                        checked={selectedDocTypes.includes(docType)}
                        onCheckedChange={(checked) => toggleDocType(docType, checked === true)}
                      />
                      <span className="text-sm text-foreground">{documentTypeLabel[docType]}</span>
                    </label>
                  ))}
                </div>
              </section>
            </aside>

            <section className="space-y-6">
              {isLoading && (
                <div className="rounded-2xl border border-border/70 bg-card p-6 text-sm text-muted-foreground">
                  Wissensindex wird geladen ...
                </div>
              )}

              {loadError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
                  <h3 className="font-semibold text-red-900">Fehler beim Laden des Wissensindex</h3>
                  <p className="mt-1 text-red-700">{loadError}</p>
                </div>
              )}

              {!isLoading && !loadError && (
                <>
                  {showAnswers && (
                    <section className="rounded-2xl border border-border/70 bg-card p-5 md:p-6">
                      <div className="mb-4 flex items-center gap-2">
                        <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                          Antworten
                        </span>
                        <span className="text-sm text-muted-foreground">{filteredAnswers.length} Treffer</span>
                      </div>

                      {filteredAnswers.length === 0 ? (
                        <p className="rounded-xl border border-border/60 bg-background px-4 py-3 text-sm text-muted-foreground">
                          Keine passenden Antworten gefunden.
                        </p>
                      ) : (
                        <div className="space-y-4">
                          {filteredAnswers.map((result) => {
                            const isExpanded = expandedAnswerSlug === result.slug;

                            return (
                              <article key={result.slug} className="rounded-xl border border-border/60 bg-background p-4">
                                <div className="mb-2 flex items-center justify-between gap-3">
                                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                                    {topicMeta[result.topicId].label}
                                  </span>
                                  <span
                                    className={`rounded-full border px-2 py-0.5 text-[11px] ${statusMeta[result.status].className}`}
                                  >
                                    {statusMeta[result.status].label}
                                  </span>
                                </div>

                                <h2 className="text-base font-bold text-foreground">{result.frage}</h2>
                                <Link
                                  to={`/wissensindex-beta/${result.slug}`}
                                  className="mt-1 inline-block text-sm font-medium text-accent hover:underline"
                                >
                                  Unterseite öffnen
                                </Link>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {getCategoriesForEntry(result.answer).map((categoryId) => (
                                    <Link
                                      key={`${result.slug}-${categoryId}`}
                                      to={`/wissensindex-beta/kategorie/${categoryId}`}
                                      className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
                                    >
                                      {knowledgeCategoryMeta[categoryId].label}
                                    </Link>
                                  ))}
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{result.answer.antwort_kurz}</p>

                                <button
                                  type="button"
                                  onClick={() => setExpandedAnswerSlug(isExpanded ? null : result.slug)}
                                  className="mt-3 text-sm font-medium text-accent hover:underline"
                                >
                                  {isExpanded ? "Antwort ausblenden" : "Antwort anzeigen"}
                                </button>

                                {isExpanded && (
                                  <div className="mt-4 space-y-4 border-t border-border/60 pt-4">
                                    <p className="text-sm leading-relaxed text-foreground">{result.answer.antwort_lang}</p>

                                    <div>
                                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Quellen
                                      </p>
                                      <ul className="space-y-2">
                                        {formatAnswerSources(result).map((sourceLabel) => (
                                          <li key={`${result.slug}-${sourceLabel}`} className="text-sm text-muted-foreground">
                                            {sourceLabel}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    {result.snippets.length > 0 && (
                                      <div>
                                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                          Fundstellen
                                        </p>
                                        <div className="space-y-2">
                                          {result.snippets.map((snippet) => (
                                            <div
                                              key={`${result.slug}-${snippet.abschnittId}`}
                                              className="rounded-lg border border-border/60 p-3"
                                            >
                                              <p className="text-xs text-muted-foreground">
                                                {(documentMeta.get(snippet.dokumentId)?.titel ?? snippet.dokumentId) +
                                                  ` · Seite ${snippet.seite}`}
                                              </p>
                                              <p className="mt-1 text-sm text-foreground">{snippet.text}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </article>
                            );
                          })}
                        </div>
                      )}
                    </section>
                  )}

                  {showDocs && (
                    <section className="rounded-2xl border border-border/70 bg-card p-5 md:p-6">
                      <div className="mb-4 flex items-center gap-2">
                        <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                          Dokumente
                        </span>
                        <span className="text-sm text-muted-foreground">{filteredDocs.length} Treffer</span>
                      </div>

                      {filteredDocs.length === 0 ? (
                        <p className="rounded-xl border border-border/60 bg-background px-4 py-3 text-sm text-muted-foreground">
                          Keine passenden Dokumenttreffer gefunden.
                        </p>
                      ) : (
                        <div className="space-y-4">
                          {filteredDocs.map((result) => (
                            <article key={result.id} className="rounded-xl border border-border/60 bg-background p-4">
                              <div className="mb-2 flex items-center justify-between gap-2">
                                <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                                  <FileText size={12} />
                                  {documentTypeLabel[result.dokumenttyp]}
                                </span>
                                <span
                                  className={`rounded-full border px-2 py-0.5 text-[11px] ${statusMeta[result.status].className}`}
                                >
                                  {statusMeta[result.status].label}
                                </span>
                              </div>

                              <h3 className="text-base font-bold text-foreground">{result.dokumentTitel}</h3>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {result.abschnittTitel} · Seite {result.seite}
                              </p>
                              <p className="mt-3 text-sm leading-relaxed text-foreground">{result.snippet}</p>
                            </article>
                          ))}
                        </div>
                      )}
                    </section>
                  )}
                </>
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


