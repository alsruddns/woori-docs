import fs from 'node:fs';

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error('Usage: node scripts/review-bengali-fields.mjs <English-source.json>');
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const path = 'docs/i18n-drafts/bn.json';
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));
const fields = {
  Name:'নাম', Email:'ইমেইল ঠিকানা', Phone:'ফোন নম্বর', Location:'অবস্থান', 'Profile summary':'প্রোফাইলের সারাংশ',
  'Work experience':'কাজের অভিজ্ঞতা', Education:'শিক্ষা', Skills:'দক্ষতা', Experience:'অভিজ্ঞতা',
  'Professional summary':'পেশাগত সারাংশ', 'Work history':'কর্মজীবনের ইতিহাস', Achievements:'অর্জন', Company:'প্রতিষ্ঠান',
  Role:'পদ', Opening:'সূচনা', 'Relevant experience':'প্রাসঙ্গিক অভিজ্ঞতা', Closing:'সমাপ্তি', 'Checklist items':'চেকলিস্টের বিষয়',
  Notes:'নোট', 'Due date':'নির্ধারিত তারিখ', 'Interview date':'সাক্ষাৎকারের তারিখ', 'Quote number':'মূল্যপ্রস্তাব নম্বর', Date:'তারিখ',
  'Valid until':'মেয়াদ শেষের তারিখ', Provider:'সেবাদাতা', Customer:'গ্রাহক', Items:'আইটেম', Subtotal:'উপমোট', Tax:'কর',
  'Invoice number':'চালান নম্বর', 'Payment details':'পেমেন্টের বিবরণ', 'Receipt number':'রসিদ নম্বর', 'Received from':'যার কাছ থেকে পাওয়া',
  Description:'বিবরণ', Amount:'পরিমাণ', 'Received by':'যিনি গ্রহণ করেছেন', 'Order number':'অর্ডার নম্বর', Buyer:'ক্রেতা', Supplier:'সরবরাহকারী',
  'Delivery date':'ডেলিভারির তারিখ', 'Delivery number':'ডেলিভারি নম্বর', Sender:'প্রেরক', Recipient:'প্রাপক', 'Delivery address':'ডেলিভারির ঠিকানা',
  'Statement number':'বিবরণী নম্বর', Seller:'বিক্রেতা', Total:'মোট', Department:'বিভাগ', Period:'সময়কাল', Expenses:'ব্যয়',
  Approver:'অনুমোদনকারী', Traveler:'ভ্রমণকারী', Destination:'গন্তব্য', 'Trip dates':'ভ্রমণের তারিখ', Transportation:'যাতায়াত', Lodging:'আবাসন',
  Meals:'খাবার', 'Other expenses':'অন্যান্য ব্যয়', 'Meeting title':'সভার শিরোনাম', Attendees:'অংশগ্রহণকারী', Agenda:'আলোচ্যসূচি',
  Discussion:'আলোচনা', Decisions:'সিদ্ধান্ত', 'Action items':'করণীয় কাজ', 'Next meeting':'পরবর্তী সভা', 'Completed work':'সম্পন্ন কাজ',
  'In progress':'চলমান কাজ', Blockers:'বাধা', 'Next steps':'পরবর্তী পদক্ষেপ', Week:'সপ্তাহ', Highlights:'উল্লেখযোগ্য বিষয়',
  Challenges:'চ্যালেঞ্জ', 'Next week':'আগামী সপ্তাহ', Month:'মাস', Goals:'লক্ষ্য', Results:'ফলাফল', 'Key achievements':'প্রধান অর্জন',
  'Next month':'আগামী মাস', 'Project name':'প্রকল্পের নাম', Owner:'দায়িত্বপ্রাপ্ত ব্যক্তি', Objectives:'উদ্দেশ্য', Scope:'পরিধি',
  Milestones:'গুরুত্বপূর্ণ ধাপ', Resources:'সম্পদ', Risks:'ঝুঁকি', 'Success measures':'সাফল্য পরিমাপের মানদণ্ড', Priority:'অগ্রাধিকার',
  'Outgoing owner':'দায়িত্ব হস্তান্তরকারী', 'Incoming owner':'দায়িত্ব গ্রহণকারী', Responsibilities:'দায়িত্বসমূহ', 'Open tasks':'অসমাপ্ত কাজ',
  'Key contacts':'গুরুত্বপূর্ণ যোগাযোগ', 'Issue title':'সমস্যার শিরোনাম', Reporter:'প্রতিবেদনকারী', Impact:'প্রভাব',
  'Steps to reproduce':'সমস্যাটি পুনরায় ঘটানোর ধাপ', 'Expected result':'প্রত্যাশিত ফলাফল', 'Actual result':'প্রকৃত ফলাফল',
  Attachments:'সংযুক্তি', Parties:'পক্ষসমূহ', Subject:'বিষয়', Terms:'শর্তাবলি', Signatures:'স্বাক্ষর',
  'Confirmation details':'নিশ্চিতকরণের বিবরণ', Signature:'স্বাক্ষর', 'Person giving consent':'সম্মতিদানকারী ব্যক্তি', Purpose:'উদ্দেশ্য',
  Lender:'ঋণদাতা', Borrower:'ঋণগ্রহীতা', Principal:'মূল ঋণের পরিমাণ', 'Repayment plan':'ঋণ পরিশোধের পরিকল্পনা', Interest:'সুদ',
  Item:'বস্তু', Condition:'অবস্থা', 'Lending date':'ধার দেওয়ার তারিখ', 'Return date':'ফেরত দেওয়ার তারিখ', 'Target date':'লক্ষ্য তারিখ',
  'Departure date':'যাত্রার তারিখ', 'Move-in date':'বাসায় ওঠার তারিখ', Room:'কক্ষ', Vehicle:'যানবাহন', 'Inspection date':'পরিদর্শনের তারিখ',
  'Move-out date':'বাসা ছাড়ার তারিখ', 'Review date':'পর্যালোচনার তারিখ', 'Household notes':'পরিবারসংক্রান্ত নোট', 'Top priorities':'প্রধান অগ্রাধিকার',
  Schedule:'সময়সূচি', Tasks:'কাজ', 'Week of':'যে সপ্তাহ থেকে', 'Weekly goals':'সাপ্তাহিক লক্ষ্য', Monday:'সোমবার', Tuesday:'মঙ্গলবার',
  Wednesday:'বুধবার', Thursday:'বৃহস্পতিবার', Friday:'শুক্রবার', Weekend:'সাপ্তাহিক ছুটি', 'Important dates':'গুরুত্বপূর্ণ তারিখ',
  'Study goal':'পড়াশোনার লক্ষ্য', 'Start date':'শুরুর তারিখ', 'Study sessions':'পড়াশোনার সেশন', 'Review notes':'পর্যালোচনার নোট',
  'Travel dates':'ভ্রমণের তারিখসমূহ', Travelers:'ভ্রমণকারীরা', Itinerary:'ভ্রমণসূচি', Reservations:'বুকিংসমূহ', Project:'প্রকল্প',
  Owners:'দায়িত্বপ্রাপ্ত ব্যক্তিরা', Dependencies:'নির্ভরশীলতা', Event:'অনুষ্ঠান', 'Event date':'অনুষ্ঠানের তারিখ', Income:'আয়',
  Housing:'বাসস্থান', Food:'খাবার', Transport:'যাতায়াত', Utilities:'বিদ্যুৎ, পানি ও গ্যাসের বিল', Savings:'সঞ্চয়',
  'Household income':'পরিবারের আয়', Health:'স্বাস্থ্য', Other:'অন্যান্য', Activities:'কার্যক্রম', Venue:'অনুষ্ঠানের স্থান',
  Attire:'পোশাক', Photography:'ছবি তোলা', Flowers:'ফুল', People:'মানুষ', Tools:'সরঞ্জাম', Services:'সেবা',
  Contingency:'অনিশ্চিত ব্যয়ের জন্য সংরক্ষিত অর্থ', Goal:'লক্ষ্য', 'Target amount':'লক্ষ্য পরিমাণ', 'Current savings':'বর্তমান সঞ্চয়',
  'Monthly contribution':'মাসিক জমা', Deliverables:'জমা দেওয়ার উপকরণ', Payment:'পেমেন্ট', Term:'চুক্তির মেয়াদ', Client:'ক্লায়েন্ট',
  Freelancer:'ফ্রিল্যান্সার', Fee:'সেবার পারিশ্রমিক', Revisions:'সংশোধন', Service:'সেবা', 'Confidential information':'গোপনীয় তথ্য',
  Exclusions:'বর্জিত বিষয়', Payer:'অর্থদাতা', Payee:'অর্থগ্রহীতা', 'Payment date':'পেমেন্টের তারিখ', 'Payment method':'পেমেন্টের পদ্ধতি',
  Reference:'তথ্যসূত্র', Organization:'প্রতিষ্ঠান', 'Employment status':'চাকরির অবস্থা', 'Issue date':'ইস্যুর তারিখ', Issuer:'ইস্যুকারী',
  ' Packed':'প্যাক করা হয়েছে', 'Acceptance criteria':'গ্রহণের মানদণ্ড', Accommodation:'আবাসন', Account:'হিসাব', 'Account details':'হিসাবের বিবরণ',
  'Action item':'করণীয় কাজ', Activity:'কার্যক্রম', Address:'ঠিকানা', 'Approval status':'অনুমোদনের অবস্থা', 'Assigned to':'যাকে দায়িত্ব দেওয়া হয়েছে',
  Assignment:'নির্ধারিত কাজ', Attachment:'সংযুক্তি', Author:'লেখক', 'Backup verified':'ব্যাকআপ যাচাই করা হয়েছে', 'Bank account':'ব্যাংক হিসাব',
  Bedtime:'ঘুমানোর সময়', Body:'মূল লেখা', 'Body fat percentage':'শরীরের চর্বির শতাংশ', 'Book title':'বইয়ের শিরোনাম', 'Break duration':'বিরতির সময়কাল',
  'Budget code':'বাজেট কোড', 'Bug fixes':'বাগ সংশোধন', 'Bug title':'বাগের শিরোনাম', 'Business purpose':'ব্যবসায়িক উদ্দেশ্য',
  'CPU usage':'CPU ব্যবহার', 'Call date':'ফোন করার তারিখ', 'Call purpose':'ফোন করার উদ্দেশ্য', Calls:'ফোনকল', Calories:'ক্যালরি',
  Candidate:'প্রার্থী', Cardholder:'কার্ডধারী', 'Cash paid':'পরিশোধিত নগদ অর্থ', 'Cash received':'প্রাপ্ত নগদ অর্থ', Category:'বিভাগ',
  'Change description':'পরিবর্তনের বিবরণ', Channel:'যোগাযোগের মাধ্যম', 'Class date':'ক্লাসের তারিখ', 'Clock-in time':'কাজে যোগ দেওয়ার সময়',
  'Clock-out time':'কাজ শেষের সময়', 'Closing balance':'সমাপনী ব্যালেন্স', Communication:'যোগাযোগ', 'Complaint date':'অভিযোগের তারিখ',
  Concerns:'উদ্বেগের বিষয়', Contact:'যোগাযোগ', 'Contact method':'যোগাযোগের পদ্ধতি', 'Contact person':'যোগাযোগের ব্যক্তি', Context:'প্রেক্ষাপট',
  Cost:'খরচ', 'Cost center':'খরচের কেন্দ্র', 'Count date':'গণনার তারিখ', 'Counted quantity':'গণনা করা পরিমাণ', Counter:'গণনাকারী',
  Course:'কোর্স', 'Created date':'তৈরির তারিখ', Currency:'মুদ্রা', 'Customer visits':'গ্রাহক পরিদর্শন', 'Deals closed':'সম্পন্ন বিক্রয়চুক্তি',
  Decision:'সিদ্ধান্ত', 'Decision date':'সিদ্ধান্তের তারিখ', 'Decision title':'সিদ্ধান্তের শিরোনাম', Details:'বিস্তারিত',
  'Detection time':'শনাক্তের সময়', 'Development areas':'উন্নয়নের ক্ষেত্র', 'Discussion points':'আলোচনার বিষয়', 'Disk usage':'ডিস্ক ব্যবহার',
  Distance:'দূরত্ব', 'Document number':'নথি নম্বর', Driver:'চালক', Duration:'সময়কাল', Effort:'প্রচেষ্টা', Employee:'কর্মী',
  'Employee ID':'কর্মী পরিচিতি নম্বর', 'End date':'শেষের তারিখ', 'End time':'শেষের সময়', 'Energy level':'শক্তির মাত্রা',
  Environment:'পরিবেশ', Equipment:'সরঞ্জাম', 'Estimated budget':'আনুমানিক বাজেট', 'Estimated cost':'আনুমানিক খরচ',
  'Estimated time':'আনুমানিক সময়', 'Exam date':'পরীক্ষার তারিখ', Exercise:'ব্যায়াম', 'Expected delivery':'প্রত্যাশিত ডেলিভারির তারিখ',
  Expense:'ব্যয়', 'Expense category':'ব্যয়ের বিভাগ', 'Expense date':'ব্যয়ের তারিখ', 'Expense items':'ব্যয়ের খাত',
  'Favorite quote':'প্রিয় উদ্ধৃতি', Feature:'বৈশিষ্ট্য', 'File location':'ফাইলের অবস্থান', 'Finish date':'শেষ করার তারিখ',
  'Follow-up actions':'পরবর্তী করণীয়', 'Follow-up date':'পরবর্তী যোগাযোগের তারিখ', 'Follow-up tasks':'পরবর্তী কাজ',
  'Goal weight':'লক্ষ্য ওজন', Grade:'গ্রেড', Improvements:'উন্নতির ক্ষেত্র', 'Incident date':'ঘটনার তারিখ', 'Incident title':'ঘটনার শিরোনাম',
  'Inquiry ID':'জিজ্ঞাসার পরিচিতি নম্বর', 'Inquiry date':'জিজ্ঞাসার তারিখ', 'Inquiry details':'জিজ্ঞাসার বিবরণ', Instructor:'প্রশিক্ষক',
  Interviewer:'সাক্ষাৎকারগ্রহীতা', 'Issue details':'সমস্যার বিবরণ', 'Issue number':'সমস্যা নম্বর', 'Issued date':'ইস্যুর তারিখ',
  'Key concepts':'মূল ধারণা', 'Known issues':'পরিচিত সমস্যা', 'Leave type':'ছুটির ধরন', 'Lessons learned':'শিক্ষণীয় বিষয়',
  Manager:'ব্যবস্থাপক', 'Meal date':'খাবারের তারিখ', 'Meal time':'খাবারের সময়', 'Meal type':'খাবারের ধরন',
  'Measurement time':'পরিমাপের সময়', 'Meeting date':'সভার তারিখ', 'Meeting purpose':'সভার উদ্দেশ্য', Meetings:'সভাসমূহ',
  'Memory usage':'মেমোরি ব্যবহার', Merchant:'বিক্রেতা প্রতিষ্ঠান', Mitigation:'ঝুঁকি কমানোর ব্যবস্থা', 'New features':'নতুন বৈশিষ্ট্য',
  'Next action':'পরবর্তী পদক্ষেপ', 'Next service date':'পরবর্তী সেবার তারিখ', 'Odometer end':'শেষের ওডোমিটার রিডিং',
  'Odometer start':'শুরুর ওডোমিটার রিডিং', 'Opening balance':'প্রারম্ভিক ব্যালেন্স', 'Options considered':'বিবেচিত বিকল্পসমূহ',
  'Order date':'অর্ডারের তারিখ', Outcome:'ফলাফল', Outcomes:'ফলাফলসমূহ', Pages:'পৃষ্ঠা', Participants:'অংশগ্রহণকারীরা',
  'Payment purpose':'পেমেন্টের উদ্দেশ্য', Portion:'পরিমাণ', Position:'পদ', Preconditions:'পূর্বশর্ত', 'Prepared by':'প্রস্তুত করেছেন',
  Probability:'সম্ভাবনা', 'Product or service':'পণ্য বা সেবা', Progress:'অগ্রগতি', 'Proposals sent':'পাঠানো প্রস্তাব',
  'Pull request':'কোডে পরিবর্তন যুক্ত করার অনুরোধ', Quantity:'পরিমাণ', Questions:'প্রশ্ন', Rating:'মূল্যায়ন', Reason:'কারণ',
  'Receipt attached':'রসিদ সংযুক্ত করা হয়েছে', 'Receipt type':'রসিদের ধরন', 'Received date':'গ্রহণের তারিখ', Receiver:'গ্রহীতা',
  Recommendation:'সুপারিশ', 'Record date':'রেকর্ডের তারিখ', 'Record title':'রেকর্ডের শিরোনাম', 'Reference number':'রেফারেন্স নম্বর',
  Release:'প্রকাশনা', 'Release date':'প্রকাশের তারিখ', 'Release version':'প্রকাশিত সংস্করণ', Repetitions:'পুনরাবৃত্তি',
  'Report date':'প্রতিবেদনের তারিখ', 'Report period':'প্রতিবেদনের সময়কাল', 'Request date':'অনুরোধের তারিখ', 'Request title':'অনুরোধের শিরোনাম',
  'Requested team':'অনুরোধ করা দল', Requester:'অনুরোধকারী', 'Requirement ID':'প্রয়োজনীয়তার পরিচিতি নম্বর',
  'Requirement title':'প্রয়োজনীয়তার শিরোনাম', Requirements:'প্রয়োজনীয়তাসমূহ', 'Reservation number':'বুকিং নম্বর',
  Resolution:'সমাধান', 'Resolution time':'সমাধানে লাগা সময়', 'Resolved date':'সমাধানের তারিখ', Revenue:'রাজস্ব',
  'Review period':'পর্যালোচনার সময়কাল', Reviewer:'পর্যালোচক', 'Risk title':'ঝুঁকির শিরোনাম', 'Role fit':'পদের সঙ্গে সামঞ্জস্য',
  'Rollback plan':'পরিবর্তন ফিরিয়ে নেওয়ার পরিকল্পনা', 'Root cause':'মূল কারণ', 'Running balance':'চলতি ব্যালেন্স',
  SKU:'SKU কোড', Salesperson:'বিক্রয় প্রতিনিধি', Scenario:'পরিস্থিতি', 'Security checked':'নিরাপত্তা যাচাই করা হয়েছে',
  'Security status':'নিরাপত্তার অবস্থা', Server:'সার্ভার', 'Service date':'সেবা দেওয়ার তারিখ', Sets:'সেট',
  'Settlement period':'নিষ্পত্তির সময়কাল', Severity:'গুরুত্বের মাত্রা', 'Sleep duration':'ঘুমের সময়কাল', 'Sleep quality':'ঘুমের মান',
  Sprint:'স্প্রিন্ট', 'Start location':'শুরুর স্থান', 'Start time':'শুরুর সময়', Status:'অবস্থা', 'Storage location':'সংরক্ষণের স্থান',
  Strengths:'শক্তির দিক', 'Study date':'পড়াশোনার তারিখ', 'Study duration':'পড়াশোনার সময়কাল', 'Study topic':'পড়াশোনার বিষয়',
  'Submission date':'জমা দেওয়ার তারিখ', Summary:'সারাংশ', 'System quantity':'সিস্টেমে থাকা পরিমাণ', 'Tax rate':'করের হার', Team:'দল',
  'Test case ID':'টেস্ট কেসের পরিচিতি নম্বর', 'Test date':'পরীক্ষার তারিখ', 'Test steps':'পরীক্ষার ধাপ', Tester:'পরীক্ষক',
  'Tests passed':'উত্তীর্ণ পরীক্ষার সংখ্যা', Topic:'বিষয়', 'Training goals':'প্রশিক্ষণের লক্ষ্য', 'Training title':'প্রশিক্ষণের শিরোনাম',
  'Transaction date':'লেনদেনের তারিখ', 'Transaction type':'লেনদেনের ধরন', 'Travel date':'ভ্রমণের তারিখ', Trip:'ভ্রমণ',
  'Trip date':'ভ্রমণের তারিখ', 'Trip purpose':'ভ্রমণের উদ্দেশ্য', 'Unit price':'একক মূল্য', VAT:'ভ্যাট', Variance:'পার্থক্য',
  Vendor:'বিক্রেতা', 'Wake time':'ঘুম থেকে ওঠার সময়', 'Water intake':'পান করা পানির পরিমাণ', Weight:'ওজন',
  'What could improve':'কোন বিষয় উন্নত করা যায়', 'What went well':'কোন বিষয় ভালো হয়েছে', 'Work date':'কাজের তারিখ',
  'Work hours':'কাজের সময়', Workload:'কাজের চাপ', 'Workout date':'ব্যায়ামের তারিখ',
};
const expected = source.fields;
if (Object.keys(expected).length !== 425 || Object.keys(fields).length !== 425) {
  const missing = Object.keys(expected).filter((label) => !(label in fields));
  const extra = Object.keys(fields).filter((label) => !(label in expected));
  throw new Error(`Bengali field map must contain exactly 425 source keys; got ${Object.keys(fields).length}. Missing=${missing.join('; ')} Extra=${extra.join('; ')}`);
}
const invalid = Object.entries(fields).filter(([label, value]) => !value.trim() || value.trim() === expected[label].trim()).map(([label]) => label);
if (invalid.length) throw new Error(`Untranslated/empty Bengali fields: ${invalid.join(', ')}`);
draft.fields = fields;
draft.fieldsTranslated = 425;
draft.fieldsTotal = 425;
delete draft.failures;
draft.reviewedCounts.fields = 425;
draft.reviewStatus = '544/699 units editorially reviewed (all document titles and field labels); unpublished';
draft.source = 'Offline machine draft with editorially reviewed Bengali titles and field labels';
fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log(`Bengali field labels reviewed: ${Object.keys(fields).length}/425; ${Object.values(draft.reviewedCounts).reduce((sum, value) => sum + value, 0)}/699 units reviewed.`);
