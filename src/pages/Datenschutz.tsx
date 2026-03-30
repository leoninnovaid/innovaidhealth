import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Datenschutz = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 md:pt-32 pb-16 section-padding">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8">Datenschutzerklärung</h1>

        <div className="space-y-8 text-sm md:text-base text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-foreground mb-2">1. Grundsatz der Datenminimierung</h2>
            <p>
              Unser Angebot richtet sich ausschließlich an Gewerbetreibende, Unternehmen sowie Institutionen des
              Gesundheitswesens (B2B). Wir erheben und verarbeiten personenbezogene Daten von Ansprechpartnern bei
              unseren Geschäftspartnern nur im Rahmen der geschäftlichen Erforderlichkeit.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-2">2. Verantwortlicher</h2>
            <p>
              Dr. Christoph Meyer-Delpho
              <br />
              Albert-Fischer-Straße 9
              <br />
              53113 Bonn
              <br />
              E-Mail:{" "}
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText("info@innovaid.health");
                }}
                className="text-accent hover:underline cursor-pointer"
                title="E-Mail in Zwischenablage kopieren"
              >
                E-Mail kopieren
              </button>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-2">3. Hosting & Infrastruktur (GitHub Pages)</h2>
            <p>
              Diese Website wird als statische Seite über GitHub Pages (GitHub Inc., 88 Colin P. Kelly Jr St, San
              Francisco, CA 94107, USA) bereitgestellt.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong className="text-foreground">Zweck:</strong> Bereitstellung der Unternehmenspräsentation.
              </li>
              <li>
                <strong className="text-foreground">Erfasste Daten:</strong> IP-Adresse, Browsertyp, Zeitstempel
                (Server-Log-Files).
              </li>
              <li>
                <strong className="text-foreground">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
                (Berechtigtes Interesse an einer stabilen technischen Infrastruktur).
              </li>
              <li>
                <strong className="text-foreground">B2B-Relevanz:</strong> Die Erfassung erfolgt unabhängig vom
                Status des Besuchers (Privat/Geschäftlich) durch den Provider GitHub.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-2">4. Datenerfassung bei Geschäftskontakten</h2>
            <p>
              Wenn Sie uns als Vertreter eines Unternehmens kontaktieren, verarbeiten wir Ihre Daten (Name, Funktion,
              geschäftliche Kontaktdaten):
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong className="text-foreground">Zweck:</strong> Durchführung vorvertraglicher Maßnahmen oder
                Erfüllung von Verträgen mit Ihrem Unternehmen.
              </li>
              <li>
                <strong className="text-foreground">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
                (Vertragserfüllung/Anbahnung) sowie Art. 6 Abs. 1 lit. f DSGVO (Kommunikation mit Ansprechpartnern
                juristischer Personen).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-2">5. Datensicherheit (SSL/TLS)</h2>
            <p>
              Zum Schutz Ihrer geschäftlichen Kommunikation nutzen wir eine SSL-Verschlüsselung (HTTPS). Wir
              empfehlen, vertrauliche Projektunterlagen oder sensible Geschäftsdaten nur über gesicherte Kanäle
              (z.&nbsp;B. verschlüsselte E-Mails) und nicht über einfache Webformulare zu senden.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-2">6. Ihre Rechte</h2>
            <p>
              Auch als Geschäftskontakt stehen Ihnen die Rechte auf Auskunft, Berichtigung, Löschung und Widerspruch
              nach der DSGVO zu.
            </p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Datenschutz;
