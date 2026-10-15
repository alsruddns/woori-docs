import type { DocumentTemplate as DocumentDefinition, Locale } from "./template-schema";

export function validateDocument(doc: DocumentDefinition, values: Record<string, string>) {
  return doc.fields.filter((field) => field.required && !values[field.id]?.trim()).map((field) => field.id);
}

export function renderDocumentText(doc: DocumentDefinition, values: Record<string, string>, locale: Locale) {
  const sections = doc.fields.map((field) => `${field.label}\n${values[field.id]?.trim() || "\u2014"}`);
  for (const table of doc.tables ?? []) {
    let rows: Record<string, string>[] = [];
    try { rows = values[`table:${table.id}`] ? JSON.parse(values[`table:${table.id}`]) as Record<string, string>[] : []; } catch { /* Ignore malformed local draft rows. */ }
    const calculations = table.calculations;
    const vatRate = calculations?.vatRateFieldId ? Number(values[calculations.vatRateFieldId] ?? 10) / 100 : calculations?.vatRate || 0;
    const subtotal = rows.reduce((sum, row) => sum + (calculations?.quantityColumn && calculations.unitPriceColumn ? Number(row[calculations.quantityColumn] || 0) * Number(row[calculations.unitPriceColumn] || 0) : Number(row[calculations?.amountColumn || ""] || 0)), 0);
    const entries = rows.map((row) => table.columns.map((column) => {
      const amount = column.id === calculations?.amountColumn && calculations.quantityColumn && calculations.unitPriceColumn ? Number(row[calculations.quantityColumn] || 0) * Number(row[calculations.unitPriceColumn] || 0) : row[column.id] ?? "";
      return `${column.label}: ${typeof amount === "number" ? amount.toLocaleString(locale) : amount}`;
    }).join(" | "));
    if (calculations?.subtotal) entries.push(`${table.summaryLabels?.subtotal || "Subtotal"}: ${subtotal.toLocaleString(locale)}`, `${table.summaryLabels?.vat || "VAT"}: ${(subtotal * vatRate).toLocaleString(locale)}`, `${table.summaryLabels?.total || "Total"}: ${(subtotal * (1 + vatRate)).toLocaleString(locale)}`);
    sections.push(`${table.label}\n${entries.join("\n")}`);
  }
  return sections.join("\n\n");
}
