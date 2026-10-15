# woori.today Docs

Docs (`문서양식`) is a browser-first document-template service at `/docs`. Users can fill in a template, preview it, copy its text, print it, or download a text file. Document entries stay in the browser and are saved in localStorage.

## Development

- Run `pnpm dev` on port 3004.
- Run checks with `pnpm test`, `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm build`.
- The localized library routes are `/docs/{locale}` for `ko`, `en`, `ja`, `zh`, `es`, `pt-br`, `de`, `fr`, `vi`, `id`, `th`, `zh-tw`, `it`, `nl`, and `hi`.
- The registry-generated sitemap is `/docs-sitemap.xml`.
- Production Docker image uses standalone output on port 3004; Nginx routes `/docs/` and the public sitemap endpoint.
- Browser print provides PDF export; text files are available as a direct download. Word and Excel export are not implemented yet.

## Service documentation

- [Common service rules](docs/common-rules.md)
- [UI guidelines](docs/ui-guidelines.md)
- [Service catalog](docs/service-catalog.md)

Every new public feature must be added to `src/lib/registry.ts` and `docs/service-catalog.md` together.

## Branch policy

- `main` is production; `develop` is development.
- Start all regular work from `develop`. Verify changes, commit and push `develop`, merge and push `main`, then return to `develop`.
- Do not create or use a `release` branch.
