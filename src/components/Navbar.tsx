import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Leistungen", to: "/?section=warum" },
  { label: "Zielgruppen", to: "/?section=zielgruppen" },
  { label: "SAVE&SAFE", to: "/?section=saveandsafe" },
  { label: "Team", to: "/?section=team" },
  { label: "Methodik", to: "/?section=methodik" },
  { label: "Kontakt", to: "/?section=kontakt" },
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
      aria-label="Hauptnavigation"
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        solidHeader ? "bg-card/95 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between md:h-20">
        <Link
          to="/"
          className={`text-xl font-extrabold tracking-tight ${solidHeader ? "text-primary" : "text-primary-foreground"}`}
        >
          INNOVAID<span className="text-left text-accent">:health</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                solidHeader ? "text-foreground" : "text-primary-foreground/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/?section=kontakt"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Gespräch vereinbaren
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setOpen(!open)}
          className={`md:hidden ${solidHeader ? "text-foreground" : "text-primary-foreground"}`}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="md:hidden border-t border-border bg-card px-4 pb-5 pt-2 shadow-[0_20px_50px_-32px_hsl(222_70%_10%_/_0.4)]"
        >
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/?section=kontakt"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-xl bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-foreground"
          >
            Gespräch vereinbaren
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
