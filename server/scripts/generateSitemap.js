const fs = require('fs');
const path = require('path');

// Список всех продуктов
const products = [
  'granulator1',
  'granulator2',
  'granulator3',
  'mixer1',
  'mixer2',
  'mixer3',
  'mixer4'
];

// Список языков
const languages = ['en', 'de', 'ru'];

// Базовый URL
const baseUrl = 'https://goldenmill.de';

// Генерируем URL для каждого продукта и языка
const urls = products.flatMap(product => 
  languages.map(lang => `${baseUrl}/${lang}/${product}`)
);

// Добавляем основные URL
const mainUrls = languages.map(lang => `${baseUrl}/${lang}`);

// Создаем XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${mainUrls.map(url => `
    <url>
      <loc>${url}</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
  `).join('')}
  ${urls.map(url => `
    <url>
      <loc>${url}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('')}
</urlset>`;

// Сохраняем файл
const outputPath = path.join(__dirname, '../../dist/sitemap.xml');
fs.writeFileSync(outputPath, xml);

console.log('Sitemap generated successfully at:', outputPath); 