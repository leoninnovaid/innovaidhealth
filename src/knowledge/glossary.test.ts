import { describe, expect, it } from "vitest";

import { annotateGlossaryText, simplifyContributionText } from "@/knowledge/glossary";

describe("glossary annotations", () => {
  it("annotates abbreviations and plural forms", () => {
    const segments = annotateGlossaryText(
      "Die Krankenkassen prüfen NVF2-Ideenskizzen und Formblätter vor dem Verwendungsnachweis.",
    );

    const terms = segments.filter((segment) => segment.type === "term");
    expect(terms.length).toBeGreaterThanOrEqual(4);
    expect(terms.some((segment) => segment.type === "term" && /Krankenkassen/i.test(segment.text))).toBe(true);
    expect(terms.some((segment) => segment.type === "term" && /NVF2/i.test(segment.text))).toBe(true);
    expect(terms.some((segment) => segment.type === "term" && /Ideenskizzen/i.test(segment.text))).toBe(true);
    expect(terms.some((segment) => segment.type === "term" && /Formblätter/i.test(segment.text))).toBe(true);
    expect(terms.some((segment) => segment.type === "term" && /Verwendungsnachweis/i.test(segment.text))).toBe(true);
  });
});

describe("simple language transform", () => {
  it("replaces complex wording", () => {
    const text = "Die Abgrenzung ist nachvollziehbar und verfahrensrelevant.";
    const simplified = simplifyContributionText(text);

    expect(simplified).toContain("Trennung");
    expect(simplified).toContain("klar");
    expect(simplified).toContain("wichtig für den Ablauf");
  });
});
