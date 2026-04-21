import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Audiences from "@/components/Audiences";
import SaveAndSafe from "@/components/SaveAndSafe";
import Team from "@/components/Team";
import Impact from "@/components/Impact";
import FailureReasons from "@/components/FailureReasons";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useI18n } from "@/i18n/LocaleContext";

type SectionState = {
  sectionToScroll?: string;
} | null;

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { copy } = useI18n();

  useEffect(() => {
    document.title = copy.seo.homeTitle;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", copy.seo.homeDescription);
    }
  }, [copy.seo.homeDescription, copy.seo.homeTitle]);

  useEffect(() => {
    const state = location.state as SectionState;
    const params = new URLSearchParams(location.search);
    const section = state?.sectionToScroll ?? params.get("section");

    if (!section) {
      return;
    }

    const scrollToSection = () => {
      const element = document.getElementById(section);

      if (!element) {
        return false;
      }

      element.scrollIntoView({ behavior: "smooth", block: "start" });

      const nextParams = new URLSearchParams(location.search);
      nextParams.delete("section");

      navigate(
        {
          pathname: "/",
          search: nextParams.toString() ? `?${nextParams.toString()}` : "",
        },
        { replace: true, state: null },
      );

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
      <Impact />
      <FailureReasons />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
