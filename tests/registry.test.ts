import { describe, expect, it } from "vitest";
import { categories, documents, locales, ui } from "../src/lib/registry";
import { renderDocumentText, validateDocument } from "../src/lib/engine";
import { GET } from "../src/app/docs-sitemap.xml/route";
import { getDocumentMetadata } from "../src/lib/seo";

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
    expect(response.headers.get("Content-Type")).toContain("application/xml");
    expect((xml.match(/<url>/g) ?? []).length).toBe(documents.length * locales.length + locales.length);
    expect(xml).toContain("/docs/ko/resume-template");
  });
  it("generates canonical, hreflang, x-default, title, and description metadata", async () => {
    const metadata = getDocumentMetadata("ko", "resume-template");
    expect(metadata.title).toBe("이력서 양식");
    expect(metadata.description).toBeTruthy();
    expect(metadata.alternates?.canonical).toBe("/docs/ko/resume-template");
    expect(metadata.alternates?.languages?.["x-default"]).toBe("/docs/en/resume-template");
  });
  it("keeps the catalog synchronized", async () => {
    const { readFile } = await import("node:fs/promises");
    const catalog = await readFile("docs/service-catalog.md", "utf8");
    for (const doc of documents) expect(catalog).toContain(`/${doc.slug}`);
    expect(catalog.match(/^\| \d+ \|/gm)).toHaveLength(documents.length);
  });
});
