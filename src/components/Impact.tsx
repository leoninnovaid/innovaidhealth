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
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-3">Wirkung</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          Impact
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex gap-4 p-6 bg-card rounded-xl border border-border/50 card-elevated"
          >
            <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={22} />
            <div>
              <h3 className="font-bold text-foreground mb-1">{k.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{k.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Impact;
