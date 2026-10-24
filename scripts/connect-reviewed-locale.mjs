import fs from 'node:fs';

const locale = process.argv[2];
const localeLabels = { tr: 'Türkçe', pl: 'Polski', fil: 'Filipino', bn: 'বাংলা', uk: 'Українська', ms: 'Bahasa Melayu', sv: 'Svenska', cs: 'Čeština', ro: 'Română' };
if (!(locale in localeLabels)) throw new Error(`No reviewed runtime wiring batch is configured for ${locale}.`);
const draft = JSON.parse(fs.readFileSync(`docs/i18n-drafts/${locale}.json`, 'utf8'));
if (!String(draft.reviewStatus).toLowerCase().includes('review complete')) throw new Error(`${locale} editorial translation review is incomplete.`);
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
  const before = content.slice(0, end).trimEnd();
  const comma = before.endsWith(',') ? '' : ',';
  content = `${content.slice(0, end)}${comma}\n  ${locale}:${JSON.stringify(value)}${content.slice(end)}`;
  fs.writeFileSync(path, content, 'utf8');
}
function addInlineRecordEntry(path, marker, key, value) {
  let content = fs.readFileSync(path, 'utf8');
  const start = content.indexOf(marker);
  if (start < 0) throw new Error(`Missing declaration ${marker} in ${path}`);
  const end = content.indexOf('};', start);
  if (end < 0) throw new Error(`Missing record close for ${marker} in ${path}`);
  const body = content.slice(start, end);
  if (new RegExp(`(?:^|[,\\s])${key}:`).test(body)) throw new Error(`${key} already exists in ${path}`);
  content = `${content.slice(0, end).trimEnd()}, ${key}:${JSON.stringify(value)}${content.slice(end)}`;
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
const localesPattern = /export const locales = \[([^\]]*)\] as const;/;
const localesMatch = schema.match(localesPattern);
if (!localesMatch) throw new Error('Missing public locale declaration.');
const publicLocaleCodes = localesMatch[1].split(',').map((item) => item.trim().replace(/^['"]|['"]$/g, ''));
if (publicLocaleCodes.includes(locale)) throw new Error(`${locale} is already public in template-schema.ts.`);
schema = schema.replace(localesPattern, `export const locales = [${localesMatch[1]}, "${locale}"] as const;`);
const targetPattern = /export const targetLocales = \[([^\]]*)\] as const;/;
const targetMatch = schema.match(targetPattern);
if (!targetMatch) throw new Error('Missing target locale declaration.');
const targetBody = targetMatch[1].replace(new RegExp(`,\\s*["']${locale}["']`, 'g'), '');
schema = schema.replace(targetPattern, `export const targetLocales = [${targetBody}] as const;`);
if (targetBody.includes(`"${locale}"`)) throw new Error('Locale remains in target list after being published.');
fs.writeFileSync(schemaPath, schema, 'utf8');

const chromePath = 'src/lib/chrome-i18n.ts';
addInlineRecordEntry(chromePath, 'export const localeLabels: Record<Locale, string> = {', locale, localeLabels[locale]);
addRecordEntry(chromePath, 'export const ui: Record<Locale, Record<string, string>> = {', draft.ui);
addRecordEntry('src/lib/site-chrome-i18n.ts', 'export const chromeText: Record<Locale, SiteChromeText> = {', draft.chrome);
addRecordEntry('src/lib/document-content.ts', 'const copy: Record<Locale, Copy> = {', draft.documentContent.copy);
addRecordEntry('src/lib/document-content.ts', 'const specificCopy: Record<Locale, SpecificCopy> = {', draft.documentContent.specific);
addRecordEntry('src/lib/document-content.ts', 'const purposeFocusCopy: Record<Locale,string> = {', draft.documentContent.purposeFocus);
addRecordEntry('src/lib/document-content.ts', 'const recentLabels: Record<Locale,string> = {', draft.documentContent.recent);
addRecordEntry('src/lib/document-content.ts', 'const sectionLabels: Record<Locale, { overview: string;', draft.documentContent.sectionLabels);
addRecordEntry('src/lib/urls.ts', 'export const localeLanguageTags: Record<Locale, string> = {', locale);

console.log(`Connected ${locale} reviewed dictionaries and enabled its public locale routes. Production verification is still required.`);
