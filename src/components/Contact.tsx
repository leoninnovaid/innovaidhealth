import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type TurnstileRenderOptions = {
  sitekey: string;
  appearance?: "always" | "execute" | "interaction-only";
  size?: "normal" | "flexible" | "compact";
  theme?: "auto" | "light" | "dark";
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const inquiryOptions = [
  { value: "foerderprojekte", label: "Förderprojekte" },
  { value: "mdr_diga", label: "MDR/DiGA" },
  { value: "allgemein", label: "Allgemeine Anfrage" },
] as const;

const inquiryLabelMap: Record<(typeof inquiryOptions)[number]["value"], string> = {
  foerderprojekte: "Förderprojekte",
  mdr_diga: "MDR/DiGA",
  allgemein: "Allgemeine Anfrage",
};

const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Bitte geben Sie Ihren Namen ein."),
  email: z.string().trim().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  organization: z.string().trim().optional(),
  inquiryType: z.enum(["foerderprojekte", "mdr_diga", "allgemein"], {
    required_error: "Bitte wählen Sie ein Anliegen aus.",
  }),
  message: z.string().trim().min(20, "Bitte beschreiben Sie Ihr Anliegen mit mindestens 20 Zeichen."),
  privacyAccepted: z.boolean().refine((value) => value, {
    message: "Bitte stimmen Sie der Datenschutzerklärung zu.",
  }),
  website: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type SubmitStatus = "idle" | "loading" | "success" | "error";

const defaultValues = {
  name: "",
  email: "",
  organization: "",
  inquiryType: undefined,
  message: "",
  privacyAccepted: false,
  website: "",
} satisfies Partial<ContactFormValues>;

const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;
const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState("");
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onTouched",
  });

  const isTurnstileEnabled = Boolean(turnstileSiteKey?.trim());

  useEffect(() => {
    if (!isTurnstileEnabled || !turnstileSiteKey || !turnstileContainerRef.current) {
      return;
    }

    const scriptId = "cf-turnstile-script";
    let isCancelled = false;

    const renderWidget = () => {
      if (isCancelled || !window.turnstile || !turnstileContainerRef.current) {
        return;
      }

      turnstileContainerRef.current.innerHTML = "";
      turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: turnstileSiteKey,
        appearance: "interaction-only",
        size: "flexible",
        theme: "light",
        callback: (token) => {
          setTurnstileToken(token);
          setTurnstileError("");
        },
        "error-callback": () => {
          setTurnstileToken("");
          setTurnstileError("Spam-Schutz konnte nicht geladen werden. Bitte Seite neu laden.");
        },
        "expired-callback": () => {
          setTurnstileToken("");
          setTurnstileError("Die Sicherheitsprüfung ist abgelaufen. Bitte erneut bestätigen.");
        },
      });
    };

    const loadTurnstileScript = () => {
      if (window.turnstile) {
        renderWidget();
        return;
      }

      const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (existingScript) {
        existingScript.addEventListener("load", renderWidget, { once: true });
        existingScript.addEventListener(
          "error",
          () => {
            setTurnstileError("Spam-Schutz konnte nicht geladen werden. Bitte Seite neu laden.");
          },
          { once: true },
        );
        return;
      }

      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      script.onerror = () => {
        setTurnstileError("Spam-Schutz konnte nicht geladen werden. Bitte Seite neu laden.");
      };
      document.head.appendChild(script);
    };

    loadTurnstileScript();

    return () => {
      isCancelled = true;
    };
  }, [isTurnstileEnabled]);

  const resetTurnstile = () => {
    setTurnstileToken("");
    setTurnstileError("");

    if (window.turnstile && turnstileWidgetIdRef.current) {
      window.turnstile.reset(turnstileWidgetIdRef.current);
    }
  };

  const onSubmit = async (values: ContactFormValues) => {
    if (values.website?.trim()) {
      setSubmitStatus("success");
      setSubmitMessage("Vielen Dank. Wir melden uns zeitnah bei Ihnen.");
      form.reset(defaultValues);
      return;
    }

    if (!formspreeEndpoint) {
      setSubmitStatus("error");
      setSubmitMessage(
        "Das Kontaktformular ist aktuell noch nicht vollständig konfiguriert. Bitte schreiben Sie uns direkt an info@innovaid.health.",
      );
      return;
    }

    if (isTurnstileEnabled && !turnstileToken) {
      setSubmitStatus("error");
      setSubmitMessage("Bitte bestätigen Sie zuerst den Spam-Schutz.");
      return;
    }

    setSubmitStatus("loading");
    setSubmitMessage("");

    try {
      const formData = new FormData();
      formData.set("name", values.name);
      formData.set("email", values.email);
      formData.set("organization", values.organization || "Nicht angegeben");
      formData.set("anliegen", inquiryLabelMap[values.inquiryType]);
      formData.set("message", values.message);

      if (isTurnstileEnabled && turnstileToken) {
        formData.set("cf-turnstile-response", turnstileToken);
      }

      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const firstApiError = Array.isArray(payload?.errors) ? payload.errors[0]?.message : null;
        const message =
          typeof firstApiError === "string" && firstApiError.trim().length > 0
            ? firstApiError
            : "Die Anfrage konnte nicht versendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt per E-Mail.";

        throw new Error(message);
      }

      setSubmitStatus("success");
      setSubmitMessage("Vielen Dank. Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns zeitnah bei Ihnen.");
      form.reset(defaultValues);

      if (isTurnstileEnabled) {
        resetTurnstile();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Beim Versand ist ein unbekannter Fehler aufgetreten.";
      setSubmitStatus("error");
      setSubmitMessage(message);

      if (isTurnstileEnabled) {
        resetTurnstile();
      }
    }
  };

  return (
    <section id="kontakt" className="section-padding bg-muted/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-5xl"
        >
          <div className="mb-10 text-center md:mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Kontakt</p>
            <h2 className="mb-6 text-3xl font-extrabold text-foreground md:text-4xl">Kontakt aufnehmen</h2>
            <p className="leading-relaxed text-muted-foreground">
              Wir klären in einem unverbindlichen Erstgespräch, wie wir Ihr Vorhaben von der Strategie bis zur Umsetzung
              begleiten können.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border/50 bg-card card-elevated">
            <div className="hero-gradient px-6 py-5 md:px-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">Kontaktformular</p>
              <h3 className="text-xl font-extrabold text-primary-foreground md:text-2xl">Erzählen Sie uns von Ihrem Vorhaben</h3>
            </div>

            <div className="p-6 md:p-8">
              <Form {...form}>
                <form className="space-y-6" noValidate onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input autoComplete="off" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-Mail *</FormLabel>
                          <FormControl>
                            <Input type="email" autoComplete="off" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="organization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organisation</FormLabel>
                          <FormControl>
                            <Input autoComplete="off" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="inquiryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Anliegen *</FormLabel>
                          <Select modal={false} onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {inquiryOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nachricht *</FormLabel>
                        <FormControl>
                          <Textarea className="min-h-[140px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                    {...form.register("website")}
                  />

                  <FormField
                    control={form.control}
                    name="privacyAccepted"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-[auto_1fr] items-start gap-3 rounded-lg border border-border/50 bg-muted/40 p-4">
                          <FormControl>
                            <Checkbox
                              className="mt-0.5"
                              checked={field.value}
                              onCheckedChange={(checked) => field.onChange(checked === true)}
                            />
                          </FormControl>
                          <div>
                            <FormLabel className="block text-sm font-normal leading-relaxed">
                              Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                              <Link to="/datenschutz" className="font-medium text-accent underline-offset-2 hover:underline">
                                Datenschutzerklärung
                              </Link>{" "}
                              zu. *
                            </FormLabel>
                            <FormMessage className="mt-1" />
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-border/60 bg-background p-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">Anfrage senden</p>
                      <Button type="submit" className="w-full" size="lg" disabled={submitStatus === "loading"}>
                        {submitStatus === "loading" ? "Wird gesendet ..." : "Anfrage senden"}
                        <Send className="ml-2" size={18} />
                      </Button>
                      {isTurnstileEnabled ? (
                        <div className="mt-3 overflow-hidden">
                          <div ref={turnstileContainerRef} className="w-full max-w-[420px]" />
                        </div>
                      ) : null}
                      {turnstileError && <p className="mt-2 text-sm text-destructive">{turnstileError}</p>}
                    </div>

                    <div className="rounded-xl border border-border/60 bg-background p-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">Direkter Kontakt</p>
                      <Button variant="outline" asChild className="w-full">
                        <a href="mailto:info@innovaid.health">
                          <Mail className="mr-2" size={18} /> info@innovaid.health
                        </a>
                      </Button>
                    </div>
                  </div>

                  {submitStatus === "success" && (
                    <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{submitMessage}</p>
                  )}

                  {submitStatus === "error" && (
                    <p className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                      {submitMessage}
                    </p>
                  )}
                </form>
              </Form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
