import type { Metadata } from "next";
import { getDocument, isExpandedTemplate, locales, localizedDescription, localizedDocumentTitle, localizedTitle, type Locale } from "./registry";
import { docsAlternates, docsPath } from "./urls";

export function getDocumentMetadata(locale: string, slug: string): Metadata {
  const doc = getDocument(slug);
  if (!doc || !locales.includes(locale as Locale)) return {};
  const lang = locale as Locale;
  const path = docsPath(lang, slug);
  const expanded = isExpandedTemplate(doc);
  const expenseDescriptionKo = "\ubb34\ub8cc \uc9c0\ucd9c\uacb0\uc758\uc11c \uc591\uc2dd\uc744 \ubc14\ub85c \uc791\uc131\ud558\uace0 \ud544\uc694\ud55c \ud56d\ubaa9\uc744 \ucd94\uac00\xb7\uc0ad\uc81c\ud574 \uc5c5\ubb34\uc5d0 \ub9de\uac8c \ucee4\uc2a4\ud140\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.";
  const expandedDescription = doc.slug === "expense-approval-form" && lang === "ko" ? expenseDescriptionKo : localizedDescription(doc, lang);
  const expandedTitle = doc.slug === "expense-approval-form" && lang === "ko" ? "\uC9C0\uCD9C\uACB0\uC758\uC11C \uC591\uC2DD - \uBB34\uB8CC \uC791\uC131\u00B7\uCEE4\uC2A4\uD140 | woori.today" : `${localizedDocumentTitle(doc, lang)} | woori.today`;
  return {
    title: expanded ? { absolute: expandedTitle } : localizedTitle(doc, lang),
    description: expanded ? expandedDescription : lang === "ko" ? `${doc.titleKo}\uB97C \uC791\uC131\uD558\uACE0 \uC2E4\uC2DC\uAC04\uC73C\uB85C \uBBF8\uB9AC\uBCF4\uAE30, \uBCF5\uC0AC, \uC778\uC1C4\uD558\uC138\uC694.` : doc.description,
    alternates: {
      canonical: path,
      languages: docsAlternates(locales, slug),
    },
    keywords: [...doc.keywords],
    openGraph: { url: path, title: expanded ? expandedTitle : localizedTitle(doc, lang), description: expanded ? expandedDescription : doc.description, type: "website" },
  };
}
