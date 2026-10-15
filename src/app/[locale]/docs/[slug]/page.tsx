import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentWorkspace } from "@/components/document-workspace";
import { categoryNames, documents, getDocument, getRelated, locales, localizedDescription, localizedDocumentTitle, localizedInterface, localizeField, type Locale } from "@/lib/registry";
import { getDocumentMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() { return locales.flatMap((locale) => documents.filter((doc) => doc.isPublic && doc.supportedLocales.includes(locale)).map((doc) => ({ locale, slug: doc.slug }))); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale, slug } = await params; return getDocumentMetadata(locale, slug); }
export default async function Page({ params }: Props) {
  const { locale, slug } = await params; const doc = getDocument(slug); if (!doc || !doc.isPublic || !locales.includes(locale as Locale)) notFound(); const lang=locale as Locale;
  const localizedDoc={...doc,displayTitle:localizedDocumentTitle(doc,lang),displayDescription:localizedDescription(doc,lang),categoryLabel:categoryNames[lang][doc.category],fields:doc.fields.map(field=>({...field,label:localizeField(field.label,lang)})),tables:doc.tables?.map(table=>({...table,label:localizeField(table.label,lang),columns:table.columns.map(column=>({...column,label:localizeField(column.label,lang)})),summaryLabels:{subtotal:localizeField("Subtotal",lang),vat:localizeField("VAT",lang),total:localizeField("Total",lang)}})),related:getRelated(doc).map(item=>({slug:item.slug,category:item.category,categoryLabel:categoryNames[lang][item.category],title:localizedDocumentTitle(item,lang)})),interfaceContent:localizedInterface(lang)};
  return <DocumentWorkspace doc={localizedDoc} locale={lang}/>;
}
