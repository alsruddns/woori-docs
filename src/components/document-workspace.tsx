"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { categories, type DocumentTemplate, type Locale, type TemplateField, type TemplateTable } from "@/lib/template-schema";
import categoryTranslations from "@/lib/category-translations.json";
import { localeLabels, locales, ui } from "@/lib/chrome-i18n";
import { renderDocumentText, validateDocument } from "@/lib/engine";
import { docsPath } from "@/lib/urls";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { CustomFormHub } from "@/components/custom-form-hub";

type InterfaceContent = Record<string,string>;
type RelatedCard = {slug:string;category:DocumentTemplate["category"];categoryLabel:string;title:string};
type LocalizedDocument = Omit<DocumentTemplate,"fields"|"tables"> & {
  displayTitle:string;displayDescription:string;categoryLabel:string;fields:TemplateField[];tables?:TemplateTable[];related:RelatedCard[];interfaceContent:InterfaceContent;
};
type CatalogCard = {slug:string;title:string;description:string;category:DocumentTemplate["category"];categoryLabel:string;kind:DocumentTemplate["kind"];keywords:string[]};
const categoryNames=categoryTranslations as Record<Locale,Record<DocumentTemplate["category"],string>>;
function keyFor(doc: DocumentTemplate) { return `woori-docs:draft:${doc.slug}`; }
function initialValues(doc: DocumentTemplate) { return Object.fromEntries(doc.fields.map((field) => [field.id, field.defaultValue == null ? "" : String(field.defaultValue)])); }
function isMultiline(field: string) { return /items|notes|summary|experience|agenda|objective|responsibilit|milestone|itinerary|terms|expense|task|scope|result|decision|challenge|blocker|detail|description|purpose|condition|contact|resource|goal|session|schedule|achievement|skill|education|profile|closing|opening|reproduc|deliverable|confidential|exclusion|revision|progress|highlight|risk|reservation|attachment|signature/i.test(field); }

function RepeatingTable({table,locale,value,onChange,taxRate}:{table:TemplateTable;locale:Locale;value:string;taxRate?:string;onChange:(value:string)=>void}) {
  let rows:Record<string,string>[]=[]; try{rows=JSON.parse(value)}catch{}
  if(!rows.length) rows=[{}];
  const set=(next:Record<string,string>[])=>onChange(JSON.stringify(next));
  const calculations=table.calculations;
  const total=rows.reduce((sum,row)=>sum+(calculations?.quantityColumn&&calculations.unitPriceColumn?Number(row[calculations.quantityColumn]||0)*Number(row[calculations.unitPriceColumn]||0):Number(row[calculations?.amountColumn||""]||0)),0);
  const rate=calculations?.vatRateFieldId?Number(taxRate??10)/100:calculations?.vatRate||0;
  return <fieldset className="repeating-table"><legend>{table.label}</legend><div className="repeating-table-scroll"><table><thead><tr>{table.columns.map(c=><th key={c.id}>{c.label}</th>)}<th>{ui[locale].clear}</th></tr></thead><tbody>{rows.map((row,i)=><tr key={i}>{table.columns.map(c=><td key={c.id}><input aria-label={c.label} type={c.type==="text"?"text":"number"} required={c.required} readOnly={c.id===calculations?.amountColumn&&Boolean(calculations?.quantityColumn&&calculations.unitPriceColumn)} value={c.id===calculations?.amountColumn&&calculations?.quantityColumn&&calculations?.unitPriceColumn?String(Number(row[calculations.quantityColumn]||0)*Number(row[calculations.unitPriceColumn]||0)):row[c.id]||""} onChange={e=>set(rows.map((r,j)=>j===i?{...r,[c.id]:e.target.value}:r))}/></td>)}<td><button type="button" onClick={()=>set(rows.filter((_,j)=>j!==i))} disabled={rows.length<=(table.minRows||0)} aria-label={ui[locale].clear}>×</button></td></tr>)}</tbody></table></div><button type="button" className="button secondary" onClick={()=>set([...rows,{}])}>{ui[locale].edit} +</button>{calculations?.subtotal&&<div className="table-totals"><p>{table.summaryLabels?.subtotal||"Subtotal"}: {total.toLocaleString(locale)}</p><p>{table.summaryLabels?.vat||"VAT"}: {(total*rate).toLocaleString(locale)}</p><strong>{table.summaryLabels?.total||"Total"}: {(total*(1+rate)).toLocaleString(locale)}</strong></div>}</fieldset>;
}

function TablePreview({ table, locale, value, taxRate }: { table: TemplateTable; locale: Locale; value: string; taxRate?: string }) {
  let rows: Record<string,string>[]=[]; try { rows=JSON.parse(value); } catch { /* Ignore malformed draft rows. */ }
  const calc=table.calculations;
  const subtotal=rows.reduce((sum,row)=>sum+(calc?.quantityColumn&&calc.unitPriceColumn?Number(row[calc.quantityColumn]||0)*Number(row[calc.unitPriceColumn]||0):Number(row[calc?.amountColumn||""]||0)),0);const rate=calc?.vatRateFieldId?Number(taxRate??10)/100:calc?.vatRate||0;
  return <section className="preview-table"><h3>{table.label}</h3>{rows.map((row,index)=><div className="preview-table-row" key={index}>{table.columns.map(column=>{const value=column.id===calc?.amountColumn&&calc.quantityColumn&&calc.unitPriceColumn?Number(row[calc.quantityColumn]||0)*Number(row[calc.unitPriceColumn]||0):row[column.id]||"";return <p key={column.id}><strong>{column.label}</strong> {typeof value==="number"?value.toLocaleString(locale):value}</p>})}</div>)}{calc?.subtotal&&<p className="preview-table-total">{table.summaryLabels?.subtotal}: {subtotal.toLocaleString(locale)} · {table.summaryLabels?.vat}: {(subtotal*rate).toLocaleString(locale)} · {table.summaryLabels?.total}: {(subtotal*(1+rate)).toLocaleString(locale)}</p>}</section>;
}

export function DocumentWorkspace({ doc, locale }: { doc: LocalizedDocument; locale: Locale }) {
  const t = ui[locale];
  const [values, setValues] = useState<Record<string, string>>(() => initialValues(doc));
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState("");
  const text = useMemo(() => renderDocumentText(doc, values, locale), [doc, locale, values]);
  const missing = validateDocument(doc, values);
  useEffect(() => {
    document.documentElement.lang = locale;
    const timeout = window.setTimeout(() => {
      try { const saved = localStorage.getItem(keyFor(doc)); if (saved) setValues({ ...initialValues(doc), ...JSON.parse(saved) }); else setValues(current=>({...current,...Object.fromEntries(doc.fields.filter(field=>field.type==="date").map(field=>[field.id,new Date().toISOString().slice(0,10)]))})); } catch { /* Ignore unavailable browser storage. */ }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [doc, locale]);
  useEffect(() => { if (!ready) return; try { localStorage.setItem(keyFor(doc), JSON.stringify(values)); } catch { /* Storage may be disabled or full. */ } }, [doc, ready, values]);
  useEffect(() => { if (!toast) return; const timeout = window.setTimeout(() => setToast(""), 2200); return () => window.clearTimeout(timeout); }, [toast]);

  async function copyText() { if (missing.length) { setToast(`${doc.fields.find(f=>f.id===missing[0])?.label}: ${t.required}`); return; } try { await navigator.clipboard.writeText(text); setToast(t.copied); } catch { setToast(doc.interfaceContent.clipboardError); } }
  function downloadText() { if (missing.length) { setToast(`${doc.fields.find(f=>f.id===missing[0])?.label}: ${t.required}`); return; } const blob = new Blob([text], { type: "text/plain;charset=utf-8" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = `${doc.slug}.txt`; link.click(); URL.revokeObjectURL(url); }
  function clear() { setValues(initialValues(doc)); try { localStorage.removeItem(keyFor(doc)); } catch { /* Storage may be disabled or full. */ } setToast(t.remove); }

  return <>
    <SiteHeader locale={locale}/>
    <div className="app-shell"><aside className="sidebar" ref={(element)=>{if(element&&element.dataset.scrollRestored!=="true"){element.scrollTop=Number(sessionStorage.getItem("woori-docs:sidebar-scroll")||0);element.dataset.scrollRestored="true"}}} onScroll={(e)=>sessionStorage.setItem("woori-docs:sidebar-scroll",String(e.currentTarget.scrollTop))}><div className="sidebar-label">{t.categories}</div><Link className="nav-link" href={docsPath(locale)}>{t.all}</Link>{categories.map((category)=><a className={`nav-link ${category===doc.category?"active":""}`} key={category} href={`${docsPath(locale)}#${category}`}>{categoryNames[locale][category]}</a>)}<Link className="nav-link active current-doc-nav" href={docsPath(locale,doc.slug)}>{doc.displayTitle}</Link><div className="sidebar-note">{t.newFeature}</div></aside>
      <main className="main-content"><div className="breadcrumb"><Link href={docsPath(locale)}>{t.home}</Link><span>/</span><span>{doc.categoryLabel}</span><span>/</span><span>{doc.displayTitle}</span></div>
        <section className="doc-heading"><span className="eyebrow">{doc.categoryLabel}</span><h1>{doc.displayTitle}</h1><p>{doc.displayDescription}</p>{doc.policyReviewRequired && <p className="legal-note">{t.legal}</p>}<p className="privacy-note"><span aria-hidden="true">{"\u25ce"}</span> {t.browser}</p></section>
        <div className="workspace"><section className="editor-panel"><div className="panel-title"><div><span className="step">01</span><h2>{t.edit}</h2></div><span className="saved-status">{"\u2713"}{t.save}</span></div><p className="panel-hint">{t.templateNote}</p><form onSubmit={(e)=>e.preventDefault()}>{doc.fields.map(field=><label className="field" key={field.id}><span>{field.label}{field.required&&<b aria-label={doc.interfaceContent.requiredLabel}> *</b>}</span>{field.type==="textarea"||isMultiline(field.label)?<textarea required={field.required} value={values[field.id]} placeholder={field.placeholder?.[locale]||t.placeholder} rows={3} onChange={e=>setValues({...values,[field.id]:e.target.value})}/>:field.type==="select"?<select required={field.required} value={values[field.id]} onChange={e=>setValues({...values,[field.id]:e.target.value})}><option value=""/>{(field.options||[]).map(option=><option key={option.value} value={option.value}>{option.label[locale]||option.value}</option>)}</select>:<input required={field.required} type={field.type==="currency"||field.type==="percent"?"number":field.type==="checkbox"?"checkbox":field.type==="email"||field.type==="tel"||field.type==="date"||field.type==="time"||field.type==="number"?field.type:"text"} value={field.type==="checkbox"?undefined:values[field.id]} checked={field.type==="checkbox"?values[field.id]==="true":undefined} placeholder={field.placeholder?.[locale]||t.placeholder} onChange={e=>setValues({...values,[field.id]:field.type==="checkbox"?String(e.target.checked):e.target.value})}/>}</label>)}</form>{doc.tables?.map(table=><RepeatingTable key={table.id} table={table} locale={locale} value={values[`table:${table.id}`]||"[]"} taxRate={values[table.calculations?.vatRateFieldId||""]} onChange={next=>setValues(old=>({...old,[`table:${table.id}`]:next}))}/>)}<CustomFormHub locale={locale} baseTemplate={doc}/><div className="editor-actions"><button className="button secondary" type="button" onClick={clear}>{t.clear}</button></div></section>
          <section className="preview-panel"><div className="panel-title"><div><span className="step">02</span><h2>{t.preview}</h2></div><span className="paper-label">A4</span></div><article className="paper"><div className="paper-brand">woori.today · {t.brand}</div><h2>{doc.displayTitle}</h2><div className="paper-rule"/>{doc.fields.map(field=><div className="preview-field" key={field.id}><strong>{field.label}</strong><p>{values[field.id]||<span className="empty-value">{"\u2014"}</span>}</p></div>)}{doc.tables?.map(table=><TablePreview key={table.id} table={table} locale={locale} value={values[`table:${table.id}`]||"[]"} taxRate={values[table.calculations?.vatRateFieldId||""]}/>)}{doc.policyReviewRequired&&<p className="paper-legal">{t.legal}</p>}</article><div className="preview-actions"><button type="button" className="button primary" onClick={()=>window.print()}>{t.print}</button><button type="button" className="button secondary" onClick={copyText}>{t.copy}</button><button type="button" className="button secondary" onClick={downloadText}>{t.download}</button></div><p className="draft-hint">{t.draft}</p></section></div>
        <section className="seo-guide"><h2>{t.guide}</h2><p>{doc.interfaceContent.guide}</p><h3>{t.examples}</h3><p>{doc.interfaceContent.examplesBody}</p><h3>{t.faq}</h3><details><summary>{doc.interfaceContent.faqSaved}</summary><p>{doc.interfaceContent.draftSaved}</p></details><details><summary>{doc.interfaceContent.faqLegal}</summary><p>{t.legal}</p></details></section>
        <section className="related-section"><h2>{t.related}</h2><div className="related-grid">{doc.related.map(item=><Link className="related-card" key={item.slug} href={docsPath(locale,item.slug)}><span>{item.categoryLabel}</span><strong>{item.title}</strong><b aria-hidden="true">{"\u2197"}</b></Link>)}</div></section><SiteFooter locale={locale}/>
      </main></div>{toast&&<div role="status" className="toast">{toast}</div>}
  </>;
}

export function DocumentIndex({ locale, catalog }: { locale: Locale; catalog: CatalogCard[] }) {
  const t = ui[locale];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("");
  const [sidebar, setSidebar] = useState<HTMLElement | null>(null);
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  const found = catalog.filter((doc) => (!category || doc.category === category) && `${doc.title} ${doc.description} ${doc.categoryLabel} ${doc.keywords.join(" ")}`.toLowerCase().includes(query.toLowerCase()));
  const featured=["expense-approval-form","meeting-minutes-generator","quotation-generator","weekly-planner"].map(slug=>catalog.find(doc=>doc.slug===slug)).filter((doc):doc is CatalogCard=>Boolean(doc));
  return <>
    <SiteHeader locale={locale}/>
    <div className="app-shell"><aside className="sidebar" ref={(element)=>{if(element&&sidebar===null){setSidebar(element);element.scrollTop=Number(sessionStorage.getItem("woori-docs:sidebar-scroll")||0)}}} onScroll={(e)=>sessionStorage.setItem("woori-docs:sidebar-scroll",String(e.currentTarget.scrollTop))}><div className="sidebar-label">{t.categories}</div><button className={`nav-link ${category===""?"active":""}`} onClick={()=>setCategory("")}>{t.all}</button>{categories.map(c=><button className={`nav-link ${category===c?"active":""}`} key={c} onClick={()=>setCategory(c)}>{categoryNames[locale][c]}</button>)}<div className="sidebar-note">{t.newFeature}</div></aside>
    <main className="main-content"><section className="hero"><span className="eyebrow">woori.today / {t.brand}</span><h1>{t.tagline}</h1><p>{t.browser}</p><label className="search-box"><span aria-hidden="true">{"\u2315"}</span><input value={query} onChange={(e)=>setQuery(e.target.value)} aria-label={t.search} placeholder={t.search}/><kbd>⌘ K</kbd></label><div className="result-count">{found.length}{t.count}</div></section>
    {!category&&!query&&<section className="featured-documents"><div className="section-heading"><h2>{t.popular}</h2></div><div className="document-grid">{featured.map(doc=><Link href={docsPath(locale,doc.slug)} className="document-card featured-card" key={doc.slug}><span className="card-category">{doc.categoryLabel}</span><h3>{doc.title}</h3><p>{doc.description}</p><span className="card-link">{t.edit} <b aria-hidden="true">{"\u2192"}</b></span></Link>)}</div></section>}
    {categories.filter((c)=>!category||category===c).map((c)=><section className="catalog-section" id={c} key={c}><div className="section-heading"><h2>{categoryNames[locale][c]}</h2><span>{found.filter((d)=>d.category===c).length}</span></div><div className="document-grid">{found.filter((d)=>d.category===c).map((doc)=><Link href={docsPath(locale,doc.slug)} className="document-card" key={doc.slug}><span className="card-icon">{doc.kind==="checklist"?"✓":doc.kind==="planner"?"◷":"▤"}</span><span className="card-category">{categoryNames[locale][c]}</span><h3>{doc.title}</h3><p>{doc.description}</p><span className="card-link">{t.edit} <b aria-hidden="true">{"\u2197"}</b></span></Link>)}</div></section>)}{found.length===0&&<p className="empty-results">{t.empty}</p>}
    <CustomFormHub locale={locale}/><div className="index-extra"><h2>{t.allLocales}</h2><p>{locales.map((code, index)=><span key={code}>{index > 0 && " · "}{localeLabels[code]}</span>)}</p></div><SiteFooter locale={locale}/></main></div>
  </>;
}
