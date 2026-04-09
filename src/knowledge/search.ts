import { answerEntries } from "@/knowledge/answer-entries";
import { questionRules } from "@/knowledge/question-rules";
import type {
  AnswerEntry,
  DocumentSearchResult,
  KnowledgeDocument,
  KnowledgeIndex,
  MatchedSnippet,
  QuestionRule,
  ReviewStatus,
  SearchResult,
  TopicId,
} from "@/knowledge/types";

type SearchOptions = {
  query: string;
  index: KnowledgeIndex | null;
  topicFilter: TopicId | "alle";
  statusFilter: ReviewStatus | "alle";
  maxResults?: number;
};

type DocumentSearchOptions = {
  query: string;
  index: KnowledgeIndex | null;
  topicFilter: TopicId | "alle";
  statusFilter: ReviewStatus | "alle";
  maxResults?: number;
};

const STOPWORDS = new Set([
  "und",
  "oder",
  "der",
  "die",
  "das",
  "ein",
  "eine",
  "im",
  "in",
  "zu",
  "von",
  "mit",
  "fuer",
  "fur",
  "auf",
  "an",
  "ist",
  "sind",
  "ich",
  "wir",
  "was",
  "wie",
  "wer",
  "wann",
  "welche",
  "welcher",
  "welches",
]);

const TOPIC_KEYWORDS: Record<TopicId, string[]> = {
  foerderfaehigkeit: ["foerder", "projekt", "nvf", "innovationsfonds", "kriterium"],
  fristen: ["frist", "stichtag", "deadline", "einreich", "abgabe", "zeitplan"],
  unterlagen: ["unterlage", "anlage", "formular", "dokument", "nachweis", "leitfaden"],
  antragsrollen: ["antragsberechtigt", "antragsteller", "konsortium", "partner", "rolle", "verbund"],
  formale_voraussetzungen: ["anbest", "formal", "voraussetzung", "nebenbestimmung", "kosten", "personal"],
};

const STATUS_PRIORITY: Record<ReviewStatus, number> = {
  roh: 1,
  in_review: 2,
  freigegeben: 3,
};

function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(input: string): string[] {
  return normalize(input)
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length >= 2 && !STOPWORDS.has(token));
}

function compileRulePatterns(rule: QuestionRule): RegExp[] {
  return rule.patterns.map((pattern) => new RegExp(pattern, "i"));
}

function snippetFromText(text: string, tokens: string[]): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return "";
  }

  const lower = cleaned.toLowerCase();
  let bestMatch: { token: string; index: number; length: number } | null = null;

  for (const token of tokens) {
    const index = lower.indexOf(token);
    if (index !== -1 && (!bestMatch || token.length > bestMatch.length)) {
      bestMatch = { token, index, length: token.length };
    }
  }

  if (!bestMatch) {
    return cleaned.slice(0, 240);
  }

  const start = Math.max(0, bestMatch.index - 100);
  const end = Math.min(cleaned.length, bestMatch.index + 200);
  let snippet = cleaned.slice(start, end).trim();

  if (start > 0) snippet = `...${snippet}`;
  if (end < cleaned.length) snippet = `${snippet}...`;

  return snippet;
}

function sectionMatchesTopic(sectionText: string, topicId: TopicId, sectionTags?: string[]): boolean {
  if (sectionTags?.some((tag) => tag === topicId)) {
    return true;
  }

  const lower = sectionText.toLowerCase();
  const topicKeywords = TOPIC_KEYWORDS[topicId];
  return topicKeywords.some((keyword) => lower.includes(keyword));
}

function extractTopicHits(sectionText: string, sectionTags?: string[]): TopicId[] {
  return (Object.keys(TOPIC_KEYWORDS) as TopicId[]).filter((topicId) => sectionMatchesTopic(sectionText, topicId, sectionTags));
}

function buildSnippetsForAnswer(
  answer: AnswerEntry,
  documents: KnowledgeDocument[],
  queryTokens: string[],
): MatchedSnippet[] {
  const snippets: MatchedSnippet[] = [];

  for (const source of answer.quellen) {
    const document = documents.find((doc) => doc.id === source.dokumentId);
    if (!document) {
      continue;
    }

    const candidateSections = document.abschnitte.filter((section) => {
      if (source.abschnittId && section.id !== source.abschnittId) {
        return false;
      }
      if (source.seite && section.seite !== source.seite) {
        return false;
      }
      if (queryTokens.length === 0) {
        return sectionMatchesTopic(section.volltext, answer.topicId, section.schlagwoerter);
      }
      const lowered = section.volltext.toLowerCase();
      const tokenHit = queryTokens.some((token) => lowered.includes(token));
      const topicHit = sectionMatchesTopic(section.volltext, answer.topicId, section.schlagwoerter);
      return tokenHit || topicHit;
    });

    const section = candidateSections[0] ?? document.abschnitte[0];
    if (!section) {
      continue;
    }

    snippets.push({
      dokumentId: document.id,
      abschnittId: section.id,
      seite: section.seite,
      text: snippetFromText(section.volltext, queryTokens),
    });
  }

  return snippets.slice(0, 3);
}

function computeRuleScore(
  query: string,
  queryTokens: string[],
  answerSlug: string,
): { score: number; matchedRuleIds: string[] } {
  if (!query) {
    return { score: 0, matchedRuleIds: [] };
  }

  let score = 0;
  const matchedRuleIds: string[] = [];

  for (const rule of questionRules) {
    if (!rule.answerSlugs.includes(answerSlug)) {
      continue;
    }

    const patterns = compileRulePatterns(rule);
    const patternHit = patterns.some((pattern) => pattern.test(query));
    const keywordHits = rule.keywords.filter((keyword) => query.includes(keyword)).length;
    const synonymHits = rule.synonyme.filter((synonym) => query.includes(normalize(synonym))).length;
    const tokenHits = queryTokens.filter((token) => {
      return rule.keywords.some((keyword) => keyword.includes(token) || token.includes(keyword));
    }).length;

    const localScore =
      (patternHit ? 30 : 0) + keywordHits * 7 + synonymHits * 5 + tokenHits * 3 + Math.ceil(rule.priority / 20);

    if (localScore > 0) {
      score += localScore;
      matchedRuleIds.push(rule.id);
    }
  }

  return { score, matchedRuleIds };
}

function addStatusToMap(map: Map<string, Set<ReviewStatus>>, key: string, status: ReviewStatus) {
  const set = map.get(key) ?? new Set<ReviewStatus>();
  set.add(status);
  map.set(key, set);
}

function buildSourceStatusLookup() {
  const byDocument = new Map<string, Set<ReviewStatus>>();
  const bySection = new Map<string, Set<ReviewStatus>>();
  const byPage = new Map<string, Set<ReviewStatus>>();

  for (const answer of answerEntries) {
    for (const source of answer.quellen) {
      addStatusToMap(byDocument, source.dokumentId, answer.status);

      if (source.abschnittId) {
        addStatusToMap(bySection, `${source.dokumentId}::${source.abschnittId}`, answer.status);
      }

      if (source.seite) {
        addStatusToMap(byPage, `${source.dokumentId}::page::${source.seite}`, answer.status);
      }
    }
  }

  return { byDocument, bySection, byPage };
}

function resolveSectionStatuses(
  lookup: ReturnType<typeof buildSourceStatusLookup>,
  documentId: string,
  sectionId: string,
  page: number,
): Set<ReviewStatus> {
  const merged = new Set<ReviewStatus>();

  lookup.byDocument.get(documentId)?.forEach((status) => merged.add(status));
  lookup.bySection.get(`${documentId}::${sectionId}`)?.forEach((status) => merged.add(status));
  lookup.byPage.get(`${documentId}::page::${page}`)?.forEach((status) => merged.add(status));

  if (merged.size === 0) {
    merged.add("roh");
  }

  return merged;
}

function pickDisplayStatus(statuses: Set<ReviewStatus>): ReviewStatus {
  return Array.from(statuses).sort((a, b) => STATUS_PRIORITY[b] - STATUS_PRIORITY[a])[0] ?? "roh";
}

export function runKnowledgeSearch({
  query,
  index,
  topicFilter,
  statusFilter,
  maxResults = 60,
}: SearchOptions): SearchResult[] {
  const normalizedQuery = normalize(query);
  const queryTokens = tokenize(query);
  const documents = index?.documents ?? [];
  const isEmptyQuery = normalizedQuery.length === 0;

  return answerEntries
    .filter((entry) => (topicFilter === "alle" ? true : entry.topicId === topicFilter))
    .filter((entry) => {
      if (isEmptyQuery && statusFilter === "alle") {
        return entry.status === "freigegeben";
      }
      return statusFilter === "alle" ? true : entry.status === statusFilter;
    })
    .map((entry) => {
      let score = isEmptyQuery ? 15 : 0;

      const contentBlob = normalize(
        `${entry.frage} ${entry.antwort_kurz} ${entry.antwort_lang} ${entry.verwandte_fragen.join(" ")}`,
      );
      const contentTokenHits = queryTokens.filter((token) => contentBlob.includes(token)).length;
      score += contentTokenHits * 6;

      const ruleScore = computeRuleScore(normalizedQuery, queryTokens, entry.slug);
      score += ruleScore.score;

      const snippets = buildSnippetsForAnswer(entry, documents, queryTokens);
      score += snippets.length * 4;

      if (topicFilter !== "alle" && topicFilter === entry.topicId) {
        score += 8;
      }

      if (entry.status === "freigegeben") {
        score += 3;
      }

      return {
        slug: entry.slug,
        frage: entry.frage,
        topicId: entry.topicId,
        status: entry.status,
        score,
        answer: entry,
        matchedRuleIds: ruleScore.matchedRuleIds,
        snippets,
      };
    })
    .filter((result) => (normalizedQuery.length === 0 ? true : result.score > 0))
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

export function runKnowledgeDocumentSearch({
  query,
  index,
  topicFilter,
  statusFilter,
  maxResults = 30,
}: DocumentSearchOptions): DocumentSearchResult[] {
  const documents = index?.documents ?? [];
  const normalizedQuery = normalize(query);
  const queryTokens = tokenize(query);
  const sourceStatusLookup = buildSourceStatusLookup();

  const candidates: DocumentSearchResult[] = [];

  for (const document of documents) {
    for (const section of document.abschnitte) {
      const topicHits = extractTopicHits(section.volltext, section.schlagwoerter);

      if (topicFilter !== "alle" && !topicHits.includes(topicFilter)) {
        continue;
      }

      const statuses = resolveSectionStatuses(sourceStatusLookup, document.id, section.id, section.seite);
      const displayStatus = pickDisplayStatus(statuses);

      if (statusFilter !== "alle" && !statuses.has(statusFilter)) {
        continue;
      }

      const sectionBlob = normalize(`${document.titel} ${document.dokumenttyp} ${section.ueberschrift} ${section.volltext}`);
      const tokenHits = queryTokens.filter((token) => sectionBlob.includes(token)).length;
      const headingHit = normalizedQuery.length > 0 && normalize(section.ueberschrift).includes(normalizedQuery);

      if (normalizedQuery.length > 0 && tokenHits === 0 && !headingHit) {
        continue;
      }

      let score = normalizedQuery.length === 0 ? 10 : 0;
      score += tokenHits * 5;
      if (headingHit) {
        score += 12;
      }
      if (topicFilter !== "alle" && topicHits.includes(topicFilter)) {
        score += 8;
      }
      score += STATUS_PRIORITY[displayStatus];

      candidates.push({
        id: `${document.id}:${section.id}`,
        dokumentId: document.id,
        dokumentTitel: document.titel,
        dokumenttyp: document.dokumenttyp,
        abschnittId: section.id,
        abschnittTitel: section.ueberschrift,
        seite: section.seite,
        status: displayStatus,
        score,
        snippet: snippetFromText(section.volltext, queryTokens),
        matchedTopicIds: topicHits,
      });
    }
  }

  const sorted = candidates.sort((a, b) => b.score - a.score);

  if (normalizedQuery.length > 0) {
    return sorted.slice(0, maxResults);
  }

  const oneEntryPerDocument: DocumentSearchResult[] = [];
  const seenDocuments = new Set<string>();

  for (const result of sorted) {
    if (seenDocuments.has(result.dokumentId)) {
      continue;
    }

    seenDocuments.add(result.dokumentId);
    oneEntryPerDocument.push(result);

    if (oneEntryPerDocument.length >= maxResults) {
      break;
    }
  }

  return oneEntryPerDocument;
}
