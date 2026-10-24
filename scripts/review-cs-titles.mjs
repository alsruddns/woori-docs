import fs from 'node:fs';
const sourcePath=process.argv[2];if(!sourcePath)throw new Error('Usage: node scripts/review-cs-titles.mjs <English-source.json>');
const source=JSON.parse(fs.readFileSync(sourcePath,'utf8'));const path='docs/i18n-drafts/cs.json';const draft=JSON.parse(fs.readFileSync(path,'utf8'));
const titles={
 'resume-template':'Šablona životopisu','simple-resume-template':'Šablona jednoduchého životopisu','career-resume-template':'Šablona profesního životopisu',
 'cover-letter-template':'Šablona motivačního dopisu','job-application-checklist':'Kontrolní seznam žádosti o zaměstnání','interview-preparation-checklist':'Kontrolní seznam přípravy na pohovor',
 'quotation-generator':'Generátor cenových nabídek','invoice-generator':'Generátor faktur','receipt-generator':'Generátor účtenek',
 'purchase-order-generator':'Generátor objednávek','delivery-note-generator':'Generátor dodacích listů','transaction-statement-generator':'Generátor výpisu transakcí',
 'expense-report-template':'Šablona přehledu výdajů','business-trip-expense-template':'Šablona vyúčtování pracovní cesty','meeting-minutes-generator':'Generátor zápisu z jednání',
 'daily-work-report-template':'Šablona denního pracovního výkazu','weekly-work-report-template':'Šablona týdenního pracovního výkazu','monthly-work-report-template':'Šablona měsíčního pracovního výkazu',
 'project-plan-template':'Šablona projektového plánu','task-list-template':'Šablona seznamu úkolů','handover-document-template':'Šablona předávacího dokumentu',
 'issue-report-template':'Šablona hlášení problému','simple-agreement-template':'Šablona jednoduché dohody','confirmation-letter-template':'Šablona potvrzovacího dopisu',
 'consent-form-template':'Šablona formuláře souhlasu','loan-agreement-template':'Šablona smlouvy o půjčce','item-lending-agreement-template':'Šablona smlouvy o zapůjčení věci',
 'moving-checklist':'Kontrolní seznam při stěhování','wedding-checklist':'Kontrolní seznam příprav na svatbu','travel-checklist':'Kontrolní seznam na cestu',
 'international-travel-checklist':'Kontrolní seznam na cestu do zahraničí','newborn-checklist':'Kontrolní seznam pro novorozence','living-alone-checklist':'Kontrolní seznam pro samostatné bydlení',
 'newlywed-home-checklist':'Kontrolní seznam pro domácnost novomanželů','car-purchase-checklist':'Kontrolní seznam při koupi auta','moving-out-checklist':'Kontrolní seznam při odchodu z bydlení',
 'emergency-preparedness-checklist':'Kontrolní seznam krizové připravenosti','daily-planner':'Denní plánovač','weekly-planner':'Týdenní plánovač',
 'monthly-planner':'Měsíční plánovač','study-planner':'Studijní plánovač','travel-planner':'Plánovač cest',
 'project-schedule-template':'Šablona harmonogramu projektu','event-planning-checklist':'Kontrolní seznam plánování akce','monthly-budget-template':'Šablona měsíčního rozpočtu',
 'household-budget-template':'Šablona rozpočtu domácnosti','travel-budget-template':'Šablona cestovního rozpočtu','wedding-budget-template':'Šablona svatebního rozpočtu',
 'project-budget-template':'Šablona rozpočtu projektu','savings-plan-template':'Šablona plánu úspor','simple-contract-template':'Šablona jednoduché smlouvy',
 'freelance-agreement-template':'Šablona smlouvy s freelancerem','service-agreement-template':'Šablona smlouvy o poskytování služeb','nda-template':'Šablona dohody o mlčenlivosti',
 'payment-confirmation-template':'Šablona potvrzení o platbě','employment-certificate-template':'Potvrzení o zaměstnání','work-request-form':'Formulář žádosti o práci',
 'cooperation-request-form':'Formulář žádosti o spolupráci','business-trip-report':'Zpráva z pracovní cesty','business-trip-plan':'Plán pracovní cesty',
 'work-plan-template':'Šablona pracovního plánu','work-allocation-chart':'Tabulka rozdělení práce','approval-request-form':'Formulář žádosti o schválení',
 'official-letter-template':'Šablona úředního dopisu','expense-approval-form':'Formulář schválení výdajů','cost-settlement-form':'Formulář vyúčtování nákladů',
 'corporate-card-log':'Evidence firemní karty','cashbook-template':'Šablona pokladní knihy','cash-flow-daily-report':'Denní přehled peněžních toků',
 'payment-request-form':'Formulář žádosti o platbu','expense-processing-checklist':'Kontrolní seznam zpracování výdajů','leave-request-form':'Formulář žádosti o dovolenou',
 'attendance-record':'Evidence docházky','employee-directory':'Seznam zaměstnanců','interview-evaluation-form':'Formulář hodnocení pohovoru',
 'performance-review-form':'Formulář hodnocení pracovního výkonu','training-application-form':'Formulář žádosti o školení','equipment-request-form':'Formulář žádosti o vybavení',
 'vehicle-log':'Evidence vozidla','requirements-specification':'Specifikace požadavků','issue-tracker':'Evidence problémů',
 'risk-register':'Registr rizik','change-request-form':'Formulář žádosti o změnu','meeting-action-items':'Úkoly z jednání',
 'decision-log':'Evidence rozhodnutí','project-retrospective':'Závěrečné zhodnocení projektu','sprint-retrospective':'Závěrečné zhodnocení sprintu',
 'test-case-template':'Šablona testovacího případu','bug-report':'Hlášení chyby','incident-report':'Hlášení incidentu',
 'deployment-checklist':'Kontrolní seznam nasazení','code-review-checklist':'Kontrolní seznam kontroly kódu','release-notes-template':'Šablona poznámek k vydání',
 'server-inspection-checklist':'Kontrolní seznam kontroly serveru','customer-call-log':'Evidence hovorů se zákazníky','customer-inquiry-log':'Evidence dotazů zákazníků',
 'sales-activity-report':'Přehled obchodních aktivit','sales-daily-log':'Denní evidence prodeje','customer-meeting-notes':'Poznámky ze schůzky se zákazníkem',
 'customer-complaint-record':'Evidence zákaznických stížností','inventory-count-sheet':'Inventurní soupis','stock-receipt-log':'Evidence příjmu zboží',
 'stock-issue-log':'Evidence výdeje zboží','purchase-order-tracker':'Sledování objednávek','delivery-confirmation':'Potvrzení o doručení',
 'reading-journal':'Čtenářský deník','assignment-tracker':'Sledování školních úkolů','exam-study-plan':'Studijní plán na zkoušku',
 'class-notes-template':'Šablona poznámek z výuky','workout-log':'Záznam tréninků','weight-tracker':'Sledování hmotnosti',
 'meal-tracker':'Záznam jídel','sleep-journal':'Spánkový deník','packing-checklist':'Kontrolní seznam na balení',
 'travel-itinerary':'Cestovní itinerář','trip-expense-settlement':'Vyúčtování výdajů na cestu','personal-record-form':'Formulář osobních údajů',
 'payment-record-log':'Evidence plateb','service-history-log':'Evidence servisní historie',
};
if(Object.keys(source.titles).length!==119||Object.keys(titles).length!==119)throw new Error(`Expected 119 titles; source=${Object.keys(source.titles).length}, reviewed=${Object.keys(titles).length}.`);
for(const [key,value]of Object.entries(titles))if(!(key in source.titles)||!value.trim()||value===source.titles[key])throw new Error(`Invalid Czech title: ${key}`);
draft.titles=titles;draft.reviewedCounts={...(draft.reviewedCounts??{}),titles:119};draft.reviewStatus='119/699 units reviewed and corrected (document titles); unpublished';
fs.writeFileSync(path,`${JSON.stringify(draft,null,2)}\n`,'utf8');console.log('Czech document titles reviewed: 119/119; unpublished.');
