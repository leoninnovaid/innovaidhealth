import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";

const Contact = () => (
  <section id="kontakt" className="section-padding bg-muted/50">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-3">Kontakt</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">Kontakt aufnehmen</h2>
        <p className="text-muted-foreground leading-relaxed mb-10">
          Ob Startup, Krankenkasse oder Investor – gemeinsame Gespräche ermöglichen den Austausch. Ein
          unverbindliches Erstgespräch zeigt, wie Innovationen vorangebracht werden können.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-base px-8 py-6" asChild>
            <a href="mailto:info@innovaid.health">
              <Mail className="mr-2" size={18} /> Projekt besprechen
            </a>
          </Button>
          <Button size="lg" variant="outline" className="text-base px-8 py-6" asChild>
            <a href="mailto:info@innovaid.health">
              Investorengespräch anfragen <ArrowRight className="ml-2" size={18} />
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Contact;
