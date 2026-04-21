import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

import christophMeyerDelphoPortrait from "@/assets/team-christoph-meyer-delpho.webp";
import christophRiesePortrait from "@/assets/team-christoph-riese.webp";
import leonUschwaPortrait from "@/assets/team-leon-uschwa.webp";
import { useI18n } from "@/i18n/LocaleContext";

type TeamMemberBase = {
  name: string;
  linkedin: string;
  portrait: string;
  portraitAlt: string;
  portraitWrapperClassName?: string;
  portraitClassName: string;
};

const teamMembersBase: TeamMemberBase[] = [
  {
    name: "Dr. Christoph Meyer-Delpho",
    linkedin: "https://de.linkedin.com/in/meyer-delpho",
    portrait: christophMeyerDelphoPortrait,
    portraitAlt: "Portrait of Dr. Christoph Meyer-Delpho",
    portraitWrapperClassName: "bg-[linear-gradient(180deg,hsl(213_26%_92%),hsl(220_18%_86%))]",
    portraitClassName: "h-[126%] w-full object-cover object-[center_22%] scale-[1.08]",
  },
  {
    name: "Christoph Riese",
    linkedin: "https://de.linkedin.com/in/christoph-riese-4842a3a9",
    portrait: christophRiesePortrait,
    portraitAlt: "Portrait of Christoph Riese",
    portraitWrapperClassName: "bg-[linear-gradient(180deg,hsl(213_20%_96%),hsl(219_16%_90%))]",
    portraitClassName: "h-[98%] w-full object-cover object-[center_12%] scale-[0.98]",
  },
  {
    name: "Leon Uschwa",
    linkedin: "https://www.linkedin.com/in/leonuschwa",
    portrait: leonUschwaPortrait,
    portraitAlt: "Portrait of Leon Uschwa",
    portraitWrapperClassName: "bg-[linear-gradient(180deg,hsl(214_23%_95%),hsl(219_17%_89%))]",
    portraitClassName: "h-[118%] w-full object-cover object-[center_top] -translate-y-[8%] scale-[1.02]",
  },
];

const Team = () => {
  const { copy } = useI18n();

  return (
    <section id="team" className="section-padding bg-muted/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">{copy.team.label}</p>
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">{copy.team.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{copy.team.subtitle}</p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {teamMembersBase.map((member, index) => {
            const localized = copy.team.members[index];

            return (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="overflow-hidden rounded-[28px] border border-border/60 bg-card shadow-[0_18px_60px_-28px_hsl(222_70%_10%_/_0.35)]"
              >
                <div className="p-5 sm:p-6">
                  <div className="mb-5 overflow-hidden rounded-[22px] border border-white/70 bg-[linear-gradient(180deg,hsl(210_30%_96%),hsl(220_20%_92%))] p-3 shadow-inner">
                    <div
                      className={`relative aspect-[5/6] overflow-hidden rounded-[18px] bg-[radial-gradient(circle_at_top,hsl(0_0%_100%/_0.55),transparent_58%),linear-gradient(180deg,hsl(214_33%_94%),hsl(220_17%_88%))] ${member.portraitWrapperClassName ?? ""}`}
                    >
                      <img
                        src={member.portrait}
                        alt={member.portraitAlt}
                        className={member.portraitClassName}
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,hsl(222_70%_10%_/_0.08)_100%)]" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-accent">{localized.role}</p>
                  </div>

                  <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                    {localized.notes.map((note) => (
                      <li key={note} className="flex gap-3">
                        <span aria-hidden="true" className="text-accent">
                          -
                        </span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
