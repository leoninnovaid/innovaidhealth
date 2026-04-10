import { describe, expect, it } from "vitest";

import { runKnowledgeDocumentSearch, runKnowledgeSearch } from "@/knowledge/search";
import type { KnowledgeIndex } from "@/knowledge/types";

const mockIndex: KnowledgeIndex = {
  generatedAt: "2026-04-10T10:00:00.000Z",
  sourceDir: "C:/mock",
  documents: [
    {
      id: "praesentation-webseminar-nvf-2026",
      titel: "Präsentation Webseminar NVF 2026",
      quelle_datei: "webseminar.pdf",
      dokumenttyp: "Praesentation",
      abschnitte: [
        {
          id: "praesentation-webseminar-nvf-2026-wer-ist-antragsberechtigt",
          ueberschrift: "Wer ist antragsberechtigt?",
          volltext:
            "Frage: Wer ist antragsberechtigt? Kernaussage: Antragsberechtigt sind rechtsfähige und unbeschränkt geschäftsfähige Personen und Personengesellschaften.",
          seite: 21,
          fundstelle: "S. 21",
          schlagwoerter: ["antragsrollen"],
        },
      ],
    },
    {
      id: "innovationsfonds-stand-der-dinge-2026",
      titel: "Der Innovationsfonds: Stand der Dinge",
      quelle_datei: "stand-der-dinge.pdf",
      dokumenttyp: "Praesentation",
      abschnitte: [
        {
          id: "innovationsfonds-stand-der-dinge-2026-foerderfaehig",
          ueberschrift: "Was ist nach § 92a Abs. 1 Satz 5 SGB V förderfähig?",
          volltext:
            "Frage: Was ist nach § 92a Abs. 1 Satz 5 SGB V förderfähig? Kernaussage: Förderfähig sind insbesondere Aufwendungen außerhalb der Regelversorgung.",
          seite: 24,
          fundstelle: "S. 24",
          schlagwoerter: ["foerderfaehigkeit"],
        },
      ],
    },
  ],
};

describe("runKnowledgeSearch", () => {
  it("findet antragsrollen-bezogene Antworten über Frage- und Token-Match", () => {
    const results = runKnowledgeSearch({
      query: "Wer ist antragsberechtigt?",
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
      query: "Welche Frist gilt?",
      index: mockIndex,
      topicFilter: "alle",
      statusFilter: "freigegeben",
      maxResults: 10,
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((result) => result.status === "freigegeben")).toBe(true);
  });

  it("priorisiert exakte Fragen über allgemeinere Treffer", () => {
    const results = runKnowledgeSearch({
      query: "Was ist nach § 92a Abs. 1 Satz 5 SGB V förderfähig?",
      index: mockIndex,
      topicFilter: "alle",
      statusFilter: "alle",
      maxResults: 10,
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].slug).toBe("was-ist-nach-paragraf-92a-abs-1-satz-5-sgb-v-foerderfaehig");
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
  it("liefert dokumentbasierte Treffer für eine Query", () => {
    const results = runKnowledgeDocumentSearch({
      query: "Webseminar",
      index: mockIndex,
      topicFilter: "alle",
      statusFilter: "alle",
      maxResults: 10,
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].dokumentId).toBe("praesentation-webseminar-nvf-2026");
  });

  it("berücksichtigt Statusfilter auch für Dokumenttreffer", () => {
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
