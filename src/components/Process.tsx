import { motion } from "framer-motion";
import { Search, FileCheck, Handshake, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Innovation Screening",
    text: "Systematische Bewertung von Gesundheitsinnovationen auf Versorgungsrelevanz, regulatorische Machbarkeit und Marktpotenzial.",
  },
  {
    icon: FileCheck,
    step: "02",
    title: "Reimbursement & Marktzugang",
    text: "Entwicklung tragfähiger Erstattungsstrategien und Begleitung durch regulatorische Anforderungen des deutschen Markts.",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Stakeholder-Integration",
    text: "Strukturierte Einbindung von Krankenkassen, Leistungserbringern und weiteren relevanten Akteuren in die Umsetzung.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Investoren-Readiness",
    text: "Vorbereitung auf Investorengespräche mit fundierter Marktbewertung, klarer Value Proposition und Umsetzungsplanung.",
  },
];

const Process = () => (
  <section id="methodik" className="section-padding bg-muted/50">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Methodik</p>
        <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">Unser Vorgehen</h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative"
          >
            <span className="pointer-events-none absolute -left-2 -top-4 select-none text-5xl font-extrabold text-accent/10 md:text-6xl">
              {s.step}
            </span>
            <div className="relative h-full rounded-xl bg-transparent p-6 md:p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                <s.icon className="text-accent" size={24} />
              </div>
              <h3 className="mb-3 text-lg font-bold text-foreground">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
