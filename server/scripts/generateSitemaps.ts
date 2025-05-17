import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
const BASE_URL = 'https://goldenmill.de';

interface MultiLangField {
  en: string;
  de: string;
  ru: string;
}

async function generateMainSitemap() {
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap_products.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap_pages.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`;

  fs.writeFileSync(path.join(__dirname, '../public/sitemap_index.xml'), xmlContent);
}

async function generateProductsSitemap() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      updatedAt: true,
      category: true
    }
  });

  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  for (const product of products) {
    const title = JSON.parse(JSON.stringify(product.title)) as MultiLangField;
    const description = JSON.parse(JSON.stringify(product.description)) as MultiLangField;
    
    xmlContent += `
  <url>
    <loc>${BASE_URL}/product/${product.id}</loc>
    <lastmod>${product.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="de" href="${BASE_URL}/de/product/${product.id}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/en/product/${product.id}"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${BASE_URL}/ru/product/${product.id}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/product/${product.id}"/>
    <image:image>
      <image:loc>${product.imageUrl}</image:loc>
      <image:title>${title.en}</image:title>
      <image:caption>${description.en}</image:caption>
    </image:image>
  </url>`;
  }

  xmlContent += '\n</urlset>';
  fs.writeFileSync(path.join(__dirname, '../public/sitemap_products.xml'), xmlContent);
}

async function generatePagesSitemap() {
  const pages = [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    { path: '/about', priority: 0.8, changefreq: 'monthly' },
    { path: '/contacts', priority: 0.8, changefreq: 'monthly' },
    { path: '/service-information', priority: 0.7, changefreq: 'monthly' },
    { path: '/privacy-policy', priority: 0.5, changefreq: 'yearly' },
    { path: '/cookie-policy', priority: 0.5, changefreq: 'yearly' },
    { path: '/faq', priority: 0.8, changefreq: 'weekly' },
    { path: '/blog', priority: 0.8, changefreq: 'weekly' }
  ];

  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  for (const page of pages) {
    xmlContent += `
  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="de" href="${BASE_URL}/de${page.path}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/en${page.path}"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${BASE_URL}/ru${page.path}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${page.path}"/>
  </url>`;
  }

  xmlContent += '\n</urlset>';
  fs.writeFileSync(path.join(__dirname, '../public/sitemap_pages.xml'), xmlContent);
}

async function generateAllSitemaps() {
  try {
    await generateMainSitemap();
    await generateProductsSitemap();
    await generatePagesSitemap();
    console.log('All sitemaps generated successfully!');
  } catch (error) {
    console.error('Error generating sitemaps:', error);
  } finally {
    await prisma.$disconnect();
  }
}

generateAllSitemaps(); 