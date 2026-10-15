import { describe, expect, it } from "vitest";
import { categories, categoryNames, documents, localizeField, localizedDescription, localizedDocumentTitle, localeLabels, locales, ui } from "../src/lib/registry";
import documentTranslationsJson from "../src/lib/document-translations.json";
import { renderDocumentText, validateDocument } from "../src/lib/engine";
import { GET } from "../src/app/sitemap.xml/route";
import { getDocumentMetadata } from "../src/lib/seo";
import { docsPath, docsPathForLocale, docsUrl, familyServiceUrl, portalPath } from "../src/lib/urls";

describe("document registry", () => {
  it("contains the complete requested feature set and categories", () => {
    expect(documents).toHaveLength(119);
    expect(new Set(documents.map((doc) => doc.category))).toEqual(new Set(categories));
    expect(new Set(documents.map((doc) => doc.slug)).size).toBe(documents.length);
  });
  it("declares locale labels and supported document locales", () => {
    expect(locales).toHaveLength(15);
    for (const locale of locales) {
      expect(ui[locale].brand).toBeTruthy();
      expect(ui[locale].browser).toBeTruthy();
      expect(ui[locale].copy).toBeTruthy();
      expect(ui[locale].print).toBeTruthy();
      expect(ui[locale].download).toBeTruthy();
      expect(documents.every((doc) => doc.supportedLocales.includes(locale))).toBe(true);
    }
  });
  it("uses a display label for every supported locale", () => {
    expect(locales.map((locale) => localeLabels[locale])).toEqual([
      "한국어", "English", "日本語", "简体中文", "Español", "Português (Brasil)", "Deutsch", "Français", "Tiếng Việt", "Bahasa Indonesia", "ไทย", "繁體中文", "Italiano", "Nederlands", "हिन्दी",
    ]);
  });
  it("keeps document titles, descriptions, fields, and categories complete in every locale", () => {
    for (const locale of locales) {
      const translations = documentTranslationsJson[locale] as { titles: Record<string, string>; fields: Record<string, string>; interface: Record<string, string> };
      for (const category of categories) expect(categoryNames[locale][category].trim()).toBeTruthy();
      expect(Object.keys(translations.titles)).toHaveLength(documents.length);
      expect(Object.keys(translations.fields).length).toBeGreaterThan(0);
      expect(Object.values(translations.interface)).toHaveLength(9);
      for (const doc of documents) {
        expect(translations.titles[doc.slug]?.trim()).toBeTruthy();
        expect(localizedDocumentTitle(doc, locale).trim()).toBeTruthy();
        expect(localizedDescription(doc, locale).trim()).toBeTruthy();
        expect(localizedDescription(doc, locale)).not.toMatch(/\{[^}]+\}/);
        expect(localizedDescription(doc, locale)).not.toBe(doc.description);
        if (locale !== "ko" && locale !== "en") expect(localizedDocumentTitle(doc, locale)).not.toBe(doc.title);
        for (const field of doc.fields) {
          expect(translations.fields[field.label]?.trim()).toBeTruthy();
          expect(localizeField(field.label, locale).trim()).toBeTruthy();
        }
      }
    }
  });
  it("rejects damaged or raw-key strings in locale-facing registry data", () => {
    const values = [
      ...Object.values(localeLabels),
      ...Object.values(documentTranslationsJson).flatMap((entry) => [
        ...Object.values(entry.titles), ...Object.values(entry.fields), ...Object.values(entry.interface),
      ]),
      ...locales.flatMap((locale) => [
        ...Object.values(categoryNames[locale]),
        ...Object.entries(ui[locale]).filter(([key]) => key !== "adHidden").map(([, value]) => value),
        ...documents.flatMap((doc) => [localizedDocumentTitle(doc, locale), localizedDescription(doc, locale), ...doc.fields.map((field) => localizeField(field.label, locale))]),
      ]),
    ];
    for (const value of values) {
      expect(value.trim()).toBeTruthy();
      expect(value).not.toContain("\uFFFD");
      expect(value).not.toMatch(/(?:Ã.|Â.|â€|ï¿½)/);
      expect(value).not.toMatch(/&(?:amp|lt|gt|quot|#\d+);/);
      expect(value).not.toMatch(/^[a-z][\w-]*(?:\.[a-z][\w-]*)+$/i);
    }
  });
  it("requires core fields and renders a live preview as text", () => {
    const doc = documents[0];
    expect(validateDocument(doc, {})).toEqual(doc.fields.filter((field) => field.required).map((field) => field.id));
    expect(validateDocument(doc, { [doc.fields[0].id]: "Ada", [doc.fields[1].id]: "ada@example.com" })).toEqual([]);
    expect(renderDocumentText(doc, { [doc.fields[0].id]: "Ada" }, "en")).toContain("Ada");
  });
  it("keeps user content out of URLs and marks every document browser-only", () => {
    expect(documents.every((doc) => doc.browserOnly && !doc.slug.includes("?") && doc.isPublic)).toBe(true);
  });
  it("generates sitemap entries from registry and locale data", async () => {
    const response = GET(); const xml = await response.text();
    const sitemapUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    const publicDocuments = documents.filter((doc) => doc.isPublic);
    const expectedCount = locales.length + publicDocuments.reduce((count, doc) => count + doc.supportedLocales.length, 0);
    expect(response.headers.get("Content-Type")).toContain("application/xml");
    expect(sitemapUrls).toHaveLength(expectedCount);
    expect(new Set(sitemapUrls).size).toBe(sitemapUrls.length);
    expect(sitemapUrls.every((url) => /^https:\/\/www\.woori\.today\/(?:ko|en|ja|zh|es|pt-br|de|fr|vi|id|th|zh-tw|it|nl|hi)\/docs(?:\/[^/]+)?$/.test(url))).toBe(true);
    expect(sitemapUrls).toContain("https://www.woori.today/ko/docs");
    expect(xml).toContain("https://www.woori.today/ko/docs/resume-template");
    expect(xml).toContain("https://www.woori.today/pt-br/docs");
    expect(xml).toContain("https://www.woori.today/zh-tw/docs");
    expect(xml).not.toMatch(/https:\/\/www\.woori\.today\/(?:docs|quiz)\/(?:ko|en)(?:\/|<)/);
    expect(xml).not.toMatch(/localhost|127\.0\.0\.1|woori-docs(?::|\/)/i);
    expect(sitemapUrls.filter((url) => url.startsWith("https://www.woori.today/")).length).toBe(sitemapUrls.length);
    expect(sitemapUrls.length).toBe(locales.length + publicDocuments.length * locales.length);
    expect(publicDocuments).toHaveLength(119);
  });
  it("generates canonical, hreflang, x-default, title, and description metadata", async () => {
    const metadata = getDocumentMetadata("ko", "resume-template");
    expect(metadata.title).toBe("이력서 양식");
    expect(metadata.description).toBeTruthy();
    expect(metadata.alternates?.canonical).toBe("/ko/docs/resume-template");
    expect(metadata.alternates?.languages?.ko).toBe("/ko/docs/resume-template");
    expect(metadata.alternates?.languages?.en).toBe("/en/docs/resume-template");
    expect(metadata.alternates?.languages?.["pt-BR"]).toBe("/pt-br/docs/resume-template");
    expect(metadata.alternates?.languages?.["zh-TW"]).toBe("/zh-tw/docs/resume-template");
    expect(metadata.alternates?.languages?.["x-default"]).toBe("/en/docs/resume-template");
    expect(Object.keys(metadata.alternates?.languages ?? {})).toHaveLength(locales.length + 1);
    expect(new Set(Object.values(metadata.alternates?.languages ?? {})).size).toBe(locales.length);
    expect(metadata.openGraph?.url).toBe("/ko/docs/resume-template");
    expect(getDocumentMetadata("ja", "resume-template").title).toBe(documents[0].title);
  });
  it("builds locale-first public paths and 1800 IndexNow URLs", async () => {
    expect(docsPath("ko")).toBe("/ko/docs");
    expect(docsPath("en", "resume-template")).toBe("/en/docs/resume-template");
    expect(docsUrl("zh-tw")).toBe("https://www.woori.today/zh-tw/docs");
    expect(portalPath("ko")).toBe("/ko");
    expect(portalPath("en")).toBe("/en");
    expect(familyServiceUrl("pt-br", "quiz")).toBe("https://www.woori.today/pt-br/quiz");
    expect(docsPathForLocale("/ko/docs/resume-template", "en")).toBe("/en/docs/resume-template");
    const { createIndexNowUrls } = await import("../scripts/submit-indexnow.mjs");
    const urls = createIndexNowUrls();
    expect(urls).toHaveLength(locales.length + documents.filter((doc) => doc.isPublic).reduce((count, doc) => count + doc.supportedLocales.length, 0));
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toContain("https://www.woori.today/ko/docs");
    expect(urls).toContain("https://www.woori.today/pt-br/docs/resume-template");
    expect(urls.every((url: string) => /^https:\/\/www\.woori\.today\/(?:ko|en|ja|zh|es|pt-br|de|fr|vi|id|th|zh-tw|it|nl|hi)\/docs(?:\/[^/]+)?$/.test(url))).toBe(true);
    const response = GET(); const sitemapXml = await response.text();
    const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    expect(new Set(urls)).toEqual(new Set(sitemapUrls));
  });
  it("keeps the catalog synchronized", async () => {
    const { readFile } = await import("node:fs/promises");
    const catalog = await readFile("docs/service-catalog.md", "utf8");
    for (const doc of documents) expect(catalog).toContain(`/${doc.slug}`);
    expect(catalog.match(/^\| \d+ \|/gm)).toHaveLength(documents.length);
  });
});
