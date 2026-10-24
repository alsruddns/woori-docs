import fs from 'node:fs';

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error('Usage: node scripts/review-uk-titles.mjs <English-source.json>');
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const path = 'docs/i18n-drafts/uk.json';
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));

const titles = {
  'resume-template':'Шаблон резюме','simple-resume-template':'Простий шаблон резюме','career-resume-template':'Шаблон резюме для досвідчених фахівців',
  'cover-letter-template':'Шаблон супровідного листа','job-application-checklist':'Список перевірки заявки на роботу','interview-preparation-checklist':'Список підготовки до співбесіди',
  'quotation-generator':'Генератор комерційних пропозицій','invoice-generator':'Генератор рахунків','receipt-generator':'Генератор квитанцій',
  'purchase-order-generator':'Генератор замовлень на закупівлю','delivery-note-generator':'Генератор накладних','transaction-statement-generator':'Генератор звіту про операції',
  'expense-report-template':'Шаблон звіту про витрати','business-trip-expense-template':'Шаблон звіту про витрати на відрядження','meeting-minutes-generator':'Генератор протоколів зустрічей',
  'daily-work-report-template':'Шаблон щоденного звіту про роботу','weekly-work-report-template':'Шаблон щотижневого звіту про роботу','monthly-work-report-template':'Шаблон щомісячного звіту про роботу',
  'project-plan-template':'Шаблон плану проєкту','task-list-template':'Шаблон списку завдань','handover-document-template':'Шаблон документа для передавання справ',
  'issue-report-template':'Шаблон звіту про проблему','simple-agreement-template':'Шаблон простої угоди','confirmation-letter-template':'Шаблон листа-підтвердження',
  'consent-form-template':'Шаблон форми згоди','loan-agreement-template':'Шаблон договору позики','item-lending-agreement-template':'Шаблон угоди про передавання речей у користування',
  'moving-checklist':'Список справ для переїзду','wedding-checklist':'Список підготовки до весілля','travel-checklist':'Список речей для подорожі',
  'international-travel-checklist':'Список підготовки до міжнародної подорожі','newborn-checklist':'Список речей для новонародженого','living-alone-checklist':'Список справ для самостійного проживання',
  'newlywed-home-checklist':'Список підготовки житла для молодят','car-purchase-checklist':'Список перевірки перед купівлею автомобіля','moving-out-checklist':'Список справ перед виїздом із житла',
  'emergency-preparedness-checklist':'Список підготовки до надзвичайних ситуацій','daily-planner':'Щоденний планувальник','weekly-planner':'Щотижневий планувальник',
  'monthly-planner':'Щомісячний планувальник','study-planner':'Навчальний планувальник','travel-planner':'Планувальник подорожі',
  'project-schedule-template':'Шаблон графіка проєкту','event-planning-checklist':'Список планування заходу','monthly-budget-template':'Шаблон щомісячного бюджету',
  'household-budget-template':'Шаблон сімейного бюджету','travel-budget-template':'Шаблон бюджету подорожі','wedding-budget-template':'Шаблон весільного бюджету',
  'project-budget-template':'Шаблон бюджету проєкту','savings-plan-template':'Шаблон плану заощаджень','simple-contract-template':'Шаблон простого договору',
  'freelance-agreement-template':'Шаблон договору з фрилансером','service-agreement-template':'Шаблон договору про надання послуг','nda-template':'Шаблон угоди про нерозголошення',
  'payment-confirmation-template':'Шаблон підтвердження оплати','employment-certificate-template':'Довідка з місця роботи','work-request-form':'Форма запиту на виконання роботи',
  'cooperation-request-form':'Форма запиту на співпрацю','business-trip-report':'Звіт про відрядження','business-trip-plan':'План відрядження',
  'work-plan-template':'Шаблон плану роботи','work-allocation-chart':'Схема розподілу роботи','approval-request-form':'Форма запиту на затвердження',
  'official-letter-template':'Шаблон офіційного листа','expense-approval-form':'Форма затвердження витрат','cost-settlement-form':'Форма звіту про взаєморозрахунки',
  'corporate-card-log':'Журнал використання корпоративної картки','cashbook-template':'Шаблон касової книги','cash-flow-daily-report':'Щоденний звіт про рух коштів',
  'payment-request-form':'Форма запиту на оплату','expense-processing-checklist':'Список перевірки обробки витрат','leave-request-form':'Форма запиту на відпустку',
  'attendance-record':'Облік відвідуваності','employee-directory':'Довідник працівників','interview-evaluation-form':'Форма оцінювання співбесіди',
  'performance-review-form':'Форма оцінювання ефективності роботи','training-application-form':'Форма заявки на навчання','equipment-request-form':'Форма запиту на обладнання',
  'vehicle-log':'Журнал використання автомобіля','requirements-specification':'Специфікація вимог','issue-tracker':'Журнал відстеження проблем',
  'risk-register':'Реєстр ризиків','change-request-form':'Форма запиту на зміни','meeting-action-items':'Список завдань за підсумками зустрічі',
  'decision-log':'Журнал рішень','project-retrospective':'Підсумковий аналіз проєкту','sprint-retrospective':'Підсумковий аналіз спринту',
  'test-case-template':'Шаблон тестового сценарію','bug-report':'Звіт про помилку','incident-report':'Звіт про інцидент',
  'deployment-checklist':'Список перевірки розгортання','code-review-checklist':'Список перевірки коду','release-notes-template':'Шаблон приміток до випуску',
  'server-inspection-checklist':'Список перевірки сервера','customer-call-log':'Журнал дзвінків клієнтам','customer-inquiry-log':'Журнал запитів клієнтів',
  'sales-activity-report':'Звіт про продажі','sales-daily-log':'Щоденний журнал продажів','customer-meeting-notes':'Нотатки зустрічі з клієнтом',
  'customer-complaint-record':'Запис скарги клієнта','inventory-count-sheet':'Відомість обліку запасів','stock-receipt-log':'Журнал надходження товарів',
  'stock-issue-log':'Журнал видачі товарів','purchase-order-tracker':'Відстеження замовлень на закупівлю','delivery-confirmation':'Підтвердження доставки',
  'reading-journal':'Щоденник читання','assignment-tracker':'Відстеження навчальних завдань','exam-study-plan':'План підготовки до іспиту',
  'class-notes-template':'Шаблон конспекту заняття','workout-log':'Журнал тренувань','weight-tracker':'Відстеження ваги',
  'meal-tracker':'Щоденник харчування','sleep-journal':'Щоденник сну','packing-checklist':'Список речей для пакування',
  'travel-itinerary':'Маршрут подорожі','trip-expense-settlement':'Звіт про витрати на подорож','personal-record-form':'Форма особистих даних',
  'payment-record-log':'Журнал обліку платежів','service-history-log':'Журнал історії обслуговування',
};

const expected = source.titles;
if (Object.keys(expected).length !== 119 || Object.keys(titles).length !== 119) throw new Error(`Expected exactly 119 title translations; source=${Object.keys(expected).length}, reviewed=${Object.keys(titles).length}.`);
for (const [key, value] of Object.entries(titles)) {
  if (!(key in expected) || !value.trim() || value === expected[key]) throw new Error(`Invalid reviewed title: ${key}`);
}
draft.titles = titles;
draft.reviewedCounts = { ...(draft.reviewedCounts ?? {}), titles: 119 };
draft.reviewStatus = '274/699 units reviewed and corrected (119 titles and 155 shared UI/document copy); unpublished';
fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log('Ukrainian titles reviewed: 119/119; 274/699 units reviewed in total, unpublished.');
