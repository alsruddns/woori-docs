"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, type Category, type Locale } from "@/lib/template-schema";
import { docsPath } from "@/lib/urls";

export type SidebarDocument = { slug: string; title: string; description: string; category: Category; categoryLabel: string };

export function DocsSidebar({ locale, labels, docs, queryLabel, emptyLabel, allLabel, formsLabel, newFormLabel, closeLabel, clearLabel, menuLabel }: {
  locale: Locale; labels: Record<Category, string>; docs: SidebarDocument[]; queryLabel: string; emptyLabel: string; allLabel: string; formsLabel: string; newFormLabel: string; closeLabel: string; clearLabel: string; menuLabel: string;
}) {
  const pathname = usePathname();
  const activeSlug = pathname.split("/").filter(Boolean)[2] || "";
  const activeDoc = docs.find((doc) => doc.slug === activeSlug);
  const formsActive = pathname.endsWith("/docs/forms") || pathname.endsWith("/docs/forms/new");
  const [query, setQuery] = useState("");
  const [openCategories, setOpenCategories] = useState<Category[]>(activeDoc ? [activeDoc.category] : []);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const normalizedQuery = query.toLocaleLowerCase().trim().replace(/\s+/g, " ");
  const filtered = useMemo(() => docs.filter((doc) => {
    if (!normalizedQuery) return true;
    return `${doc.title} ${doc.description} ${doc.categoryLabel}`.toLocaleLowerCase().replace(/\s+/g, " ").includes(normalizedQuery);
  }), [docs, normalizedQuery]);
  const visibleCategories = categories.filter((category) => !normalizedQuery || filtered.some((doc) => doc.category === category) || labels[category].toLocaleLowerCase().includes(normalizedQuery));
  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFirst = window.requestAnimationFrame(() => document.querySelector<HTMLElement>("#docs-sidebar-panel .docs-search input")?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setDrawerOpen(false); triggerRef.current?.focus(); }
      if (event.key === "Tab") {
        const nodes = document.querySelectorAll<HTMLElement>("#docs-sidebar-panel a, #docs-sidebar-panel button, #docs-sidebar-panel input");
        if (!nodes.length) return;
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { window.cancelAnimationFrame(focusFirst); document.body.style.overflow = previous; document.removeEventListener("keydown", onKeyDown); };
  }, [drawerOpen]);
  const toggle = (category: Category) => setOpenCategories((current) => current.includes(category) ? current.filter((item) => item !== category) : [...current, category]);
  const close = () => setDrawerOpen(false);
  const navigation = <>
    <div className="docs-sidebar-top"><label className="docs-search"><svg aria-hidden="true" viewBox="0 0 20 20"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m13 13 4 4"/></svg><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={queryLabel} aria-label={queryLabel}/>{query && <button type="button" aria-label={clearLabel} onClick={() => setQuery("")}>×</button>}</label><button className="docs-sidebar-close" type="button" aria-label={closeLabel} onClick={close}>×</button></div>
    <nav className="docs-tree" aria-label={queryLabel}>
      <Link className={`docs-tree-all ${pathname === docsPath(locale) ? "active" : ""}`} href={docsPath(locale)} aria-current={pathname === docsPath(locale) ? "page" : undefined} onClick={close}><svg aria-hidden="true" viewBox="0 0 20 20"><path d="M3 4h14v12H3zM3 8h14M8 8v8"/></svg><span>{allLabel}</span></Link>
      {visibleCategories.map((category) => {
        const categoryMatches = normalizedQuery && labels[category].toLocaleLowerCase().includes(normalizedQuery);
        const categoryDocs = (categoryMatches ? docs : filtered).filter((doc) => doc.category === category);
        const expanded = normalizedQuery ? true : openCategories.includes(category) || activeDoc?.category === category;
        return <section className="docs-tree-category" key={category}>
          <div className="docs-tree-heading"><Link href={`${docsPath(locale)}#${category}`} onClick={close}><span className="tree-category-name">{labels[category]}</span><span className="tree-count">{categoryDocs.length}</span></Link><button type="button" aria-expanded={expanded} aria-label={labels[category]} onClick={() => toggle(category)}><span className="tree-caret" aria-hidden="true">{expanded ? "v" : ">"}</span></button></div>
          {expanded && <div className="docs-tree-children">{categoryDocs.map((doc) => <Link key={doc.slug} href={docsPath(locale, doc.slug)} className={activeSlug === doc.slug ? "active" : ""} aria-current={activeSlug === doc.slug ? "page" : undefined} onClick={close}>{doc.title}</Link>)}</div>}
        </section>;
      })}
      {normalizedQuery && visibleCategories.every((category) => !(labels[category].toLocaleLowerCase().includes(normalizedQuery) || filtered.some((doc) => doc.category === category))) && <p className="docs-search-empty">{emptyLabel}</p>}
    </nav>
    <div className="docs-sidebar-bottom"><Link className={formsActive&&!pathname.endsWith("/new")?"active":""} aria-current={formsActive&&!pathname.endsWith("/new")?"page":undefined} href={`/${locale}/docs/forms`} onClick={close}>[F] <span>{formsLabel}</span></Link><Link className={pathname.endsWith("/docs/forms/new")?"active":""} aria-current={pathname.endsWith("/docs/forms/new")?"page":undefined} href={`/${locale}/docs/forms/new`} onClick={close}>[+] <span>{newFormLabel}</span></Link></div>
  </>;
  return <>
    <button ref={triggerRef} className="docs-drawer-trigger" type="button" aria-expanded={drawerOpen} aria-controls="docs-sidebar-panel" aria-label={menuLabel} onClick={() => setDrawerOpen(true)}>{menuLabel}</button>
    {drawerOpen && <button className="docs-drawer-backdrop" type="button" aria-label={queryLabel} onClick={close}/>}
    <aside id="docs-sidebar-panel" className={`sidebar docs-sidebar ${drawerOpen ? "drawer-open" : ""}`} aria-label={queryLabel} role={drawerOpen ? "dialog" : undefined} aria-modal={drawerOpen || undefined}>{navigation}</aside>
  </>;
}
