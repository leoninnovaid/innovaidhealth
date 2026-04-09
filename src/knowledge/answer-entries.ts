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
      "Welche Unterlagen müssen in Stufe 1 des zweistufigen Verfahrens vorliegen?",
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
      "Welche formalen Ausschlussgründe gibt es bei Antrag und Ideenskizze?",
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
      "Welche formalen Ausschlussgründe gibt es bei Antrag und Ideenskizze?",
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
      "Welche formalen Ausschlussgründe gibt es bei Antrag und Ideenskizze?",
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
      "Welche Fristen gelten für Originalunterschriften und Formblätter?",
      "Welche formalen Ausschlussgründe gibt es bei Antrag und Ideenskizze?",
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
      "Wie lang dürfen Projekte in der Durchführungsphase laufen?",
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
      "Welche formalen Ausschlussgründe gibt es bei Antrag und Ideenskizze?",
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
      "Wie funktioniert der Verwendungsnachweis im Innovationsfonds?",
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
  {
    slug: "antrags-id-bedeutung",
    topicId: "unterlagen",
    kategorien: ["antragsverfahren", "fristen_und_formalia"],
    frage: "Was ist die Antrags-ID und warum ist sie wichtig?",
    antwort_kurz:
      "Die Antrags-ID wird beim Anlegen des Vorhabens in PT-Outline vergeben und muss konsistent in den Formblättern geführt werden.",
    antwort_lang:
      "Die Antrags-ID ist das zentrale Zuordnungsmerkmal zwischen elektronischem Antrag und unterschriebenen Originalunterlagen. Sie stellt sicher, dass Formblätter, Anlagen und Portalvorgang korrekt zusammengeführt werden können. In der Praxis sollte die ID unmittelbar nach Anlage des Projekts in interne Checklisten und Dokumentvorlagen übernommen werden.",
    verwandte_fragen: [
      "Wie erfolgt die Antragseinreichung für NVF1 und NVF2?",
      "Müssen Formblätter im Original eingereicht werden?",
      "Welche Unterlagen müssen in Stufe 1 des zweistufigen Verfahrens vorliegen?",
    ],
    quellen: [
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-15",
        seite: 15,
      },
      {
        dokumentId: "leitfaden-nvf1-l",
        abschnittId: "leitfaden-nvf1-l-seite-11",
        seite: 11,
      },
      {
        dokumentId: "leitfaden-nvf2-l-s",
        abschnittId: "leitfaden-nvf2-l-s-seite-12",
        seite: 12,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "einreichungsfristen-2026",
    topicId: "fristen",
    kategorien: ["fristen_und_formalia", "antragsverfahren"],
    frage: "Welche Einreichungsfristen gelten 2026 für NVF1 und NVF2?",
    antwort_kurz:
      "Für die Runde 2026 sind feste Fristen genannt, u. a. der 2. Juni 2026 (NVF1) und der 5. Mai 2026 (NVF2-Ideenskizzenformblatt).",
    antwort_lang:
      "Die Fristen sind je Förderlinie verbindlich und kombinieren elektronische Einreichung mit Originalvorlage unterschriebener Formblätter. Für NVF1 ist in den Unterlagen der 2. Juni 2026 als maßgeblicher Termin genannt. Für NVF2 wird für das Formblatt der Ideenskizze der 5. Mai 2026 als Frist ausgewiesen.",
    verwandte_fragen: [
      "Welche Fristen gelten für Originalunterschriften und Formblätter?",
      "Müssen Formblätter im Original eingereicht werden?",
      "Welche Seitenbegrenzung gilt für NVF2-Ideenskizzen?",
    ],
    quellen: [
      {
        dokumentId: "fbm-nvf1-l-to",
        abschnittId: "fbm-nvf1-l-to-seite-12",
        seite: 12,
      },
      {
        dokumentId: "fbm-nvf2-l-ts",
        abschnittId: "fbm-nvf2-l-ts-seite-16",
        seite: 16,
      },
      {
        dokumentId: "fbm-nvf2-l-to",
        abschnittId: "fbm-nvf2-l-to-seite-14",
        seite: 14,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "unterlagen-zweistufig-stufe1",
    topicId: "unterlagen",
    kategorien: ["antragsverfahren", "fristen_und_formalia"],
    frage: "Welche Unterlagen müssen in Stufe 1 des zweistufigen Verfahrens vorliegen?",
    antwort_kurz:
      "Benötigt werden eine formgerechte Ideenskizze, die geforderten Anlagen sowie das fristgerecht unterschriebene Formblatt.",
    antwort_lang:
      "Stufe 1 im zweistufigen Verfahren verlangt ein vollständig nachvollziehbares Unterlagenset. Dazu gehören Ideenskizze mit vorgegebener Gliederung, verpflichtende Anlagen und die formale Beantragung mit unterschriebenem Formblatt. Zusätzlich sind Nachweise zu Partnern und Beteiligungen früh einzuplanen.",
    verwandte_fragen: [
      "Welche Seitenbegrenzung gilt für NVF2-Ideenskizzen?",
      "Wie wird die Krankenkassenbeteiligung im zweistufigen Verfahren nachgewiesen?",
      "Welche Einreichungsfristen gelten 2026 für NVF1 und NVF2?",
    ],
    quellen: [
      {
        dokumentId: "leitfaden-nvf2-l-s",
        abschnittId: "leitfaden-nvf2-l-s-seite-8",
        seite: 8,
      },
      {
        dokumentId: "leitfaden-nvf2-l-s",
        abschnittId: "leitfaden-nvf2-l-s-seite-20",
        seite: 20,
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
    slug: "synopse-inhalte",
    topicId: "unterlagen",
    kategorien: ["antragsverfahren", "foerderkriterien_und_qualitaet"],
    frage: "Welche Inhalte gehören in die Synopse?",
    antwort_kurz:
      "Die Synopse bündelt Projektrahmen, Partnerstruktur, Kernziel, Thema und Fördermittelbedarf in kompakter Form.",
    antwort_lang:
      "Die Synopse dient als strukturierter Einstieg in Antrag und Ideenskizze. Sie verdichtet die wichtigsten Projektinformationen so, dass die Bewertung schnell orientiert erfolgen kann. Eine präzise Synopse verbessert die Verständlichkeit des gesamten Antragsdokuments und reduziert Rückfragen in der Begutachtung.",
    verwandte_fragen: [
      "Welche Seitenbegrenzung gilt für NVF1-Anträge?",
      "Welche Unterlagen müssen in Stufe 1 des zweistufigen Verfahrens vorliegen?",
      "Welche Förderkriterien sind für die Bewertung zentral?",
    ],
    quellen: [
      {
        dokumentId: "leitfaden-nvf1-l",
        abschnittId: "leitfaden-nvf1-l-seite-10",
        seite: 10,
      },
      {
        dokumentId: "leitfaden-nvf2-l-s",
        abschnittId: "leitfaden-nvf2-l-s-seite-11",
        seite: 11,
      },
      {
        dokumentId: "leitfaden-nvf2-l-s",
        abschnittId: "leitfaden-nvf2-l-s-seite-8",
        seite: 8,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "foerderkriterien-bewertung",
    topicId: "foerderfaehigkeit",
    kategorien: ["foerderkriterien_und_qualitaet", "rechtsgrundlagen_und_transfer"],
    frage: "Welche Förderkriterien sind für die Bewertung zentral?",
    antwort_kurz:
      "Kernkriterien sind Relevanz, Versorgungsverbesserung, Umsetzungspotenzial, Übertragbarkeit, Evaluierbarkeit und Machbarkeit.",
    antwort_lang:
      "Der Innovationsausschuss bewertet Projekte entlang eines klar strukturierten Kriterienrahmens. Neben dem inhaltlichen Nutzen zählt, wie belastbar die Umsetzung geplant ist und ob ein realistischer Weg in die Versorgung erkennbar wird. Förderfähig sind vor allem Vorhaben, die Versorgungseffekt, Methodik und Transfer konsistent verbinden.",
    verwandte_fragen: [
      "Welche Anforderungen gelten an das Evaluationskonzept?",
      "Was muss der Arbeits-, Zeit- und Meilensteinplan enthalten?",
      "Welche Rechtsgrundlagen sind für die Verstetigung in der Versorgung relevant?",
    ],
    quellen: [
      {
        dokumentId: "fbm-nvf1-l-to",
        abschnittId: "fbm-nvf1-l-to-seite-7",
        seite: 7,
      },
      {
        dokumentId: "fbm-nvf2-l-ts",
        abschnittId: "fbm-nvf2-l-ts-seite-10",
        seite: 10,
      },
      {
        dokumentId: "leitfaden-nvf1-l",
        abschnittId: "leitfaden-nvf1-l-seite-15",
        seite: 15,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "evaluationskonzept-anforderungen",
    topicId: "foerderfaehigkeit",
    kategorien: ["foerderkriterien_und_qualitaet", "rechtsgrundlagen_und_transfer"],
    frage: "Welche Anforderungen gelten an das Evaluationskonzept?",
    antwort_kurz:
      "Gefordert ist ein methodisch belastbares Evaluationskonzept mit Endpunkten, Studiendesign, Datengrundlage und realistischer Fallzahlplanung.",
    antwort_lang:
      "Die Unterlagen machen die Qualität der Evaluation zu einem zentralen Förderkriterium. In der Ideenskizze reicht zunächst eine grobe methodische Skizze, im Vollantrag wird eine deutlich ausdifferenzierte Planung erwartet. Entscheidend ist, dass Ergebnisse belastbar für Entscheidungen zur Weiterentwicklung der Versorgung nutzbar sind.",
    verwandte_fragen: [
      "Welche Förderkriterien sind für die Bewertung zentral?",
      "Wie hoch ist die Förderung der Konzeptentwicklungsphase?",
      "Was muss der Arbeits-, Zeit- und Meilensteinplan enthalten?",
    ],
    quellen: [
      {
        dokumentId: "fbm-nvf1-l-to",
        abschnittId: "fbm-nvf1-l-to-seite-7",
        seite: 7,
      },
      {
        dokumentId: "fbm-nvf2-l-ts",
        abschnittId: "fbm-nvf2-l-ts-seite-11",
        seite: 11,
      },
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-25",
        seite: 25,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "patientenbeteiligung-nachweis",
    topicId: "foerderfaehigkeit",
    kategorien: ["foerderkriterien_und_qualitaet", "konsortium_und_rollen"],
    frage: "Wie wird die Patientenbeteiligung im Antrag nachgewiesen?",
    antwort_kurz:
      "Die aktive Einbindung von Patientinnen und Patienten muss beschrieben oder bei Nicht-Umsetzbarkeit nachvollziehbar begründet werden.",
    antwort_lang:
      "Patientenbeteiligung ist als Qualitätsmerkmal in den Förderkriterien verankert. Anträge sollten konkret zeigen, wie Betroffene oder ihre Vertretungen in Entwicklung und Umsetzung eingebunden werden. Fehlt diese Beteiligung, muss die Begründung überzeugend und projektbezogen sein.",
    verwandte_fragen: [
      "Welche Förderkriterien sind für die Bewertung zentral?",
      "Welche Anforderungen gelten an das Evaluationskonzept?",
      "Welche Unterlagen müssen in Stufe 1 des zweistufigen Verfahrens vorliegen?",
    ],
    quellen: [
      {
        dokumentId: "fbm-nvf1-l-to",
        abschnittId: "fbm-nvf1-l-to-seite-4",
        seite: 4,
      },
      {
        dokumentId: "fbm-nvf1-l-to",
        abschnittId: "fbm-nvf1-l-to-seite-8",
        seite: 8,
      },
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-24",
        seite: 24,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "arbeitsplan-meilensteine",
    topicId: "formale_voraussetzungen",
    kategorien: ["foerderkriterien_und_qualitaet", "antragsverfahren"],
    frage: "Was muss der Arbeits-, Zeit- und Meilensteinplan enthalten?",
    antwort_kurz:
      "Gefordert sind Arbeitspakete, Meilensteine, ein visualisierter Zeitplan (z. B. Gantt) sowie eine realistische Ressourcen- und Partnerplanung.",
    antwort_lang:
      "Machbarkeit wird explizit als Förderkriterium geprüft. Deshalb müssen Arbeits- und Zeitplanung den Projektverlauf von Implementierung bis Evaluation nachvollziehbar abbilden. Gute Planungen zeigen nicht nur Termine, sondern auch Abhängigkeiten, Ressourcen und Risiken.",
    verwandte_fragen: [
      "Welche Förderkriterien sind für die Bewertung zentral?",
      "Welche Anforderungen gelten an das Evaluationskonzept?",
      "Wie lang dürfen Projekte in der Durchführungsphase laufen?",
    ],
    quellen: [
      {
        dokumentId: "leitfaden-nvf1-l",
        abschnittId: "leitfaden-nvf1-l-seite-16",
        seite: 16,
      },
      {
        dokumentId: "leitfaden-nvf2-l-s",
        abschnittId: "leitfaden-nvf2-l-s-seite-17",
        seite: 17,
      },
      {
        dokumentId: "fbm-nvf1-l-to",
        abschnittId: "fbm-nvf1-l-to-seite-8",
        seite: 8,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "ehealth-telemedizin-anforderungen",
    topicId: "formale_voraussetzungen",
    kategorien: ["digitalisierung_und_datenschutz", "rechtsgrundlagen_und_transfer"],
    frage: "Welche Anforderungen gelten für E-Health-Lösungen und Telemedizin?",
    antwort_kurz:
      "Digitale Komponenten müssen Interoperabilität, Cybersicherheit und den TI-/ePA-Kontext adressieren.",
    antwort_lang:
      "Die Förderunterlagen erwarten bei E-Health- und Telemedizinvorhaben eine belastbare Integrationslogik. Dazu gehören Interoperabilität, sichere Übermittlungsverfahren und die Einbindung bestehender Versorgungsstrukturen. Bewertet wird damit nicht nur die Funktionalität, sondern vor allem die Anschlussfähigkeit in der Regelversorgung.",
    verwandte_fragen: [
      "Welche Anforderungen gelten für TI und Interoperabilität?",
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
        dokumentId: "fbm-nvf2-l-ts",
        abschnittId: "fbm-nvf2-l-ts-seite-12",
        seite: 12,
      },
      {
        dokumentId: "leitfaden-nvf1-l",
        abschnittId: "leitfaden-nvf1-l-seite-14",
        seite: 14,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "produktinnovationen-mittel-zum-zweck",
    topicId: "foerderfaehigkeit",
    kategorien: ["digitalisierung_und_datenschutz", "foerderkriterien_und_qualitaet"],
    frage: "Was ist bei Produktinnovationen im Antrag zu beachten?",
    antwort_kurz:
      "Produktinnovationen sind nur tragfähig, wenn sie als Mittel zur Umsetzung der Versorgungsform dienen und nicht den Projektschwerpunkt bilden.",
    antwort_lang:
      "Die Förderunterlagen verlangen eine klare Abgrenzung zwischen Versorgungsinnovation und reiner Produktentwicklung. Wird ein Produkt eingesetzt, muss nachvollziehbar dargelegt werden, dass es der Versorgung dient, regulatorisch abgesichert ist und in der Projektlaufzeit einsetzbar bleibt. Je konkreter diese Einbettung ist, desto belastbarer die Förderfähigkeit.",
    verwandte_fragen: [
      "Welche Projekte sind von der Förderung ausgeschlossen?",
      "Welche Studientypen im Digitalbereich sind ausdrücklich ausgeschlossen?",
      "Welche Förderkriterien sind für die Bewertung zentral?",
    ],
    quellen: [
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-13",
        seite: 13,
      },
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-14",
        seite: 14,
      },
      {
        dokumentId: "fbm-nvf1-l-to",
        abschnittId: "fbm-nvf1-l-to-seite-6",
        seite: 6,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "ausgeschlossene-studientypen-digital",
    topicId: "foerderfaehigkeit",
    kategorien: ["digitalisierung_und_datenschutz", "foerderkriterien_und_qualitaet"],
    frage: "Welche Studientypen im Digitalbereich sind ausdrücklich ausgeschlossen?",
    antwort_kurz:
      "Ausgeschlossen sind u. a. bestimmte DiGA-/DiPA-Nachweisstudien sowie definierte produktbezogene Studienpfade.",
    antwort_lang:
      "Die Förderbekanntmachungen führen klare Ausschlüsse auf, um Doppelstrukturen zu anderen Regulierungs- und Evidenzwegen zu vermeiden. Gerade im digitalen Umfeld muss deutlich gemacht werden, dass das Vorhaben eine neue Versorgungsform adressiert und nicht primär einen Produktzulassungs- oder Nachweisweg abbildet. Diese Trennlinie sollte im Antrag explizit begründet werden.",
    verwandte_fragen: [
      "Was ist bei Produktinnovationen im Antrag zu beachten?",
      "Welche Projekte sind von der Förderung ausgeschlossen?",
      "Welche formalen Ausschlussgründe gibt es bei Antrag und Ideenskizze?",
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
    slug: "sozialleistungstraeger-finanzierungsbeteiligung",
    topicId: "foerderfaehigkeit",
    kategorien: ["rechtsgrundlagen_und_transfer", "konsortium_und_rollen"],
    frage: "Wann sind Sozialleistungsträger außerhalb der GKV finanziell zu beteiligen?",
    antwort_kurz:
      "Bei sozialleistungsträgerübergreifenden Vorhaben müssen zuständige Träger außerhalb der GKV entsprechend ihrer Zuständigkeit finanziell beitragen.",
    antwort_lang:
      "Da der Innovationsfonds aus GKV-Mitteln finanziert wird, ist bei trägerübergreifenden Leistungen eine saubere Finanzierungsabgrenzung erforderlich. Für Leistungen außerhalb der GKV-Zuständigkeit müssen die jeweils zuständigen Träger beteiligt werden. Die Beiträge und Zusagen sind im Antrag nachvollziehbar zu dokumentieren.",
    verwandte_fragen: [
      "Welche Rechtsgrundlagen sind für die Verstetigung in der Versorgung relevant?",
      "Welche Projektstrukturen sind als Einzel- oder Konsortialprojekt möglich?",
      "Welche Ausgaben sind grundsätzlich förderfähig?",
    ],
    quellen: [
      {
        dokumentId: "fbm-nvf1-l-to",
        abschnittId: "fbm-nvf1-l-to-seite-5",
        seite: 5,
      },
      {
        dokumentId: "fbm-nvf1-k-to",
        abschnittId: "fbm-nvf1-k-to-seite-5",
        seite: 5,
      },
      {
        dokumentId: "leitfaden-nvf1-l",
        abschnittId: "leitfaden-nvf1-l-seite-3",
        seite: 3,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "projektstrukturen-einzel-konsortial",
    topicId: "antragsrollen",
    kategorien: ["konsortium_und_rollen", "antragsverfahren"],
    frage: "Welche Projektstrukturen sind als Einzel- oder Konsortialprojekt möglich?",
    antwort_kurz:
      "Einreichungen sind als Einzelprojekt oder Konsortialprojekt möglich; bei Konsortien müssen Arbeitspakete und Verantwortlichkeiten sauber abgegrenzt sein.",
    antwort_lang:
      "Die FAQ beschreibt beide Strukturtypen mit klaren Verantwortungsregeln. Bei Konsortialprojekten ist jeder Partner für sein Teilprojekt verantwortlich, während die Konsortialführung die Gesamtkoordination trägt. Für die Förderfähigkeit entscheidend ist die nachvollziehbare Rollen- und Aufgabenverteilung im Antrag.",
    verwandte_fragen: [
      "Wer ist antragsberechtigt im Innovationsfonds?",
      "Wann müssen Konsortialpartner im Vollantrag verbindlich benannt sein?",
      "Wie wird die Krankenkassenbeteiligung im zweistufigen Verfahren nachgewiesen?",
    ],
    quellen: [
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-17",
        seite: 17,
      },
      {
        dokumentId: "leitfaden-nvf1-l",
        abschnittId: "leitfaden-nvf1-l-seite-12",
        seite: 12,
      },
      {
        dokumentId: "leitfaden-nvf2-l-s",
        abschnittId: "leitfaden-nvf2-l-s-seite-13",
        seite: 13,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "vollantrag-partner-verbindlich",
    topicId: "antragsrollen",
    kategorien: ["konsortium_und_rollen", "fristen_und_formalia"],
    frage: "Wann müssen Konsortialpartner im Vollantrag verbindlich benannt sein?",
    antwort_kurz:
      "Im Vollantrag müssen Konsortial- und Kooperationspartner verbindlich benannt sein; für geförderte Partner ist ein Finanzierungsplan einzureichen.",
    antwort_lang:
      "Spätestens in der Vollantragsphase verlangt das Verfahren ein verbindliches Partnerbild. Neben der Nennung der Partner sind Rollen, Zuständigkeiten und Finanzierungsbeiträge konsistent auszuweisen. Diese Verbindlichkeit ist zentral für die Bewertung der Umsetzbarkeit in der Durchführungsphase.",
    verwandte_fragen: [
      "Welche Projektstrukturen sind als Einzel- oder Konsortialprojekt möglich?",
      "Wie wird die Krankenkassenbeteiligung im zweistufigen Verfahren nachgewiesen?",
      "Welche Anforderungen gelten an das Evaluationskonzept?",
    ],
    quellen: [
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-18",
        seite: 18,
      },
      {
        dokumentId: "leitfaden-nvf1-l",
        abschnittId: "leitfaden-nvf1-l-seite-12",
        seite: 12,
      },
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-25",
        seite: 25,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "finanzierungsplan-flexibilitaet",
    topicId: "formale_voraussetzungen",
    kategorien: ["finanzierung_und_kosten", "nachweise_und_berichtswesen"],
    frage: "Wie flexibel ist der Finanzierungsplan nach Bewilligung?",
    antwort_kurz:
      "Die Gesamtfördersumme bleibt verbindlich; Umverteilungen sind nur begrenzt und teils mit vorheriger Zustimmung zulässig.",
    antwort_lang:
      "Die ANBest erlauben nur einen kontrollierten Flexibilitätsrahmen im Finanzierungsplan. Wesentliche Änderungen, insbesondere bei Personal, Aufträgen oder Weiterleitungen, sind zustimmungspflichtig. Für die Projektsteuerung ist daher ein aktives Budget- und Änderungsmonitoring erforderlich.",
    verwandte_fragen: [
      "Welche Änderungen sind zustimmungspflichtig?",
      "Welche Ausgaben sind grundsätzlich förderfähig?",
      "Wie funktioniert der Verwendungsnachweis im Innovationsfonds?",
    ],
    quellen: [
      {
        dokumentId: "anbest-if-stand-juni-2025",
        abschnittId: "anbest-if-stand-juni-2025-seite-5",
        seite: 5,
      },
      {
        dokumentId: "anbest-if-stand-juni-2025",
        abschnittId: "anbest-if-stand-juni-2025-seite-6",
        seite: 6,
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
    slug: "zustimmungspflichtige-aenderungen",
    topicId: "formale_voraussetzungen",
    kategorien: ["nachweise_und_berichtswesen", "finanzierung_und_kosten"],
    frage: "Welche Änderungen sind zustimmungspflichtig?",
    antwort_kurz:
      "Zustimmungspflichtig sind u. a. wesentliche Abweichungen in Arbeitsprogramm, Meilensteinen, Projektleitung, Partnerstruktur und Finanzierungsplan.",
    antwort_lang:
      "Die ANBest definieren klar, wann vorab die Zustimmung des Förderers einzuholen ist. Das betrifft inhaltliche, organisatorische und finanzielle Änderungen gleichermaßen. Wer Änderungen zu spät adressiert, riskiert Verzögerungen in der Mittelverwendung und Berichtslogik.",
    verwandte_fragen: [
      "Wie flexibel ist der Finanzierungsplan nach Bewilligung?",
      "Welche Nachweise und Berichte sind nach Bewilligung erforderlich?",
      "Was muss der Arbeits-, Zeit- und Meilensteinplan enthalten?",
    ],
    quellen: [
      {
        dokumentId: "anbest-if-stand-juni-2025",
        abschnittId: "anbest-if-stand-juni-2025-seite-8",
        seite: 8,
      },
      {
        dokumentId: "anbest-if-stand-juni-2025",
        abschnittId: "anbest-if-stand-juni-2025-seite-5",
        seite: 5,
      },
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-31",
        seite: 31,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "belegaufbewahrung-fristen",
    topicId: "formale_voraussetzungen",
    kategorien: ["nachweise_und_berichtswesen", "fristen_und_formalia"],
    frage: "Welche Anforderungen gelten für Belege und Aufbewahrungsfristen?",
    antwort_kurz:
      "Belege müssen prüffähig und projektzuordenbar sein; die Aufbewahrung erfolgt in der Regel fünf Jahre nach Vorlage des Verwendungsnachweises.",
    antwort_lang:
      "Für die Abrechnung reicht nicht nur eine Summenmeldung, sondern eine durchgängige Beleglogik mit klarer Projektzuordnung. Die ANBest regeln Mindestangaben, Aufbewahrungsfristen und Anforderungen an elektronische Dokumentation. Diese Anforderungen gelten auch für Vergabeunterlagen und projektbezogene Verträge.",
    verwandte_fragen: [
      "Wie funktioniert der Verwendungsnachweis im Innovationsfonds?",
      "Welche Nachweise und Berichte sind nach Bewilligung erforderlich?",
      "Welche Veröffentlichungspflichten gelten nach Projektabschluss?",
    ],
    quellen: [
      {
        dokumentId: "anbest-if-stand-juni-2025",
        abschnittId: "anbest-if-stand-juni-2025-seite-9",
        seite: 9,
      },
      {
        dokumentId: "faq-antragstellende",
        abschnittId: "faq-antragstellende-seite-32",
        seite: 32,
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
    slug: "veroeffentlichungspflichten-ergebnisse",
    topicId: "formale_voraussetzungen",
    kategorien: ["nachweise_und_berichtswesen", "rechtsgrundlagen_und_transfer"],
    frage: "Welche Veröffentlichungspflichten gelten nach Projektabschluss?",
    antwort_kurz:
      "Ergebnisse sind nach Projektabschluss in geeigneter Form der Fachöffentlichkeit zugänglich zu machen; zugleich bestehen definierte Veröffentlichungsrechte des Förderers.",
    antwort_lang:
      "Die ANBest enthalten eine explizite Regel zur Veröffentlichung des Projektergebnisses in einem zeitlichen Rahmen nach Abschluss. Zusätzlich ist festgelegt, welche Projektdaten der Förderer öffentlich machen darf. Antragstellende sollten daher früh klären, wie Ergebnisbericht, Fachkommunikation und Verwertungslogik zusammengeführt werden.",
    verwandte_fragen: [
      "Welche Nachweise und Berichte sind nach Bewilligung erforderlich?",
      "Wie funktioniert der Verwendungsnachweis im Innovationsfonds?",
      "Welche Förderkriterien sind für die Bewertung zentral?",
    ],
    quellen: [
      {
        dokumentId: "anbest-if-stand-juni-2025",
        abschnittId: "anbest-if-stand-juni-2025-seite-10",
        seite: 10,
      },
      {
        dokumentId: "anbest-if-stand-juni-2025",
        abschnittId: "anbest-if-stand-juni-2025-seite-4",
        seite: 4,
      },
      {
        dokumentId: "fbm-nvf1-l-to",
        abschnittId: "fbm-nvf1-l-to-seite-9",
        seite: 9,
      },
    ],
    status: "freigegeben",
  },
  {
    slug: "foerderfaehige-ausgaben-grundsatz",
    topicId: "foerderfaehigkeit",
    kategorien: ["finanzierung_und_kosten", "foerderkriterien_und_qualitaet"],
    frage: "Welche Ausgaben sind grundsätzlich förderfähig?",
    antwort_kurz:
      "Förderfähig sind projektbezogene Aufwendungen außerhalb der Vergütungssysteme der Regelversorgung, insbesondere für Projektmanagement, Koordination und Evaluation.",
    antwort_lang:
      "Die Förderunterlagen legen den Fokus auf Ausgaben, die unmittelbar dem Projektziel dienen und nicht bereits durch Regelvergütung abgedeckt sind. Zusätzlich gelten Anforderungen an Wirtschaftlichkeit, Nachweisbarkeit und Zweckbindung. Für die Antragstellung ist eine saubere Ausgabenlogik pro Kostenposition entscheidend.",
    verwandte_fragen: [
      "Wie wird die Infrastrukturpauschale abgerechnet?",
      "Wie flexibel ist der Finanzierungsplan nach Bewilligung?",
      "Wie werden Personalmittel in Förderprojekten kalkuliert und abgerechnet?",
    ],
    quellen: [
      {
        dokumentId: "fbm-nvf1-l-to",
        abschnittId: "fbm-nvf1-l-to-seite-10",
        seite: 10,
      },
      {
        dokumentId: "fbm-nvf2-l-ts",
        abschnittId: "fbm-nvf2-l-ts-seite-14",
        seite: 14,
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
    slug: "personalmittel-kalkulation-abrechnung",
    topicId: "formale_voraussetzungen",
    kategorien: ["finanzierung_und_kosten", "nachweise_und_berichtswesen"],
    frage: "Wie werden Personalmittel in Förderprojekten kalkuliert und abgerechnet?",
    antwort_kurz:
      "Personalmittel orientieren sich an bewilligten Ansätzen; abgerechnet wird auf Basis der tatsächlichen projektbezogenen Ausgaben mit tarif- und belegkonformer Dokumentation.",
    antwort_lang:
      "Für die Abrechnung von Personalmitteln gelten klare Regeln zu Eingruppierung, Erfahrungsstufe, Projektanteilen und Nachweisführung. Höhergruppige Abrechnungen gegenüber dem Bewilligungsstand sind grundsätzlich nicht zulässig. Eine belastbare Personal- und Zeitdokumentation ist daher zwingend für spätere Prüfbarkeit.",
    verwandte_fragen: [
      "Welche Ausgaben sind grundsätzlich förderfähig?",
      "Wie wird die Infrastrukturpauschale abgerechnet?",
      "Welche Anforderungen gelten für Belege und Aufbewahrungsfristen?",
    ],
    quellen: [
      {
        dokumentId: "anbest-if-stand-juni-2025",
        abschnittId: "anbest-if-stand-juni-2025-seite-6",
        seite: 6,
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
];

