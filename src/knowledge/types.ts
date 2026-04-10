export type KnowledgeDocumentType =
  | "FAQ"
  | "Leitfaden"
  | "Foerderbekanntmachung"
  | "ANBest"
  | "Personalmittelsaetze"
  | "Praesentation"
  | "Infoflyer"
  | "Prozessgrafik";

export type TopicId =
  | "foerderfaehigkeit"
  | "fristen"
  | "unterlagen"
  | "antragsrollen"
  | "formale_voraussetzungen";

export type KnowledgeCategoryId =
  | "antragsverfahren"
  | "konsortium_und_rollen"
  | "fristen_und_formalia"
  | "foerderkriterien_und_qualitaet"
  | "rechtsgrundlagen_und_transfer"
  | "digitalisierung_und_datenschutz"
  | "finanzierung_und_kosten"
  | "nachweise_und_berichtswesen";

export type ReviewStatus = "roh" | "in_review" | "freigegeben";

export type KnowledgeSection = {
  id: string;
  ueberschrift: string;
  volltext: string;
  seite: number;
  fundstelle?: string;
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
  fundstelle?: string;
  zitat?: string;
};

export type AnswerEntry = {
  slug: string;
  topicId: TopicId;
  kategorien?: KnowledgeCategoryId[];
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
  fundstelle?: string;
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

export type KnowledgeViewMode = "qa" | "docs";

export type DocumentSearchResult = {
  id: string;
  dokumentId: string;
  dokumentTitel: string;
  dokumenttyp: KnowledgeDocumentType;
  abschnittId: string;
  abschnittTitel: string;
  seite: number;
  fundstelle?: string;
  status: ReviewStatus;
  score: number;
  snippet: string;
  matchedTopicIds: TopicId[];
};
