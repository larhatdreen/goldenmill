const fs = require('fs');
const path = require('path');

// 1. Получаем все кастомные font-классы из tailwind.config.js
const tailwindConfig = require('./tailwind.config.js');
const fontFamilies = tailwindConfig.theme.extend.fontFamily;
const definedFontClasses = Object.keys(fontFamilies);

// 2. Рекурсивно ищем все файлы с нужными расширениями
function getAllFiles(dir, exts, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, exts, files);
    } else if (exts.includes(path.extname(fullPath))) {
      files.push(fullPath);
    }
  });
  return files;
}

const files = getAllFiles('./src', ['.tsx', '.ts', '.js', '.jsx', '.css']);

// 3. Ищем все font- классы в файлах
const fontClassRegex = /font-([a-zA-Z0-9\-]+)/g;
const usedFontClasses = new Set();

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = fontClassRegex.exec(content)) !== null) {
    usedFontClasses.add(match[1]);
  }
});

// 4. Сравниваем
const notInTailwind = [...usedFontClasses].filter(cls => !definedFontClasses.includes(cls));
const notUsed = definedFontClasses.filter(cls => !usedFontClasses.has(cls));

console.log('Используются, но не определены в Tailwind:', notInTailwind);
console.log('Определены в Tailwind, но не используются:', notUsed);
console.log('Все используемые font- классы:', [...usedFontClasses]);
console.log('Все определённые в Tailwind font- классы:', definedFontClasses);