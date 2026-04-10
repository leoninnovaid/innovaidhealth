import type { TopicId } from "@/knowledge/types";

export const topicMeta: Record<TopicId, { label: string; description: string }> = {
  foerderfaehigkeit: {
    label: "Budget und Förderlogik",
    description: "Budget, Fördermittel, Förderzweck und förderfähige Ausgaben im Innovationsfonds.",
  },
  fristen: {
    label: "Verfahren und Fristen",
    description: "Verfahrensarten, Laufzeiten, Einreichung und wichtige Stichtage 2026.",
  },
  unterlagen: {
    label: "Prozesse und Unterlagen",
    description: "Prozessgrafiken, Berichtspflichten, Fundstellen und Unterlagenlogik.",
  },
  antragsrollen: {
    label: "Akteure und Zuständigkeiten",
    description: "Antragsberechtigung, Krankenkassenrolle, Gremien und Zuständigkeiten.",
  },
  formale_voraussetzungen: {
    label: "Voraussetzungen und Bewertung",
    description: "Fördervoraussetzungen, Ausschlüsse, Bewertungskriterien und Qualitätsanforderungen.",
  },
};

export const wisdomTree: Array<{
  id: string;
  label: string;
  topics: TopicId[];
  fragen: string[];
}> = [
  {
    id: "verfahren",
    label: "1) Verfahren und Fristen",
    topics: ["fristen", "formale_voraussetzungen"],
    fragen: [
      "Was ist der Kernunterschied zwischen einstufigen und zweistufigen NVF-Verfahren?",
      "Welche Laufzeit und Frist gelten für das einstufig lange NVF-Verfahren 2026?",
      "Wie funktioniert die Einreichung im einstufig kurzen Verfahren 2026?",
    ],
  },
  {
    id: "foerderlogik",
    label: "2) Förderlogik und Budget",
    topics: ["foerderfaehigkeit", "formale_voraussetzungen"],
    fragen: [
      "Wie verteilt sich das reguläre Jahresbudget des Innovationsfonds laut Seminarfolie?",
      "Welche Sonderregel galt für die Fördersumme 2026?",
      "Was ist nach § 92a Abs. 1 Satz 5 SGB V förderfähig?",
    ],
  },
  {
    id: "akteure",
    label: "3) Akteure und Prozesse",
    topics: ["antragsrollen", "unterlagen"],
    fragen: [
      "Wer ist antragsberechtigt?",
      "Wer bewertet die Anträge und wer entscheidet über die Förderung?",
      "Welche Berichtspflichten zeigt die Grafik 'Vom Förderbescheid bis zur Vorlage des Abschlussberichts'?",
    ],
  },
];

export const initialSuggestedQuestions = [
  "Was ist der Kernunterschied zwischen einstufigen und zweistufigen NVF-Verfahren?",
  "Welche Laufzeit und Frist gelten für das einstufig lange NVF-Verfahren 2026?",
  "Wer ist antragsberechtigt?",
  "Was ist nach § 92a Abs. 1 Satz 5 SGB V förderfähig?",
];
