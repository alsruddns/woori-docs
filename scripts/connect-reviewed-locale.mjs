import fs from 'node:fs';

const locale = process.argv[2];
if (locale !== 'tr') throw new Error('This reviewed wiring batch is authorized for Turkish only.');
const draft = JSON.parse(fs.readFileSync(`docs/i18n-drafts/${locale}.json`, 'utf8'));
if (!String(draft.reviewStatus).includes('runtime verification required')) throw new Error(`${locale} translation review is incomplete.`);
const reviewed = Object.values(draft.reviewedCounts ?? {}).reduce((sum, count) => sum + count, 0);
if (reviewed !== 699) throw new Error(`${locale} has ${reviewed}/699 reviewed units.`);

function updateJson(path, transform) {
  const value = JSON.parse(fs.readFileSync(path, 'utf8'));
  transform(value);
  fs.writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}
function addRecordEntry(path, marker, value) {
  let content = fs.readFileSync(path, 'utf8');
  const start = content.indexOf(marker);
  if (start < 0) throw new Error(`Missing declaration ${marker} in ${path}`);
  const end = content.indexOf('\n};', start);
  if (end < 0) throw new Error(`Missing record close for ${marker} in ${path}`);
  if (content.slice(start, end).includes(`\n  ${locale}:`)) throw new Error(`${locale} already exists in ${path}`);
  const before = content.slice(start, end).trimEnd();
  const comma = before.endsWith(',') ? '' : ',';
  content = `${content.slice(0, end)}${comma}\n  ${locale}:${JSON.stringify(value)}${content.slice(end)}`;
  fs.writeFileSync(path, content, 'utf8');
}

updateJson('src/lib/document-translations.json', (value) => {
  if (value[locale]) throw new Error(`${locale} document translations already exist.`);
  value[locale] = { titles: draft.titles, fields: draft.fields, interface: draft.interface };
});
updateJson('src/lib/category-translations.json', (value) => {
  if (value[locale]) throw new Error(`${locale} category translations already exist.`);
  value[locale] = draft.categories;
});
updateJson('src/lib/editor-translations.json', (value) => {
  if (value[locale]) throw new Error(`${locale} editor translations already exist.`);
  value[locale] = draft.editor;
});

const schemaPath = 'src/lib/template-schema.ts';
let schema = fs.readFileSync(schemaPath, 'utf8');
schema = schema.replace('"hi", "ru"] as const;', '"hi", "ru", "tr"] as const;');
schema = schema.replace('[...locales, "tr", "pl"', '[...locales, "pl"');
if (!schema.includes('"ru", "tr"] as const;') || schema.includes('[...locales, "tr",')) throw new Error('Failed to update public/target locale sets safely.');
fs.writeFileSync(schemaPath, schema, 'utf8');

const chromePath = 'src/lib/chrome-i18n.ts';
let chrome = fs.readFileSync(chromePath, 'utf8');
chrome = chrome.replace('ru:"Русский"', 'ru:"Русский", tr:"Türkçe"');
fs.writeFileSync(chromePath, chrome, 'utf8');
addRecordEntry(chromePath, 'export const ui: Record<Locale, Record<string, string>> = {', draft.ui);

addRecordEntry('src/lib/site-chrome-i18n.ts', 'export const chromeText: Record<Locale, SiteChromeText> = {', draft.chrome);
addRecordEntry('src/lib/document-content.ts', 'const copy: Record<Locale, Copy> = {', draft.documentContent.copy);
addRecordEntry('src/lib/document-content.ts', 'const specificCopy: Record<Locale, SpecificCopy> = {', draft.documentContent.specific);
addRecordEntry('src/lib/document-content.ts', 'const purposeFocusCopy: Record<Locale,string> = {', draft.documentContent.purposeFocus);
addRecordEntry('src/lib/document-content.ts', 'const recentLabels: Record<Locale,string> = {', draft.documentContent.recent);
addRecordEntry('src/lib/document-content.ts', 'const sectionLabels: Record<Locale, { overview: string;', draft.documentContent.sectionLabels);

const urlsPath = 'src/lib/urls.ts';
let urls = fs.readFileSync(urlsPath, 'utf8');
urls = urls.replace(/  const languageTags: Record<Locale, string> = \{[\s\S]*?\n  \};/,
  '  const languageTags: Record<Locale, string> = {\n    ko: "ko", en: "en", ja: "ja", zh: "zh", es: "es", "pt-br": "pt-BR",\n    de: "de", fr: "fr", vi: "vi", id: "id", th: "th", "zh-tw": "zh-TW",\n    it: "it", nl: "nl", hi: "hi", ru: "ru", tr: "tr",\n  };');
if (!urls.includes('tr: "tr"')) throw new Error('Failed to add Turkish hreflang tag.');
fs.writeFileSync(urlsPath, urls, 'utf8');

console.log(`Connected ${locale} reviewed dictionaries and enabled its public locale routes. Runtime verification is still required.`);
