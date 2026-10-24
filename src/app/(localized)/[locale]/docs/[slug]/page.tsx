import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentWorkspace } from "@/components/document-workspace";
import { categoryNames, documents, getDocument, getRelated, locales, localizedDescription, localizedDocumentTitle, localizedInterface, localizeField, type Locale } from "@/lib/registry";
import { getDocumentMetadata } from "@/lib/seo";
import { buildDocumentContent } from "@/lib/document-content";
import { getLocalePayload } from "@/lib/locale-payload";

type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() { return locales.flatMap((locale) => documents.filter((doc) => doc.isPublic && doc.supportedLocales.includes(locale)).map((doc) => ({ locale, slug: doc.slug }))); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale, slug } = await params; return getDocumentMetadata(locale, slug); }
export default async function Page({ params }: Props) {
  const { locale, slug } = await params; const doc = getDocument(slug); if (!doc || !doc.isPublic || !locales.includes(locale as Locale)) notFound(); const lang=locale as Locale;
  const localePayload = getLocalePayload(lang);
  const displayTitle=localizedDocumentTitle(doc,lang); const categoryLabel=categoryNames[lang][doc.category]; const fields=doc.fields.map(field=>({...field,label:localizeField(field.label,lang)}));
  const localizedDoc={...doc,displayTitle,displayDescription:localizedDescription(doc,lang),categoryLabel,fields,tables:doc.tables?.map(table=>({...table,label:localizeField(table.label,lang),columns:table.columns.map(column=>({...column,label:localizeField(column.label,lang)})),summaryLabels:{subtotal:localizeField("Subtotal",lang),vat:localizeField("VAT",lang),total:localizeField("Total",lang)}})),content:buildDocumentContent(lang,displayTitle,categoryLabel,fields.map(field=>field.label),doc.kind,Boolean(doc.tables?.length),doc.policyReviewRequired),related:getRelated(doc).map(item=>({slug:item.slug,category:item.category,categoryLabel:categoryNames[lang][item.category],title:localizedDocumentTitle(item,lang)})),interfaceContent:localizedInterface(lang)};
  return <DocumentWorkspace doc={localizedDoc} locale={lang} {...localePayload}/>;
}
