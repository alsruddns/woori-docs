import documentTranslations from "./document-translations.json";
import additionalTemplates from "./additional-templates.json";
import categoryTranslations from "./category-translations.json";
import { inferFieldType, locales, type Category, type DocumentTemplate, type Locale, type TemplateField } from "./template-schema";
export { categories, locales } from "./template-schema";
export type { Category, Locale } from "./template-schema";

const translatedData = documentTranslations as Record<Locale, { titles: Record<string, string>; fields: Record<string, string>; interface: Record<string, string> }>;
export type DocKind = "form" | "checklist" | "planner";
export type DocumentDefinition = DocumentTemplate;

const rows: Array<[string, string, string, string, DocKind?, boolean?, string?]> = [
  ["resume-template","career","Resume template","이력서 양식","form",false,"Name,Email,Phone,Location,Profile summary,Work experience,Education,Skills"],
  ["simple-resume-template","career","Simple resume template","간단 이력서 양식","form",false,"Name,Email,Phone,Profile summary,Experience,Education,Skills"],
  ["career-resume-template","career","Career resume template","경력 이력서 양식","form",false,"Name,Email,Phone,Professional summary,Work history,Achievements,Education,Skills"],
  ["cover-letter-template","career","Cover letter template","자기소개서 양식","form",false,"Name,Company,Role,Opening,Relevant experience,Closing"],
  ["job-application-checklist","career","Job application checklist","입사 지원 체크리스트","checklist",false,"Checklist items,Notes,Due date"],
  ["interview-preparation-checklist","career","Interview preparation checklist","면접 준비 체크리스트","checklist",false,"Checklist items,Notes,Interview date"],
  ["quotation-generator","business","Quotation generator","견적서 작성기","form",false,"Quote number,Date,Valid until,Provider,Customer,Items,Subtotal,Tax,Notes"],
  ["invoice-generator","business","Invoice generator","청구서 작성기","form",false,"Invoice number,Date,Due date,Provider,Customer,Items,Subtotal,Tax,Payment details"],
  ["receipt-generator","business","Receipt generator","영수증 작성기","form",false,"Receipt number,Date,Received from,Description,Amount,Received by"],
  ["purchase-order-generator","business","Purchase order generator","구매 주문서 작성기","form",false,"Order number,Date,Buyer,Supplier,Items,Delivery date,Notes"],
  ["delivery-note-generator","business","Delivery note generator","납품서 작성기","form",false,"Delivery number,Date,Sender,Recipient,Items,Delivery address,Notes"],
  ["transaction-statement-generator","business","Transaction statement generator","거래명세서 작성기","form",false,"Statement number,Date,Seller,Buyer,Items,Subtotal,Tax,Total"],
  ["expense-report-template","business","Expense report template","경비 보고서 양식","form",false,"Name,Department,Period,Expenses,Total,Approver,Notes"],
  ["business-trip-expense-template","business","Business trip expense template","출장 경비 양식","form",false,"Traveler,Destination,Trip dates,Transportation,Lodging,Meals,Other expenses,Total"],
  ["meeting-minutes-generator","work","Meeting minutes generator","회의록 작성기","form",false,"Meeting title,Date,Attendees,Agenda,Discussion,Decisions,Action items,Next meeting"],
  ["daily-work-report-template","work","Daily work report template","일일 업무 보고서 양식","form",false,"Name,Date,Completed work,In progress,Blockers,Next steps"],
  ["weekly-work-report-template","work","Weekly work report template","주간 업무 보고서 양식","form",false,"Name,Week,Highlights,Completed work,In progress,Challenges,Next week"],
  ["monthly-work-report-template","work","Monthly work report template","월간 업무 보고서 양식","form",false,"Name,Month,Goals,Results,Key achievements,Challenges,Next month"],
  ["project-plan-template","work","Project plan template","프로젝트 계획서 양식","form",false,"Project name,Owner,Objectives,Scope,Milestones,Resources,Risks,Success measures"],
  ["task-list-template","work","Task list template","업무 목록 양식","checklist",false,"Checklist items,Owner,Due date,Priority,Notes"],
  ["handover-document-template","work","Handover document template","업무 인수인계서 양식","form",false,"Role,Outgoing owner,Incoming owner,Responsibilities,Open tasks,Key contacts,Resources"],
  ["issue-report-template","work","Issue report template","문제 보고서 양식","form",false,"Issue title,Date,Reporter,Impact,Steps to reproduce,Expected result,Actual result,Attachments"],
  ["simple-agreement-template","personal","Simple agreement template","간단 합의서 양식","form",true,"Parties,Date,Subject,Terms,Responsibilities,Signatures"],
  ["confirmation-letter-template","personal","Confirmation letter template","확인서 양식","form",false,"Name,Date,Subject,Confirmation details,Signature"],
  ["consent-form-template","personal","Consent form template","동의서 양식","form",true,"Person giving consent,Recipient,Purpose,Scope,Date,Signature"],
  ["loan-agreement-template","personal","Personal loan agreement template","금전 대차 합의서 양식","form",true,"Lender,Borrower,Principal,Date,Repayment plan,Interest,Signatures"],
  ["item-lending-agreement-template","personal","Item lending record","물품 대여 확인서","form",false,"Lender,Borrower,Item,Condition,Lending date,Return date,Notes"],
  ["moving-checklist","checklists","Moving checklist","이사 체크리스트","checklist",false,"Checklist items,Target date,Notes"],
  ["wedding-checklist","checklists","Wedding checklist","결혼 준비 체크리스트","checklist",false,"Checklist items,Target date,Owner,Notes"],
  ["travel-checklist","checklists","Travel checklist","여행 준비 체크리스트","checklist",false,"Checklist items,Departure date,Notes"],
  ["international-travel-checklist","checklists","International travel checklist","해외여행 체크리스트","checklist",false,"Checklist items,Destination,Departure date,Notes"],
  ["newborn-checklist","checklists","Newborn essentials checklist","신생아 준비 체크리스트","checklist",false,"Checklist items,Due date,Notes"],
  ["living-alone-checklist","checklists","Living alone checklist","자취 준비 체크리스트","checklist",false,"Checklist items,Move-in date,Notes"],
  ["newlywed-home-checklist","checklists","New home checklist for couples","신혼집 준비 체크리스트","checklist",false,"Checklist items,Move-in date,Room,Notes"],
  ["car-purchase-checklist","checklists","Car purchase checklist","자동차 구매 체크리스트","checklist",false,"Checklist items,Vehicle,Inspection date,Notes"],
  ["moving-out-checklist","checklists","Moving-out checklist","퇴거 체크리스트","checklist",false,"Checklist items,Move-out date,Notes"],
  ["emergency-preparedness-checklist","checklists","Emergency preparedness checklist","비상 대비 체크리스트","checklist",false,"Checklist items,Review date,Household notes"],
  ["daily-planner","planning","Daily planner","일일 플래너","planner",false,"Date,Top priorities,Schedule,Tasks,Notes"],
  ["weekly-planner","planning","Weekly planner","주간 플래너","planner",false,"Week of,Weekly goals,Monday,Tuesday,Wednesday,Thursday,Friday,Weekend,Notes"],
  ["monthly-planner","planning","Monthly planner","월간 플래너","planner",false,"Month,Goals,Important dates,Tasks,Notes"],
  ["study-planner","planning","Study planner","학습 플래너","planner",false,"Subject,Study goal,Start date,Target date,Study sessions,Review notes"],
  ["travel-planner","planning","Travel planner","여행 계획표","planner",false,"Destination,Travel dates,Travelers,Itinerary,Reservations,Notes"],
  ["project-schedule-template","planning","Project schedule template","프로젝트 일정표 양식","planner",false,"Project,Start date,Target date,Milestones,Owners,Dependencies"],
  ["event-planning-checklist","planning","Event planning checklist","행사 준비 체크리스트","checklist",false,"Event,Event date,Checklist items,Owner,Notes"],
  ["monthly-budget-template","finance","Monthly budget template","월간 예산 양식","form",false,"Month,Income,Housing,Food,Transport,Utilities,Savings,Other expenses"],
  ["household-budget-template","finance","Household budget template","가계 예산 양식","form",false,"Month,Household income,Housing,Food,Transport,Health,Education,Savings,Other"],
  ["travel-budget-template","finance","Travel budget template","여행 예산 양식","form",false,"Destination,Travel dates,Transport,Lodging,Meals,Activities,Other,Total"],
  ["wedding-budget-template","finance","Wedding budget template","결혼 예산 양식","form",false,"Event date,Venue,Food,Attire,Photography,Flowers,Other,Total"],
  ["project-budget-template","finance","Project budget template","프로젝트 예산 양식","form",false,"Project,Period,People,Tools,Services,Contingency,Total"],
  ["savings-plan-template","finance","Savings plan template","저축 계획 양식","form",false,"Goal,Target amount,Current savings,Monthly contribution,Target date,Notes"],
  ["simple-contract-template","agreements","General contract discussion draft","일반 계약 검토용 초안","form",true,"Parties,Date,Scope,Deliverables,Payment,Term,Responsibilities,Signatures"],
  ["freelance-agreement-template","agreements","Freelance project discussion draft","프리랜서 업무 합의 초안","form",true,"Client,Freelancer,Project,Deliverables,Fee,Schedule,Revisions,Signatures"],
  ["service-agreement-template","agreements","Service arrangement discussion draft","서비스 제공 합의 초안","form",true,"Provider,Client,Service,Scope,Fee,Term,Responsibilities,Signatures"],
  ["nda-template","agreements","Confidentiality discussion draft","비밀유지 합의 검토용 초안","form",true,"Parties,Purpose,Confidential information,Exclusions,Term,Date,Signatures"],
  ["payment-confirmation-template","agreements","Payment confirmation","대금 지급 확인서","form",false,"Payer,Payee,Amount,Payment date,Payment method,Reference,Notes"],
  ["employment-certificate-template","agreements","Employment details record","재직 정보 확인 기록","form",true,"Name,Organization,Role,Start date,Employment status,Issue date,Issuer"],
];

export const categoryNames = categoryTranslations as Record<Locale, Record<Category, string>>;

export { ui, localeLabels } from "./chrome-i18n";

const legacyCategoryMap: Record<string, Category> = { career: "hr-admin", business: "finance", work: "work", personal: "personal", checklists: "checklists", planning: "planning", finance: "finance", agreements: "records" };
function toFields(labels: readonly string[]): TemplateField[] {
  return labels.map((label, index) => ({ id: label, label, type: inferFieldType(label), required: index < 2, ...(label === "Tax rate" ? { defaultValue: 10 } : {}) }));
}
const legacyDocuments: DocumentDefinition[] = rows.map(([slug, legacyCategory, title, titleKo, kind = "form", policy = false, fieldList]) => ({
  slug, category: legacyCategoryMap[legacyCategory], title, titleKo, description: `${title} for creating, previewing, copying, and printing a useful document in your browser.`, kind, policyReviewRequired: policy, browserOnly: true, isPublic: true, supportedLocales: locales, supportedFormats: ["pdf", "text"], fields: toFields((fieldList ?? "Title,Date,Details,Notes").split(",")), keywords: slug.split("-"), relatedServices: [],
}));
const expandedDocuments: DocumentDefinition[] = (additionalTemplates as Array<Omit<DocumentDefinition, "browserOnly" | "supportedLocales" | "supportedFormats" | "keywords" | "relatedServices"> & { fields: string[] }>).map((item) => ({
  ...item, browserOnly: true, supportedLocales: locales, supportedFormats: ["pdf", "text"],
  fields: toFields(item.fields), tables: (item as typeof item & { tables?: DocumentTemplate["tables"] }).tables, keywords: item.slug.split("-"), relatedServices: [],
}));

export const documents: DocumentDefinition[] = [...legacyDocuments, ...expandedDocuments];

for (const doc of documents) {
  doc.keywords = [...new Set([...doc.keywords, ...doc.title.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean), ...doc.titleKo.split(/\s+/)])];
  doc.relatedServices = documents.filter((candidate) => candidate.category === doc.category && candidate.slug !== doc.slug).slice(0, 4).map((candidate) => candidate.slug);
}

export const getDocument = (slug: string) => documents.find((doc) => doc.slug === slug);
export const getRelated = (doc: DocumentDefinition) => doc.relatedServices.map((slug) => documents.find((item) => item.slug === slug)).filter((item): item is DocumentDefinition => Boolean(item));
export const localizedTitle = (doc: DocumentDefinition, locale: Locale) => locale === "ko" ? doc.titleKo : doc.title;
const expandedSlugs = new Set((additionalTemplates as Array<{ slug: string }>).map((item) => item.slug));
export const isExpandedTemplate = (doc: DocumentDefinition) => expandedSlugs.has(doc.slug);
export const localizedDocumentTitle = (doc: DocumentDefinition, locale: Locale) => locale === "ko" ? doc.titleKo : translatedData[locale].titles[doc.slug] || doc.title;
export const localizedDescription = (doc: DocumentDefinition, locale: Locale) => translatedData[locale].interface.description.replace("{title}", localizedDocumentTitle(doc, locale));
export const localizedInterface = (locale: Locale) => translatedData[locale].interface;
export const localizeField = (field: string, locale: Locale) => {
  return translatedData[locale].fields[field] || field;
};
