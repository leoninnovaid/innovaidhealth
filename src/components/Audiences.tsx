import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Rocket, Building2, BarChart3 } from "lucide-react";

const audiences = [
  {
    icon: Rocket,
    title: "Startups",
    pain: "Der deutsche Gesundheitsmarkt ist hochreguliert und schwer zugänglich. Ohne Marktzugang und Erstattungspfade bleibt eine Innovation wirkungslos.",
    solution: "Unterstützung bei Markteintritt, Einbindung relevanter Akteure und einer tragfähigen Umsetzungsstrategie - vom Prototypen bis zum Reimbursement.",
    cta: "Marktzugang besprechen",
  },
  {
    icon: Building2,
    title: "Krankenkassen",
    pain: "Steigende Kosten und Versorgungslücken erfordern innovative Ansätze. Doch die Integration neuer Lösungen in bestehende Strukturen ist komplex.",
    solution: "Konkrete Partizipationsmöglichkeiten an wirksamen Innovationen und Hilfe bei der Integration von Projekten mit messbarem Versorgungsnutzen in die Regelversorgung.",
    cta: "Partner werden",
  },
  {
    icon: BarChart3,
    title: "Investoren",
    pain: "Health-Startups sind schwer zu bewerten: regulatorische Hürden, lange Zyklen und unklare Marktperspektiven erschweren fundierte Investitionsentscheidungen.",
    solution: "Frühzeitiger Zugang zu geprüften Projekten und Expertise zur Einschätzung der Umsetzbarkeit im deutschen Gesundheitsmarkt.",
    cta: "Investorengespräch anfragen",
  },
];

const Audiences = () => (
  <section id="zielgruppen" className="section-padding bg-muted/50">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Zielgruppen</p>
        <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">Stakeholder verbinden</h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
        {audiences.map((audience, i) => (
          <motion.div
            key={audience.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card card-elevated"
          >
            <div className="flex-1 p-6 md:p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl hero-gradient">
                <audience.icon className="text-primary-foreground" size={28} />
              </div>
              <h3 className="mb-4 text-xl font-bold text-foreground">{audience.title}</h3>
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Herausforderung</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{audience.pain}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">Unser Ansatz</p>
                <p className="text-sm leading-relaxed text-foreground">{audience.solution}</p>
              </div>
            </div>
            <div className="px-6 pb-6 md:px-8 md:pb-8">
              <Link to="/?section=kontakt" className="inline-flex items-center text-sm font-semibold text-accent transition-colors hover:text-accent/80">
                {audience.cta} <span className="ml-1" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Audiences;
