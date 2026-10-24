import fs from 'node:fs';

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error('Usage: node scripts/review-ro-fields.mjs <English-source.json>');
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const path = 'docs/i18n-drafts/ro.json';
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));
const values = [
  'Nume', 'E-mail', 'Telefon', 'Localitate', 'Prezentare personală', 'Experiență profesională', 'Studii', 'Competențe', 'Experiență',
  'Profil profesional', 'Istoric profesional', 'Realizări', 'Companie', 'Funcție', 'Introducere', 'Experiență relevantă', 'Încheiere',
  'Elemente de verificat', 'Note', 'Termen limită', 'Data interviului', 'Numărul ofertei', 'Data', 'Valabil până la', 'Furnizor', 'Client',
  'Produse și servicii', 'Total parțial', 'Impozit', 'Număr factură', 'Detalii de plată', 'Număr chitanță', 'Primit de la', 'Descriere',
  'Sumă', 'Încasat de', 'Număr de comandă', 'Cumpărător', 'Furnizor', 'Data livrării', 'Număr de livrare', 'Expeditor', 'Destinatar',
  'Adresa de livrare', 'Număr de extras', 'Vânzător', 'Sumă totală', 'Departament', 'Perioadă', 'Cheltuieli', 'Persoană care aprobă',
  'Călător', 'Destinație', 'Datele călătoriei', 'Transportul', 'Cazare', 'Mese', 'Alte cheltuieli', 'Titlul ședinței', 'Participanți',
  'Ordinea de zi', 'Discuții', 'Decizii', 'Acțiuni de întreprins', 'Următoarea ședință', 'Activități finalizate', 'În desfășurare',
  'Obstacole', 'Pașii următori', 'Săptămână', 'Puncte importante', 'Dificultăți', 'Săptămâna viitoare', 'Lună', 'Obiective',
  'Rezultate', 'Realizări importante', 'Luna viitoare', 'Numele proiectului', 'Responsabil', 'Obiective', 'Domeniu de aplicare',
  'Etape importante', 'Resurse', 'Riscuri', 'Indicatori de succes', 'Prioritate', 'Responsabil care predă', 'Responsabil care preia',
  'Responsabilități', 'Sarcini deschise', 'Persoane de contact', 'Titlul problemei', 'Raportat de', 'Consecințe', 'Pași pentru reproducere',
  'Rezultatul așteptat', 'Rezultatul obținut', 'Atașamente', 'Părțile implicate', 'Subiect', 'Termeni', 'Semnături',
  'Detalii de confirmare', 'Semnătură', 'Persoana care își dă consimțământul', 'Scop', 'Creditor', 'Debitor', 'Suma împrumutată',
  'Plan de rambursare', 'Dobândă', 'Obiect', 'Stare', 'Data împrumutului', 'Data returnării', 'Data-țintă', 'Data plecării',
  'Data mutării în locuință', 'Cameră', 'Vehicul', 'Data inspecției', 'Data mutării din locuință', 'Data evaluării',
  'Note despre gospodărie', 'Priorități principale', 'Program', 'Sarcini', 'Săptămâna din', 'Obiective săptămânale', 'Luni',
  'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sfârșit de săptămână', 'Date importante', 'Obiectiv de studiu', 'Data începerii', 'Sesiuni de studiu',
  'Note de recapitulare', 'Datele călătoriei', 'Călători', 'Itinerar', 'Rezervări', 'Proiect', 'Responsabili', 'Dependențe',
  'Eveniment', 'Data evenimentului', 'Venituri', 'Locuință', 'Mâncare', 'Transportul', 'Utilități', 'Economii', 'Venitul gospodăriei',
  'Sănătate', 'Altele', 'Activități', 'Locație', 'Ținută', 'Fotografie', 'Flori', 'Persoane', 'Instrumente', 'Servicii',
  'Fond pentru cheltuieli neprevăzute', 'Obiectiv', 'Sumă-țintă', 'Economii actuale', 'Contribuție lunară', 'Rezultate de livrat',
  'Plată', 'Durată', 'Clientul', 'Colaborator independent', 'Onorariu', 'Revizuiri', 'Serviciu', 'Informații confidențiale',
  'Excluderi', 'Plătitor', 'Beneficiarul plății', 'Data plății', 'Metoda de plată', 'Referință', 'Organizație', 'Statut profesional',
  'Data emiterii', 'Emitent', 'Ambalat', 'Criterii de acceptare', 'Cazare', 'Cont', 'Detalii de cont', 'Acțiune', 'Activitate',
  'Adresă', 'Starea aprobării', 'Atribuit către', 'Temă', 'Atașament', 'Autor', 'Copie de siguranță verificată', 'Cont bancar',
  'Ora de culcare', 'Conținut', 'Procentul de grăsime corporală', 'Titlul cărții', 'Durata pauzei', 'Cod bugetar', 'Remedieri de erori',
  'Titlul erorii', 'Scopul deplasării profesionale', 'Utilizarea procesorului', 'Data apelului', 'Scopul apelului', 'Apeluri',
  'Calorii', 'Candidat', 'Titularul cardului', 'Numerar plătit', 'Numerar încasat', 'Categorie', 'Descrierea modificării',
  'Canal', 'Data cursului', 'Ora de intrare', 'Ora de ieșire', 'Soldul de închidere', 'Comunicare', 'Data reclamației',
  'Aspecte de clarificat', 'Persoană de contact', 'Metoda de contact', 'Persoană de contact', 'Contextul', 'Costul', 'Centru de cost',
  'Data inventarierii', 'Cantitate inventariată', 'Persoana care a numărat', 'Curs', 'Data creării', 'Monedă', 'Vizite la clienți',
  'Contracte încheiate', 'Decizie', 'Data deciziei', 'Titlul deciziei', 'Detalii', 'Ora depistării', 'Domenii de îmbunătățit',
  'Puncte de discuție', 'Utilizarea discului', 'Distanță', 'Numărul documentului', 'Șofer', 'Durată', 'Efort', 'Angajat',
  'Numărul de identificare al angajatului', 'Data încheierii', 'Ora încheierii', 'Nivel de energie', 'Mediu', 'Echipamente',
  'Buget estimat', 'Cost estimat', 'Timp estimat', 'Data examenului', 'Exercițiu', 'Data estimată a livrării', 'Cheltuială',
  'Categorie de cheltuieli', 'Data cheltuielii', 'Elemente de cheltuieli', 'Citat preferat', 'Funcționalitate', 'Locația fișierului',
  'Data finalizării', 'Acțiuni ulterioare', 'Data următoarei verificări', 'Sarcini ulterioare', 'Greutatea-țintă', 'Notă',
  'Îmbunătățiri', 'Data incidentului', 'Titlul incidentului', 'ID-ul solicitării', 'Data solicitării', 'Detaliile solicitării',
  'Formator', 'Intervievator', 'Detaliile problemei', 'Numărul problemei', 'Data emiterii', 'Concepte-cheie', 'Probleme cunoscute',
  'Tipul concediului', 'Lecții învățate', 'Managerul', 'Data mesei', 'Ora mesei', 'Tipul mesei', 'Ora măsurării', 'Data ședinței',
  'Scopul ședinței', 'Ședințe', 'Utilizarea memoriei', 'Comerciant', 'Măsuri de limitare a impactului', 'Funcționalități noi',
  'Acțiunea următoare', 'Data următoarei revizii', 'Citirea contorului la final', 'Citirea contorului la început', 'Soldul inițial',
  'Opțiuni analizate', 'Data comenzii', 'Rezultat', 'Rezultate', 'Pagini', 'Participanți', 'Scopul plății', 'Porție', 'Funcție',
  'Condiții prealabile', 'Întocmit de', 'Probabilitate', 'Produs sau serviciu', 'Progres', 'Oferte trimise', 'Cerere de integrare',
  'Cantitate', 'Întrebări', 'Evaluare', 'Motiv', 'Chitanță atașată', 'Tipul chitanței', 'Data primirii', 'Destinatar',
  'Recomandare', 'Data înregistrării', 'Titlul înregistrării', 'Număr de referință', 'Versiune', 'Data lansării',
  'Versiunea lansării', 'Repetări', 'Data raportului', 'Perioada raportată', 'Data solicitării', 'Titlul solicitării',
  'Echipa solicitată', 'Solicitant', 'ID-ul cerinței', 'Titlul cerinței', 'Cerințe', 'Numărul rezervării', 'Soluție',
  'Timpul de rezolvare', 'Data rezolvării', 'Venituri', 'Perioada evaluării', 'Evaluator', 'Titlul riscului', 'Potrivirea cu rolul',
  'Plan de revenire', 'Cauza principală', 'Sold curent', 'Codul produsului', 'Agent de vânzări', 'Scenariu', 'Verificare de securitate',
  'Starea securității', 'Serverul', 'Data service-ului', 'Serii', 'Perioada de decontare', 'Gravitate', 'Durata somnului',
  'Calitatea somnului', 'Sprintul', 'Locul de plecare', 'Ora de începere', 'Stare', 'Locația de depozitare', 'Puncte forte',
  'Data studiului', 'Durata studiului', 'Subiectul studiului', 'Data predării', 'Rezumat', 'Cantitatea din sistem', 'Cota de impozitare',
  'Echipă', 'ID-ul cazului de testare', 'Data testării', 'Pașii de testare', 'Persoana care testează', 'Teste reușite', 'Subiect',
  'Obiectivele formării', 'Titlul cursului de formare', 'Data tranzacției', 'Tipul tranzacției', 'Data călătoriei', 'Călătorie',
  'Data excursiei', 'Scopul călătoriei', 'Preț unitar', 'TVA', 'Diferență', 'Vânzător', 'Ora trezirii', 'Consumul de apă',
  'Greutate', 'Ce poate fi îmbunătățit', 'Ce a mers bine', 'Data activității', 'Ore lucrate', 'Volum de muncă', 'Data antrenamentului',
];
const keys = Object.keys(source.fields);
if (keys.length !== 425 || values.length !== keys.length) throw new Error(`Expected 425 reviewed fields, got ${keys.length} keys and ${values.length} values.`);
draft.fields = Object.fromEntries(keys.map((key, index) => [key, values[index]]));
draft.reviewedCounts = { ...draft.reviewedCounts, fields: 425 };
const total = Object.values(draft.reviewedCounts).reduce((sum, count) => sum + count, 0);
draft.reviewStatus = `Romanian editorial translation review complete (${total}/699 units); unpublished pending runtime, SEO and production verification`;
fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log(`Romanian field labels reviewed: 425/425; ${total}/699 units; unpublished.`);
