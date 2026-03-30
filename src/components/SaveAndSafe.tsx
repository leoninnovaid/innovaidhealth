import { motion } from "framer-motion";
import { ExternalLink, HeartPulse, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import sasaLogo from "@/assets/saveandsafe-logo.png";

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
      
        <div className="hero-gradient px-5 md:px-12 py-6 md:py-8">
          <p className="text-primary-foreground/70 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2">Showcase-Projekt</p>
          <h3 className="text-xl md:text-3xl font-extrabold text-primary-foreground">
            SAVE&SAFE – Innovation in der Versorgung
          </h3>
        </div>

        <div className="p-5 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 mb-8 md:mb-10">
            {[
              { icon: HeartPulse, title: "Versorgungsproblem", text: "SAVE&SAFE adressiert ein konkretes Versorgungsproblem, bei dem bestehende Strukturen an ihre Grenzen stoßen und innovative Ansätze erforderlich sind." },
              { icon: Shield, title: "Lösungsansatz", text: "Das Projekt kombiniert technologische Innovation mit einem Versorgungsmodell, das auf Evidenz und Erstattungsfähigkeit ausgerichtet ist." },
              { icon: Users, title: "Go-To-Market", text: "Die Lösung adressiert einen relevanten Markt im deutschen Gesundheitswesen mit klarem Skalierungspotenzial und Nutzen für alle Beteiligten bis hin zum Markteintritt." },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 md:gap-4">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <item.icon className="text-accent" size={18} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-foreground mb-1 text-sm md:text-base">{item.title}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-muted/50 rounded-xl p-4 md:p-6 mb-6 md:mb-8 border border-border/50 flex flex-col sm:flex-row items-center gap-4 md:gap-6">
            <img src={sasaLogo} alt="SAVE&SAFE Logo" className="w-16 h-16 md:w-20 md:h-20 object-contain shrink-0" />
            <p className="text-xs md:text-sm text-muted-foreground italic text-center sm:text-left">
              KI-basierte Lösungen, um Stürze zu vermeiden und Pflegekräfte zu entlasten. Gemeinsam arbeiten wir an einer sicheren Zukunft in der Geriatrie.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            <Button asChild className="w-full md:w-auto text-sm">
              <a href="https://www.saveandsafe.de/" target="_blank" rel="noopener noreferrer">
                saveandsafe.de besuchen <ExternalLink className="ml-2" size={16} />
              </a>
            </Button>
            <Button variant="outline" asChild className="w-full md:w-auto text-sm">
              <a href="#kontakt">Projektdetails anfragen</a>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  </section>;


export default SaveAndSafe;