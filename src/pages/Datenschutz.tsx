import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Datenschutz = () => {
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    document.title = "Datenschutz | INNOVAID:health";
    return () => {
      document.title = "INNOVAID:health - Gesundheitsinnovationen in Versorgung und Markt";
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("info@innovaid.health");
      setCopyStatus("success");
    } catch {
      setCopyStatus("error");
    }

    window.setTimeout(() => setCopyStatus("idle"), 2500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 section-padding md:pt-32">
        <div className="container mx-auto max-w-2xl">
          <h1 className="mb-8 text-3xl font-extrabold text-foreground md:text-4xl">Datenschutzerklärung</h1>

          <div className="space-y-8 text-sm leading-relaxed text-muted-foreground md:text-base">
            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">1. Grundsatz der Datenminimierung</h2>
              <p>
                Unser Angebot richtet sich ausschließlich an Gewerbetreibende, Unternehmen sowie Institutionen des
                Gesundheitswesens (B2B). Wir erheben und verarbeiten personenbezogene Daten von Ansprechpartnern bei
                unseren Geschäftspartnern nur im Rahmen der geschäftlichen Erforderlichkeit.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">2. Verantwortlicher</h2>
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
                  onClick={handleCopyEmail}
                  className="cursor-pointer text-accent hover:underline"
                  title="E-Mail in Zwischenablage kopieren"
                  aria-describedby="copy-email-status"
                >
                  E-Mail kopieren
                </button>
              </p>
              <p id="copy-email-status" className="mt-2 text-sm text-foreground" aria-live="polite">
                {copyStatus === "success" && "E-Mail-Adresse in die Zwischenablage kopiert."}
                {copyStatus === "error" && "Kopieren ist fehlgeschlagen. Bitte info@innovaid.health manuell kopieren."}
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">3. Hosting & Infrastruktur (GitHub Pages)</h2>
              <p>
                Diese Website wird als statische Seite über GitHub Pages (GitHub Inc., 88 Colin P. Kelly Jr St, San
                Francisco, CA 94107, USA) bereitgestellt.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
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
              <h2 className="mb-2 text-lg font-bold text-foreground">4. Datenerfassung bei Geschäftskontakten</h2>
              <p>
                Wenn Sie uns als Vertreter eines Unternehmens kontaktieren, verarbeiten wir Ihre Daten (Name, Funktion,
                geschäftliche Kontaktdaten):
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
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
              <h2 className="mb-2 text-lg font-bold text-foreground">5. Datensicherheit (SSL/TLS)</h2>
              <p>
                Zum Schutz Ihrer geschäftlichen Kommunikation nutzen wir eine SSL-Verschlüsselung (HTTPS). Wir
                empfehlen, vertrauliche Projektunterlagen oder sensible Geschäftsdaten nur über gesicherte Kanäle
                (z.&nbsp;B. verschlüsselte E-Mails) und nicht über einfache Webformulare zu senden.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">6. Ihre Rechte</h2>
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
};

export default Datenschutz;
