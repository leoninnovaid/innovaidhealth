import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GlossaryText from "@/components/knowledge/GlossaryText";
import { answerEntries } from "@/knowledge/answer-entries";
import { statusMeta } from "@/knowledge/presentation";
import type { KnowledgeDocumentType, KnowledgeIndex, ReviewStatus } from "@/knowledge/types";

type SectionCitation = {
  answerSlug: string;
  frage: string;
  status: ReviewStatus;
  seite?: number;
  zitat?: string;
};

const documentTypeLabel: Record<KnowledgeDocumentType, string> = {
  Foerderbekanntmachung: "Förderbekanntmachung",
  Leitfaden: "Leitfaden",
  FAQ: "FAQ",
  ANBest: "ANBest",
  Personalmittelsaetze: "Personalmittelsätze",
};

const WissensindexDokument = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const location = useLocation();
  const [index, setIndex] = useState<KnowledgeIndex | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

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

  const documentEntry = useMemo(() => {
    if (!index || !documentId) {
      return null;
    }
    return index.documents.find((document) => document.id === documentId) ?? null;
  }, [documentId, index]);

  const sectionCitations = useMemo(() => {
    const citations = new Map<string, SectionCitation[]>();

    if (!documentEntry) {
      return citations;
    }

    for (const answer of answerEntries) {
      for (const source of answer.quellen) {
        if (source.dokumentId !== documentEntry.id) {
          continue;
        }

        const targetSections = documentEntry.abschnitte.filter((section) => {
          if (source.abschnittId) {
            return section.id === source.abschnittId;
          }

          if (source.seite) {
            return section.seite === source.seite;
          }

          return false;
        });

        for (const section of targetSections) {
          const current = citations.get(section.id) ?? [];
          const candidate: SectionCitation = {
            answerSlug: answer.slug,
            frage: answer.frage,
            status: answer.status,
            seite: source.seite,
            zitat: source.zitat,
          };

          const alreadyLinked = current.some(
            (entry) =>
              entry.answerSlug === candidate.answerSlug &&
              entry.seite === candidate.seite &&
              (entry.zitat ?? "") === (candidate.zitat ?? ""),
          );

          if (!alreadyLinked) {
            current.push(candidate);
            citations.set(section.id, current);
          }
        }
      }
    }

    return citations;
  }, [documentEntry]);

  const highlightedCount = useMemo(() => sectionCitations.size, [sectionCitations]);

  const citedQuestionCount = useMemo(() => {
    const slugs = new Set<string>();
    sectionCitations.forEach((entries) => entries.forEach((entry) => slugs.add(entry.answerSlug)));
    return slugs.size;
  }, [sectionCitations]);

  useEffect(() => {
    if (isLoading || loadError || !documentEntry) {
      return;
    }

    const search = new URLSearchParams(location.search);
    const hashSectionId = location.hash.replace("#", "");
    const targetSectionId = search.get("abschnitt");
    const targetPage = Number(search.get("seite"));

    const scrollToTarget = () => {
      if (hashSectionId) {
        const element = document.getElementById(decodeURIComponent(hashSectionId));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }

      if (targetSectionId) {
        const element = document.getElementById(targetSectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }

      if (Number.isFinite(targetPage) && targetPage > 0) {
        const element = document.getElementById(`seite-${targetPage}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    const timeout = window.setTimeout(scrollToTarget, 40);
    return () => window.clearTimeout(timeout);
  }, [documentEntry, isLoading, loadError, location.hash, location.search]);

  if (!documentId) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="section-padding pt-24 md:pt-32">
          <div className="container mx-auto max-w-3xl rounded-2xl border border-border/70 bg-card p-6">
            <h1 className="text-xl font-bold text-foreground">Dokument nicht gefunden</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Für dieses Dokument wurde keine gültige Kennung übergeben.
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
            <span>Dokument</span>
          </nav>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Beta-Hinweis: Inhalte werden laufend redaktionell geprüft und können sich ändern. Verbindlich sind
            ausschließlich die Originaldokumente.
          </div>

          {isLoading && (
            <div className="rounded-2xl border border-border/70 bg-card p-6 text-sm text-muted-foreground">
              Dokument wird geladen ...
            </div>
          )}

          {loadError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
              <h1 className="text-base font-bold text-red-900">Fehler beim Laden</h1>
              <p className="mt-1">{loadError}</p>
            </div>
          )}

          {!isLoading && !loadError && !documentEntry && (
            <div className="rounded-2xl border border-border/70 bg-card p-6">
              <h1 className="text-xl font-bold text-foreground">Dokument nicht gefunden</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Dieses Dokument ist derzeit nicht verfügbar oder wurde umbenannt.
              </p>
              <Link to="/wissensindex-beta" className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
                Zurück zum Wissensindex Beta
              </Link>
            </div>
          )}

          {!isLoading && !loadError && documentEntry && (
            <>
              <header className="rounded-2xl border border-border/70 bg-card p-6 md:p-8">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                    {documentTypeLabel[documentEntry.dokumenttyp]}
                  </span>
                  <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                    {documentEntry.abschnitte.length} Abschnitte
                  </span>
                </div>

                <h1 className="text-2xl font-extrabold text-foreground md:text-3xl">{documentEntry.titel}</h1>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Dieses Dokument ist als Volltext verfügbar. Gelb markierte Abschnitte werden in Antworten des
                  Wissensindex zitiert.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/60 bg-background p-3">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Markierte Abschnitte</p>
                    <p className="mt-1 text-lg font-bold text-foreground">{highlightedCount}</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-background p-3">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Verknüpfte Fragen</p>
                    <p className="mt-1 text-lg font-bold text-foreground">{citedQuestionCount}</p>
                  </div>
                </div>
              </header>

              <section className="rounded-2xl border border-border/70 bg-card p-5 md:p-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Dokumenttext</h2>

                <div className="mt-4 space-y-4">
                  {documentEntry.abschnitte.map((section) => {
                    const citations = sectionCitations.get(section.id) ?? [];
                    const cited = citations.length > 0;

                    return (
                      <article
                        key={section.id}
                        id={`seite-${section.seite}`}
                        className={`rounded-xl border p-4 md:p-5 ${
                          cited ? "border-amber-300 bg-amber-50/70" : "border-border/60 bg-background"
                        }`}
                      >
                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                          <p className="text-xs uppercase tracking-widest text-muted-foreground">Seite {section.seite}</p>
                          {cited && (
                            <span className="rounded-full border border-amber-300 bg-amber-100 px-2.5 py-1 text-[11px] font-medium text-amber-900">
                              Zitiert
                            </span>
                          )}
                        </div>

                        <h3 id={section.id} className="text-base font-bold text-foreground">
                          {section.ueberschrift}
                        </h3>

                        <GlossaryText
                          text={section.volltext}
                          simplify={false}
                          className="mt-3 block text-sm leading-relaxed text-foreground"
                        />

                        {citations.length > 0 && (
                          <div className="mt-4 rounded-lg border border-amber-300 bg-amber-100/60 p-3">
                            <p className="text-xs font-semibold uppercase tracking-wider text-amber-900">
                              Zitiert in Antworten
                            </p>
                            <ul className="mt-2 space-y-2">
                              {citations.map((citation, index) => (
                                <li key={`${section.id}-${citation.answerSlug}-${index}`} className="text-sm text-amber-950">
                                  <Link
                                    to={`/wissensindex-beta/${citation.answerSlug}`}
                                    className="font-medium text-accent hover:underline"
                                  >
                                    {citation.frage}
                                  </Link>
                                  <span className="mx-1 text-muted-foreground">·</span>
                                  <span
                                    className={`rounded-full border px-2 py-0.5 text-[11px] ${statusMeta[citation.status].className}`}
                                  >
                                    {statusMeta[citation.status].label}
                                  </span>
                                  {citation.seite ? (
                                    <span className="ml-2 text-xs text-muted-foreground">Seite {citation.seite}</span>
                                  ) : null}
                                  {citation.zitat ? (
                                    <p className="mt-1 rounded-md border border-amber-300/70 bg-white/80 px-2 py-1 text-xs leading-relaxed text-foreground">
                                      „{citation.zitat}“
                                    </p>
                                  ) : null}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WissensindexDokument;
