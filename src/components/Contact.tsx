import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => (
  <section id="kontakt" className="section-padding bg-muted/50">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Kontakt</p>
        <h2 className="mb-6 text-3xl font-extrabold text-foreground md:text-4xl">Kontakt aufnehmen</h2>
        <p className="mb-10 leading-relaxed text-muted-foreground">
          Wir klären in einem unverbindlichen Erstgespräch, ob Ihr Vorhaben besser zu Offering A
          (Förderprojekte) oder Offering B (MDR/DiGA und digitale Therapiebegleitung) passt.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" className="px-8 py-6 text-base" asChild>
            <a href="mailto:info@innovaid.health?subject=Anfrage%20Offering%20A%20F%C3%B6rderprojekte">
              <Mail className="mr-2" size={18} /> Offering A anfragen
            </a>
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-6 text-base" asChild>
            <a href="mailto:info@innovaid.health?subject=Anfrage%20Offering%20B%20MDR%20DiGA">
              Offering B anfragen <ArrowRight className="ml-2" size={18} />
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Contact;
