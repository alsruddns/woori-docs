import fs from 'node:fs';

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error('Usage: node scripts/review-ro-titles.mjs <English-source.json>');
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const path = 'docs/i18n-drafts/ro.json';
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));
const values = [
  'Șablon de CV', 'Șablon simplu de CV', 'Șablon de CV profesional', 'Model de scrisoare de intenție',
  'Listă pentru candidatura la un loc de muncă', 'Listă de pregătire pentru interviu', 'Generator de oferte', 'Generator de facturi', 'Generator de chitanțe',
  'Formular de comandă', 'Aviz de însoțire a mărfii', 'Generator de extras de tranzacții', 'Șablon de raport de cheltuieli',
  'Decont pentru călătorii de serviciu', 'Proces-verbal de ședință', 'Raport zilnic de activitate', 'Raport săptămânal de activitate',
  'Raport lunar de activitate', 'Plan de proiect', 'Listă de sarcini', 'Proces-verbal de predare-primire', 'Raport de incident',
  'Acord simplu', 'Scrisoare de confirmare', 'Formular de consimțământ', 'Contract de împrumut personal', 'Registru de împrumut al obiectelor',
  'Listă pentru mutare', 'Listă pentru organizarea nunții', 'Listă pentru călătorie', 'Listă pentru călătorii internaționale',
  'Listă cu lucruri necesare pentru nou-născut', 'Listă pentru locuitul pe cont propriu', 'Listă pentru amenajarea locuinței unui cuplu',
  'Listă pentru cumpărarea unei mașini', 'Listă pentru plecarea din locuință', 'Listă pentru pregătirea situațiilor de urgență',
  'Agendă zilnică', 'Agendă săptămânală', 'Agendă lunară', 'Plan de studiu', 'Planificator de călătorii', 'Program de proiect',
  'Listă pentru organizarea evenimentelor', 'Buget lunar', 'Buget al gospodăriei', 'Buget de călătorie', 'Buget de nuntă',
  'Buget de proiect', 'Plan de economii', 'Proiect de contract general', 'Proiect de acord pentru colaborare independentă',
  'Proiect de acord pentru servicii', 'Proiect de acord de confidențialitate', 'Confirmare de plată', 'Adeverință de angajare',
  'Cerere de lucru', 'Cerere de colaborare', 'Raport de călătorie de serviciu', 'Plan de călătorie de serviciu', 'Plan de lucru',
  'Diagramă de repartizare a sarcinilor', 'Cerere de aprobare', 'Scrisoare oficială', 'Formular de aprobare a cheltuielilor',
  'Formular de decontare a costurilor', 'Registru de utilizare a cardurilor companiei', 'Registru de casă', 'Raport zilnic al fluxului de numerar',
  'Cerere de plată', 'Listă pentru procesarea cheltuielilor', 'Cerere de concediu', 'Registru de prezență', 'Directorul angajaților',
  'Formular de evaluare a interviului', 'Formular de evaluare a performanței', 'Cerere de participare la cursuri', 'Cerere de echipamente',
  'Registru auto', 'Specificații de cerințe', 'Registru de probleme', 'Registru de riscuri', 'Cerere de modificare',
  'Listă de acțiuni pentru ședință', 'Registru de decizii', 'Analiză retrospectivă a proiectului', 'Analiză retrospectivă a sprintului',
  'Șablon de caz de testare', 'Raport de eroare', 'Raport de incident', 'Listă pentru implementare', 'Listă pentru evaluarea codului',
  'Șablon de note de lansare', 'Listă pentru verificarea serverului', 'Registru de apeluri cu clienții', 'Registru de solicitări ale clienților',
  'Raport de activitate comercială', 'Registru zilnic de vânzări', 'Note de ședință cu clienții', 'Registru de reclamații ale clienților',
  'Fișă de inventariere', 'Registru de recepție a stocurilor', 'Registru de ieșire a stocurilor', 'Registru de comenzi de achiziție',
  'Confirmare de livrare', 'Jurnal de lectură', 'Registru de teme', 'Plan de studiu pentru examen', 'Șablon de notițe de curs',
  'Jurnal de antrenament', 'Registru de greutate', 'Jurnal alimentar', 'Jurnal de somn', 'Listă pentru bagaje', 'Itinerar de călătorie',
  'Decontul cheltuielilor de călătorie', 'Formular cu date personale', 'Registru de plăți', 'Istoric de service',
];
const keys = Object.keys(source.titles);
if (keys.length !== 119 || values.length !== keys.length) throw new Error(`Expected 119 reviewed titles, got ${keys.length} keys and ${values.length} values.`);
draft.titles = Object.fromEntries(keys.map((key, index) => [key, values[index]]));
draft.reviewedCounts = { ...draft.reviewedCounts, titles: 119 };
const total = Object.values(draft.reviewedCounts).reduce((sum, count) => sum + count, 0);
draft.reviewStatus = `${total}/699 units reviewed and corrected (document titles); unpublished`;
fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log(`Romanian document titles reviewed: 119/119; unpublished.`);
