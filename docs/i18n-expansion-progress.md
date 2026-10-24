# 26-Language Expansion Progress

## Project and scope

- Project: Woori Docs (`woori-docs`)
- Working branch: `develop`
- Existing supported locales: `ko`, `en`, `ja`, `zh`, `es`, `pt-br`, `de`, `fr`, `vi`, `id`, `th`, `zh-tw`, `it`, `nl`, `hi` (15)
- Requested additions: `ru`, `tr`, `pl`, `fil`, `bn`, `uk`, `ms`, `sv`, `cs`, `ro`, `el` (11)
- Explicit exclusions: `ar`, `ur`, `fa`, `he`
- Existing document translation dataset contains 119 title entries, 425 field-label entries, and 9 interface-content entries for each of the 15 supported locales.
- Public document count: 119 (verified runtime registry). Russian currently exposes 120 sitemap URLs: one library page and 119 document pages.
- Required per-locale coverage includes document titles and descriptions; generated body content; category names and section/contents headings; search and empty-state UI; copy, print, and download actions; usage guides, writing tips, and FAQs; and page metadata.

## New-locale rollout status

Russian (ru) is the first published addition. The public locale set has 16 locales; the target set remains 26. The other ten requested additions remain pending and are excluded from routes, selectors, canonical/hreflang output, and sitemap. The explicit exclusions remain outside the target set.

The locale model keeps the target expansion scope separate from publication. Client components receive only the active locale payload; they do not load all translation dictionaries.

| Locale | Titles | Fields | Common UI | Content | UI/routing/SEO | Public pages |
|---|---:|---:|---:|---:|---|---:|
| ru | 119/119 reviewed | 425/425 reviewed | 107/107 reviewed | 48/48 reviewed (34 generated copy + 14 categories) | complete and verified | 120 |
| tr | 0/119 | 425/425 machine draft, 0 reviewed | 0 | 0 | unpublished | 0 |
| pl | 0/119 | 0/425 | 0 | 0 | pending | 0 |
| fil | 0/119 | 0/425 | 0 | 0 | pending | 0 |
| bn | 0/119 | 0/425 | 0 | 0 | pending | 0 |
| uk | 0/119 | 0/425 | 0 | 0 | pending | 0 |
| ms | 0/119 | 0/425 | 0 | 0 | pending | 0 |
| sv | 0/119 | 0/425 | 0 | 0 | pending | 0 |
| cs | 0/119 | 0/425 | 0 | 0 | pending | 0 |
| ro | 0/119 | 0/425 | 0 | 0 | pending | 0 |
| el | 0/119 | 0/425 | 0 | 0 | pending | 0 |

Translation scope per locale: 699 units (119 titles, 425 field labels, 9 document interface strings, 14 categories, 47 shared UI strings, 18 site-chrome strings, 33 editor strings, and 34 generated content strings).

## SEO and public-page validation

- Russian canonical URLs and hreflang alternates are enabled and covered by tests.
- The sitemap includes the Russian library URL and all 119 public document URLs (120 total).
- Build generated 1,943 static/partial-prerender routes across the 16 public locales. Existing static generation and cache behavior remain in place.
- Runtime UI, language selection, public document routing, metadata, sitemap, and generated content have Russian coverage.

## Russian translation draft

- docs/i18n-drafts/ru.json holds the reviewed Russian source set: 119 titles, 425 field labels, 9 interface strings, 14 categories, 47 shared UI strings, 18 site-chrome strings, 33 editor strings, and 34 generated document/guide/FAQ/section strings.
- All Russian values are connected to the public runtime dictionaries. Draft quality checks reject missing keys, English copies, damaged Unicode, raw translation markup, and malformed interpolation tokens.
- 421 field labels were initially translated with the free anonymous MyMemory endpoint and then reviewed; 4 labels were written manually. No paid translation or AI API was used.
- The draft helper is scripts/translate-draft.mjs; it uses no credentials and the anonymous free endpoint only.

## Last verification

- pnpm exec tsc --noEmit: passed.
- pnpm exec vitest run --testTimeout 30000: passed, 28 tests across 4 files, including Russian runtime coverage and Turkish partial-draft key coverage.
- pnpm lint: passed.
- pnpm build: passed; Next.js generated 1,943 static/partial-prerender routes. The Russian locale contributes 120 sitemap URLs.
- Mobile-specific visual automation is not configured in the current test suite; responsive components use the existing responsive layout and have not been visually browser-tested in this run.
- Russian runtime rollout is committed and pushed as `c158973`. The Turkish field draft and its coverage test are in progress on `develop`.

## Next start point

Turkish has a 425/425 field-label machine draft saved in `docs/i18n-drafts/tr.json`; 422 came from the free anonymous MyMemory endpoint and 3 API echoes were manually translated. The batch has not been editorially reviewed and must not be published. Continue with Turkish titles (119), document interface strings (9), categories (14), shared UI (47), site chrome (18), editor controls (33), and generated document content (34); then review the complete 699-unit set before runtime wiring. Keep `pl`, `fil`, `bn`, `uk`, `ms`, `sv`, `cs`, `ro`, and `el` pending. Only publish after route, selector, alternate, sitemap, test, lint, type, and production-build checks pass.
