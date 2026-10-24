import fs from 'node:fs';
const sourcePath=process.argv[2];
if(!sourcePath) throw new Error('Usage: node scripts/review-sv-ui-content.mjs <English-source.json>');
const en=JSON.parse(fs.readFileSync(sourcePath,'utf8'));
const path='docs/i18n-drafts/sv.json';
const draft=JSON.parse(fs.readFileSync(path,'utf8'));
const reviewed={
 interface:{
  description:'Skapa och förhandsgranska {title} direkt i webbläsaren.',
  guide:'Obligatoriska fält är markerade med en asterisk. Spara en kopia på din enhet som textfil eller skriv ut den som PDF.',
  faqSaved:'Var sparas mitt dokument?',faqLegal:'Kan jag använda dokumentet som ett juridiskt bindande formulär?',
  draftSaved:'Utkastet har sparats i den här webbläsaren.',clipboardError:'Det går inte att använda urklippet i den här webbläsaren.',
  requiredLabel:'Obligatoriskt',searchLabel:'Sök dokument',
  examplesBody:'Ange kortfattade och korrekta uppgifter. Kontrollera datum, namn, belopp och lokala krav innan du delar eller skriver ut dokumentet.',
 },
 categories:{
  work:'Företag och arbete',finance:'Ekonomi och redovisning','hr-admin':'Personal och administration',
  'project-management':'Projektledning','development-it':'Programvaruutveckling och IT','sales-customer':'Försäljning och kunder',
  'inventory-logistics':'Lager och logistik',education:'Skola och utbildning',personal:'Privatliv',
  'health-fitness':'Hälsa och träning',travel:'Resor',checklists:'Checklistor',planning:'Planering',records:'Register',
 },
 ui:{
  brand:'Dokument',tagline:'Skapa och organisera användbara dokument i webbläsaren.',search:'Sök dokumentmallar',categories:'Kategorier',all:'Alla dokument',
  popular:'Välj ett dokument för att komma igång',count:' dokument',
  browser:'Uppgifter du fyller i stannar i den här webbläsaren. De skickas inte till våra servrar eller analystjänster.',
  draft:'Sparat i den här webbläsaren',clear:'Rensa fält',copy:'Kopiera text',copied:'Texten har kopierats',
  print:'Skriv ut / Spara som PDF',download:'Ladda ned som text',preview:'Direktförhandsgranskning',edit:'Redigera dokument',save:'Sparas automatiskt',
  related:'Relaterade dokument',guide:'Så här använder du dokumentet',examples:'Skrivtips',faq:'Vanliga frågor',
  legal:'Det här är en allmän mall och ett referensmaterial. Den utgör inte juridisk rådgivning och garanterar inte att dokumentet är juridiskt giltigt. Rådfråga en kvalificerad yrkesperson i din jurisdiktion innan du använder den.',
  home:'Dokumentbibliotek',language:'Språk',family:'woori.today-tjänster',portal:'Startsida',calculator:'Kalkylator',
  tools:'Webbverktyg',ledger:'Gemensam hushållslogg',docs:'Dokument',quiz:'Frågesporter',privacy:'Integritetspolicy',usage:'Användarguide',
  contact:'Kontakta oss',contactTitle:'Kontakta oss',email:'E-postadress',close:'Stäng',empty:'Inga matchande dokument hittades.',
  checked:'Klart',adHidden:'',placeholder:'Skriv text',required:'Det här fältet är obligatoriskt',
  templateNote:'Det du skriver visas direkt i förhandsgranskningen.',
  newFeature:'Registrera även nya funktioner i tjänstekatalogen.',updated:'Sparat i den här webbläsaren',remove:'Återställ',allLocales:'Tillgängliga språk',
 },
 chrome:{
  family:'woori.today-tjänster',portal:'Startsida',calculators:'Kalkylatorer',tools:'Webbverktyg',money:'Gemensam hushållslogg',
  docs:'Dokument och formulär',quiz:'Frågesporter och tester',privacy:'Integritetspolicy',terms:'Användarvillkor',contact:'Kontakta oss',
  contactTitle:'Kontakta oss',inquiry:'Meddelandetyp',guidance:'Skicka ett meddelande till oss via e-post. Vi återkommer till dig.',
  email:'E-postadress',copy:'Kopiera e-postadress',copied:'E-postadressen har kopierats.',close:'Stäng',
  types:['Allmän fråga / funktionsförslag','Samarbete','Marknadsföring / förslag','Felrapport'],
 },
 editor:{
  myForms:'Mina formulär',newForm:'Skapa ett nytt formulär',open:'Öppna',rename:'Byt namn',duplicate:'Skapa en kopia',delete:'Ta bort',
  deleteConfirm:'Ta bort det här formuläret?',saveForm:'Spara formulär',addField:'Lägg till fält',fieldName:'Fältnamn',fieldType:'Fälttyp',
  required:'Obligatoriskt',moveUp:'Flytta upp',moveDown:'Flytta ned',removeField:'Ta bort fält',useDefault:'Använd standardformuläret',
  customize:'Anpassa formuläret',reset:'Återställ originalformuläret',text:'Kort text',textarea:'Lång text',number:'Tal',date:'Datum',
  time:'Tid',checkbox:'Kryssruta',select:'Välj alternativ',currency:'Belopp',percent:'Procent',email:'E-postadress',tel:'Telefon',
  blankTitle:'Nytt formulär',saved:'Sparat i den här webbläsaren',defaultValue:'Standardvärde',options:'Alternativ',
 },
 documentContent:{
  copy:{
   intro:'{title} är en redigerbar mall som hjälper dig att organisera information som ofta behövs inom {category}.',
   purpose:'Använd den för att dokumentera, granska eller lämna vidare uppgifter inom {category}, till exempel uppgifter, beslut och nästa steg.',
   audience:'Passar personer och team som tar fram eller underhåller register inom {category}.',
   structure:'Mallen innehåller följande fält: {fields}{more}',
   steps:'Kontrollera att fälten passar ditt syfte. Fyll först i de obligatoriska fälten och granska sedan ordningen och innehållet i förhandsgranskningen. Du kan ändra fälten i din egen kopia vid behov.',
   tips:'Ange datum, ansvariga och belopp som går att kontrollera. Håll bekräftade uppgifter åtskilda från öppna frågor och uppföljningsåtgärder.',
   source:'woori.today har tagit fram den här redigerbara referensmallen för vanliga dokumentationsuppgifter. Den är inte en kopia av ett officiellt formulär från någon annan organisation. Uppgifter du skriver in behandlas i den här webbläsaren.',
   caution:'Kontrollera organisationens regler och lokala krav innan du skickar in dokumentet. Mallen ersätter inte juridisk, skattemässig eller medicinsk rådgivning eller ett officiellt formulär.',
   faq1:'Var sparas det jag fyller i?',faq2:'Kan jag ändra fälten?',
   faqA1:'Utkastet sparas i den här webbläsarens lokala lagring och skickas inte till någon server.',
   faqA2:'Välj ”Anpassa formuläret” för att skapa en kopia. Lägg sedan till, ta bort eller ändra ordningen på fälten.',
   library:'woori.today-mallar kan fyllas i, förhandsgranskas, kopieras, laddas ned som text eller skrivas ut och sparas som PDF.',
   libraryUse:'Välj ett dokument, fyll i de fält du behöver och granska förhandsvisningen. Kopiera eller ladda ned texten, eller använd webbläsarens utskriftsdialog för att spara som PDF.',
   category:'Bläddra bland dokument i kategorin {category} efter syfte. Kontrollera vilka fält som ingår i varje mall innan du väljer.',
   more:' och {count} till',tableNote:'Det finns också en tabell för återkommande poster och totalsummor.',
  },
  specific:{
   form:'Använd {title} för att samla in och kontrollera information som behövs inom {category}, och lämna den vidare vid behov.',
   checklist:'Använd {title} för att markera slutförda kontroller och snabbt se vad som återstår.',
   planner:'Använd {title} för att planera datum och mål, prioritera och följa upp framstegen.',
   audience:'För personer och team som förbereder, granskar eller delar {title}.',
   stepFocus:' Var särskilt noga med {fields} så att dokumentet blir enkelt att granska och lämna vidare.',
   tipFocus:' Håll {fields} konsekventa och kontrollera i förhandsgranskningen att inget saknas.',
   faqFields:'Vilka uppgifter samlar mallen in?',
   faqFieldsAnswer:'Standardmallen innehåller {fields}. Du kan ändra din egen kopia så att den passar ditt arbetssätt.',
  },
  purposeFocus:' Använd {fields} som huvuduppgifter för den här processen.',
  sectionLabels:{overview:'Om mallen',audience:'Vem mallen passar för',contents:'Mallens fält och förhandsgranskning',steps:'Så fyller du i mallen',tips:'Skrivtips',source:'Mallens ursprung och datahantering',caution:'Innan du använder mallen'},
  recent:'Nyligen tillagda mallar',
 },
};
function compare(expected,actual,path='root'){
 if(Array.isArray(expected)){if(!Array.isArray(actual)||expected.length!==actual.length)throw new Error(`Shape mismatch: ${path}`);expected.forEach((v,i)=>compare(v,actual[i],`${path}[${i}]`));return;}
 if(expected&&typeof expected==='object'){const a=Object.keys(expected).sort(),b=Object.keys(actual??{}).sort();if(JSON.stringify(a)!==JSON.stringify(b))throw new Error(`Key mismatch: ${path}`);for(const k of a)compare(expected[k],actual[k],`${path}.${k}`);return;}
 if(typeof expected!=='string'||typeof actual!=='string')throw new Error(`Type mismatch: ${path}`);
 if(expected&&(!actual.trim()||expected===actual))throw new Error(`Empty or English copy: ${path}`);
 const tokens=v=>[...v.matchAll(/\{\w+\}/g)].map(([x])=>x).sort();if(JSON.stringify(tokens(expected))!==JSON.stringify(tokens(actual)))throw new Error(`Token mismatch: ${path}`);
}
for(const [section,value] of Object.entries(reviewed)){compare(en[section],value,section);draft[section]=value;}
draft.reviewedCounts={...(draft.reviewedCounts??{}),interface:9,categories:14,ui:47,chrome:18,editor:33,documentContent:34};
const total=Object.values(draft.reviewedCounts).reduce((sum,n)=>sum+n,0);
draft.reviewStatus=`${total}/699 units reviewed and corrected (titles and shared UI/document copy); unpublished`;
fs.writeFileSync(path,`${JSON.stringify(draft,null,2)}\n`,'utf8');
console.log(`Swedish shared UI and document copy reviewed: ${total}/699 units; unpublished.`);
