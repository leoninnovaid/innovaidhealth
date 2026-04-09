import { motion } from "framer-motion";
import { BriefcaseBusiness, LightbulbOff, Workflow } from "lucide-react";

const reasons = [
  {
    icon: BriefcaseBusiness,
    step: "01",
    title: "Unzureichendes Projektmanagement",
    text: "Komplexe Projekte mit vielen Partnern scheitern häufig an fehlender Steuerung, unklaren Verantwortlichkeiten und zu wenig operativer Verbindlichkeit im Tagesgeschäft.",
  },
  {
    icon: Workflow,
    step: "02",
    title: "Zu wenig Fokus auf die Zeit nach der Förderung",
    text: "Ohne frühzeitige Verstetigungsstrategie fehlen nach Förderende die Strukturen für Betrieb, Finanzierung und Skalierung. Dadurch bricht die Umsetzung trotz guter Ergebnisse ab.",
  },
  {
    icon: LightbulbOff,
    step: "03",
    title: "Zu theoretische Geschäftsmodellentwicklung",
    text: "Wenn vor allem abstrakte gesundheitsökonomische Analysen dominieren, entstehen kaum praxisnahe Konzepte für Marktzugang, Umsetzung und Anschlussfähigkeit im Versorgungsalltag.",
  },
];

const FailureReasons = () => (
  <section className="section-padding bg-muted/50">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Projektrealität</p>
        <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">Häufige Gründe für das Scheitern von Projekten</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          Viele aussichtsreiche Projekte scheitern nicht an der Idee, sondern an der Umsetzung.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
        {reasons.map((reason, i) => (
          <motion.div
            key={reason.step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative"
          >
            <span className="pointer-events-none absolute -left-2 -top-4 select-none text-5xl font-extrabold text-accent/10 md:text-6xl">
              {reason.step}
            </span>
            <div className="relative h-full rounded-xl border border-border/50 bg-card p-6 card-elevated md:p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                <reason.icon className="text-accent" size={24} />
              </div>
              <h3 className="mb-3 text-lg font-bold text-foreground">{reason.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{reason.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FailureReasons;
