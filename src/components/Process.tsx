import { motion } from "framer-motion";
import { FileCheck, Handshake, Rocket, Search } from "lucide-react";

import { useI18n } from "@/i18n/LocaleContext";

const icons = [Search, FileCheck, Handshake, Rocket] as const;

const Process = () => {
  const { copy } = useI18n();

  return (
    <section id="methodik" className="section-padding bg-muted/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">{copy.process.label}</p>
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">{copy.process.title}</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {copy.process.steps.map((step, index) => {
            const Icon = icons[index];

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <span className="pointer-events-none absolute -left-1 -top-5 z-20 select-none text-4xl font-extrabold text-accent md:text-5xl">
                  {step.step}
                </span>
                <div className="card-elevated relative z-10 h-full rounded-xl border border-border/50 bg-card p-6 md:p-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                    <Icon className="text-accent" size={24} />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
