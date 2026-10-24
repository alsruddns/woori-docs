import fs from 'node:fs';

const source = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const locales = ['tr', 'pl', 'fil', 'bn', 'uk', 'ms', 'sv', 'cs', 'ro', 'el'];
let restoredMarkers = 0;
function restore(expected, actual) {
  if (typeof expected === 'string') {
    const slots = [...expected.matchAll(/\{\w+\}/g)].map(([slot]) => slot);
    let value = String(actual ?? '');
    value = value.replace(/<\s*x(\d+)\s*>/gi, (_match, index) => {
      restoredMarkers += 1;
      return slots[Number(index)] ?? '';
    });
    const counts = new Map();
    value = value.replace(/\{\w+\}/g, (slot) => {
      const next = (counts.get(slot) ?? 0) + 1;
      counts.set(slot, next);
      return next <= slots.filter((expectedSlot) => expectedSlot === slot).length ? slot : '';
    });
    for (const slot of slots) {
      const expectedCount = slots.filter((entry) => entry === slot).length;
      while ((counts.get(slot) ?? 0) < expectedCount) {
        value += ` ${slot}`;
        counts.set(slot, (counts.get(slot) ?? 0) + 1);
      }
    }
    return value;
  }
  if (Array.isArray(expected)) return expected.map((item, index) => restore(item, actual?.[index]));
  if (expected && typeof expected === 'object') return Object.fromEntries(Object.entries(expected).map(([key, value]) => [key, restore(value, actual?.[key])]));
  return actual;
}
for (const locale of locales) {
  const path = `docs/i18n-drafts/${locale}.json`;
  const draft = JSON.parse(fs.readFileSync(path, 'utf8'));
  for (const [section, english] of Object.entries(source)) draft[section] = restore(english, draft[section]);
  fs.writeFileSync(path, `${JSON.stringify(draft, null, 2)}\n`, 'utf8');
}
console.log(`Restored ${restoredMarkers} temporary translation markers; all drafts remain unpublished.`);
