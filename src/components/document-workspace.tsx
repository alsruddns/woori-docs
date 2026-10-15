"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { categories, categoryNames, documents, getRelated, localizeField, localizedTitle, ui, type DocumentDefinition, type Locale } from "@/lib/registry";
import { renderDocumentText, validateDocument } from "@/lib/engine";

function keyFor(doc: DocumentDefinition) { return `woori-docs:draft:${doc.slug}`; }
function initialValues(doc: DocumentDefinition) { return Object.fromEntries(doc.fields.map((field) => [field, ""])); }
function isMultiline(field: string) { return /items|notes|summary|experience|agenda|objective|responsibilit|milestone|itinerary|terms|expense|task|scope|result|decision|challenge|blocker|detail|description|purpose|condition|contact|resource|goal|session|schedule|achievement|skill|education|profile|closing|opening|reproduc|deliverable|confidential|exclusion|revision|progress|highlight|risk|reservation|attachment|signature/i.test(field); }

export function DocumentWorkspace({ doc, locale }: { doc: DocumentDefinition; locale: Locale }) {
  const t = ui[locale];
  const [values, setValues] = useState<Record<string, string>>(() => initialValues(doc));
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState("");
  const [contactOpen, setContactOpen] = useState(false);
  const router = useRouter();
  const related = getRelated(doc);
  const text = useMemo(() => renderDocumentText(doc, values, locale), [doc, locale, values]);
  const missing = validateDocument(doc, values);

  useEffect(() => {
    document.documentElement.lang = locale;
    const timeout = window.setTimeout(() => {
      try { const saved = localStorage.getItem(keyFor(doc)); if (saved) setValues({ ...initialValues(doc), ...JSON.parse(saved) }); } catch { /* Ignore unavailable browser storage. */ }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [doc, locale]);
  useEffect(() => { if (!ready) return; try { localStorage.setItem(keyFor(doc), JSON.stringify(values)); } catch { /* Storage may be disabled or full. */ } }, [doc, ready, values]);
  useEffect(() => { if (!toast) return; const timeout = window.setTimeout(() => setToast(""), 2200); return () => window.clearTimeout(timeout); }, [toast]);

  async function copyText() { if (missing.length) { setToast(`${localizeField(missing[0], locale)}: ${t.required}`); return; } try { await navigator.clipboard.writeText(text); setToast(t.copied); } catch { setToast("Clipboard unavailable"); } }
  function downloadText() { if (missing.length) { setToast(`${localizeField(missing[0], locale)}: ${t.required}`); return; } const blob = new Blob([text], { type: "text/plain;charset=utf-8" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = `${doc.slug}.txt`; link.click(); URL.revokeObjectURL(url); }
  function clear() { setValues(initialValues(doc)); try { localStorage.removeItem(keyFor(doc)); } catch { /* Storage may be disabled. */ } setToast(t.remove); }

  return <>
    <header className="site-header"><Link className="brand" href={`/${locale}`}>woori.today <span>{t.brand}</span></Link><div className="header-actions"><details className="family-menu"><summary>패밀리사이트</summary><nav>{[t.portal,t.calculator,t.tools,t.ledger,t.docs,t.quiz].map((name,i)=><a key={name} href={["https://woori.today","https://woori.today/calculator","https://woori.today/tools","https://woori.today/ledger","https://woori.today/docs","https://woori.today/quiz"][i]} target="_blank" rel="noreferrer">{name}</a>)}</nav></details><label className="language-picker"><span className="sr-only">{t.language}</span><select aria-label={t.language} value={locale} onChange={(e)=>{const path=window.location.pathname.split("/").slice(3).join("/");router.push(`/${e.target.value}${path?`/${path}`:""}`)}}>{["ko","en","ja","zh","es","pt-br","de","fr","vi","id","th","zh-tw","it","nl","hi"].map(code=><option key={code} value={code}>{code.toUpperCase()}</option>)}</select></label></div></header>
    <div className="app-shell"><aside className="sidebar" ref={(element)=>{if(element&&element.dataset.scrollRestored!=="true"){element.scrollTop=Number(sessionStorage.getItem("woori-docs:sidebar-scroll")||0);element.dataset.scrollRestored="true"}}} onScroll={(e)=>sessionStorage.setItem("woori-docs:sidebar-scroll",String(e.currentTarget.scrollTop))}><div className="sidebar-label">{t.categories}</div><Link className="nav-link active" href={`/${locale}`}>{t.all}</Link>{categories.map((category)=><a className="nav-link" key={category} href={`/docs/${locale}#${category}`}>{categoryNames[locale][category]}</a>)}<div className="sidebar-note">{t.newFeature}</div></aside>
      <main className="main-content"><div className="breadcrumb"><Link href={`/${locale}`}>{t.home}</Link><span>/</span><span>{categoryNames[locale][doc.category]}</span><span>/</span><span>{localizedTitle(doc,locale)}</span></div>
        <section className="doc-heading"><span className="eyebrow">{categoryNames[locale][doc.category]}</span><h1>{localizedTitle(doc,locale)}</h1><p>{locale === "ko" ? `${doc.titleKo}를 브라우저에서 작성하고 미리보기로 확인하세요.` : doc.description}</p>{doc.policyReviewRequired && <p className="legal-note">{t.legal}</p>}<p className="privacy-note"><span aria-hidden="true">●</span> {t.browser}</p></section>
        <div className="workspace"><section className="editor-panel"><div className="panel-title"><div><span className="step">01</span><h2>{t.edit}</h2></div><span className="saved-status">● {t.save}</span></div><p className="panel-hint">{t.templateNote}</p><form onSubmit={(e)=>e.preventDefault()}>{doc.fields.map((field,index)=><label className="field" key={field}><span>{localizeField(field,locale)}{index<2&&<b aria-label="required"> *</b>}</span>{isMultiline(field) ? <textarea value={values[field]} placeholder={t.placeholder} rows={3} onChange={(e)=>setValues({...values,[field]:e.target.value})}/> : <input value={values[field]} placeholder={t.placeholder} onChange={(e)=>setValues({...values,[field]:e.target.value})}/>}</label>)}</form><div className="editor-actions"><button className="button secondary" type="button" onClick={clear}>{t.clear}</button></div></section>
          <section className="preview-panel"><div className="panel-title"><div><span className="step">02</span><h2>{t.preview}</h2></div><span className="paper-label">A4</span></div><article className="paper"><div className="paper-brand">woori.today · {t.brand}</div><h2>{localizedTitle(doc,locale)}</h2><div className="paper-rule"/>{doc.fields.map((field)=><div className="preview-field" key={field}><strong>{localizeField(field,locale)}</strong><p>{values[field]||<span className="empty-value">—</span>}</p></div>)}{doc.policyReviewRequired&&<p className="paper-legal">{t.legal}</p>}</article><div className="preview-actions"><button type="button" className="button primary" onClick={()=>window.print()}>{t.print}</button><button type="button" className="button secondary" onClick={copyText}>{t.copy}</button><button type="button" className="button secondary" onClick={downloadText}>{t.download}</button></div><p className="draft-hint">{t.draft}</p></section></div>
        <section className="seo-guide"><h2>{t.guide}</h2><p>{t.templateNote} Required fields are marked with an asterisk. Save a local copy with the text download or use your browser&apos;s print dialog to create a PDF.</p><h3>{t.examples}</h3><p>Use concise, factual details. Review dates, names, amounts, and any local requirements before sharing or printing.</p><h3>{t.faq}</h3><details><summary>Where is my document saved?</summary><p>{t.browser} A draft is stored in this browser&apos;s local storage for this document.</p></details><details><summary>Can I use this as a legally binding form?</summary><p>{t.legal}</p></details></section>
        <section className="related-section"><h2>{t.related}</h2><div className="related-grid">{related.map(item=><Link className="related-card" key={item.slug} href={`/${locale}/${item.slug}`}><span>{categoryNames[locale][item.category]}</span><strong>{localizedTitle(item,locale)}</strong><b aria-hidden="true">↗</b></Link>)}</div></section>
        <footer className="site-footer"><div><strong>woori.today · {t.brand}</strong><span>© woori.today</span></div><nav><a href="#privacy" onClick={(e)=>{e.preventDefault();setContactOpen(true)}}>{t.privacy}</a><a href="#usage">{t.usage}</a><button type="button" onClick={()=>setContactOpen(true)}>{t.contact}</button></nav><small>{t.browser}</small></footer>
      </main></div>
    {toast&&<div role="status" className="toast">{toast}</div>}{contactOpen&&<div className="modal-backdrop" onClick={()=>setContactOpen(false)}><section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-title" onClick={(e)=>e.stopPropagation()}><button className="modal-close" onClick={()=>setContactOpen(false)} aria-label={t.close}>횞</button><h2 id="contact-title">{t.contactTitle}</h2><p>{t.contact}</p><a href="mailto:krdd125@gmail.com">krdd125@gmail.com</a></section></div>}
  </>;
}

export function DocumentIndex({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("");
  const [sidebar, setSidebar] = useState<HTMLElement | null>(null);
  const router = useRouter();
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  const found = documents.filter((doc) => (!category || doc.category === category) && `${localizedTitle(doc, locale)} ${doc.title} ${doc.titleKo} ${categoryNames[locale][doc.category]} ${doc.keywords.join(" ")}`.toLowerCase().includes(query.toLowerCase()));
  const changeLocale = (nextLocale: string) => router.push(`/${nextLocale}`);
  return <>
    <header className="site-header"><Link className="brand" href={`/${locale}`}>woori.today <span>{t.brand}</span></Link><div className="header-actions"><details className="family-menu"><summary>패밀리사이트</summary><nav>{[t.portal,t.calculator,t.tools,t.ledger,t.docs,t.quiz].map((name,i)=><a key={name} href={["https://woori.today","https://woori.today/calculator","https://woori.today/tools","https://woori.today/ledger","https://woori.today/docs","https://woori.today/quiz"][i]} target="_blank" rel="noreferrer">{name}</a>)}</nav></details><select aria-label={t.language} value={locale} onChange={(e)=>changeLocale(e.target.value)} className="language-select">{["ko","en","ja","zh","es","pt-br","de","fr","vi","id","th","zh-tw","it","nl","hi"].map(l=><option key={l} value={l}>{l.toUpperCase()}</option>)}</select></div></header>
    <div className="app-shell"><aside className="sidebar" ref={(element)=>{if(element&&sidebar===null){setSidebar(element);element.scrollTop=Number(sessionStorage.getItem("woori-docs:sidebar-scroll")||0)}}} onScroll={(e)=>sessionStorage.setItem("woori-docs:sidebar-scroll",String(e.currentTarget.scrollTop))}><div className="sidebar-label">{t.categories}</div><button className={`nav-link ${category===""?"active":""}`} onClick={()=>setCategory("")}>{t.all}</button>{categories.map(c=><button className={`nav-link ${category===c?"active":""}`} key={c} onClick={()=>setCategory(c)}>{categoryNames[locale][c]}</button>)}<div className="sidebar-note">{t.newFeature}</div></aside>
    <main className="main-content"><section className="hero"><span className="eyebrow">woori.today / {t.brand}</span><h1>{t.tagline}</h1><p>{t.browser}</p><label className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder={t.search}/><kbd>⌘ K</kbd></label><div className="result-count">{found.length}{t.count}</div></section>
    {categories.filter((c)=>!category||category===c).map((c)=><section className="catalog-section" id={c} key={c}><div className="section-heading"><h2>{categoryNames[locale][c]}</h2><span>{found.filter((d)=>d.category===c).length}</span></div><div className="document-grid">{found.filter((d)=>d.category===c).map((doc)=><Link href={`/${locale}/${doc.slug}`} className="document-card" key={doc.slug}><span className="card-icon">{doc.kind==="checklist"?"✓":doc.kind==="planner"?"◷":"▤"}</span><span className="card-category">{categoryNames[locale][c]}</span><h3>{localizedTitle(doc,locale)}</h3><p>{locale==="ko"?`${doc.titleKo}를 작성하고 미리보기로 확인하세요.`:doc.description}</p><span className="card-link">{t.edit} <b>↗</b></span></Link>)}</div></section>)}{found.length===0&&<p className="empty-results">{t.empty}</p>}
    <div className="index-extra"><h2>{t.allLocales}</h2><p>ko · en · ja · zh · es · pt-br · de · fr · vi · id · th · zh-tw · it · nl · hi</p></div><footer className="site-footer"><div><strong>woori.today · {t.brand}</strong><span>© woori.today</span></div><nav><a href="#privacy">{t.privacy}</a><a href="#usage">{t.usage}</a><a href="mailto:krdd125@gmail.com">{t.contact}</a></nav><small>{t.browser}</small></footer></main></div>
  </>;
}
