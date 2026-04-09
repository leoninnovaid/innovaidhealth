# Wissensindex Beta – Redaktions- und Indexierungsframework

## 1) Zielbild
- Der Wissensindex ist ein kuratiertes, öffentliches Q&A-Produkt für Förderlogik im Innovationsfonds.
- Jede Frage hat eine eigene klickbare Unterseite.
- Inhalte sind in klaren Kategorien organisiert und über Filter auffindbar.
- Verbindliche Grundlage bleiben die Originaldokumente im Index (`public/knowledge/innovation-fund-index.json`).

## 2) Inhaltsframework für jede Frage
Jeder Eintrag folgt einer festen Struktur:
- `slug`: stabile URL für SEO-Unterseite.
- `frage`: präzise, suchorientierte Nutzerfrage.
- `antwort_kurz`: 1 Satz als Entscheidungs- oder Einstiegsaussage.
- `antwort_lang`: kontextreiche, handlungsorientierte Antwort (2-5 Sätze).
- `topicId`: fachliche Hauptzuordnung.
- `kategorien`: 1-2 Produktkategorien für Navigation und Filterung.
- `verwandte_fragen`: inhaltlich eng benachbarte Fragen (konkrete interne Verlinkung).
- `quellen`: mindestens 2 belastbare Fundstellen mit Dokument-ID und Seite.
- `status`: redaktioneller Stand (`roh`, `in_review`, `freigegeben`).

## 3) Kategorien (Produktnavigation)
- `antragsverfahren`
- `konsortium_und_rollen`
- `fristen_und_formalia`
- `foerderkriterien_und_qualitaet`
- `rechtsgrundlagen_und_transfer`
- `digitalisierung_und_datenschutz`
- `finanzierung_und_kosten`
- `nachweise_und_berichtswesen`

## 4) Regelwerk für Indexierung und Quellenwahl

### 4.1 Dokumentbasis
- Nur kuratierte Primärquellen im Wissensindex verwenden:
  - Förderbekanntmachungen (NVF1/NVF2)
  - Leitfäden
  - FAQ Antragstellende
  - ANBest-IF
  - Personalmittelsätze

### 4.2 Abschnittsauswahl
- Fundstellen auf konkrete Seitenabschnitte referenzieren (`dokumentId`, `abschnittId`, `seite`).
- Bevorzugt werden Abschnitte mit
  - klarer Norm-/Pflichtaussage,
  - Frist-/Formvorgaben,
  - eindeutiger Begriffsdefinition,
  - expliziter Förder- oder Ausschlusslogik.

### 4.3 Qualitätsregeln pro Antwort
- Keine Aussage ohne Quellenanker.
- Keine Überinterpretation: nur das behaupten, was aus den Quellen plausibel ableitbar ist.
- Bei Fristen und Beträgen immer konkret mit Jahres-/Datumsbezug formulieren.
- Bei prozessualen Aussagen mindestens eine Förderbekanntmachung plus Leitfaden/FAQ kombinieren.
- Bei Berichts-/Abrechnungsthemen ANBest-IF als Primärquelle priorisieren.

### 4.4 Verlinkungsregeln
- Jede Antwort verlinkt auf mindestens zwei verwandte Fragen.
- Kategorien sind klickbar und führen auf Kategorie-Unterseiten.
- Jede Frage besitzt eine stabile Detail-URL (`/wissensindex-beta/:slug`).

## 5) QA-Checkliste vor Veröffentlichung
- Sind alle URLs (Frage + Kategorie) aufrufbar?
- Sind alle `verwandte_fragen` auf existierende Fragen aufgelöst?
- Enthält jede Antwort mindestens zwei Quellen?
- Enthält jede Frage eine Kategoriezuordnung (explizit oder per Topic-Fallback)?
- Sind Umlaute und Sonderzeichen in Frage-/Antworttexten korrekt dargestellt?
- Ist der Beta-Hinweis auf Liste und Unterseiten sichtbar?

## 6) Stand dieser Iteration
- Bestehende 20 Fragen geprüft.
- 20 neue Fragen nach identischem Framework ergänzt (gesamt: 40).
- Kategorie-Unterseiten eingeführt.
- Kategorie-Filter im Wissensindex ergänzt.
