import fs from 'node:fs';

const path = 'docs/i18n-drafts/tr.json';
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));
const titles = {
  'resume-template': 'Özgeçmiş şablonu', 'simple-resume-template': 'Basit özgeçmiş şablonu',
  'career-resume-template': 'Kariyer özgeçmişi şablonu', 'cover-letter-template': 'Ön yazı şablonu',
  'job-application-checklist': 'İş başvurusu kontrol listesi', 'interview-preparation-checklist': 'Mülakat hazırlık kontrol listesi',
  'quotation-generator': 'Teklif oluşturucu', 'invoice-generator': 'Fatura oluşturucu',
  'receipt-generator': 'Makbuz oluşturucu', 'purchase-order-generator': 'Satın alma siparişi oluşturucu',
  'delivery-note-generator': 'Sevk irsaliyesi oluşturucu', 'transaction-statement-generator': 'İşlem dökümü oluşturucu',
  'expense-report-template': 'Masraf raporu şablonu', 'business-trip-expense-template': 'İş seyahati masraf şablonu',
  'meeting-minutes-generator': 'Toplantı tutanağı oluşturucu', 'daily-work-report-template': 'Günlük çalışma raporu şablonu',
  'weekly-work-report-template': 'Haftalık çalışma raporu şablonu', 'monthly-work-report-template': 'Aylık çalışma raporu şablonu',
  'project-plan-template': 'Proje planı şablonu', 'task-list-template': 'Görev listesi şablonu',
  'handover-document-template': 'Devir teslim belgesi şablonu', 'issue-report-template': 'Sorun bildirim raporu şablonu',
  'simple-agreement-template': 'Basit sözleşme şablonu', 'confirmation-letter-template': 'Teyit mektubu şablonu',
  'consent-form-template': 'Onam formu şablonu', 'loan-agreement-template': 'Kişisel kredi sözleşmesi şablonu',
  'item-lending-agreement-template': 'Eşya ödünç verme kayıt formu', 'moving-checklist': 'Taşınma kontrol listesi',
  'wedding-checklist': 'Düğün kontrol listesi', 'travel-checklist': 'Seyahat kontrol listesi',
  'international-travel-checklist': 'Yurt dışı seyahat kontrol listesi', 'newborn-checklist': 'Yenidoğan ihtiyaçları kontrol listesi',
  'living-alone-checklist': 'Yalnız yaşama kontrol listesi', 'newlywed-home-checklist': 'Yeni ev kurma kontrol listesi',
  'car-purchase-checklist': 'Araç satın alma kontrol listesi', 'moving-out-checklist': 'Evden taşınma kontrol listesi',
  'emergency-preparedness-checklist': 'Acil durum hazırlık kontrol listesi', 'daily-planner': 'Günlük planlayıcı',
  'weekly-planner': 'Haftalık planlayıcı', 'monthly-planner': 'Aylık planlayıcı', 'study-planner': 'Çalışma planlayıcısı',
  'travel-planner': 'Seyahat planlayıcısı', 'project-schedule-template': 'Proje takvimi şablonu',
  'event-planning-checklist': 'Etkinlik planlama kontrol listesi', 'monthly-budget-template': 'Aylık bütçe şablonu',
  'household-budget-template': 'Hane bütçesi şablonu', 'travel-budget-template': 'Seyahat bütçesi şablonu',
  'wedding-budget-template': 'Düğün bütçesi şablonu', 'project-budget-template': 'Proje bütçesi şablonu',
  'savings-plan-template': 'Tasarruf planı şablonu', 'simple-contract-template': 'Genel sözleşme taslağı',
  'freelance-agreement-template': 'Serbest çalışma sözleşmesi taslağı', 'service-agreement-template': 'Hizmet sözleşmesi taslağı',
  'nda-template': 'Gizlilik sözleşmesi taslağı', 'payment-confirmation-template': 'Ödeme teyidi',
  'employment-certificate-template': 'Çalışma bilgileri kayıt formu', 'work-request-form': 'İş talep formu',
  'cooperation-request-form': 'İş birliği talep formu', 'business-trip-report': 'İş seyahati raporu',
  'business-trip-plan': 'İş seyahati planı', 'work-plan-template': 'Çalışma planı şablonu',
  'work-allocation-chart': 'İş dağılım çizelgesi', 'approval-request-form': 'Onay talep formu',
  'official-letter-template': 'Resmî yazı şablonu', 'expense-approval-form': 'Masraf onay formu',
  'cost-settlement-form': 'Masraf hesaplaşma formu', 'corporate-card-log': 'Şirket kartı kullanım çizelgesi',
  'cashbook-template': 'Kasa defteri şablonu', 'cash-flow-daily-report': 'Günlük nakit akışı raporu',
  'payment-request-form': 'Ödeme talep formu', 'expense-processing-checklist': 'Masraf işleme kontrol listesi',
  'leave-request-form': 'İzin talep formu', 'attendance-record': 'Devam çizelgesi',
  'employee-directory': 'Çalışan rehberi', 'interview-evaluation-form': 'Mülakat değerlendirme formu',
  'performance-review-form': 'Performans değerlendirme formu', 'training-application-form': 'Eğitim başvuru formu',
  'equipment-request-form': 'Ekipman talep formu', 'vehicle-log': 'Araç kullanım çizelgesi',
  'requirements-specification': 'Gereksinim tanımı', 'issue-tracker': 'Sorun takip çizelgesi',
  'risk-register': 'Risk kayıt çizelgesi', 'change-request-form': 'Değişiklik talep formu',
  'meeting-action-items': 'Toplantı eylem maddeleri', 'decision-log': 'Karar kayıt defteri',
  'project-retrospective': 'Proje değerlendirmesi', 'sprint-retrospective': 'Sprint değerlendirmesi',
  'test-case-template': 'Test senaryosu şablonu', 'bug-report': 'Hata raporu', 'incident-report': 'Olay raporu',
  'deployment-checklist': 'Dağıtım kontrol listesi', 'code-review-checklist': 'Kod inceleme kontrol listesi',
  'release-notes-template': 'Sürüm notları şablonu', 'server-inspection-checklist': 'Sunucu denetim kontrol listesi',
  'customer-call-log': 'Müşteri görüşme kayıt çizelgesi', 'customer-inquiry-log': 'Müşteri talep kayıt çizelgesi',
  'sales-activity-report': 'Satış etkinlik raporu', 'sales-daily-log': 'Günlük satış kayıt çizelgesi',
  'customer-meeting-notes': 'Müşteri toplantı notları', 'customer-complaint-record': 'Müşteri şikâyet kayıt formu',
  'inventory-count-sheet': 'Stok sayım çizelgesi', 'stock-receipt-log': 'Stok giriş kayıt çizelgesi',
  'stock-issue-log': 'Stok çıkış kayıt çizelgesi', 'purchase-order-tracker': 'Satın alma siparişi takip çizelgesi',
  'delivery-confirmation': 'Teslimat teyidi', 'reading-journal': 'Okuma günlüğü',
  'assignment-tracker': 'Ödev takip çizelgesi', 'exam-study-plan': 'Sınav çalışma planı',
  'class-notes-template': 'Ders notları şablonu', 'workout-log': 'Egzersiz kayıt çizelgesi',
  'weight-tracker': 'Kilo takip çizelgesi', 'meal-tracker': 'Öğün takip çizelgesi',
  'sleep-journal': 'Uyku günlüğü', 'packing-checklist': 'Valiz hazırlama kontrol listesi',
  'travel-itinerary': 'Seyahat programı', 'trip-expense-settlement': 'Seyahat masraf hesaplaşma formu',
  'personal-record-form': 'Kişisel kayıt formu', 'payment-record-log': 'Ödeme kayıt çizelgesi',
  'service-history-log': 'Servis geçmişi kayıt çizelgesi',
};

const expected = Object.keys(draft.titles).sort();
if (JSON.stringify(Object.keys(titles).sort()) !== JSON.stringify(expected)) throw new Error('Turkish title map does not match the 119-source-key set.');
draft.titles = titles;
draft.reviewedCounts.titles = Object.keys(titles).length;
draft.reviewStatus = 'partially editorially reviewed; remaining editorial review required; unpublished';
draft.editorialReview = 'Manually translated and checked Turkish titles, UI, site chrome, editor, document interface, and categories; fields and generated document content remain machine drafts.';
fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log(`Reviewed ${Object.keys(titles).length} Turkish document titles; locale remains unpublished.`);
