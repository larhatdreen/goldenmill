import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface MultiLangField {
  en: string;
  de: string;
  ru: string;
}

async function generateProductSitemap() {
  try {
    // Fetch all products from database
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

    // XML header
    let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    
    <!-- Products Main Page -->
    <url>
        <loc>https://goldenmill.de/products</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
        <xhtml:link rel="alternate" hreflang="de" href="https://goldenmill.de/de/products"/>
        <xhtml:link rel="alternate" hreflang="en" href="https://goldenmill.de/en/products"/>
        <xhtml:link rel="alternate" hreflang="ru" href="https://goldenmill.de/ru/products"/>
    </url>\n`;

    // Add each product
    for (const product of products) {
      const title = JSON.parse(JSON.stringify(product.title)) as MultiLangField;
      const description = JSON.parse(JSON.stringify(product.description)) as MultiLangField;
      
      xmlContent += `
    <url>
        <loc>https://goldenmill.de/product/${product.id}</loc>
        <lastmod>${product.updatedAt.toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
        <xhtml:link rel="alternate" hreflang="de" href="https://goldenmill.de/de/product/${product.id}"/>
        <xhtml:link rel="alternate" hreflang="en" href="https://goldenmill.de/en/product/${product.id}"/>
        <xhtml:link rel="alternate" hreflang="ru" href="https://goldenmill.de/ru/product/${product.id}"/>
        <image:image>
            <image:loc>${product.imageUrl}</image:loc>
            <image:title>${title.en}</image:title>
            <image:caption>${description.en}</image:caption>
        </image:image>
    </url>`;
    }

    // Close XML
    xmlContent += '\n</urlset>';

    // Write to file
    const outputPath = path.join(__dirname, '../public/products_sitemap.xml');
    fs.writeFileSync(outputPath, xmlContent);

    console.log('Products sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating products sitemap:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the generator
generateProductSitemap(); 