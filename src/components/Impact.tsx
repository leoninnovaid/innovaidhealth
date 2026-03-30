import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const kpis = [
  { label: "Frühe Validierung", desc: "Innovationen werden systematisch auf Versorgungsrelevanz und Machbarkeit geprüft." },
  { label: "Marktzugang", desc: "Begleitung auf dem Weg in Erstattungsstrukturen und den regulierten deutschen Gesundheitsmarkt." },
  { label: "Relevante Partnerschaften", desc: "Vernetzung mit Krankenkassen, Leistungserbringern und strategischen Investoren." },
  { label: "Skalierbare Versorgung", desc: "Projekte werden so aufgebaut, dass sie über Pilotphasen hinaus wirken können." },
];

const Impact = () => (
  <section className="section-padding bg-background">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Wirkung</p>
        <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">Impact</h2>
      </motion.div>

      <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2 md:gap-6">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex gap-4 rounded-xl border border-border/50 bg-card p-5 card-elevated md:p-6"
          >
            <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={22} />
            <div>
              <h3 className="mb-1 font-bold text-foreground">{k.label}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{k.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Impact;
