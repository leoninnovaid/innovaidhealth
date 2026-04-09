import { useState } from "react";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onTouched",
  });

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

    setSubmitStatus("loading");
    setSubmitMessage("");

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          organization: values.organization || "Nicht angegeben",
          anliegen: inquiryLabelMap[values.inquiryType],
          message: values.message,
        }),
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
    } catch (error) {
      const message = error instanceof Error ? error.message : "Beim Versand ist ein unbekannter Fehler aufgetreten.";
      setSubmitStatus("error");
      setSubmitMessage(message);
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
          className="mx-auto max-w-3xl"
        >
          <div className="mb-10 text-center md:mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Kontakt</p>
            <h2 className="mb-6 text-3xl font-extrabold text-foreground md:text-4xl">Kontakt aufnehmen</h2>
            <p className="leading-relaxed text-muted-foreground">
              Wir klären in einem unverbindlichen Erstgespräch, wie wir Ihr Vorhaben von der Strategie bis zur Umsetzung
              begleiten können.
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card p-6 card-elevated md:p-8">
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
                          <Input placeholder="Vor- und Nachname" autoComplete="name" {...field} />
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
                          <Input type="email" placeholder="name@unternehmen.de" autoComplete="email" {...field} />
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
                          <Input placeholder="Unternehmen, Einrichtung, Krankenkasse" autoComplete="organization" {...field} />
                        </FormControl>
                        <FormDescription>Optional</FormDescription>
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
                              <SelectValue placeholder="Bitte auswählen" />
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
                        <Textarea
                          placeholder="Beschreiben Sie kurz Ihr Vorhaben, den Kontext und wo Sie Unterstützung benötigen."
                          className="min-h-[140px]"
                          {...field}
                        />
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
                      <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/40 p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} />
                        </FormControl>
                        <div className="space-y-1">
                          <FormLabel className="text-sm font-normal leading-relaxed">
                            Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                            <Link to="/datenschutz" className="font-medium text-accent underline-offset-2 hover:underline">
                              Datenschutzerklärung
                            </Link>{" "}
                            zu. *
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button type="submit" size="lg" className="px-8 py-6 text-base" disabled={submitStatus === "loading"}>
                    {submitStatus === "loading" ? "Wird gesendet ..." : "Anfrage senden"}
                    <Send className="ml-2" size={18} />
                  </Button>
                  <p className="text-xs text-muted-foreground">Felder mit * sind Pflichtfelder.</p>
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

            <div className="mt-6 border-t border-border/60 pt-6">
              <p className="mb-4 text-sm text-muted-foreground">
                Alternativ erreichen Sie uns jederzeit direkt per E-Mail.
              </p>
              <Button variant="outline" asChild>
                <a href="mailto:info@innovaid.health">
                  <Mail className="mr-2" size={18} /> info@innovaid.health
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
