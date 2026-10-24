# 26-Language Expansion Progress

## Scope and baseline

- Project: Woori Docs (`woori-docs`); working branch: `develop`.
- Existing supported locales: `ko`, `en`, `ja`, `zh`, `es`, `pt-br`, `de`, `fr`, `vi`, `id`, `th`, `zh-tw`, `it`, `nl`, `hi` (15).
- Requested additions in order: `ru`, `tr`, `pl`, `fil`, `bn`, `uk`, `ms`, `sv`, `cs`, `ro`, `el` (11). Excluded: `ar`, `ur`, `fa`, `he`.
- Runtime registry has 119 public documents. Translation scope per new locale: 699 keyed units (119 titles, 425 field labels, 9 document-interface strings, 14 categories, 47 shared UI strings, 18 site-chrome entries, 33 editor strings, 34 generated document/guide/FAQ strings). One chrome entry is intentionally empty; there are 701 non-empty visible text values across 702 leaves.
- Russian is the only new locale currently public. Its 119 documents plus library route yield 120 sitemap URLs. Total public locales: 16; target locales: 26.
- Offline machine translation is used only to prepare unpublished drafts; there are no paid translation or AI API calls. Draft completeness checks verify shape, non-empty values, changed text, markup, and interpolation tokens, but do not establish linguistic quality.

## Per-locale status

`Draft` is a structurally complete machine draft, not an editorially reviewed translation or a public locale. Public page counts include the library route.

| Locale | Draft coverage (units) | Reviewed units | UI/routes/SEO | Public pages |
|---|---:|---:|---|---:|
| ru | 699/699 | 699/699 | complete; runtime tests and build previously passed | 120 |
| tr | 699/699 | 0/699 | draft only; unpublished | 0 |
| pl | 699/699 | 0/699 | draft only; unpublished | 0 |
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
- `pnpm exec vitest run --testTimeout 30000`: passed, 30 tests across 4 files.
- `pnpm lint`: passed.
- `pnpm build`: passed after the latest Russian placeholder correction; compiled successfully and generated 1,943 routes using the existing static/partial-prerender strategy.
- Translation quality: the ten offline drafts are unreviewed and sample inspection found unnatural or incorrect machine output. They remain excluded from UI, selectors, routes, SEO, and sitemap. Structural completeness is not a language-quality signoff.
- Mobile-specific visual browser automation is not configured; responsive layout has not been visually inspected in this continuation.

## Next start point

Continue in the requested order with Turkish editorial review of all 699 units. Correct mistranslations and unnatural text against the English source, then validate runtime payload, locale selection, route, canonical/hreflang, sitemap, functionality, tests, lint, TypeScript, and production build before publishing Turkish. Proceed to Polish only after Turkish meets those checks. Do not expose any unpublished draft or merge/deploy to `main` before all 26 locales meet the release conditions.
