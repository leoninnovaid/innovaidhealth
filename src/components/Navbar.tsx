import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Leistungen", section: "warum" },
  { label: "Zielgruppen", section: "zielgruppen" },
  { label: "Projekte", section: "saveandsafe" },
  { label: "Team", section: "team" },
  { label: "Methodik", section: "methodik" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isSubpage = location.pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solidHeader = scrolled || isSubpage;

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);

    if (!element) {
      return false;
    }

    element.scrollIntoView({ behavior: "smooth", block: "start" });
    navigate("/", { replace: true });
    return true;
  };

  const handleSectionClick = (section: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);

    if (location.pathname === "/" && scrollToSection(section)) {
      return;
    }

    navigate("/", { state: { sectionToScroll: section } });
  };

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);

    if (location.pathname === "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      navigate("/", { replace: true });
      return;
    }

    navigate("/");
  };

  return (
    <nav
      aria-label="Hauptnavigation"
      role="navigation"
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        solidHeader ? "bg-card/95 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between md:h-20">
        <Link
          to="/"
          onClick={handleHomeClick}
          className={`shrink-0 text-xl font-extrabold tracking-tight ${solidHeader ? "text-primary" : "text-primary-foreground"}`}
        >
          INNOVAID<span className="text-left text-accent">:health</span>
        </Link>

        <div className="hidden items-center gap-5 lg:flex xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.section}
              to="/"
              onClick={handleSectionClick(item.section)}
              className={`whitespace-nowrap text-[13px] font-medium transition-colors hover:text-accent xl:text-sm ${
                solidHeader ? "text-foreground" : "text-primary-foreground/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/"
            onClick={handleSectionClick("kontakt")}
            className="shrink-0 whitespace-nowrap rounded-lg bg-accent px-4 py-2 text-[13px] font-semibold text-accent-foreground transition-colors hover:bg-accent/90 xl:px-5 xl:py-2.5 xl:text-sm"
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
          className={`lg:hidden ${solidHeader ? "text-foreground" : "text-primary-foreground"}`}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-card px-4 pb-5 pt-2 shadow-[0_20px_50px_-32px_hsl(222_70%_10%_/_0.4)] lg:hidden"
        >
          {navItems.map((item) => (
            <Link
              key={item.section}
              to="/"
              onClick={handleSectionClick(item.section)}
              className="block rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/"
            onClick={handleSectionClick("kontakt")}
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
