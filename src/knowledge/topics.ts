import type { TopicId } from "@/knowledge/types";

export const topicMeta: Record<TopicId, { label: string; description: string }> = {
  foerderfaehigkeit: {
    label: "Förderfähigkeit",
    description: "Wer ist förderfähig, welche Vorhaben passen in den Innovationsfonds?",
  },
  fristen: {
    label: "Fristen und Einreichung",
    description: "Welche Stichtage, Verfahren und Einreichungswege gelten?",
  },
  unterlagen: {
    label: "Erforderliche Unterlagen",
    description: "Welche Dokumente sind für Antrag und Einreichung notwendig?",
  },
  antragsrollen: {
    label: "Antragsrollen",
    description: "Wer darf beantragen, welche Rollen sind im Konsortium vorgesehen?",
  },
  formale_voraussetzungen: {
    label: "Formale Voraussetzungen",
    description: "Welche formalen Bedingungen und Regelwerke müssen eingehalten werden?",
  },
};

export const wisdomTree: Array<{
  id: string;
  label: string;
  topics: TopicId[];
  fragen: string[];
}> = [
  {
    id: "eignung",
    label: "1) Eignung und Scope",
    topics: ["foerderfaehigkeit", "antragsrollen"],
    fragen: [
      "Wer ist antragsberechtigt im Innovationsfonds?",
      "Welche Vorhaben gelten als förderfähig?",
      "Welche Rolle können Versorgungspartner übernehmen?",
    ],
  },
  {
    id: "einreichung",
    label: "2) Fristen und Ablauf",
    topics: ["fristen", "unterlagen"],
    fragen: [
      "Wann ist die nächste Einreichungsfrist?",
      "Welche Unterlagen müssen zur Frist vollständig vorliegen?",
      "Welche Formvorgaben gelten für den Antrag?",
    ],
  },
  {
    id: "compliance",
    label: "3) Formale Compliance",
    topics: ["formale_voraussetzungen"],
    fragen: [
      "Welche Nebenbestimmungen gelten für geförderte Projekte?",
      "Welche Nachweise sind bei Bewilligung später erforderlich?",
      "Welche Regeln gelten für Personal- und Kostenansätze?",
    ],
  },
];

export const initialSuggestedQuestions = [
  "Wer ist antragsberechtigt im Innovationsfonds?",
  "Welche Unterlagen brauche ich für die Antragseinreichung?",
  "Wann ist die Einreichungsfrist für NVF1/NVF2?",
  "Welche formalen Voraussetzungen müssen vor Antragstellung erfüllt sein?",
];
