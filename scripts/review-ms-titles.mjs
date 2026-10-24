import fs from 'node:fs';
const sourcePath = process.argv[2];
if (!sourcePath) throw new Error('Usage: node scripts/review-ms-titles.mjs <English-source.json>');
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const path = 'docs/i18n-drafts/ms.json';
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));
const titles = {
  'resume-template':'Templat Resume','simple-resume-template':'Templat Resume Ringkas','career-resume-template':'Templat Resume Kerjaya',
  'cover-letter-template':'Templat Surat Iringan','job-application-checklist':'Senarai Semak Permohonan Kerja','interview-preparation-checklist':'Senarai Semak Persediaan Temu Duga',
  'quotation-generator':'Penjana Sebut Harga','invoice-generator':'Penjana Invois','receipt-generator':'Penjana Resit',
  'purchase-order-generator':'Penjana Pesanan Pembelian','delivery-note-generator':'Penjana Nota Penghantaran','transaction-statement-generator':'Penjana Penyata Transaksi',
  'expense-report-template':'Templat Laporan Perbelanjaan','business-trip-expense-template':'Templat Perbelanjaan Perjalanan Kerja','meeting-minutes-generator':'Penjana Minit Mesyuarat',
  'daily-work-report-template':'Templat Laporan Kerja Harian','weekly-work-report-template':'Templat Laporan Kerja Mingguan','monthly-work-report-template':'Templat Laporan Kerja Bulanan',
  'project-plan-template':'Templat Pelan Projek','task-list-template':'Templat Senarai Tugasan','handover-document-template':'Templat Dokumen Serah Tugas',
  'issue-report-template':'Templat Laporan Isu','simple-agreement-template':'Templat Perjanjian Ringkas','confirmation-letter-template':'Templat Surat Pengesahan',
  'consent-form-template':'Templat Borang Persetujuan','loan-agreement-template':'Templat Perjanjian Pinjaman','item-lending-agreement-template':'Templat Perjanjian Pinjaman Barang',
  'moving-checklist':'Senarai Semak Pindah Rumah','wedding-checklist':'Senarai Semak Perkahwinan','travel-checklist':'Senarai Semak Perjalanan',
  'international-travel-checklist':'Senarai Semak Perjalanan Antarabangsa','newborn-checklist':'Senarai Semak Bayi Baru Lahir','living-alone-checklist':'Senarai Semak Tinggal Bersendirian',
  'newlywed-home-checklist':'Senarai Semak Rumah Pengantin Baharu','car-purchase-checklist':'Senarai Semak Pembelian Kereta','moving-out-checklist':'Senarai Semak Keluar Rumah',
  'emergency-preparedness-checklist':'Senarai Semak Persediaan Kecemasan','daily-planner':'Perancang Harian','weekly-planner':'Perancang Mingguan',
  'monthly-planner':'Perancang Bulanan','study-planner':'Perancang Pembelajaran','travel-planner':'Perancang Perjalanan',
  'project-schedule-template':'Templat Jadual Projek','event-planning-checklist':'Senarai Semak Perancangan Acara','monthly-budget-template':'Templat Belanjawan Bulanan',
  'household-budget-template':'Templat Belanjawan Isi Rumah','travel-budget-template':'Templat Belanjawan Perjalanan','wedding-budget-template':'Templat Belanjawan Perkahwinan',
  'project-budget-template':'Templat Belanjawan Projek','savings-plan-template':'Templat Pelan Simpanan','simple-contract-template':'Templat Kontrak Ringkas',
  'freelance-agreement-template':'Templat Perjanjian Kerja Bebas','service-agreement-template':'Templat Perjanjian Perkhidmatan','nda-template':'Templat Perjanjian Kerahsiaan',
  'payment-confirmation-template':'Templat Pengesahan Bayaran','employment-certificate-template':'Surat Pengesahan Pekerjaan','work-request-form':'Borang Permohonan Kerja',
  'cooperation-request-form':'Borang Permohonan Kerjasama','business-trip-report':'Laporan Perjalanan Kerja','business-trip-plan':'Pelan Perjalanan Kerja',
  'work-plan-template':'Templat Pelan Kerja','work-allocation-chart':'Carta Pembahagian Kerja','approval-request-form':'Borang Permohonan Kelulusan',
  'official-letter-template':'Templat Surat Rasmi','expense-approval-form':'Borang Kelulusan Perbelanjaan','cost-settlement-form':'Borang Penyelesaian Kos',
  'corporate-card-log':'Log Penggunaan Kad Korporat','cashbook-template':'Templat Buku Tunai','cash-flow-daily-report':'Laporan Aliran Tunai Harian',
  'payment-request-form':'Borang Permohonan Bayaran','expense-processing-checklist':'Senarai Semak Pemprosesan Perbelanjaan','leave-request-form':'Borang Permohonan Cuti',
  'attendance-record':'Rekod Kehadiran','employee-directory':'Direktori Pekerja','interview-evaluation-form':'Borang Penilaian Temu Duga',
  'performance-review-form':'Borang Penilaian Prestasi','training-application-form':'Borang Permohonan Latihan','equipment-request-form':'Borang Permohonan Peralatan',
  'vehicle-log':'Log Kenderaan','requirements-specification':'Spesifikasi Keperluan','issue-tracker':'Penjejak Isu',
  'risk-register':'Daftar Risiko','change-request-form':'Borang Permohonan Perubahan','meeting-action-items':'Senarai Tindakan Mesyuarat',
  'decision-log':'Log Keputusan','project-retrospective':'Retrospektif Projek','sprint-retrospective':'Retrospektif Sprint',
  'test-case-template':'Templat Kes Ujian','bug-report':'Laporan Pepijat','incident-report':'Laporan Insiden',
  'deployment-checklist':'Senarai Semak Pelaksanaan','code-review-checklist':'Senarai Semak Semakan Kod','release-notes-template':'Templat Nota Keluaran',
  'server-inspection-checklist':'Senarai Semak Pemeriksaan Pelayan','customer-call-log':'Log Panggilan Pelanggan','customer-inquiry-log':'Log Pertanyaan Pelanggan',
  'sales-activity-report':'Laporan Aktiviti Jualan','sales-daily-log':'Log Jualan Harian','customer-meeting-notes':'Nota Mesyuarat Pelanggan',
  'customer-complaint-record':'Rekod Aduan Pelanggan','inventory-count-sheet':'Lembaran Kiraan Inventori','stock-receipt-log':'Log Penerimaan Stok',
  'stock-issue-log':'Log Pengeluaran Stok','purchase-order-tracker':'Penjejak Pesanan Pembelian','delivery-confirmation':'Pengesahan Penghantaran',
  'reading-journal':'Jurnal Bacaan','assignment-tracker':'Penjejak Tugasan','exam-study-plan':'Pelan Belajar Peperiksaan',
  'class-notes-template':'Templat Nota Kelas','workout-log':'Log Senaman','weight-tracker':'Penjejak Berat Badan',
  'meal-tracker':'Penjejak Pemakanan','sleep-journal':'Jurnal Tidur','packing-checklist':'Senarai Semak Barang Bawaan',
  'travel-itinerary':'Jadual Perjalanan','trip-expense-settlement':'Penyata Perbelanjaan Perjalanan','personal-record-form':'Borang Maklumat Peribadi',
  'payment-record-log':'Log Rekod Bayaran','service-history-log':'Log Sejarah Servis',
};
if (Object.keys(source.titles).length !== 119 || Object.keys(titles).length !== 119) throw new Error(`Expected 119 titles; source=${Object.keys(source.titles).length}, reviewed=${Object.keys(titles).length}.`);
for (const [key, value] of Object.entries(titles)) if (!(key in source.titles) || !value.trim() || value === source.titles[key]) throw new Error(`Invalid Malay title: ${key}`);
draft.titles = titles;
draft.reviewedCounts = { ...(draft.reviewedCounts ?? {}), titles: 119 };
draft.reviewStatus = '119/699 units reviewed and corrected (document titles); unpublished';
fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log('Malay document titles reviewed: 119/119; unpublished.');
