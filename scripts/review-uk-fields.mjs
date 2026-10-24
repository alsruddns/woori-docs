import fs from 'node:fs';

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error('Usage: node scripts/review-uk-fields.mjs <English-source.json>');
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const path = 'docs/i18n-drafts/uk.json';
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));

const fields = {
  Name:'Ім’я', Email:'Електронна пошта', Phone:'Телефон', Location:'Місце проживання', 'Profile summary':'Короткий опис профілю',
  'Work experience':'Досвід роботи', Education:'Освіта', Skills:'Навички', Experience:'Досвід', 'Professional summary':'Професійний профіль',
  'Work history':'Історія роботи', Achievements:'Досягнення', Company:'Компанія', Role:'Посада', Opening:'Вступ',
  'Relevant experience':'Доречний досвід роботи', Closing:'Завершення', 'Checklist items':'Пункти списку', Notes:'Примітки', 'Due date':'Кінцевий термін',
  'Interview date':'Дата співбесіди', 'Quote number':'Номер комерційної пропозиції', Date:'Дата', 'Valid until':'Чинний до', Provider:'Постачальник послуг',
  Customer:'Клієнт', Items:'Товари', Subtotal:'Проміжний підсумок', Tax:'Податок', 'Invoice number':'Номер рахунку', 'Payment details':'Деталі оплати',
  'Receipt number':'Номер квитанції', 'Received from':'Отримано від', Description:'Опис', Amount:'Сума', 'Received by':'Отримав(ла)',
  'Order number':'Номер замовлення', Buyer:'Покупець', Supplier:'Постачальник', 'Delivery date':'Дата доставки', 'Delivery number':'Номер накладної',
  Sender:'Відправник', Recipient:'Одержувач', 'Delivery address':'Адреса доставки', 'Statement number':'Номер виписки', Seller:'Продавець', Total:'Разом',
  Department:'Відділ', Period:'Період', Expenses:'Витрати', Approver:'Особа, що затверджує', Traveler:'Мандрівник', Destination:'Місце призначення',
  'Trip dates':'Дати поїздки', Transportation:'Транспорт', Lodging:'Проживання', Meals:'Харчування', 'Other expenses':'Інші витрати',
  'Meeting title':'Назва зустрічі', Attendees:'Учасники', Agenda:'Порядок денний', Discussion:'Обговорення', Decisions:'Рішення', 'Action items':'Завдання',
  'Next meeting':'Наступна зустріч', 'Completed work':'Виконана робота', 'In progress':'У роботі', Blockers:'Перешкоди', 'Next steps':'Наступні кроки',
  Week:'Тиждень', Highlights:'Основні результати', Challenges:'Виклики', 'Next week':'Наступний тиждень', Month:'Місяць', Goals:'Цілі', Results:'Результати',
  'Key achievements':'Ключові досягнення', 'Next month':'Наступний місяць', 'Project name':'Назва проєкту', Owner:'Відповідальний', Objectives:'Завдання',
  Scope:'Обсяг робіт', Milestones:'Контрольні етапи', Resources:'Ресурси', Risks:'Ризики', 'Success measures':'Критерії успіху', Priority:'Пріоритет',
  'Outgoing owner':'Попередній відповідальний', 'Incoming owner':'Новий відповідальний', Responsibilities:'Обов’язки', 'Open tasks':'Незавершені завдання',
  'Key contacts':'Основні контакти', 'Issue title':'Назва проблеми', Reporter:'Автор повідомлення', Impact:'Вплив', 'Steps to reproduce':'Кроки для відтворення',
  'Expected result':'Очікуваний результат', 'Actual result':'Фактичний результат', Attachments:'Вкладення', Parties:'Сторони', Subject:'Тема', Terms:'Умови',
  Signatures:'Підписи', 'Confirmation details':'Деталі підтвердження', Signature:'Підпис', 'Person giving consent':'Особа, що надає згоду', Purpose:'Мета',
  Lender:'Позикодавець', Borrower:'Позичальник', Principal:'Основна сума', 'Repayment plan':'План погашення', Interest:'Відсоткова ставка', Item:'Предмет',
  Condition:'Стан', 'Lending date':'Дата передавання', 'Return date':'Дата повернення', 'Target date':'Цільова дата', 'Departure date':'Дата від’їзду',
  'Move-in date':'Дата заселення', Room:'Кімната', Vehicle:'Транспортний засіб', 'Inspection date':'Дата огляду', 'Move-out date':'Дата виїзду',
  'Review date':'Дата перевірки', 'Household notes':'Побутові примітки', 'Top priorities':'Головні пріоритети', Schedule:'Розклад', Tasks:'Завдання',
  'Week of':'Тиждень, що починається', 'Weekly goals':'Цілі на тиждень', Monday:'Понеділок', Tuesday:'Вівторок', Wednesday:'Середа', Thursday:'Четвер',
  Friday:'П’ятниця', Weekend:'Вихідні', 'Important dates':'Важливі дати', 'Study goal':'Навчальна мета', 'Start date':'Дата початку',
  'Study sessions':'Навчальні заняття', 'Review notes':'Примітки до повторення', 'Travel dates':'Дати подорожі', Travelers:'Мандрівники', Itinerary:'Маршрут',
  Reservations:'Бронювання', Project:'Проєкт', Owners:'Відповідальні', Dependencies:'Залежності', Event:'Захід', 'Event date':'Дата заходу',
  Income:'Дохід', Housing:'Житло', Food:'Харчування', Transport:'Транспорт', Utilities:'Комунальні послуги', Savings:'Заощадження',
  'Household income':'Дохід домогосподарства', Health:'Здоров’я', Other:'Інше', Activities:'Заходи', Venue:'Місце проведення', Attire:'Одяг',
  Photography:'Фотозйомка', Flowers:'Квіти', People:'Люди', Tools:'Інструменти', Services:'Послуги', Contingency:'Резерв на непередбачені витрати',
  Goal:'Мета', 'Target amount':'Цільова сума', 'Current savings':'Поточні заощадження', 'Monthly contribution':'Щомісячний внесок', Deliverables:'Результати роботи',
  Payment:'Оплата', Term:'Строк дії', Client:'Клієнт', Freelancer:'Фрилансер', Fee:'Оплата послуг', Revisions:'Правки', Service:'Послуга',
  'Confidential information':'Конфіденційна інформація', Exclusions:'Винятки', Payer:'Платник', Payee:'Отримувач платежу', 'Payment date':'Дата оплати',
  'Payment method':'Спосіб оплати', Reference:'Посилання', Organization:'Організація', 'Employment status':'Статус зайнятості', 'Issue date':'Дата видачі',
  Issuer:'Видавець', ' Packed':'Упаковано', 'Acceptance criteria':'Критерії приймання', Accommodation:'Проживання', Account:'Обліковий запис',
  'Account details':'Реквізити рахунку', 'Action item':'Завдання', Activity:'Діяльність', Address:'Адреса', 'Approval status':'Статус затвердження',
  'Assigned to':'Призначено', Assignment:'Завдання', Attachment:'Вкладення', Author:'Автор', 'Backup verified':'Резервну копію перевірено',
  'Bank account':'Банківський рахунок', Bedtime:'Час сну', Body:'Текст', 'Body fat percentage':'Відсоток жиру в організмі', 'Book title':'Назва книги',
  'Break duration':'Тривалість перерви', 'Budget code':'Код бюджету', 'Bug fixes':'Виправлення помилок', 'Bug title':'Назва помилки',
  'Business purpose':'Мета поїздки у справах', 'CPU usage':'Використання процесора', 'Call date':'Дата дзвінка', 'Call purpose':'Мета дзвінка', Calls:'Дзвінки',
  Calories:'Калорії', Candidate:'Кандидат', Cardholder:'Власник картки', 'Cash paid':'Виплачено готівкою', 'Cash received':'Отримано готівкою', Category:'Категорія',
  'Change description':'Опис зміни', Channel:'Канал', 'Class date':'Дата заняття', 'Clock-in time':'Час початку роботи', 'Clock-out time':'Час завершення роботи',
  'Closing balance':'Залишок на кінець періоду', Communication:'Спілкування', 'Complaint date':'Дата скарги', Concerns:'Проблемні питання', Contact:'Контакт',
  'Contact method':'Спосіб зв’язку', 'Contact person':'Контактна особа', Context:'Контекст', Cost:'Вартість', 'Cost center':'Центр витрат', 'Count date':'Дата підрахунку',
  'Counted quantity':'Підрахована кількість', Counter:'Лічильник', Course:'Курс', 'Created date':'Дата створення', Currency:'Валюта',
  'Customer visits':'Візити до клієнтів', 'Deals closed':'Укладені угоди', Decision:'Рішення', 'Decision date':'Дата рішення', 'Decision title':'Назва рішення',
  Details:'Деталі', 'Detection time':'Час виявлення', 'Development areas':'Напрями розвитку', 'Discussion points':'Питання для обговорення',
  'Disk usage':'Використання диска', Distance:'Відстань', 'Document number':'Номер документа', Driver:'Водій', Duration:'Тривалість', Effort:'Зусилля',
  Employee:'Працівник', 'Employee ID':'Ідентифікатор працівника', 'End date':'Дата завершення', 'End time':'Час завершення', 'Energy level':'Рівень енергії',
  Environment:'Середовище', Equipment:'Обладнання', 'Estimated budget':'Орієнтовний бюджет', 'Estimated cost':'Орієнтовна вартість', 'Estimated time':'Орієнтовний час',
  'Exam date':'Дата іспиту', Exercise:'Вправа', 'Expected delivery':'Очікувана дата доставки', Expense:'Витрата', 'Expense category':'Категорія витрат',
  'Expense date':'Дата витрати', 'Expense items':'Статті витрат', 'Favorite quote':'Улюблена цитата', Feature:'Функція', 'File location':'Розташування файлу',
  'Finish date':'Дата завершення', 'Follow-up actions':'Подальші дії', 'Follow-up date':'Дата наступного контакту', 'Follow-up tasks':'Подальші завдання',
  'Goal weight':'Цільова вага', Grade:'Оцінка', Improvements:'Покращення', 'Incident date':'Дата інциденту', 'Incident title':'Назва інциденту',
  'Inquiry ID':'Ідентифікатор запиту', 'Inquiry date':'Дата запиту', 'Inquiry details':'Деталі запиту', Instructor:'Викладач', Interviewer:'Інтерв’юер',
  'Issue details':'Деталі проблеми', 'Issue number':'Номер проблеми', 'Issued date':'Дата видачі', 'Key concepts':'Ключові поняття', 'Known issues':'Відомі проблеми',
  'Leave type':'Тип відпустки', 'Lessons learned':'Засвоєні уроки', Manager:'Керівник', 'Meal date':'Дата прийому їжі', 'Meal time':'Час прийому їжі',
  'Meal type':'Тип прийому їжі', 'Measurement time':'Час вимірювання', 'Meeting date':'Дата зустрічі', 'Meeting purpose':'Мета зустрічі', Meetings:'Зустрічі',
  'Memory usage':'Використання пам’яті', Merchant:'Продавець', Mitigation:'Заходи зі зменшення ризику', 'New features':'Нові функції', 'Next action':'Наступна дія',
  'Next service date':'Дата наступного обслуговування', 'Odometer end':'Показник одометра наприкінці', 'Odometer start':'Початковий показник одометра',
  'Opening balance':'Початковий залишок', 'Options considered':'Розглянуті варіанти', 'Order date':'Дата замовлення', Outcome:'Підсумок', Outcomes:'Результати',
  Pages:'Сторінки', Participants:'Учасники', 'Payment purpose':'Призначення платежу', Portion:'Порція', Position:'Посада', Preconditions:'Попередні умови',
  'Prepared by':'Підготував(ла)', Probability:'Ймовірність', 'Product or service':'Товар або послуга', Progress:'Поступ', 'Proposals sent':'Надіслані пропозиції',
  'Pull request':'Запит на злиття змін', Quantity:'Кількість', Questions:'Запитання', Rating:'Оцінка', Reason:'Причина', 'Receipt attached':'Квитанцію додано',
  'Receipt type':'Тип квитанції', 'Received date':'Дата отримання', Receiver:'Одержувач', Recommendation:'Рекомендація', 'Record date':'Дата запису',
  'Record title':'Назва запису', 'Reference number':'Довідковий номер', Release:'Випуск', 'Release date':'Дата випуску', 'Release version':'Версія випуску',
  Repetitions:'Повторення', 'Report date':'Дата звіту', 'Report period':'Звітний період', 'Request date':'Дата запиту', 'Request title':'Назва запиту',
  'Requested team':'Команда, до якої подано запит', Requester:'Автор запиту', 'Requirement ID':'Ідентифікатор вимоги', 'Requirement title':'Назва вимоги',
  Requirements:'Вимоги', 'Reservation number':'Номер бронювання', Resolution:'Вирішення', 'Resolution time':'Час вирішення', 'Resolved date':'Дата вирішення',
  Revenue:'Дохід', 'Review period':'Період оцінювання', Reviewer:'Перевіряльник', 'Risk title':'Назва ризику', 'Role fit':'Відповідність посаді',
  'Rollback plan':'План відкату', 'Root cause':'Першопричина', 'Running balance':'Поточний залишок', SKU:'Артикул товару', Salesperson:'Продавець',
  Scenario:'Сценарій', 'Security checked':'Перевірку безпеки пройдено', 'Security status':'Статус безпеки', Server:'Сервер', 'Service date':'Дата обслуговування',
  Sets:'Підходи', 'Settlement period':'Розрахунковий період', Severity:'Рівень серйозності', 'Sleep duration':'Тривалість сну', 'Sleep quality':'Якість сну',
  Sprint:'Спринт', 'Start location':'Місце початку', 'Start time':'Час початку', Status:'Статус', 'Storage location':'Місце зберігання', Strengths:'Сильні сторони',
  'Study date':'Дата навчання', 'Study duration':'Тривалість навчання', 'Study topic':'Тема навчання', 'Submission date':'Дата подання', Summary:'Підсумок',
  'System quantity':'Кількість за системою', 'Tax rate':'Податкова ставка', Team:'Команда', 'Test case ID':'Ідентифікатор тестового сценарію', 'Test date':'Дата тестування',
  'Test steps':'Кроки тестування', Tester:'Тестувальник', 'Tests passed':'Успішно пройдені тести', Topic:'Тема', 'Training goals':'Цілі навчання',
  'Training title':'Назва навчання', 'Transaction date':'Дата операції', 'Transaction type':'Тип операції', 'Travel date':'Дата подорожі', Trip:'Поїздка',
  'Trip date':'Дата поїздки', 'Trip purpose':'Мета поїздки', 'Unit price':'Ціна за одиницю', VAT:'ПДВ', Variance:'Відхилення', Vendor:'Постачальник',
  'Wake time':'Час пробудження', 'Water intake':'Кількість випитої води', Weight:'Вага', 'What could improve':'Що можна покращити', 'What went well':'Що вдалося',
  'Work date':'Дата роботи', 'Work hours':'Робочі години', Workload:'Робоче навантаження', 'Workout date':'Дата тренування',
};

if (Object.keys(source.fields).length !== 425 || Object.keys(fields).length !== 425) throw new Error(`Expected exactly 425 field translations; source=${Object.keys(source.fields).length}, reviewed=${Object.keys(fields).length}.`);
for (const [key, value] of Object.entries(fields)) {
  if (!(key in source.fields) || !value.trim() || value === source.fields[key]) throw new Error(`Invalid reviewed field: ${key}`);
}
draft.fields = fields;
draft.reviewedCounts = { ...(draft.reviewedCounts ?? {}), fields: 425 };
draft.reviewStatus = 'editorial translation review complete (699/699 units); unpublished pending route, runtime, SEO and production verification';
fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log('Ukrainian field labels reviewed: 425/425; all 699 translation units reviewed, still unpublished.');
