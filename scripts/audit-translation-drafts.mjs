import fs from 'node:fs';

const locales = ["tr", "pl", "fil", "bn", "uk", "ms", "sv", "cs", "ro", "el"];
const en = JSON.parse(fs.readFileSync("src/lib/document-translations.json", "utf8")).en;
const categories = JSON.parse(fs.readFileSync("src/lib/category-translations.json", "utf8")).en;
const editor = JSON.parse(fs.readFileSync("src/lib/editor-translations.json", "utf8")).en;
const source = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const flatten = (value, prefix = "", output = {}) => {
  if (Array.isArray(value)) value.forEach((child, index) => flatten(child, `${prefix}[${index}]`, output));
  else if (value && typeof value === "object") Object.entries(value).forEach(([key, child]) => flatten(child, prefix ? `${prefix}.${key}` : key, output));
  else output[prefix] = value;
  return output;
};
const tokens = (value) => [...String(value).matchAll(/\{\w+\}/g)].map(([token]) => token).sort().join("|");
for (const locale of locales) {
  const draft = JSON.parse(fs.readFileSync(`docs/i18n-drafts/${locale}.json`, "utf8"));
  const expected = { ...en, categories, ui: source.ui, chrome: source.chrome, editor, documentContent: source.documentContent };
  const missing = [];
  const empty = [];
  const sameAsEnglish = [];
  const tokenMismatches = [];
  const tokenDetails = [];
  for (const [section, expectedValues] of Object.entries(expected)) {
    const sourceFlat = flatten(expectedValues);
    const actualFlat = flatten(draft[section] ?? {});
    for (const [key, sourceValue] of Object.entries(sourceFlat)) {
      if (!(key in actualFlat)) missing.push(`${section}.${key}`);
      else if (typeof actualFlat[key] === "string") {
        if (!actualFlat[key].trim() && sourceValue) empty.push(`${section}.${key}`);
        if (sourceValue && actualFlat[key].trim() === String(sourceValue).trim()) sameAsEnglish.push(`${section}.${key}`);
        if (tokens(sourceValue) !== tokens(actualFlat[key])) {
          tokenMismatches.push(`${section}.${key}`);
          tokenDetails.push({ key: `${section}.${key}`, expected: tokens(sourceValue), actual: tokens(actualFlat[key]), value: actualFlat[key] });
        }
      }
    }
  }
  console.log(JSON.stringify({ locale, reviewStatus: draft.reviewStatus, missing: missing.length, empty: empty.length, sameAsEnglish: sameAsEnglish.length, exactEnglishPaths: sameAsEnglish, tokenMismatches: tokenMismatches.length, samples: { missing: missing.slice(0, 3), empty: empty.slice(0, 3), tokenMismatches: tokenDetails.slice(0, 4) } }));
}
