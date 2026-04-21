import type { To } from "react-router-dom";

import { DEFAULT_LOCALE, LOCALE_QUERY_PARAM, type Locale, isLocale } from "@/i18n/types";

const normalizeSearch = (search: string) => (search.startsWith("?") ? search.slice(1) : search);

export const getLocaleFromSearch = (search: string): Locale | null => {
  const params = new URLSearchParams(normalizeSearch(search));
  const candidate = params.get(LOCALE_QUERY_PARAM);
  return isLocale(candidate) ? candidate : null;
};

export const resolveLocale = (search: string, storedLocale: string | null | undefined): Locale => {
  const queryLocale = getLocaleFromSearch(search);

  if (queryLocale) {
    return queryLocale;
  }

  if (isLocale(storedLocale)) {
    return storedLocale;
  }

  return DEFAULT_LOCALE;
};

export const withLocaleInSearch = (search: string, locale: Locale) => {
  const params = new URLSearchParams(normalizeSearch(search));
  params.set(LOCALE_QUERY_PARAM, locale);
  const query = params.toString();
  return query ? `?${query}` : "";
};

export const removeSearchParams = (search: string, keys: string[]) => {
  const params = new URLSearchParams(normalizeSearch(search));
  keys.forEach((key) => params.delete(key));
  const query = params.toString();
  return query ? `?${query}` : "";
};

const withLocaleInToString = (to: string, locale: Locale) => {
  const [pathAndSearch, hash = ""] = to.split("#");
  const [pathname, rawSearch = ""] = pathAndSearch.split("?");
  const search = withLocaleInSearch(rawSearch ? `?${rawSearch}` : "", locale);
  return `${pathname}${search}${hash ? `#${hash}` : ""}`;
};

export const withLocaleInTo = (to: To, locale: Locale): To => {
  if (typeof to === "string") {
    return withLocaleInToString(to, locale);
  }

  return {
    ...to,
    search: withLocaleInSearch(to.search ?? "", locale),
  };
};
