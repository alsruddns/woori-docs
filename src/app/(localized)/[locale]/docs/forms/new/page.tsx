import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CustomFormsWorkspace } from "@/components/custom-forms-workspace";
import { categoryNames, documents, getDocument, locales, localizeField, localizedDescription, localizedDocumentTitle, type Locale } from "@/lib/registry";
import { getLocalePayload } from "@/lib/locale-payload";
import { docsPath } from "@/lib/urls";
import editorTranslations from "@/lib/editor-translations.json";
import type { SidebarDocument } from "@/components/docs-sidebar";

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ base?: string }> };
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const lang=locale as Locale;
  return { title: editorTranslations[lang].newForm, alternates: { canonical: `${docsPath(lang)}/forms/new` }, robots: { index: false, follow: false } };
}
export default async function Page({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const lang = locale as Locale;
  const docs=documents.filter((doc)=>doc.isPublic&&doc.supportedLocales.includes(lang)).map((doc)=>({slug:doc.slug,title:localizedDocumentTitle(doc,lang),description:localizedDescription(doc,lang),category:doc.category,categoryLabel:categoryNames[lang][doc.category]}));
  const payload=getLocalePayload(lang);
  return <Suspense fallback={<CustomFormsWorkspace locale={lang} mode="new" docs={docs} {...payload}/>}>
    <NewFormFromSearch locale={lang} docs={docs} searchParams={searchParams} {...payload}/>
  </Suspense>;
}

async function NewFormFromSearch({locale,docs,searchParams,...payload}:{locale:Locale;docs:SidebarDocument[];searchParams:Promise<{base?:string}>}&ReturnType<typeof getLocalePayload>){
  const {base}=await searchParams;
  const source=base?getDocument(base):undefined;
  const baseTemplate=source?.isPublic&&source.supportedLocales.includes(locale)?{...source,displayTitle:localizedDocumentTitle(source,locale),displayDescription:localizedDescription(source,locale),fields:source.fields.map(field=>({...field,label:localizeField(field.label,locale)})),tables:source.tables?.map(table=>({...table,label:localizeField(table.label,locale),columns:table.columns.map(column=>({...column,label:localizeField(column.label,locale)}))}))}:undefined;
  return <CustomFormsWorkspace locale={locale} mode="new" docs={docs} baseTemplate={baseTemplate} {...payload}/>;
}
