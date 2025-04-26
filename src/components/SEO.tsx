import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  article?: boolean;
  product?: {
    name: string;
    description: string;
    image: string;
    price?: string;
    availability?: string;
    technicalSpecification?: string;
    manufacturingDetails?: string;
    category?: string;
    brand?: string;
    model?: string;
  };
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  article = false,
  product
}) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLanguage = i18n.language;

  const site = {
    name: 'GoldenDie - LKE Group GmbH',
    url: 'https://goldendie.de',
    logo: 'https://goldendie.de/logo.svg',
    email: 'info@goldendie.de',
    phone: '+49...',
    companyName: 'LKE Group GmbH'
  };

  const seo = {
    title: title ? `${title} | ${site.companyName}` : t('seo.defaultTitle'),
    description: description || t('seo.defaultDescription'),
    keywords: keywords ? `${keywords}, LKE Group GmbH, GoldenDie` : t('seo.defaultKeywords'),
    image: image || `${site.url}/default-og-image.jpg`,
    url: `${site.url}${location.pathname}`
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    alternateName: 'LKE Group GmbH',
    url: site.url,
    logo: site.logo,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.phone,
      email: site.email,
      contactType: 'customer service'
    },
    sameAs: [
      'https://www.facebook.com/lkegroupgmbh',
      'https://www.linkedin.com/company/lke-group-gmbh'
    ]
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: site.url
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title || '',
        item: seo.url
      }
    ]
  };

  const productSchema = product ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: 'LKE Group GmbH'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'LKE Group GmbH'
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EUR',
      availability: product.availability || 'https://schema.org/InStock'
    }
  } : null;

  return (
    <Helmet>
      {/* Основные мета-теги */}
      <html lang={currentLanguage} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="canonical" href={seo.url} />
      <meta name="author" content="LKE Group GmbH" />

      {/* Viewport и совместимость */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=no" />

      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content={currentLanguage} />
      <meta property="business:contact_data:street_address" content="Hauptstraße 1" />
      <meta property="business:contact_data:locality" content="Berlin" />
      <meta property="business:contact_data:country_name" content="Germany" />
      <meta property="business:contact_data:email" content={site.email} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Alternate Language Links */}
      <link rel="alternate" hrefLang="de" href={`${site.url}/de${location.pathname}`} />
      <link rel="alternate" hrefLang="en" href={`${site.url}/en${location.pathname}`} />
      <link rel="alternate" hrefLang="ru" href={`${site.url}/ru${location.pathname}`} />
      <link rel="alternate" hrefLang="x-default" href={`${site.url}${location.pathname}`} />

      {/* Favicons */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#ffffff" />

      {/* Структурированные данные */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      {product && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO; 