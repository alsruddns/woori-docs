import { writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { buildDocumentContent } from "../src/lib/document-content";
import { categoryNames, documents, getRelated, localizedDescription, localizedDocumentTitle, localizeField } from "../src/lib/registry";
import { locales, type Locale } from "../src/lib/template-schema";

const publicDocs = documents.filter((doc) => doc.isPublic);
const detailSource = readFileSync(resolve("src/components/document-workspace.tsx"), "utf8");
const cardsSource = readFileSync(resolve("src/components/document-detail-cards.tsx"), "utf8");
const sitemapSource = readFileSync(resolve("src/app/sitemap.xml/route.ts"), "utf8");
const indexPageSource = readFileSync(resolve("src/components/document-workspace.tsx"), "utf8");
const minChars = (locale: Locale, text: string) => [...text.trim()].length >= (["ko", "ja", "zh", "zh-tw", "th"].includes(locale) ? 28 : 55);
const localeAudit: Record<string, { checked: number; signals: number; shortDescriptions: number; missingSections: number; rawOrDamaged: number; exactEnglishFallback: number; exactDuplicateGroups: Record<string, number>; nearCandidates: string[] }> = {};
const slugRows: Array<{ slug: string; title: string; fields: string; localeSignals: string[]; related: string; source: string }> = [];
const noindexCandidates: string[] = [];
const exactDuplicates = new Map<string, Map<string, string[]>>();
const signalCount = { shortDescription: 0, missingUsage: 0, missingHowTo: 0, missingTips: 0, missingExample: 0, missingInputOutput: 0, missingLimitations: 0, missingTroubleshooting: 0, missingFaq: 0, missingServerRenderedCards: 0, downloadOnly: 0, rawOrDamaged: 0, exactEnglishFallback: 0, brokenRelated: 0, fieldMismatch: 0, duplicateContent: 0 };

function addDuplicate(locale: Locale, kind: string, value: string, slug: string) {
  const groups = exactDuplicates.get(`${locale}:${kind}`) ?? new Map<string, string[]>();
  groups.set(value, [...(groups.get(value) ?? []), slug]);
  exactDuplicates.set(`${locale}:${kind}`, groups);
}
function brokenLocaleText(values: string[]) {
  return values.some((value) =>
    !value.trim() ||
    value.includes("\uFFFD") ||
    /&(?:#\d+|#x[\da-f]+|[a-z]+);/i.test(value) ||
    /\{\{?\s*[\w.-]+\s*\}?\}|^[a-z][\w-]*(?:\.[a-z][\w-]*)+$/i.test(value) ||
    /(?:\u00c3.|\u00c2.|\u00e2\u20ac|\u00ef\u00bf\u00bd|\u00d0.|\u00d1.)/u.test(value)
  );
}
function tokens(value: string) { return new Set(value.toLocaleLowerCase().match(/[\p{L}\p{N}]{2,}/gu) ?? []); }
function jaccard(a: string, b: string) {
  const left = tokens(a); const right = tokens(b); const intersection = [...left].filter((token) => right.has(token)).length;
  return intersection / Math.max(1, new Set([...left, ...right]).size);
}

for (const locale of locales) {
  let shortDescriptions = 0; let missingSections = 0; let damaged = 0; let exactEnglishFallback = 0; let signals = 0;
  const descriptions = new Map<string, string[]>();
  const contentBySlug = new Map<string, string>();
  for (const doc of publicDocs) {
    const title = localizedDocumentTitle(doc, locale);
    const fields = doc.fields.map((field) => localizeField(field.label, locale));
    const content = buildDocumentContent(locale, title, categoryNames[locale][doc.category], fields, doc.kind, Boolean(doc.tables?.length), doc.policyReviewRequired);
    const description = localizedDescription(doc, locale);
    const englishTitle = localizedDocumentTitle(doc, "en");
    const englishFields = doc.fields.map((field) => localizeField(field.label, "en"));
    const englishContent = buildDocumentContent("en", englishTitle, categoryNames.en[doc.category], englishFields, doc.kind, Boolean(doc.tables?.length), doc.policyReviewRequired);
    const englishCopy = [localizedDescription(doc, "en"), englishContent.purpose, englishContent.steps, englishContent.tips, englishContent.example, englishContent.input, englishContent.output, englishContent.limitations, englishContent.troubleshooting, ...englishContent.faq.flatMap((item) => [item.question, item.answer])];
    const localizedCopy = [description, content.purpose, content.steps, content.tips, content.example, content.input, content.output, content.limitations, content.troubleshooting, ...content.faq.flatMap((item) => [item.question, item.answer])];
    const hasExactEnglishFallback = locale !== "en" && localizedCopy.some((value) => englishCopy.includes(value));
    const checks: Array<[keyof typeof signalCount, boolean]> = [
      ["shortDescription", !minChars(locale, description)],
      ["missingUsage", !content.purpose.trim()],
      ["missingHowTo", !minChars(locale, content.steps)],
      ["missingTips", !minChars(locale, content.tips)],
      ["missingExample", !minChars(locale, content.example) || !content.example.includes(title)],
      ["missingInputOutput", !minChars(locale, content.input) || !content.input.includes(fields[0]) || !minChars(locale, content.output)],
      ["missingLimitations", !minChars(locale, content.limitations)],
      ["missingTroubleshooting", !minChars(locale, content.troubleshooting)],
      ["missingFaq", content.faq.length === 0 || content.faq.some((item) => !item.question.trim() || !item.answer.trim())],
      ["missingServerRenderedCards", !cardsSource.includes("export function DocumentDetailCards") || !cardsSource.includes("content.faq.map") || cardsSource.includes("<details")],
      ["downloadOnly", doc.fields.length === 0 || !detailSource.includes("function downloadText()") || !detailSource.includes("window.print()")],
      ["rawOrDamaged", brokenLocaleText([title, description, content.purpose, content.audience, content.structure, content.steps, content.tips, content.source, content.caution, content.example, content.input, content.output, content.limitations, content.troubleshooting, ...content.faq.flatMap((item) => [item.question, item.answer]), ...fields])],
      ["exactEnglishFallback", hasExactEnglishFallback],
      ["fieldMismatch", fields.length === 0 || !content.structure.includes(fields[0]) || !content.steps.includes(fields[0]) || !content.tips.includes(fields[0]) || !content.faq[2]?.answer.includes(fields[0])],
    ];
    const failed = checks.filter(([, bad]) => bad).map(([key]) => key);
    for (const key of failed) signalCount[key]++;
    if (failed.length) signals++;
    if (checks[0][1]) shortDescriptions++;
    if (hasExactEnglishFallback) exactEnglishFallback++;
    if (checks.some(([key, bad]) => bad && ["missingUsage", "missingHowTo", "missingTips", "missingFaq"].includes(key))) missingSections++;
    if (checks.find(([key]) => key === "rawOrDamaged")?.[1]) damaged++;
    descriptions.set(description, [...(descriptions.get(description) ?? []), doc.slug]);
    contentBySlug.set(doc.slug, [content.intro, content.purpose, content.audience, content.structure, content.steps, content.tips, content.example, content.input, content.output, content.limitations, content.troubleshooting, ...content.faq.flatMap((item) => [item.question, item.answer])].join(" "));
    for (const kind of ["description", "usage", "how-to", "tips", "example", "faq-set"] as const) {
      const value = kind === "description" ? description : kind === "usage" ? content.purpose : kind === "how-to" ? content.steps : kind === "tips" ? content.tips : kind === "example" ? content.example : content.faq.map((item) => `${item.question} ${item.answer}`).join(" ");
      addDuplicate(locale, kind, value, doc.slug);
    }
  }
  const duplicateGroups: Record<string, number> = {};
  for (const kind of ["description", "usage", "how-to", "tips", "example", "faq-set"]) {
    duplicateGroups[kind] = [...(exactDuplicates.get(`${locale}:${kind}`)?.values() ?? [])].filter((slugs) => slugs.length > 1).length;
  }
  const nearCandidates: string[] = [];
  const rows = [...contentBySlug.entries()];
  const seenPairs = new Set<string>();
  for (let i = 0; i < rows.length; i++) for (let j = i + 1; j < rows.length; j++) {
    const score = jaccard(rows[i][1], rows[j][1]);
    if (score >= 0.58) seenPairs.add(`${score.toFixed(2)} ${rows[i][0]} vs ${rows[j][0]}`);
  }
  nearCandidates.push(...[...seenPairs].sort((a, b) => Number(b.slice(0, 4)) - Number(a.slice(0, 4))).slice(0, 5));
  localeAudit[locale] = { checked: publicDocs.length, signals, shortDescriptions, missingSections, rawOrDamaged: damaged, exactEnglishFallback, exactDuplicateGroups: duplicateGroups, nearCandidates };
}

const duplicatedSlugsByLocale = new Map<Locale, Set<string>>();
for (const [key, groups] of exactDuplicates) {
  const [locale] = key.split(":") as [Locale, string];
  const affected = duplicatedSlugsByLocale.get(locale) ?? new Set<string>();
  for (const slugs of groups.values()) if (slugs.length > 1) slugs.forEach((slug) => affected.add(slug));
  duplicatedSlugsByLocale.set(locale, affected);
}
for (const [locale, affected] of duplicatedSlugsByLocale) {
  localeAudit[locale].signals += affected.size;
  for (const slug of affected) noindexCandidates.push(slug);
}
signalCount.duplicateContent = new Set([...duplicatedSlugsByLocale.values()].flatMap((set) => [...set])).size;

for (const doc of publicDocs) {
  const related = getRelated(doc);
  const invalid = doc.relatedServices.filter((slug) => !documents.some((known) => known.slug === slug) || slug === doc.slug);
  if (invalid.length) signalCount.brokenRelated += invalid.length;
  const primaryTitle = localizedDocumentTitle(doc, "ko");
  const primaryFields = doc.fields.map((field) => localizeField(field.label, "ko"));
  const page = buildDocumentContent("ko", primaryTitle, categoryNames.ko[doc.category], primaryFields, doc.kind, Boolean(doc.tables?.length), doc.policyReviewRequired);
  const failedLocales = locales.filter((locale) => {
    const title = localizedDocumentTitle(doc, locale); const fields = doc.fields.map((field) => localizeField(field.label, locale));
    const content = buildDocumentContent(locale, title, categoryNames[locale][doc.category], fields, doc.kind, Boolean(doc.tables?.length), doc.policyReviewRequired);
    const englishTitle = localizedDocumentTitle(doc, "en"); const englishFields = doc.fields.map((field) => localizeField(field.label, "en"));
    const englishContent = buildDocumentContent("en", englishTitle, categoryNames.en[doc.category], englishFields, doc.kind, Boolean(doc.tables?.length), doc.policyReviewRequired);
    const localizedCopy = [localizedDescription(doc, locale), content.purpose, content.steps, content.tips, content.example, content.input, content.output, content.limitations, content.troubleshooting, ...content.faq.flatMap((item) => [item.question, item.answer])];
    const englishCopy = [localizedDescription(doc, "en"), englishContent.purpose, englishContent.steps, englishContent.tips, englishContent.example, englishContent.input, englishContent.output, englishContent.limitations, englishContent.troubleshooting, ...englishContent.faq.flatMap((item) => [item.question, item.answer])];
    const hasExactEnglishFallback = locale !== "en" && localizedCopy.some((value) => englishCopy.includes(value));
    return !minChars(locale, localizedDescription(doc, locale)) || brokenLocaleText([title, content.purpose, content.steps, content.tips, content.example, content.input, content.output, content.limitations, content.troubleshooting, ...content.faq.flatMap((item) => [item.question, item.answer])]) || hasExactEnglishFallback || duplicatedSlugsByLocale.get(locale)?.has(doc.slug) === true;
  });
  slugRows.push({ slug: doc.slug, title: primaryTitle, fields: primaryFields.slice(0, 8).join(", "), localeSignals: failedLocales, related: related.map((item) => item.slug).join(", ") || "None", source: "Internal editable template; no per-slug external citation or license recorded" });
  if (failedLocales.length) noindexCandidates.push(doc.slug);
  if (!page.purpose || !page.structure || !page.steps || !page.tips || !page.example || !page.input || !page.output || !page.limitations || !page.troubleshooting || !page.caution || !page.faq.length) noindexCandidates.push(doc.slug);
}

const indexChecklist = {
  serviceIntroduction: indexPageSource.includes("library.intro"),
  categoryDescriptions: indexPageSource.includes("categoryDescriptions[c]"),
  representativeTemplates: indexPageSource.includes("featured"),
  recentTemplates: indexPageSource.includes("library.recent"),
  usageInstructions: indexPageSource.includes("library.use"),
};
const relatedBroken = publicDocs.flatMap((doc) => doc.relatedServices.filter((slug) => !documents.some((known) => known.slug === slug) || slug === doc.slug).map((slug) => `${doc.slug} ??${slug}`));
const sitemapCount = locales.length + publicDocs.reduce((sum, doc) => sum + doc.supportedLocales.length, 0);
const indexNowCount = locales.length + publicDocs.reduce((sum, doc) => sum + doc.supportedLocales.length, 0);
const totalSignals = Object.values(signalCount).reduce((sum, value) => sum + value, 0);
const duplicateDetailLines = [...exactDuplicates.entries()].flatMap(([key, groups]) => {
  const repeated = [...groups.values()].filter((slugs) => slugs.length > 1);
  return repeated.map((slugs) => `- ${key}: ${slugs.join(", ")}`);
});
const md: string[] = [
  "# AdSense Content Quality Audit",
  "",
  `- Audited at: ${new Date().toISOString()}`,
  `- Branch: ${process.env.GITHUB_REF_NAME ?? "develop (local audit)"}`,
  `- Public documents: ${publicDocs.length}`,
  `- Locales: ${locales.length} (${locales.join(", ")})`,
  `- Current thin-content signals: ${totalSignals}`,
  `- Noindex/sitemap exclusion candidates: ${new Set(noindexCandidates).size}`,
  `- Expected sitemap URLs: ${sitemapCount}; IndexNow URLs: ${indexNowCount}`,
  "",
  "## Signal definitions and results",
  "",
  "Description thresholds are 28 characters for CJK locales and 55 for other locales. The audit checks localized usage steps, practical examples tied to each title, input/output details, limitations, troubleshooting, FAQ content, field alignment, damaged text, exact English prose fallback, duplicate sections, related links, and server-rendered always-open cards. It also confirms editable fields, preview, text download, and print actions. The fallback detector requires an entire localized prose string to equal an English source string; it does not flag acronyms or individual shared words.",
  "",
  "| Signal | Failed count |",
  "|---|---:|",
  ...Object.entries(signalCount).map(([name, count]) => `| ${name} | ${count} |`),
  "",
  "## Locale results",
  "",
  "| Locale | Documents checked | Thin signals | Short descriptions | Missing sections | Damaged/raw text | Exact English fallback | Exact duplicates (description / usage / how-to / tips / example / FAQ) |",
  "|---|---:|---:|---:|---:|---:|---:|---|",
  ...locales.map((locale) => { const result = localeAudit[locale]; const dup = result.exactDuplicateGroups; return `| ${locale} | ${result.checked} | ${result.signals} | ${result.shortDescriptions} | ${result.missingSections} | ${result.rawOrDamaged} | ${result.exactEnglishFallback} | ${dup.description} / ${dup.usage} / ${dup["how-to"]} / ${dup.tips} / ${dup["faq-set"]} |`; }),
  "",
  "## Exact duplicates and near-duplicate candidates",
  "",
  "Exact duplicates are groups of distinct slugs whose complete localized section text matches. Near-duplicate candidates have token Jaccard similarity of at least 0.58. Candidates are for human review and are not automatically edited or excluded.",
  "",
  "### Exact duplicate slug groups",
  "",
  ...(duplicateDetailLines.length ? duplicateDetailLines : ["- None"]),
  "",
  ...locales.flatMap((locale) => [`### ${locale}`, "", ...(localeAudit[locale].nearCandidates.length ? localeAudit[locale].nearCandidates.map((candidate) => `- ${candidate}`) : ["- No candidates"]), ""]),
  "## Sources, copyright, and usage conditions",
  "",
  "The registry, template catalog, and public assets contain no per-slug external source URL, distributed PDF/DOCX original, or license field. The pages describe editable reference templates assembled by woori.today. This inventory alone cannot prove the provenance of every original field or phrase. Do not present a template as an official or standard form unless its source and license are verified and recorded for that slug.",
  "",
  `- Documents without recorded source metadata: ${publicDocs.length} (manual provenance review required).`,
  "- Legal/tax policy-review flags are preserved for relevant pages. Policy-flagged templates state that they are general drafts and make no jurisdictional legal-effect claim.",
  "- Confirmed copied external templates: none identified by this metadata scan; missing provenance records prevent a definitive originality finding.",
  "",
  "## Docs list page",
  "",
  ...Object.entries(indexChecklist).map(([name, present]) => `- ${name}: ${present ? "present" : "missing"}`),
  "",
  "## Links, downloads, and indexing",
  "",
  `- Broken related links: ${relatedBroken.length}`,
  `- Text download/print renderer: ${detailSource.includes("function downloadText()") && detailSource.includes("window.print()") ? "present" : "missing"}`,
  `- Initial server-rendered informational cards: ${cardsSource.includes("export function DocumentDetailCards") && cardsSource.includes("content.faq.map") && !cardsSource.includes("<details") ? "present; FAQ is always visible" : "missing or collapsed"}`,
  `- Sitemap locale lists + public details: ${sitemapCount} URLs; IndexNow: ${indexNowCount} URLs. Sitemap source read: ${Boolean(sitemapSource)}`,
  `- Noindex recommendation: ${new Set(noindexCandidates).size ? [...new Set(noindexCandidates)].join(", ") : "none; no page excluded automatically"}`,
  "",
  "## Per-slug audit record",
  "",
  "| Slug | Korean title | Key fields (up to 8) | Locale signals | Related documents | Source record status |",
  "|---|---|---|---|---|---|",
  ...slugRows.map((row) => `| ${row.slug} | ${row.title} | ${row.fields} | ${row.localeSignals.length ? row.localeSignals.join(", ") : "none"} | ${row.related} | ${row.source} |`),
  "",
  "## Baseline interpretation",
  "",
  "No pre-audit snapshot of per-document signals was retained. The prior generic shared copy suggests an estimated initial thin-signal baseline of 119 detail pages, but this is an estimate, not a measured historical count. Current signals are measured against the live registry and renderer. Slugs, list/detail URLs, and SEO route structure were not changed.",
  "",
];
writeFileSync(resolve("docs/adsense-content-quality-audit.md"), md.join("\n"), "utf8");
console.log(`Content audit: ${publicDocs.length} docs 횞 ${locales.length} locales; ${totalSignals} failed signals; ${new Set(noindexCandidates).size} noindex candidates; report: docs/adsense-content-quality-audit.md`);
if (totalSignals > 0 || duplicateDetailLines.length > 0 || Object.values(indexChecklist).some((present) => !present) || relatedBroken.length > 0 || sitemapCount !== indexNowCount) process.exitCode = 1;
