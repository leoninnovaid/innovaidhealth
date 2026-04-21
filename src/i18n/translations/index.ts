import { commonTranslations } from "@/i18n/translations/common";
import { knowledgeTranslations } from "@/i18n/translations/knowledge";
import { legalTranslations } from "@/i18n/translations/legal";

export const translations = {
  en: {
    ...commonTranslations.en,
    knowledge: knowledgeTranslations.en,
    legal: legalTranslations.en,
  },
  de: {
    ...commonTranslations.de,
    knowledge: knowledgeTranslations.de,
    legal: legalTranslations.de,
  },
} as const;

export type TranslationSchema = (typeof translations)["en"];
