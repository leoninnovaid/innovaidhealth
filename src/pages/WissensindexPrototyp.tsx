import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { FileText, Search } from "lucide-react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GlossaryText from "@/components/knowledge/GlossaryText";
import { answerEntries } from "@/knowledge/answer-entries";
import { featuredQuestionSlugs, statusMeta } from "@/knowledge/presentation";
import { runKnowledgeDocumentSearch, runKnowledgeSearch } from "@/knowledge/search";
import { topicMeta } from "@/knowledge/topics";
import type { KnowledgeDocumentType, KnowledgeIndex, SearchResult } from "@/knowledge/types";

type ContentFilter = "antworten" | "dokumente";

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
  const [reloadToken, setReloadToken] = useState(0);

  const [query, setQuery] = useState("");
  const [contentFilter, setContentFilter] = useState<ContentFilter>("antworten");
  const [expandedAnswerSlug, setExpandedAnswerSlug] = useState<string | null>(null);

  const deferredQuery = useDeferredValue(query);
  const trimmedQuery = deferredQuery.trim();

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
  }, [reloadToken]);

  const qaResults = useMemo(
    () =>
      runKnowledgeSearch({
        query: trimmedQuery,
        topicFilter: "alle",
        statusFilter: "alle",
        index,
      }),
    [index, trimmedQuery],
  );

  const docResults = useMemo(
    () =>
      runKnowledgeDocumentSearch({
        query: trimmedQuery,
        topicFilter: "alle",
        statusFilter: "alle",
        index,
      }),
    [index, trimmedQuery],
  );

  const documentMeta = useMemo(() => {
    const map = new Map<string, { titel: string; dokumenttyp: KnowledgeDocumentType }>();
    index?.documents.forEach((document) => {
      map.set(document.id, { titel: document.titel, dokumenttyp: document.dokumenttyp });
    });
    return map;
  }, [index]);

  const featuredEntries = useMemo(() => {
    return featuredQuestionSlugs
      .map((slug) => answerEntries.find((entry) => entry.slug === slug))
      .filter((entry): entry is (typeof answerEntries)[number] => Boolean(entry))
      .filter((entry) => entry.status === "freigegeben");
  }, []);

  const formatAnswerSources = (result: SearchResult) => {
    const grouped = new Map<string, { titel: string; pages: number[]; abschnittId?: string }>();

    result.answer.quellen.forEach((source) => {
      const meta = documentMeta.get(source.dokumentId);
      const current = grouped.get(source.dokumentId) ?? {
        titel: meta?.titel ?? source.dokumentId,
        pages: [],
        abschnittId: source.abschnittId,
      };

      if (source.seite && !current.pages.includes(source.seite)) {
        current.pages.push(source.seite);
      }

      if (!current.abschnittId && source.abschnittId) {
        current.abschnittId = source.abschnittId;
      }

      grouped.set(source.dokumentId, current);
    });

    return Array.from(grouped.entries()).map(([dokumentId, entry]) => {
      const pages = [...entry.pages].sort((a, b) => a - b);
      return {
        dokumentId,
        titel: entry.titel,
        pages,
        abschnittId: entry.abschnittId,
      };
    });
  };

  const clearSearch = () => {
    setQuery("");
    setExpandedAnswerSlug(null);
  };

  const applyQuickStart = (question: string) => {
    setContentFilter("antworten");
    setQuery(question);
    setExpandedAnswerSlug(null);
  };

  const answerModeEmpty = contentFilter === "antworten" && qaResults.length === 0;
  const docModeEmpty = contentFilter === "dokumente" && docResults.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="section-padding pt-24 md:pt-32">
        <div className="container mx-auto max-w-6xl">
          <header className="mb-6 rounded-3xl border border-border/70 bg-card p-6 md:p-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">Wissensindex Beta</p>
            <h1 className="text-2xl font-extrabold text-foreground md:text-4xl">Schnell Antworten finden</h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Geben Sie Ihre Frage ein. Sie erhalten direkt eine kurze, belastbare Antwort und bei Bedarf die passenden
              Quellen.
            </p>
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Beta-Hinweis: Inhalte werden laufend redaktionell geprüft und können sich ändern. Verbindlich sind
              ausschließlich die Originaldokumente.
            </p>
          </header>

          <section className="sticky top-20 z-20 mb-6 rounded-2xl border border-border/70 bg-card/95 p-4 shadow-sm backdrop-blur-md md:p-5">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setContentFilter("antworten")}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  contentFilter === "antworten"
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-background text-foreground hover:border-accent/40"
                }`}
              >
                Antworten
              </button>
              <button
                type="button"
                onClick={() => setContentFilter("dokumente")}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  contentFilter === "dokumente"
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-background text-foreground hover:border-accent/40"
                }`}
              >
                Dokumente
              </button>
            </div>

            <div className="relative mt-3">
              <Search className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" size={16} />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setExpandedAnswerSlug(null);
                }}
                placeholder={
                  contentFilter === "antworten"
                    ? "Frage eingeben, z. B. Wer ist antragsberechtigt?"
                    : "Dokumente und Fundstellen durchsuchen ..."
                }
                className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-24 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-2 top-2 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  title="Suche leeren"
                >
                  Leeren
                </button>
              )}
            </div>
          </section>

          {contentFilter === "antworten" && !trimmedQuery && !isLoading && !loadError && (
            <section className="mb-6 rounded-2xl border border-border/70 bg-card p-5 md:p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Schnellstarts</h2>
              <p className="mt-1 text-sm text-muted-foreground">Häufige Fragen für den direkten Einstieg.</p>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {featuredEntries.map((entry) => (
                  <button
                    key={entry.slug}
                    type="button"
                    onClick={() => applyQuickStart(entry.frage)}
                    className="rounded-xl border border-border/60 bg-background px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    <GlossaryText text={entry.frage} />
                  </button>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-6">
            {isLoading && (
              <div className="rounded-2xl border border-border/70 bg-card p-6 text-sm text-muted-foreground">
                Wir laden den Wissensindex. Das dauert nur einen Moment.
              </div>
            )}

            {loadError && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
                <h2 className="font-semibold text-red-900">Laden fehlgeschlagen</h2>
                <p className="mt-1">{loadError}</p>
                <button
                  type="button"
                  onClick={() => setReloadToken((previous) => previous + 1)}
                  className="mt-3 rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-900 hover:bg-red-100"
                >
                  Erneut versuchen
                </button>
              </div>
            )}

            {!isLoading && !loadError && answerModeEmpty && (
              <div className="rounded-2xl border border-border/70 bg-card p-6">
                <h2 className="text-base font-bold text-foreground">Keine passende Antwort gefunden</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Formulieren Sie die Frage kürzer oder nutzen Sie andere Stichwörter.
                </p>
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="mt-3 text-sm font-medium text-accent hover:underline"
                  >
                    Suche zurücksetzen
                  </button>
                )}
              </div>
            )}

            {!isLoading && !loadError && docModeEmpty && (
              <div className="rounded-2xl border border-border/70 bg-card p-6">
                <h2 className="text-base font-bold text-foreground">Keine passenden Dokumentstellen gefunden</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Prüfen Sie andere Begriffe oder wechseln Sie in den Antworten-Modus.
                </p>
                {query && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="mt-3 text-sm font-medium text-accent hover:underline"
                  >
                    Suche zurücksetzen
                  </button>
                )}
              </div>
            )}

            {!isLoading && !loadError && contentFilter === "antworten" && qaResults.length > 0 && (
              <section className="rounded-2xl border border-border/70 bg-card p-5 md:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Antworten</h2>
                  <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                    {qaResults.length} Treffer
                  </span>
                </div>

                <div className="space-y-4">
                  {qaResults.map((result) => {
                    const isExpanded = expandedAnswerSlug === result.slug;

                    return (
                      <article key={result.slug} className="rounded-xl border border-border/60 bg-background p-4 md:p-5">
                        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span>{topicMeta[result.topicId].label}</span>
                          <span>·</span>
                          <span className={`rounded-full border px-2 py-0.5 ${statusMeta[result.status].className}`}>
                            {statusMeta[result.status].label}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-foreground md:text-xl">
                          <GlossaryText text={result.frage} />
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          <GlossaryText text={result.answer.antwort_kurz} />
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-4">
                          <Link
                            to={`/wissensindex-beta/${result.slug}`}
                            className="rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                          >
                            Antwort öffnen
                          </Link>
                          <button
                            type="button"
                            onClick={() => setExpandedAnswerSlug(isExpanded ? null : result.slug)}
                            className="text-sm font-medium text-accent hover:underline"
                          >
                            {isExpanded ? "Details ausblenden" : "Details anzeigen"}
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="mt-4 space-y-4 border-t border-border/60 pt-4">
                            <p className="text-sm leading-relaxed text-foreground">
                              <GlossaryText text={result.answer.antwort_lang} />
                            </p>

                            <div>
                              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Quellen
                              </p>
                              <ul className="space-y-2">
                                {formatAnswerSources(result).map((source) => (
                                  <li key={`${result.slug}-${source.dokumentId}`} className="text-sm text-muted-foreground">
                                    <Link
                                      to={`/wissensindex-beta/dokument/${source.dokumentId}${source.abschnittId ? `#${source.abschnittId}` : ""}`}
                                      className="font-medium text-accent hover:underline"
                                    >
                                      {source.titel}
                                    </Link>
                                    {source.pages.length > 0 ? ` · Seite ${source.pages.join(", ")}` : ""}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {result.snippets[0] && (
                              <div className="rounded-lg border border-border/60 p-3">
                                <p className="text-xs text-muted-foreground">
                                  {(documentMeta.get(result.snippets[0].dokumentId)?.titel ?? result.snippets[0].dokumentId) +
                                    ` · Seite ${result.snippets[0].seite}`}
                                </p>
                                <p className="mt-1 text-sm text-foreground">{result.snippets[0].text}</p>
                                <Link
                                  to={`/wissensindex-beta/dokument/${result.snippets[0].dokumentId}#${result.snippets[0].abschnittId}`}
                                  className="mt-2 inline-block text-xs font-medium text-accent hover:underline"
                                >
                                  Dokumentstelle öffnen
                                </Link>
                              </div>
                            )}
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

            {!isLoading && !loadError && contentFilter === "dokumente" && docResults.length > 0 && (
              <section className="rounded-2xl border border-border/70 bg-card p-5 md:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Dokumente</h2>
                  <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                    {docResults.length} Treffer
                  </span>
                </div>

                <div className="space-y-4">
                  {docResults.map((result) => (
                    <article key={result.id} className="rounded-xl border border-border/60 bg-background p-4 md:p-5">
                      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5">
                          <FileText size={12} />
                          {documentTypeLabel[result.dokumenttyp]}
                        </span>
                        <span>·</span>
                        <span>Seite {result.seite}</span>
                      </div>

                      <h3 className="text-lg font-bold text-foreground">{result.dokumentTitel}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{result.abschnittTitel}</p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground">{result.snippet}</p>

                      <Link
                        to={`/wissensindex-beta/dokument/${result.dokumentId}#${result.abschnittId}`}
                        className="mt-3 inline-block rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                      >
                        Dokument öffnen
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WissensindexPrototyp;
