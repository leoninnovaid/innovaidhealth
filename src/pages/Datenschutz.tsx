import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useI18n } from "@/i18n/LocaleContext";

const Datenschutz = () => {
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">("idle");
  const { copy } = useI18n();
  const text = copy.legal.privacy;

  useEffect(() => {
    document.title = copy.seo.privacyTitle;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", text.title);
    }
  }, [copy.seo.privacyTitle, text.title]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("info@innovaid.health");
      setCopyStatus("success");
    } catch {
      setCopyStatus("error");
    }

    window.setTimeout(() => setCopyStatus("idle"), 2500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="section-padding pb-16 pt-24 md:pt-32">
        <div className="container mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-extrabold text-foreground md:text-4xl">{text.title}</h1>

          <div className="space-y-8 text-sm leading-relaxed text-muted-foreground md:text-base">
            <section>
              <p>{text.intro}</p>
            </section>

            {text.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-2 text-lg font-bold text-foreground">{section.heading}</h2>

                {section.heading.startsWith("1.") && (
                  <p>
                    {section.paragraphs[0]}
                    <br />
                    {section.paragraphs[1]}
                    <br />
                    {section.paragraphs[2]}
                    <br />
                    {section.paragraphs[3]}
                    <br />
                    E-Mail:{" "}
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="cursor-pointer text-accent hover:underline"
                      title={text.copyEmailButton}
                      aria-describedby="copy-email-status"
                    >
                      {text.copyEmailButton}
                    </button>
                  </p>
                )}

                {!section.heading.startsWith("1.") &&
                  section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mt-3 first:mt-0">
                      {paragraph}
                    </p>
                  ))}

                {section.heading.startsWith("6.") && (
                  <p className="mt-3">
                    <a
                      href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      {text.githubPrivacyLabel}
                    </a>
                  </p>
                )}

                {section.heading.startsWith("11.") && (
                  <p className="mt-3">
                    Website:{" "}
                    <a href="https://www.ldi.nrw.de/kontakt" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      {text.authorityLinkLabel}
                    </a>
                  </p>
                )}

                {section.bullets && (
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <p id="copy-email-status" className="text-sm text-foreground" aria-live="polite">
              {copyStatus === "success" && text.copyEmailSuccess}
              {copyStatus === "error" && text.copyEmailError}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Datenschutz;
