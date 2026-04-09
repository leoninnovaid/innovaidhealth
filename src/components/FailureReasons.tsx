import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const reasons = [
  "Unzureichendes Projektmanagement, das den komplexen Anforderungen der Projekte nicht gerecht wird.",
  "Fehlende Fokussierung auf die Fortführung des Projekts nach der Förderphase.",
  "Wissenschaftlich-theoretische Ansätze zur Translation und Geschäftsmodellentwicklung, die wenig praxisnah und nicht an die Gegebenheiten des Gesundheitsmarkts anschlussfähig sind.",
];

const FailureReasons = () => (
  <section className="section-padding bg-muted/50">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl rounded-2xl border border-border/60 bg-card p-6 md:p-8"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
            <AlertTriangle className="text-accent" size={20} />
          </div>
          <h2 className="text-2xl font-extrabold text-foreground md:text-3xl">Häufige Gründe für das Scheitern von Projekten</h2>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          Viele aussichtsreiche Projekte scheitern nicht an der Idee, sondern an der Umsetzung. Ursachen sind oft:
        </p>

        <ul className="space-y-3 text-sm leading-relaxed text-foreground md:text-base">
          {reasons.map((reason) => (
            <li key={reason} className="flex gap-3">
              <span aria-hidden="true" className="text-accent">
                -
              </span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </section>
);

export default FailureReasons;
