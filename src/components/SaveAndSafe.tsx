import { motion } from "framer-motion";
import { ExternalLink, HeartPulse, Shield, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import sasaLogo from "@/assets/saveandsafe-logo.png";
import { useI18n } from "@/i18n/LocaleContext";

const icons = [HeartPulse, Shield, Users] as const;

const SaveAndSafe = () => {
  const { copy } = useI18n();

  return (
    <section id="saveandsafe" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">{copy.saveAndSafe.label}</p>
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">{copy.saveAndSafe.title}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-elevated overflow-hidden rounded-2xl border border-border/50 bg-card"
        >
          <div className="hero-gradient px-5 py-6 md:px-12 md:py-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/70 md:text-sm">
              {copy.saveAndSafe.showcaseLabel}
            </p>
            <h3 className="text-xl font-extrabold text-primary-foreground md:text-3xl">{copy.saveAndSafe.showcaseTitle}</h3>
          </div>

          <div className="p-5 md:p-12">
            <div className="mb-8 grid grid-cols-1 gap-5 md:mb-10 md:grid-cols-3 md:gap-8">
              {copy.saveAndSafe.blocks.map((item, index) => {
                const Icon = icons[index];

                return (
                  <div key={item.title} className="flex gap-3 md:gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary md:h-10 md:w-10">
                      <Icon className="text-accent" size={18} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="mb-1 text-sm font-bold text-foreground md:text-base">{item.title}</h4>
                      <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mb-6 flex flex-col items-center gap-4 rounded-xl border border-border/50 bg-muted/50 p-4 md:mb-8 md:flex-row md:gap-6 md:p-6">
              <img
                src={sasaLogo}
                alt="SAVE&SAFE Logo"
                width="160"
                height="160"
                className="h-16 w-16 shrink-0 object-contain md:h-20 md:w-20"
              />
              <div className="text-center sm:text-left">
                <h4 className="text-base font-semibold text-foreground md:text-lg">{copy.saveAndSafe.sloganTitle}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{copy.saveAndSafe.sloganText}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:gap-4">
              <Button asChild className="w-full text-sm md:w-auto">
                <a href="https://www.saveandsafe.de/" target="_blank" rel="noopener noreferrer">
                  {copy.saveAndSafe.websiteCta} <ExternalLink className="ml-2" size={16} />
                </a>
              </Button>
              <Button variant="outline" asChild className="w-full text-sm md:w-auto">
                <a href="mailto:info@innovaid.health?subject=SAFE%20%26%20SAVE%20Projektdetails">{copy.saveAndSafe.detailsCta}</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SaveAndSafe;
