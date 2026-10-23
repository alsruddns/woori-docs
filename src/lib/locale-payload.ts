import editorTranslations from "./editor-translations.json";
import { categoryNames, ui, locales, localeLabels, type Locale } from "./registry";
import { chromeText } from "./site-chrome-i18n";

/** Selects one locale's client-facing dictionaries on the server. */
export function getLocalePayload(locale: Locale) {
  return {
    uiText: ui[locale],
    categoryLabels: categoryNames[locale],
    editorTranslations: editorTranslations[locale] as Record<string, string>,
    chromeText: chromeText[locale],
    languages: locales.map((code) => ({ code, label: localeLabels[code] })),
  };
}
