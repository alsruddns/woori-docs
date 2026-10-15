import type { Metadata } from "next";
import { getDocument, locales, localizedTitle, type Locale } from "./registry";

export function getDocumentMetadata(locale: string, slug: string): Metadata {
  const doc = getDocument(slug);
  if (!doc || !locales.includes(locale as Locale)) return {};
  const lang = locale as Locale;
  const path = `/docs/${lang}/${slug}`;
  return {
    title: localizedTitle(doc, lang),
    description: lang === "ko" ? `${doc.titleKo}를 작성하고 실시간으로 미리보기, 복사, 인쇄하세요.` : doc.description,
    alternates: {
      canonical: path,
      languages: Object.fromEntries(locales.map((code) => [code, `/docs/${code}/${slug}`]).concat([["x-default", `/docs/en/${slug}`]])),
    },
    keywords: [...doc.keywords],
  };
}
