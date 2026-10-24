import fs from 'node:fs';

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error('Usage: node scripts/review-uk-ui-content.mjs <English-source.json>');
const en = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const path = 'docs/i18n-drafts/uk.json';
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));

const reviewed = {
  interface: {
    description: 'Створюйте й переглядайте {title} безпосередньо у браузері.',
    guide: 'Обов’язкові поля позначено зірочкою. Збережіть копію на пристрої як текстовий файл або надрукуйте її у PDF.',
    faqSaved: 'Де зберігається мій документ?',
    faqLegal: 'Чи можна використовувати цей документ як юридично обов’язкову форму?',
    draftSaved: 'Чернетку збережено у цьому браузері.',
    clipboardError: 'Не вдалося скористатися буфером обміну в цьому браузері.',
    requiredLabel: 'Обов’язкове поле', searchLabel: 'Пошук документів',
    examplesBody: 'Вказуйте короткі й точні відомості. Перед передаванням або друком перевірте дати, імена, суми та місцеві вимоги.',
  },
  categories: {
    work: 'Бізнес і робота', finance: 'Фінанси й бухгалтерський облік', 'hr-admin': 'Кадри й адміністрування',
    'project-management': 'Керування проєктами', 'development-it': 'Розробка програмного забезпечення та ІТ',
    'sales-customer': 'Продажі й робота з клієнтами', 'inventory-logistics': 'Запаси й логістика',
    education: 'Навчання й освіта', personal: 'Особисте життя', 'health-fitness': 'Здоров’я та фітнес',
    travel: 'Подорожі', checklists: 'Контрольні списки', planning: 'Планування', records: 'Облік і журнали',
  },
  ui: {
    brand: 'Документи', tagline: 'Створюйте й впорядковуйте корисні документи у браузері.',
    search: 'Пошук шаблонів документів', categories: 'Категорії', all: 'Усі документи',
    popular: 'Виберіть документ, щоб почати', count: ' документів',
    browser: 'Введені дані залишаються у цьому браузері. Ми не надсилаємо їх на сервер або до аналітичних служб.',
    draft: 'Збережено у цьому браузері', clear: 'Очистити поля', copy: 'Копіювати текст', copied: 'Текст скопійовано',
    print: 'Друк / Зберегти як PDF', download: 'Завантажити як текст', preview: 'Попередній перегляд',
    edit: 'Редагувати документ', save: 'Збережено автоматично', related: 'Схожі документи',
    guide: 'Як користуватися', examples: 'Поради щодо заповнення', faq: 'Поширені запитання',
    legal: 'Це загальний шаблон і довідковий матеріал. Він не є юридичною консультацією та не гарантує юридичної сили. Перед використанням зверніться до кваліфікованого фахівця у вашій юрисдикції.',
    home: 'Бібліотека документів', language: 'Мова', family: 'Сервіси woori.today',
    portal: 'Головна сторінка', calculator: 'Калькулятор', tools: 'Онлайн-інструменти', ledger: 'Спільний сімейний журнал',
    docs: 'Документи', quiz: 'Вікторини', privacy: 'Політика конфіденційності', usage: 'Посібник користувача',
    contact: 'Зв’язатися з нами', contactTitle: 'Зв’язатися з нами', email: 'Адреса електронної пошти', close: 'Закрити',
    empty: 'Відповідних документів не знайдено.', checked: 'Виконано', adHidden: '',
    placeholder: 'Введіть текст', required: 'Це поле обов’язкове',
    templateNote: 'Введений текст одразу з’явиться у попередньому перегляді.',
    newFeature: 'Зареєструйте нову функцію також у каталозі сервісів.',
    updated: 'Збережено у цьому браузері', remove: 'Скинути', allLocales: 'Доступні мови',
  },
  chrome: {
    family: 'Сервіси woori.today', portal: 'Головна сторінка', calculators: 'Калькулятори',
    tools: 'Онлайн-інструменти', money: 'Спільний сімейний журнал', docs: 'Документи й форми',
    quiz: 'Вікторини й тести', privacy: 'Політика конфіденційності', terms: 'Умови використання', contact: 'Зв’язатися з нами',
    contactTitle: 'Зв’язатися з нами', inquiry: 'Тип повідомлення',
    guidance: 'Надішліть нам повідомлення електронною поштою. Ми відповімо вам.',
    email: 'Адреса електронної пошти', copy: 'Копіювати адресу електронної пошти', copied: 'Адресу електронної пошти скопійовано.', close: 'Закрити',
    types: ['Загальне запитання / пропозиція функції', 'Співпраця', 'Реклама / пропозиція', 'Повідомлення про помилку'],
  },
  editor: {
    myForms: 'Мої форми', newForm: 'Створити форму', open: 'Відкрити', rename: 'Перейменувати',
    duplicate: 'Створити копію', delete: 'Видалити', deleteConfirm: 'Видалити цю форму?',
    saveForm: 'Зберегти форму', addField: 'Додати поле', fieldName: 'Назва поля', fieldType: 'Тип поля',
    required: 'Обов’язкове поле', moveUp: 'Перемістити вгору', moveDown: 'Перемістити вниз', removeField: 'Видалити поле',
    useDefault: 'Використати стандартну форму', customize: 'Налаштувати цю форму',
    reset: 'Відновити початкову форму', text: 'Короткий текст', textarea: 'Довгий текст',
    number: 'Число', date: 'Дата', time: 'Час', checkbox: 'Прапорець', select: 'Список варіантів',
    currency: 'Сума', percent: 'Відсоток', email: 'Адреса електронної пошти', tel: 'Телефон', blankTitle: 'Нова форма',
    saved: 'Збережено у цьому браузері', defaultValue: 'Значення за замовчуванням', options: 'Варіанти',
  },
  documentContent: {
    copy: {
      intro: '{title} — це редагований шаблон для впорядкування відомостей, які зазвичай потрібні у сфері «{category}».',
      purpose: 'Використовуйте його, щоб занотовувати, переглядати чи передавати відомості у сфері «{category}», зокрема завдання, рішення та подальші кроки.',
      audience: 'Підійде людям і командам, які готують або ведуть записи у сфері «{category}».',
      structure: 'Шаблон містить такі поля: {fields}{more}',
      steps: 'Переконайтеся, що поля відповідають вашій меті. Спочатку заповніть обов’язкові поля, а потім перевірте порядок і вміст у попередньому перегляді. За потреби змініть поля у власній копії.',
      tips: 'Уважно вказуйте дати, відповідальних осіб і суми, які можна перевірити. Відокремлюйте підтверджені відомості від відкритих питань і наступних кроків.',
      source: 'woori.today підготував цей редагований довідковий шаблон для типових завдань із ведення записів. Це не копія офіційної форми іншої організації. Введені вами дані обробляються у цьому браузері.',
      caution: 'Перед поданням документа перевірте правила своєї організації та місцеві вимоги. Цей шаблон не замінює юридичну, податкову чи медичну консультацію або офіційну форму.',
      faq1: 'Де зберігаються мої дані?', faq2: 'Чи можна змінити поля?',
      faqA1: 'Чернетка зберігається у локальному сховищі цього браузера й не надсилається на сервер.',
      faqA2: 'Виберіть «Налаштувати цю форму», щоб створити копію. Потім можна додавати, видаляти й упорядковувати поля.',
      library: 'Шаблони woori.today можна заповнювати, переглядати, копіювати, завантажувати як текст або друкувати й зберігати у PDF.',
      libraryUse: 'Виберіть документ, заповніть потрібні поля та перегляньте результат. Скопіюйте чи завантажте текст або скористайтеся друком у браузері, щоб зберегти PDF.',
      category: 'Перегляньте документи категорії «{category}» за призначенням. Перед вибором перевірте поля кожного шаблону.',
      more: ' та ще {count}', tableNote: 'Також є таблиця для повторюваних записів і підсумків.',
    },
    specific: {
      form: 'Використовуйте {title}, щоб зібрати й перевірити відомості, потрібні у сфері «{category}», а за потреби передати їх іншій особі.',
      checklist: 'Використовуйте {title}, щоб позначати виконані перевірки й бачити, які пункти ще потребують уваги.',
      planner: 'Використовуйте {title}, щоб спланувати дати й цілі, визначити пріоритети та відстежувати поступ.',
      audience: 'Призначено людям і командам, які готують, перевіряють або передають {title}.',
      stepFocus: ' Зверніть увагу на {fields}, щоб документ було легше перевірити й передати.',
      tipFocus: ' Узгодьте між собою {fields} і перевірте в попередньому перегляді, чи нічого не пропущено.',
      faqFields: 'Які відомості збирає цей шаблон?',
      faqFieldsAnswer: 'Стандартний шаблон містить {fields}. Ви можете змінити власну копію відповідно до свого робочого процесу.',
    },
    purposeFocus: ' Використовуйте {fields} як основні записи для цього процесу.',
    sectionLabels: {
      overview: 'Про цей шаблон', audience: 'Для кого цей шаблон',
      contents: 'Поля шаблону й попередній перегляд', steps: 'Як заповнити', tips: 'Поради щодо заповнення',
      source: 'Походження шаблону й обробка даних', caution: 'Перед використанням',
    },
    recent: 'Нещодавно додані шаблони',
  },
};

function verifyShape(expected, actual, path = 'root') {
  if (Array.isArray(expected)) {
    if (!Array.isArray(actual) || expected.length !== actual.length) throw new Error(`Shape mismatch at ${path}`);
    expected.forEach((value, i) => verifyShape(value, actual[i], `${path}[${i}]`));
    return;
  }
  if (expected && typeof expected === 'object') {
    const a = Object.keys(expected).sort(); const b = Object.keys(actual ?? {}).sort();
    if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error(`Key mismatch at ${path}: ${a.join(',')} / ${b.join(',')}`);
    for (const key of a) verifyShape(expected[key], actual[key], `${path}.${key}`);
    return;
  }
  if (typeof expected !== 'string' || typeof actual !== 'string') throw new Error(`Value type mismatch at ${path}`);
  if (expected && !actual.trim()) throw new Error(`Empty translation at ${path}`);
  if (expected && expected === actual) throw new Error(`English source copy at ${path}`);
  const tokens = (value) => [...value.matchAll(/\{\w+\}/g)].map(([token]) => token).sort();
  if (JSON.stringify(tokens(expected)) !== JSON.stringify(tokens(actual))) throw new Error(`Interpolation mismatch at ${path}`);
}

for (const section of Object.keys(reviewed)) {
  verifyShape(en[section], reviewed[section], section);
  draft[section] = reviewed[section];
}
draft.reviewedCounts = { ...(draft.reviewedCounts ?? {}), interface: 9, categories: 14, ui: 47, chrome: 18, editor: 33, documentContent: 34 };
draft.reviewStatus = '155/699 units reviewed and corrected (shared UI and document content); unpublished';
fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log('Ukrainian shared UI and document copy reviewed: 155/699 units; titles and fields remain unpublished.');
