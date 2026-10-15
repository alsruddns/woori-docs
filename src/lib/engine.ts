import type { DocumentDefinition, Locale } from "./registry";
import { localizeField } from "./registry";

export function validateDocument(doc: DocumentDefinition, values: Record<string, string>) {
  return doc.fields.slice(0, 2).filter((field) => !values[field]?.trim());
}

export function renderDocumentText(doc: DocumentDefinition, values: Record<string, string>, locale: Locale) {
  return doc.fields.map((field) => `${localizeField(field, locale)}\n${values[field]?.trim() || "—"}`).join("\n\n");
}
