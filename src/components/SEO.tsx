import React, { useEffect } from 'react';
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

interface SchemaOrg {
  '@context': string;
  '@type': string;
  '@id': string;
  url: string;
  name: string;
  description: string;
  publisher: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
    };
    address: {
      '@type': string;
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      addressCountry: string;
      postalCode: string;
    };
    contactPoint: {
      '@type': string;
      telephone: string;
      email: string;
      contactType: string;
      availableLanguage: string[];
    };
  };
  breadcrumb: {
    '@type': string;
    itemListElement: Array<{
      '@type': string;
      position: number;
      item: {
        '@id': string;
        name: string;
      };
    }>;
  };
  image?: string;
  brand?: {
    '@type': string;
    name: string;
  };
  model?: string;
  category?: string;
  offers?: {
    '@type': string;
    price: string;
    priceCurrency: string;
    availability: string;
  };
  additionalProperty?: Array<{
    '@type': string;
    name: string;
    value: string;
  }>;
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
    name: 'GoldenMill - LKT Group GmbH',
    url: 'https://goldenmill.de',
    logo: 'https://goldenmill.de/logo.svg',
    email: 'info@goldenmill.de',
    phone: '+49 (0) 211 9891272',
    companyName: 'LKT Group GmbH',
    address: {
      street: 'Lindenstraße 48-52',
      city: 'Düsseldorf',
      country: 'Germany',
      postalCode: '40233',
      region: 'North Rhine-Westphalia'
    }
  };

  const seo = {
    title: title ? `${title} | ${site.companyName}` : t('seo.defaultTitle'),
    description: description || t('seo.defaultDescription'),
    keywords: keywords ? `${keywords}, LKT Group GmbH, GoldenMill` : t('seo.defaultKeywords'),
    image: image || `${site.url}/logo.svg`,
    url: `${site.url}${location.pathname}`
  };

  const schemaOrg: SchemaOrg = {
    '@context': 'https://schema.org',
    '@type': article ? 'Article' : 'WebPage',
    '@id': seo.url,
    url: seo.url,
    name: seo.title,
    description: seo.description,
    publisher: {
      '@type': 'Organization',
      name: site.companyName,
      logo: {
        '@type': 'ImageObject',
        url: site.logo
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
        postalCode: site.address.postalCode
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: site.phone,
        email: site.email,
        contactType: 'customer service',
        availableLanguage: ['German', 'English', 'Russian']
      }
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': site.url,
            name: 'Home'
          }
        }
      ]
    }
  };

  if (product) {
    schemaOrg['@type'] = 'Product';
    schemaOrg.name = product.name;
    schemaOrg.description = product.description;
    schemaOrg.image = product.image;
    schemaOrg.brand = {
      '@type': 'Brand',
      name: product.brand || 'GoldenMill'
    };
    schemaOrg.model = product.model;
    schemaOrg.category = product.category;
    schemaOrg.offers = {
      '@type': 'Offer',
      price: product.price || '',
      priceCurrency: 'EUR',
      availability: product.availability || 'https://schema.org/InStock'
    };
    if (product.technicalSpecification) {
      schemaOrg.additionalProperty = [
        {
          '@type': 'PropertyValue',
          name: 'Technical Specification',
          value: product.technicalSpecification
        }
      ];
    }
    if (product.manufacturingDetails) {
      if (!schemaOrg.additionalProperty) {
        schemaOrg.additionalProperty = [];
      }
      schemaOrg.additionalProperty.push({
        '@type': 'PropertyValue',
        name: 'Manufacturing Details',
        value: product.manufacturingDetails
      });
    }
  }

  // Обновляем мета-теги при изменении маршрута
  useEffect(() => {
    // Обновляем title
    document.title = seo.title;
    
    // Обновляем meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seo.description);
    }

    // Обновляем canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', seo.url);
    }

    // Обновляем Open Graph теги
    const ogTags = {
      'og:title': seo.title,
      'og:description': seo.description,
      'og:image': seo.image,
      'og:url': seo.url,
      'og:type': article ? 'article' : 'website',
      'og:site_name': site.name,
      'og:locale': currentLanguage
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      }
    });

    // Обновляем Twitter Card теги
    const twitterTags = {
      'twitter:title': seo.title,
      'twitter:description': seo.description,
      'twitter:image': seo.image
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      }
    });
  }, [location.pathname, currentLanguage, seo]);

  return (
    <Helmet>
      {/* Основные мета-теги */}
      <html lang={currentLanguage} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="canonical" href={seo.url} />
      <meta name="author" content={site.companyName} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="revisit-after" content="7 days" />

      {/* Viewport и совместимость */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=no" />

      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content={currentLanguage} />
      <meta property="business:contact_data:street_address" content={site.address.street} />
      <meta property="business:contact_data:locality" content={site.address.city} />
      <meta property="business:contact_data:country_name" content={site.address.country} />
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
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/favicon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#ffffff" />

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrg)}
      </script>
    </Helmet>
  );
};

export default SEO; 