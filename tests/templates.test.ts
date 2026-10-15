import { describe, expect, it } from "vitest";
import { categories, documents, locales, getDocument } from "../src/lib/registry";
import { addTemplateField, cloneDocumentTemplate, createBlankTemplate, deleteTemplateField, moveTemplateField, readCustomTemplates, readDrafts, updateTemplateField, writeCustomTemplates, writeDrafts } from "../src/lib/template-storage";
import { makeTemplateField } from "../src/lib/template-schema";
import editorTranslations from "../src/lib/editor-translations.json";
import { getDocumentMetadata } from "../src/lib/seo";
import { renderDocumentText } from "../src/lib/engine";

class MemoryStorage {
  values = new Map<string,string>();
  getItem(key:string) { return this.values.get(key) ?? null; }
  setItem(key:string,value:string) { this.values.set(key,value); }
}

describe("expanded template engine", () => {
  it("keeps public slugs unique and localized across 15 locales", () => {
    expect(documents.length).toBeGreaterThanOrEqual(100);
    expect(new Set(documents.map(doc=>doc.slug)).size).toBe(documents.length);
    expect(new Set(documents.map(doc=>doc.category))).toEqual(new Set(categories));
    for(const doc of documents.filter(d=>d.isPublic)) {
      expect(doc.title.trim()).toBeTruthy(); expect(doc.description.trim()).toBeTruthy();
      expect(new Set(doc.fields.map(field=>field.id)).size).toBe(doc.fields.length);
      expect(doc.fields.every(field=>field.label.trim())).toBe(true);
      expect(doc.supportedLocales).toHaveLength(15);
    }
    expect(locales).toHaveLength(15);
  });
  it("has localized editor controls and exact expense SEO metadata",()=>{
    for(const locale of locales){for(const [key,value] of Object.entries(editorTranslations[locale])){expect(value.trim(),`${locale}.${key}`).toBeTruthy();expect(value,`${locale}.${key}`).not.toContain("\uFFFD");expect(value,`${locale}.${key}`).not.toBe(key)}}
    const metadata=getDocumentMetadata("ko","expense-approval-form");expect(metadata.title).toEqual({absolute:"\uC9C0\uCD9C\uACB0\uC758\uC11C \uC591\uC2DD - \uBB34\uB8CC \uC791\uC131\u00B7\uCEE4\uC2A4\uD140 | woori.today"});expect(metadata.description).toBe("무료 지출결의서 양식을 바로 작성하고 필요한 항목을 추가·삭제해 업무에 맞게 커스텀할 수 있습니다.");expect(metadata.alternates?.canonical).toBe("/ko/docs/expense-approval-form");
  });
  it("includes the expense approval template and repeatable calculated items",()=>{
    const expense=getDocument("expense-approval-form");
    expect(expense).toBeTruthy();
    expect(expense?.titleKo).toBe("\uc9c0\ucd9c\uacb0\uc758\uc11c");
    const names=expense!.fields.map(field=>field.label);
    for(const name of ["Document number","Created date","Requester","Department","Expense date","Purpose","Expense category","Vendor","Payment method","Bank account","Receipt type","Receipt attached","Project name","Cost center","Budget code","Payment date","Notes","Reviewer","Approver"]) expect(names).toContain(name);
    expect(expense?.fields.find(field=>field.id==="Tax rate")?.defaultValue).toBe(10);expect(expense?.tables?.[0].calculations).toMatchObject({quantityColumn:"quantity",unitPriceColumn:"unit-price",amountColumn:"amount",subtotal:true,vatRateFieldId:"Tax rate"});const text=renderDocumentText(expense!,{"Tax rate":"5","table:expense-items":JSON.stringify([{quantity:"2","unit-price":"50"}])},"en");expect(text).toContain("Amount: 100");expect(text).toContain("VAT: 5");expect(text).toContain("Total: 105");
  });
  it("supports adding, editing, deleting, and keyboard reordering custom fields",()=>{
    const base=createBlankTemplate("one","Test","work","2026-01-01T00:00:00Z");
    const second=makeTemplateField("Email","email","field-2");
    const added=addTemplateField(base.fields,second);
    expect(added).toHaveLength(2);
    expect(updateTemplateField(added,"field-2",{required:true})[1].required).toBe(true);
    expect(moveTemplateField(added,"field-2",-1).map(f=>f.id)).toEqual(["field-2","field-1"]);
    expect(deleteTemplateField(added,"field-2")).toHaveLength(1);
    expect(deleteTemplateField(base.fields,"field-1")).toHaveLength(1);
  });
  it("clones source templates without mutating originals",()=>{
    const source=getDocument("expense-approval-form")!;
    const original=JSON.stringify(source);
    const clone=cloneDocumentTemplate(source,"custom-1");
    clone.fields[0].label="Changed";
    expect(JSON.stringify(source)).toBe(original);
    expect(clone.baseSlug).toBe(source.slug);
  });
  it("round trips templates and drafts while ignoring corrupt or old storage",()=>{
    const storage=new MemoryStorage(); const form=createBlankTemplate("custom-1","Draft","work");
    expect(writeCustomTemplates(storage,[form])).toBe(true);
    expect(readCustomTemplates(storage)).toEqual([form]);
    expect(writeDrafts(storage,{"custom-1":{"field-1":"hello"}})).toBe(true);
    expect(readDrafts(storage)["custom-1"]["field-1"]).toBe("hello");
    storage.setItem("woori-docs:custom-templates","not json");
    expect(readCustomTemplates(storage)).toEqual([]);
    storage.setItem("woori-docs:drafts",JSON.stringify({version:0,drafts:{bad:{x:"y"}}}));
    expect(readDrafts(storage)).toEqual({});
  });
});

