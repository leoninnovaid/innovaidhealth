import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Impressum = () => {
  useEffect(() => {
    document.title = "Impressum | INNOVAID:health";
    return () => {
      document.title = "INNOVAID:health - Gesundheitsinnovationen in Versorgung und Markt";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 section-padding md:pt-32">
        <div className="container mx-auto max-w-2xl">
          <h1 className="mb-8 text-3xl font-extrabold text-foreground md:text-4xl">Impressum</h1>

          <div className="space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">Angaben gemäß § 5 TMG</h2>
              <p>
                INNOVAID:health GmbH
                <br />
                Albert-Fischer-Straße 9
                <br />
                53113 Bonn
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">Vertreten durch</h2>
              <p>Geschäftsführer: Dr. Christoph Meyer-Delpho</p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">Kontakt</h2>
              <p>E-Mail: info@innovaid.health</p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">Registereintrag</h2>
              <p>
                Eingetragen im Handelsregister
                <br />
                Registergericht: Amtsgericht Bonn
                <br />
                Registernummer: HRB 29789
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">Umsatzsteuer-Identifikationsnummer</h2>
              <p>Gemäß § 27 a Umsatzsteuergesetz: DE457813678</p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">Links auf fremde Seiten</h2>
              <p>
                Für den redaktionellen Inhalt der vorgenannten Internet-Angebote sind ausschließlich die jeweiligen
                Auftraggeber verantwortlich.
              </p>
              <p className="mt-3">
                Mit Urteil vom 12. Mai 1998 hat das Landgericht Hamburg entschieden, dass man durch die Ausbringung
                eines Links die Inhalte der gelinkten Seite gegebenenfalls mit zu verantworten hat. Dies kann, so das
                Landgericht, nur dadurch verhindert werden, dass man sich ausdrücklich von diesen Inhalten distanziert.
                Wir haben auf unseren Seiten Links zu anderen Seiten im Internet gelegt.
              </p>
              <p className="mt-3">
                Für alle diese Links gilt: Der Webmaster dieser Website erklärt ausdrücklich, dass er keinerlei
                Einfluss auf die Inhalte der gelinkten Seiten hat. Deshalb distanziert er sich hiermit ausdrücklich von
                allen Inhalten aller gelinkten Seiten auf dieser Homepage und macht sich diese Inhalte nicht zu eigen.
                Diese Erklärung gilt für alle in dieser Domain angezeigten Links und für alle Inhalte der Seiten, zu
                denen die hier vorhandenen Banner und Links führen.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">Haftungsausschluss</h2>
              <p>
                Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;
