import type { AnswerEntry, KnowledgeCategoryId, TopicId } from "@/knowledge/types";

export type KnowledgeCategoryMeta = {
  label: string;
  description: string;
  topicIds: TopicId[];
};

export const knowledgeCategoryMeta: Record<KnowledgeCategoryId, KnowledgeCategoryMeta> = {
  antragsverfahren: {
    label: "Antragsverfahren",
    description: "Portal, Unterlagen, Synopse und formale Anforderungen bei der Einreichung.",
    topicIds: ["unterlagen", "fristen"],
  },
  konsortium_und_rollen: {
    label: "Konsortium und Rollen",
    description: "Antragsberechtigung, Krankenkassenbeteiligung, Rollen- und Partnerlogik.",
    topicIds: ["antragsrollen", "foerderfaehigkeit"],
  },
  fristen_und_formalia: {
    label: "Fristen und Formalia",
    description: "Stichtage, Seitenvorgaben, Formblätter und formale Ausschlussgründe.",
    topicIds: ["fristen", "unterlagen", "formale_voraussetzungen"],
  },
  foerderkriterien_und_qualitaet: {
    label: "Förderkriterien und Qualität",
    description: "Relevanz, Evaluationsqualität, Machbarkeit und Umsetzungspotenzial.",
    topicIds: ["foerderfaehigkeit", "formale_voraussetzungen"],
  },
  rechtsgrundlagen_und_transfer: {
    label: "Rechtsgrundlagen und Transfer",
    description: "Rechtslogik für Versorgungstransfer und Verstetigung in der GKV.",
    topicIds: ["foerderfaehigkeit", "antragsrollen"],
  },
  digitalisierung_und_datenschutz: {
    label: "Digitalisierung und Datenschutz",
    description: "ePA, TI, Interoperabilität, Datenschutz und digitale Produktkontexte.",
    topicIds: ["formale_voraussetzungen", "foerderfaehigkeit"],
  },
  finanzierung_und_kosten: {
    label: "Finanzierung und Kosten",
    description: "Förderfähige Ausgaben, Personalmittel, Finanzierungsplan und Mittelverwendung.",
    topicIds: ["foerderfaehigkeit", "formale_voraussetzungen"],
  },
  nachweise_und_berichtswesen: {
    label: "Nachweise und Berichtswesen",
    description: "Zwischenberichte, Verwendungsnachweise, Belege und Veröffentlichungspflichten.",
    topicIds: ["formale_voraussetzungen", "fristen"],
  },
};

const defaultCategoryByTopic: Record<TopicId, KnowledgeCategoryId[]> = {
  foerderfaehigkeit: ["foerderkriterien_und_qualitaet", "rechtsgrundlagen_und_transfer"],
  fristen: ["fristen_und_formalia", "antragsverfahren"],
  unterlagen: ["antragsverfahren", "fristen_und_formalia"],
  antragsrollen: ["konsortium_und_rollen", "rechtsgrundlagen_und_transfer"],
  formale_voraussetzungen: ["nachweise_und_berichtswesen", "finanzierung_und_kosten"],
};

export const getCategoriesForEntry = (entry: AnswerEntry): KnowledgeCategoryId[] =>
  entry.kategorien && entry.kategorien.length > 0 ? entry.kategorien : defaultCategoryByTopic[entry.topicId];
