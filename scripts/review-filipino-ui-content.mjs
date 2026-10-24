import fs from 'node:fs';

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error('Usage: node scripts/review-filipino-ui-content.mjs <English-source.json>');
const en = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const path = 'docs/i18n-drafts/fil.json';
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));
const reviewed = {
  interface: {
    description: 'Gumawa at tingnan ang preview ng {title} direkta sa browser.',
    guide: 'May asterisk ang mga kailangang punan. Mag-save ng kopya sa iyong device bilang text file o i-print ito bilang PDF.',
    faqSaved: 'Saan naka-save ang dokumento ko?',
    faqLegal: 'Maaari ko ba itong gamitin bilang legal na may-bisang form?',
    draftSaved: 'Naka-save ang draft mo sa browser na ito.',
    clipboardError: 'Hindi magamit ang clipboard sa browser na ito.',
    requiredLabel: 'Kailangang punan', searchLabel: 'Maghanap ng mga dokumento',
    examplesBody: 'Magbigay ng maikli at makatotohanang detalye. Suriin ang mga petsa, pangalan, halaga, at lokal na rekisito bago magbahagi o mag-print.',
  },
  categories: {
    work: 'Negosyo at trabaho', finance: 'Pananalapi at accounting', 'hr-admin': 'Human resources at administrasyon',
    'project-management': 'Pamamahala ng proyekto', 'development-it': 'Software development at IT',
    'sales-customer': 'Sales at pamamahala ng customer', 'inventory-logistics': 'Imbentaryo at logistics',
    education: 'Paaralan at edukasyon', personal: 'Personal na buhay', 'health-fitness': 'Kalusugan at fitness',
    travel: 'Paglalakbay', checklists: 'Mga checklist', planning: 'Mga planner', records: 'Mga talaan',
  },
  ui: {
    brand: 'Mga Dokumento', tagline: 'Gumawa at mag-ayos ng mga kapaki-pakinabang na dokumento sa browser.',
    search: 'Maghanap ng mga template ng dokumento', categories: 'Mga kategorya', all: 'Lahat ng dokumento',
    popular: 'Pumili ng dokumento para makapagsimula', count: ' na dokumento',
    browser: 'Nananatili sa browser na ito ang mga inilagay mo. Hindi ipinapadala ang mga ito sa aming server o analytics service.',
    draft: 'Naka-save sa browser na ito', clear: 'Burahin ang mga field', copy: 'Kopyahin ang teksto', copied: 'Nakopya',
    print: 'I-print / I-save bilang PDF', download: 'I-download bilang text', preview: 'Live na preview',
    edit: 'I-edit ang dokumento', save: 'Awtomatikong naka-save', related: 'Mga kaugnay na dokumento',
    guide: 'Paano gamitin', examples: 'Mga tip sa pagsulat', faq: 'Mga madalas itanong',
    legal: 'Pangkalahatang draft at reference template lamang ito. Hindi ito legal na payo at hindi nito ginagarantiya ang legal na bisa. Kumonsulta sa kwalipikadong propesyonal sa iyong hurisdiksiyon bago gamitin.',
    home: 'Library ng mga dokumento', language: 'Wika', family: 'Mga serbisyo ng woori.today',
    portal: 'Pangunahing pahina', calculator: 'Kalkulador', tools: 'Mga online na tool', ledger: 'Pinagsasaluhang talaan ng sambahayan',
    docs: 'Mga dokumento', quiz: 'Mga quiz', privacy: 'Patakaran sa privacy', usage: 'Gabay sa paggamit',
    contact: 'Makipag-ugnayan', contactTitle: 'Makipag-ugnayan sa amin', email: 'Email address', close: 'Isara',
    empty: 'Walang nahanap na tumutugmang dokumento.', checked: 'Tapos na', adHidden: '',
    placeholder: 'Ilagay ang iyong teksto', required: 'Kailangang punan ang field na ito',
    templateNote: 'Lalabas agad sa preview ang mga inilagay mo.',
    newFeature: 'Irehistro rin sa service catalog ang bawat bagong feature.',
    updated: 'Naka-save sa browser na ito', remove: 'I-reset', allLocales: 'Mga available na wika',
  },
  chrome: {
    family: 'Mga serbisyo ng woori.today', portal: 'Pangunahing pahina', calculators: 'Mga calculator',
    tools: 'Mga online na tool', money: 'Pinagsasaluhang talaan ng sambahayan', docs: 'Mga dokumento at form',
    quiz: 'Mga quiz at test', privacy: 'Patakaran sa privacy', terms: 'Mga tuntunin', contact: 'Makipag-ugnayan',
    contactTitle: 'Makipag-ugnayan sa amin', inquiry: 'Uri ng mensahe',
    guidance: 'Ipadala sa amin ang iyong mensahe sa pamamagitan ng email. Sasagot kami sa iyo.',
    email: 'Email address', copy: 'Kopyahin ang email address', copied: 'Nakopya ang email address.', close: 'Isara',
    types: ['Pangkalahatang tanong / feature', 'Pakikipagtulungan', 'Promosyon / panukala', 'Ulat ng bug'],
  },
  editor: {
    myForms: 'Mga form ko', newForm: 'Gumawa ng bagong form', open: 'Buksan', rename: 'Palitan ang pangalan',
    duplicate: 'Gumawa ng kopya', delete: 'Burahin', deleteConfirm: 'Burahin ang form na ito?',
    saveForm: 'I-save ang form', addField: 'Magdagdag ng field', fieldName: 'Pangalan ng field', fieldType: 'Uri ng field',
    required: 'Kailangang punan', moveUp: 'Itaas', moveDown: 'Ibaba', removeField: 'Alisin ang field',
    useDefault: 'Gamitin ang default na form', customize: 'I-customize ang form na ito',
    reset: 'Ibalik ang orihinal na form', text: 'Maikling teksto', textarea: 'Mahabang teksto',
    number: 'Numero', date: 'Petsa', time: 'Oras', checkbox: 'Kahon ng pagpili', select: 'Pagpipilian',
    currency: 'Halaga', percent: 'Porsiyento', email: 'Email address', tel: 'Telepono', blankTitle: 'Bagong form',
    saved: 'Naka-save sa browser na ito', defaultValue: 'Default na halaga', options: 'Mga pagpipilian',
  },
  documentContent: {
    copy: {
      intro: '{title} ay editable na template para ayusin ang impormasyong karaniwang kailangan sa trabaho sa {category}.',
      purpose: 'Gamitin ito para magtala, magsuri, o magpasa ng mga detalye tungkol sa {category}, gaya ng mga gawain, desisyon, at susunod na hakbang.',
      audience: 'Angkop ito sa mga tao at pangkat na naghahanda o nag-aalaga ng mga tala para sa {category}.',
      structure: 'Inayos ang template ayon sa mga sumusunod na entry: {fields}{more}',
      steps: 'Tiyaking naaayon sa layunin mo ang mga entry. Unahin ang mga kailangang punan, pagkatapos ay suriin ang pagkakasunod-sunod at nilalaman sa preview. Maaari mong baguhin ang mga field sa sarili mong kopya kung kinakailangan.',
      tips: 'Maingat na ilagay ang mga petsa, responsable, at halaga na mabe-verify. Ihiwalay ang kumpirmadong impormasyon sa mga bukas na tanong at susunod na hakbang.',
      source: 'Inihanda ng woori.today ang editable na reference template na ito para sa mga karaniwang gawaing pagtatala. Hindi ito kopya ng opisyal na form mula sa ibang organisasyon. Pinoproseso sa browser na ito ang mga inilagay mong impormasyon.',
      caution: 'Suriin ang mga patakaran ng organisasyon mo at ang mga lokal na rekisito bago isumite ang dokumento. Hindi kapalit ng legal, tax, o medical na payo o ng opisyal na form ang template na ito.',
      faq1: 'Saan naka-save ang ginawa ko?', faq2: 'Maaari ko bang baguhin ang mga field?',
      faqA1: 'Naka-save ang draft sa local storage ng browser na ito at hindi ito ipinapadala sa server.',
      faqA2: 'Piliin ang “I-customize ang template na ito” para gumawa ng kopya. Pagkatapos, magdagdag, mag-alis, o mag-ayos muli ng mga field.',
      library: 'Maaaring punan, i-preview, kopyahin, i-download bilang text, o i-print at i-save bilang PDF ang mga template ng woori.today.',
      libraryUse: 'Pumili ng dokumento, punan ang mga kailangan mong entry, at suriin ang preview. Kopyahin o i-download ang text, o gamitin ang print dialog ng browser para mag-save bilang PDF.',
      category: 'Mag-browse ng mga dokumento sa {category} ayon sa layunin. Suriin ang mga field na kasama sa bawat template bago pumili.',
      more: ' at {count} pa', tableNote: 'May kasama ring talahanayan para sa paulit-ulit na entry at mga kabuuan.',
    },
    specific: {
      form: 'Gamitin ang {title} para tipunin at suriin ang impormasyong kailangan sa {category}, at ipasa ito sa susunod na tao kung kinakailangan.',
      checklist: 'Gamitin ang {title} para markahan ang mga nakumpletong pagsusuri at mabilis makita ang mga item na kailangan pang asikasuhin.',
      planner: 'Gamitin ang {title} para ilatag ang mga petsa at layunin, magtakda ng prayoridad, at subaybayan ang progreso.',
      audience: 'Para ito sa mga tao at pangkat na naghahanda, nagsusuri, o nagbabahagi ng {title}.',
      stepFocus: ' Bigyang-pansin ang {fields} para mas madaling suriin at ipasa ang dokumento.',
      tipFocus: ' Panatilihing magkakatugma ang {fields}, at tingnan sa preview kung may kulang bago gamitin ang dokumento.',
      faqFields: 'Anong impormasyon ang kinokolekta ng template na ito?',
      faqFieldsAnswer: 'Kasama sa default na template ang {fields}. Maaari mong baguhin ang sarili mong kopya ayon sa daloy ng trabaho mo.',
    },
    purposeFocus: ' Gamitin ang {fields} bilang pangunahing tala para sa prosesong ito.',
    sectionLabels: {
      overview: 'Tungkol sa template na ito', audience: 'Para kanino ito',
      contents: 'Mga kasamang field at preview', steps: 'Paano ito kumpletuhin', tips: 'Mga tip sa pagsulat',
      source: 'Pinagmulan ng template at pagproseso ng data', caution: 'Bago gamitin',
    },
    recent: 'Mga bagong idinagdag na template',
  },
};

function compareShape(actual, expected, path) {
  if (Array.isArray(expected)) {
    if (!Array.isArray(actual) || actual.length !== expected.length) throw new Error(`Array mismatch at ${path}`);
    expected.forEach((value, index) => compareShape(actual[index], value, `${path}[${index}]`));
  } else if (expected && typeof expected === 'object') {
    if (!actual || typeof actual !== 'object' || Array.isArray(actual)) throw new Error(`Object mismatch at ${path}`);
    if (JSON.stringify(Object.keys(actual).sort()) !== JSON.stringify(Object.keys(expected).sort())) throw new Error(`Key mismatch at ${path}`);
    for (const [key, value] of Object.entries(expected)) compareShape(actual[key], value, `${path}.${key}`);
  } else {
    if (typeof actual !== 'string' || (expected && !actual.trim())) throw new Error(`Empty or non-string value at ${path}`);
    const expectedTokens = [...expected.matchAll(/\{\w+\}/g)].map(([token]) => token).sort().join('|');
    const actualTokens = [...actual.matchAll(/\{\w+\}/g)].map(([token]) => token).sort().join('|');
    if (expectedTokens !== actualTokens) throw new Error(`Interpolation mismatch at ${path}`);
    if (expected && actual.trim() === expected.trim()) throw new Error(`English source copy at ${path}`);
  }
}

for (const section of Object.keys(reviewed)) compareShape(reviewed[section], en[section], section);
draft.interface = reviewed.interface;
draft.categories = reviewed.categories;
draft.ui = reviewed.ui;
draft.chrome = reviewed.chrome;
draft.editor = reviewed.editor;
draft.documentContent = reviewed.documentContent;
draft.reviewedCounts = { titles: 119, fields: 425, interface: 9, categories: 14, ui: 47, chrome: 18, editor: 33, documentContent: 34 };
draft.reviewStatus = 'Editorial translation review complete; unpublished pending Filipino runtime connection and verification';
fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log('Filipino editorial review complete: 699/699 units; runtime connection and verification remain.');
