import { motion } from "framer-motion";
import { ExternalLink, HeartPulse, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const SaveAndSafe = () =>
<section id="saveandsafe" className="section-padding bg-background">
    <div className="container mx-auto">
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-2xl mx-auto mb-16">
      
        <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-3">EINBLICK</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          SAVE&SAFE
        </h2>
      </motion.div>

      <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-card rounded-2xl border border-border/50 card-elevated overflow-hidden">
      
        <div className="hero-gradient px-8 md:px-12 py-8">
          <p className="text-primary-foreground/70 text-sm font-semibold uppercase tracking-wider mb-2">Showcase-Projekt</p>
          <h3 className="text-2xl md:text-3xl font-extrabold text-primary-foreground">
            SAVE&SAFE – Innovation in der Versorgung
          </h3>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <HeartPulse className="text-accent" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">Versorgungsproblem</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  SAVE&SAFE adressiert ein konkretes Versorgungsproblem, bei dem bestehende Strukturen an ihre Grenzen stoßen und innovative Ansätze erforderlich sind.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <Shield className="text-accent" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">Lösungsansatz</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Das Projekt kombiniert technologische Innovation mit einem Versorgungsmodell, das auf Evidenz und Erstattungsfähigkeit ausgerichtet ist.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <Users className="text-accent" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">Go-To-Market</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Die Lösung adressiert einen relevanten Markt im deutschen Gesundheitswesen mit klarem Skalierungspotenzial und Nutzen für alle Beteiligten bis hin zum Markteintritt.

              </p>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-xl p-6 mb-8 border border-border/50">
            <p className="text-sm text-muted-foreground italic">
              KI-basierte Lösungen, um Stürze zu vermeiden und Pflegekräfte zu entlasten. Gemeinsam arbeiten wir an einer sicheren Zukunft in der Geriatrie.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <a href="https://www.saveandsafe.de/" target="_blank" rel="noopener noreferrer">
                saveandsafe.de besuchen <ExternalLink className="ml-2" size={16} />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#kontakt">Projektdetails anfragen</a>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  </section>;


export default SaveAndSafe;