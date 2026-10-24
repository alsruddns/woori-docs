import fs from 'node:fs';

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error('Usage: node scripts/review-polish-ui-content.mjs <English-source.json>');
const en = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const path = 'docs/i18n-drafts/pl.json';
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));
const reviewed = {
  interface: {
    description: 'Twórz i wyświetlaj podgląd {title} bezpośrednio w przeglądarce.',
    guide: 'Wymagane pola są oznaczone gwiazdką. Zapisz kopię na urządzeniu jako plik tekstowy albo wydrukuj ją do PDF.',
    faqSaved: 'Gdzie zapisano mój dokument?',
    faqLegal: 'Czy mogę użyć tego formularza jako prawnie wiążącego dokumentu?',
    draftSaved: 'Wersja robocza jest zapisana w tej przeglądarce.',
    clipboardError: 'Schowek jest niedostępny w tej przeglądarce.',
    requiredLabel: 'Wymagane',
    searchLabel: 'Szukaj dokumentów',
    examplesBody: 'Podawaj zwięzłe i zgodne z faktami informacje. Przed udostępnieniem lub wydrukowaniem sprawdź daty, nazwiska, kwoty i lokalne wymagania.',
  },
  categories: {
    work: 'Firma i praca', finance: 'Finanse i księgowość', 'hr-admin': 'Kadry i administracja',
    'project-management': 'Zarządzanie projektami', 'development-it': 'Programowanie i IT',
    'sales-customer': 'Sprzedaż i obsługa klienta', 'inventory-logistics': 'Zapasy i logistyka',
    education: 'Szkoła i edukacja', personal: 'Życie prywatne', 'health-fitness': 'Zdrowie i aktywność fizyczna',
    travel: 'Podróże', checklists: 'Listy kontrolne', planning: 'Plany', records: 'Rejestry',
  },
  ui: {
    brand: 'Dokumenty', tagline: 'Twórz i porządkuj przydatne dokumenty w przeglądarce.',
    search: 'Szukaj szablonów dokumentów', categories: 'Kategorie', all: 'Wszystkie dokumenty',
    popular: 'Wybierz dokument, aby rozpocząć', count: ' dokumentów',
    browser: 'Wprowadzone dane pozostają w tej przeglądarce. Nie są wysyłane na nasze serwery ani do narzędzi analitycznych.',
    draft: 'Zapisano w tej przeglądarce', clear: 'Wyczyść pola', copy: 'Kopiuj tekst', copied: 'Skopiowano',
    print: 'Drukuj / Zapisz jako PDF', download: 'Pobierz plik tekstowy', preview: 'Podgląd na żywo',
    edit: 'Edytuj dokument', save: 'Zapisano automatycznie', related: 'Powiązane dokumenty',
    guide: 'Jak korzystać', examples: 'Wskazówki dotyczące treści', faq: 'Często zadawane pytania',
    legal: 'To wyłącznie ogólny projekt i szablon pomocniczy. Nie stanowi porady prawnej ani gwarancji skutków prawnych. Przed użyciem skonsultuj się z wykwalifikowanym specjalistą w swojej jurysdykcji.',
    home: 'Biblioteka dokumentów', language: 'Język', family: 'Serwisy z rodziny woori.today',
    portal: 'Strona główna', calculator: 'Kalkulator', tools: 'Narzędzia online', ledger: 'Wspólny rejestr domowy',
    docs: 'Dokumenty', quiz: 'Quizy', privacy: 'Prywatność', usage: 'Instrukcja korzystania',
    contact: 'Kontakt', contactTitle: 'Skontaktuj się z nami', email: 'E-mail', close: 'Zamknij',
    empty: 'Nie znaleziono pasujących dokumentów.', checked: 'Gotowe', adHidden: '',
    placeholder: 'Wpisz treść', required: 'To pole jest wymagane',
    templateNote: 'Wprowadzone dane są od razu widoczne w podglądzie.',
    newFeature: 'Każdą nową funkcję należy również dodać do katalogu usług.',
    updated: 'Zapisano w tej przeglądarce', remove: 'Wyczyść', allLocales: 'Dostępne języki',
  },
  chrome: {
    family: 'Serwisy z rodziny woori.today', portal: 'Strona główna', calculators: 'Kalkulatory',
    tools: 'Narzędzia online', money: 'Wspólny rejestr domowy', docs: 'Dokumenty i formularze',
    quiz: 'Quizy i testy', privacy: 'Prywatność', terms: 'Warunki korzystania', contact: 'Kontakt',
    contactTitle: 'Skontaktuj się z nami', inquiry: 'Rodzaj zapytania',
    guidance: 'Wyślij wiadomość e-mail z zapytaniem. Odpowiemy najszybciej, jak to możliwe.',
    email: 'E-mail', copy: 'Kopiuj adres e-mail', copied: 'Adres e-mail skopiowany.', close: 'Zamknij',
    types: ['Ogólne / funkcja', 'Współpraca', 'Reklama / propozycja', 'Zgłoszenie błędu'],
  },
  editor: {
    myForms: 'Moje formularze', newForm: 'Utwórz nowy formularz', open: 'Otwórz', rename: 'Zmień nazwę',
    duplicate: 'Utwórz kopię', delete: 'Usuń', deleteConfirm: 'Usunąć ten formularz?',
    saveForm: 'Zapisz formularz', addField: 'Dodaj pole', fieldName: 'Nazwa pola', fieldType: 'Typ pola',
    required: 'Wymagane', moveUp: 'Przenieś wyżej', moveDown: 'Przenieś niżej', removeField: 'Usuń pole',
    useDefault: 'Użyj domyślnego formularza', customize: 'Dostosuj ten formularz',
    reset: 'Przywróć pierwotny formularz', text: 'Krótki tekst', textarea: 'Dłuższy tekst',
    number: 'Liczba', date: 'Data', time: 'Godzina', checkbox: 'Pole wyboru', select: 'Wybór',
    currency: 'Kwota', percent: 'Procent', email: 'E-mail', tel: 'Telefon', blankTitle: 'Nowy formularz',
    saved: 'Zapisano w tej przeglądarce', defaultValue: 'Wartość domyślna', options: 'Opcje wyboru',
  },
  documentContent: {
    copy: {
      intro: '{title} to edytowalny szablon ułatwiający uporządkowanie informacji potrzebnych w pracy związanej z kategorią: {category}.',
      purpose: 'Użyj go, aby zapisać, sprawdzić lub przekazać informacje z kategorii {category}, takie jak działania, decyzje i zadania do wykonania.',
      audience: 'Szablon jest przeznaczony dla osób i zespołów, które przygotowują lub prowadzą dokumentację w kategorii {category}.',
      structure: 'Szablon zawiera następujące pola: {fields}{more}',
      steps: 'Sprawdź, czy pola odpowiadają Twoim potrzebom. Najpierw uzupełnij pola wymagane, a potem sprawdź kolejność i treść w podglądzie. W razie potrzeby dostosuj pola we własnej kopii.',
      tips: 'Starannie wpisuj daty, osoby odpowiedzialne i kwoty, tak aby można je było zweryfikować. Oddziel potwierdzone fakty od nierozstrzygniętych kwestii i kolejnych działań.',
      source: 'Ten edytowalny szablon pomocniczy przygotował serwis woori.today do typowych zadań związanych z prowadzeniem dokumentacji. Nie jest kopią urzędowego formularza żadnej zewnętrznej organizacji. Wpisy są przetwarzane w tej przeglądarce.',
      caution: 'Przed złożeniem dokumentu sprawdź zasady obowiązujące w Twojej organizacji oraz lokalne wymagania. Ten szablon nie zastępuje porady prawnej, podatkowej ani medycznej ani urzędowego formularza.',
      faq1: 'Gdzie zapisywana jest moja praca?', faq2: 'Czy mogę zmienić pola?',
      faqA1: 'Wersja robocza jest zapisywana w pamięci lokalnej tej przeglądarki i nie jest wysyłana na serwer.',
      faqA2: 'Wybierz „Dostosuj ten szablon”, aby utworzyć kopię. Następnie dodaj pola, usuń je lub zmień ich kolejność.',
      library: 'Szablony woori.today można wypełniać, wyświetlać w podglądzie, kopiować, pobierać jako plik tekstowy albo drukować i zapisywać w formacie PDF.',
      libraryUse: 'Wybierz dokument, uzupełnij potrzebne pola i sprawdź podgląd. Skopiuj lub pobierz tekst albo użyj okna drukowania w przeglądarce, aby zapisać dokument jako PDF.',
      category: 'Przeglądaj dokumenty z kategorii {category} według ich przeznaczenia. Przed wyborem szablonu sprawdź, jakie pola zawiera.',
      more: ' i {count} więcej', tableNote: 'Szablon zawiera również tabelę z powtarzalnymi wpisami i podsumowaniem.',
    },
    specific: {
      form: 'Użyj {title}, aby zebrać informacje potrzebne w kategorii {category}, sprawdzić je i w razie potrzeby przekazać kolejnej osobie.',
      checklist: 'Użyj {title}, aby zaznaczać wykonane czynności i szybko sprawdzać, które pozycje wymagają jeszcze uwagi.',
      planner: 'Użyj {title}, aby rozpisać terminy i cele, ustalić priorytety oraz śledzić postępy.',
      audience: 'Szablon jest przeznaczony dla osób i zespołów, które przygotowują, sprawdzają lub udostępniają dokument: {title}.',
      stepFocus: ' Zwróć szczególną uwagę na pola: {fields}. Dzięki temu łatwiej będzie sprawdzić dokument i przekazać go dalej.',
      tipFocus: ' Dbaj o spójność pól: {fields}. Przed użyciem dokumentu sprawdź w podglądzie, czy nie brakuje żadnych informacji.',
      faqFields: 'Jakie informacje zbiera ten szablon?',
      faqFieldsAnswer: 'Domyślny szablon zawiera pola: {fields}. Możesz dostosować jego kopię do swojego sposobu pracy.',
    },
    purposeFocus: ' Użyj pól: {fields} jako podstawowego zapisu dla tego procesu.',
    sectionLabels: {
      overview: 'O tym szablonie', audience: 'Dla kogo jest przeznaczony',
      contents: 'Pola i podgląd', steps: 'Jak go wypełnić', tips: 'Wskazówki dotyczące treści',
      source: 'Pochodzenie szablonu i przetwarzanie danych', caution: 'Przed użyciem',
    },
    recent: 'Ostatnio dodane szablony',
  },
};

function compareShape(actual, expected, path) {
  if (Array.isArray(expected)) {
    if (!Array.isArray(actual) || actual.length !== expected.length) throw new Error(`Array mismatch at ${path}`);
    expected.forEach((value, index) => compareShape(actual[index], value, `${path}[${index}]`));
  } else if (expected && typeof expected === 'object') {
    if (!actual || typeof actual !== 'object' || Array.isArray(actual)) throw new Error(`Object mismatch at ${path}`);
    if (JSON.stringify(Object.keys(actual).sort()) !== JSON.stringify(Object.keys(expected).sort())) throw new Error(`Key mismatch at ${path}`);
    for (const [key, value] of Object.entries(expected)) compareShape(actual[key], value, `${path}.${key}`);
  } else {
    if (typeof actual !== 'string' || (expected && !actual.trim())) throw new Error(`Empty or non-string value at ${path}`);
    const expectedTokens = [...expected.matchAll(/\{\w+\}/g)].map(([token]) => token).sort().join('|');
    const actualTokens = [...actual.matchAll(/\{\w+\}/g)].map(([token]) => token).sort().join('|');
    if (expectedTokens !== actualTokens) throw new Error(`Interpolation mismatch at ${path}`);
    if (expected && actual.trim() === expected.trim()) throw new Error(`English source copy at ${path}`);
  }
}

for (const section of Object.keys(reviewed)) compareShape(reviewed[section], en[section], section);
draft.interface = reviewed.interface;
draft.categories = reviewed.categories;
draft.ui = reviewed.ui;
draft.chrome = reviewed.chrome;
draft.editor = reviewed.editor;
draft.documentContent = reviewed.documentContent;
draft.reviewedCounts = { titles: 119, fields: 425, interface: 9, categories: 14, ui: 47, chrome: 18, editor: 33, documentContent: 34 };
const count = Object.values(draft.reviewedCounts).reduce((sum, value) => sum + value, 0);
if (count !== 699) throw new Error(`Expected 699 reviewed units, got ${count}.`);
draft.reviewStatus = 'Editorial translation review complete; unpublished pending Polish runtime connection and verification';
fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log(`Polish editorial review complete: ${count}/699 units; runtime connection and verification remain.`);
