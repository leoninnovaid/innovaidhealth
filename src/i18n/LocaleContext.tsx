import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { resolveLocale, withLocaleInSearch, withLocaleInTo, getLocaleFromSearch } from "@/i18n/routing";
import { LOCALE_STORAGE_KEY, type Locale } from "@/i18n/types";
import { translations } from "@/i18n/translations";

type LocaleContextValue = {
  locale: Locale;
  copy: (typeof translations)[Locale];
  setLocale: (nextLocale: Locale) => void;
  withLocalePath: (to: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const locale = useMemo(() => {
    const storedLocale =
      typeof window !== "undefined" ? window.localStorage.getItem(LOCALE_STORAGE_KEY) : null;
    return resolveLocale(location.search, storedLocale);
  }, [location.search]);

  useEffect(() => {
    document.documentElement.lang = locale;

    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Ignore storage access errors.
    }
  }, [locale]);

  useEffect(() => {
    const queryLocale = getLocaleFromSearch(location.search);

    if (queryLocale === locale) {
      return;
    }

    const localizedSearch = withLocaleInSearch(location.search, locale);
    navigate(
      {
        pathname: location.pathname,
        search: localizedSearch,
        hash: location.hash,
      },
      { replace: true },
    );
  }, [locale, location.hash, location.pathname, location.search, navigate]);

  const setLocale = (nextLocale: Locale) => {
    const localizedSearch = withLocaleInSearch(location.search, nextLocale);

    navigate(
      {
        pathname: location.pathname,
        search: localizedSearch,
        hash: location.hash,
      },
      { replace: true },
    );
  };

  const withLocalePath = (to: string) => withLocaleInTo(to, locale) as string;

  const contextValue = useMemo(
    () => ({
      locale,
      copy: translations[locale],
      setLocale,
      withLocalePath,
    }),
    [locale],
  );

  return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useI18n must be used inside LocaleProvider.");
  }

  return context;
};
