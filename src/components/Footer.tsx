import LocaleLink from "@/components/LocaleLink";
import { useI18n } from "@/i18n/LocaleContext";

const Footer = () => {
  const { copy } = useI18n();

  return (
    <footer className="bg-primary px-6 py-10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-primary-foreground/60">
          &copy; {new Date().getFullYear()} INNOVAID:health GmbH. {copy.footer.rights}
        </p>
        <div className="flex gap-6">
          <LocaleLink to="/wissensindex-beta" className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">
            {copy.footer.knowledgeIndexBeta}
          </LocaleLink>
          <LocaleLink to="/impressum" className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">
            {copy.footer.imprint}
          </LocaleLink>
          <LocaleLink to="/datenschutz" className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">
            {copy.footer.privacy}
          </LocaleLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
