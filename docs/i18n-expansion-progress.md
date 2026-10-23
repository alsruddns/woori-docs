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

| Locale | Titles | Fields | Common UI | Content | UI/routing/SEO | Public pages |
|---|---:|---:|---:|---:|---|---:|
| ru | 0/119 | 0/425 | 0 | 0 | pending | 0 |
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

## Last verification

- `pnpm lint`: passed after the locale-model change.
- `pnpm build`: passed after the locale-model change; 1,822 existing localized routes were generated.
- `pnpm exec vitest run --testTimeout 30000`: passed after the locale-model change; 3 test files, 21 tests.
- Added a regression test for the 26-target / 15-public split, pending publication state, and exclusions.
- Expanded public-locale coverage tests for search, copy/print/download UI, generated section headings, guides, and FAQ content.
- `pnpm test` with the default 5-second per-test timeout: 19 passed, 1 timed out during the 1,822-page content-quality audit. The same suite passed with a 30-second timeout; no test assertion failed.
- The existing 15-locale sitemap and registry tests passed. No new-locale SEO or route checks can pass until complete translations exist and the locale is wired.

## Next start point

Start with `ru`. Translate and review the shared UI, all 119 document titles, all 425 field labels, generated document guidance/SEO content, category labels, select options, table labels, and metadata. Only then wire and validate its routes, selector, alternates, sitemap, and production build. Continue in the requested order.
