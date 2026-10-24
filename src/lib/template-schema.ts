export const categories = ["work", "finance", "hr-admin", "project-management", "development-it", "sales-customer", "inventory-logistics", "education", "personal", "health-fitness", "travel", "checklists", "planning", "records"] as const;
export type Category = (typeof categories)[number];
/** Locales with complete content that may appear in routes, selectors, metadata, and sitemaps. */
export const locales = ["ko", "en", "ja", "zh", "es", "pt-br", "de", "fr", "vi", "id", "th", "zh-tw", "it", "nl", "hi", "ru", "tr", "pl", "fil", "bn", "uk", "ms", "sv", "cs"] as const;
export type Locale = (typeof locales)[number];

/** Full expansion scope; adding a target here does not publish it. */
export const targetLocales = [...locales, "ro", "el"] as const;
export type TargetLocale = (typeof targetLocales)[number];

export function isTargetLocale(value: string): value is TargetLocale {
  return (targetLocales as readonly string[]).includes(value);
}

export function isPublicLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localePublicationState(locale: TargetLocale): "published" | "pending" {
  return isPublicLocale(locale) ? "published" : "pending";
}

export type TemplateFieldType = "text" | "textarea" | "number" | "date" | "time" | "checkbox" | "select" | "currency" | "percent" | "email" | "tel";
export type LocalizedText = Partial<Record<TargetLocale, string>>;
export type TemplateOption = { value: string; label: LocalizedText };
export type TemplateField = {
  id: string;
  label: string;
  type: TemplateFieldType;
  required?: boolean;
  placeholder?: LocalizedText;
  options?: TemplateOption[];
  defaultValue?: string | number | boolean;
};
export type TemplateTableColumn = { id: string; label: string; type: "text" | "number" | "currency"; required?: boolean };
export type TemplateTable = {
  id: string;
  label: string;
  columns: TemplateTableColumn[];
  minRows?: number;
  calculations?: { quantityColumn?: string; unitPriceColumn?: string; amountColumn?: string; subtotal?: boolean; vatRate?: number; vatRateFieldId?: string };
  summaryLabels?: { subtotal: string; vat: string; total: string };
};
export type DocumentTemplate = {
  slug: string;
  category: Category;
  title: string;
  titleKo: string;
  description: string;
  kind: "form" | "checklist" | "planner";
  policyReviewRequired: boolean;
  browserOnly: true;
  isPublic: boolean;
  supportedLocales: readonly Locale[];
  supportedFormats: readonly ("pdf" | "text")[];
  fields: TemplateField[];
  tables?: TemplateTable[];
  keywords: string[];
  relatedServices: string[];
};

export type CustomTemplate = {
  id: string;
  version: 1;
  baseSlug?: string;
  title: string;
  description: string;
  category: Category;
  fields: TemplateField[];
  tables?: TemplateTable[];
  createdAt: string;
  updatedAt: string;
};

export const templateFieldTypes: readonly TemplateFieldType[] = ["text", "textarea", "number", "date", "time", "checkbox", "select", "currency", "percent", "email", "tel"];

export function makeTemplateField(label: string, type: TemplateFieldType = "text", id = `custom-${Date.now()}`): TemplateField {
  return { id, label, type, required: false, ...(type === "select" ? { options: [{ value: "option-1", label: {} }] } : {}) };
}

export function inferFieldType(label: string): TemplateFieldType {
  if (/e-?mail/i.test(label)) return "email";
  if (/phone|telephone|mobile|fax/i.test(label)) return "tel";
  if (/date|week of/i.test(label)) return "date";
  if (/time|hour/i.test(label)) return "time";
  if (/amount|price|cost|budget|income|expense|fee|subtotal|tax|total|payment/i.test(label)) return "currency";
  if (/^(document|invoice|quote|order|receipt|delivery) number$/i.test(label)) return "text";
  if (/receipt attached|evidence attached|packed|completed|verified|paid/i.test(label)) return "checkbox";
  if (/quantity|count|number|percent|rate|priority/i.test(label)) return /percent|rate/i.test(label) ? "percent" : "number";
  if (/items|notes|summary|experience|agenda|objective|responsibilit|milestone|itinerary|terms|task|scope|result|decision|challenge|detail|description|purpose|condition|contact|resource|goal|schedule|achievement|skill|education|profile|closing|opening|reproduc|deliverable|confidential|exclusion|revision|progress|highlight|risk|reservation|attachment|signature|address|location/i.test(label)) return "textarea";
  return "text";
}
