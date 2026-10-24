import fs from 'node:fs';

const path = 'docs/i18n-drafts/tr.json';
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));
const english = JSON.parse(fs.readFileSync('src/lib/document-translations.json', 'utf8')).en.fields;
const keys = Object.keys(english).slice(125, 250);
const translations = {
  'Top priorities': 'En önemli öncelikler', Schedule: 'Program', Tasks: 'Görevler', 'Week of': 'Başlangıç haftası',
  'Weekly goals': 'Haftalık hedefler', Monday: 'Pazartesi', Tuesday: 'Salı', Wednesday: 'Çarşamba', Thursday: 'Perşembe',
  Friday: 'Cuma', Weekend: 'Hafta sonu', 'Important dates': 'Önemli tarihler', 'Study goal': 'Çalışma hedefi',
  'Start date': 'Başlangıç tarihi', 'Study sessions': 'Çalışma oturumları', 'Review notes': 'Gözden geçirme notları',
  'Travel dates': 'Seyahat tarihleri', Travelers: 'Yolcular', Itinerary: 'Seyahat programı', Reservations: 'Rezervasyonlar',
  Project: 'Proje', Owners: 'Sorumlular', Dependencies: 'Bağımlılıklar', Event: 'Etkinlik', 'Event date': 'Etkinlik tarihi',
  Income: 'Gelir', Housing: 'Konut', Food: 'Yiyecek', Transport: 'Ulaşım', Utilities: 'Faturalar', Savings: 'Birikim',
  'Household income': 'Hane geliri', Health: 'Sağlık', Other: 'Diğer', Activities: 'Etkinlikler', Venue: 'Mekân',
  Attire: 'Kıyafet', Photography: 'Fotoğraf çekimi', Flowers: 'Çiçekler', People: 'Kişiler', Tools: 'Araçlar',
  Services: 'Hizmetler', Contingency: 'Beklenmeyen gider', Goal: 'Hedef', 'Target amount': 'Hedef tutar',
  'Current savings': 'Mevcut birikim', 'Monthly contribution': 'Aylık katkı', Deliverables: 'Teslimatlar',
  Payment: 'Ödeme', Term: 'Süre', Client: 'Müşteri', Freelancer: 'Serbest çalışan', Fee: 'Ücret',
  Revisions: 'Düzeltmeler', Service: 'Hizmet', 'Confidential information': 'Gizli bilgiler', Exclusions: 'İstisnalar',
  Payer: 'Ödeyen', Payee: 'Alıcı', 'Payment date': 'Ödeme tarihi', 'Payment method': 'Ödeme yöntemi',
  Reference: 'Referans', Organization: 'Kuruluş', 'Employment status': 'Çalışma durumu', 'Issue date': 'Düzenlenme tarihi',
  Issuer: 'Düzenleyen', ' Packed': 'Paketlendi', 'Acceptance criteria': 'Kabul kriterleri', Accommodation: 'Konaklama',
  Account: 'Hesap', 'Account details': 'Hesap bilgileri', 'Action item': 'Eylem maddesi', Activity: 'Etkinlik',
  Address: 'Adres', 'Approval status': 'Onay durumu', 'Assigned to': 'Atanan kişi', Assignment: 'Görev',
  Attachment: 'Ek', Author: 'Yazar', 'Backup verified': 'Yedekleme doğrulandı', 'Bank account': 'Banka hesabı',
  Bedtime: 'Yatma saati', Body: 'Metin gövdesi', 'Body fat percentage': 'Vücut yağ oranı', 'Book title': 'Kitap adı',
  'Break duration': 'Mola süresi', 'Budget code': 'Bütçe kodu', 'Bug fixes': 'Hata düzeltmeleri', 'Bug title': 'Hata başlığı',
  'Business purpose': 'İş amacı', 'CPU usage': 'CPU kullanımı', 'Call date': 'Arama tarihi', 'Call purpose': 'Arama amacı',
  Calls: 'Aramalar', Calories: 'Kalori', Candidate: 'Aday', Cardholder: 'Kart sahibi', 'Cash paid': 'Ödenen nakit',
  'Cash received': 'Alınan nakit', Category: 'Kategori', 'Change description': 'Değişiklik açıklaması', Channel: 'Kanal',
  'Class date': 'Ders tarihi', 'Clock-in time': 'Giriş saati', 'Clock-out time': 'Çıkış saati',
  'Closing balance': 'Kapanış bakiyesi', Communication: 'İletişim', 'Complaint date': 'Şikâyet tarihi',
  Concerns: 'Endişeler', Contact: 'İletişim', 'Contact method': 'İletişim yöntemi', 'Contact person': 'İrtibat kişisi',
  Context: 'Bağlam', Cost: 'Maliyet', 'Cost center': 'Maliyet merkezi', 'Count date': 'Sayım tarihi',
  'Counted quantity': 'Sayılan miktar', Counter: 'Sayımı yapan', Course: 'Ders', 'Created date': 'Oluşturulma tarihi',
  Currency: 'Para birimi', 'Customer visits': 'Müşteri ziyaretleri', 'Deals closed': 'Kapatılan satışlar',
  Decision: 'Karar', 'Decision date': 'Karar tarihi',
};
const missing = keys.filter((key) => !(key in translations));
if (missing.length) throw new Error(`Missing reviewed Turkish fields: ${missing.join(', ')}`);
for (const key of keys) draft.fields[key] = translations[key];
draft.reviewedCounts.fields = 250;
draft.editorialReview = 'Manually translated and checked Turkish titles, first 250 field labels, UI, site chrome, editor, document interface, categories, and generated document text; remaining field labels are unreviewed.';
fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log(`Reviewed ${keys.length} additional Turkish field labels; locale remains unpublished.`);
