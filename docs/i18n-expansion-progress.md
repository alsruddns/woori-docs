# 26-Language Expansion Progress

## Scope and baseline

- Project: Woori Docs (`woori-docs`); working branch: `develop`.
- Existing supported locales: `ko`, `en`, `ja`, `zh`, `es`, `pt-br`, `de`, `fr`, `vi`, `id`, `th`, `zh-tw`, `it`, `nl`, `hi` (15).
- Requested additions in order: `ru`, `tr`, `pl`, `fil`, `bn`, `uk`, `ms`, `sv`, `cs`, `ro`, `el` (11). Excluded: `ar`, `ur`, `fa`, `he`.
- Runtime registry has 119 public documents. Translation scope per new locale: 699 keyed units (119 titles, 425 field labels, 9 document-interface strings, 14 categories, 47 shared UI strings, 18 site-chrome entries, 33 editor strings, 34 generated document/guide/FAQ strings). One chrome entry is intentionally empty; there are 701 non-empty visible text values across 702 leaves.
- Russian, Turkish, Polish, Filipino, Bengali, Ukrainian, and Malay are public. Each public locale has 119 document routes plus its library route (120 sitemap URLs). Current public locales: 22; target locales: 26.
- Offline machine translation is used only to prepare unpublished drafts; there are no paid translation or AI API calls. Draft completeness checks verify shape, non-empty values, changed text, markup, and interpolation tokens, but do not establish linguistic quality.

## Per-locale status

`Draft` is a structurally complete machine draft, not an editorially reviewed translation or a public locale. Public page counts include the library route.

| Locale | Draft coverage (units) | Reviewed units | UI/routes/SEO | Public pages |
|---|---:|---:|---|---:|
| ru | 699/699 | 699/699 | complete; runtime tests and build previously passed | 120 |
| tr | 699/699 | 699/699 | complete; production routes, locale HTML language, canonical/hreflang, sitemap, tests, and build verified | 120 |
| pl | 699/699 | 699/699 | complete; production routes, locale HTML language, canonical/hreflang, sitemap, tests, mobile UI, and build verified | 120 |
| fil | 699/699 | 699/699 | complete; production routes, locale HTML language, canonical/hreflang, sitemap, tests, mobile UI, and build verified | 120 |
| bn | 699/699 | 699/699 | complete; production routes, locale HTML language, canonical/hreflang, sitemap, tests, mobile UI, and build verified; pushed as `058e193` | 120 |
| uk | 699/699 | 699/699 | complete; production routes, locale HTML language, canonical/hreflang, sitemap, tests, mobile UI, and build verified | 120 |
| ms | 699/699 | 699/699 | complete; production routes, locale HTML language, canonical/hreflang, sitemap, tests, mobile UI, and build verified | 120 |
| sv | 699/699 | 0/699 | draft only; unpublished | 0 |
| cs | 699/699 | 0/699 | draft only; unpublished | 0 |
| ro | 699/699 | 0/699 | draft only; unpublished | 0 |
| el | 699/699 | 0/699 | draft only; unpublished | 0 |

## Current verification

- Ukrainian and Malay are complete at 699/699 reviewed units and public on `develop`. Each has 119 document routes plus its library route. The remaining four locale drafts pass structural checks only; sampled machine wording remains unsuitable for publication.

- Draft audit (`node scripts/audit-translation-drafts.mjs <English-source.json>`): remaining unpublished locale drafts have 0 missing keys, 0 empty values, 0 exact-English copies, and 0 interpolation-token mismatches. This structural audit does not establish linguistic quality.
- Repeated-word cleanup removed 27 obvious runs such as duplicated UI labels; the draft test now rejects three-or-more consecutive duplicate words. This mechanical cleanup does not count as editorial review.
- `pnpm exec tsc --noEmit`: passed.
- `pnpm exec vitest run --testTimeout 30000`: latest run passed, 42 tests across 5 files, including Ukrainian and Malay locale/runtime/SEO coverage, Bengali locale/runtime coverage, and responsive CSS coverage.
- `pnpm lint`: passed.
- Turkish production smoke check: `/tr/docs` and `/tr/docs/resume-template` returned 200; rendered `<html lang="tr">`, Turkish canonical and hreflang, localized page title/content; sitemap has 2,040 total URLs including 120 Turkish URLs.
- Latest production build after Turkish wiring: passed; generated 2,064 routes using the existing static/partial-prerender strategy. (The 2,064 Next route entries include generated static and partial-prerender route variants; the sitemap lists 2,040 URLs.)
- Latest production build after Polish wiring: passed; generated 2,185 static/partial-prerender route entries. Polish production smoke checks returned 200 for `/pl/docs` and `/pl/docs/resume-template`; verified `<html lang="pl">`, Polish canonical/hreflang/title/field/UI content, 120 Polish sitemap URLs, and 2,160 total sitemap URLs.
- Latest production build after Filipino wiring: passed; generated 2,306 static/partial-prerender route entries. Filipino production smoke checks returned 200 for `/fil/docs` and `/fil/docs/resume-template`; verified `<html lang="fil">`, localized canonical/hreflang/title/field/UI, 120 Filipino sitemap URLs, 2,280 total sitemap URLs, and CSS served through the Docker/Nginx asset path.
- Latest production build after Bengali wiring: passed; generated 2,427 static/partial-prerender route entries. Bengali production smoke checks returned 200 for `/bn/docs` and `/bn/docs/resume-template`; verified `<html lang="bn">`, localized canonical/hreflang/title/field/UI, 120 Bengali sitemap URLs, 2,400 total sitemap URLs, and CSS served through the Docker/Nginx asset path. At a 390×844 mobile viewport, the selector remains inside the header and document cards render in one column.
- Latest production build after Ukrainian wiring: passed; generated 2,548 static/partial-prerender route entries. Production smoke checks returned 200 for `/uk/docs` and `/uk/docs/resume-template`; verified `<html lang="uk">`, canonical and `hrefLang="uk"`, localized title, field and UI, 120 Ukrainian sitemap URLs, 2,520 total sitemap URLs, and CSS served. Mobile inspection at 390×844 showed the localized header, category navigation, search, and single-column document cards.
- Latest production build after Malay wiring: passed; generated 2,669 static/partial-prerender route entries. Production smoke checks returned 200 for `/ms/docs` and `/ms/docs/resume-template`; verified `<html lang="ms">`, canonical and `hrefLang="ms"`, Malay title, field and UI strings, 120 Malay sitemap URLs, 2,640 total sitemap URLs, and CSS served. At a true 390×844 mobile viewport, the language selector stayed within the header (`x=238..378`) with no horizontal page overflow; cards rendered in one column.
- `pnpm exec tsc --noEmit`: passed after Malay route/layout changes.
- Translation quality: four offline drafts remain unreviewed; sampled machine output is unnatural or incorrect, so they remain excluded from UI, selectors, routes, SEO, and sitemap. Structural completeness is not a language-quality signoff.
- Mobile visual inspection used a 390 × 844 CSS viewport in Edge with the production asset path. Polish and Filipino selectors stay inside the header, document cards render in one column, and mobile navigation scrolls horizontally.

## Next start point

Turkish is public at `9cf3f86`; Polish, Filipino, Bengali, and Ukrainian have passed production verification on `develop`. Begin Swedish (`sv`) review next. Four locales remain before the 26-locale release gate. Do not merge/deploy to `main` before all 26 locales meet the release conditions.
