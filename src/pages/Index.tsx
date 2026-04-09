import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Audiences from "@/components/Audiences";
import SaveAndSafe from "@/components/SaveAndSafe";
import Team from "@/components/Team";
import Process from "@/components/Process";
import Impact from "@/components/Impact";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

type SectionState = {
  sectionToScroll?: string;
} | null;

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as SectionState;
    const params = new URLSearchParams(location.search);
    const section = state?.sectionToScroll ?? params.get("section");

    if (!section) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const scrollToSection = () => {
      const element = document.getElementById(section);

      if (!element) {
        return false;
      }

      element.scrollIntoView({ behavior: "smooth", block: "start" });
      navigate("/", { replace: true, state: null });
      return true;
    };

    if (scrollToSection()) {
      return;
    }

    const timeoutId = window.setTimeout(scrollToSection, 120);
    return () => window.clearTimeout(timeoutId);
  }, [location.search, location.state, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <WhyUs />
      <Audiences />
      <SaveAndSafe />
      <Team />
      <Process />
      <Impact />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
