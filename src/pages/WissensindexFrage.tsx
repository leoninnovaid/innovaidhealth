import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GlossaryText from "@/components/knowledge/GlossaryText";
import { answerEntries } from "@/knowledge/answer-entries";
import { getCategoriesForEntry, knowledgeCategoryMeta } from "@/knowledge/categories";
import { statusMeta } from "@/knowledge/presentation";
import { runKnowledgeSearch } from "@/knowledge/search";
import { topicMeta } from "@/knowledge/topics";
import type { KnowledgeIndex } from "@/knowledge/types";

const WissensindexFrage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [index, setIndex] = useState<KnowledgeIndex | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const answer = useMemo(() => answerEntries.find((entry) => entry.slug === slug) ?? null, [slug]);

  useEffect(() => {
    const oldTitle = document.title;

    if (answer) {
      document.title = `${answer.frage} | Wissensindex Beta | INNOVAID:health`;
      const descriptionTag = document.querySelector('meta[name="description"]');
      if (descriptionTag) {
        descriptionTag.setAttribute("content", answer.antwort_kurz);
      }
    }

    return () => {
      document.title = oldTitle;
    };
  }, [answer]);

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
  }, []);

  const snippets = useMemo(() => {
    if (!answer || !index) {
      return [];
    }

    const result = runKnowledgeSearch({
      query: answer.frage,
      topicFilter: answer.topicId,
      statusFilter: "alle",
      index,
      maxResults: 40,
    }).find((item) => item.slug === answer.slug);

    return result?.snippets ?? [];
  }, [answer, index]);

  const documentMap = useMemo(() => {
    const map = new Map<string, string>();
    index?.documents.forEach((document) => map.set(document.id, document.titel));
    return map;
  }, [index]);

  const relatedEntries = useMemo(() => {
    if (!answer) {
      return [];
    }

    return answer.verwandte_fragen
      .map((frage) => answerEntries.find((entry) => entry.frage === frage))
      .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  }, [answer]);

  const categories = useMemo(() => (answer ? getCategoriesForEntry(answer) : []), [answer]);

  if (!answer) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="section-padding pt-24 md:pt-32">
          <div className="container mx-auto max-w-3xl rounded-2xl border border-border/70 bg-card p-6">
            <h1 className="text-xl font-bold text-foreground">Frage nicht gefunden</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Diese Unterseite existiert nicht oder wurde verschoben.
            </p>
            <Link to="/wissensindex-beta" className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
              Zurück zum Wissensindex Beta
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="section-padding pt-24 md:pt-32">
        <div className="container mx-auto max-w-4xl space-y-6">
          <nav className="text-sm text-muted-foreground">
            <Link to="/wissensindex-beta" className="text-accent hover:underline">
              Wissensindex Beta
            </Link>
            <span> / </span>
            <span>{answer.frage}</span>
          </nav>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Beta-Hinweis: Inhalte werden laufend redaktionell geprüft und können sich ändern. Verbindlich sind
            ausschließlich die Originaldokumente.
          </div>

          <article className="rounded-2xl border border-border/70 bg-card p-6 md:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                {topicMeta[answer.topicId].label}
              </span>
              <span className={`rounded-full border px-2.5 py-1 text-xs ${statusMeta[answer.status].className}`}>
                {statusMeta[answer.status].label}
              </span>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {categories.map((categoryId) => (
                <Link
                  key={categoryId}
                  to={`/wissensindex-beta/kategorie/${categoryId}`}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {knowledgeCategoryMeta[categoryId].label}
                </Link>
              ))}
            </div>

            {categories.length > 0 && (
              <div className="mb-4 rounded-xl border border-border/60 bg-background p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Kategorien</p>
                <ul className="mt-2 space-y-1">
                  {categories.map((categoryId) => (
                    <li key={`desc-${categoryId}`} className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{knowledgeCategoryMeta[categoryId].label}:</span>{" "}
                      {knowledgeCategoryMeta[categoryId].description}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <h1 className="text-2xl font-extrabold text-foreground md:text-3xl">
              <GlossaryText text={answer.frage} />
            </h1>
            <p className="mt-4 text-base font-semibold text-foreground">
              <GlossaryText text={answer.antwort_kurz} />
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              <GlossaryText text={answer.antwort_lang} />
            </p>

            <div className="mt-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Quellen</h2>
              <ul className="mt-3 space-y-2">
                {answer.quellen.map((source, indexSource) => {
                  const title = documentMap.get(source.dokumentId) ?? source.dokumentId;
                  const pageLabel = source.seite ? ` · Seite ${source.seite}` : "";
                  return (
                    <li
                      key={`${source.dokumentId}-${source.abschnittId ?? indexSource}`}
                      className="rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground"
                    >
                      {title}
                      {pageLabel}
                    </li>
                  );
                })}
              </ul>
            </div>

            {isLoading && (
              <p className="mt-6 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-muted-foreground">
                Fundstellen werden geladen ...
              </p>
            )}

            {loadError && (
              <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                {loadError}
              </p>
            )}

            {!isLoading && !loadError && snippets.length > 0 && (
              <div className="mt-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Fundstellen</h2>
                <div className="mt-3 space-y-3">
                  {snippets.map((snippet) => (
                    <div key={`${snippet.abschnittId}-${snippet.seite}`} className="rounded-lg border border-border/60 bg-background px-3 py-3">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        {(documentMap.get(snippet.dokumentId) ?? snippet.dokumentId) + ` · Seite ${snippet.seite}`}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground">{snippet.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          {relatedEntries.length > 0 && (
            <section className="rounded-2xl border border-border/70 bg-card p-6 md:p-8">
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Verwandte Fragen</h2>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {relatedEntries.map((entry) => (
                  <Link
                    key={entry.slug}
                    to={`/wissensindex-beta/${entry.slug}`}
                    className="rounded-lg border border-border/60 bg-background px-3 py-3 text-sm text-foreground transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <GlossaryText text={entry.frage} />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WissensindexFrage;
