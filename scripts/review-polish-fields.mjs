import fs from 'node:fs';

const path = 'docs/i18n-drafts/pl.json';
const sourcePath = process.argv[2];
if (!sourcePath) throw new Error('Usage: node scripts/review-polish-fields.mjs <English-source.json>');
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));

// Correct domain-sensitive machine output using the English field context.
const corrections = {
  Name: 'Imię i nazwisko', Role: 'Stanowisko', Opening: 'Wstęp',
  'Relevant experience': 'Doświadczenie związane ze stanowiskiem', Closing: 'Zakończenie',
  'Interview date': 'Data rozmowy kwalifikacyjnej', Subtotal: 'Suma częściowa',
  'Receipt number': 'Numer pokwitowania', 'Received from': 'Otrzymano od',
  'Received by': 'Odebrał(a)', 'Order number': 'Numer zamówienia',
  'Statement number': 'Numer zestawienia', Approver: 'Osoba zatwierdzająca',
  Traveler: 'Podróżny', 'Trip dates': 'Daty podróży', Lodging: 'Zakwaterowanie',
  'Meeting title': 'Tytuł spotkania', Agenda: 'Porządek spotkania',
  'Action items': 'Zadania do wykonania', 'Next meeting': 'Następne spotkanie',
  'Completed work': 'Ukończone zadania', Blockers: 'Przeszkody',
  Highlights: 'Najważniejsze wydarzenia', 'Key achievements': 'Najważniejsze osiągnięcia',
  Milestones: 'Kamienie milowe', Risks: 'Ryzyka', 'Success measures': 'Mierniki sukcesu',
  'Outgoing owner': 'Osoba przekazująca obowiązki', 'Incoming owner': 'Osoba przejmująca obowiązki',
  'Issue title': 'Tytuł problemu', Reporter: 'Osoba zgłaszająca',
  'Steps to reproduce': 'Kroki pozwalające odtworzyć problem',
  'Expected result': 'Oczekiwany rezultat', 'Actual result': 'Rzeczywisty rezultat',
  Principal: 'Kwota główna', 'Lending date': 'Data wypożyczenia',
  'Return date': 'Data zwrotu', 'Target date': 'Docelowy termin',
  'Move-in date': 'Data wprowadzenia się', 'Move-out date': 'Data wyprowadzki',
  'Study goal': 'Cel nauki', 'Study sessions': 'Sesje nauki',
  'Travel dates': 'Daty podróży', Reservations: 'Rezerwacje',
  'Utilities': 'Opłaty za media', Attire: 'Strój', Contingency: 'Rezerwa budżetowa',
  Deliverables: 'Rezultaty prac', Term: 'Okres obowiązywania', Fee: 'Wynagrodzenie',
  Payer: 'Płatnik', Payee: 'Odbiorca płatności', Issuer: 'Wystawca',
  'Employment status': 'Status zatrudnienia', ' Packed': 'Spakowane',
  'Assigned to': 'Przypisane do', Assignment: 'Zadanie',
  'Backup verified': 'Zweryfikowano kopię zapasową', Bedtime: 'Pora snu',
  Body: 'Treść', 'Call purpose': 'Cel rozmowy', Calories: 'Kalorie',
  Cardholder: 'Posiadacz karty', 'Cash received': 'Otrzymana gotówka',
  'Change description': 'Opis zmiany', 'Class date': 'Data zajęć',
  'Clock-in time': 'Godzina rozpoczęcia pracy', 'Clock-out time': 'Godzina zakończenia pracy',
  'Customer visits': 'Wizyty u klientów', 'Deals closed': 'Zamknięte transakcje',
  'Discussion points': 'Tematy do omówienia', Effort: 'Nakład pracy',
  'Expected delivery': 'Oczekiwany termin dostawy', Expense: 'Wydatek',
  'Favorite quote': 'Ulubiony cytat', 'File location': 'Lokalizacja pliku',
  'Follow-up date': 'Data dalszego kontaktu', 'Follow-up actions': 'Dalsze działania',
  'Goal weight': 'Docelowa masa ciała', 'Incident date': 'Data incydentu',
  'Incident title': 'Tytuł incydentu', 'Inquiry ID': 'Identyfikator zapytania',
  'Inquiry date': 'Data zapytania', Interviewer: 'Osoba prowadząca rozmowę',
  'Issue details': 'Szczegóły problemu', 'Issue number': 'Numer problemu',
  'Issued date': 'Data wystawienia', 'Known issues': 'Znane problemy',
  'Leave type': 'Rodzaj urlopu', Merchant: 'Akceptant', Mitigation: 'Ograniczanie ryzyka',
  'Odometer end': 'Stan licznika na koniec', 'Odometer start': 'Stan licznika na początku',
  'Options considered': 'Rozważane opcje', 'Prepared by': 'Przygotował(a)',
  Probability: 'Prawdopodobieństwo', 'Proposals sent': 'Wysłane oferty',
  'Pull request': 'Wniosek o włączenie zmian', 'Receipt attached': 'Dołączono paragon',
  'Receipt type': 'Rodzaj paragonu', 'Received date': 'Data otrzymania',
  Release: 'Wydanie', Resolution: 'Rozwiązanie', 'Resolution time': 'Czas rozwiązania',
  'Resolved date': 'Data rozwiązania', 'Requested team': 'Zespół, do którego skierowano wniosek',
  Requester: 'Osoba wnioskująca', 'Requirement ID': 'Identyfikator wymagania',
  'Repetitions': 'Powtórzenia', Reviewer: 'Osoba oceniająca',
  'Role fit': 'Dopasowanie do stanowiska', 'Rollback plan': 'Plan wycofania zmian',
  'Root cause': 'Przyczyna źródłowa', 'Running balance': 'Saldo bieżące',
  'Security checked': 'Przeprowadzono kontrolę bezpieczeństwa',
  'Service date': 'Data serwisu', Severity: 'Poziom ważności',
  Sprint: 'Iteracja sprintowa', 'Start location': 'Miejsce rozpoczęcia',
  'Study date': 'Data nauki', 'Study duration': 'Czas nauki',
  'Study topic': 'Temat nauki', 'System quantity': 'Ilość w systemie',
  'Test case ID': 'Identyfikator przypadku testowego', 'Test steps': 'Kroki testowe',
  'Tests passed': 'Zaliczone testy', 'Training title': 'Tytuł szkolenia',
  'Variance': 'Odchylenie', 'Wake time': 'Godzina pobudki',
  'Water intake': 'Ilość wypitej wody', 'What could improve': 'Co można poprawić',
  'What went well': 'Co się udało',
};

const expected = source.fields;
if (Object.keys(expected).length !== 425 || Object.keys(draft.fields).length !== 425) {
  throw new Error(`Expected 425 fields; source=${Object.keys(expected).length}, draft=${Object.keys(draft.fields).length}.`);
}
for (const [label, value] of Object.entries(corrections)) {
  if (!(label in expected)) throw new Error(`Unknown English field label: ${label}`);
  draft.fields[label] = value;
}
if (Object.keys(draft.fields).some((label) => !draft.fields[label].trim())) throw new Error('A Polish field label is empty.');
draft.reviewedCounts.fields = 425;
draft.reviewStatus = '544/699 units editorially reviewed (all document titles and field labels); unpublished';
fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log(`Polish field labels reviewed: ${Object.keys(expected).length}/425 (${Object.keys(corrections).length} contextual corrections); 155 units remain unpublished.`);
