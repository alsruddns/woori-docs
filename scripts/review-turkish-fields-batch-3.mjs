import fs from 'node:fs';

const path = 'docs/i18n-drafts/tr.json';
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));
const english = JSON.parse(fs.readFileSync('src/lib/document-translations.json', 'utf8')).en.fields;
const keys = Object.keys(english).slice(250, 375);
const translations = {
  'Decision title': 'Karar başlığı', Details: 'Ayrıntılar', 'Detection time': 'Tespit zamanı',
  'Development areas': 'Gelişim alanları', 'Discussion points': 'Görüşme konuları', 'Disk usage': 'Disk kullanımı',
  Distance: 'Mesafe', 'Document number': 'Belge numarası', Driver: 'Sürücü', Duration: 'Süre', Effort: 'Emek',
  Employee: 'Çalışan', 'Employee ID': 'Çalışan numarası', 'End date': 'Bitiş tarihi', 'End time': 'Bitiş saati',
  'Energy level': 'Enerji düzeyi', Environment: 'Ortam', Equipment: 'Ekipman', 'Estimated budget': 'Tahmini bütçe',
  'Estimated cost': 'Tahmini maliyet', 'Estimated time': 'Tahmini süre', 'Exam date': 'Sınav tarihi', Exercise: 'Egzersiz',
  'Expected delivery': 'Beklenen teslim tarihi', Expense: 'Masraf', 'Expense category': 'Masraf kategorisi',
  'Expense date': 'Masraf tarihi', 'Expense items': 'Masraf kalemleri', 'Favorite quote': 'Favori alıntı',
  Feature: 'Özellik', 'File location': 'Dosya konumu', 'Finish date': 'Tamamlanma tarihi',
  'Follow-up actions': 'Takip işlemleri', 'Follow-up date': 'Takip tarihi', 'Follow-up tasks': 'Takip görevleri',
  'Goal weight': 'Hedef kilo', Grade: 'Not', Improvements: 'İyileştirmeler', 'Incident date': 'Olay tarihi',
  'Incident title': 'Olay başlığı', 'Inquiry ID': 'Talep numarası', 'Inquiry date': 'Talep tarihi',
  'Inquiry details': 'Talep ayrıntıları', Instructor: 'Eğitmen', Interviewer: 'Görüşmeci',
  'Issue details': 'Sorun ayrıntıları', 'Issue number': 'Sorun numarası', 'Issued date': 'Düzenlenme tarihi',
  'Key concepts': 'Temel kavramlar', 'Known issues': 'Bilinen sorunlar', 'Leave type': 'İzin türü',
  'Lessons learned': 'Edinilen dersler', Manager: 'Yönetici', 'Meal date': 'Yemek tarihi', 'Meal time': 'Yemek saati',
  'Meal type': 'Yemek türü', 'Measurement time': 'Ölçüm saati', 'Meeting date': 'Toplantı tarihi',
  'Meeting purpose': 'Toplantının amacı', Meetings: 'Toplantılar', 'Memory usage': 'Bellek kullanımı',
  Merchant: 'Satıcı', Mitigation: 'Azaltıcı önlem', 'New features': 'Yeni özellikler', 'Next action': 'Sonraki işlem',
  'Next service date': 'Sonraki servis tarihi', 'Odometer end': 'Bitiş kilometre sayacı',
  'Odometer start': 'Başlangıç kilometre sayacı', 'Opening balance': 'Açılış bakiyesi',
  'Options considered': 'Değerlendirilen seçenekler', 'Order date': 'Sipariş tarihi', Outcome: 'Sonuç',
  Outcomes: 'Sonuçlar', Pages: 'Sayfalar', Participants: 'Katılımcılar', 'Payment purpose': 'Ödeme amacı',
  Portion: 'Porsiyon', Position: 'Pozisyon', Preconditions: 'Ön koşullar', 'Prepared by': 'Hazırlayan',
  Probability: 'Olasılık', 'Product or service': 'Ürün veya hizmet', Progress: 'İlerleme',
  'Proposals sent': 'Gönderilen teklifler', 'Pull request': 'Kod birleştirme isteği', Quantity: 'Miktar',
  Questions: 'Sorular', Rating: 'Puan', Reason: 'Gerekçe', 'Receipt attached': 'Makbuz eklendi',
  'Receipt type': 'Makbuz türü', 'Received date': 'Alınma tarihi', Receiver: 'Teslim alan',
  Recommendation: 'Öneri', 'Record date': 'Kayıt tarihi', 'Record title': 'Kayıt başlığı',
  'Reference number': 'Referans numarası', Release: 'Sürüm', 'Release date': 'Yayın tarihi',
  'Release version': 'Sürüm numarası', Repetitions: 'Tekrar sayısı', 'Report date': 'Rapor tarihi',
  'Report period': 'Rapor dönemi', 'Request date': 'Talep tarihi', 'Request title': 'Talep başlığı',
  'Requested team': 'Talep edilen ekip', Requester: 'Talep sahibi', 'Requirement ID': 'Gereksinim kimliği',
  'Requirement title': 'Gereksinim başlığı', Requirements: 'Gereksinimler', 'Reservation number': 'Rezervasyon numarası',
  Resolution: 'Çözüm', 'Resolution time': 'Çözüm süresi', 'Resolved date': 'Çözülme tarihi', Revenue: 'Gelir',
  'Review period': 'Değerlendirme dönemi', Reviewer: 'Değerlendiren', 'Risk title': 'Risk başlığı',
  'Role fit': 'Pozisyona uygunluk', 'Rollback plan': 'Geri alma planı', 'Root cause': 'Temel neden',
  'Running balance': 'Güncel bakiye', SKU: 'Stok kodu', Salesperson: 'Satış temsilcisi', Scenario: 'Senaryo',
};
const missing = keys.filter((key) => !(key in translations));
if (missing.length) throw new Error(`Missing reviewed Turkish fields: ${missing.join(', ')}`);
for (const key of keys) draft.fields[key] = translations[key];
draft.reviewedCounts.fields = 375;
draft.editorialReview = 'Manually translated and checked Turkish titles, first 375 field labels, UI, site chrome, editor, document interface, categories, and generated document text; final 50 field labels remain unreviewed.';
fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log(`Reviewed ${keys.length} additional Turkish field labels; locale remains unpublished.`);
