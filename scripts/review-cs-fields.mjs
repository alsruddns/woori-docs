import fs from 'node:fs';

const sourcePath=process.argv[2];
if(!sourcePath)throw new Error('Usage: node scripts/review-cs-fields.mjs <English-source.json>');
const source=JSON.parse(fs.readFileSync(sourcePath,'utf8'));
const path='docs/i18n-drafts/cs.json';
const draft=JSON.parse(fs.readFileSync(path,'utf8'));
// Correct machine-draft errors found while reviewing the complete 425-label set.
const corrections={
 Name:'Jméno',Achievements:'Úspěchy',Opening:'Úvod','Relevant experience':'Relevantní zkušenosti',
 'Quote number':'Číslo cenové nabídky','Received from':'Přijato od','Received by':'Převzal(a)',
 'Order number':'Číslo objednávky',Approver:'Schvalovatel',Traveler:'Cestující','Trip dates':'Termíny cesty',
 Lodging:'Ubytování',Meals:'Stravování','Other expenses':'Ostatní výdaje','Meeting title':'Název schůzky',
 Attendees:'Účastníci',Agenda:'Program jednání','Action items':'Úkoly','Next meeting':'Další schůzka',
 Blockers:'Překážky',Highlights:'Hlavní body','Key achievements':'Klíčové úspěchy',Owner:'Odpovědná osoba',
 Scope:'Rozsah',Milestones:'Milníky','Success measures':'Měřítka úspěchu','Outgoing owner':'Předávající osoba',
 'Incoming owner':'Přebírající osoba','Issue title':'Název problému',Reporter:'Oznamovatel',
 'Person giving consent':'Osoba udělující souhlas',Borrower:'Vypůjčitel',Principal:'Jistina',Interest:'Úrok',
 'Move-in date':'Datum nastěhování','Move-out date':'Datum vystěhování','Inspection date':'Datum kontroly',
 'Study sessions':'Studijní lekce',Utilities:'Poplatky za energie','Contingency':'Rezerva na nepředvídané výdaje',
 'Current savings':'Aktuální úspory',Deliverables:'Předávané výstupy',Term:'Doba trvání',Fee:'Odměna',
 'Acceptance criteria':'Kritéria přijetí','Activity':'Aktivita','Approval status':'Stav schválení',
 'Backup verified':'Záloha ověřena','Change description':'Popis změny','Clock-in time':'Čas příchodu',
 'Clock-out time':'Čas odchodu','Closing balance':'Konečný zůstatek','Complaint date':'Datum stížnosti',
 'Cost center':'Nákladové středisko','Customer visits':'Návštěvy zákazníků','Deals closed':'Uzavřené obchody',
 'Detection time':'Čas zjištění','Development areas':'Oblasti rozvoje','Discussion points':'Body k diskusi',
 'Disk usage':'Využití disku',Effort:'Vynaložené úsilí','Environment':'Prostředí','Estimated time':'Odhadovaný čas',
 'Expected delivery':'Očekávané datum dodání','Expense date':'Datum výdaje','Expense items':'Položky výdajů',
 'Follow-up actions':'Následné kroky','Follow-up date':'Datum dalšího kontaktu','Follow-up tasks':'Následné úkoly',
 'Goal weight':'Cílová hmotnost',Grade:'Známka','Inquiry ID':'ID dotazu','Inquiry date':'Datum dotazu',
 'Inquiry details':'Podrobnosti dotazu','Interviewer':'Tazatel','Issue details':'Podrobnosti problému',
 'Issue number':'Číslo problému','Known issues':'Známé problémy','Leave type':'Druh volna',
 'Lessons learned':'Získané zkušenosti',Manager:'Vedoucí','Meeting date':'Datum schůzky',
 'Meeting purpose':'Účel schůzky','Memory usage':'Využití paměti',Mitigation:'Opatření ke zmírnění rizik',
 'New features':'Nové funkce','Next action':'Další krok','Next service date':'Datum dalšího servisu',
 'Odometer end':'Konečný stav tachometru','Odometer start':'Počáteční stav tachometru',
 'Options considered':'Zvažované možnosti',Outcome:'Výsledek',Outcomes:'Výsledky',
 'Payment purpose':'Účel platby',Preconditions:'Předpoklady','Prepared by':'Připravil(a)',
 'Product or service':'Produkt nebo služba','Proposals sent':'Odeslané nabídky','Pull request':'Žádost o sloučení změn',
 'Receipt attached':'Účtenka přiložena','Receipt type':'Typ účtenky','Received date':'Datum přijetí',
 Receiver:'Příjemce',Recommendation:'Doporučení','Record date':'Datum záznamu','Record title':'Název záznamu',
 Release:'Vydání','Report period':'Období zprávy','Request date':'Datum žádosti','Request title':'Název žádosti',
 Requester:'Žadatel','Requirement ID':'ID požadavku','Requirement title':'Název požadavku',
 Resolution:'Řešení','Resolution time':'Doba řešení','Resolved date':'Datum vyřešení',Revenue:'Výnosy',
 'Review period':'Hodnoticí období',Reviewer:'Hodnotitel','Role fit':'Soulad s pracovní pozicí',
 'Rollback plan':'Plán návratu','Root cause':'Základní příčina','Running balance':'Průběžný zůstatek',
 SKU:'Kód SKU','Security status':'Stav zabezpečení',Server:'Serverový počítač',
 'Settlement period':'Období vyúčtování',Severity:'Závažnost',Sprint:'Pracovní iterace',
 'Start location':'Místo začátku',Status:'Stav',Strengths:'Silné stránky','Study date':'Datum studia',
 'Study duration':'Délka studia','Study topic':'Téma studia',Summary:'Shrnutí',Team:'Tým',
 'Test case ID':'ID testovacího případu',Tester:'Testující osoba','Tests passed':'Úspěšné testy',
 'Training goals':'Cíle školení','Training title':'Název školení','Transaction type':'Typ transakce',
 'Trip purpose':'Účel cesty',VAT:'DPH',Variance:'Odchylka','What could improve':'Co lze zlepšit',
 'What went well':'Co se povedlo','Workout date':'Datum tréninku',
};

if(Object.keys(source.fields).length!==425||Object.keys(draft.fields).length!==425)throw new Error('Expected all 425 Czech field labels.');
for(const [key,value] of Object.entries(corrections)){if(!(key in source.fields)||!value.trim()||value===source.fields[key])throw new Error(`Invalid Czech correction: ${key}`);draft.fields[key]=value;}
for(const [key,value] of Object.entries(draft.fields))if(!value.trim()||value===source.fields[key])throw new Error(`Empty or English Czech field: ${key}`);
draft.reviewedCounts={...(draft.reviewedCounts??{}),fields:425};
const total=Object.values(draft.reviewedCounts).reduce((sum,count)=>sum+count,0);
draft.reviewStatus=`editorial translation review complete (${total}/699 units); unpublished pending runtime, SEO and production verification`;
fs.writeFileSync(path,`${JSON.stringify(draft,null,2)}\n`,'utf8');
console.log(`Czech field labels reviewed: 425/425 (${Object.keys(corrections).length} contextual corrections); ${total}/699 units.`);
