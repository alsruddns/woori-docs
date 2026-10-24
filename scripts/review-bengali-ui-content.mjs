import fs from 'node:fs';

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error('Usage: node scripts/review-bengali-ui-content.mjs <English-source.json>');
const en = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const path = 'docs/i18n-drafts/bn.json';
const draft = JSON.parse(fs.readFileSync(path, 'utf8'));
const reviewed = {
  interface: {
    description: 'ব্রাউজারেই {title} তৈরি করুন এবং প্রিভিউ দেখুন।',
    guide: 'তারকা চিহ্নিত ঘরগুলো পূরণ করা আবশ্যক। আপনার ডিভাইসে টেক্সট ফাইল হিসেবে কপি সংরক্ষণ করুন অথবা PDF হিসেবে প্রিন্ট করুন।',
    faqSaved: 'আমার নথিটি কোথায় সংরক্ষিত হয়?',
    faqLegal: 'আমি কি এটিকে আইনত বাধ্যতামূলক ফর্ম হিসেবে ব্যবহার করতে পারি?',
    draftSaved: 'আপনার খসড়াটি এই ব্রাউজারে সংরক্ষিত আছে।',
    clipboardError: 'এই ব্রাউজারে ক্লিপবোর্ড ব্যবহার করা যাচ্ছে না।',
    requiredLabel: 'আবশ্যক', searchLabel: 'নথি খুঁজুন',
    examplesBody: 'সংক্ষিপ্ত ও তথ্যনির্ভর বিবরণ লিখুন। শেয়ার বা প্রিন্ট করার আগে তারিখ, নাম, অঙ্ক এবং স্থানীয় শর্ত যাচাই করুন।',
  },
  categories: {
    work: 'ব্যবসা ও কাজ', finance: 'অর্থ ও হিসাবরক্ষণ', 'hr-admin': 'মানবসম্পদ ও প্রশাসন',
    'project-management': 'প্রকল্প ব্যবস্থাপনা', 'development-it': 'সফটওয়্যার উন্নয়ন ও তথ্যপ্রযুক্তি',
    'sales-customer': 'বিক্রয় ও গ্রাহক ব্যবস্থাপনা', 'inventory-logistics': 'মজুত ও সরবরাহব্যবস্থা',
    education: 'স্কুল ও শিক্ষা', personal: 'ব্যক্তিগত জীবন', 'health-fitness': 'স্বাস্থ্য ও শরীরচর্চা',
    travel: 'ভ্রমণ', checklists: 'চেকলিস্ট', planning: 'পরিকল্পনা', records: 'রেকর্ড',
  },
  ui: {
    brand: 'নথিপত্র', tagline: 'ব্রাউজারেই দরকারি নথি তৈরি ও গুছিয়ে রাখুন।',
    search: 'নথির টেমপ্লেট খুঁজুন', categories: 'বিভাগ', all: 'সব নথি',
    popular: 'শুরু করতে একটি নথি বেছে নিন', count: 'টি নথি',
    browser: 'আপনার দেওয়া তথ্য এই ব্রাউজারেই থাকে। আমাদের সার্ভার বা বিশ্লেষণ সেবায় পাঠানো হয় না।',
    draft: 'এই ব্রাউজারে সংরক্ষিত', clear: 'ঘরগুলো মুছুন', copy: 'লেখা কপি করুন', copied: 'কপি হয়েছে',
    print: 'প্রিন্ট করুন / PDF হিসেবে সংরক্ষণ করুন', download: 'টেক্সট ডাউনলোড করুন', preview: 'তাৎক্ষণিক প্রিভিউ',
    edit: 'নথি সম্পাদনা করুন', save: 'স্বয়ংক্রিয়ভাবে সংরক্ষিত', related: 'সম্পর্কিত নথি',
    guide: 'ব্যবহারের নিয়ম', examples: 'লেখার পরামর্শ', faq: 'সাধারণ জিজ্ঞাসা',
    legal: 'এটি কেবল একটি সাধারণ খসড়া ও নমুনা টেমপ্লেট। এটি আইনি পরামর্শ নয় এবং এর আইনগত কার্যকারিতার নিশ্চয়তা দেয় না। ব্যবহারের আগে আপনার এলাকার যোগ্য বিশেষজ্ঞের সঙ্গে পরামর্শ করুন।',
    home: 'নথির সংগ্রহ', language: 'ভাষা', family: 'woori.today-এর অন্যান্য সেবা',
    portal: 'মূল পাতা', calculator: 'গণক', tools: 'অনলাইন টুল', ledger: 'পরিবারের যৌথ হিসাবের খাতা',
    docs: 'নথি', quiz: 'কুইজ', privacy: 'গোপনীয়তার নীতি', usage: 'ব্যবহারবিধি',
    contact: 'যোগাযোগ', contactTitle: 'আমাদের সঙ্গে যোগাযোগ করুন', email: 'ইমেইল ঠিকানা', close: 'বন্ধ করুন',
    empty: 'মিলেছে এমন কোনো নথি নেই।', checked: 'সম্পন্ন', adHidden: '',
    placeholder: 'আপনার লেখা লিখুন', required: 'এই ঘরটি পূরণ করা আবশ্যক',
    templateNote: 'আপনার দেওয়া তথ্য সঙ্গে সঙ্গে প্রিভিউতে দেখা যাবে।',
    newFeature: 'প্রতিটি নতুন ফিচার সার্ভিস ক্যাটালগেও নথিভুক্ত করুন।',
    updated: 'এই ব্রাউজারে সংরক্ষিত', remove: 'রিসেট করুন', allLocales: 'উপলভ্য ভাষা',
  },
  chrome: {
    family: 'woori.today-এর অন্যান্য সেবা', portal: 'মূল পাতা', calculators: 'গণক',
    tools: 'অনলাইন টুল', money: 'পরিবারের যৌথ হিসাবের খাতা', docs: 'নথি ও ফর্ম',
    quiz: 'কুইজ ও পরীক্ষা', privacy: 'গোপনীয়তার নীতি', terms: 'ব্যবহারের শর্ত', contact: 'যোগাযোগ',
    contactTitle: 'আমাদের সঙ্গে যোগাযোগ করুন', inquiry: 'যোগাযোগের বিষয়',
    guidance: 'আপনার বার্তাটি ইমেইলে পাঠান। আমরা উত্তর দেব।', email: 'ইমেইল ঠিকানা',
    copy: 'ইমেইল ঠিকানা কপি করুন', copied: 'ইমেইল ঠিকানা কপি হয়েছে।', close: 'বন্ধ করুন',
    types: ['সাধারণ / ফিচার', 'সহযোগিতা', 'বিজ্ঞাপন / প্রস্তাব', 'বাগের প্রতিবেদন'],
  },
  editor: {
    myForms: 'আমার ফর্ম', newForm: 'নতুন ফর্ম তৈরি করুন', open: 'খুলুন', rename: 'নাম বদলান',
    duplicate: 'কপি তৈরি করুন', delete: 'মুছুন', deleteConfirm: 'এই ফর্মটি মুছে ফেলবেন?',
    saveForm: 'ফর্ম সংরক্ষণ করুন', addField: 'ঘর যোগ করুন', fieldName: 'ঘরের নাম', fieldType: 'ঘরের ধরন',
    required: 'আবশ্যক', moveUp: 'উপরে তুলুন', moveDown: 'নিচে নামান', removeField: 'ঘর সরান',
    useDefault: 'ডিফল্ট ফর্ম ব্যবহার করুন', customize: 'এই ফর্মটি নিজের মতো সাজান',
    reset: 'মূল ফর্ম ফিরিয়ে আনুন', text: 'ছোট লেখা', textarea: 'দীর্ঘ লেখা', number: 'সংখ্যা',
    date: 'তারিখ', time: 'সময়', checkbox: 'টিক দেওয়ার ঘর', select: 'বিকল্প', currency: 'অঙ্ক', percent: 'শতাংশ',
    email: 'ইমেইল ঠিকানা', tel: 'ফোন নম্বর', blankTitle: 'নতুন ফর্ম', saved: 'এই ব্রাউজারে সংরক্ষিত',
    defaultValue: 'ডিফল্ট মান', options: 'বিকল্পসমূহ',
  },
  documentContent: {
    copy: {
      intro: '{title} হলো {category} কাজের জন্য প্রয়োজনীয় তথ্য গুছিয়ে রাখার একটি সম্পাদনাযোগ্য টেমপ্লেট।',
      purpose: '{category} সংক্রান্ত কাজ, সিদ্ধান্ত ও পরবর্তী পদক্ষেপের তথ্য লিখতে, পর্যালোচনা করতে বা অন্যের কাছে হস্তান্তর করতে এটি ব্যবহার করুন।',
      audience: '{category} সংক্রান্ত রেকর্ড তৈরি বা রক্ষণাবেক্ষণ করেন এমন ব্যক্তি ও দলের জন্য এটি উপযোগী।',
      structure: 'টেমপ্লেটটিতে রয়েছে: {fields}{more}',
      steps: 'ঘরগুলো আপনার উদ্দেশ্যের সঙ্গে মানানসই কি না দেখুন। আগে আবশ্যক ঘরগুলো পূরণ করুন, তারপর প্রিভিউতে ক্রম ও তথ্য যাচাই করুন। প্রয়োজন হলে নিজের কপির ঘরগুলো বদলে নিতে পারেন।',
      tips: 'যাচাই করা যায় এমন তারিখ, দায়িত্বপ্রাপ্ত ব্যক্তি ও অঙ্ক সতর্কভাবে লিখুন। নিশ্চিত তথ্যকে খোলা প্রশ্ন ও পরবর্তী কাজ থেকে আলাদা রাখুন।',
      source: 'সাধারণ রেকর্ড রাখার কাজে ব্যবহারের জন্য woori.today এই সম্পাদনাযোগ্য নমুনা টেমপ্লেট তৈরি করেছে। এটি বাইরের কোনো প্রতিষ্ঠানের সরকারি ফর্মের কপি নয়। আপনার দেওয়া তথ্য এই ব্রাউজারেই প্রক্রিয়া করা হয়।',
      caution: 'জমা দেওয়ার আগে আপনার প্রতিষ্ঠানের নিয়ম ও স্থানীয় শর্ত যাচাই করুন। এই টেমপ্লেট আইনি, কর বা চিকিৎসা পরামর্শ কিংবা সরকারি ফর্মের বিকল্প নয়।',
      faq1: 'আমার কাজ কোথায় সংরক্ষিত হয়?', faq2: 'আমি কি ঘরগুলো বদলাতে পারি?',
      faqA1: 'খসড়াটি এই ব্রাউজারের স্থানীয় সংরক্ষণে থাকে; সার্ভারে পাঠানো হয় না।',
      faqA2: 'কপি তৈরি করতে “এই টেমপ্লেটটি নিজের মতো সাজান” বেছে নিন। এরপর ঘর যোগ, বাদ বা পুনর্বিন্যাস করুন।',
      library: 'woori.today-এর টেমপ্লেট পূরণ, প্রিভিউ, কপি, টেক্সট হিসেবে ডাউনলোড, অথবা প্রিন্ট করে PDF হিসেবে সংরক্ষণ করা যায়।',
      libraryUse: 'একটি নথি বেছে নিয়ে প্রয়োজনীয় ঘর পূরণ করুন এবং প্রিভিউ দেখুন। লেখা কপি বা ডাউনলোড করুন, অথবা ব্রাউজারের প্রিন্ট ডায়ালগ দিয়ে PDF সংরক্ষণ করুন।',
      category: '{category} বিভাগের নথিগুলো উদ্দেশ্য অনুযায়ী দেখুন। টেমপ্লেট বেছে নেওয়ার আগে এতে কোন ঘরগুলো আছে যাচাই করুন।',
      more: ' এবং আরও {count}টি', tableNote: 'এতে পুনরাবৃত্তি করা যায় এমন এন্ট্রির টেবিল ও মোট হিসাবও রয়েছে।',
    },
    specific: {
      form: '{title} ব্যবহার করে {category} কাজের প্রয়োজনীয় তথ্য সংগ্রহ ও পর্যালোচনা করুন, এবং দরকার হলে পরবর্তী ব্যক্তির কাছে পাঠান।',
      checklist: 'কাজগুলো সম্পন্ন হলে {title}-এ চিহ্ন দিন, যাতে মনোযোগ দরকার এমন বিষয় দ্রুত খুঁজে পান।',
      planner: 'তারিখ ও লক্ষ্য সাজাতে, অগ্রাধিকার ঠিক করতে এবং অগ্রগতি পর্যালোচনা করতে {title} ব্যবহার করুন।',
      audience: '{title} তৈরি, পর্যালোচনা বা অন্যের সঙ্গে ভাগ করেন এমন ব্যক্তি ও দলের জন্য এটি।',
      stepFocus: ' নথিটি সহজে যাচাই ও হস্তান্তরের জন্য {fields} ঘরগুলো বিশেষভাবে খেয়াল করুন।',
      tipFocus: ' {fields} ঘরগুলোর তথ্য সামঞ্জস্যপূর্ণ রাখুন। নথি ব্যবহারের আগে প্রিভিউতে কোনো তথ্য বাদ পড়েছে কি না দেখুন।',
      faqFields: 'এই টেমপ্লেটে কী তথ্য সংগ্রহ করা হয়?',
      faqFieldsAnswer: 'ডিফল্ট টেমপ্লেটে রয়েছে {fields}। নিজের কাজের ধরন অনুযায়ী কপি বদলে নিতে পারেন।',
    },
    purposeFocus: ' এই প্রক্রিয়ার মূল রেকর্ড হিসেবে {fields} ব্যবহার করুন।',
    sectionLabels: {
      overview: 'টেমপ্লেট পরিচিতি', audience: 'কারা ব্যবহার করবেন', contents: 'ঘর ও প্রিভিউ',
      steps: 'যেভাবে পূরণ করবেন', tips: 'লেখার পরামর্শ', source: 'টেমপ্লেটের উৎস ও তথ্য প্রক্রিয়াকরণ', caution: 'ব্যবহারের আগে',
    },
    recent: 'নতুন যোগ করা টেমপ্লেট',
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
draft.reviewStatus = 'Editorial translation review complete; unpublished pending Bengali runtime connection and verification';
fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
console.log('Bengali editorial review complete: 699/699 units; runtime connection and verification remain.');
