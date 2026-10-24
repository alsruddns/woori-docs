import fs from 'node:fs';

const path = 'docs/i18n-drafts/tr.json';
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));
const copy = {
  intro: '{title}, {category} alanındaki yaygın bilgi ihtiyaçlarını düzenlemeye yarayan düzenlenebilir bir şablondur.',
  purpose: 'Bu şablonu; {category} kapsamındaki etkinlikleri, kararları ve takip işlerini kaydetmek, gözden geçirmek veya devretmek için kullanın.',
  audience: '{category} kayıtlarını hazırlayan veya güncel tutan kişi ve ekipler için uygundur.',
  structure: 'Şablon şu alanlardan oluşur: {fields}{more}',
  steps: 'Alanların amacınıza uygun olduğunu kontrol edin, önce zorunlu alanları doldurun; ardından önizlemedeki sıralamayı ve içeriği gözden geçirin. Gerekirse kendi kopyanızdaki alanları düzenleyin.',
  tips: 'Doğrulanabilir tarihleri, sorumluları ve tutarları dikkatle girin. Onaylanmış bilgileri açık konulardan ve sonraki adımlardan ayrı tutun.',
  source: 'Bu düzenlenebilir başvuru şablonu, yaygın kayıt tutma işleri için woori.today tarafından hazırlanmıştır. Başka bir kuruluşun resmî formunun kopyası değildir; girdiğiniz bilgiler bu tarayıcıda işlenir.',
  caution: 'Göndermeden önce kuruluşunuzun kurallarını ve yerel gereklilikleri kontrol edin. Bu şablon hukuki, vergisel veya tıbbi tavsiyenin ya da resmî bir formun yerine geçmez.',
  more: ' ve {count} alan daha', tableNote: 'Tekrarlanan kayıtlar için bir tablo ve toplamlar da bulunur.',
  faq1: 'Çalışmam nereye kaydediliyor?', faq2: 'Alanları değiştirebilir miyim?',
  faqA1: 'Taslağınız bu tarayıcının yerel depolama alanına kaydedilir ve bir sunucuya gönderilmez.',
  faqA2: 'Bir kopya oluşturmak için “Bu şablonu özelleştir” seçeneğini kullanın; ardından alan ekleyebilir, kaldırabilir veya sıralarını değiştirebilirsiniz.',
  library: 'woori.today şablonlarını doldurabilir, önizleyebilir, kopyalayabilir, metin olarak indirebilir ya da yazdırıp PDF olarak kaydedebilirsiniz.',
  libraryUse: 'Bir belge seçin, gerekli alanları doldurun ve önizlemeyi kontrol edin. Metni kopyalayın veya indirin ya da tarayıcınızın yazdırma penceresinden PDF olarak kaydedin.',
  category: '{category} belgelerine kullanım amaçlarına göre göz atın. Bir şablon seçmeden önce içerdiği alanları kontrol edin.',
};
const specific = {
  form: '{title} şablonunu, {category} için gereken bilgileri toplamak, gözden geçirmek ve gerektiğinde ilgili kişiye aktarmak için kullanın.',
  checklist: '{title} ile tamamlanan kontrolleri takip edin ve hâlâ ilgilenilmesi gereken maddeleri kolayca görün.',
  planner: '{title} ile tarihleri ve hedefleri planlayın, öncelikleri belirleyin ve ilerlemeyi gözden geçirin.',
  audience: '{title} belgesini hazırlayan, gözden geçiren veya paylaşan kişi ve ekipler için tasarlanmıştır.',
  stepFocus: ' Belgenin gözden geçirilmesini ve devredilmesini kolaylaştırmak için {fields} alanlarına özellikle dikkat edin.',
  tipFocus: ' {fields} alanlarında tutarlı bilgiler kullanın; belgeyi kullanmadan önce eksik ayrıntıları görmek için önizlemeyi tarayın.',
  faqFields: 'Bu şablon hangi bilgileri toplar?',
  faqFieldsAnswer: 'Varsayılan şablonda şu alanlar bulunur: {fields}. İş akışınıza uyarlamak için kendi kopyanızı düzenleyebilirsiniz.',
};
const sectionLabels = {
  overview: 'Bu şablon hakkında', audience: 'Kimler için', contents: 'Alanlar ve önizleme',
  steps: 'Nasıl doldurulur', tips: 'Yazım önerileri', source: 'Şablonun kaynağı ve veri kullanımı',
  caution: 'Kullanmadan önce',
};
for (const [section, values] of Object.entries({ copy, specific, sectionLabels })) {
  for (const [key, value] of Object.entries(values)) {
    if (!(key in draft.documentContent[section])) throw new Error(`Missing tr.documentContent.${section}.${key}`);
    draft.documentContent[section][key] = value;
  }
}
draft.documentContent.purposeFocus = '{fields} alanlarını bu iş akışının temel kaydı olarak kullanın.';
draft.documentContent.recent = 'Yeni eklenen şablonlar';
draft.reviewedCounts.documentContent = 34;
draft.reviewStatus = 'partially editorially reviewed; remaining editorial review required; unpublished';
draft.editorialReview = 'Manually translated and checked Turkish titles, UI, site chrome, editor, document interface, categories, and generated document text; field labels remain machine drafts.';
fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log('Reviewed 34 Turkish generated document, guide, FAQ, and section units; locale remains unpublished.');
