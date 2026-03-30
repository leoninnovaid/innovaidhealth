import { motion } from "framer-motion";
import { ShieldCheck, Network, TrendingUp, Lightbulb } from "lucide-react";

const items = [
  {
    icon: Lightbulb,
    title: "Innovation Screening",
    text: "Identifikation und Validierung von Gesundheitsinnovationen mit echtem Versorgungspotenzial - systematisch und evidenzbasiert.",
  },
  {
    icon: Network,
    title: "Stakeholder-Vernetzung",
    text: "Die richtigen Akteure zusammenbringen: Startups, Leistungserbringer, Kostenträger und Investoren.",
  },
  {
    icon: ShieldCheck,
    title: "Marktzugang & Erstattung",
    text: "Begleitung auf dem Weg in Reimbursement-Strukturen und Schaffung tragfähiger Geschäftsmodelle im regulierten Markt.",
  },
  {
    icon: TrendingUp,
    title: "Skalierbare Wirkung",
    text: "Ziel: aus einzelnen Projekten skalierbare Versorgungslösungen machen, die Patienten und System nachhaltig entlasten.",
  },
];

const WhyUs = () => (
  <section id="warum" className="section-padding bg-background">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Unsere Stärke</p>
        <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">Innovation sicher in den Markt bringen</h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-xl border border-border/50 bg-card p-6 card-elevated md:p-8"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
              <item.icon className="text-accent" size={24} />
            </div>
            <h3 className="mb-3 text-lg font-bold text-foreground">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs;
