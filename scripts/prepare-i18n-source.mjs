import fs from 'node:fs';
import ts from 'typescript';

function readLocaleObject(file, variableName, locale = 'en') {
  const text = fs.readFileSync(file, 'utf8');
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  let root;
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (declaration.name.getText(source) === variableName) root = declaration.initializer;
    }
  }
  if (!root || !ts.isObjectLiteralExpression(root)) throw new Error(`Missing ${variableName} in ${file}`);
  const property = root.properties.find((item) => ts.isPropertyAssignment(item) && item.name.getText(source).replace(/^['"]|['"]$/g, '') === locale);
  if (!property || !ts.isPropertyAssignment(property)) throw new Error(`Missing ${locale} in ${variableName}`);
  return readValue(property.initializer);
  function readValue(value) {
    if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) return value.text;
    if (ts.isObjectLiteralExpression(value)) return readObject(value);
    if (ts.isArrayLiteralExpression(value)) return value.elements.map((entry) => readValue(entry));
    throw new Error(`Unsupported value in ${variableName}`);
  }
  function readObject(node) {
    return Object.fromEntries(node.properties.map((item) => {
      if (!ts.isPropertyAssignment(item)) throw new Error(`Unsupported property in ${variableName}`);
      const name = item.name.getText(source).replace(/^['"]|['"]$/g, '');
      return [name, readValue(item.initializer)];
    }));
  }
}

const documents = JSON.parse(fs.readFileSync('src/lib/document-translations.json', 'utf8')).en;
const categories = JSON.parse(fs.readFileSync('src/lib/category-translations.json', 'utf8')).en;
const editor = JSON.parse(fs.readFileSync('src/lib/editor-translations.json', 'utf8')).en;
const chrome = readLocaleObject('src/lib/chrome-i18n.ts', 'ui');
const siteChrome = readLocaleObject('src/lib/site-chrome-i18n.ts', 'chromeText');
const content = {
  copy: readLocaleObject('src/lib/document-content.ts', 'copy'),
  specific: readLocaleObject('src/lib/document-content.ts', 'specificCopy'),
  purposeFocus: readLocaleObject('src/lib/document-content.ts', 'purposeFocusCopy'),
  sectionLabels: readLocaleObject('src/lib/document-content.ts', 'sectionLabels'),
  recent: readLocaleObject('src/lib/document-content.ts', 'recentLabels'),
};
content.copy.more = ' and {count} more';
content.copy.tableNote = 'A repeating-entry table and totals are also included.';
const output = {
  titles: documents.titles,
  fields: documents.fields,
  interface: documents.interface,
  categories,
  ui: chrome,
  chrome: siteChrome,
  editor,
  documentContent: content,
};
const target = process.argv[2];
if (!target) throw new Error('Usage: node scripts/prepare-i18n-source.mjs <output-json>');
fs.writeFileSync(target, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
console.log(`Wrote ${Object.keys(documents.titles).length} titles and English translation source maps to ${target}`);
