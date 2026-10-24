import fs from 'node:fs';

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error('Usage: node scripts/review-ro-ui-content.mjs <English-source.json>');
const en = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const path = 'docs/i18n-drafts/ro.json';
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));
const reviewed = {
  interface: {
    description: 'Creează și previzualizează {title} direct în browser.',
    guide: 'Câmpurile obligatorii sunt marcate cu un asterisc. Salvează o copie pe dispozitiv ca fișier text sau tipărește documentul în format PDF.',
    faqSaved: 'Unde este salvat documentul meu?',
    faqLegal: 'Pot folosi acest document ca formular cu valoare juridică?',
    draftSaved: 'Ciorna este salvată în acest browser.',
    clipboardError: 'Funcția de copiere nu este disponibilă în acest browser.',
    requiredLabel: 'Obligatoriu',
    searchLabel: 'Caută documente',
    examplesBody: 'Introdu informații concise și exacte. Verifică datele, numele, sumele și cerințele locale înainte de a partaja sau tipări documentul.',
  },
  categories: {
    work: 'Companie și muncă', finance: 'Finanțe și contabilitate', 'hr-admin': 'Resurse umane și administrație',
    'project-management': 'Management de proiect', 'development-it': 'Dezvoltare și IT', 'sales-customer': 'Vânzări și relații cu clienții',
    'inventory-logistics': 'Stocuri și logistică', education: 'Școală și educație', personal: 'Viață personală',
    'health-fitness': 'Sănătate și fitness', travel: 'Călătorii', checklists: 'Liste de verificare', planning: 'Planificare', records: 'Evidențe',
  },
  ui: {
    brand: 'Documente', tagline: 'Creează și organizează documente utile direct în browser.', search: 'Caută șabloane de documente',
    categories: 'Categorii', all: 'Toate documentele', popular: 'Alege un document pentru a începe', count: ' documente',
    browser: 'Datele introduse rămân în acest browser. Nu sunt trimise către serverele noastre sau către serviciile de analiză.',
    draft: 'Salvat în acest browser', clear: 'Șterge câmpurile', copy: 'Copiază textul', copied: 'Copiat', print: 'Tipărește / Salvează ca PDF',
    download: 'Descarcă fișierul text', preview: 'Previzualizare în timp real', edit: 'Editează documentul', save: 'Salvat automat',
    related: 'Documente similare', guide: 'Cum se folosește', examples: 'Sfaturi de redactare', faq: 'Întrebări frecvente',
    legal: 'Acesta este un șablon orientativ, cu caracter general, și nu reprezintă consultanță juridică sau o garanție privind efectele sale legale. Înainte de utilizare, cere sfatul unui specialist calificat din jurisdicția ta.',
    home: 'Biblioteca de documente', language: 'Limbă', family: 'Site-urile noastre', portal: 'Pagina principală', calculator: 'Instrument de calcul',
    tools: 'Instrumente online', ledger: 'Registru comun al gospodăriei', docs: 'Documente', quiz: 'Chestionare', privacy: 'Confidențialitate',
    usage: 'Ghid de utilizare', contact: 'Contactează-ne', contactTitle: 'Contactează-ne', email: 'E-mail', close: 'Închide',
    empty: 'Nu a fost găsit niciun document corespunzător.', checked: 'Gata', adHidden: '', placeholder: 'Introdu textul',
    required: 'Acest câmp este obligatoriu', templateNote: 'Textul introdus apare imediat în previzualizare.',
    newFeature: 'Adaugă fiecare funcție nouă și în catalogul de servicii.', updated: 'Salvat în acest browser', remove: 'Resetează', allLocales: 'Limbi disponibile',
  },
  chrome: {
    family: 'Site-urile noastre', portal: 'Pagina principală', calculators: 'Calculatoare', tools: 'Instrumente online',
    money: 'Registru comun al gospodăriei', docs: 'Documente și formulare', quiz: 'Quiz-uri și teste', privacy: 'Confidențialitate',
    terms: 'Termeni și condiții', contact: 'Contactează-ne', contactTitle: 'Contactează-ne', inquiry: 'Tipul solicitării',
    guidance: 'Trimite-ne solicitarea prin e-mail. Îți vom răspunde.', email: 'E-mail', copy: 'Copiază adresa de e-mail',
    copied: 'Adresa de e-mail a fost copiată.', close: 'Închide',
    types: ['Întrebare generală / sugestie de funcție', 'Colaborare', 'Publicitate / propunere', 'Raportarea unei erori'],
  },
  editor: {
    myForms: 'Formularele mele', newForm: 'Creează un formular nou', open: 'Deschide', rename: 'Redenumește', duplicate: 'Creează o copie',
    delete: 'Șterge', deleteConfirm: 'Ștergi acest formular?', saveForm: 'Salvează formularul', addField: 'Adaugă un câmp',
    fieldName: 'Numele câmpului', fieldType: 'Tipul câmpului', required: 'Obligatoriu', moveUp: 'Mută mai sus', moveDown: 'Mută mai jos',
    removeField: 'Elimină câmpul', useDefault: 'Folosește formularul implicit', customize: 'Personalizează formularul',
    reset: 'Restabilește formularul inițial', text: 'Text scurt', textarea: 'Text lung', number: 'Număr', date: 'Dată', time: 'Oră',
    checkbox: 'Casetă de bifat', select: 'Opțiune', currency: 'Sumă', percent: 'Procent', email: 'Adresă de e-mail', tel: 'Telefon',
    blankTitle: 'Formular nou', saved: 'Salvat în acest browser', defaultValue: 'Valoare implicită', options: 'Opțiuni',
  },
  documentContent: {
    copy: {
      intro: '{title} este un șablon editabil pentru organizarea informațiilor folosite de obicei în domeniul {category}.',
      purpose: 'Folosește-l pentru a înregistra, verifica sau transmite informații din domeniul {category}, precum sarcini, decizii și pașii următori.',
      audience: 'Este destinat persoanelor și echipelor care pregătesc sau gestionează evidențe în domeniul {category}.',
      structure: 'Șablonul conține următoarele câmpuri: {fields}{more}',
      steps: 'Verifică dacă aceste câmpuri corespund scopului tău. Completează mai întâi câmpurile obligatorii, apoi verifică ordinea și conținutul în previzualizare. În copia ta poți modifica câmpurile după nevoie.',
      tips: 'Introdu date verificabile, persoane responsabile și sume cu atenție. Separă informațiile confirmate de întrebările deschise și de acțiunile care urmează.',
      source: 'woori.today a creat acest șablon de referință editabil pentru evidențe uzuale. Nu este o copie a unui formular oficial al altei organizații. Datele introduse sunt procesate în acest browser.',
      caution: 'Înainte de a trimite documentul, verifică regulile organizației și cerințele locale. Acest șablon nu înlocuiește consultanța juridică, fiscală sau medicală și nici un formular oficial.',
      faq1: 'Unde sunt salvate informațiile completate?', faq2: 'Pot modifica aceste câmpuri?',
      faqA1: 'Ciorna este salvată în spațiul de stocare local al acestui browser și nu este trimisă serverului.',
      faqA2: 'Alege „Personalizează formularul” pentru a crea o copie. Apoi poți adăuga, elimina sau reordona câmpurile.',
      library: 'Șabloanele woori.today pot fi completate, previzualizate, copiate, descărcate ca text sau tipărite în format PDF.',
      libraryUse: 'Alege un document, completează câmpurile necesare și verifică previzualizarea. Copiază sau descarcă textul ori folosește funcția de tipărire a browserului pentru a-l salva ca PDF.',
      category: 'Răsfoiește documentele din categoria {category} în funcție de scop. Verifică ce câmpuri conține fiecare șablon înainte de a alege.',
      more: ' și încă {count}', tableNote: 'Este inclus și un tabel pentru înregistrări repetate și totaluri.',
    },
    specific: {
      form: 'Folosește {title} pentru a aduna și verifica informațiile necesare în domeniul {category}, apoi transmite-le, dacă este cazul, următoarei persoane.',
      checklist: 'Folosește {title} pentru a bifa verificările finalizate și pentru a vedea rapid ce mai trebuie făcut.',
      planner: 'Folosește {title} pentru a planifica date și obiective, a stabili priorități și a urmări progresul.',
      audience: 'Pentru persoane și echipe care pregătesc, verifică sau distribuie documentul {title}.',
      stepFocus: ' Concentrează-te pe {fields}, astfel încât documentul să poată fi verificat și transmis cu ușurință.',
      tipFocus: ' Completează {fields} consecvent și verifică în previzualizare dacă lipsește ceva.',
      faqFields: 'Ce informații colectează acest șablon?',
      faqFieldsAnswer: 'Șablonul implicit include {fields}. În copia ta le poți modifica pentru a se potrivi fluxului tău de lucru.',
    },
    purposeFocus: ' Folosește {fields} ca evidențe principale pentru acest proces.',
    sectionLabels: {
      overview: 'Despre acest șablon', audience: 'Cui i se adresează', contents: 'Câmpuri și previzualizare',
      steps: 'Cum se completează', tips: 'Sfaturi de redactare', source: 'Sursa șablonului și prelucrarea datelor', caution: 'Înainte de utilizare',
    },
    recent: 'Șabloane adăugate recent',
  },
};

function compare(a, b, path = 'root') {
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) throw new Error(`Shape mismatch ${path}`);
    a.forEach((value, index) => compare(value, b[index], `${path}[${index}]`));
    return;
  }
  if (a && typeof a === 'object') {
    const sourceKeys = Object.keys(a).sort();
    const translatedKeys = Object.keys(b ?? {}).sort();
    if (JSON.stringify(sourceKeys) !== JSON.stringify(translatedKeys)) throw new Error(`Keys mismatch ${path}`);
    for (const key of sourceKeys) compare(a[key], b[key], `${path}.${key}`);
    return;
  }
  if (typeof a !== 'string' || typeof b !== 'string') throw new Error(`Type mismatch ${path}`);
  if (a && (!b.trim() || a.trim() === b.trim())) throw new Error(`Empty or English copy ${path}`);
  const tokens = (value) => [...value.matchAll(/\{\w+\}/g)].map(([token]) => token).sort();
  if (JSON.stringify(tokens(a)) !== JSON.stringify(tokens(b))) throw new Error(`Token mismatch ${path}`);
}

for (const [section, value] of Object.entries(reviewed)) {
  compare(en[section], value, section);
  draft[section] = value;
}
draft.reviewedCounts = { ...draft.reviewedCounts, interface: 9, categories: 14, ui: 47, chrome: 18, editor: 33, documentContent: 34 };
const total = Object.values(draft.reviewedCounts).reduce((sum, count) => sum + count, 0);
if (!String(draft.reviewStatus).includes('translation review complete (699/699 units)')) {
  draft.reviewStatus = `${total}/699 units reviewed and corrected (titles and shared UI/document copy); unpublished`;
}
const templateSchema = fs.readFileSync('src/lib/template-schema.ts', 'utf8');
if (/export const locales = \[[^\]]*"ro"/.test(templateSchema)) {
  const runtimePath = 'src/lib/chrome-i18n.ts';
  let runtime = fs.readFileSync(runtimePath, 'utf8');
  const recordStart = runtime.indexOf('export const ui: Record<Locale, Record<string, string>> = {');
  const recordEnd = runtime.indexOf('\n};', recordStart);
  const entryStart = runtime.indexOf('\n  ro:', recordStart);
  if (recordStart < 0 || recordEnd < 0 || entryStart < 0 || entryStart > recordEnd) throw new Error('Romanian runtime UI record is missing.');
  const entryEnd = runtime.indexOf('\n', entryStart + 1);
  runtime = `${runtime.slice(0, entryStart)}\n  ro:${JSON.stringify(reviewed.ui)},${runtime.slice(entryEnd)}`;
  fs.writeFileSync(runtimePath, runtime, 'utf8');
}
fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log(`Romanian shared UI, categories and document copy reviewed: ${total}/699 units; unpublished.`);
