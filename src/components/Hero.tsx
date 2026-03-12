import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import innovaidLogo from "@/assets/innovaid-logo.png";

const Hero = () => {
  return (
    <section className="relative hero-gradient min-h-[90vh] flex items-center overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto relative z-10 py-32 md:py-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold tracking-widest uppercase text-accent-foreground/70 mb-6" style={{ color: 'hsl(170, 80%, 70%)' }}>
              Health Innovation · Market Access · Impact
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-primary-foreground mb-6">
              Gesundheits&shy;innovationen in Versorgung, Erstattung und Markt bringen.
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-10 max-w-2xl">
              Wir verbinden Startups, Krankenkassen und Investoren, damit aus innovativen Projekten tragfähige Versorgungslösungen werden.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" variant="accent" className="text-base px-8 py-6" asChild>
              <a href="#kontakt">
                Projekt besprechen <ArrowRight className="ml-2" size={18} />
              </a>
            </Button>
            <Button size="lg" variant="hero-outline" className="text-base px-8 py-6" asChild>
              <a href="#zielgruppen">
                <Users className="mr-2" size={18} /> Für wen wir arbeiten
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L1440 80L1440 30C1200 60 960 10 720 30C480 50 240 0 0 30L0 80Z" fill="hsl(210, 20%, 98%)" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
