import type { ReviewStatus } from "@/knowledge/types";

export const statusMeta: Record<ReviewStatus, { label: string; className: string }> = {
  roh: {
    label: "Entwurf",
    className: "bg-amber-100 text-amber-900 border-amber-300",
  },
  in_review: {
    label: "In Redaktion",
    className: "bg-blue-100 text-blue-900 border-blue-300",
  },
  freigegeben: {
    label: "Verifiziert",
    className: "bg-emerald-100 text-emerald-900 border-emerald-300",
  },
};

export const featuredQuestionSlugs: string[] = [
  "wer-ist-antragsberechtigt",
  "wie-erfolgt-die-antragseinreichung",
  "einreichungsfristen-2026",
  "foerderfaehige-ausgaben-grundsatz",
];
