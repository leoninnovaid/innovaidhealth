import type { AnswerEntry } from "@/knowledge/types";

export const answerEntries: AnswerEntry[] = [
  {
    slug: "wer-ist-antragsberechtigt",
    topicId: "antragsrollen",
    frage: "Wer ist antragsberechtigt im Innovationsfonds?",
    antwort_kurz:
      "Antragsberechtigung und Rollen ergeben sich aus der jeweiligen Foerderbekanntmachung und den Leitfaeden. Die konkrete Rolle von Partnern sollte immer gegen die aktuelle Runde geprueft werden.",
    antwort_lang:
      "Fuer jede Runde sollten zuerst die Foerderbekanntmachungen (NVF1/NVF2) und die zugehoerigen Leitfaeden geprueft werden. Dort ist geregelt, welche Institutionen Antragsteller sein duerfen, wie Verbundstrukturen ausgestaltet sein koennen und welche Rolle einzelne Partner uebernehmen. Fuer belastbare Aussagen wird der finale Entwurf gegen diese Quellen quergeprueft.",
    verwandte_fragen: [
      "Welche Rolle koennen Versorgungspartner uebernehmen?",
      "Welche Konsortialstruktur ist sinnvoll?",
    ],
    quellen: [
      { dokumentId: "fbm-nvf1-l-to" },
      { dokumentId: "fbm-nvf2-l-to" },
      { dokumentId: "leitfaden-nvf1-l" },
      { dokumentId: "leitfaden-nvf2-l-s" },
    ],
    status: "in_review",
  },
  {
    slug: "rollen-im-konsortium",
    topicId: "antragsrollen",
    frage: "Welche Rollen im Konsortium sollten frueh geklaert werden?",
    antwort_kurz:
      "Fruehzeitig sollten Antragstellerrolle, Umsetzungsverantwortung, Daten-/Evaluationseinbindung und Finanzverantwortung je Partner geklaert sein.",
    antwort_lang:
      "Der Prototyp fuehrt Konsortialfragen in vier Bloecken: Antragstellende, fachliche Umsetzung, Evaluation/Daten und kaufmaennische Steuerung. Diese Struktur hilft, Luecken vor Einreichung zu erkennen und Unterlagen konsistent vorzubereiten.",
    verwandte_fragen: ["Wer ist antragsberechtigt im Innovationsfonds?"],
    quellen: [
      { dokumentId: "leitfaden-nvf1-l" },
      { dokumentId: "leitfaden-nvf2-l-s" },
    ],
    status: "roh",
  },
  {
    slug: "wann-ist-ein-vorhaben-foerderfaehig",
    topicId: "foerderfaehigkeit",
    frage: "Wann ist ein Vorhaben foerderfaehig?",
    antwort_kurz:
      "Foerderfaehigkeit ergibt sich aus Passung zu den Zielen der Ausschreibung, formaler Zulassigkeit und vollstaendiger Antragslogik.",
    antwort_lang:
      "Die Frage nach Foerderfaehigkeit wird im Prototyp als mehrstufiges Matching abgebildet: inhaltliche Passung zur Bekanntmachung, formale Eignung laut Leitfaden und Nachweisfaehigkeit ueber die geforderten Unterlagen. Eine positive Vorpruefung ersetzt keine juristische Pruefung, reduziert aber Fehlstarts.",
    verwandte_fragen: [
      "Welche formalen Voraussetzungen gelten?",
      "Welche Unterlagen sind Pflicht?",
    ],
    quellen: [
      { dokumentId: "fbm-nvf1-l-to" },
      { dokumentId: "fbm-nvf2-l-ts" },
      { dokumentId: "fbm-nvf2-l-to" },
    ],
    status: "in_review",
  },
  {
    slug: "welche-fristen-gelten-fuer-die-einreichung",
    topicId: "fristen",
    frage: "Welche Fristen gelten fuer die Einreichung?",
    antwort_kurz:
      "Relevante Stichtage werden je Runde aus Foerderbekanntmachung und FAQ uebernommen und in der Antwort mit Quelle und Seite ausgewiesen.",
    antwort_lang:
      "Fristen werden im Wissensindex nicht frei formuliert, sondern aus den verbindlichen Dokumenten extrahiert und als Quellhinweis belegt. Bei Widerspruch zwischen Dokumentstaenden gilt immer die aktuellere Bekanntmachung. Der Prototyp kennzeichnet solche Antworten bis zur finalen redaktionellen Freigabe als Entwurf oder in_review.",
    verwandte_fragen: [
      "Welche Unterlagen muessen bis zur Frist vorliegen?",
      "Wo finde ich verbindliche Quellen?",
    ],
    quellen: [{ dokumentId: "fbm-nvf1-k-to" }, { dokumentId: "faq-antragstellende" }],
    status: "freigegeben",
  },
  {
    slug: "welche-unterlagen-sind-pflicht",
    topicId: "unterlagen",
    frage: "Welche Unterlagen sind fuer die Antragseinreichung Pflicht?",
    antwort_kurz:
      "Pflichtunterlagen ergeben sich aus den Leitfaeden und Bekanntmachungen und sollten als Checkliste je Antrag zusammengestellt werden.",
    antwort_lang:
      "Der Prototyp bildet Unterlagen als strukturierte Liste je Themencluster ab. Dazu gehoeren Kernformulare, Anlagen und ggf. ergaenzende Nachweise. Jeder Punkt wird mit Quellreferenz (Dokument + Seite) versehen, damit die Liste nachvollziehbar und auditierbar bleibt.",
    verwandte_fragen: [
      "Welche Formvorgaben gelten fuer Anlagen?",
      "Welche Fristen gelten fuer die Einreichung?",
    ],
    quellen: [
      { dokumentId: "leitfaden-nvf1-l" },
      { dokumentId: "leitfaden-nvf2-l-s" },
      { dokumentId: "faq-antragstellende" },
    ],
    status: "freigegeben",
  },
  {
    slug: "welche-formalen-voraussetzungen-gelten",
    topicId: "formale_voraussetzungen",
    frage: "Welche formalen Voraussetzungen gelten vor Antragstellung?",
    antwort_kurz:
      "Formale Voraussetzungen betreffen Antragsformat, Nachweisstruktur, Fristenkonformitaet und die Einhaltung der Nebenbestimmungen.",
    antwort_lang:
      "Formale Voraussetzungen werden im Prototyp als separater Pruefpfad modelliert. Ziel ist, inhaltliche Eignung und formale Zulassigkeit getrennt zu bewerten, damit kein formal unvollstaendiger Antrag in die finale Einreichung geht.",
    verwandte_fragen: [
      "Welche Nebenbestimmungen gelten?",
      "Wie werden Personalmittel angesetzt?",
    ],
    quellen: [{ dokumentId: "anbest-if-stand-juni-2025" }, { dokumentId: "leitfaden-nvf1-l" }],
    status: "in_review",
  },
  {
    slug: "welche-nebenbestimmungen-gelten",
    topicId: "formale_voraussetzungen",
    frage: "Welche Nebenbestimmungen gelten fuer bewilligte Projekte?",
    antwort_kurz:
      "Die Nebenbestimmungen richten sich nach den ANBest-IF und den foerderrechtlichen Vorgaben der jeweiligen Runde.",
    antwort_lang:
      "Fuer die operative Planung sollten Nebenbestimmungen nicht erst nach Bewilligung betrachtet werden. Der Prototyp mappt typische Pflichten (Dokumentation, Mittelverwendung, Nachweise) fruehzeitig auf Arbeitspakete, damit die Projektsteuerung von Beginn an foerderkonform aufgesetzt wird.",
    verwandte_fragen: [
      "Welche formalen Voraussetzungen gelten vor Antragstellung?",
      "Wie werden Personalmittel angesetzt?",
    ],
    quellen: [{ dokumentId: "anbest-if-stand-juni-2025" }],
    status: "freigegeben",
  },
  {
    slug: "wie-werden-personalmittel-angesetzt",
    topicId: "formale_voraussetzungen",
    frage: "Wie werden Personalmittel und Personalsaetze angesetzt?",
    antwort_kurz:
      "Die Ansatzlogik fuer Personalmittel orientiert sich an den veroeffentlichten Personalmittelsaetzen und den Vorgaben im Leitfaden.",
    antwort_lang:
      "Im Prototyp wird fuer Kostenfragen ein eigener Bereich mit Quellverweisen auf Personalmittelsaetze aufgebaut. So lassen sich frueh Annahmen dokumentieren und im Review als Entwurf kennzeichnen, bevor Zahlen in den finalen Antrag uebernommen werden.",
    verwandte_fragen: ["Welche formalen Voraussetzungen gelten?", "Welche Nebenbestimmungen gelten?"],
    quellen: [{ dokumentId: "personalmittelsaetze-if-2026" }, { dokumentId: "leitfaden-nvf1-l" }],
    status: "roh",
  },
  {
    slug: "wo-finde-ich-verbindliche-quellen",
    topicId: "unterlagen",
    frage: "Wo finde ich die verbindlichen Quellen fuer Antworten?",
    antwort_kurz:
      "Jede Antwort im Prototyp verweist auf Dokumente und Seitenstellen, damit Aussagen nachvollziehbar und reviewfaehig bleiben.",
    antwort_lang:
      "Der Wissensindex fuehrt keine Chat-Antworten ohne Quelle aus. Jede inhaltliche Aussage sollte auf mindestens eine Primarquelle verlinken. Bei Unklarheiten wird der Status auf in_review oder roh gesetzt, bis eine Redaktion die Formulierung freigibt.",
    verwandte_fragen: [
      "Welche Unterlagen sind fuer die Antragseinreichung Pflicht?",
      "Welche Fristen gelten fuer die Einreichung?",
    ],
    quellen: [{ dokumentId: "faq-antragstellende" }, { dokumentId: "leitfaden-nvf2-l-s" }],
    status: "freigegeben",
  },
  {
    slug: "wie-gehe-ich-bei-unklarer-frage-vor",
    topicId: "foerderfaehigkeit",
    frage: "Wie gehe ich bei unklaren Fragestellungen vor?",
    antwort_kurz:
      "Bei unklarer Frage zuerst Themencluster setzen, dann Quellenstellen sichten und den Entwurf mit Status in_review kennzeichnen.",
    antwort_lang:
      "Wenn kein klares Regelmatch vorliegt, liefert der Prototyp relevante Volltextstellen aus mehreren Dokumenten. Daraus wird ein kuratierter Entwurf erstellt, der erst nach fachlichem Review freigegeben wird. So bleibt die Antwort nutzbar, ohne ungesicherte Aussagen als final zu behandeln.",
    verwandte_fragen: [
      "Wo finde ich die verbindlichen Quellen fuer Antworten?",
      "Wann ist ein Vorhaben foerderfaehig?",
    ],
    quellen: [{ dokumentId: "faq-antragstellende" }, { dokumentId: "fbm-nvf2-l-to" }],
    status: "roh",
  },
];
