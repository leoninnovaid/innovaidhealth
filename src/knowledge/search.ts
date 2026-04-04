import { answerEntries } from "@/knowledge/answer-entries";
import { questionRules } from "@/knowledge/question-rules";
import type {
  AnswerEntry,
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
  formale_voraussetzungen: ["formal", "anbest", "voraussetzung", "nebenbestimmung", "kosten", "personal"],
};

function normalize(input: string): string {
  return input.toLowerCase().replace(/[^\w\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(input: string): string[] {
  return normalize(input)
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length >= 3 && !STOPWORDS.has(token));
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
  const firstToken = tokens.find((token) => lower.includes(token));
  if (!firstToken) {
    return cleaned.slice(0, 240);
  }

  const tokenIndex = lower.indexOf(firstToken);
  const start = Math.max(0, tokenIndex - 90);
  const end = Math.min(cleaned.length, tokenIndex + 190);
  return cleaned.slice(start, end).trim();
}

function sectionMatchesTopic(sectionText: string, topicId: TopicId, sectionTags?: string[]): boolean {
  const lower = sectionText.toLowerCase();
  const topicKeywords = TOPIC_KEYWORDS[topicId];
  if (sectionTags?.some((tag) => tag === topicId)) {
    return true;
  }
  return topicKeywords.some((keyword) => lower.includes(keyword));
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

export function runKnowledgeSearch({
  query,
  index,
  topicFilter,
  statusFilter,
  maxResults = 20,
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
