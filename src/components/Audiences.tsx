import { motion } from "framer-motion";
import { Rocket, Building2, BarChart3 } from "lucide-react";

const audiences = [
{
  icon: Rocket,
  title: "Startups",
  pain: "Der deutsche Gesundheitsmarkt ist hochreguliert und schwer zugänglich. Ohne Marktzugang und Erstattungspfade bleibt eine Innovation wirkungslos.",
  solution: "Wir unterstützen bei Markteintritt, Einbindung relevanter Akteure und einer tragfähigen Umsetzungsstrategie – vom Prototypen bis zum Reimbursement.",
  cta: "Marktzugang besprechen"
},
{
  icon: Building2,
  title: "Krankenkassen",
  pain: "Steigende Kosten und Versorgungslücken erfordern innovative Ansätze. Doch die Integration neuer Lösungen in bestehende Strukturen ist komplex.",
  solution: "Wir schaffen konkrete Partizipationsmöglichkeiten an wirksamen Innovationen und helfen, Projekte mit messbarem Versorgungsnutzen in die Regelversorgung zu bringen.",
  cta: "Partner werden"
},
{
  icon: BarChart3,
  title: "Investoren",
  pain: "Health-Startups sind schwer zu bewerten: regulatorische Hürden, lange Zyklen und unklare Marktperspektiven erschweren fundierte Investitionsentscheidungen.",
  solution: "Wir bieten frühzeitigen Zugang zu geprüften Projekten und Expertise zur Einschätzung der Umsetzbarkeit im deutschen Gesundheitsmarkt.",
  cta: "Investorengespräch anfragen"
}];


const Audiences = () =>
<section id="zielgruppen" className="section-padding bg-muted/50">
    <div className="container mx-auto">
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-2xl mx-auto mb-16">
      
        <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-3">Zielgruppen</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Wir verbinden Stakeholder

      </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {audiences.map((a, i) =>
      <motion.div
        key={a.title}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: i * 0.12 }}
        className="bg-card rounded-xl overflow-hidden card-elevated border border-border/50 flex flex-col">
        
            <div className="p-8 flex-1">
              <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center mb-6">
                <a.icon className="text-primary-foreground" size={28} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">{a.title}</h3>
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Herausforderung</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.pain}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">Unser Ansatz</p>
                <p className="text-sm text-foreground leading-relaxed">{a.solution}</p>
              </div>
            </div>
            <div className="px-8 pb-8">
              <a
            href="#kontakt"
            className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent/80 transition-colors">
            
                {a.cta} →
              </a>
            </div>
          </motion.div>
      )}
      </div>
    </div>
  </section>;


export default Audiences;