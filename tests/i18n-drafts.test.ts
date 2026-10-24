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
  contentDrafted: number;
  fieldReviewed: string[];
  fieldReviewedCount: number;
  titlesReviewedCount: number;
  uiReviewedCount: number;
  chromeReviewedCount: number;
  editorReviewedCount: number;
  interfaceReviewedCount: number;
  categoriesReviewedCount: number;
  documentContentReviewedCount: number;
  reviewStatus: string;
};
const trDraft = JSON.parse(readFileSync("docs/i18n-drafts/tr.json", "utf8")) as {
  fields: Record<string, string>;
  fieldsTranslated: number;
  failures: unknown[];
  reviewStatus: string;
};
const sameKeys = (actual: Record<string, unknown>, expected: Record<string, unknown>) =>
  expect(Object.keys(actual).sort()).toEqual(Object.keys(expected).sort());
const placeholders = (value: string) => [...value.matchAll(/\{\w+\}/g)].map(([token]) => token).sort();
const enTitles = documentTranslations.en.titles as Record<string, string>;
const enInterface = documentTranslations.en.interface as Record<string, string>;
const enEditor = editorTranslations.en as Record<string, string>;
const stringsIn = (value: unknown): string[] => typeof value === "string"
  ? [value]
  : value && typeof value === "object"
    ? Object.values(value).flatMap(stringsIn)
    : [];
const leafCount = (value: unknown): number => value && typeof value === "object"
  ? Object.values(value).reduce((count, child) => count + leafCount(child), 0)
  : 1;

describe("unpublished Russian translation draft", () => {
  it("keeps the partial Turkish field batch complete by key and unpublished", () => {
    sameKeys(trDraft.fields, documentTranslations.en.fields);
    expect(trDraft.fieldsTranslated).toBe(Object.keys(trDraft.fields).length);
    expect(trDraft.failures).toHaveLength(0);
    expect(trDraft.reviewStatus).toBe("unreviewed; unpublished");
  });

  it("covers every document title, field, interface string, and category without English copies", () => {
    sameKeys(draft.titles, enTitles);
    sameKeys(draft.fields, documentTranslations.en.fields);
    sameKeys(draft.interface, enInterface);
    sameKeys(draft.categories, categories.en);
    expect(draft.titlesReviewedCount).toBe(Object.keys(draft.titles).length);
    expect(draft.fieldReviewedCount).toBe(draft.fieldReviewed.length);
    expect(new Set(draft.fieldReviewed)).toEqual(new Set(Object.keys(draft.fields)));
    for (const key of draft.fieldReviewed) expect(draft.fields[key]?.trim()).toBeTruthy();
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
    expect(draft.uiReviewedCount).toBe(Object.keys(draft.ui).length);
    expect(draft.chromeReviewedCount).toBe(Object.keys(draft.chrome).length);
    expect(draft.editorReviewedCount).toBe(Object.keys(draft.editor).length);
    expect(draft.interfaceReviewedCount).toBe(Object.keys(draft.interface).length);
    expect(draft.categoriesReviewedCount).toBe(Object.keys(draft.categories).length);
    expect(draft.ui.adHidden).toBe("");
    for (const [key, value] of Object.entries(draft.ui)) {
      if (key !== "adHidden") expect(value.trim()).not.toBe(ui.en[key]);
    }
    expect((draft.chrome.types as string[])).toHaveLength(chromeText.en.types.length);
    for (const [key, value] of Object.entries(draft.editor)) expect(value.trim()).not.toBe(enEditor[key]);
    expect(draft.reviewStatus).toBe("translation review complete; unpublished pending runtime verification");
  });

  it("contains generated document, guide, FAQ, category, and section copy", () => {
    const copy = draft.documentContent.copy as Record<string, string>;
    const specific = draft.documentContent.specific as Record<string, string>;
    sameKeys(copy, {
      intro: "", purpose: "", audience: "", structure: "", steps: "", tips: "", source: "", caution: "",
      more: "", tableNote: "", faq1: "", faq2: "", faqA1: "", faqA2: "", library: "", libraryUse: "", category: "",
    });
    sameKeys(specific, { form: "", checklist: "", planner: "", audience: "", stepFocus: "", tipFocus: "", faqFields: "", faqFieldsAnswer: "" });
    expect(Object.keys(draft.documentContent)).toEqual(["copy", "specific", "purposeFocus", "sectionLabels", "recent"]);
    expect(draft.contentDrafted).toBe(leafCount(draft.documentContent));
    expect(draft.documentContentReviewedCount).toBe(draft.contentDrafted);
    const intro = copy.intro;
    expect(placeholders(intro)).toEqual(["{category}", "{title}"].sort());
  });

  it("contains no damaged Unicode or translation markup", () => {
    for (const value of stringsIn(draft)) {
      expect(value).not.toMatch(/\?{2,}/);
      expect(value).not.toMatch(/<(?:g|bx|ex)\b/i);
    }
  });
});
