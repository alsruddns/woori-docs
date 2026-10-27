"use client";

import { DocsSidebar, type SidebarDocument } from "@/components/docs-sidebar";
import { CustomFormHub } from "@/components/custom-form-hub";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import type { Category, DocumentTemplate, Locale } from "@/lib/template-schema";
import type { SiteChromeText } from "@/lib/site-chrome-i18n";

type LanguageOption = { code: Locale; label: string };
export function CustomFormsWorkspace({ locale, mode, docs, baseTemplate, uiText, categoryLabels, editorTranslations, chromeText, languages }: {
  locale: Locale; mode: "list" | "new"; docs: SidebarDocument[]; uiText: Record<string,string>; categoryLabels: Record<Category,string>;
  baseTemplate?: DocumentTemplate & {displayTitle:string;displayDescription:string}; editorTranslations: Record<string,string>; chromeText: SiteChromeText; languages: LanguageOption[];
}) {
  const text = editorTranslations;
  return <><SiteHeader locale={locale} uiText={uiText} chromeText={chromeText} languages={languages}/><div className="app-shell"><DocsSidebar locale={locale} labels={categoryLabels} docs={docs} queryLabel={uiText.search} emptyLabel={uiText.empty} allLabel={uiText.all} formsLabel={text.myForms||"My forms"} newFormLabel={text.newForm||"Create a new form"} closeLabel={uiText.close} clearLabel={uiText.clear} menuLabel={uiText.categories}/><main className="main-content forms-main"><CustomFormHub locale={locale} mode={mode} baseTemplate={baseTemplate} uiText={uiText} categoryLabels={categoryLabels} translations={editorTranslations}/><SiteFooter locale={locale} uiText={uiText} chromeText={chromeText} languages={languages}/></main></div></>;
}
