import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/LocaleContext";

const Hero = () => {
  const { copy } = useI18n();

  const handleContactScroll = () => {
    const contactSection = document.getElementById("kontakt");
    contactSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="hero" className="relative flex min-h-[90vh] items-center overflow-hidden hero-gradient">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative z-10 mx-auto py-32 md:py-40">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-6 text-sm font-semibold uppercase tracking-widest" style={{ color: "hsl(207, 62%, 65%)" }}>
              {copy.hero.eyebrow}
            </p>
            <h1 className="mb-6 whitespace-pre-line text-4xl font-extrabold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              {copy.hero.title}
            </h1>
            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 md:text-xl">{copy.hero.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button size="lg" variant="accent" className="px-8 py-6 text-base" onClick={handleContactScroll}>
              {copy.hero.cta} <ArrowRight className="ml-2" size={18} />
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full translate-y-px"
          preserveAspectRatio="none"
        >
          <path d="M0 80L1440 80L1440 30C1200 60 960 10 720 30C480 50 240 0 0 30L0 80Z" fill="hsl(220, 20%, 97%)" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
