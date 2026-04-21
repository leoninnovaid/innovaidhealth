import { motion } from "framer-motion";
import { ClipboardCheck, FileCheck, Handshake, Rocket, Search, ShieldCheck } from "lucide-react";

import { useI18n } from "@/i18n/LocaleContext";

const icons = [ClipboardCheck, ShieldCheck] as const;
const processIcons = [Search, FileCheck, Handshake, Rocket] as const;

const WhyUs = () => {
  const { copy } = useI18n();

  return (
    <section id="warum" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">{copy.whyUs.label}</p>
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">{copy.whyUs.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{copy.whyUs.description}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {copy.whyUs.offerings.map((offering, i) => {
            const Icon = icons[i];

            return (
              <motion.article
                key={offering.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="card-elevated rounded-xl border border-border/50 bg-card p-6 md:p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <Icon className="text-accent" size={24} />
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
            );
          })}
        </div>

        <div id="methodik" className="mt-14 border-t border-border/60 pt-12 md:mt-16 md:pt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-10 max-w-2xl text-center md:mb-12"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">{copy.process.label}</p>
            <h3 className="text-2xl font-extrabold text-foreground md:text-3xl">{copy.process.title}</h3>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {copy.process.steps.map((step, index) => {
              const Icon = processIcons[index];

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
                    <h4 className="mb-3 text-lg font-bold text-foreground">{step.title}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
