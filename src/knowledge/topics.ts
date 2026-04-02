import type { TopicId } from "@/knowledge/types";

export const topicMeta: Record<TopicId, { label: string; description: string }> = {
  foerderfaehigkeit: {
    label: "Foerderfaehigkeit",
    description: "Wer ist foerderfaehig, welche Vorhaben passen in den Innovationsfonds?",
  },
  fristen: {
    label: "Fristen und Einreichung",
    description: "Welche Stichtage, Verfahren und Einreichungswege gelten?",
  },
  unterlagen: {
    label: "Erforderliche Unterlagen",
    description: "Welche Dokumente sind fuer den Antrag und die Einreichung notwendig?",
  },
  antragsrollen: {
    label: "Antragsrollen",
    description: "Wer darf beantragen, welche Rollen sind im Konsortium vorgesehen?",
  },
  formale_voraussetzungen: {
    label: "Formale Voraussetzungen",
    description: "Welche formalen Bedingungen und Regelwerke muessen eingehalten werden?",
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
      "Welche Vorhaben gelten als foerderfaehig?",
      "Welche Rolle koennen Versorgungspartner uebernehmen?",
    ],
  },
  {
    id: "einreichung",
    label: "2) Fristen und Ablauf",
    topics: ["fristen", "unterlagen"],
    fragen: [
      "Wann ist die naechste Einreichungsfrist?",
      "Welche Unterlagen muessen zur Frist vollstaendig vorliegen?",
      "Welche Formvorgaben gelten fuer den Antrag?",
    ],
  },
  {
    id: "compliance",
    label: "3) Formale Compliance",
    topics: ["formale_voraussetzungen"],
    fragen: [
      "Welche Nebenbestimmungen gelten fuer gefoerderte Projekte?",
      "Welche Nachweise sind bei Bewilligung spaeter erforderlich?",
      "Welche Regeln gelten fuer Personal- und Kostenansaetze?",
    ],
  },
];

export const initialSuggestedQuestions = [
  "Wer ist antragsberechtigt im Innovationsfonds?",
  "Welche Unterlagen brauche ich fuer die Antragseinreichung?",
  "Wann ist die Einreichungsfrist fuer NVF1/NVF2?",
  "Welche formalen Voraussetzungen muessen vor Antragstellung erfuellt sein?",
];
