import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GlossaryText from "@/components/knowledge/GlossaryText";
import { answerEntries } from "@/knowledge/answer-entries";
import { getCategoriesForEntry, knowledgeCategoryMeta } from "@/knowledge/categories";
import { statusMeta } from "@/knowledge/presentation";
import type { KnowledgeCategoryId } from "@/knowledge/types";
import { useI18n } from "@/i18n/LocaleContext";

const WissensindexKategorie = () => {
  const { categoryId } = useParams<{ categoryId: KnowledgeCategoryId }>();
  const { copy, withLocalePath } = useI18n();

  const category = categoryId ? copy.knowledge.categoryLabels[categoryId] : null;

  const entries = useMemo(() => {
    if (!categoryId || !category) {
      return [];
    }

    return answerEntries.filter((entry) => getCategoriesForEntry(entry).includes(categoryId));
  }, [category, categoryId]);

  useEffect(() => {
    if (!category) {
      return;
    }

    document.title = `${category.label} | ${copy.seo.knowledgeTitle}`;
  }, [category, copy.seo.knowledgeTitle]);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="section-padding pt-24 md:pt-32">
          <div className="container mx-auto max-w-3xl rounded-2xl border border-border/70 bg-card p-6">
            <h1 className="text-xl font-bold text-foreground">{copy.knowledge.category.notFoundTitle}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{copy.knowledge.category.notFoundText}</p>
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
        <div className="container mx-auto max-w-5xl space-y-6">
          <nav className="text-sm text-muted-foreground">
            <Link to={withLocalePath("/wissensindex-beta")} className="text-accent hover:underline">
              {copy.knowledge.category.breadcrumbSearch}
            </Link>
            <span> / </span>
            <span>{category.label}</span>
          </nav>

          <header className="rounded-2xl border border-border/70 bg-card p-6 md:p-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">{copy.knowledge.category.pageLabel}</p>
            <h1 className="text-2xl font-extrabold text-foreground md:text-3xl">{category.label}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">{category.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {categoryId &&
                knowledgeCategoryMeta[categoryId].topicIds.map((topicId) => (
                  <span key={topicId} className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground">
                    {copy.knowledge.topicLabels[topicId]}
                  </span>
                ))}
            </div>
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{copy.common.betaNotice}</p>
          </header>

          <section className="rounded-2xl border border-border/70 bg-card p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">{copy.knowledge.category.questionsInCategory}</h2>
              <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                {entries.length} {copy.knowledge.category.questions}
              </span>
            </div>

            {entries.length === 0 ? (
              <p className="rounded-xl border border-border/60 bg-background px-4 py-3 text-sm text-muted-foreground">{copy.knowledge.category.empty}</p>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <article key={entry.slug} className="rounded-xl border border-border/60 bg-background p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">
                        {copy.knowledge.topicLabels[entry.topicId]}
                      </span>
                      <span className={`rounded-full border px-2 py-0.5 text-[11px] ${statusMeta[entry.status].className}`}>
                        {copy.common.status[entry.status]}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-foreground">
                      <GlossaryText text={entry.frage} />
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      <GlossaryText text={entry.antwort_kurz} />
                    </p>
                    <Link
                      to={withLocalePath(`/wissensindex-beta/${entry.slug}`)}
                      className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
                    >
                      {copy.knowledge.category.openSubpage}
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WissensindexKategorie;
