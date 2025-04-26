import { writeFileSync } from 'fs';
import { resolve } from 'path';

const staticPages = [
  '',
  '/matrix',
  '/shell',
  '/about',
  '/contacts',
  '/serviceinformation',
  '/privacypolicy',
];

const languages = ['en', 'de', 'ru'];

// Add priority mapping for different types of pages
const pagePriorities: { [key: string]: number } = {
  '': 1.0,           // Home page
  '/matrix': 0.9,    // Product category pages
  '/shell': 0.9,
  '/about': 0.8,     // Important static pages
  '/contacts': 0.8,
  '/serviceinformation': 0.7,
  '/privacypolicy': 0.6,
  'product': 0.9     // Individual product pages
};

// Add change frequency mapping for different types of pages
const pageChangeFreq: { [key: string]: string } = {
  '': 'daily',           // Home page changes frequently
  '/matrix': 'weekly',   // Product pages change weekly
  '/shell': 'weekly',
  '/about': 'monthly',   // Static pages change less frequently
  '/contacts': 'monthly',
  '/serviceinformation': 'monthly',
  '/privacypolicy': 'monthly',
  'product': 'weekly'    // Individual product pages
};

async function generateSitemap() {
  const siteUrl = 'https://goldendie.de';
  
  // Here you would typically fetch your product IDs from your API or database
  // For now, we'll just add a placeholder for the structure
  const productIds = []; // You should populate this with actual product IDs
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${staticPages
    .map(page => 
      languages.map(lang => `
    <url>
      <loc>${siteUrl}/${lang}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${pageChangeFreq[page] || 'weekly'}</changefreq>
      <priority>${pagePriorities[page] || 0.8}</priority>
      ${languages
        .map(
          alterLang => `
      <xhtml:link 
        rel="alternate" 
        hreflang="${alterLang}" 
        href="${siteUrl}/${alterLang}${page}"/>`
        )
        .join('')}
    </url>`
      ).join('')
    )
    .join('')}
  ${productIds
    .map(productId =>
      languages.map(lang => `
    <url>
      <loc>${siteUrl}/${lang}/product/${productId}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${pageChangeFreq['product']}</changefreq>
      <priority>${pagePriorities['product']}</priority>
      ${languages
        .map(
          alterLang => `
      <xhtml:link 
        rel="alternate" 
        hreflang="${alterLang}" 
        href="${siteUrl}/${alterLang}/product/${productId}"/>`
        )
        .join('')}
    </url>`)
      .join('')
    )
    .join('')}
</urlset>`;

  writeFileSync(resolve(process.cwd(), 'public/sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}

generateSitemap(); 