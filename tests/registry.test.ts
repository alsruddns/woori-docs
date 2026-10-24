import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { categories, categoryNames, documents, isPublicLocale, isTargetLocale, localizeField, localizedDescription, localizedDocumentTitle, localeLabels, localePublicationState, locales, targetLocales, ui } from "../src/lib/registry";
import documentTranslationsJson from "../src/lib/document-translations.json";
import editorTranslationsJson from "../src/lib/editor-translations.json";
import { renderDocumentText, validateDocument } from "../src/lib/engine";
import { GET } from "../src/app/sitemap.xml/route";
import { getDocumentMetadata } from "../src/lib/seo";
import { docsPath, docsPathForLocale, docsUrl, familyServiceUrl, localeLanguageTags, portalPath } from "../src/lib/urls";
import { getLocalePayload } from "../src/lib/locale-payload";
import { buildDocumentContent, buildLibraryContent } from "../src/lib/document-content";

describe("document registry", () => {
  it("contains the complete requested feature set and categories", () => {
    expect(documents).toHaveLength(119);
    expect(new Set(documents.map((doc) => doc.category))).toEqual(new Set(categories));
    expect(new Set(documents.map((doc) => doc.slug)).size).toBe(documents.length);
  });
  it("declares locale labels and supported document locales", () => {
    expect(locales).toHaveLength(22);
    for (const locale of locales) {
      expect(ui[locale].brand).toBeTruthy();
      expect(ui[locale].browser).toBeTruthy();
      expect(ui[locale].search).toBeTruthy();
      expect(ui[locale].download).toBeTruthy();
      expect(ui[locale].print).toBeTruthy();
      expect(ui[locale].copy).toBeTruthy();
      expect(ui[locale].copied).toBeTruthy();
      expect(ui[locale].empty).toBeTruthy();
      expect(documents.every((doc) => doc.supportedLocales.includes(locale))).toBe(true);
    }
  });
  it("separates the 26-locale expansion scope from the 22 published locales", () => {
    const additions = ["ru", "tr", "pl", "fil", "bn", "uk", "ms", "sv", "cs", "ro", "el"] as const;
    expect(targetLocales).toHaveLength(26);
    expect(locales).toHaveLength(22);
    expect(additions.every((locale) => isTargetLocale(locale))).toBe(true);
    expect(isPublicLocale("ru")).toBe(true);
    expect(isPublicLocale("tr")).toBe(true);
    expect(isPublicLocale("pl")).toBe(true);
    expect(isPublicLocale("fil")).toBe(true);
    expect(isPublicLocale("bn")).toBe(true);
    expect(isPublicLocale("uk")).toBe(true);
    expect(isPublicLocale("ms")).toBe(true);
    expect(localePublicationState("ru")).toBe("published");
    expect(localePublicationState("tr")).toBe("published");
    expect(localePublicationState("pl")).toBe("published");
    expect(localePublicationState("fil")).toBe("published");
    expect(localePublicationState("bn")).toBe("published");
    expect(localePublicationState("uk")).toBe("published");
    expect(localePublicationState("ms")).toBe("published");
    expect(additions.slice(7).every((locale) => !isPublicLocale(locale) && localePublicationState(locale) === "pending")).toBe(true);
    expect(["ar", "ur", "fa", "he"].every((locale) => !isTargetLocale(locale))).toBe(true);
  });
  it("passes one selected locale's dictionaries to client components", () => {
    const payload = getLocalePayload("fr");
    expect(payload.uiText.search).toBe(ui.fr.search);
    expect(payload.categoryLabels).toEqual(categoryNames.fr);
    expect(payload.languages).toHaveLength(locales.length);
    for (const file of ["src/components/document-workspace.tsx", "src/components/custom-form-hub.tsx", "src/components/site-chrome.tsx"]) {
      const source = readFileSync(file, "utf8");
      expect(source).not.toMatch(/from\s+["'][^"']*(?:chrome-i18n|category-translations|editor-translations)\.json["']/);
      expect(source).not.toMatch(/import\s+\{[^}]*\b(?:ui|localeLabels|locales)\b[^}]*\}\s+from\s+["'][^"']*chrome-i18n["']/);
    }
  });
  it("uses a display label for every supported locale", () => {
    expect(locales.map((locale) => localeLabels[locale])).toHaveLength(locales.length);
    expect(localeLabels.ru).toBe("Русский");
    expect(localeLabels.tr).toBe("Türkçe");
    expect(localeLabels.pl).toBe("Polski");
    expect(localeLabels.fil).toBe("Filipino");
    expect(localeLabels.bn).toBe("বাংলা");
  });
  it("renders Turkish documents, active-locale payload, and SEO alternates", () => {
    const document = documents.find((item) => item.slug === "resume-template")!;
    const metadata = getDocumentMetadata("tr", document.slug);
    expect(docsPath("tr", document.slug)).toBe(`/tr/docs/${document.slug}`);
    expect(metadata.alternates?.canonical).toBe(`/tr/docs/${document.slug}`);
    expect(metadata.alternates?.languages?.tr).toBe(`/tr/docs/${document.slug}`);
    expect(String(metadata.title)).toContain("Özgeçmiş şablonu");
    expect(localeLanguageTags.tr).toBe("tr");
    expect(docsPathForLocale("/ru/docs/resume-template", "tr")).toBe("/tr/docs/resume-template");
    expect(localizeField("Profile summary", "tr")).toBe("Profil özeti");
    expect(buildDocumentContent("tr", "Özgeçmiş şablonu", "Kariyer", ["Ad", "E-posta"], "form", false, false).description).toContain("düzenlenebilir bir şablondur");
    expect(buildLibraryContent("tr", "Şirket ve çalışma").recent).toBe("Yeni eklenen şablonlar");
    const payload = getLocalePayload("tr");
    expect(payload.uiText.search).toBe(ui.tr.search);
    expect(payload.editorTranslations).toEqual(editorTranslationsJson.tr);
    expect(payload.languages).toHaveLength(locales.length);
    expect(payload).not.toHaveProperty("ui.ru");
  });
  it("renders Polish documents, active-locale payload, and SEO alternates", () => {
    const document = documents.find((item) => item.slug === "resume-template")!;
    const metadata = getDocumentMetadata("pl", document.slug);
    expect(docsPath("pl", document.slug)).toBe(`/pl/docs/${document.slug}`);
    expect(metadata.alternates?.canonical).toBe(`/pl/docs/${document.slug}`);
    expect(metadata.alternates?.languages?.pl).toBe(`/pl/docs/${document.slug}`);
    expect(String(metadata.title)).toContain("Wzór CV");
    expect(localeLanguageTags.pl).toBe("pl");
    expect(docsPathForLocale("/tr/docs/resume-template", "pl")).toBe("/pl/docs/resume-template");
    expect(localizeField("Profile summary", "pl")).toBe("Podsumowanie profilu");
    expect(buildDocumentContent("pl", "Wzór CV", "Firma i praca", ["Imię i nazwisko", "E-mail"], "form", false, false).description).toContain("edytowalny szablon");
    expect(buildLibraryContent("pl", "Finanse i księgowość").recent).toBe("Ostatnio dodane szablony");
    const payload = getLocalePayload("pl");
    expect(payload.uiText.search).toBe(ui.pl.search);
    expect(payload.editorTranslations).toEqual(editorTranslationsJson.pl);
    expect(payload.languages).toHaveLength(locales.length);
    expect(payload).not.toHaveProperty("ui.fil");
  });
  it("renders Filipino documents, active-locale payload, and SEO alternates", () => {
    const document = documents.find((item) => item.slug === "resume-template")!;
    const metadata = getDocumentMetadata("fil", document.slug);
    expect(docsPath("fil", document.slug)).toBe(`/fil/docs/${document.slug}`);
    expect(metadata.alternates?.canonical).toBe(`/fil/docs/${document.slug}`);
    expect((metadata.alternates?.languages as Record<string, string> | undefined)?.fil).toBe(`/fil/docs/${document.slug}`);
    expect(String(metadata.title)).toContain("Template ng Resume");
    expect(localeLanguageTags.fil).toBe("fil");
    expect(docsPathForLocale("/pl/docs/resume-template", "fil")).toBe("/fil/docs/resume-template");
    expect(localizeField("Profile summary", "fil")).toBe("Buod ng profile");
    expect(buildDocumentContent("fil", "Template ng Resume", "Negosyo at trabaho", ["Pangalan", "Email address"], "form", false, false).description).toContain("editable na template");
    expect(buildLibraryContent("fil", "Pananalapi at accounting").recent).toBe("Mga bagong idinagdag na template");
    const payload = getLocalePayload("fil");
    expect(payload.uiText.search).toBe(ui.fil.search);
    expect(payload.editorTranslations).toEqual(editorTranslationsJson.fil);
    expect(payload.languages).toHaveLength(locales.length);
    expect(payload).not.toHaveProperty("ui.bn");
  });
  it("renders Bengali documents, active-locale payload, and SEO alternates", () => {
    const document = documents.find((item) => item.slug === "resume-template")!;
    const metadata = getDocumentMetadata("bn", document.slug);
    expect(docsPath("bn", document.slug)).toBe(`/bn/docs/${document.slug}`);
    expect(metadata.alternates?.canonical).toBe(`/bn/docs/${document.slug}`);
    expect((metadata.alternates?.languages as Record<string, string> | undefined)?.bn).toBe(`/bn/docs/${document.slug}`);
    expect(String(metadata.title)).toContain("CV তৈরির টেমপ্লেট");
    expect(localeLanguageTags.bn).toBe("bn");
    expect(docsPathForLocale("/fil/docs/resume-template", "bn")).toBe("/bn/docs/resume-template");
    expect(localizeField("Profile summary", "bn")).toBe("প্রোফাইলের সারাংশ");
    expect(buildDocumentContent("bn", "CV তৈরির টেমপ্লেট", "ব্যবসা ও কাজ", ["নাম", "ইমেইল ঠিকানা"], "form", false, false).description).toContain("সম্পাদনাযোগ্য টেমপ্লেট");
    expect(buildLibraryContent("bn", "অর্থ ও হিসাবরক্ষণ").recent).toBe("নতুন যোগ করা টেমপ্লেট");
    const payload = getLocalePayload("bn");
    expect(payload.uiText.search).toBe(ui.bn.search);
    expect(payload.editorTranslations).toEqual(editorTranslationsJson.bn);
    expect(payload.languages).toHaveLength(locales.length);
    expect(payload).not.toHaveProperty("ui.uk");
  });
  it("renders Ukrainian documents and exposes Ukrainian SEO alternates", () => {
    const document = documents.find((item) => item.slug === "resume-template")!;
    const metadata = getDocumentMetadata("uk", document.slug);
    expect(docsPath("uk", document.slug)).toBe(`/uk/docs/${document.slug}`);
    expect(metadata.alternates?.canonical).toBe(`/uk/docs/${document.slug}`);
    expect(metadata.alternates?.languages?.uk).toBe(`/uk/docs/${document.slug}`);
    expect(String(metadata.title)).toContain("Шаблон резюме");
    expect(localeLabels.uk).toBe("Українська");
    expect(localeLanguageTags.uk).toBe("uk");
    expect(docsPathForLocale("/bn/docs/resume-template", "uk")).toBe("/uk/docs/resume-template");
    expect(localizeField("Email", "uk")).toBe("Електронна пошта");
    expect(buildDocumentContent("uk", "Шаблон резюме", "Кадри й адміністрування", ["Ім’я", "Електронна пошта"], "form", false, false).description).toContain("редагований шаблон");
    const payload = getLocalePayload("uk");
    expect(payload.uiText.search).toBe(ui.uk.search);
    expect(payload.editorTranslations).toEqual(editorTranslationsJson.uk);
    expect(payload.languages).toHaveLength(locales.length);
    expect(payload).not.toHaveProperty("ui.bn");
  });
  it("renders Malay documents and exposes Malay SEO alternates", () => {
    const document = documents.find((item) => item.slug === "resume-template")!;
    const metadata = getDocumentMetadata("ms", document.slug);
    expect(docsPath("ms", document.slug)).toBe(`/ms/docs/${document.slug}`);
    expect(metadata.alternates?.canonical).toBe(`/ms/docs/${document.slug}`);
    expect(metadata.alternates?.languages?.ms).toBe(`/ms/docs/${document.slug}`);
    expect(String(metadata.title)).toContain("Templat Resume");
    expect(localeLabels.ms).toBe("Bahasa Melayu");
    expect(localeLanguageTags.ms).toBe("ms");
    expect(docsPathForLocale("/uk/docs/resume-template", "ms")).toBe("/ms/docs/resume-template");
    expect(localizeField("Email", "ms")).toBe("E-mel");
    expect(buildDocumentContent("ms", "Templat Resume", "Sumber manusia dan pentadbiran", ["Nama", "E-mel"], "form", false, false).description).toContain("templat yang boleh disunting");
    const payload = getLocalePayload("ms");
    expect(payload.uiText.search).toBe(ui.ms.search);
    expect(payload.editorTranslations).toEqual(editorTranslationsJson.ms);
    expect(payload.languages).toHaveLength(locales.length);
    expect(payload).not.toHaveProperty("ui.uk");
  });
  it("renders Russian documents and exposes Russian SEO alternates", () => {
    const document = documents.find((item) => item.isPublic)!;
    const metadata = getDocumentMetadata("ru", document.slug);
    expect(docsPath("ru", document.slug)).toBe(`/ru/docs/${document.slug}`);
    expect(metadata.alternates?.canonical).toBe(`/ru/docs/${document.slug}`);
    expect(metadata.alternates?.languages?.ru).toBe(`/ru/docs/${document.slug}`);
    expect(String(metadata.title)).not.toContain(document.title);
    const content = buildDocumentContent("ru", "Заявление на расходы", "Финансы", document.fields.map((field) => field.label), "form", true, false);
    expect(content.description).toContain("редактируемый шаблон");
    expect(content.faq[0].question).toBe("Где сохраняются мои данные?");
    expect(content.structure).toContain("повторяющихся записей");
    expect(buildLibraryContent("ru", "Финансы").recent).toBe("Недавно добавленные шаблоны");
    expect(getLocalePayload("ru").uiText.search).toBe(ui.ru.search);
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
  }, 15000);
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
    expect(sitemapUrls.filter((url) => url.startsWith("https://www.woori.today/ru/docs")).length).toBe(120);
    expect(sitemapUrls.filter((url) => url.startsWith("https://www.woori.today/tr/docs")).length).toBe(120);
    expect(sitemapUrls.filter((url) => url.startsWith("https://www.woori.today/pl/docs")).length).toBe(120);
    expect(sitemapUrls.filter((url) => url.startsWith("https://www.woori.today/fil/docs")).length).toBe(120);
    expect(sitemapUrls.filter((url) => url.startsWith("https://www.woori.today/bn/docs")).length).toBe(120);
    expect(sitemapUrls.filter((url) => url.startsWith("https://www.woori.today/uk/docs")).length).toBe(120);
    expect(sitemapUrls.filter((url) => url.startsWith("https://www.woori.today/ms/docs")).length).toBe(120);
    expect(sitemapUrls.every((url) => /^https:\/\/www\.woori\.today\/(?:ko|en|ja|zh|es|pt-br|de|fr|vi|id|th|zh-tw|it|nl|hi|ru|tr|pl|fil|bn|uk|ms)\/docs(?:\/[^/]+)?$/.test(url))).toBe(true);
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
    expect(metadata.title).toBe("이력서 양식 | woori.today");
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
    expect(getDocumentMetadata("ja", "resume-template").title).toBe(`${localizedDocumentTitle(documents[0], "ja")} | woori.today`);
    expect(getDocumentMetadata("ja", "resume-template").description).toBe(localizedDescription(documents[0], "ja"));
  });
  it("builds locale-first public paths and 2640 IndexNow URLs", async () => {
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
    expect(urls).toContain("https://www.woori.today/pl/docs/resume-template");
    expect(urls).toContain("https://www.woori.today/fil/docs/resume-template");
    expect(urls).toContain("https://www.woori.today/bn/docs/resume-template");
    expect(urls).toContain("https://www.woori.today/uk/docs/resume-template");
    expect(urls).toContain("https://www.woori.today/ms/docs/resume-template");
    expect(urls.every((url: string) => /^https:\/\/www\.woori\.today\/(?:ko|en|ja|zh|es|pt-br|de|fr|vi|id|th|zh-tw|it|nl|hi|ru|tr|pl|fil|bn|uk|ms)\/docs(?:\/[^/]+)?$/.test(url))).toBe(true);
    const response = GET(); const sitemapXml = await response.text();
    const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    expect(new Set(urls)).toEqual(new Set(sitemapUrls));
  }, 15000);
  it("keeps the catalog synchronized", async () => {
    const { readFile } = await import("node:fs/promises");
    const catalog = await readFile("docs/service-catalog.md", "utf8");
    for (const doc of documents) expect(catalog).toContain(`/${doc.slug}`);
    expect(catalog.match(/^\| \d+ \|/gm)).toHaveLength(documents.length);
  });
});
