import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-primary py-10 px-6">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-primary-foreground/60">&copy; {new Date().getFullYear()} INNOVAID:health GmbH. Alle Rechte vorbehalten.</p>
      <div className="flex gap-6">
        <Link to="/wissensindex-beta" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
          Wissensindex Beta
        </Link>
        <Link to="/impressum" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
          Impressum
        </Link>
        <Link to="/datenschutz" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
          Datenschutz
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
