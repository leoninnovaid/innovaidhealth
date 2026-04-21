import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { withLocaleInSearch } from "@/i18n/routing";
import { useI18n } from "@/i18n/LocaleContext";
import innovaidSymbol from "@/assets/innovaid-symbol.png";

type NavItem =
  | { key: "services" | "audiences" | "inAction" | "team"; type: "section"; section: string }
  | { key: "knowledgeIndexBeta"; type: "route"; to: string };

const navItems: NavItem[] = [
  { key: "services", type: "section", section: "warum" },
  { key: "audiences", type: "section", section: "zielgruppen" },
  { key: "inAction", type: "section", section: "saveandsafe" },
  { key: "team", type: "section", section: "team" },
  { key: "knowledgeIndexBeta", type: "route", to: "/wissensindex-beta" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { copy, locale, setLocale, withLocalePath } = useI18n();
  const isSubpage = location.pathname !== "/";

  useEffect(() => {
    if (isSubpage) {
      setScrolled(true);
      return;
    }

    const updateNavbarState = () => {
      const hero = document.getElementById("hero");
      if (!hero) {
        setScrolled(window.scrollY > 20);
        return;
      }

      const navHeight = navRef.current?.offsetHeight ?? 80;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setScrolled(heroBottom <= navHeight);
    };

    updateNavbarState();
    window.addEventListener("scroll", updateNavbarState, { passive: true });
    window.addEventListener("resize", updateNavbarState);

    return () => {
      window.removeEventListener("scroll", updateNavbarState);
      window.removeEventListener("resize", updateNavbarState);
    };
  }, [isSubpage]);

  const solidHeader = scrolled || isSubpage;

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);

    if (!element) {
      return false;
    }

    element.scrollIntoView({ behavior: "smooth", block: "start" });

    navigate(
      {
        pathname: "/",
        search: withLocaleInSearch("", locale),
      },
      { replace: true },
    );

    return true;
  };

  const handleSectionClick = (section: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);

    if (location.pathname === "/" && scrollToSection(section)) {
      return;
    }

    navigate(
      {
        pathname: "/",
        search: withLocaleInSearch("", locale),
      },
      { state: { sectionToScroll: section } },
    );
  };

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);

    if (location.pathname === "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      navigate(
        {
          pathname: "/",
          search: withLocaleInSearch("", locale),
        },
        { replace: true },
      );
      return;
    }

    navigate({ pathname: "/", search: withLocaleInSearch("", locale) });
  };

  const renderLanguageSwitcher = (className: string) => (
    <div role="group" aria-label={copy.common.languageSwitcherLabel} className={className}>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors ${
          locale === "en"
            ? "border-accent bg-accent text-accent-foreground"
            : "border-border bg-background text-foreground hover:border-accent/40"
        }`}
      >
        {copy.common.languageOptionEn}
      </button>
      <button
        type="button"
        onClick={() => setLocale("de")}
        className={`rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors ${
          locale === "de"
            ? "border-accent bg-accent text-accent-foreground"
            : "border-border bg-background text-foreground hover:border-accent/40"
        }`}
      >
        {copy.common.languageOptionDe}
      </button>
    </div>
  );

  return (
    <nav
      ref={navRef}
      aria-label={locale === "de" ? "Hauptnavigation" : "Main navigation"}
      role="navigation"
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        solidHeader ? "bg-primary/95 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between md:h-20">
        <Link
          to={withLocalePath("/")}
          onClick={handleHomeClick}
          className="shrink-0"
        >
          <img src={innovaidSymbol} alt="INNOVAID:health" className="h-10 w-auto md:h-11" />
        </Link>

        <div className="hidden items-center gap-4 lg:flex xl:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.type === "route" ? withLocalePath(item.to) : withLocalePath("/")}
              onClick={item.type === "route" ? () => setOpen(false) : handleSectionClick(item.section)}
              className="whitespace-nowrap text-[13px] font-medium text-primary-foreground/85 transition-colors hover:text-primary-foreground xl:text-sm"
            >
              {copy.navbar[item.key]}
            </Link>
          ))}

          {renderLanguageSwitcher("flex items-center gap-2")}

          <Link
            to={withLocalePath("/")}
            onClick={handleSectionClick("kontakt")}
            className="shrink-0 whitespace-nowrap rounded-lg bg-accent px-4 py-2 text-[13px] font-semibold text-accent-foreground transition-colors hover:bg-accent/90 xl:px-5 xl:py-2.5 xl:text-sm"
          >
            {copy.navbar.cta}
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? copy.navbar.menuCloseAria : copy.navbar.menuOpenAria}
          onClick={() => setOpen(!open)}
          className="text-primary-foreground lg:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-background px-4 pb-5 pt-2 shadow-[0_20px_50px_-32px_hsl(222_70%_10%_/_0.4)] lg:hidden"
        >
          <div className="mb-3 rounded-xl border border-border/70 bg-background p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {copy.common.languageSwitcherLabel}
            </p>
            {renderLanguageSwitcher("flex items-center gap-2")}
          </div>

          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.type === "route" ? withLocalePath(item.to) : withLocalePath("/")}
              onClick={item.type === "route" ? () => setOpen(false) : handleSectionClick(item.section)}
              className="block rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-accent"
            >
              {copy.navbar[item.key]}
            </Link>
          ))}
          <Link
            to={withLocalePath("/")}
            onClick={handleSectionClick("kontakt")}
            className="mt-3 block rounded-xl bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-foreground"
          >
            {copy.navbar.cta}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
