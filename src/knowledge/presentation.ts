import type { ReviewStatus } from "@/knowledge/types";

export const statusMeta: Record<ReviewStatus, { label: string; className: string }> = {
  roh: {
    label: "Roh",
    className: "bg-amber-100 text-amber-900 border-amber-300",
  },
  in_review: {
    label: "In Review",
    className: "bg-blue-100 text-blue-900 border-blue-300",
  },
  freigegeben: {
    label: "Freigegeben",
    className: "bg-emerald-100 text-emerald-900 border-emerald-300",
  },
};
