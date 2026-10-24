import fs from 'node:fs';

const locales = ['ru', 'tr', 'pl', 'fil', 'bn', 'uk', 'ms', 'sv', 'cs', 'ro', 'el'];
let removedTags = 0;
function clean(value) {
  if (typeof value === 'string') {
    return value.replace(/<\/?(?:g|bx|ex)\b[^>]*>/gi, () => { removedTags += 1; return ''; });
  }
  if (Array.isArray(value)) return value.map(clean);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, clean(child)]));
  return value;
}
for (const locale of locales) {
  const path = `docs/i18n-drafts/${locale}.json`;
  const draft = clean(JSON.parse(fs.readFileSync(path, 'utf8')));
  fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
}
console.log(`Removed ${removedTags} raw translation markup tags from unpublished drafts.`);
