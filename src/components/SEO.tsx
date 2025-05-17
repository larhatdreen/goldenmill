import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  article?: boolean;
  product?: {
    name?: string;
    description?: string;
    image?: string;
    price?: string;
    brand?: string;
    model?: string;
    category?: string;
    availability?: string;
    technicalSpecification?: string;
    manufacturingDetails?: string;
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
      addressCountry: string;
      postalCode: string;
    };
    contactPoint: {
      '@type': string;
      telephone: string;
      email: string;
      contactType: string;
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
  image = '/icon.svg',
  type = 'website',
  product
}) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLanguage = i18n.language;

  const site = {
    name: 'GoldenMill',
    url: 'https://goldenmill.de',
    logo: 'https://goldenmill.de/icon.svg',
    email: 'info@goldenmill.de',
    phone: '+49 123 456 789',
    address: {
      street: 'Musterstraße 123',
      city: 'Berlin',
      country: 'Germany',
      postalCode: '12345'
    }
  };

  const seo = {
    title: title ? `${title} | ${site.name}` : t('seo.defaultTitle'),
    description: description || t('seo.defaultDescription'),
    keywords: keywords || t('seo.defaultKeywords'),
    image: image.startsWith('http') ? image : `${site.url}${image}`,
    url: `${site.url}${location.pathname}`
  };

  const schemaOrg: SchemaOrg = {
    '@context': 'https://schema.org',
    '@type': type === 'product' ? 'Product' : 'WebSite',
    '@id': `${site.url}#${type}`,
    name: seo.title,
    description: seo.description,
    url: seo.url,
    image: seo.image,
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: {
        '@type': 'ImageObject',
        url: site.logo
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: site.phone,
        email: site.email,
        contactType: 'customer service'
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country
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

  if (type === 'product' && product) {
    Object.assign(schemaOrg, {
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.image,
      brand: {
        '@type': 'Brand',
        name: product.brand || site.name
      },
      model: product.model,
      category: product.category,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: site.name
        }
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Technical Specification',
          value: product.technicalSpecification
        },
        {
          '@type': 'PropertyValue',
          name: 'Manufacturing Details',
          value: product.manufacturingDetails
        }
      ].filter(prop => prop.value)
    });
  }

  return (
    <Helmet>
      {/* Основные мета-теги */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content={currentLanguage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Дополнительные мета-теги */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content={currentLanguage} />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content={site.name} />

      {/* Альтернативные языковые версии */}
      <link rel="alternate" hrefLang="x-default" href={site.url} />
      <link rel="alternate" hrefLang="ru" href={`${site.url}/ru${location.pathname}`} />
      <link rel="alternate" hrefLang="en" href={`${site.url}/en${location.pathname}`} />
      <link rel="alternate" hrefLang="de" href={`${site.url}/de${location.pathname}`} />

      {/* Канонический URL */}
      <link rel="canonical" href={seo.url} />

      {/* Структурированные данные */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrg)}
      </script>
    </Helmet>
  );
};

export default SEO; 