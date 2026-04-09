import { motion } from "framer-motion";
import { Mail } from "lucide-react";
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
          Wir klären in einem unverbindlichen Erstgespräch, wie wir Ihr Vorhaben von der Strategie bis zur Umsetzung
          begleiten können.
        </p>

        <div className="flex justify-center">
          <Button size="lg" className="px-8 py-6 text-base" asChild>
            <a href="mailto:info@innovaid.health">
              <Mail className="mr-2" size={18} /> Förderprojekt besprechen
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Contact;
