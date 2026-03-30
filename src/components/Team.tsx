import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

type TeamMember = {
  name: string;
  role: string;
  linkedin?: string;
  notes: string[];
};

const teamMembers: TeamMember[] = [
  {
    name: "Dr. Christoph Meyer-Delpho",
    role: "CEO",
    linkedin: "https://de.linkedin.com/in/meyer-delpho",
    notes: [
      "Digital Health und Versorgungsinnovation",
      "Gruendung und strategische Entwicklung",
      "Projektaufbau im Gesundheitswesen",
    ],
  },
  {
    name: "Christoph Riese",
    role: "COO",
    linkedin: "https://de.linkedin.com/in/christoph-riese-4842a3a9",
    notes: [
      "14+ Jahre Erfahrung im deutschen Gesundheitswesen",
      "Digitale Therapiebegleitung und DiGA-Kontext",
      "Operative Umsetzung und Marktanbindung",
    ],
  },
  {
    name: "Leon Uschwa",
    role: "Referent der Geschaeftsfuehrung",
    notes: [
      "Unterstuetzung der Geschaeftsfuehrung im Tagesgeschaeft",
      "Projektkoordination und Strukturierung",
      "Operative Begleitung laufender Themen",
    ],
  },
];

const Team = () => (
  <section id="team" className="section-padding bg-muted/50">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Team</p>
        <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">Die Menschen hinter INNOVAID:health</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          Drei Ansprechpartner, ein gemeinsamer Fokus: tragfaehige Innovationen im Gesundheitswesen mit Tempo,
          Struktur und Umsetzungsstaerke voranbringen.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
        {teamMembers.map((member, index) => (
          <motion.article
            key={member.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="overflow-hidden rounded-2xl border border-border/50 bg-card card-elevated"
          >
            <div className="p-6 md:p-8">
              <div className="mb-6 flex aspect-[4/5] w-full items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/40">
                <div className="text-center text-muted-foreground">
                  <p className="text-sm font-semibold uppercase tracking-widest">Bildflaeche</p>
                  <p className="mt-2 text-xs">Hier kann spaeter ein Portraet eingefuegt werden.</p>
                </div>
              </div>

              <div className="mb-5">
                <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{member.role}</p>
              </div>

              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {member.notes.map((note) => (
                  <li key={note} className="flex gap-2">
                    <span aria-hidden="true" className="mt-[2px] text-accent">
                      -
                    </span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                {member.linkedin ? (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">LinkedIn-Link folgt</p>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
