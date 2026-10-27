import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AdSlot } from "../src/components/ad-slot";
import { DocumentDetailCards } from "../src/components/document-detail-cards";
import { detailHeadings } from "../src/lib/document-detail-copy";
import { buildDocumentContent } from "../src/lib/document-content";
import { categoryNames, documents, getRelated, localizedDescription, localizedDocumentTitle, localizeField, locales } from "../src/lib/registry";

describe("document page content quality", () => {
  it("provides unique, localized descriptions and complete editorial sections for every public document", () => {
    const publicDocs = documents.filter((doc) => doc.isPublic);
    expect(publicDocs).toHaveLength(119);
    for (const locale of locales) {
      const descriptions = publicDocs.map((doc) => localizedDescription(doc, locale));
      expect(new Set(descriptions).size).toBe(descriptions.length);
      const purposes = publicDocs.map((doc) => {
        const fields = doc.fields.map((field) => localizeField(field.label, locale));
        return buildDocumentContent(locale, localizedDocumentTitle(doc, locale), categoryNames[locale][doc.category], fields, doc.kind, Boolean(doc.tables?.length), doc.policyReviewRequired).purpose;
      });
      expect(new Set(purposes).size).toBe(purposes.length);
      const examples = publicDocs.map((doc) => {
        const fields = doc.fields.map((field) => localizeField(field.label, locale));
        return buildDocumentContent(locale, localizedDocumentTitle(doc, locale), categoryNames[locale][doc.category], fields, doc.kind, Boolean(doc.tables?.length), doc.policyReviewRequired).example;
      });
      expect(new Set(examples).size).toBe(examples.length);
      for (const doc of publicDocs) {
        const title = localizedDocumentTitle(doc, locale);
        const fields = doc.fields.map((field) => localizeField(field.label, locale));
        const content = buildDocumentContent(locale, title, categoryNames[locale][doc.category], fields, doc.kind, Boolean(doc.tables?.length), doc.policyReviewRequired);
        expect(content.description).toBe(localizedDescription(doc, locale));
        expect(Object.values(content.headings).every((heading) => heading.trim().length > 0)).toBe(true);
        for (const value of [content.intro, content.purpose, content.audience, content.structure, content.steps, content.tips, content.source, content.caution, content.example, content.input, content.output, content.limitations, content.troubleshooting, ...content.faq.flatMap((item) => [item.question, item.answer])]) {
          expect(value.trim()).toBeTruthy();
          expect(value).not.toContain("\uFFFD");
          expect(value).not.toMatch(/\{\w+\}|^[a-z][\w-]*(?:\.[a-z][\w-]*)+$/i);
        }
        expect(content.structure).toContain(fields[0]);
        expect(content.steps).toContain(fields[0]);
        expect(content.tips).toContain(fields[0]);
        expect(content.faq[2].answer).toContain(fields[0]);
        expect(content.purpose).toContain(title);
        expect(content.example).toContain(title);
        expect(content.input).toContain(fields[0]);
        expect(detailHeadings[locale].faq.trim()).toBeTruthy();
      }
    }
  });

  it("renders the complete informational cards in initial HTML without collapsed FAQ controls", () => {
    const doc = documents.find((item) => item.isPublic && item.slug === "meeting-minutes-generator");
    if (!doc) throw new Error("Representative public document is missing");
    const locale = "en";
    const fields = doc.fields.map((field) => localizeField(field.label, locale));
    const content = buildDocumentContent(locale, localizedDocumentTitle(doc, locale), categoryNames[locale][doc.category], fields, doc.kind, Boolean(doc.tables?.length), doc.policyReviewRequired);
    const html = renderToStaticMarkup(createElement(DocumentDetailCards, { content, locale }));
    expect(html).toContain("Practical example");
    expect(html).toContain("Troubleshooting");
    expect(html).toContain("Frequently asked questions");
    expect(html).toContain("Meeting minutes generator");
    expect(html).not.toContain("<details");
    expect(html).not.toContain("hidden");
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
