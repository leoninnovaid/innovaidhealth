import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import innovaidLogo from "@/assets/innovaid-logo.png";

const Hero = () => {
  return (
    <section className="relative hero-gradient min-h-[90vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto relative z-10 py-32 md:py-40">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <img
              src={innovaidLogo}
              alt="INNOVAID:health Logo"
              width="1798"
              height="722"
              className="mb-8 h-auto w-[220px] md:w-[300px] lg:w-[340px]"
            />
            <p className="mb-6 text-sm font-semibold uppercase tracking-widest" style={{ color: "hsl(207, 62%, 65%)" }}>
              Health Innovation | Market Access | Impact
            </p>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Wir bringen Innovation in die Versorgung
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
              Wir vernetzen Startups, Krankenkassen und Leistungserbringer, damit aus innovativen Projekten tragfaehige
              Versorgungslosungen werden.
            </p>

            <div className="mb-10 grid max-w-2xl gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                  Kernleistung
                </p>
                <p className="text-sm leading-relaxed text-primary-foreground">
                  Foerderprojekte: Wir begleiten von der Konsortialentwicklung bis zur Verstetigung.
                </p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                  Kernleistung
                </p>
                <p className="text-sm leading-relaxed text-primary-foreground">
                  Digitale Versorgung: Wir steuern Strategie, Umsetzung und Integration in den Versorgungsalltag.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button size="lg" variant="accent" className="px-8 py-6 text-base" asChild>
              <Link to="/?section=kontakt">
                Foerderprojekt besprechen <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
            <Button size="lg" variant="hero-outline" className="px-8 py-6 text-base" asChild>
              <Link to="/?section=kontakt">Vorhaben besprechen</Link>
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
