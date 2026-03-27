import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Leistungen", href: "/#warum" },
  { label: "Zielgruppen", href: "/#zielgruppen" },
  { label: "SAVE&SAFE", href: "/#saveandsafe" },
  { label: "Methodik", href: "/#methodik" },
  { label: "Kontakt", href: "/#kontakt" },
];


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isSubpage = location.pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solidHeader = scrolled || isSubpage;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      solidHeader ? "bg-card/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`
      }>
      
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20">
        <a href="/" className={`text-xl font-extrabold tracking-tight ${solidHeader ? "text-primary" : "text-primary-foreground"}`}>
          INNOVAID<span className="text-accent text-left">:health</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
          <a
            key={item.href}
            href={item.href}
            className={`text-sm font-medium transition-colors hover:text-accent ${
            solidHeader ? "text-foreground" : "text-primary-foreground/80"}`
            }>
            
              {item.label}
            </a>
          )}
          <a
            href="/#kontakt"
            className="text-sm font-semibold px-5 py-2.5 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
            
            Gespräch vereinbaren
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden ${solidHeader ? "text-foreground" : "text-primary-foreground"}`}>
          
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open &&
      <div className="md:hidden bg-card border-t border-border px-6 pb-6 pt-2 space-y-3">
          {navItems.map((item) =>
        <a
          key={item.href}
          href={item.href}
          onClick={() => setOpen(false)}
          className="block text-sm font-medium text-foreground py-2 hover:text-accent">
          
              {item.label}
            </a>
        )}
          <a
          href="/#kontakt"
          onClick={() => setOpen(false)}
          className="block text-sm font-semibold px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-center">
          
            Gespräch vereinbaren
          </a>
        </div>
      }
    </nav>);

};

export default Navbar;