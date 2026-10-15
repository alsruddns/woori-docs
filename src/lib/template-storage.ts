import { categories, type Category } from "./template-schema";
import { makeTemplateField, templateFieldTypes, type CustomTemplate, type DocumentTemplate, type TemplateField } from "./template-schema";

export const CUSTOM_TEMPLATES_KEY = "woori-docs:custom-templates";
export const DRAFTS_KEY = "woori-docs:drafts";
export const STORAGE_VERSION = 1 as const;

type StorageLike = Pick<Storage, "getItem" | "setItem">;

function validField(value: unknown): value is TemplateField {
  if (!value || typeof value !== "object") return false;
  const field = value as Partial<TemplateField>;
  return typeof field.id === "string" && typeof field.label === "string" && templateFieldTypes.includes(field.type as never);
}

function validTemplate(value: unknown): value is CustomTemplate {
  if (!value || typeof value !== "object") return false;
  const template = value as Partial<CustomTemplate>;
  return typeof template.id === "string" && template.version === STORAGE_VERSION && typeof template.title === "string" && typeof template.description === "string" && categories.includes(template.category as Category) && Array.isArray(template.fields) && template.fields.length > 0 && template.fields.every(validField) && typeof template.createdAt === "string" && typeof template.updatedAt === "string";
}

export function readCustomTemplates(storage: StorageLike): CustomTemplate[] {
  try {
    const raw = storage.getItem(CUSTOM_TEMPLATES_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || (parsed as { version?: unknown }).version !== STORAGE_VERSION || !Array.isArray((parsed as { templates?: unknown }).templates)) return [];
    return (parsed as { templates: unknown[] }).templates.filter(validTemplate);
  } catch { return []; }
}

export function writeCustomTemplates(storage: StorageLike, templates: readonly CustomTemplate[]) {
  try { storage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify({ version: STORAGE_VERSION, templates })); return true; }
  catch { return false; }
}

export type DraftStore = Record<string, Record<string, string>>;
export function readDrafts(storage: Pick<Storage, "getItem">): DraftStore {
  try {
    const raw = storage.getItem(DRAFTS_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || (parsed as { version?: unknown }).version !== STORAGE_VERSION || !(parsed as { drafts?: unknown }).drafts || typeof (parsed as { drafts?: unknown }).drafts !== "object") return {};
    return (parsed as { drafts: DraftStore }).drafts;
  } catch { return {}; }
}
export function writeDrafts(storage: Pick<Storage, "setItem">, drafts: DraftStore) {
  try { storage.setItem(DRAFTS_KEY, JSON.stringify({ version: STORAGE_VERSION, drafts })); return true; }
  catch { return false; }
}

export function cloneDocumentTemplate(template: DocumentTemplate, id: string, now = new Date().toISOString()): CustomTemplate {
  return { id, version: STORAGE_VERSION, baseSlug: template.slug, title: template.title, description: template.description, category: template.category, fields: structuredClone(template.fields), ...(template.tables ? { tables: structuredClone(template.tables) } : {}), createdAt: now, updatedAt: now };
}

export function createBlankTemplate(id: string, title: string, category: Category, now = new Date().toISOString()): CustomTemplate {
  return { id, version: STORAGE_VERSION, title, description: "", category, fields: [makeTemplateField("New field", "text", "field-1")], createdAt: now, updatedAt: now };
}

export function addTemplateField(fields: readonly TemplateField[], field: TemplateField) {
  if (fields.some((item) => item.id === field.id)) return [...fields];
  return [...fields, structuredClone(field)];
}

export function deleteTemplateField(fields: readonly TemplateField[], id: string) {
  if (fields.length <= 1) return [...fields];
  return fields.filter((field) => field.id !== id);
}

export function moveTemplateField(fields: readonly TemplateField[], id: string, offset: -1 | 1) {
  const next = [...fields]; const index = next.findIndex((field) => field.id === id); const target = index + offset;
  if (index < 0 || target < 0 || target >= next.length) return next;
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export function updateTemplateField(fields: readonly TemplateField[], id: string, update: Partial<TemplateField>) {
  return fields.map((field) => field.id === id ? { ...field, ...update, id: field.id } : field);
}

export function cloneCustomTemplate(template: CustomTemplate, id: string, now = new Date().toISOString()): CustomTemplate {
  return { ...structuredClone(template), id, version: STORAGE_VERSION, title: `${template.title} (copy)`, createdAt: now, updatedAt: now };
}
