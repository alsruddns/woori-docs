# UI guidelines

- Use a calm, trustworthy document-workbench visual style: warm white paper, pale green canvas, dark readable text, restrained green actions, and clear field borders.
- Desktop layouts may show the editor beside the document preview. On small screens, stack the editor and preview; keep category navigation reachable.
- Keep the shared header, woori.today identity, Family Sites control, locale selector, desktop category sidebar, search, breadcrumbs, cards, buttons, toast, contact modal, and footer consistent across routes.
- Family Sites order: Portal, Calculator, Online tools, Shared household ledger, Docs, Quiz. The trigger label is always “Family Sites” in the selected locale. Open destinations in a new tab and preserve the current locale for this service.
- Preserve the sidebar scroll position across document navigation using `sessionStorage` key `woori-docs:sidebar-scroll` where the persistent layout does not retain it.
- Show a privacy notice beside document inputs. Keep drafts local and provide clear, copy, print/PDF, and text-download actions.
- Printing should print only the document preview. Ads are disabled by default; while disabled, show no ad copy, placeholder, or empty ad region.
- Prefer semantic headings, visible focus rings, keyboard-operable controls, descriptive labels, and responsive spacing. Avoid decorative content that looks interactive.
