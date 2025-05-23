import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  article?: boolean;
  noindex?: boolean;
}

export const SEOHead: React.FC<SEOProps> = ({
  title = 'Golden Mill - Industrial Equipment Parts',
  description = 'GOLDENMILL supplies technical spare parts for industrial equipment, including dies, mixers, rollers for pellet mills, eccentric shafts, hammers, and more.',
  keywords = 'industrial equipment, spare parts, dies, shells, mixers, rollers, pellet mills',
  image = '/logo.svg',
  article = false,
  noindex = false,
}) => {
  const { pathname } = useLocation();
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://goldenmill.de';

  // Определяем текущий язык из пути
  const currentLang = pathname.startsWith('/de') ? 'de' : 
                     pathname.startsWith('/ru') ? 'ru' : 'en';

  // Определяем локаль для Open Graph
  const ogLocale = currentLang === 'de' ? 'de_DE' : 
                   currentLang === 'ru' ? 'ru_RU' : 'en_US';

  const seo = {
    title: title,
    description: description,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname}`,
    keywords: keywords,
  };

  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    '@id': seo.url,
    url: seo.url,
    name: seo.title,
    description: seo.description,
    inLanguage: currentLang,
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'LKT Group GmbH',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.svg`,
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Lindenstraße 48-52',
        addressLocality: 'Düsseldorf',
        addressRegion: 'North Rhine-Westphalia',
        addressCountry: 'DE',
        postalCode: '40233'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+49 (0) 211 9891272',
        email: 'info@goldenmill.de',
        contactType: 'customer service',
        availableLanguage: ['German', 'English', 'Russian']
      }
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [{
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': siteUrl,
          name: 'Home'
        }
      }]
    }
  };

  return (
    <Helmet>
      <html lang={currentLang} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="author" content="LKT Group GmbH" />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      <meta name="googlebot" content={noindex ? "noindex,nofollow" : "index,follow"} />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:site_name" content="LKT Group GmbH" />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="de_DE" />
      <meta property="og:locale:alternate" content="ru_RU" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />

      {/* Alternate Language Links */}
      <link rel="alternate" hrefLang="de" href={`${siteUrl}/de${pathname.replace(/^\/[a-z]{2}/, '')}`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en${pathname.replace(/^\/[a-z]{2}/, '')}`} />
      <link rel="alternate" hrefLang="ru" href={`${siteUrl}/ru${pathname.replace(/^\/[a-z]{2}/, '')}`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${pathname.replace(/^\/[a-z]{2}/, '')}`} />

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgWebPage)}
      </script>
    </Helmet>
  );
}; 