import { motion } from "framer-motion";
import { ShieldCheck, Network, TrendingUp, Lightbulb } from "lucide-react";

const items = [
{
  icon: Lightbulb,
  title: "Innovation Screening",
  text: "Identifikation und Validierung von Gesundheitsinnovationen mit echtem Versorgungspotenzial – systematisch und evidenzbasiert."
},
{
  icon: Network,
  title: "Stakeholder-Vernetzung",
  text: "Die richtigen Akteure zusammenbringen: Startups, Leistungserbringer, Kostenträger und Investoren."
},
{
  icon: ShieldCheck,
  title: "Marktzugang & Erstattung",
  text: "Begleitung auf dem Weg in Reimbursement-Strukturen und Schaffung tragfähiger Geschäftsmodelle im regulierten Markt."
},
{
  icon: TrendingUp,
  title: "Skalierbare Wirkung",
  text: "Ziel: aus einzelnen Projekten skalierbare Versorgungslösungen machen, die Patienten und System nachhaltig entlasten."
}];


const WhyUs = () =>
<section id="warum" className="section-padding bg-background">
    <div className="container mx-auto">
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-2xl mx-auto mb-16">
      
        <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-3">Unsere Stärke</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground text-center">Wir bringen Innovation sicher in den Markt

      </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, i) =>
      <motion.div
        key={item.title}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        className="bg-card rounded-xl p-8 card-elevated border border-border/50">
        
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-5">
              <item.icon className="text-accent" size={24} />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
          </motion.div>
      )}
      </div>
    </div>
  </section>;


export default WhyUs;