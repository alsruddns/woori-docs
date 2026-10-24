import fs from 'node:fs';
const sourcePath = process.argv[2];
if (!sourcePath) throw new Error('Usage: node scripts/review-ms-ui-content.mjs <English-source.json>');
const en = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const path = 'docs/i18n-drafts/ms.json';
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));
const reviewed = {
  interface: {
    description:'Cipta dan pratonton {title} terus dalam pelayar anda.',
    guide:'Medan wajib ditandakan dengan tanda bintang. Simpan salinan pada peranti anda sebagai fail teks atau cetak sebagai PDF.',
    faqSaved:'Di manakah dokumen saya disimpan?', faqLegal:'Bolehkah dokumen ini digunakan sebagai borang yang mengikat di sisi undang-undang?',
    draftSaved:'Draf anda telah disimpan dalam pelayar ini.', clipboardError:'Pelayar ini tidak dapat mengakses papan keratan.',
    requiredLabel:'Wajib diisi', searchLabel:'Cari dokumen',
    examplesBody:'Masukkan butiran yang ringkas dan tepat. Semak tarikh, nama, amaun dan keperluan tempatan sebelum berkongsi atau mencetak.',
  },
  categories:{
    work:'Perniagaan dan kerja', finance:'Kewangan dan perakaunan', 'hr-admin':'Sumber manusia dan pentadbiran',
    'project-management':'Pengurusan projek', 'development-it':'Pembangunan perisian dan IT', 'sales-customer':'Jualan dan pelanggan',
    'inventory-logistics':'Inventori dan logistik', education:'Sekolah dan pendidikan', personal:'Kehidupan peribadi',
    'health-fitness':'Kesihatan dan kecergasan', travel:'Perjalanan', checklists:'Senarai semak', planning:'Perancang', records:'Rekod',
  },
  ui:{
    brand:'Dokumen', tagline:'Cipta dan susun dokumen berguna dalam pelayar anda.', search:'Cari templat dokumen', categories:'Kategori', all:'Semua dokumen',
    popular:'Pilih dokumen untuk bermula', count:' dokumen',
    browser:'Maklumat yang anda masukkan kekal dalam pelayar ini. Maklumat tersebut tidak dihantar ke pelayan atau perkhidmatan analitik kami.',
    draft:'Disimpan dalam pelayar ini', clear:'Kosongkan medan', copy:'Salin teks', copied:'Teks disalin',
    print:'Cetak / Simpan sebagai PDF', download:'Muat turun sebagai teks', preview:'Pratonton langsung', edit:'Edit dokumen', save:'Disimpan secara automatik',
    related:'Dokumen berkaitan', guide:'Cara penggunaan', examples:'Petua mengisi', faq:'Soalan lazim',
    legal:'Ini ialah templat umum dan bahan rujukan. Kandungannya bukan nasihat undang-undang dan tidak menjamin kesahan undang-undang. Dapatkan nasihat profesional yang berkelayakan di bidang kuasa anda sebelum menggunakannya.',
    home:'Pustaka dokumen', language:'Bahasa', family:'Perkhidmatan woori.today', portal:'Laman utama', calculator:'Kalkulator',
    tools:'Alat dalam talian', ledger:'Lejar isi rumah bersama', docs:'Dokumen', quiz:'Kuiz', privacy:'Dasar privasi', usage:'Panduan penggunaan',
    contact:'Hubungi kami', contactTitle:'Hubungi kami', email:'Alamat e-mel', close:'Tutup', empty:'Tiada dokumen yang sepadan ditemui.',
    checked:'Selesai', adHidden:'', placeholder:'Masukkan teks', required:'Medan ini wajib diisi',
    templateNote:'Teks yang anda masukkan akan dipaparkan serta-merta dalam pratonton.',
    newFeature:'Daftarkan juga setiap ciri baharu dalam katalog perkhidmatan.', updated:'Disimpan dalam pelayar ini', remove:'Tetapkan semula', allLocales:'Bahasa yang tersedia',
  },
  chrome:{
    family:'Perkhidmatan woori.today', portal:'Laman utama', calculators:'Kalkulator', tools:'Alat dalam talian', money:'Lejar isi rumah bersama',
    docs:'Dokumen dan borang', quiz:'Kuiz dan ujian', privacy:'Dasar privasi', terms:'Terma penggunaan', contact:'Hubungi kami',
    contactTitle:'Hubungi kami', inquiry:'Jenis mesej', guidance:'Hantarkan mesej kepada kami melalui e-mel. Kami akan membalasnya.',
    email:'Alamat e-mel', copy:'Salin alamat e-mel', copied:'Alamat e-mel disalin.', close:'Tutup',
    types:['Pertanyaan umum / cadangan ciri','Kerjasama','Promosi / cadangan','Laporan pepijat'],
  },
  editor:{
    myForms:'Borang saya', newForm:'Cipta borang baharu', open:'Buka', rename:'Namakan semula', duplicate:'Buat salinan', delete:'Padam',
    deleteConfirm:'Padam borang ini?', saveForm:'Simpan borang', addField:'Tambah medan', fieldName:'Nama medan', fieldType:'Jenis medan',
    required:'Wajib diisi', moveUp:'Alih ke atas', moveDown:'Alih ke bawah', removeField:'Buang medan', useDefault:'Gunakan borang lalai',
    customize:'Sesuaikan borang ini', reset:'Pulihkan borang asal', text:'Teks ringkas', textarea:'Teks panjang', number:'Nombor', date:'Tarikh',
    time:'Masa', checkbox:'Kotak pilihan', select:'Pilihan', currency:'Amaun', percent:'Peratus', email:'Alamat e-mel', tel:'Telefon',
    blankTitle:'Borang baharu', saved:'Disimpan dalam pelayar ini', defaultValue:'Nilai lalai', options:'Pilihan',
  },
  documentContent:{
    copy:{
      intro:'{title} ialah templat yang boleh disunting untuk menyusun maklumat yang lazim diperlukan dalam bidang {category}.',
      purpose:'Gunakannya untuk merekod, menyemak atau menyerahkan butiran berkaitan {category}, seperti tugasan, keputusan dan tindakan susulan.',
      audience:'Sesuai untuk individu dan pasukan yang menyediakan atau menyelenggara rekod bagi {category}.',
      structure:'Templat ini disusun mengikut medan berikut: {fields}{more}',
      steps:'Pastikan medan yang disediakan sesuai dengan tujuan anda. Isi medan wajib dahulu, kemudian semak susunan dan kandungannya dalam pratonton. Anda boleh mengubah medan dalam salinan sendiri jika perlu.',
      tips:'Masukkan tarikh, pihak yang bertanggungjawab dan amaun yang boleh disahkan dengan teliti. Asingkan maklumat yang telah disahkan daripada soalan terbuka dan tindakan susulan.',
      source:'woori.today menyediakan templat rujukan yang boleh disunting ini untuk tugasan merekod yang lazim. Templat ini bukan salinan borang rasmi mana-mana organisasi lain. Maklumat yang anda masukkan diproses dalam pelayar ini.',
      caution:'Semak dasar organisasi dan keperluan tempatan sebelum menyerahkan dokumen. Templat ini bukan pengganti nasihat undang-undang, cukai atau perubatan, mahupun borang rasmi.',
      faq1:'Di manakah maklumat saya disimpan?', faq2:'Bolehkah saya mengubah medan?',
      faqA1:'Draf disimpan dalam storan setempat pelayar ini dan tidak dihantar ke pelayan.',
      faqA2:'Pilih “Sesuaikan borang ini” untuk membuat salinan. Kemudian tambah, buang atau susun semula medan.',
      library:'Templat woori.today boleh diisi, dipratonton, disalin, dimuat turun sebagai teks atau dicetak dan disimpan sebagai PDF.',
      libraryUse:'Pilih dokumen, isi medan yang diperlukan dan semak pratonton. Salin atau muat turun teks, atau gunakan dialog cetakan pelayar untuk menyimpannya sebagai PDF.',
      category:'Lihat dokumen dalam kategori {category} mengikut tujuan. Semak medan dalam setiap templat sebelum memilihnya.',
      more:' dan {count} lagi', tableNote:'Templat ini turut menyediakan jadual untuk rekod berulang dan jumlah keseluruhan.',
    },
    specific:{
      form:'Gunakan {title} untuk mengumpul dan menyemak maklumat yang diperlukan bagi {category}, kemudian serahkannya kepada pihak seterusnya jika perlu.',
      checklist:'Gunakan {title} untuk menandakan semakan yang telah selesai dan mengenal pasti perkara yang masih perlu diberi perhatian.',
      planner:'Gunakan {title} untuk menyusun tarikh dan matlamat, menetapkan keutamaan serta menjejaki kemajuan.',
      audience:'Untuk individu dan pasukan yang menyediakan, menyemak atau berkongsi {title}.',
      stepFocus:' Beri perhatian kepada {fields} supaya dokumen lebih mudah disemak dan diserahkan.',
      tipFocus:' Pastikan {fields} selaras antara satu sama lain dan semak pratonton untuk memastikan tiada perkara tertinggal.',
      faqFields:'Apakah maklumat yang dikumpulkan oleh templat ini?',
      faqFieldsAnswer:'Templat lalai mengandungi {fields}. Anda boleh mengubah salinan sendiri mengikut aliran kerja anda.',
    },
    purposeFocus:' Gunakan {fields} sebagai rekod utama untuk proses ini.',
    sectionLabels:{overview:'Perihal templat ini',audience:'Untuk siapa',contents:'Medan dan pratonton templat',steps:'Cara melengkapkan',tips:'Petua mengisi',source:'Asal templat dan pemprosesan data',caution:'Sebelum menggunakan'},
    recent:'Templat yang baru ditambah',
  },
};
function compare(expected, actual, path='root') {
  if (Array.isArray(expected)) { if (!Array.isArray(actual) || expected.length !== actual.length) throw new Error(`Shape mismatch: ${path}`); expected.forEach((v,i)=>compare(v,actual[i],`${path}[${i}]`)); return; }
  if (expected && typeof expected==='object') { const a=Object.keys(expected).sort(), b=Object.keys(actual??{}).sort(); if(JSON.stringify(a)!==JSON.stringify(b)) throw new Error(`Key mismatch: ${path}`); for(const k of a) compare(expected[k],actual[k],`${path}.${k}`); return; }
  if(typeof expected!=='string'||typeof actual!=='string') throw new Error(`Type mismatch: ${path}`);
  if(expected&&(!actual.trim()||expected===actual)) throw new Error(`Empty or English copy: ${path}`);
  const tokens=v=>[...v.matchAll(/\{\w+\}/g)].map(([x])=>x).sort(); if(JSON.stringify(tokens(expected))!==JSON.stringify(tokens(actual))) throw new Error(`Token mismatch: ${path}`);
}
for(const [section,value] of Object.entries(reviewed)){ compare(en[section],value,section); draft[section]=value; }
draft.reviewedCounts={...(draft.reviewedCounts??{}),interface:9,categories:14,ui:47,chrome:18,editor:33,documentContent:34};
const reviewedCount=Object.values(draft.reviewedCounts).reduce((sum,n)=>sum+n,0);
draft.reviewStatus=`${reviewedCount}/699 units reviewed and corrected (titles and shared UI/document copy); unpublished`;
fs.writeFileSync(path,`${JSON.stringify(draft,null,2)}\n`,'utf8');
console.log(`Malay shared UI and document content reviewed: ${reviewedCount}/699 units; unpublished.`);
