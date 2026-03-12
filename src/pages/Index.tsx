import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Audiences from "@/components/Audiences";
import SaveAndSafe from "@/components/SaveAndSafe";
import Process from "@/components/Process";
import Impact from "@/components/Impact";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
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
