import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomFormsWorkspace } from "@/components/custom-forms-workspace";
import { categoryNames, documents, locales, localizedDescription, localizedDocumentTitle, type Locale } from "@/lib/registry";
import { getLocalePayload } from "@/lib/locale-payload";
import { docsPath } from "@/lib/urls";
import editorTranslations from "@/lib/editor-translations.json";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const lang=locale as Locale;
  return { title: editorTranslations[lang].myForms, alternates: { canonical: `${docsPath(lang)}/forms` }, robots: { index: false, follow: false } };
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const lang = locale as Locale;
  const docs = documents.filter((doc) => doc.isPublic && doc.supportedLocales.includes(lang)).map((doc) => ({ slug: doc.slug, title: localizedDocumentTitle(doc, lang), description: localizedDescription(doc, lang), category: doc.category, categoryLabel: categoryNames[lang][doc.category] }));
  return <CustomFormsWorkspace locale={lang} mode="list" docs={docs} {...getLocalePayload(lang)}/>;
}
