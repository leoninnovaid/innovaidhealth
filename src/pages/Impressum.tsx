import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Impressum = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 md:pt-32 pb-16 section-padding">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8">Impressum</h1>

        <div className="space-y-6 text-sm md:text-base text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-lg font-bold text-foreground mb-2">Angaben gemäß § 5 TMG</h2>
            <p>
              INNOVAID:health<br />
              Albert-Fischer-Straße 9<br />
              53113 Bonn
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground mb-2">Vertreten durch</h2>
            <p>Geschäftsführer: Christoph Meyer-Delpho</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground mb-2">Kontakt</h2>
            <p>
              E-Mail: info@innovaid.health
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground mb-2">Haftungsausschluss</h2>
            <p>
              Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.
            </p>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Impressum;
