import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const answersPath = path.join(projectRoot, "src", "knowledge", "answer-entries.ts");
const indexPath = path.join(projectRoot, "public", "knowledge", "innovation-fund-index.json");

function extractEntries(tsContent) {
  const entryRegex = /{\s*slug:\s*"([^"]+)"([\s\S]*?)status:\s*"([^"]+)"\s*,\s*}/g;
  const entries = [];

  let match;
  while ((match = entryRegex.exec(tsContent)) !== null) {
    const slug = match[1];
    const body = match[2];

    const frageMatch = body.match(/frage:\s*"([^"]+)"/);
    const relatedBlock = body.match(/verwandte_fragen:\s*\[([\s\S]*?)\]/);
    const related = relatedBlock
      ? [...relatedBlock[1].matchAll(/"([^"]+)"/g)].map((item) => item[1])
      : [];

    const quellen = [...body.matchAll(/dokumentId:\s*"([^"]+)"([\s\S]*?)(?=},|\n\s*])/g)].map((sourceMatch) => {
      const sourceBlock = sourceMatch[2];
      const abschnitt = sourceBlock.match(/abschnittId:\s*"([^"]+)"/)?.[1];
      const seite = sourceBlock.match(/seite:\s*(\d+)/)?.[1];
      return {
        dokumentId: sourceMatch[1],
        abschnittId: abschnitt ?? null,
        seite: seite ? Number(seite) : null,
      };
    });

    entries.push({
      slug,
      frage: frageMatch?.[1] ?? "",
      verwandteFragen: related,
      quellen,
    });
  }

  return entries;
}

function unique(values) {
  return [...new Set(values)];
}

async function main() {
  const [answersRaw, indexRaw] = await Promise.all([fs.readFile(answersPath, "utf8"), fs.readFile(indexPath, "utf8")]);
  const entries = extractEntries(answersRaw);
  const index = JSON.parse(indexRaw);

  const errors = [];
  const warnings = [];

  if (entries.length < 40) {
    errors.push(`Es wurden nur ${entries.length} Fragen erkannt (erwartet: mindestens 40).`);
  }

  const slugs = entries.map((entry) => entry.slug);
  const duplicateSlugs = slugs.filter((slug, i) => slugs.indexOf(slug) !== i);
  if (duplicateSlugs.length > 0) {
    errors.push(`Doppelte Slugs gefunden: ${unique(duplicateSlugs).join(", ")}`);
  }

  const fragenSet = new Set(entries.map((entry) => entry.frage));
  entries.forEach((entry) => {
    if (!entry.frage) {
      errors.push(`Eintrag ${entry.slug} hat keine Frage.`);
    }

    if (entry.quellen.length < 2) {
      errors.push(`Eintrag ${entry.slug} hat weniger als zwei Quellen.`);
    }

    entry.verwandteFragen.forEach((frage) => {
      if (!fragenSet.has(frage)) {
        errors.push(`Eintrag ${entry.slug} verweist auf nicht vorhandene verwandte Frage: "${frage}".`);
      }
    });
  });

  const docsById = new Map(index.documents.map((doc) => [doc.id, doc]));

  entries.forEach((entry) => {
    entry.quellen.forEach((quelle) => {
      const doc = docsById.get(quelle.dokumentId);
      if (!doc) {
        errors.push(`Eintrag ${entry.slug} verweist auf unbekanntes Dokument: ${quelle.dokumentId}`);
        return;
      }

      if (quelle.abschnittId) {
        const section = doc.abschnitte.find((item) => item.id === quelle.abschnittId);
        if (!section) {
          errors.push(
            `Eintrag ${entry.slug} verweist auf unbekannten Abschnitt ${quelle.abschnittId} in ${quelle.dokumentId}.`,
          );
        }
      }

      if (quelle.seite) {
        const pageExists = doc.abschnitte.some((item) => item.seite === quelle.seite);
        if (!pageExists) {
          errors.push(`Eintrag ${entry.slug} verweist auf nicht vorhandene Seite ${quelle.seite} in ${quelle.dokumentId}.`);
        }
      }
    });
  });

  if (entries.length !== 40) {
    warnings.push(`Aktuell sind ${entries.length} Fragen gepflegt. Richtwert in dieser Ausbaustufe: 40.`);
  }

  console.log(`Geprüfte Fragen: ${entries.length}`);
  console.log(`Geprüfte Dokumente: ${index.documents.length}`);

  if (warnings.length > 0) {
    console.log("\nWarnungen:");
    warnings.forEach((warning) => console.log(`- ${warning}`));
  }

  if (errors.length > 0) {
    console.error("\nFehler:");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log("\nCheck erfolgreich: Fragen, Verlinkungen und Quellen sind konsistent.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
