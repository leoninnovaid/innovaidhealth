import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GlossaryText from "@/components/knowledge/GlossaryText";
import { answerEntries } from "@/knowledge/answer-entries";
import { getCategoriesForEntry } from "@/knowledge/categories";
import { statusMeta } from "@/knowledge/presentation";
import { runKnowledgeSearch } from "@/knowledge/search";
import type { KnowledgeIndex } from "@/knowledge/types";
import { useI18n } from "@/i18n/LocaleContext";

const WissensindexFrage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [index, setIndex] = useState<KnowledgeIndex | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const { copy, withLocalePath } = useI18n();

  const answer = useMemo(() => answerEntries.find((entry) => entry.slug === slug) ?? null, [slug]);

  useEffect(() => {
    const oldTitle = document.title;

    if (answer) {
      document.title = `${answer.frage} | ${copy.seo.knowledgeTitle}`;
      const descriptionTag = document.querySelector('meta[name="description"]');
      if (descriptionTag) {
        descriptionTag.setAttribute("content", answer.antwort_kurz);
      }
    }

    return () => {
      document.title = oldTitle;
    };
  }, [answer, copy.seo.knowledgeTitle]);

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
          throw new Error(`${copy.knowledge.search.loadErrorTitle} (${response.status}).`);
        }

        const data = (await response.json()) as KnowledgeIndex;

        if (!active) {
          return;
        }

        setIndex(data);
      } catch (error) {
        if (active) {
          setLoadError(error instanceof Error ? error.message : copy.knowledge.search.loadErrorTitle);
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
  }, [copy.knowledge.search.loadErrorTitle]);

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
            <h1 className="text-xl font-bold text-foreground">{copy.knowledge.question.notFoundTitle}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{copy.knowledge.question.notFoundText}</p>
            <Link to={withLocalePath("/wissensindex-beta")} className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
              {copy.common.backToKnowledge}
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
            <Link to={withLocalePath("/wissensindex-beta")} className="text-accent hover:underline">
              {copy.knowledge.question.breadcrumbSearch}
            </Link>
            <span> / </span>
            <span>{answer.frage}</span>
          </nav>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{copy.common.betaNotice}</div>

          <article className="rounded-2xl border border-border/70 bg-card p-6 md:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                {copy.knowledge.topicLabels[answer.topicId]}
              </span>
              <span className={`rounded-full border px-2.5 py-1 text-xs ${statusMeta[answer.status].className}`}>
                {copy.common.status[answer.status]}
              </span>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {categories.map((categoryId) => (
                <Link
                  key={categoryId}
                  to={withLocalePath(`/wissensindex-beta/kategorie/${categoryId}`)}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {copy.knowledge.categoryLabels[categoryId].label}
                </Link>
              ))}
            </div>

            {categories.length > 0 && (
              <div className="mb-4 rounded-xl border border-border/60 bg-background p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{copy.knowledge.question.categoryLabel}</p>
                <ul className="mt-2 space-y-1">
                  {categories.map((categoryId) => (
                    <li key={`desc-${categoryId}`} className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{copy.knowledge.categoryLabels[categoryId].label}:</span>{" "}
                      {copy.knowledge.categoryLabels[categoryId].description}
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

            <div className="mt-4">
              <Link to={withLocalePath("/wissensindex-beta")} className="inline-block text-sm font-medium text-accent hover:underline">
                {copy.knowledge.question.shortAnswerLink}
              </Link>
            </div>

            <div className="mt-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">{copy.knowledge.question.sourcesTitle}</h2>
              <ul className="mt-3 space-y-2">
                {answer.quellen.map((source, indexSource) => {
                  const title = documentMap.get(source.dokumentId) ?? source.dokumentId;
                  const pageLabel = source.fundstelle ?? (source.seite ? `Seite ${source.seite}` : "");
                  const queryParams = new URLSearchParams({ antwort: answer.slug });
                  if (source.seite) {
                    queryParams.set("seite", String(source.seite));
                  }
                  const baseHref = `/wissensindex-beta/dokument/${source.dokumentId}?${queryParams.toString()}`;
                  const documentHref = source.abschnittId ? `${baseHref}#${source.abschnittId}` : baseHref;

                  return (
                    <li
                      key={`${source.dokumentId}-${source.abschnittId ?? indexSource}`}
                      className="rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-foreground"
                    >
                      <Link to={withLocalePath(documentHref)} className="font-medium text-accent hover:underline">
                        {title}
                      </Link>
                      {pageLabel ? ` · ${pageLabel}` : ""}
                    </li>
                  );
                })}
              </ul>
            </div>

            {isLoading && (
              <p className="mt-6 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm text-muted-foreground">
                {copy.knowledge.document.loading}
              </p>
            )}

            {loadError && (
              <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{loadError}</p>
            )}

            {!isLoading && !loadError && snippets.length > 0 && (
              <div className="mt-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">{copy.knowledge.question.snippetsTitle}</h2>
                <div className="mt-3 space-y-3">
                  {snippets.map((snippet) => (
                    <div key={`${snippet.abschnittId}-${snippet.seite}`} className="rounded-lg border border-border/60 bg-background px-3 py-3">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        {(documentMap.get(snippet.dokumentId) ?? snippet.dokumentId) +
                          ` · ${snippet.fundstelle ?? `Seite ${snippet.seite}`}`}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground">{snippet.text}</p>
                      <Link
                        to={withLocalePath(`/wissensindex-beta/dokument/${snippet.dokumentId}?antwort=${answer.slug}#${snippet.abschnittId}`)}
                        className="mt-2 inline-block text-xs font-medium text-accent hover:underline"
                      >
                        {copy.knowledge.question.openInDocument}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          {relatedEntries.length > 0 && (
            <section className="rounded-2xl border border-border/70 bg-card p-6 md:p-8">
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">{copy.knowledge.question.relatedTitle}</h2>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {relatedEntries.map((entry) => (
                  <Link
                    key={entry.slug}
                    to={withLocalePath(`/wissensindex-beta/${entry.slug}`)}
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
