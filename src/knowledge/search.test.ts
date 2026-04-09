import { describe, expect, it } from "vitest";
import { runKnowledgeDocumentSearch, runKnowledgeSearch } from "@/knowledge/search";
import type { KnowledgeIndex } from "@/knowledge/types";

const mockIndex: KnowledgeIndex = {
  generatedAt: "2026-01-23T10:00:00.000Z",
  sourceDir: "C:/mock",
  documents: [
    {
      id: "fbm-nvf1-l-to",
      titel: "Foerderbekanntmachung NVF1",
      quelle_datei: "fbm-nvf1.pdf",
      dokumenttyp: "Foerderbekanntmachung",
      abschnitte: [
        {
          id: "fbm-nvf1-l-to-seite-1",
          ueberschrift: "Antragsberechtigung",
          volltext: "Antragsberechtigte Institutionen koennen Projekte im Innovationsfonds einreichen.",
          seite: 1,
          schlagwoerter: ["antragsrollen"],
        },
      ],
    },
    {
      id: "faq-antragstellende",
      titel: "FAQ Antragstellende",
      quelle_datei: "faq.pdf",
      dokumenttyp: "FAQ",
      abschnitte: [
        {
          id: "faq-antragstellende-seite-1",
          ueberschrift: "Fristen",
          volltext: "Die Einreichungsfrist endet zum angegebenen Stichtag laut FAQ.",
          seite: 1,
          schlagwoerter: ["fristen"],
        },
      ],
    },
  ],
};

describe("runKnowledgeSearch", () => {
  it("findet antragsrollen-bezogene Antworten per Regelmatch", () => {
    const results = runKnowledgeSearch({
      query: "Wer darf beantragen?",
      index: mockIndex,
      topicFilter: "alle",
      statusFilter: "alle",
      maxResults: 5,
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].slug).toBe("wer-ist-antragsberechtigt");
  });

  it("filtert nach Status", () => {
    const results = runKnowledgeSearch({
      query: "Welche Fristen gelten?",
      index: mockIndex,
      topicFilter: "alle",
      statusFilter: "freigegeben",
      maxResults: 10,
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((result) => result.status === "freigegeben")).toBe(true);
  });

  it("liefert ohne Query eine kuratierte Ergebnisliste", () => {
    const results = runKnowledgeSearch({
      query: "",
      index: mockIndex,
      topicFilter: "alle",
      statusFilter: "alle",
      maxResults: 10,
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((result) => result.status === "freigegeben")).toBe(true);
  });
});

describe("runKnowledgeDocumentSearch", () => {
  it("liefert dokumentbasierte Treffer fuer eine Query", () => {
    const results = runKnowledgeDocumentSearch({
      query: "Stichtag FAQ",
      index: mockIndex,
      topicFilter: "alle",
      statusFilter: "alle",
      maxResults: 10,
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].dokumentId).toBe("faq-antragstellende");
  });

  it("beruecksichtigt Statusfilter auch fuer Dokumenttreffer", () => {
    const results = runKnowledgeDocumentSearch({
      query: "",
      index: mockIndex,
      topicFilter: "alle",
      statusFilter: "freigegeben",
      maxResults: 10,
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((result) => result.status === "freigegeben")).toBe(true);
  });

  it("liefert ohne Query einen klaren Einstieg mit mindestens einem Treffer", () => {
    const results = runKnowledgeDocumentSearch({
      query: "",
      index: mockIndex,
      topicFilter: "alle",
      statusFilter: "alle",
      maxResults: 10,
    });

    expect(results.length).toBeGreaterThan(0);
    expect(new Set(results.map((result) => result.dokumentId)).size).toBe(results.length);
  });
});