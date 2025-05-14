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
  const siteUrl = 'https://goldenmill.de'; // Замените на ваш домен

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
    url: seo.url,
    name: seo.title,
    description: seo.description,
    publisher: {
      '@type': 'Organization',
      name: 'Golden Mill',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.svg`,
      },
    },
  };

  return (
    <Helmet>
      <html lang="en" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? 'article' : 'website'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgWebPage)}
      </script>
    </Helmet>
  );
}; 