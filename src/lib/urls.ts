import type { Locale } from "./registry";

export const SITE_ORIGIN = "https://www.woori.today";
export const DOCS_SERVICE = "docs";

export function docsPath(locale: Locale, slug?: string): string {
  return `/${locale}/${DOCS_SERVICE}${slug ? `/${slug}` : ""}`;
}

export function docsUrl(locale: Locale, slug?: string): string {
  return `${SITE_ORIGIN}${docsPath(locale, slug)}`;
}

export function portalPath(locale: Locale): string {
  return `/${locale}`;
}

export function familyServiceUrl(locale: Locale, service: "docs" | "quiz"): string {
  return `${SITE_ORIGIN}/${locale}/${service}`;
}

export function docsPathForLocale(currentPath: string, locale: Locale): string {
  const segments = currentPath.split("/").filter(Boolean);
  return docsPath(locale, segments[1] === DOCS_SERVICE ? segments.slice(2).join("/") || undefined : undefined);
}

export function docsAlternates(locales: readonly Locale[], slug?: string) {
  const languageTags: Record<Locale, string> = {
    ko: "ko", en: "en", ja: "ja", zh: "zh", es: "es", "pt-br": "pt-BR",
    de: "de", fr: "fr", vi: "vi", id: "id", th: "th", "zh-tw": "zh-TW",
    it: "it", nl: "nl", hi: "hi", ru: "ru",
  };
  return Object.fromEntries([
    ...locales.map((locale) => [languageTags[locale], docsPath(locale, slug)]),
    ["x-default", docsPath("en", slug)],
  ]);
}
