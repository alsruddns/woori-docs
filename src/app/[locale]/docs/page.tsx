import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentIndex } from "@/components/document-workspace";
import { categoryNames, documents, locales, localizedDescription, localizedDocumentTitle, ui, type Locale } from "@/lib/registry";
import { docsAlternates, docsPath } from "@/lib/urls";
import { buildLibraryContent, localizedCategoryDescription } from "@/lib/document-content";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const lang = locale as Locale;
  const description=buildLibraryContent(lang,categoryNames[lang].work).intro;
  return { title: ui[lang].brand, description, alternates: { canonical: docsPath(lang), languages: docsAlternates(locales) }, openGraph: { url: docsPath(lang), title: ui[lang].brand, description, type: "website" } };
}
export default async function Page({ params }: Props) {
  const { locale } = await params; if (!locales.includes(locale as Locale)) notFound(); const lang=locale as Locale;
  const publicDocs=documents.filter(doc=>doc.isPublic&&doc.supportedLocales.includes(lang)); const recentSlugs=new Set(publicDocs.slice(-4).map(doc=>doc.slug));
  const catalog=publicDocs.map(doc=>({slug:doc.slug,title:localizedDocumentTitle(doc,lang),description:localizedDescription(doc,lang),category:doc.category,categoryLabel:categoryNames[lang][doc.category],kind:doc.kind,keywords:doc.keywords,recent:recentSlugs.has(doc.slug)}));
  const categoryDescriptions=Object.fromEntries(Object.entries(categoryNames[lang]).map(([category,label])=>[category,localizedCategoryDescription(lang,label)]));
  return <DocumentIndex locale={lang} catalog={catalog} library={buildLibraryContent(lang,categoryNames[lang].work)} categoryDescriptions={categoryDescriptions}/>;
}
