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
      "Welche Projekte sind von der Förderung ausgeschlossen?",
      "Wann muss eine Krankenkasse beteiligt sein?",
    ],
  },
  {
    id: "einreichung",
    label: "2) Fristen und Ablauf",
    topics: ["fristen", "unterlagen"],
    fragen: [
      "Welche Einreichungsfristen gelten 2026 für NVF1 und NVF2?",
      "Welche Unterlagen müssen in Stufe 1 des zweistufigen Verfahrens vorliegen?",
      "Müssen Formblätter im Original eingereicht werden?",
    ],
  },
  {
    id: "compliance",
    label: "3) Formale Compliance",
    topics: ["formale_voraussetzungen"],
    fragen: [
      "Welche Änderungen sind zustimmungspflichtig?",
      "Welche Anforderungen gelten für Belege und Aufbewahrungsfristen?",
      "Wie funktioniert der Verwendungsnachweis im Innovationsfonds?",
    ],
  },
];

export const initialSuggestedQuestions = [
  "Wer ist antragsberechtigt im Innovationsfonds?",
  "Wie erfolgt die Antragseinreichung für NVF1 und NVF2?",
  "Welche Einreichungsfristen gelten 2026 für NVF1 und NVF2?",
  "Welche Ausgaben sind grundsätzlich förderfähig?",
];
