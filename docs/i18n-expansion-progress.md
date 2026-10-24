# 26-Language Expansion Progress

## Project and scope

- Project: Woori Docs (`woori-docs`)
- Working branch: `develop`
- Existing supported locales: `ko`, `en`, `ja`, `zh`, `es`, `pt-br`, `de`, `fr`, `vi`, `id`, `th`, `zh-tw`, `it`, `nl`, `hi` (15)
- Requested additions: `ru`, `tr`, `pl`, `fil`, `bn`, `uk`, `ms`, `sv`, `cs`, `ro`, `el` (11)
- Explicit exclusions: `ar`, `ur`, `fa`, `he`
- Existing document translation dataset contains 119 title entries, 425 field-label entries, and 9 interface-content entries for each of the 15 supported locales.
- Public document count: 119 (source dataset; verify again against the runtime registry before publishing any locale).
- Required per-locale coverage includes document titles and descriptions; generated body content; category names and section/contents headings; search and empty-state UI; copy, print, and download actions; usage guides, writing tips, and FAQs; and page metadata.

## New-locale rollout status

No new locale is currently registered or published. This intentionally keeps incomplete translations out of routes, language selectors, canonical/hreflang output, and sitemap.

The locale model now distinguishes the 26-entry `targetLocales` / `TargetLocale` expansion scope from the existing 15-entry `locales` / `Locale` public scope. `LocalizedText` accepts target-locale keys, while routes and publication-facing dictionaries remain restricted to `Locale`. Runtime helpers identify target locales and report new targets as pending. New language dictionaries and content translations have not yet been added.

Client components receive a server-selected locale payload for the active route. They no longer import the complete chrome, category, or custom-editor translation dictionaries. The language picker still receives the small list of published locale labels.

| Locale | Titles | Fields | Common UI | Content | UI/routing/SEO | Public pages |
|---|---:|---:|---:|---:|---|---:|
| ru | 0/119 reviewed (119 draft) | 0/425 reviewed (425 draft) | 0 reviewed (56 draft) | 0 body (14 category drafts) | pending | 0 |
| tr | 0/119 | 0/425 | 0 | 0 | pending | 0 |
| pl | 0/119 | 0/425 | 0 | 0 | pending | 0 |
| fil | 0/119 | 0/425 | 0 | 0 | pending | 0 |
| bn | 0/119 | 0/425 | 0 | 0 | pending | 0 |
| uk | 0/119 | 0/425 | 0 | 0 | pending | 0 |
| ms | 0/119 | 0/425 | 0 | 0 | pending | 0 |
| sv | 0/119 | 0/425 | 0 | 0 | pending | 0 |
| cs | 0/119 | 0/425 | 0 | 0 | pending | 0 |
| ro | 0/119 | 0/425 | 0 | 0 | pending | 0 |
| el | 0/119 | 0/425 | 0 | 0 | pending | 0 |

## SEO and public-page validation

- New-locale canonical/hreflang: not enabled; no complete new-locale content is available.
- New-locale sitemap entries: 0.
- Existing locales and SEO behavior: not changed by this tracking update.

## Russian translation draft

- `docs/i18n-drafts/ru.json` contains draft translations for all 119 document titles, 425 distinct field labels, 9 document interface strings, 14 categories, and 47 shared UI strings. Title, UI, category, and interface drafts were written directly; 421 field labels came from the free anonymous MyMemory API and 4 failed responses were filled as draft wording manually.
- This is not counted as reviewed or complete. Standalone machine translations include context-sensitive wording that needs review against each form (for example, field labels such as “Closing”, “Provider”, and “Due date”). The draft is not imported by runtime code and is not exposed in routes, selectors, metadata, or sitemap.
- The draft-generation helper is `scripts/translate-draft.mjs`. It calls only the free anonymous endpoint without credentials or an email address. The service documents a 5,000-character daily anonymous limit and a 500-byte request limit. No paid translation or AI API was used.

## Last verification

- `pnpm lint`: passed after adding the Russian draft helper.
- `pnpm exec tsc --noEmit`: passed after adding the Russian draft helper.
- `pnpm exec vitest run --testTimeout 30000`: passed; 4 test files, 24 tests, including exact Russian draft key coverage, no English copies, placeholder preservation, and unpublished status.
- `pnpm build`: passed; 1,822 existing localized document pages generated. No new locales were routed or published.
- `pnpm lint`: passed after the selected-locale client payload change.
- `pnpm build`: passed after the selected-locale client payload change; 1,822 existing localized routes were generated.
- `pnpm exec tsc --noEmit`: passed after the selected-locale client payload change.
- `pnpm exec vitest run --testTimeout 30000`: passed after the selected-locale client payload change; 3 test files, 22 tests.
- Added a regression test for the 26-target / 15-public split, pending publication state, and exclusions.
- Expanded public-locale coverage tests for search, copy/print/download UI, generated section headings, guides, and FAQ content; added a check that client components do not import full locale dictionaries.
- `pnpm test` with the default 5-second per-test timeout: 19 passed, 1 timed out during the 1,822-page content-quality audit. The same suite passed with a 30-second timeout; no test assertion failed.
- The existing 15-locale sitemap and registry tests passed. No new-locale SEO or route checks can pass until complete translations exist and the locale is wired.

## Next start point

Continue with `ru`: review the current title, field, category, interface, and shared UI drafts; translate the generated guidance/FAQ/SEO copy, select options, table labels, editor and site chrome; then wire and verify the complete locale. The anonymous translation endpoint has exhausted today's source-character allowance after the Russian field-label batch; continue without paid APIs. Only publish after the complete locale passes route, selector, alternate, sitemap, test, lint, type, and production-build checks. Then proceed to `tr` in the requested order.
