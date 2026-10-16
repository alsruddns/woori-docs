import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AdSlot } from "../src/components/ad-slot";
import { buildDocumentContent } from "../src/lib/document-content";
import { categoryNames, documents, getRelated, localizedDescription, localizedDocumentTitle, localizeField, locales } from "../src/lib/registry";

describe("document page content quality", () => {
  it("provides unique, localized descriptions and complete editorial sections for every public document", () => {
    const publicDocs = documents.filter((doc) => doc.isPublic);
    expect(publicDocs).toHaveLength(119);
    for (const locale of locales) {
      const descriptions = publicDocs.map((doc) => localizedDescription(doc, locale));
      expect(new Set(descriptions).size).toBe(descriptions.length);
      for (const doc of publicDocs) {
        const title = localizedDocumentTitle(doc, locale);
        const fields = doc.fields.map((field) => localizeField(field.label, locale));
        const content = buildDocumentContent(locale, title, categoryNames[locale][doc.category], fields, doc.kind, Boolean(doc.tables?.length), doc.policyReviewRequired);
        expect(content.description).toBe(localizedDescription(doc, locale));
        for (const value of [content.intro, content.purpose, content.audience, content.structure, content.steps, content.tips, content.source, content.caution, ...content.faq.flatMap((item) => [item.question, item.answer])]) {
          expect(value.trim()).toBeTruthy();
          expect(value).not.toContain("\uFFFD");
          expect(value).not.toMatch(/\{\w+\}|^[a-z][\w-]*(?:\.[a-z][\w-]*)+$/i);
        }
        expect(content.structure).toContain(fields[0]);
      }
    }
  });

  it("keeps related links valid and only includes documents with shared subject matter", () => {
    for (const doc of documents) {
      const related = getRelated(doc);
      expect(related.some((item) => item.slug === doc.slug)).toBe(false);
      expect(related.every((item) => documents.some((known) => known.slug === item.slug))).toBe(true);
    }
  });

  it("keeps the text download and browser print formats available without an empty ad slot", () => {
    expect(documents.every((doc) => doc.supportedFormats.includes("text") && doc.supportedFormats.includes("pdf"))).toBe(true);
    const previous = process.env.NEXT_PUBLIC_ADS_ENABLED;
    delete process.env.NEXT_PUBLIC_ADS_ENABLED;
    expect(renderToStaticMarkup(createElement(AdSlot))).toBe("");
    if (previous !== undefined) process.env.NEXT_PUBLIC_ADS_ENABLED = previous;
  });
});
