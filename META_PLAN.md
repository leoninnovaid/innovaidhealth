# Meta Plan - INNOVAID:health Website

## Nächste Schritte (Kurzfristig)
- [x] Kontaktformular produktiv integrieren (Formspree)
- [x] Cloudflare Turnstile clientseitig integrieren
- [x] GitHub Pages Deploy auf Secrets-basierte ENV umstellen
- [x] Kontaktbereich visuell neu gestalten (2-Spalten-Layout)
- [ ] In Formspree „Restrict to Domain“ aktivieren und gegen Live-Domain prüfen
- [ ] Formspree Form Rules (Blocklist/Keyword-Regeln) aktivieren und testen
- [ ] Turnstile Secret-Key Rotation final verifizieren und alten Key deaktivieren

## Strategische Ziele (Mittelfristig)
- [ ] Konversionsfokus im Kontaktbereich messen (Absenderate, Fehlerquote, Abbrüche)
- [ ] Frontend-Bundlegröße reduzieren (aktueller Build-Warnhinweis >500 kB)
- [ ] Kleine E2E-Checks für Navigation, Kontaktformular und Legal-Seiten aufsetzen

## Leitlinie
- Alle öffentlich sichtbaren Inhalte bleiben in klarer Wir-Perspektive.
- Sensible Keys bleiben ausschließlich in sicheren Server-/Tool-Settings, niemals im Frontend-Code.