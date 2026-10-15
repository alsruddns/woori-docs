import type { Metadata } from "next";
import { getDocument, locales, localizedTitle, type Locale } from "./registry";
import { docsAlternates, docsPath } from "./urls";

export function getDocumentMetadata(locale: string, slug: string): Metadata {
  const doc = getDocument(slug);
  if (!doc || !locales.includes(locale as Locale)) return {};
  const lang = locale as Locale;
  const path = docsPath(lang, slug);
  return {
    title: localizedTitle(doc, lang),
    description: lang === "ko" ? `${doc.titleKo}를 작성하고 실시간으로 미리보기, 복사, 인쇄하세요.` : doc.description,
    alternates: {
      canonical: path,
      languages: docsAlternates(locales, slug),
    },
    keywords: [...doc.keywords],
    openGraph: { url: path, title: localizedTitle(doc, lang), description: doc.description, type: "website" },
  };
}
