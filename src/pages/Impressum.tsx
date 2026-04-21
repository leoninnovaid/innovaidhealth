import { useEffect } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useI18n } from "@/i18n/LocaleContext";

const Impressum = () => {
  const { copy } = useI18n();
  const text = copy.legal.imprint;

  useEffect(() => {
    document.title = copy.seo.imprintTitle;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", text.title);
    }
  }, [copy.seo.imprintTitle, text.title]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="section-padding pb-16 pt-24 md:pt-32">
        <div className="container mx-auto max-w-2xl">
          <h1 className="mb-8 text-3xl font-extrabold text-foreground md:text-4xl">{text.title}</h1>

          <div className="space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">{text.companyInfoHeading}</h2>
              <p>
                INNOVAID:health GmbH
                <br />
                Albert-Fischer-Straße 9
                <br />
                53113 Bonn
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">{text.representedByHeading}</h2>
              <p>{text.representedByText}</p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">{text.contactHeading}</h2>
              <p>E-Mail: info@innovaid.health</p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">{text.registerHeading}</h2>
              <p>
                {text.registerLines[0]}
                <br />
                {text.registerLines[1]}
                <br />
                {text.registerLines[2]}
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">{text.vatHeading}</h2>
              <p>{text.vatText}</p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">{text.externalLinksHeading}</h2>
              {text.externalLinksParagraphs.map((paragraph) => (
                <p key={paragraph} className="mt-3 first:mt-0">
                  {paragraph}
                </p>
              ))}
            </div>

            <div>
              <h2 className="mb-2 text-lg font-bold text-foreground">{text.disclaimerHeading}</h2>
              <p>{text.disclaimerText}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;
