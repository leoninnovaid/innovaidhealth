const POSSIBLE_MOJIBAKE_REGEX = /[ÃÂâ]/;
const COMMON_ARTIFACT_REGEX = /(?:î€[^\s]*|â€¢|â€“|â€”|â€ž|â€œ|�)/g;
const PAGE_FOOTER_REGEX = /^\s*Seite\s+\d+(?:\s*\/\s*\d+)?(?:\s+\d{2}\.\d{2}\.\d{4})?\s*$/i;

const scoreReadability = (text: string) => {
  const umlautHits = (text.match(/[ÄÖÜäöüß]/g) ?? []).length;
  const artifactHits = (text.match(/[ÃÂâ�]/g) ?? []).length;
  return umlautHits - artifactHits;
};

const decodeLatin1AsUtf8 = (value: string) => {
  const bytes = Uint8Array.from(Array.from(value), (char) => char.charCodeAt(0) & 0xff);
  return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
};

export const normalizeMojibake = (value: string): string => {
  if (!value || !POSSIBLE_MOJIBAKE_REGEX.test(value)) {
    return value;
  }

  try {
    const decoded = decodeLatin1AsUtf8(value);
    if (!decoded || decoded.includes("\ufffd")) {
      return value;
    }

    return scoreReadability(decoded) >= scoreReadability(value) ? decoded : value;
  } catch {
    return value;
  }
};

export const cleanDocumentText = (value: string): string => {
  const normalized = normalizeMojibake(value);

  const cleanedLines = normalized
    .replace(/\r/g, "\n")
    .replace(COMMON_ARTIFACT_REGEX, " ")
    .split("\n")
    .map((line) => line.trim())
    .map((line) => line.replace(/^[•▪■◆▶◀►◄◦·]+\s*/g, "- "))
    .map((line) => line.replace(/[•▪■◆▶◀►◄◦·]/g, ""))
    .map((line) => line.replace(/\s{2,}/g, " ").trim())
    .filter((line) => line.length > 0 && !PAGE_FOOTER_REGEX.test(line));

  const joined = cleanedLines.join("\n");

  return joined
    .replace(/-\n(?=[a-zäöü])/gi, "")
    .replace(/\n{2,}/g, "\n\n")
    .replace(/(?<!\n)\n(?!\n)/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
};

export const cleanDocumentHeading = (value: string): string => {
  return cleanDocumentText(value)
    .replace(/\.$/, "")
    .slice(0, 180);
};

export const cleanSnippetText = (value: string): string => {
  return cleanDocumentText(value).replace(/\n/g, " ").trim();
};
