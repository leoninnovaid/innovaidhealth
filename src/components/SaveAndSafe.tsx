import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink, HeartPulse, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import sasaLogo from "@/assets/saveandsafe-logo.png";

const SaveAndSafe = () => (
  <section id="saveandsafe" className="section-padding bg-background">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Einblick</p>
        <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">SAVE&SAFE</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden rounded-2xl border border-border/50 bg-card card-elevated"
      >
        <div className="hero-gradient px-5 py-6 md:px-12 md:py-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/70 md:text-sm">Showcase-Projekt</p>
          <h3 className="text-xl font-extrabold text-primary-foreground md:text-3xl">SAVE&SAFE - Innovation in der Versorgung</h3>
        </div>

        <div className="p-5 md:p-12">
          <div className="mb-8 grid grid-cols-1 gap-5 md:mb-10 md:grid-cols-3 md:gap-8">
            {[
              {
                icon: HeartPulse,
                title: "Versorgungsproblem",
                text: "SAVE&SAFE adressiert ein konkretes Versorgungsproblem, bei dem bestehende Strukturen an ihre Grenzen stoßen und innovative Ansätze erforderlich sind.",
              },
              {
                icon: Shield,
                title: "Lösungsansatz",
                text: "Das Projekt kombiniert technologische Innovation mit einem Versorgungsmodell, das auf Evidenz und Erstattungsfähigkeit ausgerichtet ist.",
              },
              {
                icon: Users,
                title: "Go-To-Market",
                text: "Die Lösung adressiert einen relevanten Markt im deutschen Gesundheitswesen mit klarem Skalierungspotenzial und Nutzen für alle Beteiligten bis hin zum Markteintritt.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 md:gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary md:h-10 md:w-10">
                  <item.icon className="text-accent" size={18} />
                </div>
                <div className="min-w-0">
                  <h4 className="mb-1 text-sm font-bold text-foreground md:text-base">{item.title}</h4>
                  <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6 flex flex-col items-center gap-4 rounded-xl border border-border/50 bg-muted/50 p-4 md:mb-8 md:flex-row md:gap-6 md:p-6">
            <img
              src={sasaLogo}
              alt="SAVE&SAFE Logo"
              width="160"
              height="160"
              className="h-16 w-16 shrink-0 object-contain md:h-20 md:w-20"
            />
            <p className="text-center text-xs italic text-muted-foreground sm:text-left md:text-sm">
              KI-basierte Lösungen, um Stürze zu vermeiden und Pflegekräfte zu entlasten. Gemeinsam arbeiten wir an
              einer sicheren Zukunft in der Geriatrie.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            <Button asChild className="w-full text-sm md:w-auto">
              <a href="https://www.saveandsafe.de/" target="_blank" rel="noopener noreferrer">
                saveandsafe.de besuchen <ExternalLink className="ml-2" size={16} />
              </a>
            </Button>
            <Button variant="outline" asChild className="w-full text-sm md:w-auto">
              <Link to="/?section=kontakt">Projektdetails anfragen</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default SaveAndSafe;
