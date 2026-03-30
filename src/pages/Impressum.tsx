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
