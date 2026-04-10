import type { AnswerEntry, KnowledgeCategoryId, TopicId } from "@/knowledge/types";

export type KnowledgeCategoryMeta = {
  label: string;
  description: string;
  topicIds: TopicId[];
};

export const knowledgeCategoryMeta: Record<KnowledgeCategoryId, KnowledgeCategoryMeta> = {
  antragsverfahren: {
    label: "Verfahren und Fristen",
    description: "Einstufig, zweistufig, Laufzeiten, Einreichung und Stichtage.",
    topicIds: ["fristen", "formale_voraussetzungen"],
  },
  konsortium_und_rollen: {
    label: "Akteure und Zuständigkeiten",
    description: "Antragsberechtigte, Krankenkassen, Innovationsausschuss und Zuständigkeiten.",
    topicIds: ["antragsrollen", "formale_voraussetzungen"],
  },
  fristen_und_formalia: {
    label: "Fundstellen und Quellen",
    description: "Quellenlogik, Einordnung der Materialien und formale Fundstellen.",
    topicIds: ["unterlagen", "formale_voraussetzungen"],
  },
  foerderkriterien_und_qualitaet: {
    label: "Voraussetzungen und Bewertung",
    description: "Förderkriterien, Qualitätsanforderungen, Ausschlüsse und Bewertung.",
    topicIds: ["formale_voraussetzungen", "foerderfaehigkeit"],
  },
  rechtsgrundlagen_und_transfer: {
    label: "Rechtsgrundlagen und Einordnung",
    description: "Förderzweck, Rechtsrahmen, themenspezifische und themenoffene Linien.",
    topicIds: ["foerderfaehigkeit", "formale_voraussetzungen"],
  },
  digitalisierung_und_datenschutz: {
    label: "Präsentationen und Überblicke",
    description: "Kuratiertes Wissen aus Präsentationen, Überblicken und Einordnungen.",
    topicIds: ["foerderfaehigkeit", "fristen", "formale_voraussetzungen"],
  },
  finanzierung_und_kosten: {
    label: "Budget und Fördermittel",
    description: "Jahresbudget, Fördersumme, Fördermittelverteilung und Infrastrukturpauschale.",
    topicIds: ["foerderfaehigkeit", "formale_voraussetzungen"],
  },
  nachweise_und_berichtswesen: {
    label: "Prozesse und Berichtswesen",
    description: "Prozessgrafiken, Berichtspflichten und Schritte bis zur Transferempfehlung.",
    topicIds: ["unterlagen", "formale_voraussetzungen", "fristen"],
  },
};

const defaultCategoryByTopic: Record<TopicId, KnowledgeCategoryId[]> = {
  foerderfaehigkeit: ["finanzierung_und_kosten", "rechtsgrundlagen_und_transfer"],
  fristen: ["antragsverfahren", "nachweise_und_berichtswesen"],
  unterlagen: ["nachweise_und_berichtswesen", "fristen_und_formalia"],
  antragsrollen: ["konsortium_und_rollen", "rechtsgrundlagen_und_transfer"],
  formale_voraussetzungen: ["foerderkriterien_und_qualitaet", "fristen_und_formalia"],
};

export const getCategoriesForEntry = (entry: AnswerEntry): KnowledgeCategoryId[] =>
  entry.kategorien && entry.kategorien.length > 0 ? entry.kategorien : defaultCategoryByTopic[entry.topicId];
