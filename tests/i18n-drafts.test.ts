import { readFileSync } from "node:fs";
import { rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
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
  reviewedCounts: Record<string, number>;
};
const targetLocales = ["tr", "pl", "fil", "bn", "uk", "ms", "sv", "cs", "ro", "el"] as const;
const englishSourcePath = join(tmpdir(), `woori-docs-i18n-en-${process.pid}.json`);
execFileSync(process.execPath, ["scripts/prepare-i18n-source.mjs", englishSourcePath], { stdio: "ignore" });
const englishDocumentContent = JSON.parse(readFileSync(englishSourcePath, "utf8")).documentContent as Record<string, unknown>;
rmSync(englishSourcePath, { force: true });
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
  it("tracks all 699 reviewed Turkish units before runtime publication", () => {
    sameKeys(trDraft.fields, documentTranslations.en.fields);
    expect(trDraft.fieldsTranslated).toBe(Object.keys(trDraft.fields).length);
    expect(trDraft.failures).toHaveLength(0);
    expect(trDraft.reviewStatus).toContain("unpublished");
    expect(trDraft.reviewedCounts).toMatchObject({ titles: 119, interface: 9, categories: 14, ui: 47, chrome: 18, editor: 33 });
    expect(trDraft.reviewedCounts.fields).toBe(425);
    expect(trDraft.reviewedCounts.documentContent).toBe(34);
    expect(Object.values(trDraft.reviewedCounts).reduce((sum, value) => sum + value, 0)).toBe(699);
    expect(trDraft.reviewStatus).toContain("runtime verification required");
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

  it("covers all 699 translation keys across the ten unpublished locale drafts", () => {
    const compareTree = (actual: unknown, expected: unknown, path: string) => {
      if (Array.isArray(expected)) {
        expect(actual, path).toBeInstanceOf(Array);
        expect(actual).toHaveLength(expected.length);
        expected.forEach((value, index) => compareTree((actual as unknown[])[index], value, `${path}[${index}]`));
      } else if (expected && typeof expected === "object") {
        expect(actual, path).toBeTruthy();
        sameKeys(actual as Record<string, unknown>, expected as Record<string, unknown>);
        for (const [key, value] of Object.entries(expected)) compareTree((actual as Record<string, unknown>)[key], value, `${path}.${key}`);
      } else if (typeof expected === "string") {
        expect(typeof actual, path).toBe("string");
        const value = actual as string;
        if (expected.trim()) {
          expect(value.trim(), path).toBeTruthy();
          expect(value.trim(), path).not.toBe(expected.trim());
        } else expect(value, path).toBe("");
        expect(placeholders(value), path).toEqual(placeholders(expected));
        expect(value, path).not.toMatch(/\?{2,}|<(?:\/?(?:g|bx|ex))\b|<\s*x\d+\s*>/i);
        expect(value, path).not.toMatch(/(^|[^\p{L}\p{N}])([\p{L}\p{N}]+)(?:\s+\2){2,}(?=$|[^\p{L}\p{N}])/iu);
      }
    };
    const expected = {
      titles: documentTranslations.en.titles,
      fields: documentTranslations.en.fields,
      interface: documentTranslations.en.interface,
      categories: categories.en,
      ui: ui.en,
      chrome: chromeText.en,
      editor: enEditor,
      documentContent: englishDocumentContent,
    };
    for (const locale of targetLocales) {
      const target = JSON.parse(readFileSync(`docs/i18n-drafts/${locale}.json`, "utf8")) as Record<string, unknown>;
      for (const [section, source] of Object.entries(expected)) compareTree(target[section], source, `${locale}.${section}`);
      expect(String(target.reviewStatus)).toContain("unpublished");
      if (locale === "tr") expect(String(target.reviewStatus)).toContain("runtime verification required");
      else expect(String(target.reviewStatus)).toContain("editorial review required");
    }
  });

  it("preserves all Russian document-content interpolation tokens", () => {
    const comparePlaceholders = (actual: unknown, expected: unknown) => {
      if (Array.isArray(expected)) expected.forEach((value, index) => comparePlaceholders((actual as unknown[])[index], value));
      else if (expected && typeof expected === "object") {
        for (const [key, value] of Object.entries(expected)) comparePlaceholders((actual as Record<string, unknown>)[key], value);
      } else if (typeof expected === "string") expect(placeholders(String(actual))).toEqual(placeholders(expected));
    };
    comparePlaceholders(draft.documentContent, englishDocumentContent);
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
      expect(value).not.toMatch(/<(?:g|bx|ex)\b|<\s*x\d+\s*>/i);
    }
  });
});
