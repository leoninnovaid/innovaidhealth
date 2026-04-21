import { describe, expect, it } from "vitest";

import { getLocaleFromSearch, resolveLocale, withLocaleInSearch, withLocaleInTo } from "@/i18n/routing";

describe("i18n routing helpers", () => {
  it("reads locale from search query", () => {
    expect(getLocaleFromSearch("?lang=de")).toBe("de");
    expect(getLocaleFromSearch("?foo=bar&lang=en")).toBe("en");
    expect(getLocaleFromSearch("?lang=fr")).toBeNull();
  });

  it("resolves locale with priority query > storage > default", () => {
    expect(resolveLocale("?lang=de", "en")).toBe("de");
    expect(resolveLocale("", "de")).toBe("de");
    expect(resolveLocale("", null)).toBe("en");
  });

  it("merges locale into existing search params", () => {
    expect(withLocaleInSearch("?section=kontakt", "de")).toBe("?section=kontakt&lang=de");
    expect(withLocaleInSearch("?lang=en&section=kontakt", "de")).toBe("?lang=de&section=kontakt");
    expect(withLocaleInSearch("", "en")).toBe("?lang=en");
  });

  it("keeps hash and existing query when localizing links", () => {
    expect(withLocaleInTo("/wissensindex-beta", "de")).toBe("/wissensindex-beta?lang=de");
    expect(withLocaleInTo("/?section=kontakt", "en")).toBe("/?section=kontakt&lang=en");
    expect(withLocaleInTo("/wissensindex-beta/dokument/doc-1?antwort=a#abschnitt-1", "de")).toBe(
      "/wissensindex-beta/dokument/doc-1?antwort=a&lang=de#abschnitt-1",
    );
  });
});
