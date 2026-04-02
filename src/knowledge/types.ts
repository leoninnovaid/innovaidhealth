export type KnowledgeDocumentType =
  | "FAQ"
  | "Leitfaden"
  | "Foerderbekanntmachung"
  | "ANBest"
  | "Personalmittelsaetze";

export type TopicId =
  | "foerderfaehigkeit"
  | "fristen"
  | "unterlagen"
  | "antragsrollen"
  | "formale_voraussetzungen";

export type ReviewStatus = "roh" | "in_review" | "freigegeben";

export type KnowledgeSection = {
  id: string;
  ueberschrift: string;
  volltext: string;
  seite: number;
  schlagwoerter?: string[];
};

export type KnowledgeDocument = {
  id: string;
  titel: string;
  quelle_datei: string;
  dokumenttyp: KnowledgeDocumentType;
  abschnitte: KnowledgeSection[];
};

export type SourceReference = {
  dokumentId: string;
  abschnittId?: string;
  seite?: number;
  zitat?: string;
};

export type AnswerEntry = {
  slug: string;
  topicId: TopicId;
  frage: string;
  antwort_kurz: string;
  antwort_lang: string;
  verwandte_fragen: string[];
  quellen: SourceReference[];
  status: ReviewStatus;
};

export type QuestionRule = {
  id: string;
  topicId: TopicId;
  name: string;
  patterns: string[];
  keywords: string[];
  synonyme: string[];
  answerSlugs: string[];
  priority: number;
};

export type KnowledgeIndex = {
  generatedAt: string;
  sourceDir: string;
  documents: KnowledgeDocument[];
};

export type MatchedSnippet = {
  dokumentId: string;
  abschnittId: string;
  seite: number;
  text: string;
};

export type SearchResult = {
  slug: string;
  frage: string;
  topicId: TopicId;
  status: ReviewStatus;
  score: number;
  answer: AnswerEntry;
  matchedRuleIds: string[];
  snippets: MatchedSnippet[];
};
