import fs from 'node:fs';

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error('Usage: node scripts/review-filipino-fields.mjs <English-source.json>');
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const path = 'docs/i18n-drafts/fil.json';
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));
const fields = {
  Name:'Pangalan', Email:'Email address', Phone:'Numero ng telepono', Location:'Lokasyon',
  'Profile summary':'Buod ng profile', 'Work experience':'Karanasan sa trabaho', Education:'Edukasyon', Skills:'Mga kasanayan',
  Experience:'Karanasan', 'Professional summary':'Buod ng mga kwalipikasyon', 'Work history':'Kasaysayan ng trabaho', Achievements:'Mga nagawa',
  Company:'Kumpanya', Role:'Posisyon', Opening:'Panimula', 'Relevant experience':'Kaugnay na karanasan', Closing:'Pangwakas',
  'Checklist items':'Mga item sa checklist', Notes:'Mga tala', 'Due date':'Takdang petsa', 'Interview date':'Petsa ng panayam',
  'Quote number':'Numero ng pagtataya', Date:'Petsa', 'Valid until':'May bisa hanggang', Provider:'Tagapagbigay', Customer:'Kliyente',
  Items:'Mga item', Subtotal:'Bahagyang kabuuan', Tax:'Buwis', 'Invoice number':'Numero ng invoice', 'Payment details':'Mga detalye ng bayad',
  'Receipt number':'Numero ng resibo', 'Received from':'Natanggap mula kay', Description:'Paglalarawan', Amount:'Halaga', 'Received by':'Tinanggap ni',
  'Order number':'Numero ng order', Buyer:'Mamimili', Supplier:'Tagapagtustos', 'Delivery date':'Petsa ng paghahatid',
  'Delivery number':'Numero ng paghahatid', Sender:'Nagpadala', Recipient:'Tatanggap', 'Delivery address':'Address ng paghahatid',
  'Statement number':'Numero ng pahayag', Seller:'Nagbebenta', Total:'Kabuuan', Department:'Kagawaran', Period:'Panahon', Expenses:'Mga gastos',
  Approver:'Tagapag-apruba', Traveler:'Manlalakbay', Destination:'Destinasyon', 'Trip dates':'Mga petsa ng biyahe',
  Transportation:'Transportasyon', Lodging:'Matutuluyan', Meals:'Mga pagkain', 'Other expenses':'Iba pang mga gastos',
  'Meeting title':'Pamagat ng pulong', Attendees:'Mga dadalo', Agenda:'Adyenda', Discussion:'Talakayan', Decisions:'Mga desisyon',
  'Action items':'Mga hakbang na gagawin', 'Next meeting':'Susunod na pulong', 'Completed work':'Natapos na trabaho', 'In progress':'Kasalukuyang ginagawa',
  Blockers:'Mga hadlang', 'Next steps':'Mga susunod na hakbang', Week:'Linggo', Highlights:'Mga pangunahing nagawa', Challenges:'Mga hamon',
  'Next week':'Susunod na linggo', Month:'Buwan', Goals:'Mga layunin', Results:'Mga resulta', 'Key achievements':'Mahahalagang nagawa',
  'Next month':'Susunod na buwan', 'Project name':'Pangalan ng proyekto', Owner:'Responsable', Objectives:'Mga layunin', Scope:'Saklaw',
  Milestones:'Mahahalagang yugto', Resources:'Mga mapagkukunan', Risks:'Mga panganib', 'Success measures':'Mga panukat ng tagumpay', Priority:'Prayoridad',
  'Outgoing owner':'Nagpapasa ng responsibilidad', 'Incoming owner':'Tumatanggap ng responsibilidad', Responsibilities:'Mga responsibilidad',
  'Open tasks':'Mga hindi pa tapos na gawain', 'Key contacts':'Mahahalagang contact', 'Issue title':'Pamagat ng problema', Reporter:'Nag-ulat',
  Impact:'Epekto', 'Steps to reproduce':'Mga hakbang para maulit ang problema', 'Expected result':'Inaasahang resulta', 'Actual result':'Aktuwal na resulta',
  Attachments:'Mga kalakip', Parties:'Mga panig', Subject:'Paksa', Terms:'Mga tuntunin', Signatures:'Mga lagda',
  'Confirmation details':'Mga detalye ng kumpirmasyon', Signature:'Lagda', 'Person giving consent':'Taong nagbibigay ng pahintulot', Purpose:'Layunin',
  Lender:'Nagpapautang', Borrower:'Nanghihiram', Principal:'Pangunahing halaga', 'Repayment plan':'Plano ng pagbabayad', Interest:'Interes',
  Item:'Bagay', Condition:'Kondisyon', 'Lending date':'Petsa ng pagpapahiram', 'Return date':'Petsa ng pagsasauli', 'Target date':'Target na petsa',
  'Departure date':'Petsa ng pag-alis', 'Move-in date':'Petsa ng paglipat sa tirahan', Room:'Silid', Vehicle:'Sasakyan',
  'Inspection date':'Petsa ng inspeksyon', 'Move-out date':'Petsa ng pag-alis sa tirahan', 'Review date':'Petsa ng pagsusuri',
  'Household notes':'Mga tala tungkol sa sambahayan', 'Top priorities':'Mga pangunahing prayoridad', Schedule:'Iskedyul', Tasks:'Mga gawain',
  'Week of':'Linggo simula', 'Weekly goals':'Mga layunin para sa linggo', Monday:'Lunes', Tuesday:'Martes', Wednesday:'Miyerkules', Thursday:'Huwebes',
  Friday:'Biyernes', Weekend:'Katapusan ng linggo', 'Important dates':'Mahahalagang petsa', 'Study goal':'Layunin sa pag-aaral',
  'Start date':'Petsa ng pagsisimula', 'Study sessions':'Mga sesyon ng pag-aaral', 'Review notes':'Mga tala sa pagsusuri',
  'Travel dates':'Mga petsa ng paglalakbay', Travelers:'Mga manlalakbay', Itinerary:'Itineraryo', Reservations:'Mga reserbasyon',
  Project:'Proyekto', Owners:'Mga responsable', Dependencies:'Mga kinakailangan', Event:'Kaganapan', 'Event date':'Petsa ng kaganapan',
  Income:'Kita', Housing:'Pabahay', Food:'Pagkain', Transport:'Transportasyon', Utilities:'Mga bayarin sa tubig at kuryente', Savings:'Ipon',
  'Household income':'Kita ng sambahayan', Health:'Kalusugan', Other:'Iba pa', Activities:'Mga aktibidad', Venue:'Lugar ng kaganapan',
  Attire:'Kasuotan', Photography:'Potograpiya', Flowers:'Mga bulaklak', People:'Mga tao', Tools:'Mga kagamitan', Services:'Mga serbisyo',
  Contingency:'Pondong nakalaan para sa hindi inaasahang gastos', Goal:'Layunin', 'Target amount':'Target na halaga',
  'Current savings':'Kasalukuyang ipon', 'Monthly contribution':'Buwanang hulog', Deliverables:'Mga output na ihahatid', Payment:'Bayad',
  Term:'Tagal ng bisa', Client:'Kliyente', Freelancer:'Taong nagtatrabaho bilang freelancer', Fee:'Bayad sa serbisyo', Revisions:'Mga rebisyon', Service:'Serbisyo',
  'Confidential information':'Kumpidensiyal na impormasyon', Exclusions:'Mga hindi saklaw', Payer:'Nagbabayad', Payee:'Tumatanggap ng bayad',
  'Payment date':'Petsa ng pagbabayad', 'Payment method':'Paraan ng pagbabayad', Reference:'Sanggunian', Organization:'Organisasyon',
  'Employment status':'Katayuan sa trabaho', 'Issue date':'Petsa ng pag-isyu', Issuer:'Nag-isyu', ' Packed':'Nakaimpake',
  'Acceptance criteria':'Mga pamantayan sa pagtanggap', Accommodation:'Matutuluyan', Account:'Account number o pangalan', 'Account details':'Mga detalye ng account',
  'Action item':'Hakbang na gagawin', Activity:'Aktibidad', Address:'Tirahan', 'Approval status':'Katayuan ng pag-apruba', 'Assigned to':'Itinalaga kay',
  Assignment:'Takdang gawain', Attachment:'Kalakip', Author:'May-akda', 'Backup verified':'Nakumpirma ang backup', 'Bank account':'Account sa bangko',
  Bedtime:'Oras ng pagtulog', Body:'Nilalaman', 'Body fat percentage':'Porsiyento ng taba sa katawan', 'Book title':'Pamagat ng aklat',
  'Break duration':'Tagal ng pahinga', 'Budget code':'Code ng badyet', 'Bug fixes':'Mga inayos na bug', 'Bug title':'Pamagat ng bug',
  'Business purpose':'Layunin ng negosyo', 'CPU usage':'Paggamit ng CPU', 'Call date':'Petsa ng tawag', 'Call purpose':'Layunin ng tawag',
  Calls:'Mga tawag', Calories:'Mga calorie', Candidate:'Kandidato', Cardholder:'May-ari ng card', 'Cash paid':'Ibinayad na pera',
  'Cash received':'Natanggap na pera', Category:'Kategorya', 'Change description':'Paglalarawan ng pagbabago', Channel:'Daluyan ng komunikasyon',
  'Class date':'Petsa ng klase', 'Clock-in time':'Oras ng pagpasok sa trabaho', 'Clock-out time':'Oras ng pag-uwi sa trabaho',
  'Closing balance':'Pangwakas na balanse', Communication:'Komunikasyon', 'Complaint date':'Petsa ng reklamo', Concerns:'Mga alalahanin',
  Contact:'Pakikipag-ugnayan', 'Contact method':'Paraan ng pakikipag-ugnayan', 'Contact person':'Taong maaaring kontakin', Context:'Konteksto',
  Cost:'Gastos', 'Cost center':'Sentro ng gastos', 'Count date':'Petsa ng pagbibilang', 'Counted quantity':'Binilang na dami', Counter:'Taong nagbilang',
  Course:'Kurso', 'Created date':'Petsa ng pagkakagawa', Currency:'Salapi', 'Customer visits':'Mga pagbisita sa customer',
  'Deals closed':'Mga naisarang deal', Decision:'Desisyon', 'Decision date':'Petsa ng desisyon', 'Decision title':'Pamagat ng desisyon',
  Details:'Mga detalye', 'Detection time':'Oras ng pagkakatuklas', 'Development areas':'Mga larangan para sa pag-unlad',
  'Discussion points':'Mga paksang tatalakayin', 'Disk usage':'Paggamit ng disk', Distance:'Distansya', 'Document number':'Numero ng dokumento',
  Driver:'Drayber', Duration:'Tagal', Effort:'Pagsisikap', Employee:'Empleyado', 'Employee ID':'ID ng empleyado', 'End date':'Petsa ng pagtatapos',
  'End time':'Oras ng pagtatapos', 'Energy level':'Antas ng enerhiya', Environment:'Kapaligiran', Equipment:'Kagamitan',
  'Estimated budget':'Tinatayang badyet', 'Estimated cost':'Tinatayang gastos', 'Estimated time':'Tinatayang tagal', 'Exam date':'Petsa ng pagsusulit',
  Exercise:'Ehersisyo', 'Expected delivery':'Inaasahang petsa ng paghahatid', Expense:'Gastos', 'Expense category':'Kategorya ng gastos',
  'Expense date':'Petsa ng gastos', 'Expense items':'Mga gastusin', 'Favorite quote':'Paboritong sipi', Feature:'Tampok',
  'File location':'Lokasyon ng file', 'Finish date':'Petsa ng pagkumpleto', 'Follow-up actions':'Mga susunod na hakbang',
  'Follow-up date':'Petsa ng follow-up', 'Follow-up tasks':'Mga susunod na gawain', 'Goal weight':'Target na timbang', Grade:'Marka',
  Improvements:'Mga dapat pagbutihin', 'Incident date':'Petsa ng insidente', 'Incident title':'Pamagat ng insidente', 'Inquiry ID':'ID ng pagtatanong',
  'Inquiry date':'Petsa ng pagtatanong', 'Inquiry details':'Mga detalye ng pagtatanong', Instructor:'Instruktor', Interviewer:'Tagapanayam',
  'Issue details':'Mga detalye ng problema', 'Issue number':'Numero ng problema', 'Issued date':'Petsa ng pag-isyu',
  'Key concepts':'Mahahalagang konsepto', 'Known issues':'Mga kilalang problema', 'Leave type':'Uri ng leave', 'Lessons learned':'Mga natutuhan',
  Manager:'Tagapamahala', 'Meal date':'Petsa ng pagkain', 'Meal time':'Oras ng pagkain', 'Meal type':'Uri ng pagkain',
  'Measurement time':'Oras ng pagsukat', 'Meeting date':'Petsa ng pulong', 'Meeting purpose':'Layunin ng pulong', Meetings:'Mga pulong',
  'Memory usage':'Paggamit ng memorya', Merchant:'Tindahang tumanggap ng bayad', Mitigation:'Pagbawas ng panganib', 'New features':'Mga bagong tampok',
  'Next action':'Susunod na hakbang', 'Next service date':'Petsa ng susunod na serbisyo', 'Odometer end':'Huling reading ng odometer',
  'Odometer start':'Unang reading ng odometer', 'Opening balance':'Panimulang balanse', 'Options considered':'Mga pinag-isipang opsyon',
  'Order date':'Petsa ng order', Outcome:'Kinalabasan', Outcomes:'Mga kinalabasan', Pages:'Mga pahina', Participants:'Mga kalahok',
  'Payment purpose':'Layunin ng pagbabayad', Portion:'Bahagi', Position:'Posisyon', Preconditions:'Mga paunang kondisyon', 'Prepared by':'Inihanda ni',
  Probability:'Probabilidad', 'Product or service':'Produkto o serbisyo', Progress:'Pag-usad', 'Proposals sent':'Mga ipinadalang panukala',
  'Pull request':'Kahilingan na isama ang mga pagbabago sa code', Quantity:'Dami', Questions:'Mga tanong', Rating:'Marka', Reason:'Dahilan', 'Receipt attached':'Nakalakip ang resibo',
  'Receipt type':'Uri ng resibo', 'Received date':'Petsa ng pagtanggap', Receiver:'Tumatanggap', Recommendation:'Rekomendasyon',
  'Record date':'Petsa ng pagtatala', 'Record title':'Pamagat ng tala', 'Reference number':'Numero ng sanggunian', Release:'Paglalabas ng bersyon',
  'Release date':'Petsa ng release', 'Release version':'Bersyon ng release', Repetitions:'Mga pag-uulit', 'Report date':'Petsa ng ulat',
  'Report period':'Panahon ng ulat', 'Request date':'Petsa ng kahilingan', 'Request title':'Pamagat ng kahilingan',
  'Requested team':'Koponan na hinihingan', Requester:'Humihiling', 'Requirement ID':'ID ng requirement', 'Requirement title':'Pamagat ng requirement',
  Requirements:'Mga requirement', 'Reservation number':'Numero ng reserbasyon', Resolution:'Solusyon', 'Resolution time':'Oras bago malutas',
  'Resolved date':'Petsa ng paglutas', Revenue:'Kita', 'Review period':'Panahon ng pagsusuri', Reviewer:'Tagasuri', 'Risk title':'Pamagat ng panganib',
  'Role fit':'Pagiging angkop sa posisyon', 'Rollback plan':'Plano ng pagbawi ng pagbabago', 'Root cause':'Pangunahing sanhi',
  'Running balance':'Kasalukuyang balanse', SKU:'Code ng SKU', Salesperson:'Kinatawan sa pagbebenta', Scenario:'Sitwasyon',
  'Security checked':'Nasuri ang seguridad', 'Security status':'Katayuan ng seguridad', Server:'Computer na server', 'Service date':'Petsa ng serbisyo',
  Sets:'Mga set', 'Settlement period':'Panahon ng settlement', Severity:'Antas ng tindi', 'Sleep duration':'Tagal ng pagtulog',
  'Sleep quality':'Kalidad ng pagtulog', Sprint:'Yugto ng sprint', 'Start location':'Lugar ng pagsisimula', 'Start time':'Oras ng pagsisimula',
  Status:'Katayuan', 'Storage location':'Lokasyon ng imbakan', Strengths:'Mga kalakasan', 'Study date':'Petsa ng pag-aaral',
  'Study duration':'Tagal ng pag-aaral', 'Study topic':'Paksa ng pag-aaral', 'Submission date':'Petsa ng pagsusumite', Summary:'Buod',
  'System quantity':'Dami ayon sa system', 'Tax rate':'Rate ng buwis', Team:'Koponan', 'Test case ID':'ID ng test case',
  'Test date':'Petsa ng pagsubok', 'Test steps':'Mga hakbang sa pagsubok', Tester:'Tagasubok', 'Tests passed':'Mga pumasa na pagsubok',
  Topic:'Paksa', 'Training goals':'Mga layunin sa pagsasanay', 'Training title':'Pamagat ng pagsasanay',
  'Transaction date':'Petsa ng transaksyon', 'Transaction type':'Uri ng transaksyon', 'Travel date':'Petsa ng paglalakbay', Trip:'Biyahe',
  'Trip date':'Petsa ng biyahe', 'Trip purpose':'Layunin ng biyahe', 'Unit price':'Presyo kada yunit', VAT:'Buwis sa VAT',
  Variance:'Pagkakaiba', Vendor:'Nagbebenta', 'Wake time':'Oras ng paggising', 'Water intake':'Dami ng nainom na tubig', Weight:'Timbang',
  'What could improve':'Ano ang maaaring pagbutihin', 'What went well':'Ano ang naging maayos', 'Work date':'Petsa ng trabaho',
  'Work hours':'Mga oras ng trabaho', Workload:'Dami ng trabaho', 'Workout date':'Petsa ng ehersisyo',
};
const expected = source.fields;
if (Object.keys(expected).length !== 425 || Object.keys(fields).length !== 425) {
  const missing = Object.keys(expected).filter((label) => !(label in fields));
  const extra = Object.keys(fields).filter((label) => !(label in expected));
  throw new Error(`Filipino field map must contain exactly 425 source keys; got ${Object.keys(fields).length}. Missing=${missing.join('; ')} Extra=${extra.join('; ')}`);
}
const invalid = Object.entries(fields).filter(([label, value]) => !value.trim() || value.trim() === expected[label].trim()).map(([label]) => label);
if (invalid.length) throw new Error(`Untranslated/empty Filipino fields: ${invalid.join(', ')}`);
draft.fields = fields;
draft.fieldsTranslated = 425;
draft.fieldsTotal = 425;
delete draft.failures;
draft.reviewedCounts.fields = 425;
draft.reviewStatus = '544/699 units editorially reviewed (all document titles and field labels); unpublished';
draft.source = 'Offline machine draft with editorially reviewed Filipino titles and field labels';
fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log(`Filipino field labels reviewed: ${Object.keys(fields).length}/425; ${Object.values(draft.reviewedCounts).reduce((sum, value) => sum + value, 0)}/699 units reviewed.`);
