import type { Metadata } from "next";
import { getDocument, locales, localizedDescription, localizedDocumentTitle, type Locale } from "./registry";
import { docsAlternates, docsPath } from "./urls";

export function getDocumentMetadata(locale: string, slug: string): Metadata {
  const doc = getDocument(slug);
  if (!doc || !locales.includes(locale as Locale)) return {};
  const lang = locale as Locale;
  const path = docsPath(lang, slug);
  const expenseDescriptionKo = "\ubb34\ub8cc \uc9c0\ucd9c\uacb0\uc758\uc11c \uc591\uc2dd\uc744 \ubc14\ub85c \uc791\uc131\ud558\uace0 \ud544\uc694\ud55c \ud56d\ubaa9\uc744 \ucd94\uac00\xb7\uc0ad\uc81c\ud574 \uc5c5\ubb34\uc5d0 \ub9de\uac8c \ucee4\uc2a4\ud140\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.";
  const expandedDescription = doc.slug === "expense-approval-form" && lang === "ko" ? expenseDescriptionKo : localizedDescription(doc, lang);
  const expandedTitle = doc.slug === "expense-approval-form" && lang === "ko" ? "\uC9C0\uCD9C\uACB0\uC758\uC11C \uC591\uC2DD - \uBB34\uB8CC \uC791\uC131\u00B7\uCEE4\uC2A4\uD140" : localizedDocumentTitle(doc, lang);
  return {
    title: { absolute: expandedTitle },
    description: expandedDescription,
    alternates: {
      canonical: path,
      languages: docsAlternates(locales, slug),
    },
    keywords: [...doc.keywords],
    openGraph: { url: path, title: expandedTitle, description: expandedDescription, type: "website" },
  };
}
