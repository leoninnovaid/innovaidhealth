import { describe, expect, it } from "vitest";

import { cleanDocumentHeading, cleanDocumentText, cleanSnippetText } from "@/knowledge/text-cleanup";

describe("text cleanup", () => {
  it("bereinigt störende Symbole und Seitenzeilen im Dokumenttext", () => {
    const input = "î€‚ Beispielpunkt\nSeite 5/13 23.01.2026\nText mit â€¢ Symbol und  extra   Leerzeichen.";
    const result = cleanDocumentText(input);

    expect(result).not.toContain("î€‚");
    expect(result).not.toContain("Seite 5/13");
    expect(result).not.toContain("â€¢");
    expect(result).toContain("Beispielpunkt");
    expect(result).toContain("Text mit Symbol");
  });

  it("liefert kompakte Varianten für Überschrift und Snippet", () => {
    const input = "FÃ¶rderbekanntmachung\nmit Zeilenumbruch";
    const heading = cleanDocumentHeading(input);
    const snippet = cleanSnippetText(input);

    expect(heading.length).toBeGreaterThan(0);
    expect(snippet).toContain(" ");
    expect(snippet).not.toContain("\n");
  });
});
