import { writeFileSync } from 'fs';
import { resolve } from 'path';

const staticPages = [
  '',
  '/granulator',
  '/mixer',
  '/about',
  '/contacts',
  '/service-information',
  '/privacy-policy',
  '/cookie-policy',
  '/spare-parts'
];

const languages = ['en', 'de', 'ru'];

// Add priority mapping for different types of pages
const pagePriorities: { [key: string]: number } = {
  '': 1.0,           // Home page
  '/granulator': 0.9,    // Product category pages
  '/mixer': 0.9,
  '/about': 0.8,     // Important static pages
  '/contacts': 0.8,
  '/service-information': 0.7,
  '/privacy-policy': 0.6,
  '/cookie-policy': 0.6,
  '/spare-parts': 0.9,
  'product': 0.9     // Individual product pages
};

// Add change frequency mapping for different types of pages
const pageChangeFreq: { [key: string]: string } = {
  '': 'daily',           // Home page changes frequently
  '/granulator': 'weekly',   // Product pages change weekly
  '/mixer': 'weekly',
  '/about': 'monthly',   // Static pages change less frequently
  '/contacts': 'monthly',
  '/service-information': 'monthly',
  '/privacy-policy': 'yearly',
  '/cookie-policy': 'yearly',
  '/spare-parts': 'weekly',
  'product': 'weekly'    // Individual product pages
};

// Add image mapping for pages
const pageImages: { [key: string]: { loc: string; title: string; caption: string } } = {
  '': {
    loc: '/logo.svg',
    title: 'GoldenMill - LKE Group GmbH | Industrial Equipment Manufacturer',
    caption: 'Leading manufacturer of high-quality granulators, mixers and spare parts for pellet mills'
  },
  '/granulator': {
    loc: '/images/granulator.jpg',
    title: 'Premium Granulators for Pellet Mills | LKE Group GmbH',
    caption: 'High-performance granulators with superior hardness and wear resistance for optimal pellet production'
  },
  '/mixer': {
    loc: '/images/mixer.jpg',
    title: 'Professional Mixers for Industrial Applications | LKE Group GmbH',
    caption: 'Advanced mixers with various surface types for optimal material blending and processing'
  },
  '/about': {
    loc: '/images/about.jpg',
    title: 'About LKE Group GmbH | Your Trusted Industrial Partner',
    caption: 'Learn about our company history, expertise, and commitment to quality in industrial equipment manufacturing'
  },
  '/contacts': {
    loc: '/images/contacts.jpg',
    title: 'Contact LKE Group GmbH | Get in Touch',
    caption: 'Reach out to our team for inquiries, support, or to discuss your industrial equipment needs'
  },
  '/service-information': {
    loc: '/images/service.jpg',
    title: 'Technical Support &amp; Service Information | LKE Group GmbH',
    caption: 'Comprehensive technical support, maintenance guides, and service information for our industrial equipment'
  }
};

async function generateSitemap() {
  const siteUrl = 'https://goldenmill.de';
  
  // Here you would typically fetch your product IDs from your API or database
  const productIds: string[] = []; // You should populate this with actual product IDs
  
  // Generate sitemap for each language
  for (const lang of languages) {
    const sitemap = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
      '        xmlns:xhtml="http://www.w3.org/1999/xhtml"',
      '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"',
      '        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">',
      ...staticPages.map(page => [
        '  <url>',
        `    <loc>${siteUrl}/${lang}${page}</loc>`,
        `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`,
        `    <changefreq>${pageChangeFreq[page] || 'weekly'}</changefreq>`,
        `    <priority>${pagePriorities[page] || 0.8}</priority>`,
        ...languages.map(alterLang =>
          `    <xhtml:link rel="alternate" hreflang="${alterLang}" href="${siteUrl}/${alterLang}${page}"/>`
        ),
        page === ''
          ? `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}"/>`
          : `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${page}"/>`,
        pageImages[page]
          ? [
              '    <image:image>',
              `      <image:loc>${siteUrl}${pageImages[page].loc}</image:loc>`,
              `      <image:title>${pageImages[page].title}</image:title>`,
              `      <image:caption>${pageImages[page].caption}</image:caption>`,
              '    </image:image>'
            ].join('\n')
          : '',
        '    <mobile:mobile/>',
        '  </url>'
      ].join('\n')),
      ...productIds.map(productId => [
        '  <url>',
        `    <loc>${siteUrl}/${lang}/product/${productId}</loc>`,
        `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`,
        `    <changefreq>${pageChangeFreq['product']}</changefreq>`,
        `    <priority>${pagePriorities['product']}</priority>`,
        ...languages.map(alterLang =>
          `    <xhtml:link rel="alternate" hreflang="${alterLang}" href="${siteUrl}/${alterLang}/product/${productId}"/>`
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/product/${productId}"/>`,
        '    <mobile:mobile/>',
        '  </url>'
      ].join('\n')),
      '</urlset>'
    ].join('\n');

    writeFileSync(resolve(process.cwd(), `public/sitemap_${lang}.xml`), sitemap);
    console.log(`Sitemap for ${lang} generated successfully!`);
  }

  // Generate main sitemap
  const mainSitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"',
    '        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">',
    ...staticPages.map(page => [
      '  <url>',
      `    <loc>${siteUrl}${page}</loc>`,
      `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`,
      `    <changefreq>${pageChangeFreq[page] || 'weekly'}</changefreq>`,
      `    <priority>${pagePriorities[page] || 0.8}</priority>`,
      ...languages.map(alterLang =>
        `    <xhtml:link rel="alternate" hreflang="${alterLang}" href="${siteUrl}/${alterLang}${page}"/>`
      ),
      page === ''
        ? `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}"/>`
        : `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${page}"/>`,
      pageImages[page]
        ? [
            '    <image:image>',
            `      <image:loc>${siteUrl}${pageImages[page].loc}</image:loc>`,
            `      <image:title>${pageImages[page].title}</image:title>`,
            `      <image:caption>${pageImages[page].caption}</image:caption>`,
            '    </image:image>'
          ].join('\n')
        : '',
      '    <mobile:mobile/>',
      '  </url>'
    ].join('\n')),
    ...productIds.map(productId => [
      '  <url>',
      `    <loc>${siteUrl}/product/${productId}</loc>`,
      `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`,
      `    <changefreq>${pageChangeFreq['product']}</changefreq>`,
      `    <priority>${pagePriorities['product']}</priority>`,
      ...languages.map(alterLang =>
        `    <xhtml:link rel="alternate" hreflang="${alterLang}" href="${siteUrl}/${alterLang}/product/${productId}"/>`
      ),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/product/${productId}"/>`,
      '    <mobile:mobile/>',
      '  </url>'
    ].join('\n')),
    '</urlset>'
  ].join('\n');

  writeFileSync(resolve(process.cwd(), 'public/sitemap.xml'), mainSitemap);
  console.log('Main sitemap generated successfully!');
}

generateSitemap(); 