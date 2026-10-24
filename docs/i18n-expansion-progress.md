# 26-Language Expansion Progress

## Scope and baseline

- Project: Woori Docs (`woori-docs`); working branch: `develop`.
- Existing supported locales: `ko`, `en`, `ja`, `zh`, `es`, `pt-br`, `de`, `fr`, `vi`, `id`, `th`, `zh-tw`, `it`, `nl`, `hi` (15).
- Requested additions in order: `ru`, `tr`, `pl`, `fil`, `bn`, `uk`, `ms`, `sv`, `cs`, `ro`, `el` (11). Excluded: `ar`, `ur`, `fa`, `he`.
- Runtime registry has 119 public documents. Translation scope per new locale: 699 keyed units (119 titles, 425 field labels, 9 document-interface strings, 14 categories, 47 shared UI strings, 18 site-chrome entries, 33 editor strings, 34 generated document/guide/FAQ strings). One chrome entry is intentionally empty; there are 701 non-empty visible text values across 702 leaves.
- Russian and Turkish are public. Each has 119 document routes plus its library route (120 sitemap URLs). Total public locales: 17; target locales: 26.
- Offline machine translation is used only to prepare unpublished drafts; there are no paid translation or AI API calls. Draft completeness checks verify shape, non-empty values, changed text, markup, and interpolation tokens, but do not establish linguistic quality.

## Per-locale status

`Draft` is a structurally complete machine draft, not an editorially reviewed translation or a public locale. Public page counts include the library route.

| Locale | Draft coverage (units) | Reviewed units | UI/routes/SEO | Public pages |
|---|---:|---:|---|---:|
| ru | 699/699 | 699/699 | complete; runtime tests and build previously passed | 120 |
| tr | 699/699 | 699/699 | complete; production routes, locale HTML language, canonical/hreflang, sitemap, tests, and build verified | 120 |
| pl | 699/699 | 544/699 | all titles and field labels reviewed; 155 units remain; runtime/SEO not connected; unpublished | 0 |
| fil | 699/699 | 0/699 | draft only; unpublished | 0 |
| bn | 699/699 | 0/699 | draft only; unpublished | 0 |
| uk | 699/699 | 0/699 | draft only; unpublished | 0 |
| ms | 699/699 | 0/699 | draft only; unpublished | 0 |
| sv | 699/699 | 0/699 | draft only; unpublished | 0 |
| cs | 699/699 | 0/699 | draft only; unpublished | 0 |
| ro | 699/699 | 0/699 | draft only; unpublished | 0 |
| el | 699/699 | 0/699 | draft only; unpublished | 0 |

## Current verification

- Draft audit (`node scripts/audit-translation-drafts.mjs <English-source.json>`): all 10 unpublished locales have 0 missing keys, 0 empty values, 0 exact-English copies, and 0 interpolation-token mismatches.
- Repeated-word cleanup removed 27 obvious runs such as duplicated UI labels; the draft test now rejects three-or-more consecutive duplicate words. This mechanical cleanup does not count as editorial review.
- `pnpm exec tsc --noEmit`: passed.
- `pnpm exec vitest run --testTimeout 30000`: latest run passed, 33 tests across 5 files, including partial-review tracking and responsive CSS coverage.
- `pnpm lint`: passed.
- Turkish production smoke check: `/tr/docs` and `/tr/docs/resume-template` returned 200; rendered `<html lang="tr">`, Turkish canonical and hreflang, localized page title/content; sitemap has 2,040 total URLs including 120 Turkish URLs.
- Latest production build after Turkish wiring: passed; generated 2,064 routes using the existing static/partial-prerender strategy. (The 2,064 Next route entries include generated static and partial-prerender route variants; the sitemap lists 2,040 URLs.)
- `pnpm exec tsc --noEmit`: passed after Turkish route/layout changes.
- Translation quality: the ten offline drafts are unreviewed and sample inspection found unnatural or incorrect machine output. They remain excluded from UI, selectors, routes, SEO, and sitemap. Structural completeness is not a language-quality signoff.
- Mobile visual inspection at a 390 × 844 viewport found the document grid reduced to one column. The language selector still appeared clipped at the viewport edge; a fixed-width selector adjustment is being rechecked before the Turkish commit.

## Next start point

Turkish is connected and public at `9cf3f86` on `origin/develop`; the mobile selector has an explicit 140px width, but the final post-build visual confirmation still needs a fresh browser capture. Polish has 544/699 editorially reviewed units (119 titles and 425 field labels); continue with its 9 document-interface strings, 14 categories, 47 shared UI strings, 18 site-chrome entries, 33 editor strings, and 34 generated-content strings before runtime wiring. Do not expose any unpublished draft or merge/deploy to `main` before all 26 locales meet the release conditions.
