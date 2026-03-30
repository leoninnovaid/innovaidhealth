import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Team from "@/components/Team";
import WhyUs from "@/components/WhyUs";
import Audiences from "@/components/Audiences";
import SaveAndSafe from "@/components/SaveAndSafe";
import Process from "@/components/Process";
import Impact from "@/components/Impact";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");

    if (!section) {
      return;
    }

    const scrollToSection = () => {
      const element = document.getElementById(section);

      if (!element) {
        return false;
      }

      element.scrollIntoView({ behavior: "smooth", block: "start" });
      navigate("/", { replace: true });
      return true;
    };

    if (scrollToSection()) {
      return;
    }

    const timeoutId = window.setTimeout(scrollToSection, 100);
    return () => window.clearTimeout(timeoutId);
  }, [location.search, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Team />
      <WhyUs />
      <Audiences />
      <SaveAndSafe />
      <Process />
      <Impact />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
