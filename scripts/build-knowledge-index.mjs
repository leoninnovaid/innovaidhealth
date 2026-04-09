import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const SOURCE_DOCUMENTS = [
  {
    id: "fbm-nvf1-l-to",
    titel: "Förderbekanntmachung NVF1 Langfassung",
    fileName: "2026-01-23_FBM_NVF1_L_TO.pdf",
    dokumenttyp: "Foerderbekanntmachung",
  },
  {
    id: "fbm-nvf1-k-to",
    titel: "Förderbekanntmachung NVF1 Kurzfassung",
    fileName: "F\u00f6rderbekanntmachung - 2026-01-23_FBM_NVF1_K_TO.pdf",
    dokumenttyp: "Foerderbekanntmachung",
  },
  {
    id: "fbm-nvf2-l-ts",
    titel: "Förderbekanntmachung NVF2 Langfassung TS",
    fileName: "2026-01-23_FBM_NVF2_L_TS.pdf",
    dokumenttyp: "Foerderbekanntmachung",
  },
  {
    id: "fbm-nvf2-l-to",
    titel: "Förderbekanntmachung NVF2 Langfassung TO",
    fileName: "2026-01-23_FBM_NVF2_L_TO.pdf",
    dokumenttyp: "Foerderbekanntmachung",
  },
  {
    id: "leitfaden-nvf1-l",
    titel: "Leitfaden NVF1",
    fileName: "2026-01-23_Leitfaden_NVF1_L.pdf",
    dokumenttyp: "Leitfaden",
  },
  {
    id: "leitfaden-nvf2-l-s",
    titel: "Leitfaden NVF2",
    fileName: "2026-01-23_Leitfaden_NVF2_L_S.pdf",
    dokumenttyp: "Leitfaden",
  },
  {
    id: "anbest-if-stand-juni-2025",
    titel: "ANBest-IF Stand Juni 2025",
    fileName: "ANBest-IF_Stand_Juni_2025.pdf",
    dokumenttyp: "ANBest",
  },
  {
    id: "faq-antragstellende",
    titel: "FAQ Antragstellende",
    fileName: "2026-01-23_FAQ_Antragstellende.pdf",
    dokumenttyp: "FAQ",
  },
  {
    id: "personalmittelsaetze-if-2026",
    titel: "Personalmittelsätze IF 2026",
    fileName: "TV-L-West Musterberechnung NN-Personal 2015ff - 2026-01-23_Personalmittelsaetze_IF_2026.pdf",
    dokumenttyp: "Personalmittelsaetze",
  },
];

const TOPIC_TAGS = {
  foerderfaehigkeit: ["foerder", "innovationsfonds", "nvf", "kriterium", "versorgung"],
  fristen: ["frist", "stichtag", "deadline", "einreich", "abgabe"],
  unterlagen: ["unterlagen", "anlage", "formular", "nachweis", "leitfaden"],
  antragsrollen: ["antragsberechtigt", "antragsteller", "konsortium", "verbund", "partner"],
  formale_voraussetzungen: ["anbest", "form", "voraussetzung", "nebenbestimmung", "personalmittel", "tv-l"],
};

function normalizeWhitespace(input) {
  return input.replace(/\u00a0/g, " ").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
}

function inferTags(text) {
  const lower = text.toLowerCase();
  return Object.entries(TOPIC_TAGS)
    .filter(([, keywords]) => keywords.some((keyword) => lower.includes(keyword)))
    .map(([topicId]) => topicId);
}

function pickHeading(lines, pageNumber) {
  const headingCandidate = lines.find((line) => {
    if (line.length < 6 || line.length > 95) {
      return false;
    }
    const digitRatio = line.replace(/\D/g, "").length / Math.max(1, line.length);
    return digitRatio < 0.35;
  });
  return headingCandidate ?? `Seite ${pageNumber}`;
}

async function extractSectionsFromPdf(pdfFilePath, documentId) {
  const fileData = await fs.readFile(pdfFilePath);
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(fileData) });
  const pdf = await loadingTask.promise;
  const sections = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();

    const linesByY = new Map();
    for (const item of textContent.items) {
      if (!("str" in item)) {
        continue;
      }
      const text = item.str?.trim();
      if (!text) {
        continue;
      }
      const y = Math.round(item.transform[5]);
      const x = item.transform[4];
      const lineItems = linesByY.get(y) ?? [];
      lineItems.push({ x, text });
      linesByY.set(y, lineItems);
    }

    const orderedLines = Array.from(linesByY.entries())
      .sort((a, b) => b[0] - a[0])
      .map(([, items]) => items.sort((a, b) => a.x - b.x).map((item) => item.text).join(" "))
      .map((line) => normalizeWhitespace(line))
      .filter(Boolean);

    const pageText = normalizeWhitespace(orderedLines.join("\n"));
    if (!pageText) {
      continue;
    }

    sections.push({
      id: `${documentId}-seite-${pageNumber}`,
      ueberschrift: pickHeading(orderedLines, pageNumber),
      volltext: pageText,
      seite: pageNumber,
      schlagwoerter: inferTags(pageText),
    });
  }

  return sections;
}

function parseArg(flagName) {
  const index = process.argv.findIndex((arg) => arg === flagName);
  if (index >= 0 && process.argv[index + 1]) {
    return process.argv[index + 1];
  }
  return null;
}

async function main() {
  const scriptFilePath = fileURLToPath(import.meta.url);
  const projectRoot = path.resolve(path.dirname(scriptFilePath), "..");

  const sourceDir =
    parseArg("--source-dir") || process.env.KNOWLEDGE_PDF_DIR || path.join(os.homedir(), "Downloads");
  const outputDir =
    parseArg("--output-dir") ||
    process.env.KNOWLEDGE_OUTPUT_DIR ||
    path.join(projectRoot, "public", "knowledge");

  const documents = [];
  const warnings = [];

  for (const source of SOURCE_DOCUMENTS) {
    const absolutePath = path.join(sourceDir, source.fileName);
    try {
      await fs.access(absolutePath);
    } catch {
      warnings.push(`[MISSING] ${source.fileName}`);
      continue;
    }

    try {
      const sections = await extractSectionsFromPdf(absolutePath, source.id);
      if (sections.length === 0) {
        warnings.push(`[EMPTY] ${source.fileName}`);
        continue;
      }
      documents.push({
        id: source.id,
        titel: source.titel,
        quelle_datei: source.fileName,
        dokumenttyp: source.dokumenttyp,
        abschnitte: sections,
      });
      console.log(`[OK] ${source.fileName} -> ${sections.length} Abschnitte`);
    } catch (error) {
      warnings.push(`[ERROR] ${source.fileName}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  await fs.mkdir(outputDir, { recursive: true });

  const indexPayload = {
    generatedAt: new Date().toISOString(),
    sourceDir,
    documents,
  };

  const jsonOutputPath = path.join(outputDir, "innovation-fund-index.json");
  await fs.writeFile(jsonOutputPath, JSON.stringify(indexPayload, null, 2), "utf-8");

  const markdownLines = [
    "# Innovationsfonds Wissensindex",
    "",
    `- Generiert: ${indexPayload.generatedAt}`,
    `- Quelle: ${sourceDir}`,
    `- Dokumente: ${documents.length}`,
    "",
    "## Dokumente",
    "",
    ...documents.flatMap((doc) => [
      `- ${doc.titel} (${doc.dokumenttyp})`,
      `  - Datei: ${doc.quelle_datei}`,
      `  - Abschnitte: ${doc.abschnitte.length}`,
    ]),
    "",
  ];

  if (warnings.length > 0) {
    markdownLines.push("## Warnungen", "", ...warnings.map((warning) => `- ${warning}`), "");
  }

  const markdownOutputPath = path.join(outputDir, "innovation-fund-index.md");
  await fs.writeFile(markdownOutputPath, markdownLines.join("\n"), "utf-8");

  console.log(`\nJSON geschrieben: ${jsonOutputPath}`);
  console.log(`Markdown geschrieben: ${markdownOutputPath}`);
  if (warnings.length > 0) {
    console.log("\nWarnungen:");
    warnings.forEach((warning) => console.log(`- ${warning}`));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
