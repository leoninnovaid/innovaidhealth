## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Wissensindex Prototyp (intern)

Der interne Wissensindex fuer Innovationsfonds-Inhalte ist unter folgender Route verfuegbar:

- `/#/wissensindex-prototyp`

### PDF-Ingest ausfuehren

Der Ingest liest die fest definierten Innovationsfonds-PDFs ein und erzeugt eine lokale Wissensbasis in `public/knowledge`.

```sh
npm run knowledge:ingest -- --source-dir "C:\Users\Leon\Downloads"
```

Erzeugte Dateien:

- `public/knowledge/innovation-fund-index.json`
- `public/knowledge/innovation-fund-index.md`
