import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ui } from "../src/lib/chrome-i18n";
import { chromeText } from "../src/lib/site-chrome-i18n";
import editorTranslations from "../src/lib/editor-translations.json";
import documentTranslations from "../src/lib/document-translations.json";
import categories from "../src/lib/category-translations.json";

const draft = JSON.parse(readFileSync("docs/i18n-drafts/ru.json", "utf8")) as {
  titles: Record<string, string>;
  fields: Record<string, string>;
  interface: Record<string, string>;
  categories: Record<string, string>;
  ui: Record<string, string>;
  chrome: Record<string, unknown>;
  editor: Record<string, string>;
  documentContent: Record<string, unknown>;
  reviewStatus: string;
};
const sameKeys = (actual: Record<string, unknown>, expected: Record<string, unknown>) =>
  expect(Object.keys(actual).sort()).toEqual(Object.keys(expected).sort());
const placeholders = (value: string) => [...value.matchAll(/\{\w+\}/g)].map(([token]) => token).sort();
const enTitles = documentTranslations.en.titles as Record<string, string>;
const enInterface = documentTranslations.en.interface as Record<string, string>;
const enEditor = editorTranslations.en as Record<string, string>;

describe("unpublished Russian translation draft", () => {
  it("covers every document title, field, interface string, and category without English copies", () => {
    sameKeys(draft.titles, enTitles);
    sameKeys(draft.fields, documentTranslations.en.fields);
    sameKeys(draft.interface, enInterface);
    sameKeys(draft.categories, categories.en);
    for (const [key, value] of Object.entries(draft.titles)) expect(value.trim()).not.toBe(enTitles[key]);
    for (const [key, value] of Object.entries(draft.fields)) expect(value.trim()).not.toBe(key);
    for (const [key, value] of Object.entries(draft.interface)) {
      expect(value.trim()).not.toBe(enInterface[key]);
      expect(placeholders(value)).toEqual(placeholders(enInterface[key]));
    }
  });

  it("covers the shared UI and remains explicitly unpublished", () => {
    sameKeys(draft.ui, ui.en);
    sameKeys(draft.chrome, chromeText.en);
    sameKeys(draft.editor, enEditor);
    expect(draft.ui.adHidden).toBe("");
    for (const [key, value] of Object.entries(draft.ui)) {
      if (key !== "adHidden") expect(value.trim()).not.toBe(ui.en[key]);
    }
    expect((draft.chrome.types as string[])).toHaveLength(chromeText.en.types.length);
    for (const [key, value] of Object.entries(draft.editor)) expect(value.trim()).not.toBe(enEditor[key]);
    expect(draft.reviewStatus).toBe("unreviewed; unpublished");
  });

  it("contains generated document, guide, FAQ, category, and section copy", () => {
    expect(Object.keys(draft.documentContent)).toContain("intro");
    expect(Object.keys(draft.documentContent)).toContain("steps");
    expect(Object.keys(draft.documentContent)).toContain("faqFieldsAnswer");
    expect(Object.keys(draft.documentContent)).toContain("libraryUse");
    expect(Object.keys(draft.documentContent)).toContain("sectionLabels");
    const intro = draft.documentContent.intro as string;
    expect(placeholders(intro)).toEqual(["{category}", "{title}"].sort());
  });
});
