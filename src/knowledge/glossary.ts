export type GlossaryEntry = {
  id: string;
  label: string;
  description: string;
  matcher: RegExp;
};

type GlossaryMatch = {
  start: number;
  end: number;
  text: string;
  entry: GlossaryEntry;
};

export type GlossarySegment =
  | { type: "text"; text: string }
  | { type: "term"; text: string; entry: GlossaryEntry };

export const glossaryEntries: GlossaryEntry[] = [
  {
    id: "nvf",
    label: "NVF",
    description: "Neue Versorgungsformen im Innovationsfonds.",
    matcher: /\bNVF(?:1|2)?\b/gi,
  },
  {
    id: "gkv",
    label: "GKV",
    description: "Gesetzliche Krankenversicherung in Deutschland.",
    matcher: /\bGKV\b/gi,
  },
  {
    id: "epa",
    label: "ePA",
    description: "Elektronische Patientenakte.",
    matcher: /\bePA\b/g,
  },
  {
    id: "ti",
    label: "TI",
    description: "Telematikinfrastruktur im Gesundheitswesen.",
    matcher: /\bTI\b/g,
  },
  {
    id: "dsgvo",
    label: "DSGVO",
    description: "Datenschutz-Grundverordnung der EU.",
    matcher: /\bDSGVO\b/g,
  },
  {
    id: "bdsg",
    label: "BDSG",
    description: "Bundesdatenschutzgesetz.",
    matcher: /\bBDSG\b/g,
  },
  {
    id: "sgb-v",
    label: "SGB V",
    description: "Fünftes Buch Sozialgesetzbuch (Krankenversicherung).",
    matcher: /\bSGB\s*V\b/gi,
  },
  {
    id: "sgb-x",
    label: "SGB X",
    description: "Zehntes Buch Sozialgesetzbuch (Verwaltungsverfahren/Sozialdatenschutz).",
    matcher: /\bSGB\s*X\b/gi,
  },
  {
    id: "anbest-if",
    label: "ANBest-IF",
    description: "Allgemeine Nebenbestimmungen für Förderprojekte im Innovationsfonds.",
    matcher: /\bANBest-IF\b/g,
  },
  {
    id: "pt-outline",
    label: "PT-Outline",
    description: "Online-Portal für die Antragseinreichung.",
    matcher: /\bPT-Outline\b/g,
  },
  {
    id: "dlr",
    label: "DLR Projektträger",
    description: "Projektträger für die Abwicklung und Beratung im Verfahren.",
    matcher: /\bDLR\b/g,
  },
  {
    id: "diga",
    label: "DiGA",
    description: "Digitale Gesundheitsanwendung.",
    matcher: /\bDiGA(?:s)?\b/g,
  },
  {
    id: "dipa",
    label: "DiPA",
    description: "Digitale Pflegeanwendung.",
    matcher: /\bDiPA(?:s)?\b/g,
  },
  {
    id: "ideenskizze",
    label: "Ideenskizze",
    description: "Erste Kurzbeschreibung im zweistufigen Verfahren.",
    matcher: /\bIdeenskizz(?:e|en)\b/gi,
  },
  {
    id: "vollantrag",
    label: "Vollantrag",
    description: "Ausgearbeiteter Hauptantrag für die Durchführungsphase.",
    matcher: /\bVollantr(?:ag|ags|aege|äge)\b/gi,
  },
  {
    id: "formblatt",
    label: "Formblatt",
    description: "Verbindliches Standardformular für Antrag und Nachweise.",
    matcher: /\bFormbl[aä]tt(?:er|e)?\b/gi,
  },
  {
    id: "konsortium",
    label: "Konsortium",
    description: "Verbund mehrerer Partner, die gemeinsam ein Projekt umsetzen.",
    matcher: /\bKonsorti(?:um|en)\b/gi,
  },
  {
    id: "konsortialpartner",
    label: "Konsortialpartner",
    description: "Partner innerhalb eines Konsortiums mit eigener Projektverantwortung.",
    matcher: /\bKonsortialpartner(?:n|innen)?\b/gi,
  },
  {
    id: "krankenkasse",
    label: "Krankenkasse",
    description: "Träger der gesetzlichen Krankenversicherung; meist zentral im Projekt.",
    matcher: /\bKrankenkass(?:e|en)\b/gi,
  },
  {
    id: "verwendungsnachweis",
    label: "Verwendungsnachweis",
    description: "Nachweis, wie Fördermittel tatsächlich eingesetzt wurden.",
    matcher: /\bVerwendungsnachweis(?:e)?\b/gi,
  },
  {
    id: "zwischennachweis",
    label: "Zwischennachweis",
    description: "Zwischenstand zu Ausgaben und fachlichem Projektfortschritt.",
    matcher: /\bZwischennachweis(?:e)?\b/gi,
  },
  {
    id: "foerderbekanntmachung",
    label: "Förderbekanntmachung",
    description: "Offizieller Ausschreibungstext mit Regeln, Fristen und Kriterien.",
    matcher: /\bF[öo]rderbekanntmachung(?:en)?\b/gi,
  },
  {
    id: "leitfaden",
    label: "Leitfaden",
    description: "Dokument mit konkreten Vorgaben für Aufbau und Inhalt des Antrags.",
    matcher: /\bLeitf[aä]den?\b/gi,
  },
  {
    id: "selektivvertrag",
    label: "Selektivvertrag",
    description: "Vertrag nach § 140a SGB V zwischen Kasse und Leistungserbringern.",
    matcher: /\bSelektivvertrag(?:e)?\b/gi,
  },
  {
    id: "modellvorhaben",
    label: "Modellvorhaben",
    description: "Erprobung neuer Versorgungsansätze nach §§ 63 ff. SGB V.",
    matcher: /\bModellvorhaben\b/gi,
  },
];

const simpleLanguageRules: Array<{ from: RegExp; to: string }> = [
  { from: /\bnachvollziehbar\b/gi, to: "klar" },
  { from: /\bNachvollziehbarkeit\b/g, to: "Klarheit" },
  { from: /\bplausibel\b/gi, to: "gut begründet" },
  { from: /\bkonsistent\b/gi, to: "stimmig" },
  { from: /\bverfahrensrelevant\b/gi, to: "wichtig für den Ablauf" },
  { from: /\bverfahrenskritisch\b/gi, to: "kritisch für den Ablauf" },
  { from: /\bVerfahrenssicherheit\b/g, to: "Sicherheit im Ablauf" },
  { from: /\bAbgrenzung\b/g, to: "Trennung" },
  { from: /\bImplementierungsphase\b/g, to: "Einführungsphase" },
  { from: /\bmaßgeblich\b/gi, to: "entscheidend" },
  { from: /\bregelhaft\b/gi, to: "meist" },
  { from: /\bzweckgebunden\b/gi, to: "an den Zweck gebunden" },
  { from: /\bPrüfbarkeit\b/g, to: "Kontrollierbarkeit" },
  { from: /\binsbesondere\b/gi, to: "vor allem" },
  { from: /\bzudem\b/gi, to: "außerdem" },
  { from: /\bEs empfiehlt sich\b/g, to: "Es hilft" },
  { from: /\bFür die Praxis empfiehlt sich\b/g, to: "In der Praxis hilft" },
];

export const simplifyContributionText = (input: string): string =>
  simpleLanguageRules.reduce((current, rule) => current.replace(rule.from, rule.to), input);

const collectMatches = (text: string): GlossaryMatch[] => {
  const matches: GlossaryMatch[] = [];

  glossaryEntries.forEach((entry) => {
    const baseFlags = entry.matcher.flags.includes("g") ? entry.matcher.flags : `${entry.matcher.flags}g`;
    const regex = new RegExp(entry.matcher.source, baseFlags);

    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      const matchText = match[0];
      if (!matchText.trim()) {
        continue;
      }
      matches.push({
        start: match.index,
        end: match.index + matchText.length,
        text: matchText,
        entry,
      });

      if (regex.lastIndex === match.index) {
        regex.lastIndex += 1;
      }
    }
  });

  return matches;
};

export const annotateGlossaryText = (text: string): GlossarySegment[] => {
  if (!text) {
    return [{ type: "text", text: "" }];
  }

  const matches = collectMatches(text).sort((a, b) => {
    if (a.start !== b.start) {
      return a.start - b.start;
    }
    return b.end - b.start - (a.end - a.start);
  });

  const selected: GlossaryMatch[] = [];
  let cursor = 0;
  matches.forEach((match) => {
    if (match.start < cursor) {
      return;
    }
    selected.push(match);
    cursor = match.end;
  });

  if (selected.length === 0) {
    return [{ type: "text", text }];
  }

  const segments: GlossarySegment[] = [];
  let pointer = 0;
  selected.forEach((match) => {
    if (match.start > pointer) {
      segments.push({
        type: "text",
        text: text.slice(pointer, match.start),
      });
    }
    segments.push({
      type: "term",
      text: match.text,
      entry: match.entry,
    });
    pointer = match.end;
  });

  if (pointer < text.length) {
    segments.push({
      type: "text",
      text: text.slice(pointer),
    });
  }

  return segments;
};
