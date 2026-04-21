import { useEffect, useMemo, useRef, useState } from "react";
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
import { useI18n } from "@/i18n/LocaleContext";

type TurnstileRenderOptions = {
  sitekey: string;
  appearance?: "always" | "execute" | "interaction-only";
  size?: "normal" | "flexible" | "compact";
  theme?: "auto" | "light" | "dark";
  retry?: "auto" | "never";
  "retry-interval"?: number;
  callback?: (token: string) => void;
  "error-callback"?: (errorCode: string | number) => boolean | void;
  "expired-callback"?: () => boolean | void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type InquiryValue = "foerderprojekte" | "mdr_diga" | "allgemein";

type ContactFormValues = {
  name: string;
  email: string;
  organization?: string;
  inquiryType: InquiryValue;
  message: string;
  privacyAccepted: boolean;
  website?: string;
};

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

const buildContactSchema = (copy: ReturnType<typeof useI18n>["copy"]["contact"]) =>
  z.object({
    name: z.string().trim().min(2, copy.validation.name),
    email: z.string().trim().email(copy.validation.email),
    organization: z.string().trim().optional(),
    inquiryType: z.enum(["foerderprojekte", "mdr_diga", "allgemein"], {
      required_error: copy.validation.inquiry,
    }),
    message: z.string().trim().min(20, copy.validation.message),
    privacyAccepted: z.boolean().refine((value) => value, {
      message: copy.validation.privacy,
    }),
    website: z.string().optional(),
  });

const Contact = () => {
  const { copy, withLocalePath } = useI18n();
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState("");
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  const inquiryOptions = useMemo(
    () => [
      { value: "foerderprojekte" as const, label: copy.contact.inquiryOptions.foerderprojekte },
      { value: "mdr_diga" as const, label: copy.contact.inquiryOptions.mdr_diga },
      { value: "allgemein" as const, label: copy.contact.inquiryOptions.allgemein },
    ],
    [copy.contact.inquiryOptions],
  );

  const inquiryLabelMap = useMemo(
    () => ({
      foerderprojekte: copy.contact.inquiryOptions.foerderprojekte,
      mdr_diga: copy.contact.inquiryOptions.mdr_diga,
      allgemein: copy.contact.inquiryOptions.allgemein,
    }),
    [copy.contact.inquiryOptions],
  );

  const formSchema = useMemo(() => buildContactSchema(copy.contact), [copy.contact]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
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
    let attachedScript: HTMLScriptElement | null = null;
    let handleScriptLoad: (() => void) | null = null;
    let handleScriptError: (() => void) | null = null;

    const destroyWidget = () => {
      if (window.turnstile && turnstileWidgetIdRef.current) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
      }

      turnstileWidgetIdRef.current = null;

      if (turnstileContainerRef.current) {
        turnstileContainerRef.current.innerHTML = "";
      }
    };

    const renderWidget = () => {
      if (isCancelled || !window.turnstile || !turnstileContainerRef.current) {
        return;
      }

      destroyWidget();
      turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: turnstileSiteKey,
        appearance: "always",
        size: "normal",
        theme: "light",
        retry: "auto",
        "retry-interval": 3000,
        callback: (token) => {
          setTurnstileToken(token);
          setTurnstileError("");
        },
        "error-callback": () => {
          setTurnstileToken("");
          setTurnstileError(copy.contact.turnstileLoadError);
          return true;
        },
        "expired-callback": () => {
          setTurnstileToken("");
          setTurnstileError(copy.contact.turnstileExpired);
          return true;
        },
      });
    };

    const loadTurnstileScript = () => {
      if (window.turnstile) {
        renderWidget();
        return;
      }

      const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
      handleScriptLoad = () => renderWidget();
      handleScriptError = () => setTurnstileError(copy.contact.turnstileLoadError);

      if (existingScript) {
        attachedScript = existingScript;
        existingScript.addEventListener("load", handleScriptLoad, { once: true });
        existingScript.addEventListener("error", handleScriptError, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;

      attachedScript = script;
      script.addEventListener("load", handleScriptLoad, { once: true });
      script.addEventListener("error", handleScriptError, { once: true });
      document.head.appendChild(script);
    };

    loadTurnstileScript();

    return () => {
      isCancelled = true;

      if (attachedScript && handleScriptLoad) {
        attachedScript.removeEventListener("load", handleScriptLoad);
      }

      if (attachedScript && handleScriptError) {
        attachedScript.removeEventListener("error", handleScriptError);
      }

      destroyWidget();
    };
  }, [copy.contact.turnstileExpired, copy.contact.turnstileLoadError, isTurnstileEnabled]);

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
      setSubmitMessage(copy.contact.successGeneric);
      form.reset(defaultValues);
      return;
    }

    if (!formspreeEndpoint) {
      setSubmitStatus("error");
      setSubmitMessage(copy.contact.errorMissingConfig);
      return;
    }

    if (isTurnstileEnabled && !turnstileToken) {
      setSubmitStatus("error");
      setSubmitMessage(copy.contact.turnstileRequired);
      return;
    }

    setSubmitStatus("loading");
    setSubmitMessage("");

    try {
      const formData = new FormData();
      formData.set("name", values.name);
      formData.set("email", values.email);
      formData.set("organization", values.organization || "Not specified");
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
            : copy.contact.errorSendFallback;

        throw new Error(message);
      }

      setSubmitStatus("success");
      setSubmitMessage(copy.contact.successSubmitted);
      form.reset(defaultValues);

      if (isTurnstileEnabled) {
        resetTurnstile();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : copy.contact.errorUnknown;
      setSubmitStatus("error");
      setSubmitMessage(message);

      if (isTurnstileEnabled) {
        resetTurnstile();
      }
    }
  };

  return (
    <section id="kontakt" className="section-padding scroll-mt-24 bg-muted/50 md:scroll-mt-28">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-5xl"
        >
          <div className="mb-10 text-center md:mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">{copy.contact.label}</p>
            <h2 className="mb-6 text-3xl font-extrabold text-foreground md:text-4xl">{copy.contact.title}</h2>
            <p className="leading-relaxed text-muted-foreground">{copy.contact.description}</p>
          </div>

          <div className="card-elevated overflow-hidden rounded-3xl border border-border/50 bg-card">
            <div className="hero-gradient px-6 py-5 md:px-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">{copy.contact.formLabel}</p>
              <h3 className="text-xl font-extrabold text-primary-foreground md:text-2xl">{copy.contact.formTitle}</h3>
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
                          <FormLabel>{copy.contact.fields.name}</FormLabel>
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
                          <FormLabel>{copy.contact.fields.email}</FormLabel>
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
                          <FormLabel>{copy.contact.fields.organization}</FormLabel>
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
                          <FormLabel>{copy.contact.fields.inquiry}</FormLabel>
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
                        <FormLabel>{copy.contact.fields.message}</FormLabel>
                        <FormControl>
                          <Textarea className="min-h-[140px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...form.register("website")} />

                  <FormField
                    control={form.control}
                    name="privacyAccepted"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-[auto_1fr] items-start gap-3 rounded-lg border border-border/50 bg-muted/40 p-4">
                          <FormControl>
                            <Checkbox className="mt-0.5" checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} />
                          </FormControl>
                          <div>
                            <FormLabel className="block text-sm font-normal leading-relaxed">
                              {copy.contact.fields.privacyPrefix}{" "}
                              <Link to={withLocalePath("/datenschutz")} className="font-medium text-accent underline-offset-2 hover:underline">
                                {copy.contact.fields.privacyLink}
                              </Link>{" "}
                              {copy.contact.fields.privacySuffix}
                            </FormLabel>
                            <FormMessage className="mt-1" />
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-border/60 bg-background p-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">{copy.contact.submitCardTitle}</p>
                      <Button type="submit" className="w-full" size="lg" disabled={submitStatus === "loading"}>
                        {submitStatus === "loading" ? copy.contact.submitLoading : copy.contact.submitIdle}
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
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">{copy.contact.directCardTitle}</p>
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
                    <p className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{submitMessage}</p>
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
