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
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-3">Methodik</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Unser Vorgehen</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative"
          >
            <span className="text-6xl font-extrabold text-accent/10 absolute -top-4 -left-2 select-none">{step.step}</span>
            <div className="relative bg-transparent rounded-xl p-8 h-full">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-5">
                <step.icon className="text-accent" size={24} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
