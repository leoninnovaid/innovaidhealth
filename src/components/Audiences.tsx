import { motion } from "framer-motion";
import { Building2, Hospital, Rocket } from "lucide-react";

import { useI18n } from "@/i18n/LocaleContext";

const icons = [Rocket, Building2, Hospital] as const;

const Audiences = () => {
  const { copy } = useI18n();

  const handleContactScroll = () => {
    const contactSection = document.getElementById("kontakt");
    contactSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="zielgruppen" className="section-padding bg-muted/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">{copy.audiences.label}</p>
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">{copy.audiences.title}</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {copy.audiences.cards.map((audience, i) => {
            const Icon = icons[i];

            return (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="card-elevated flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card"
              >
                <div className="flex-1 p-6 md:p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl hero-gradient">
                    <Icon className="text-primary-foreground" size={28} />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-foreground">{audience.title}</h3>
                  <div className="mb-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {copy.audiences.challenge}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{audience.pain}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">{copy.audiences.approach}</p>
                    <p className="text-sm leading-relaxed text-foreground">{audience.solution}</p>
                  </div>
                </div>
                <div className="px-6 pb-6 md:px-8 md:pb-8">
                  <button
                    type="button"
                    onClick={handleContactScroll}
                    className="inline-flex items-center text-sm font-semibold text-accent transition-colors hover:text-accent/80"
                  >
                    {audience.cta} <span className="ml-1" aria-hidden="true">&rarr;</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Audiences;
