"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/template-schema";
import type { SiteChromeText } from "@/lib/site-chrome-i18n";
import { docsPathForLocale, portalPath } from "@/lib/urls";

type LanguageOption = { code: Locale; label: string };
type SiteChromeProps = { locale: Locale; uiText: Record<string, string>; chromeText: SiteChromeText; languages: LanguageOption[] };

export function SiteHeader({ locale, uiText, chromeText, languages }: SiteChromeProps) {
  const t = chromeText; const router = useRouter(); const pathname = usePathname();
  const enabledFamilyServices = ["portal", "calculator", "tools", "docs", "quiz"] as const;
  const siteDefinitions = { portal: [t.portal, `/${locale}`], calculator: [t.calculators, `/${locale}/calculators`], tools: [t.tools, `/${locale}/tools`], docs: [t.docs, `/${locale}/docs`], quiz: [t.quiz, `/${locale}/quiz`] };
  const items = enabledFamilyServices.map((service) => siteDefinitions[service]);
  const servicePaths = [siteDefinitions.portal[1], siteDefinitions.calculator[1], siteDefinitions.tools[1], siteDefinitions.docs[1], siteDefinitions.quiz[1]];
  const activeIndex = pathname === servicePaths[0] ? 0 : pathname.startsWith(servicePaths[1]) ? 1 : pathname.startsWith(servicePaths[2]) ? 2 : pathname.startsWith(servicePaths[3]) ? 3 : pathname.startsWith(servicePaths[4]) ? 4 : -1;
  const nav = (mobile = false) => <nav aria-label={t.family} className={mobile ? "family-links mobile-family-links" : "family-links desktop-family-links"}>{items.map(([label, href], index) => <Link key={href} href={href} aria-current={index === activeIndex ? "page" : undefined} className={index === activeIndex ? "family-active" : undefined}>{label}</Link>)}</nav>;
  return <header className="site-header"><Link className="brand" href={portalPath(locale)}><Image src="/_assets/docs/woori-logo.png" alt="woori.today" width={126} height={30} unoptimized/><span>{uiText.brand}</span></Link>{nav()}<details className="mobile-family-menu"><summary aria-label={t.family}><span aria-hidden="true">☰</span></summary>{nav(true)}</details><label className="language-picker"><span className="sr-only">{uiText.language}</span><select aria-label={uiText.language} value={locale} onChange={e => router.push(docsPathForLocale(window.location.pathname, e.target.value as Locale))}>{languages.map(({code,label}) => <option key={code} value={code}>{label}</option>)}</select></label></header>;
}

export function SiteFooter({ locale, uiText, chromeText }: SiteChromeProps) {
  const t = chromeText; const [open, setOpen] = useState(false); const [copied, setCopied] = useState(false); const closeRef = useRef<HTMLButtonElement>(null); const triggerRef = useRef<HTMLElement | null>(null);
  useEffect(() => { if (!open) return; closeRef.current?.focus(); const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); if (event.key === "Tab") { const dialog = document.querySelector<HTMLElement>("[role=dialog]"); const nodes = dialog?.querySelectorAll<HTMLElement>("button,a,select,[tabindex]:not([tabindex='-1'])"); if (!nodes?.length) return; const first = nodes[0], last = nodes[nodes.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } } }; document.addEventListener("keydown", onKey); return () => { document.removeEventListener("keydown", onKey); triggerRef.current?.focus(); }; }, [open]);
  async function copyEmail() { try { await navigator.clipboard.writeText("krdd125@gmail.com"); setCopied(true); } catch { window.location.href = "mailto:krdd125@gmail.com"; } }
  return <><footer className="site-footer"><div><strong>woori.today · {uiText.brand}</strong><span>© woori.today</span></div><nav aria-label={t.family}><Link href={`/${locale}/privacy`}>{t.privacy}</Link><Link href={`/${locale}/terms`}>{t.terms}</Link><button type="button" onClick={e => { triggerRef.current = e.currentTarget; setOpen(true); }}>{t.contact}</button></nav></footer>{open && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false); }}><section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-title" aria-describedby="contact-guidance"><button ref={closeRef} className="modal-close" type="button" onClick={() => setOpen(false)} aria-label={t.close}>×</button><h2 id="contact-title">{t.contactTitle}</h2><p id="contact-guidance">{t.guidance}</p><label className="contact-type">{t.inquiry}<select defaultValue=""><option value="" disabled>{t.inquiry}</option>{t.types.map(type => <option key={type}>{type}</option>)}</select></label><p className="contact-email-label">{t.email}</p><a href="mailto:krdd125@gmail.com">krdd125@gmail.com</a><button type="button" className="button secondary copy-email" onClick={copyEmail}>{copied ? t.copied : t.copy}</button></section></div>}</>;
}
