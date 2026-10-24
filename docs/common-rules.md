# woori.today service common rules

## Product and engineering

- A service is browser-first and frontend-only until a separately approved product decision says otherwise. Document content must never be submitted to a server, an API, or analytics, and must never be placed in a URL or query string.
- Keep a single registry as the source of truth for public status, locale support, policy review, formats, keywords, and related services. Every new public feature must be recorded in `docs/service-catalog.md` in the same change.
- Use Next.js App Router, TypeScript, Tailwind CSS, pnpm, ESLint, Vitest, and the established Docker/Nginx deployment shape.
- Start all ordinary work on `develop`. Verify changes, commit and push to `develop`, merge `develop` into `main`, push `main`, then return to `develop`. Do not create a release branch.
- Preserve existing user changes and never force-push.

## Localization and accessibility

- Supported locale identifiers are `ko`, `en`, `ja`, `zh`, `es`, `pt-br`, `de`, `fr`, `vi`, `id`, `th`, `zh-tw`, `it`, `nl`, `hi`, `ru`, `tr`, `pl`, `fil`, and `bn`.
- A locale is complete only when public UI, navigation, document names, fields, help text, metadata, and validation messages are translated and reviewed. English fallback does not count as translation completion.
- Keep controls keyboard accessible, label inputs, expose status updates, and retain readable contrast and responsive layouts.

## Privacy, policies, and ads

- Display the browser-only privacy notice where users enter document data. Store drafts locally and provide an obvious clear action.
- Do not make legal-effect, tax-compliance, or jurisdiction-specific claims. Legal and official-document templates need policy review or must remain closed.
- Keep `NEXT_PUBLIC_ADS_ENABLED=false` by default. Before approval, render no ad wording, placeholder, or reserved blank space.
- Keep contact details and family-site ordering consistent with the shared service rules. The contact address is `krdd125@gmail.com`.

## SEO and testing

- Each public localized page needs a unique title and description, H1, canonical, hreflang alternates, a useful guide, examples, FAQ, and registry-based related documents.
- Generate `/docs-sitemap.xml` from the registry. Include localized public detail routes and each localized index route; never hardcode the count.
- Cover registry consistency, locale completeness, labels, catalog, sitemap, metadata, validation, preview rendering, and browser-only boundaries in tests.
