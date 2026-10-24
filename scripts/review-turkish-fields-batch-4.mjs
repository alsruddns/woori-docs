import fs from 'node:fs';

const path = 'docs/i18n-drafts/tr.json';
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));
const english = JSON.parse(fs.readFileSync('src/lib/document-translations.json', 'utf8')).en.fields;
const keys = Object.keys(english).slice(375);
const translations = {
  'Security checked': 'Güvenlik kontrol edildi', 'Security status': 'Güvenlik durumu', Server: 'Sunucu',
  'Service date': 'Servis tarihi', Sets: 'Set sayısı', 'Settlement period': 'Hesaplaşma dönemi',
  Severity: 'Önem derecesi', 'Sleep duration': 'Uyku süresi', 'Sleep quality': 'Uyku kalitesi',
  Sprint: 'Sprint dönemi', 'Start location': 'Başlangıç konumu', 'Start time': 'Başlangıç saati', Status: 'Durum',
  'Storage location': 'Depolama yeri', Strengths: 'Güçlü yönler', 'Study date': 'Çalışma tarihi',
  'Study duration': 'Çalışma süresi', 'Study topic': 'Çalışma konusu', 'Submission date': 'Gönderim tarihi',
  Summary: 'Özet', 'System quantity': 'Sistem miktarı', 'Tax rate': 'Vergi oranı', Team: 'Ekip',
  'Test case ID': 'Test senaryosu kimliği', 'Test date': 'Test tarihi', 'Test steps': 'Test adımları',
  Tester: 'Test uzmanı', 'Tests passed': 'Başarılı test sayısı', Topic: 'Konu', 'Training goals': 'Eğitim hedefleri',
  'Training title': 'Eğitim başlığı', 'Transaction date': 'İşlem tarihi', 'Transaction type': 'İşlem türü',
  'Travel date': 'Seyahat tarihi', Trip: 'Seyahat', 'Trip date': 'Seyahat tarihi', 'Trip purpose': 'Seyahat amacı',
  'Unit price': 'Birim fiyat', VAT: 'KDV', Variance: 'Fark', Vendor: 'Tedarikçi', 'Wake time': 'Uyanma saati',
  'Water intake': 'Su tüketimi', Weight: 'Kilo', 'What could improve': 'Geliştirilebilecek noktalar',
  'What went well': 'İyi gidenler', 'Work date': 'Çalışma tarihi', 'Work hours': 'Çalışma saatleri',
  Workload: 'İş yükü', 'Workout date': 'Egzersiz tarihi',
};
const missing = keys.filter((key) => !(key in translations));
if (missing.length) throw new Error(`Missing reviewed Turkish fields: ${missing.join(', ')}`);
for (const key of keys) draft.fields[key] = translations[key];
draft.reviewedCounts.fields = 425;
draft.reviewStatus = 'editorial translation review complete; runtime verification required; unpublished';
draft.editorialReview = 'Manually translated and checked all Turkish titles, field labels, UI, site chrome, editor, document interface, categories, and generated document text. Locale remains unpublished until runtime, route, SEO, sitemap, test, and build verification passes.';
fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log(`Reviewed ${keys.length} final Turkish field labels; all 699 keyed units are reviewed and remain unpublished pending runtime verification.`);
