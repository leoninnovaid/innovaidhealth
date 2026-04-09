import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { answerEntries } from "@/knowledge/answer-entries";
import { getCategoriesForEntry, knowledgeCategoryMeta } from "@/knowledge/categories";
import { statusMeta } from "@/knowledge/presentation";
import { topicMeta } from "@/knowledge/topics";
import type { KnowledgeCategoryId } from "@/knowledge/types";

const WissensindexKategorie = () => {
  const { categoryId } = useParams<{ categoryId: KnowledgeCategoryId }>();
  const category = categoryId ? knowledgeCategoryMeta[categoryId] : null;

  const entries = useMemo(() => {
    if (!categoryId || !category) {
      return [];
    }

    return answerEntries.filter((entry) => getCategoriesForEntry(entry).includes(categoryId));
  }, [category, categoryId]);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="section-padding pt-24 md:pt-32">
          <div className="container mx-auto max-w-3xl rounded-2xl border border-border/70 bg-card p-6">
            <h1 className="text-xl font-bold text-foreground">Kategorie nicht gefunden</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Diese Kategorie existiert nicht oder wurde umbenannt.
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
        <div className="container mx-auto max-w-5xl space-y-6">
          <nav className="text-sm text-muted-foreground">
            <Link to="/wissensindex-beta" className="text-accent hover:underline">
              Wissensindex Beta
            </Link>
            <span> / </span>
            <span>{category.label}</span>
          </nav>

          <header className="rounded-2xl border border-border/70 bg-card p-6 md:p-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">Kategorie</p>
            <h1 className="text-2xl font-extrabold text-foreground md:text-3xl">{category.label}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {category.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {category.topicIds.map((topicId) => (
                <span key={topicId} className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground">
                  {topicMeta[topicId].label}
                </span>
              ))}
            </div>
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Beta-Hinweis: Inhalte werden laufend redaktionell geprüft und können sich ändern. Verbindlich sind
              ausschließlich die Originaldokumente.
            </p>
          </header>

          <section className="rounded-2xl border border-border/70 bg-card p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Fragen in dieser Kategorie</h2>
              <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                {entries.length} Fragen
              </span>
            </div>

            {entries.length === 0 ? (
              <p className="rounded-xl border border-border/60 bg-background px-4 py-3 text-sm text-muted-foreground">
                Aktuell sind dieser Kategorie noch keine Fragen zugeordnet.
              </p>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <article key={entry.slug} className="rounded-xl border border-border/60 bg-background p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">
                        {topicMeta[entry.topicId].label}
                      </span>
                      <span className={`rounded-full border px-2 py-0.5 text-[11px] ${statusMeta[entry.status].className}`}>
                        {statusMeta[entry.status].label}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-foreground">{entry.frage}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.antwort_kurz}</p>
                    <Link
                      to={`/wissensindex-beta/${entry.slug}`}
                      className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
                    >
                      Unterseite öffnen
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
