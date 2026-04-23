import { motion } from "framer-motion";
import { Handshake, Lightbulb, Target } from "lucide-react";

import { useI18n } from "@/i18n/LocaleContext";

const icons = [Target, Handshake, Lightbulb] as const;

const FailureReasons = () => {
  const { copy } = useI18n();

  return (
    <section className="section-padding bg-muted/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">{copy.failureReasons.label}</p>
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">{copy.failureReasons.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{copy.failureReasons.subtitle}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {copy.failureReasons.reasons.map((reason, index) => {
            const Icon = icons[index];

            return (
              <motion.div
                key={reason.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <span className="pointer-events-none absolute -left-1 -top-5 z-20 select-none text-4xl font-extrabold text-accent md:text-5xl">
                  {reason.step}
                </span>
                <div className="card-elevated relative z-10 h-full rounded-xl border border-border/50 bg-card p-6 md:p-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                    <Icon className="text-accent" size={24} />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-foreground">{reason.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{reason.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FailureReasons;
