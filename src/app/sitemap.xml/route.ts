import { documents, locales } from "../../lib/registry";
import { docsUrl } from "../../lib/urls";

export function GET() {
  const entries = [
    ...locales.map((locale) => ({ url: docsUrl(locale), lastmod: "2026-10-15" })),
    ...documents.filter((doc) => doc.isPublic).flatMap((doc) => locales.filter((locale) => doc.supportedLocales.includes(locale)).map((locale) => ({ url: docsUrl(locale, doc.slug), lastmod: "2026-10-15" }))),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.map((entry) => `<url><loc>${entry.url}</loc><lastmod>${entry.lastmod}</lastmod></url>`).join("")}</urlset>`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
