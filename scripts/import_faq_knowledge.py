from __future__ import annotations

import json
import re
import shutil
import sys
import unicodedata
import zipfile
from dataclasses import dataclass
from pathlib import Path
from xml.etree import ElementTree as ET


NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_KNOWLEDGE_DIR = ROOT / "public" / "knowledge"
UPLOADS_DIR = PUBLIC_KNOWLEDGE_DIR / "uploads"
ANSWER_ENTRIES_PATH = ROOT / "src" / "knowledge" / "answer-entries.ts"
INDEX_JSON_PATH = PUBLIC_KNOWLEDGE_DIR / "innovation-fund-index.json"
INDEX_MD_PATH = PUBLIC_KNOWLEDGE_DIR / "innovation-fund-index.md"


SOURCE_META = {
    "2026-01-23_Präsentation_Webseminar_NVF.pdf": {
        "id": "praesentation-webseminar-nvf-2026",
        "titel": "Präsentation Webseminar NVF 2026",
        "dokumenttyp": "Praesentation",
    },
    "Der Innovationsfonds_ Stand der Dinge - 2026-01-06_Der-Innovationsfonds_Stand-der-Dinge.pdf": {
        "id": "innovationsfonds-stand-der-dinge-2026",
        "titel": "Der Innovationsfonds: Stand der Dinge",
        "dokumenttyp": "Praesentation",
    },
    "Innovationen für die Versicherten der gesetzlichen _Krankenversicherung - 2025-06-23_G-BA_Innovationsausschuss_Infoflyer_bf.pdf": {
        "id": "g-ba-innovationsausschuss-infoflyer",
        "titel": "Infoflyer Innovationsausschuss",
        "dokumenttyp": "Infoflyer",
    },
    "Innovationen für die Versicherten der gesetzlichen _Krankenversicherung - 2025-06-23_G-BA_Innovationsausschuss_Infoflyer_bf.pdf / Innovationsausschuss beim Gemeinsamen Bundesausschuss_ Zusammensetzung und Stimmverteilung - Innovationsausschuss_Zusammensetzung_Mai2025-barrierefrei.pdf": {
        "id": "innovationsausschuss-infoflyer-und-stimmverteilung",
        "titel": "Infoflyer und Stimmverteilung des Innovationsausschusses",
        "dokumenttyp": "Infoflyer",
    },
    "2025-12-03_IA-Prozessgrafiken_1-Themenfindung-Foerderbekanntmachungen.png": {
        "id": "ia-prozessgrafiken-themenfindung",
        "titel": "IA-Prozessgrafik: Themenfindung",
        "dokumenttyp": "Prozessgrafik",
    },
    "2025-12-03_IA-Prozessgrafiken_2-Antragstellung-bis-Foerderbescheid.png": {
        "id": "ia-prozessgrafiken-antrag-bis-bescheid",
        "titel": "IA-Prozessgrafik: Antrag bis Förderbescheid",
        "dokumenttyp": "Prozessgrafik",
    },
    "2025-12-03_IA-Prozessgrafiken_3-Foerderbescheid-bis-Abschlussbericht.png": {
        "id": "ia-prozessgrafiken-bescheid-bis-abschlussbericht",
        "titel": "IA-Prozessgrafik: Förderbescheid bis Abschlussbericht",
        "dokumenttyp": "Prozessgrafik",
    },
    "2025-12-03_IA-Prozessgrafiken_4-Abschlussbericht-bis-Transferempfehlung.png": {
        "id": "ia-prozessgrafiken-abschlussbericht-bis-transfer",
        "titel": "IA-Prozessgrafik: Abschlussbericht bis Transferempfehlung",
        "dokumenttyp": "Prozessgrafik",
    },
}


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = (
        value.replace("ä", "ae")
        .replace("ö", "oe")
        .replace("ü", "ue")
        .replace("ß", "ss")
        .replace("§", "paragraf ")
        .replace("/", " ")
    )
    normalized = unicodedata.normalize("NFKD", value)
    ascii_value = normalized.encode("ascii", "ignore").decode("ascii")
    ascii_value = re.sub(r"[^a-z0-9]+", "-", ascii_value)
    ascii_value = re.sub(r"-{2,}", "-", ascii_value).strip("-")
    return ascii_value or "eintrag"


def cell_text(cell: ET.Element) -> str:
    texts = [text.text for text in cell.findall(".//w:t", NS) if text.text]
    return "".join(texts).strip()


def first_number(value: str) -> int:
    match = re.search(r"(\d+)", value)
    return int(match.group(1)) if match else 0


def infer_topic_id(question: str, statement: str, source: str) -> str:
    blob = f"{question} {statement} {source}".lower()

    if any(term in blob for term in ["frist", "laufzeit", "stichtag", "einreichung", "verfahren", "veroeffentlichungstermine", "veröffentlichungstermine"]):
        return "fristen"
    if any(term in blob for term in ["antragsberechtigt", "krankenkasse", "innovationsausschuss", "vertreten", "bewertet", "entscheidet", "wer ist im"]):
        return "antragsrollen"
    if any(term in blob for term in ["budget", "foerdersumme", "fördersumme", "foerdermittel", "fördermittel", "infrastrukturpauschale", "foerderfaehig", "förderfähig", "fonds"]):
        return "foerderfaehigkeit"
    if any(term in blob for term in ["unterlage", "bericht", "prozessgrafik", "abschlussbericht", "grafik", "themenfindung", "fundstelle"]):
        return "unterlagen"
    return "formale_voraussetzungen"


def infer_categories(question: str, statement: str, source: str, topic_id: str) -> list[str]:
    blob = f"{question} {statement} {source}".lower()
    categories: list[str] = []

    if topic_id == "fristen" or any(term in blob for term in ["einreichung", "verfahren", "laufzeit", "frist", "stichtag"]):
        categories.append("antragsverfahren")
    if any(term in blob for term in ["antragsberechtigt", "krankenkasse", "innovationsausschuss", "vertreten", "bewertet", "entscheidet"]):
        categories.append("konsortium_und_rollen")
    if any(term in blob for term in ["foerdersumme", "fördermittel", "budget", "infrastrukturpauschale", "förderfähig", "foerderfaehig", "fonds"]):
        categories.append("finanzierung_und_kosten")
    if any(term in blob for term in ["kriter", "voraussetzung", "evaluation", "ausschluss", "interoperabil", "rechtsgrundlage"]):
        categories.append("foerderkriterien_und_qualitaet")
    if any(term in blob for term in ["prozessgrafik", "abschlussbericht", "berichtspflichten", "transfer", "themenfindung"]):
        categories.append("nachweise_und_berichtswesen")
    if any(term in blob for term in ["digital", "interoperabil", "webseminar", "prozessgrafik"]):
        categories.append("digitalisierung_und_datenschutz")
    if any(term in blob for term in ["rechtsgrundlage", "förderzweck", "themenoffen", "themenspezifisch"]):
        categories.append("rechtsgrundlagen_und_transfer")
    if any(term in blob for term in ["unterlage", "grafik", "infoflyer", "quelle"]):
        categories.append("fristen_und_formalia")

    ordered = []
    for category in categories:
        if category not in ordered:
            ordered.append(category)
    return ordered[:2]


def build_long_answer(statement: str, quote: str, fundstelle: str, source_title: str) -> str:
    parts = [statement.strip()]
    if quote.strip():
        parts.append(f"Das Dokument formuliert dazu: „{quote.strip()}“.")
    parts.append(f"Fundstelle: {source_title}, {fundstelle.strip()}.")
    return " ".join(parts)


@dataclass
class FaqRow:
    nummer: int
    frage: str
    kernaussage: str
    zitat: str
    fundstelle: str
    source_name: str


def parse_docx_rows(docx_path: Path) -> list[FaqRow]:
    with zipfile.ZipFile(docx_path) as archive:
        document_xml = ET.fromstring(archive.read("word/document.xml"))
        tables = document_xml.findall(".//w:tbl", NS)
        if len(tables) < 2:
            raise RuntimeError("Die DOCX-Datei enthält nicht die erwartete FAQ-Tabelle.")

        faq_rows = []
        for row in tables[1].findall("w:tr", NS)[1:]:
            cells = [cell_text(cell) for cell in row.findall("w:tc", NS)]
            if len(cells) < 6:
                continue

            faq_rows.append(
                FaqRow(
                    nummer=int(cells[0]),
                    frage=cells[1].strip(),
                    kernaussage=cells[2].strip(),
                    zitat=cells[3].strip().strip("„").strip("“"),
                    fundstelle=cells[4].strip(),
                    source_name=cells[5].strip(),
                )
            )

        return faq_rows


def write_answer_entries(rows: list[FaqRow]) -> None:
    rows_by_source: dict[str, list[FaqRow]] = {}
    for row in rows:
        rows_by_source.setdefault(row.source_name, []).append(row)

    related_by_question: dict[str, list[str]] = {}
    for source_rows in rows_by_source.values():
        for index, row in enumerate(source_rows):
            related: list[str] = []
            if index > 0:
                related.append(source_rows[index - 1].frage)
            if index + 1 < len(source_rows):
                related.append(source_rows[index + 1].frage)
            related_by_question[row.frage] = related

    entries = []
    for row in rows:
        meta = SOURCE_META.get(row.source_name)
        source_title = meta["titel"] if meta else row.source_name
        source_id = meta["id"] if meta else slugify(row.source_name)
        topic_id = infer_topic_id(row.frage, row.kernaussage, row.source_name)
        categories = infer_categories(row.frage, row.kernaussage, row.source_name, topic_id)
        slug = slugify(row.frage)
        section_id = f"{source_id}-{slug}"
        page_number = first_number(row.fundstelle)

        entries.append(
            {
                "slug": slug,
                "topicId": topic_id,
                "kategorien": categories,
                "frage": row.frage,
                "antwort_kurz": row.kernaussage,
                "antwort_lang": build_long_answer(row.kernaussage, row.zitat, row.fundstelle, source_title),
                "verwandte_fragen": related_by_question.get(row.frage, []),
                "quellen": [
                    {
                        "dokumentId": source_id,
                        "abschnittId": section_id,
                        "seite": page_number,
                        "fundstelle": row.fundstelle,
                        "zitat": row.zitat,
                    }
                ],
                "status": "freigegeben",
            }
        )

    content = (
        'import type { AnswerEntry } from "@/knowledge/types";\n\n'
        f"export const answerEntries: AnswerEntry[] = {json.dumps(entries, ensure_ascii=False, indent=2)};\n"
    )
    ANSWER_ENTRIES_PATH.write_text(content, encoding="utf-8")


def write_index(rows: list[FaqRow]) -> None:
    documents: list[dict] = []
    rows_by_source: dict[str, list[FaqRow]] = {}
    for row in rows:
        rows_by_source.setdefault(row.source_name, []).append(row)

    for source_name, source_rows in rows_by_source.items():
        meta = SOURCE_META.get(source_name)
        document_id = meta["id"] if meta else slugify(source_name)
        title = meta["titel"] if meta else source_name
        document_type = meta["dokumenttyp"] if meta else "FAQ"
        sections = []

        for row in source_rows:
            slug = slugify(row.frage)
            topic_id = infer_topic_id(row.frage, row.kernaussage, row.source_name)
            sections.append(
                {
                    "id": f"{document_id}-{slug}",
                    "ueberschrift": row.frage,
                    "volltext": (
                        f"Frage: {row.frage}\n"
                        f"Kernaussage: {row.kernaussage}\n"
                        f"Konkretes Zitat: {row.zitat}\n"
                        f"Fundstelle: {row.fundstelle}\n"
                        f"Quelle: {title}"
                    ),
                    "seite": first_number(row.fundstelle),
                    "fundstelle": row.fundstelle,
                    "schlagwoerter": [topic_id, slug],
                }
            )

        documents.append(
            {
                "id": document_id,
                "titel": title,
                "quelle_datei": source_name,
                "dokumenttyp": document_type,
                "abschnitte": sections,
            }
        )

    payload = {
        "generatedAt": __import__("datetime").datetime.utcnow().isoformat() + "Z",
        "sourceDir": str(UPLOADS_DIR),
        "documents": documents,
    }

    INDEX_JSON_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    markdown_lines = [
        "# Innovationsfonds Wissensindex",
        "",
        f"- Generiert: {payload['generatedAt']}",
        f"- Quelle: {UPLOADS_DIR}",
        f"- Dokumente: {len(documents)}",
        f"- Fragen: {len(rows)}",
        "",
        "## Dokumente",
        "",
    ]

    for document in documents:
        markdown_lines.extend(
            [
                f"- {document['titel']} ({document['dokumenttyp']})",
                f"  - Datei: {document['quelle_datei']}",
                f"  - Abschnitte: {len(document['abschnitte'])}",
            ]
        )

    INDEX_MD_PATH.write_text("\n".join(markdown_lines) + "\n", encoding="utf-8")


def main() -> int:
    if len(sys.argv) != 3:
        print("Usage: python scripts/import_faq_knowledge.py <docx-path> <pdf-path>")
        return 1

    docx_path = Path(sys.argv[1]).expanduser().resolve()
    pdf_path = Path(sys.argv[2]).expanduser().resolve()

    if not docx_path.exists():
        print(f"DOCX nicht gefunden: {docx_path}")
        return 1
    if not pdf_path.exists():
        print(f"PDF nicht gefunden: {pdf_path}")
        return 1

    UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

    target_docx = UPLOADS_DIR / "faq-wissensdatenbank-innovationsfonds-60-fragen.docx"
    target_pdf = UPLOADS_DIR / "faq-wissensdatenbank-innovationsfonds-60-fragen.pdf"
    shutil.copy2(docx_path, target_docx)
    shutil.copy2(pdf_path, target_pdf)

    rows = parse_docx_rows(target_docx)
    write_answer_entries(rows)
    write_index(rows)

    print(f"Importiert: {len(rows)} Fragen")
    print(f"DOCX kopiert nach: {target_docx}")
    print(f"PDF kopiert nach: {target_pdf}")
    print(f"Antworten geschrieben: {ANSWER_ENTRIES_PATH}")
    print(f"Index geschrieben: {INDEX_JSON_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
