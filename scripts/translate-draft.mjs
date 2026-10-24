import { mkdir, readFile, writeFile } from "node:fs/promises";

// Free, anonymous MyMemory requests are limited to 5,000 source characters/day.
// This writes unpublished review drafts only; runtime locale data is untouched.
const [locale, section, mode] = process.argv.slice(2);
const refresh = mode === "--refresh";
const targets = new Set(["ru", "tr", "pl", "fil", "bn", "uk", "ms", "sv", "cs", "ro", "el"]);
if (!targets.has(locale) || section !== "fields") {
  throw new Error("Usage: node scripts/translate-draft.mjs <target-locale> fields");
}

const source = JSON.parse(await readFile("src/lib/document-translations.json", "utf8")).en;
const sourceValues = Object.keys(source.fields);
const outputPath = `docs/i18n-drafts/${locale}.json`;
await mkdir("docs/i18n-drafts", { recursive: true });
let draft = {};
try { draft = JSON.parse(await readFile(outputPath, "utf8")); } catch {}
draft.fields ??= {};
const todo = refresh ? sourceValues : sourceValues.filter((key) => !draft.fields[key]);
let cursor = 0;
let failures = [];
async function worker() {
  while (cursor < todo.length) {
    const key = todo[cursor++];
    const params = new URLSearchParams({ q: key, langpair: `en|${locale}` });
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?${params}`);
      const data = await response.json();
      const value = String(data.responseData?.translatedText ?? "").trim();
      if (!response.ok || data.responseStatus !== 200 || !value || value === key || /quota/i.test(value)) {
        failures.push({ key, error: data.responseDetails || `HTTP ${response.status}`, apiStatus: data.responseStatus });
      } else {
        draft.fields[key] = value;
      }
    } catch (error) {
      failures.push({ key, error: String(error) });
    }
    if (cursor % 10 === 0) {
      draft.source = "MyMemory free anonymous API; machine translation draft";
      draft.reviewStatus = "unreviewed; unpublished";
      draft.fieldsTranslated = Object.keys(draft.fields).length;
      draft.fieldsTotal = sourceValues.length;
      draft.failures = failures;
      await writeFile(outputPath, `${JSON.stringify(draft, null, 2)}\n`, "utf8");
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
draft.source = "MyMemory free anonymous API; machine translation draft";
draft.reviewStatus = "unreviewed; unpublished";
draft.fieldsTranslated = Object.keys(draft.fields).length;
draft.fieldsTotal = sourceValues.length;
draft.failures = failures;
await writeFile(outputPath, `${JSON.stringify(draft, null, 2)}\n`, "utf8");
console.log(`${locale}: ${draft.fieldsTranslated}/${draft.fieldsTotal} fields drafted; ${failures.length} failures; ${refresh ? "free translation refresh" : "draft"}; unpublished`);
