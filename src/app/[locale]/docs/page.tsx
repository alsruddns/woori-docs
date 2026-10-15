import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentIndex } from "@/components/document-workspace";
import { locales, ui, type Locale } from "@/lib/registry";
import { docsAlternates, docsPath } from "@/lib/urls";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const lang = locale as Locale;
  return { title: ui[lang].brand, description: ui[lang].tagline, alternates: { canonical: docsPath(lang), languages: docsAlternates(locales) }, openGraph: { url: docsPath(lang), title: ui[lang].brand, description: ui[lang].tagline, type: "website" } };
}
export default async function Page({ params }: Props) { const { locale } = await params; if (!locales.includes(locale as Locale)) notFound(); return <DocumentIndex locale={locale as Locale}/>; }
