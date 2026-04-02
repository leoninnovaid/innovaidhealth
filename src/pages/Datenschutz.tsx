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
        <div className="container mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-extrabold text-foreground md:text-4xl">Datenschutzerklärung</h1>

          <div className="space-y-8 text-sm leading-relaxed text-muted-foreground md:text-base">
            <section>
              <p>
                Wir nehmen den Schutz Ihrer personenbezogenen Daten sehr ernst. Die Verarbeitung erfolgt nach den
                Vorgaben der Datenschutz-Grundverordnung (DSGVO) und den anwendbaren datenschutzrechtlichen
                Bestimmungen.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">1. Verantwortlicher</h2>
              <p>
                INNOVAID:health GmbH
                <br />
                Albert-Fischer-Straße 9
                <br />
                53113 Bonn
                <br />
                Vertreten durch: Dr. Christoph Meyer-Delpho und Christoph Riese
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
              <h2 className="mb-2 text-lg font-bold text-foreground">2. Zwecke und Rechtsgrundlagen der Verarbeitung</h2>
              <p>Wir verarbeiten personenbezogene Daten auf dieser Website insbesondere zu folgenden Zwecken:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Bereitstellung einer funktionsfähigen und sicheren Website, Art. 6 Abs. 1 lit. f DSGVO</li>
                <li>Bearbeitung von Anfragen per E-Mail oder sonstiger Kontaktaufnahme, Art. 6 Abs. 1 lit. b oder lit. f DSGVO</li>
                <li>Erfüllung gesetzlicher Aufbewahrungs- und Nachweispflichten, Art. 6 Abs. 1 lit. c DSGVO</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">3. Hosting, Protokollierung und Server-Logfiles</h2>
              <p>
                Diese Website wird über GitHub Pages bereitgestellt. Anbieter der Hosting-Infrastruktur ist GitHub,
                Inc., 88 Colin P. Kelly Jr. St., San Francisco, CA 94107, USA.
              </p>
              <p className="mt-3">
                Beim Aufruf der Website können technisch erforderliche Verbindungsdaten verarbeitet werden. Dazu
                gehören insbesondere IP-Adresse, Datum und Uhrzeit des Abrufs, aufgerufene Dateien, übertragene
                Datenmenge, Browsertyp, Betriebssystem sowie Referrer-Informationen.
              </p>
              <p className="mt-3">
                Die Verarbeitung erfolgt zur Gewährleistung eines sicheren und stabilen Betriebs der Website auf
                Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">4. Kontaktaufnahme</h2>
              <p>
                Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir die von Ihnen übermittelten Angaben zur
                Bearbeitung Ihrer Anfrage. Dazu können insbesondere Name, E-Mail-Adresse, Unternehmensbezug sowie der
                Inhalt Ihrer Nachricht gehören.
              </p>
              <p className="mt-3">
                Die Verarbeitung erfolgt zur Durchführung vorvertraglicher Maßnahmen oder zur Bearbeitung Ihres
                Anliegens auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO beziehungsweise auf Grundlage unseres
                berechtigten Interesses an einer geordneten Kommunikation gemäß Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">5. Empfänger der Daten</h2>
              <p>
                Eine Weitergabe personenbezogener Daten erfolgt nur, soweit dies zur Bereitstellung der Website, zur
                Bearbeitung Ihrer Anfrage, zur Erfüllung rechtlicher Verpflichtungen oder zur Wahrung berechtigter
                Interessen erforderlich ist.
              </p>
              <p className="mt-3">
                Empfänger können insbesondere technische Dienstleister im Rahmen des Hostings sowie sonstige
                Auftragsverarbeiter sein, die für uns auf Grundlage eines entsprechenden Vertrags tätig werden.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">6. Drittlandbezug</h2>
              <p>
                Im Zusammenhang mit dem Hosting über GitHub Pages kann eine Verarbeitung personenbezogener Daten in
                Staaten außerhalb der Europäischen Union, insbesondere in den USA, nicht ausgeschlossen werden.
              </p>
              <p className="mt-3">
                Weitere Informationen zur Datenverarbeitung durch GitHub finden Sie in den Datenschutzinformationen von
                GitHub:{" "}
                <a
                  href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  GitHub Privacy Statement
                </a>
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">7. Speicherdauer</h2>
              <p>
                Wir speichern personenbezogene Daten nur so lange, wie dies für die jeweiligen Verarbeitungszwecke
                erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Danach werden die Daten gelöscht,
                soweit keine weitere rechtliche Grundlage für die Speicherung greift.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">8. Cookies und lokale Speicherung</h2>
              <p>
                Nach aktuellem Stand verwendet diese Website keine eigenen Analyse- oder Marketing-Cookies und keine
                einwilligungspflichtigen Tracking-Technologien.
              </p>
              <p className="mt-3">
                Soweit technisch notwendige Speichermechanismen durch den Browser oder die Hosting-Infrastruktur
                eingesetzt werden, erfolgen diese ausschließlich zur Bereitstellung und sicheren Auslieferung der
                Website.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">9. Externe Links</h2>
              <p>
                Unsere Website enthält Verlinkungen auf externe Websites. Wenn Sie einen solchen Link anklicken,
                verlassen Sie unsere Website. Für die Datenverarbeitung auf den verlinkten Seiten sind ausschließlich
                deren jeweilige Betreiber verantwortlich.
              </p>
              <p className="mt-3">
                Wir verwenden auf dieser Website nach aktuellem Stand keine Social-Media-Plugins, die bereits beim
                bloßen Besuch der Website automatisch personenbezogene Daten an soziale Netzwerke übermitteln.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">10. Ihre Rechte</h2>
              <p>Sie haben im Rahmen der gesetzlichen Voraussetzungen insbesondere folgende Rechte:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Recht auf Auskunft gemäß Art. 15 DSGVO</li>
                <li>Recht auf Berichtigung gemäß Art. 16 DSGVO</li>
                <li>Recht auf Löschung gemäß Art. 17 DSGVO</li>
                <li>Recht auf Einschränkung der Verarbeitung gemäß Art. 18 DSGVO</li>
                <li>Recht auf Datenübertragbarkeit gemäß Art. 20 DSGVO</li>
                <li>Widerspruchsrecht gemäß Art. 21 DSGVO</li>
                <li>Recht auf Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft, Art. 7 Abs. 3 DSGVO</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">11. Beschwerderecht bei einer Aufsichtsbehörde</h2>
              <p>
                Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren, wenn Sie der Ansicht
                sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen datenschutzrechtliche Vorschriften
                verstößt.
              </p>
              <p className="mt-3">
                Zuständige Aufsichtsbehörde für unser Unternehmen ist insbesondere:
                <br />
                Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen
                <br />
                Kavalleriestraße 2-4
                <br />
                40213 Düsseldorf
                <br />
                E-Mail: poststelle@ldi.nrw.de
                <br />
                Website:{" "}
                <a href="https://www.ldi.nrw.de/kontakt" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  https://www.ldi.nrw.de/kontakt
                </a>
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-bold text-foreground">12. Aktualisierung dieser Datenschutzerklärung</h2>
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen
                Anforderungen und den tatsächlichen Verarbeitungen auf dieser Website entspricht.
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
