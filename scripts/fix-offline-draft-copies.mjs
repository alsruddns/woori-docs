import fs from 'node:fs';

const corrections = {
  tr: {
    titles: {
      "expense-processing-checklist": "Harcama işleme kontrol listesi",
      "deployment-checklist": "Dağıtım kontrol listesi",
      "code-review-checklist": "Kod inceleme kontrol listesi",
      "stock-issue-log": "Stok çıkış kayıt çizelgesi",
      "assignment-tracker": "Görev takip çizelgesi",
      "meal-tracker": "Öğün takip çizelgesi",
    },
    categories: { "project-management": "Proje yönetimi", checklists: "Kontrol listeleri" },
    ui: { brand: "Dokümanlar", clear: "Temizle", copied: "Kopyalandı", download: "İndir", portal: "Ana portal", docs: "Belgeler", quiz: "Testler", checked: "Tamamlandı" },
    chrome: { portal: "Ana portal" },
    editor: { rename: "Yeniden adlandır", duplicate: "Kopyasını oluştur", delete: "Sil", checkbox: "Onay kutusu" },
  },
  pl: {
    fields: { Weekend: "Dni weekendowe", Itinerary: "Plan podróży", Transport: "Środek transportu", Freelancer: "Osoba pracująca na własny rachunek", SKU: "Kod SKU", Sprint: "Iteracja", Tester: "Osoba testująca", VAT: "Podatek VAT" },
    ui: { quiz: "Testy" },
  },
  fil: {
    titles: {
      "invoice-generator": "Tagabuo ng invoice", "receipt-generator": "Tagabuo ng resibo",
      "purchase-order-generator": "Tagabuo ng order sa pagbili", "transaction-statement-generator": "Tagabuo ng pahayag ng transaksyon",
      "project-plan-template": "Template ng plano ng proyekto", "task-list-template": "Template ng listahan ng gawain",
      "consent-form-template": "Template ng pormularyo ng pahintulot", "test-case-template": "Template ng kaso ng pagsusuri",
      "inventory-count-sheet": "Talaan ng bilang ng imbentaryo", "purchase-order-tracker": "Tagasubaybay ng order sa pagbili",
    },
    fields: {
      Email: "Address ng email", Tax: "Buwis", Reporter: "Tagapag-ulat", "Target date": "Nakatakdang petsa",
      Attire: "Kasuotan", Reference: "Sanggunian", Channel: "Daluyan", "Exam date": "Petsa ng pagsusulit",
      "Inquiry ID": "ID ng katanungan", Merchant: "Mangangalakal", SKU: "Kodigo ng SKU",
      "Transaction type": "Uri ng transaksyon", Vendor: "Tagapagbigay",
    },
    ui: { quiz: "Pagsusulit", email: "E-mail" },
    chrome: { docs: "Mga dokumento", quiz: "Pagsusulit", email: "E-mail" },
    editor: { percent: "Porsiyento", email: "E-mail" },
  },
  bn: { categories: { planning: "পরিকল্পনা" } },
  ms: {
    fields: {
      Email: "E-mel", Total: "Jumlah keseluruhan", Agenda: "Atur cara", Impact: "Kesan",
      Lender: "Pemberi pinjaman", Item: "Butiran", Venue: "Tempat acara", Freelancer: "Pekerja bebas",
      Portion: "Bahagian", Server: "Pelayan", Sprint: "Kitaran kerja", Status: "Keadaan",
    },
    ui: { portal: "Laman utama", email: "E-mel" },
    chrome: { portal: "Laman utama", email: "E-mel" },
    editor: { email: "E-mel" },
  },
  sv: {
    titles: { "receipt-generator": "Kvittoverktyg", "performance-review-form": "Formulär för utvecklingssamtal", "inventory-count-sheet": "Inventeringslista" },
    fields: {
      Subtotal: "Delsumma", Sender: "Avsändare", Period: "Tidsperiod", Approver: "Attestansvarig",
      Destination: "Resmål", Lodging: "Boende", Agenda: "Dagordning", Scope: "Omfattning",
      Reporter: "Rapportör", Impact: "Påverkan", Principal: "Lånebelopp", Itinerary: "Resplan",
      Event: "Evenemang", Venue: "Plats", Attire: "Klädsel", Attachment: "Bilaga",
      "Bug fixes": "Felkorrigeringar", Cardholder: "Kortinnehavare", Counter: "Räknare",
      "Deals closed": "Avslutade affärer", Effort: "Arbetsinsats", Interviewer: "Intervjuare",
      Merchant: "Handlare", Mitigation: "Riskåtgärd", "Odometer start": "Vägmätarställning vid start",
      Outcome: "Resultat", Portion: "Andel", Position: "Befattning", "Pull request": "Kodändringsförslag",
      Requester: "Beställare", Scenario: "Händelseförlopp", Sprint: "Arbetsperiod", Status: "Läge",
      "Test case ID": "Testfalls-ID", Trip: "Resa", Workload: "Arbetsbelastning",
    },
    categories: { records: "Register" },
    ui: { brand: "Dokument", portal: "Portalsida", docs: "Dokument", quiz: "Frågesporter", checked: "Klart" },
    chrome: { portal: "Portalsida" },
    editor: { rename: "Byt namn", delete: "Ta bort", checkbox: "Kryssruta" },
  },
  cs: {
    fields: {
      Lender: "Věřitel", Freelancer: "Osoba samostatně výdělečně činná", Payer: "Plátce", Counter: "Počítadlo",
      SKU: "Kód SKU", Server: "Počítačový server", Sprint: "Pracovní cyklus", Tester: "Testující osoba", Vendor: "Dodavatel",
    },
  },
  ro: {
    fields: {
      Total: "Sumă totală", Reporter: "Raportor", Impact: "Efect", Lender: "Creditor",
      Principal: "Capital împrumutat", Weekend: "Sfârșit de săptămână", Client: "Beneficiar",
      Freelancer: "Liber-profesionist", Contact: "Date de contact", Context: "Contextualizare",
      Counter: "Contor", Instructor: "Formator", SKU: "Cod SKU", Server: "Server informatic",
      Sprint: "Ciclu de lucru", Trip: "Călătorie", Variance: "Abatere",
    },
    ui: { portal: "Pagina principală", calculator: "Instrument de calcul", contact: "Contacte" },
    chrome: { portal: "Pagina principală", contact: "Contacte" },
  },
};

let changed = 0;
for (const [locale, sections] of Object.entries(corrections)) {
  const path = `docs/i18n-drafts/${locale}.json`;
  const draft = JSON.parse(fs.readFileSync(path, "utf8"));
  for (const [section, values] of Object.entries(sections)) {
    for (const [key, value] of Object.entries(values)) {
      if (!draft[section]?.[key]) throw new Error(`Missing ${locale}.${section}.${key}`);
      draft[section][key] = value;
      changed += 1;
    }
  }
  fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, "utf8");
}
console.log(`Applied ${changed} manual draft corrections; all locales remain unpublished.`);
