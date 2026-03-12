const Footer = () => (
  <footer className="bg-primary py-10 px-6">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-primary-foreground/60">
        © {new Date().getFullYear()} INNOVAID:health. Alle Rechte vorbehalten.
      </p>
      <div className="flex gap-6">
        <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Impressum</a>
        <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Datenschutz</a>
      </div>
    </div>
  </footer>
);

export default Footer;
