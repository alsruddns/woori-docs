import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentWorkspace } from "@/components/document-workspace";
import { documents, getDocument, locales, type Locale } from "../../../lib/registry";
import { getDocumentMetadata } from "../../../lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() { return locales.flatMap((locale) => documents.filter((doc) => doc.isPublic && doc.supportedLocales.includes(locale)).map((doc) => ({ locale, slug: doc.slug }))); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  return getDocumentMetadata(locale, slug);
}
export default async function Page({ params }: Props) { const { locale, slug } = await params; const doc = getDocument(slug); if (!doc || !doc.isPublic || !locales.includes(locale as Locale)) notFound(); return <DocumentWorkspace doc={doc} locale={locale as Locale}/>; }
