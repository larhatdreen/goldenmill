import { writeFileSync } from 'fs';
import { resolve } from 'path';

const routes = [
  '/granulator',
  '/shell',
  '/about',
  '/contacts',
  '/serviceinformation',
  '/privacypolicy',
  '/cookie-policy',
  '/spare-parts'
];

const languages = ['en', 'de', 'ru'];

// Add priority mapping for different types of pages
const priorities: { [key: string]: number } = {
  '/granulator': 0.9,    // Product category pages
  '/shell': 0.9,         // Product category pages
  '/about': 0.7,         // About page
  '/contacts': 0.7,      // Contact page
  '/serviceinformation': 0.7, // Service information page
  '/privacypolicy': 0.5, // Legal pages
  '/cookie-policy': 0.5, // Legal pages
  '/spare-parts': 0.8    // Product pages
};

// Add change frequency mapping for different types of pages
const changefreqs: { [key: string]: string } = {
  '/granulator': 'weekly',   // Product pages change weekly
  '/shell': 'weekly',        // Product pages change weekly
  '/about': 'monthly',       // Static content
  '/contacts': 'monthly',    // Static content
  '/serviceinformation': 'monthly', // Static content
  '/privacypolicy': 'yearly', // Legal pages rarely change
  '/cookie-policy': 'yearly', // Legal pages rarely change
  '/spare-parts': 'weekly'   // Product pages change weekly
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
  ${routes
    .map(route => 
      languages.map(lang => `
    <url>
      <loc>${siteUrl}/${lang}${route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${changefreqs[route] || 'weekly'}</changefreq>
      <priority>${priorities[route] || 0.8}</priority>
      ${languages
        .map(
          alterLang => `
      <xhtml:link 
        rel="alternate" 
        hreflang="${alterLang}" 
        href="${siteUrl}/${alterLang}${route}"/>`
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
      <changefreq>${changefreqs['product']}</changefreq>
      <priority>${priorities['product']}</priority>
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