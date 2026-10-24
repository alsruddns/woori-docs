import fs from 'node:fs';
const sourcePath=process.argv[2];
if(!sourcePath) throw new Error('Usage: node scripts/review-sv-titles.mjs <English-source.json>');
const source=JSON.parse(fs.readFileSync(sourcePath,'utf8'));
const path='docs/i18n-drafts/sv.json';
const draft=JSON.parse(fs.readFileSync(path,'utf8'));
const titles={
 'resume-template':'CV-mall','simple-resume-template':'Enkel CV-mall','career-resume-template':'CV-mall för erfarna',
 'cover-letter-template':'Mall för personligt brev','job-application-checklist':'Checklista för jobbansökan','interview-preparation-checklist':'Checklista inför anställningsintervju',
 'quotation-generator':'Offertgenerator','invoice-generator':'Fakturagenerator','receipt-generator':'Kvitto­generator',
 'purchase-order-generator':'Generator för inköpsorder','delivery-note-generator':'Generator för följesedlar','transaction-statement-generator':'Generator för transaktionsrapport',
 'expense-report-template':'Mall för utgiftsrapport','business-trip-expense-template':'Mall för reseräkning','meeting-minutes-generator':'Generator för mötesprotokoll',
 'daily-work-report-template':'Mall för daglig arbetsrapport','weekly-work-report-template':'Mall för veckorapport','monthly-work-report-template':'Mall för månadsrapport',
 'project-plan-template':'Mall för projektplan','task-list-template':'Mall för uppgiftslista','handover-document-template':'Mall för överlämningsdokument',
 'issue-report-template':'Mall för incidentrapport','simple-agreement-template':'Mall för enkelt avtal','confirmation-letter-template':'Mall för bekräftelsebrev',
 'consent-form-template':'Mall för samtyckesblankett','loan-agreement-template':'Mall för låneavtal','item-lending-agreement-template':'Mall för låneavtal för föremål',
 'moving-checklist':'Checklista inför flytt','wedding-checklist':'Checklista inför bröllop','travel-checklist':'Resechecklista',
 'international-travel-checklist':'Checklista för utlandsresa','newborn-checklist':'Checklista för nyfödd','living-alone-checklist':'Checklista för att bo själv',
 'newlywed-home-checklist':'Checklista för nygiftas hem','car-purchase-checklist':'Checklista inför bilköp','moving-out-checklist':'Checklista inför utflyttning',
 'emergency-preparedness-checklist':'Checklista för krisberedskap','daily-planner':'Daglig planerare','weekly-planner':'Veckoplanerare',
 'monthly-planner':'Månadsplanerare','study-planner':'Studieplanerare','travel-planner':'Reseplanerare',
 'project-schedule-template':'Mall för projektschema','event-planning-checklist':'Checklista för evenemangsplanering','monthly-budget-template':'Mall för månadsbudget',
 'household-budget-template':'Mall för hushållsbudget','travel-budget-template':'Mall för resebudget','wedding-budget-template':'Mall för bröllopsbudget',
 'project-budget-template':'Mall för projektbudget','savings-plan-template':'Mall för sparplan','simple-contract-template':'Mall för enkelt kontrakt',
 'freelance-agreement-template':'Mall för frilansavtal','service-agreement-template':'Mall för tjänsteavtal','nda-template':'Mall för sekretessavtal',
 'payment-confirmation-template':'Mall för betalningsbekräftelse','employment-certificate-template':'Arbetsintygsmall','work-request-form':'Formulär för arbetsförfrågan',
 'cooperation-request-form':'Formulär för samarbetsförfrågan','business-trip-report':'Reserapport för tjänsteresa','business-trip-plan':'Plan för tjänsteresa',
 'work-plan-template':'Mall för arbetsplan','work-allocation-chart':'Diagram för arbetsfördelning','approval-request-form':'Formulär för godkännandebegäran',
 'official-letter-template':'Mall för officiellt brev','expense-approval-form':'Formulär för utgiftsgodkännande','cost-settlement-form':'Formulär för kostnadsavräkning',
 'corporate-card-log':'Logg över företagskort','cashbook-template':'Mall för kassabok','cash-flow-daily-report':'Daglig kassaflödesrapport',
 'payment-request-form':'Formulär för betalningsbegäran','expense-processing-checklist':'Checklista för utgiftshantering','leave-request-form':'Formulär för ledighetsansökan',
 'attendance-record':'Närvaroregister','employee-directory':'Personalkatalog','interview-evaluation-form':'Formulär för intervjubedömning',
 'performance-review-form':'Formulär för prestationsbedömning','training-application-form':'Formulär för utbildningsansökan','equipment-request-form':'Formulär för utrustningsbegäran',
 'vehicle-log':'Fordonlogg','requirements-specification':'Kravspecifikation','issue-tracker':'Ärendespårare',
 'risk-register':'Riskregister','change-request-form':'Formulär för ändringsbegäran','meeting-action-items':'Åtgärdspunkter från möte',
 'decision-log':'Beslutslogg','project-retrospective':'Projektretrospektiv','sprint-retrospective':'Sprintretrospektiv',
 'test-case-template':'Mall för testfall','bug-report':'Felrapport','incident-report':'Incidentrapport',
 'deployment-checklist':'Checklista för driftsättning','code-review-checklist':'Checklista för kodgranskning','release-notes-template':'Mall för versionsanteckningar',
 'server-inspection-checklist':'Checklista för servergranskning','customer-call-log':'Kund samtalslogg','customer-inquiry-log':'Logg över kundförfrågningar',
 'sales-activity-report':'Försäljningsaktivitetsrapport','sales-daily-log':'Daglig försäljningslogg','customer-meeting-notes':'Anteckningar från kundmöte',
 'customer-complaint-record':'Kundklagomålsregister','inventory-count-sheet':'Inventeringsblad','stock-receipt-log':'Logg över varumottagning',
 'stock-issue-log':'Logg över varuuttag','purchase-order-tracker':'Spårare för inköpsorder','delivery-confirmation':'Leveransbekräftelse',
 'reading-journal':'Läsdagbok','assignment-tracker':'Uppgiftsspårare','exam-study-plan':'Studieplan inför prov',
 'class-notes-template':'Mall för lektionsanteckningar','workout-log':'Träningslogg','weight-tracker':'Viktspårare',
 'meal-tracker':'Måltidslogg','sleep-journal':'Sömndagbok','packing-checklist':'Packlista',
 'travel-itinerary':'Reseplan','trip-expense-settlement':'Resekostnadsredovisning','personal-record-form':'Formulär för personuppgifter',
 'payment-record-log':'Betalningslogg','service-history-log':'Servicehistoriklogg',
};
if(Object.keys(source.titles).length!==119||Object.keys(titles).length!==119) throw new Error(`Expected 119 titles; source=${Object.keys(source.titles).length}, reviewed=${Object.keys(titles).length}.`);
for(const [key,value] of Object.entries(titles)) if(!(key in source.titles)||!value.trim()||value===source.titles[key]) throw new Error(`Invalid Swedish title: ${key}`);
draft.titles=titles; draft.reviewedCounts={...(draft.reviewedCounts??{}),titles:119};
draft.reviewStatus='119/699 units reviewed and corrected (document titles); unpublished';
fs.writeFileSync(path,`${JSON.stringify(draft,null,2)}\n`,'utf8');
console.log('Swedish document titles reviewed: 119/119; unpublished.');
