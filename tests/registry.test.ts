import { describe, expect, it } from "vitest";
import { categories, documents, locales, ui } from "../src/lib/registry";
import { renderDocumentText, validateDocument } from "../src/lib/engine";
import { GET } from "../src/app/sitemap.xml/route";
import { getDocumentMetadata } from "../src/lib/seo";
import { docsPath, docsPathForLocale, docsUrl, familyServiceUrl, portalPath } from "../src/lib/urls";

describe("document registry", () => {
  it("contains the complete requested feature set and categories", () => {
    expect(documents).toHaveLength(56);
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
  it("requires core fields and renders a live preview as text", () => {
    const doc = documents[0];
    expect(validateDocument(doc, {})).toEqual(doc.fields.slice(0, 2));
    expect(validateDocument(doc, { [doc.fields[0]]: "Ada", [doc.fields[1]]: "ada@example.com" })).toEqual([]);
    expect(renderDocumentText(doc, { [doc.fields[0]]: "Ada" }, "en")).toContain("Ada");
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
    expect(publicDocuments).toHaveLength(56);
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
  });
  it("builds locale-first public paths and 855 IndexNow URLs", async () => {
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
