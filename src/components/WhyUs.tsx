import { motion } from "framer-motion";
import { ClipboardCheck, ShieldCheck } from "lucide-react";

const offerings = [
  {
    icon: ClipboardCheck,
    label: "Offering A",
    title: "Förderprojekte im Digital-Health-Markt",
    text: "Wir begleiten Förderprojekte von der Konsortialentwicklung über die Antragstellung bis zur Umsetzung und Verstetigung in der Versorgung.",
    points: [
      "Konsortialaufbau und Antragsunterstützung",
      "Projektmanagement Office für komplexe Verbundprojekte",
      "Verstetigungs- und Geschäftsmodelllogik nach Förderende",
    ],
  },
  {
    icon: ShieldCheck,
    label: "Offering B",
    title: "MDR/DiGA und digitale Therapiebegleitung",
    text: "Wir unterstützen bei Produktstrategie, PMO und Implementierung digitaler Therapiebegleitung mit Fokus auf regulatorische Anschlussfähigkeit.",
    points: [
      "Produktmanagement für digitale Medizinprodukte",
      "MDR/DiGA-nahe Umsetzungsbegleitung",
      "Integration in reale Versorgungsprozesse",
    ],
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
        className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Leistungen</p>
        <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">Unsere zwei Kern-Offerings</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          Wir fokussieren uns auf zwei Leistungen: Förderprojekte mit Verstetigungslogik und MDR/DiGA-nahe
          Produktumsetzung in der digitalen Therapiebegleitung.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {offerings.map((offering, i) => (
          <motion.article
            key={offering.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="rounded-xl border border-border/50 bg-card p-6 card-elevated md:p-8"
          >
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                <offering.icon className="text-accent" size={24} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">{offering.label}</p>
            </div>
            <h3 className="mb-3 text-xl font-bold text-foreground">{offering.title}</h3>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{offering.text}</p>
            <ul className="space-y-2 text-sm text-foreground">
              {offering.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden="true" className="text-accent">
                    -
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs;
