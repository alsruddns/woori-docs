import fs from 'node:fs';

const path = 'docs/i18n-drafts/tr.json';
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));
const english = JSON.parse(fs.readFileSync('src/lib/document-translations.json', 'utf8')).en.fields;
const keys = Object.keys(english).slice(0, 125);
const translations = {
  Name: 'Ad', Email: 'E-posta', Phone: 'Telefon', Location: 'Konum', 'Profile summary': 'Profil özeti',
  'Work experience': 'İş deneyimi', Education: 'Eğitim', Skills: 'Beceriler', Experience: 'Deneyim',
  'Professional summary': 'Mesleki özet', 'Work history': 'İş geçmişi', Achievements: 'Başarılar',
  Company: 'Şirket', Role: 'Görev', Opening: 'Açılış', 'Relevant experience': 'İlgili deneyim', Closing: 'Kapanış',
  'Checklist items': 'Kontrol listesi maddeleri', Notes: 'Notlar', 'Due date': 'Son tarih', 'Interview date': 'Mülakat tarihi',
  'Quote number': 'Teklif numarası', Date: 'Tarih', 'Valid until': 'Son geçerlilik tarihi', Provider: 'Sağlayıcı',
  Customer: 'Müşteri', Items: 'Kalemler', Subtotal: 'Ara toplam', Tax: 'Vergi', 'Invoice number': 'Fatura numarası',
  'Payment details': 'Ödeme bilgileri', 'Receipt number': 'Makbuz numarası', 'Received from': 'Kimden alındı',
  Description: 'Açıklama', Amount: 'Tutar', 'Received by': 'Teslim alan', 'Order number': 'Sipariş numarası',
  Buyer: 'Alıcı', Supplier: 'Tedarikçi', 'Delivery date': 'Teslimat tarihi', 'Delivery number': 'İrsaliye numarası',
  Sender: 'Gönderen', Recipient: 'Alıcı', 'Delivery address': 'Teslimat adresi', 'Statement number': 'Ekstre numarası',
  Seller: 'Satıcı', Total: 'Toplam', Department: 'Bölüm', Period: 'Dönem', Expenses: 'Masraflar',
  Approver: 'Onaylayan', Traveler: 'Yolcu', Destination: 'Varış noktası', 'Trip dates': 'Seyahat tarihleri',
  Transportation: 'Ulaşım', Lodging: 'Konaklama', Meals: 'Yemekler', 'Other expenses': 'Diğer masraflar',
  'Meeting title': 'Toplantı başlığı', Attendees: 'Katılımcılar', Agenda: 'Gündem', Discussion: 'Görüşme',
  Decisions: 'Kararlar', 'Action items': 'Yapılacak işler', 'Next meeting': 'Sonraki toplantı',
  'Completed work': 'Tamamlanan işler', 'In progress': 'Devam eden işler', Blockers: 'Engeller',
  'Next steps': 'Sonraki adımlar', Week: 'Hafta', Highlights: 'Öne çıkanlar', Challenges: 'Zorluklar',
  'Next week': 'Gelecek hafta', Month: 'Ay', Goals: 'Hedefler', Results: 'Sonuçlar',
  'Key achievements': 'Önemli başarılar', 'Next month': 'Gelecek ay', 'Project name': 'Proje adı',
  Owner: 'Sorumlu', Objectives: 'Amaçlar', Scope: 'Kapsam', Milestones: 'Kilometre taşları',
  Resources: 'Kaynaklar', Risks: 'Riskler', 'Success measures': 'Başarı ölçütleri', Priority: 'Öncelik',
  'Outgoing owner': 'Devreden kişi', 'Incoming owner': 'Devralan kişi', Responsibilities: 'Sorumluluklar',
  'Open tasks': 'Açık işler', 'Key contacts': 'Önemli kişiler', 'Issue title': 'Sorun başlığı',
  Reporter: 'Bildiren kişi', Impact: 'Etki', 'Steps to reproduce': 'Yeniden oluşturma adımları',
  'Expected result': 'Beklenen sonuç', 'Actual result': 'Gerçek sonuç', Attachments: 'Ekler', Parties: 'Taraflar',
  Subject: 'Konu', Terms: 'Şartlar', Signatures: 'İmzalar', 'Confirmation details': 'Onay bilgileri',
  Signature: 'İmza', 'Person giving consent': 'Onay veren kişi', Purpose: 'Amaç', Lender: 'Borç veren',
  Borrower: 'Borç alan', Principal: 'Ana para', 'Repayment plan': 'Geri ödeme planı', Interest: 'Faiz',
  Item: 'Eşya', Condition: 'Durum', 'Lending date': 'Ödünç verme tarihi', 'Return date': 'İade tarihi',
  'Target date': 'Hedef tarih', 'Departure date': 'Ayrılış tarihi', 'Move-in date': 'Taşınma tarihi',
  Room: 'Oda', Vehicle: 'Araç', 'Inspection date': 'İnceleme tarihi', 'Move-out date': 'Evden çıkış tarihi',
  'Review date': 'Değerlendirme tarihi', 'Household notes': 'Hane notları',
};
const missing = keys.filter((key) => !(key in translations));
if (missing.length) throw new Error(`Missing reviewed Turkish fields: ${missing.join(', ')}`);
for (const key of keys) draft.fields[key] = translations[key];
draft.reviewedCounts.fields = keys.length;
draft.reviewStatus = 'partially editorially reviewed; remaining editorial review required; unpublished';
draft.editorialReview = 'Manually translated and checked Turkish titles, first 125 field labels, UI, site chrome, editor, document interface, categories, and generated document text; remaining field labels are unreviewed.';
fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log(`Reviewed ${keys.length} Turkish field labels; locale remains unpublished.`);
