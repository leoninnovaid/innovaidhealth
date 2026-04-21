export const SUPPORTED_LOCALES = ["en", "de"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "de";
export const LOCALE_QUERY_PARAM = "lang";
export const LOCALE_STORAGE_KEY = "innovaid.locale";

export const isLocale = (value: string | null | undefined): value is Locale =>
  SUPPORTED_LOCALES.includes(value as Locale);
