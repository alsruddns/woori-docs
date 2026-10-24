import fs from 'node:fs';

const path = 'docs/i18n-drafts/tr.json';
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));
const reviewed = {
  interface: {
    description: '{title} belgesini doğrudan tarayıcınızda oluşturup önizleyin.',
    guide: 'Zorunlu alanlar yıldız işaretiyle belirtilir. Kopyayı metin dosyası olarak kaydedebilir veya PDF olarak yazdırabilirsiniz.',
    faqSaved: 'Belgem nereye kaydediliyor?',
    faqLegal: 'Bunu yasal olarak bağlayıcı bir form olarak kullanabilir miyim?',
    draftSaved: 'Taslağınız bu tarayıcıya kaydedilir.',
    clipboardError: 'Pano bu tarayıcıda kullanılamıyor.',
    requiredLabel: 'Zorunlu',
    searchLabel: 'Belgelerde ara',
    examplesBody: 'Kısa ve gerçeğe dayalı bilgiler kullanın. Paylaşmadan veya yazdırmadan önce tarihleri, adları, tutarları ve yerel gereklilikleri kontrol edin.',
  },
  categories: {
    work: 'Şirket ve çalışma', finance: 'Finans ve muhasebe', 'hr-admin': 'İnsan kaynakları ve yönetim',
    'project-management': 'Proje yönetimi', 'development-it': 'Yazılım geliştirme ve BT',
    'sales-customer': 'Satış ve müşteri yönetimi', 'inventory-logistics': 'Stok ve lojistik',
    education: 'Okul ve eğitim', personal: 'Kişisel yaşam', 'health-fitness': 'Sağlık ve fitness',
    travel: 'Seyahat', checklists: 'Kontrol listeleri', planning: 'Planlayıcılar', records: 'Kayıtlar',
  },
  ui: {
    brand: 'Belgeler', tagline: 'Yararlı belgeleri tarayıcınızda oluşturun ve düzenleyin.',
    search: 'Belge şablonlarında ara', categories: 'Kategoriler', all: 'Tüm belgeler',
    popular: 'Başlamak için bir belge seçin', count: ' belge',
    browser: 'Girdileriniz bu tarayıcıda kalır; sunucularımıza veya analiz araçlarımıza gönderilmez.',
    draft: 'Bu tarayıcıya kaydedildi', clear: 'Alanları temizle', copy: 'Metni kopyala', copied: 'Kopyalandı',
    print: 'Yazdır / PDF olarak kaydet', download: 'Metni indir', preview: 'Canlı önizleme', edit: 'Belgeyi düzenle',
    save: 'Otomatik kaydedildi', related: 'Benzer belgeler', guide: 'Kullanım', examples: 'Yazım önerileri',
    faq: 'Sıkça sorulan sorular',
    legal: 'Yalnızca genel taslak ve başvuru şablonudur. Hukuki tavsiye değildir ve hukuki geçerlilik garantisi vermez. Kullanmadan önce bulunduğunuz yerde yetkin bir uzmana danışın.',
    home: 'Belge kütüphanesi', language: 'Dil', family: 'Diğer sitelerimiz', portal: 'Ana sayfa',
    calculator: 'Hesap makinesi', tools: 'Çevrimiçi araçlar', ledger: 'Ortak hane bütçesi defteri',
    docs: 'Belgeler', quiz: 'Testler', privacy: 'Gizlilik', usage: 'Kullanım kılavuzu',
    contact: 'İletişim', contactTitle: 'Bize ulaşın', email: 'E-posta', close: 'Kapat',
    empty: 'Eşleşen belge bulunamadı.', checked: 'Tamamlandı', adHidden: '',
    placeholder: 'İçeriğinizi girin', required: 'Bu alan zorunludur',
    templateNote: 'Girdileriniz önizlemede anında görünür.',
    newFeature: 'Her yeni özelliği hizmet kataloğuna da ekleyin.', updated: 'Bu tarayıcıya kaydedildi',
    remove: 'Sıfırla', allLocales: 'Kullanılabilir diller',
  },
  chrome: {
    family: 'Diğer sitelerimiz', portal: 'Ana sayfa', calculators: 'Hesap makineleri', tools: 'Çevrimiçi araçlar',
    money: 'Ortak hane bütçesi', docs: 'Belgeler ve formlar', quiz: 'Testler ve sınavlar', privacy: 'Gizlilik',
    terms: 'Kullanım koşulları', contact: 'İletişim', contactTitle: 'Bize ulaşın', inquiry: 'Başvuru türü',
    guidance: 'Sorunuzu e-posta ile gönderin. Size en kısa sürede yanıt vereceğiz.', email: 'E-posta',
    copy: 'E-postayı kopyala', copied: 'E-posta adresi kopyalandı.', close: 'Kapat',
    types: ['Genel / özellik isteği', 'İş birliği', 'Reklam / teklif', 'Hata bildirimi'],
  },
  editor: {
    myForms: 'Formlarım', newForm: 'Yeni form oluştur', open: 'Aç', rename: 'Yeniden adlandır',
    duplicate: 'Çoğalt', delete: 'Sil', deleteConfirm: 'Bu form silinsin mi?', saveForm: 'Formu kaydet',
    addField: 'Alan ekle', fieldName: 'Alan adı', fieldType: 'Alan türü', required: 'Zorunlu',
    moveUp: 'Yukarı taşı', moveDown: 'Aşağı taşı', removeField: 'Alanı kaldır',
    useDefault: 'Varsayılan formu kullan', customize: 'Bu formu özelleştir', reset: 'Özgün forma sıfırla',
    text: 'Kısa metin', textarea: 'Uzun metin', number: 'Sayı', date: 'Tarih', time: 'Saat',
    checkbox: 'Onay kutusu', select: 'Seçenek', currency: 'Tutar', percent: 'Yüzde', email: 'E-posta',
    tel: 'Telefon', blankTitle: 'Yeni form', saved: 'Bu tarayıcıya kaydedildi',
    defaultValue: 'Varsayılan değer', options: 'Seçenekler',
  },
};

for (const [section, values] of Object.entries(reviewed)) {
  for (const [key, value] of Object.entries(values)) {
    if (!(key in draft[section])) throw new Error(`Missing tr.${section}.${key}`);
    draft[section][key] = value;
  }
  draft.reviewedCounts[section] = Object.keys(values).length;
}
draft.reviewStatus = 'partially editorially reviewed; remaining editorial review required; unpublished';
draft.editorialReview = 'Manually translated and checked Turkish UI, site chrome, editor, document interface, and categories; titles, fields, and generated document content remain machine drafts.';
fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log(`Reviewed ${Object.values(reviewed).reduce((sum, group) => sum + Object.keys(group).length, 0)} Turkish UI and taxonomy units; locale remains unpublished.`);
