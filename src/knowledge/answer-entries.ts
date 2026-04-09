import type { AnswerEntry } from "@/knowledge/types";

export const answerEntries: AnswerEntry[] = [
  {
    slug: "wer-ist-antragsberechtigt",
    topicId: "antragsrollen",
    frage: "Wer ist antragsberechtigt im Innovationsfonds?",
    antwort_kurz:
      "Antragsberechtigte Institutionen sind in den Förderbekanntmachungen definiert. In der Regel muss zusätzlich eine Krankenkasse beteiligt sein.",
    antwort_lang:
      "Die Förderbekanntmachungen NVF1 und NVF2 benennen die antragsberechtigten Akteure und fordern bei neuen Versorgungsformen in der Regel die Beteiligung einer Krankenkasse. Für das Konsortium bedeutet das: Rollen und Beteiligung müssen früh verbindlich geklärt und dokumentiert werden.",
    verwandte_fragen: [
      "Wann muss eine Krankenkasse beteiligt sein?",
      "Wie wird die Krankenkassenbeteiligung im zweistufigen Verfahren nachgewiesen?",
    ],
    quellen: [
      {
        dokumentId: "fbm-nvf1-l-to",
        abschnittId: "fbm-nvf1-l-to-seite-6",
        seite: 6,
        zitat: "Bei der Antragstellung ist in der Regel eine Krankenkasse zu beteiligen.",
      },
      {
        dokumentId: "fbm-nvf2-l-ts",
        abschnittId: "fbm-nvf2-l-ts-seite-9",
        seite: 9,
        zitat: "Bei der Antragstellung ist in der Regel eine Krankenkasse zu beteiligen.",
      },
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-23",
        seite: 23,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "wie-erfolgt-die-antragseinreichung",
    topicId: "unterlagen",
    frage: "Wie erfolgt die Antragseinreichung für NVF1 und NVF2?",
    antwort_kurz:
      "Die Einreichung erfolgt elektronisch über PT-Outline. Je Förderlinie gibt es ein eigenes Portal.",
    antwort_lang:
      "Für NVF1 sowie die zweistufigen NVF2-Verfahren erfolgt die Einreichung über PT-Outline. Die Leitfäden nennen die konkreten Portal-Links und erläutern, welche Bestandteile elektronisch eingereicht werden müssen.",
    verwandte_fragen: [
      "Welche Unterlagen sind bei der Antragseinreichung Pflicht?",
      "Müssen Formblätter im Original eingereicht werden?",
    ],
    quellen: [
      {
        dokumentId: "fbm-nvf1-l-to",
        abschnittId: "fbm-nvf1-l-to-seite-11",
        seite: 11,
        zitat: "Die Einreichung erfolgt elektronisch über das Internet-Portal.",
      },
      {
        dokumentId: "fbm-nvf2-l-ts",
        abschnittId: "fbm-nvf2-l-ts-seite-15",
        seite: 15,
      },
      {
        dokumentId: "leitfaden-nvf2-l-s",
        abschnittId: "leitfaden-nvf2-l-s-seite-7",
        seite: 7,
      },
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-11",
        seite: 11,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "unterschied-einstufig-zweistufig",
    topicId: "foerderfaehigkeit",
    frage: "Was ist der Unterschied zwischen einstufigem und zweistufigem Verfahren?",
    antwort_kurz:
      "Einstufig: direkter Antrag. Zweistufig: zuerst Ideenskizze, danach Vollantrag nach Auswahl.",
    antwort_lang:
      "Im einstufigen Verfahren wird der Antrag direkt eingereicht. Im zweistufigen Verfahren startet der Prozess mit einer Ideenskizze. Nur ausgewählte Skizzen gehen in die Konzeptentwicklungsphase und werden als Vollantrag ausgearbeitet.",
    verwandte_fragen: [
      "Wie hoch ist die Förderung der Konzeptentwicklungsphase?",
      "Welche formalen Ausschlussgründe gibt es?",
    ],
    quellen: [
      {
        dokumentId: "fbm-nvf1-l-to",
        abschnittId: "fbm-nvf1-l-to-seite-1",
        seite: 1,
      },
      {
        dokumentId: "fbm-nvf2-l-ts",
        abschnittId: "fbm-nvf2-l-ts-seite-3",
        seite: 3,
        zitat: "zunächst Ideenskizzen einzureichen",
      },
      {
        dokumentId: "leitfaden-nvf2-l-s",
        abschnittId: "leitfaden-nvf2-l-s-seite-7",
        seite: 7,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "seitenumfang-nvf1-antrag",
    topicId: "unterlagen",
    frage: "Welche Seitenbegrenzung gilt für NVF1-Anträge?",
    antwort_kurz:
      "Der Antrag darf 20 DIN-A4-Seiten (Calibri 12, 1,5-zeilig) zuzüglich Anlagen nicht überschreiten.",
    antwort_lang:
      "Für NVF1 ist in Förderbekanntmachung und Leitfaden ein maximaler Umfang von 20 Seiten für den Antrag genannt; Anlagen kommen zusätzlich dazu. Diese formale Vorgabe ist eine harte Einreichungsanforderung.",
    verwandte_fragen: [
      "Welche Seitenbegrenzung gilt für NVF2-Ideenskizzen?",
      "Welche formalen Ausschlussgründe gibt es?",
    ],
    quellen: [
      {
        dokumentId: "fbm-nvf1-l-to",
        abschnittId: "fbm-nvf1-l-to-seite-12",
        seite: 12,
        zitat: "Der Umfang des Antrags darf 20 DIN-A4-Seiten ... nicht überschreiten.",
      },
      {
        dokumentId: "fbm-nvf1-k-to",
        abschnittId: "fbm-nvf1-k-to-seite-12",
        seite: 12,
      },
      {
        dokumentId: "leitfaden-nvf1-l",
        abschnittId: "leitfaden-nvf1-l-seite-10",
        seite: 10,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "seitenumfang-nvf2-ideenskizze",
    topicId: "unterlagen",
    frage: "Welche Seitenbegrenzung gilt für NVF2-Ideenskizzen?",
    antwort_kurz:
      "Die Ideenskizze ist auf maximal 12 Seiten begrenzt (zuzüglich definierter Anlagen).",
    antwort_lang:
      "Im zweistufigen Verfahren ist der Umfang der Ideenskizze klar begrenzt. Der Leitfaden benennt 12 Seiten als Obergrenze und ergänzt formale Vorgaben zu Sprache, Layout und Anlagen.",
    verwandte_fragen: [
      "Wie erfolgt die Antragseinreichung für NVF1 und NVF2?",
      "Welche formalen Ausschlussgründe gibt es?",
    ],
    quellen: [
      {
        dokumentId: "leitfaden-nvf2-l-s",
        abschnittId: "leitfaden-nvf2-l-s-seite-1",
        seite: 1,
        zitat: "Kommentiertes Gliederungsschema Ideenskizzen (max. Umfang: 12 Seiten)",
      },
      {
        dokumentId: "leitfaden-nvf2-l-s",
        abschnittId: "leitfaden-nvf2-l-s-seite-8",
        seite: 8,
      },
      {
        dokumentId: "fbm-nvf2-l-ts",
        abschnittId: "fbm-nvf2-l-ts-seite-16",
        seite: 16,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "formblaetter-original",
    topicId: "formale_voraussetzungen",
    frage: "Müssen Formblätter im Original eingereicht werden?",
    antwort_kurz:
      "Ja, die rechtsverbindlich unterschriebenen Formblätter müssen fristgerecht im Original vorliegen.",
    antwort_lang:
      "Neben der elektronischen Einreichung müssen bestimmte Formblätter rechtsverbindlich unterschrieben und fristgerecht im Original an den Projektträger geschickt werden. Wird diese Vorgabe nicht erfüllt, droht ein formaler Ausschluss.",
    verwandte_fragen: [
      "Welche Fristen gelten für Originalunterschriften?",
      "Welche formalen Ausschlussgründe gibt es?",
    ],
    quellen: [
      {
        dokumentId: "fbm-nvf1-k-to",
        abschnittId: "fbm-nvf1-k-to-seite-12",
        seite: 12,
      },
      {
        dokumentId: "leitfaden-nvf1-l",
        abschnittId: "leitfaden-nvf1-l-seite-8",
        seite: 8,
      },
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-14",
        seite: 14,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "fristen-originalunterschriften",
    topicId: "fristen",
    frage: "Welche Fristen gelten für Originalunterschriften und Formblätter?",
    antwort_kurz:
      "Die Fristen sind je Förderlinie verbindlich vorgegeben (z. B. 14 Tage Nachreichung oder feste Stichtage).",
    antwort_lang:
      "Für einzelne Linien gelten konkrete Fristregeln: etwa die Nachreichung unterschriebener Formblätter innerhalb von 14 Tagen nach elektronischer Einreichung oder feste Stichtage für Ideenskizzen. Maßgeblich sind immer Förderbekanntmachung und Leitfaden der jeweiligen Runde.",
    verwandte_fragen: [
      "Müssen Formblätter im Original eingereicht werden?",
      "Wie erfolgt die Antragseinreichung für NVF1 und NVF2?",
    ],
    quellen: [
      {
        dokumentId: "fbm-nvf1-k-to",
        abschnittId: "fbm-nvf1-k-to-seite-12",
        seite: 12,
        zitat: "innerhalb von 14 Tagen nach der elektronischen Einreichung",
      },
      {
        dokumentId: "fbm-nvf2-l-ts",
        abschnittId: "fbm-nvf2-l-ts-seite-16",
        seite: 16,
      },
      {
        dokumentId: "leitfaden-nvf2-l-s",
        abschnittId: "leitfaden-nvf2-l-s-seite-8",
        seite: 8,
      },
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-15",
        seite: 15,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "krankenkasse-beteiligung",
    topicId: "antragsrollen",
    frage: "Wann muss eine Krankenkasse beteiligt sein?",
    antwort_kurz:
      "Im Bereich neue Versorgungsformen ist in der Regel eine Krankenkasse zu beteiligen.",
    antwort_lang:
      "Die Förderbekanntmachungen sehen in der Regel eine Krankenkassenbeteiligung vor. Diese Beteiligung muss im Antrag nachweisbar beschrieben und formal dokumentiert sein.",
    verwandte_fragen: [
      "Wer ist antragsberechtigt im Innovationsfonds?",
      "Wie wird die Krankenkassenbeteiligung im zweistufigen Verfahren nachgewiesen?",
    ],
    quellen: [
      {
        dokumentId: "fbm-nvf1-l-to",
        abschnittId: "fbm-nvf1-l-to-seite-6",
        seite: 6,
      },
      {
        dokumentId: "fbm-nvf2-l-ts",
        abschnittId: "fbm-nvf2-l-ts-seite-9",
        seite: 9,
      },
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-23",
        seite: 23,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "nachweis-krankenkasse-zweistufig",
    topicId: "antragsrollen",
    frage: "Wie wird die Krankenkassenbeteiligung im zweistufigen Verfahren nachgewiesen?",
    antwort_kurz:
      "Bereits bei der Ideenskizze ist eine Absichtserklärung der Krankenkasse(n) vorgesehen.",
    antwort_lang:
      "Im zweistufigen Verfahren muss die Krankenkassenbeteiligung schon in der Ideenskizze nachvollziehbar sein. Die Förderbekanntmachungen nennen dazu eine Absichtserklärung als Nachweisinstrument.",
    verwandte_fragen: [
      "Wann muss eine Krankenkasse beteiligt sein?",
      "Was ist der Unterschied zwischen einstufigem und zweistufigem Verfahren?",
    ],
    quellen: [
      {
        dokumentId: "fbm-nvf2-l-ts",
        abschnittId: "fbm-nvf2-l-ts-seite-9",
        seite: 9,
        zitat: "bereits bei der Einreichung der Ideenskizze durch eine Absichtserklärung",
      },
      {
        dokumentId: "fbm-nvf2-l-to",
        abschnittId: "fbm-nvf2-l-to-seite-7",
        seite: 7,
      },
      {
        dokumentId: "leitfaden-nvf2-l-s",
        abschnittId: "leitfaden-nvf2-l-s-seite-14",
        seite: 14,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "foerderung-konzeptentwicklungsphase",
    topicId: "foerderfaehigkeit",
    frage: "Wie hoch ist die Förderung der Konzeptentwicklungsphase?",
    antwort_kurz:
      "Für die Konzeptentwicklungsphase können bis zu 75.000 € bei bis zu sechs Monaten Laufzeit beantragt werden.",
    antwort_lang:
      "In den zweistufigen Verfahren ist die Konzeptentwicklungsphase auf bis zu sechs Monate angelegt. Für diese Phase wird eine Förderung von bis zu 75.000 € als Obergrenze genannt, die nach Aufwand abgerechnet wird.",
    verwandte_fragen: [
      "Was ist der Unterschied zwischen einstufigem und zweistufigem Verfahren?",
      "Wie lang dürfen Projekte laufen?",
    ],
    quellen: [
      {
        dokumentId: "fbm-nvf2-l-ts",
        abschnittId: "fbm-nvf2-l-ts-seite-13",
        seite: 13,
      },
      {
        dokumentId: "leitfaden-nvf2-l-s",
        abschnittId: "leitfaden-nvf2-l-s-seite-18",
        seite: 18,
      },
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-19",
        seite: 19,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "projektlaufzeit-maximal",
    topicId: "fristen",
    frage: "Wie lang dürfen Projekte in der Durchführungsphase laufen?",
    antwort_kurz:
      "Regelhaft 36 Monate, in begründeten Fällen bis maximal 48 Monate.",
    antwort_lang:
      "Die Förderdokumente nennen in der Regel 36 Monate Laufzeit. In begründeten Ausnahmefällen sind bis zu 48 Monate möglich. Für eng getaktete Planung empfehlen die Leitfäden, den Puffer nicht vollständig zu verbrauchen.",
    verwandte_fragen: [
      "Wie hoch ist die Förderung der Konzeptentwicklungsphase?",
      "Welche Fristen gelten für Originalunterschriften und Formblätter?",
    ],
    quellen: [
      {
        dokumentId: "fbm-nvf1-l-to",
        abschnittId: "fbm-nvf1-l-to-seite-9",
        seite: 9,
      },
      {
        dokumentId: "fbm-nvf2-l-ts",
        abschnittId: "fbm-nvf2-l-ts-seite-13",
        seite: 13,
      },
      {
        dokumentId: "leitfaden-nvf1-l",
        abschnittId: "leitfaden-nvf1-l-seite-16",
        seite: 16,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "datenschutzvorgaben",
    topicId: "formale_voraussetzungen",
    frage: "Welche Datenschutzvorgaben gelten im Innovationsfonds?",
    antwort_kurz:
      "Es gelten die einschlägigen Datenschutzvorschriften (u. a. DSGVO, BDSG, SGB V/SGB X).",
    antwort_lang:
      "Die Förderbekanntmachungen verpflichten zur Einhaltung datenschutzrechtlicher Bestimmungen. Die Leitfäden konkretisieren die rechtlichen Rahmenbedingungen für personenbezogene Patientendaten und verweisen auf DSGVO, BDSG sowie sozialrechtliche Vorgaben.",
    verwandte_fragen: [
      "Was gilt für Daten außerhalb der ePA?",
      "Welche Anforderungen gelten für TI und Interoperabilität?",
    ],
    quellen: [
      {
        dokumentId: "fbm-nvf1-l-to",
        abschnittId: "fbm-nvf1-l-to-seite-9",
        seite: 9,
      },
      {
        dokumentId: "leitfaden-nvf1-l",
        abschnittId: "leitfaden-nvf1-l-seite-3",
        seite: 3,
      },
      {
        dokumentId: "anbest-if-stand-juni-2025",
        abschnittId: "anbest-if-stand-juni-2025-seite-3",
        seite: 3,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "daten-ausserhalb-epa",
    topicId: "formale_voraussetzungen",
    frage: "Was gilt für Daten außerhalb der ePA?",
    antwort_kurz:
      "Wenn Patientendaten außerhalb der ePA gespeichert werden, muss dies begründet werden.",
    antwort_lang:
      "Die Leitfäden verlangen eine nachvollziehbare Begründung, falls Daten für die Versorgungsform nicht in der ePA gehalten werden. Zusätzlich ist die Übertragbarkeit in die Regelversorgung mit ePA/TI-Bezug darzustellen.",
    verwandte_fragen: [
      "Welche Datenschutzvorgaben gelten im Innovationsfonds?",
      "Welche Anforderungen gelten für TI und Interoperabilität?",
    ],
    quellen: [
      {
        dokumentId: "leitfaden-nvf1-l",
        abschnittId: "leitfaden-nvf1-l-seite-14",
        seite: 14,
      },
      {
        dokumentId: "leitfaden-nvf2-l-s",
        abschnittId: "leitfaden-nvf2-l-s-seite-5",
        seite: 5,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "ti-und-interoperabilitaet",
    topicId: "formale_voraussetzungen",
    frage: "Welche Anforderungen gelten für TI und Interoperabilität?",
    antwort_kurz:
      "Projekte mit IT-/Telemedizinbezug müssen Anforderungen zu TI, Schnittstellen und Interoperabilität berücksichtigen.",
    antwort_lang:
      "Bei digitalen Versorgungsformen müssen die Anforderungen der Telematikinfrastruktur, der ePA-Nutzung und relevanter Schnittstellenvorgaben dargestellt werden. Die Leitfäden erwarten eine umsetzbare Integrationslogik für die Regelversorgung.",
    verwandte_fragen: [
      "Was gilt für Daten außerhalb der ePA?",
      "Welche Datenschutzvorgaben gelten im Innovationsfonds?",
    ],
    quellen: [
      {
        dokumentId: "fbm-nvf1-l-to",
        abschnittId: "fbm-nvf1-l-to-seite-9",
        seite: 9,
      },
      {
        dokumentId: "leitfaden-nvf1-l",
        abschnittId: "leitfaden-nvf1-l-seite-5",
        seite: 5,
      },
      {
        dokumentId: "leitfaden-nvf2-l-s",
        abschnittId: "leitfaden-nvf2-l-s-seite-6",
        seite: 6,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "foerderausschluesse",
    topicId: "foerderfaehigkeit",
    frage: "Welche Projekte sind von der Förderung ausgeschlossen?",
    antwort_kurz:
      "Nicht förderfähig sind u. a. bestimmte Produktentwicklungen, klinische Prüfungen nach MDR-Fokus und Doppelstrukturen zu bestehenden Förderungen.",
    antwort_lang:
      "Die Bekanntmachungen und Leitfäden nennen explizit Ausschlüsse. Dazu zählen unter anderem Vorhaben mit primärem Produktentwicklungsfokus, bestimmte klinische Prüfungslogiken sowie Projekte, die nicht zum Gegenstand der Förderung passen.",
    verwandte_fragen: [
      "Was ist der Unterschied zwischen einstufigem und zweistufigem Verfahren?",
      "Welche formalen Ausschlussgründe gibt es?",
    ],
    quellen: [
      {
        dokumentId: "fbm-nvf1-l-to",
        abschnittId: "fbm-nvf1-l-to-seite-6",
        seite: 6,
      },
      {
        dokumentId: "fbm-nvf2-l-ts",
        abschnittId: "fbm-nvf2-l-ts-seite-8",
        seite: 8,
      },
      {
        dokumentId: "leitfaden-nvf2-l-s",
        abschnittId: "leitfaden-nvf2-l-s-seite-4",
        seite: 4,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "formale-ausschlussgruende",
    topicId: "formale_voraussetzungen",
    frage: "Welche formalen Ausschlussgründe gibt es bei Antrag und Ideenskizze?",
    antwort_kurz:
      "Typische Ausschlussgründe sind falscher Einreichungsweg, Nichteinhaltung von Form/Umfang oder fehlende fristgerechte Originalunterlagen.",
    antwort_lang:
      "Leitfäden und FAQ benennen konkrete formale Ausschlussgründe. Dazu gehören insbesondere die Nichteinreichung über das vorgesehene Portal, unvollständige Unterlagen sowie fehlende Originalunterschriften innerhalb der vorgegebenen Frist.",
    verwandte_fragen: [
      "Müssen Formblätter im Original eingereicht werden?",
      "Welche Seitenbegrenzung gilt für NVF2-Ideenskizzen?",
    ],
    quellen: [
      {
        dokumentId: "leitfaden-nvf1-l",
        abschnittId: "leitfaden-nvf1-l-seite-8",
        seite: 8,
      },
      {
        dokumentId: "leitfaden-nvf2-l-s",
        abschnittId: "leitfaden-nvf2-l-s-seite-9",
        seite: 9,
      },
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-14",
        seite: 14,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "nachweise-nach-bewilligung",
    topicId: "formale_voraussetzungen",
    frage: "Welche Nachweise und Berichte sind nach Bewilligung erforderlich?",
    antwort_kurz:
      "Erforderlich sind insbesondere Zwischennachweise, Zwischenberichte und ein fristgerechter Verwendungsnachweis.",
    antwort_lang:
      "Nach Bewilligung gelten dokumentierte Nachweis- und Berichtspflichten. Dazu gehören je nach Zeitpunkt Zwischennachweise, Zwischenberichte und der abschließende Verwendungsnachweis innerhalb der festgelegten Fristen.",
    verwandte_fragen: [
      "Wie funktioniert der Verwendungsnachweis?",
      "Wie wird die Infrastrukturpauschale abgerechnet?",
    ],
    quellen: [
      {
        dokumentId: "anbest-if-stand-juni-2025",
        abschnittId: "anbest-if-stand-juni-2025-seite-4",
        seite: 4,
      },
      {
        dokumentId: "anbest-if-stand-juni-2025",
        abschnittId: "anbest-if-stand-juni-2025-seite-8",
        seite: 8,
      },
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-32",
        seite: 32,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "verwendungsnachweis-logik",
    topicId: "formale_voraussetzungen",
    frage: "Wie funktioniert der Verwendungsnachweis im Innovationsfonds?",
    antwort_kurz:
      "Der Verwendungsnachweis erfolgt auf Basis des tatsächlichen Aufwands und muss durch belegfähige Nachweise gestützt sein.",
    antwort_lang:
      "Die Abrechnung der Fördermittel erfolgt über den Verwendungsnachweis. Dabei sind die Vorgaben zu rechnerischen Nachweisen, Belegen und Aufbewahrungspflichten einzuhalten. Konsortien benötigen zusätzlich eine konsolidierte Gesamtdarstellung.",
    verwandte_fragen: [
      "Welche Nachweise und Berichte sind nach Bewilligung erforderlich?",
      "Wie wird die Infrastrukturpauschale abgerechnet?",
    ],
    quellen: [
      {
        dokumentId: "anbest-if-stand-juni-2025",
        abschnittId: "anbest-if-stand-juni-2025-seite-4",
        seite: 4,
      },
      {
        dokumentId: "anbest-if-stand-juni-2025",
        abschnittId: "anbest-if-stand-juni-2025-seite-9",
        seite: 9,
      },
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-33",
        seite: 33,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "infrastrukturpauschale-abrechnung",
    topicId: "formale_voraussetzungen",
    frage: "Wie wird die Infrastrukturpauschale abgerechnet?",
    antwort_kurz:
      "Die Infrastrukturpauschale wird prozentual auf tatsächliche Personalausgaben bezogen und ist im Nachweis zu bestätigen.",
    antwort_lang:
      "ANBest-IF und FAQ beschreiben die Abrechnung der Infrastrukturpauschale als prozentualen Anteil auf die tatsächlich entstandenen Personalausgaben. Im Verwendungsnachweis muss der projektbezogene Einsatz nachvollziehbar bestätigt werden.",
    verwandte_fragen: [
      "Wie funktioniert der Verwendungsnachweis im Innovationsfonds?",
      "Welche Nachweise und Berichte sind nach Bewilligung erforderlich?",
    ],
    quellen: [
      {
        dokumentId: "anbest-if-stand-juni-2025",
        abschnittId: "anbest-if-stand-juni-2025-seite-6",
        seite: 6,
      },
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-20",
        seite: 20,
      },
      {
        dokumentId: "leitfaden-nvf1-l",
        abschnittId: "leitfaden-nvf1-l-seite-20",
        seite: 20,
      },
      {
        dokumentId: "personalmittelsaetze-if-2026",
        abschnittId: "personalmittelsaetze-if-2026-seite-1",
        seite: 1,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "rechtsgrundlagen-verstetigung",
    topicId: "foerderfaehigkeit",
    frage: "Welche Rechtsgrundlagen sind für die Verstetigung in der Versorgung relevant?",
    antwort_kurz:
      "Als zentrale Wege werden insbesondere Selektivverträge (§ 140a SGB V) und Modellvorhaben (§§ 63 ff. SGB V) genannt.",
    antwort_lang:
      "Die Förderunterlagen verlangen eine realistische Transfer- und Verstetigungslogik. Dafür werden als typische Rechtsgrundlagen insbesondere Selektivverträge und Modellvorhaben benannt. Welche Option passt, hängt vom konkreten Versorgungskonzept ab.",
    verwandte_fragen: [
      "Wer ist antragsberechtigt im Innovationsfonds?",
      "Welche Projekte sind von der Förderung ausgeschlossen?",
    ],
    quellen: [
      {
        dokumentId: "fbm-nvf1-l-to",
        abschnittId: "fbm-nvf1-l-to-seite-8",
        seite: 8,
      },
      {
        dokumentId: "leitfaden-nvf1-l",
        abschnittId: "leitfaden-nvf1-l-seite-11",
        seite: 11,
      },
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-25",
        seite: 25,
      },
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-26",
        seite: 26,
      },
    ],
    status: "freigegeben",
  },
];
