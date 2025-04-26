import React from 'react';
import SEO from '../components/SEO';
import { useSEO } from '../hooks/useSEO';

const Shell: React.FC = () => {
  const seoData = useSEO('shell');

  return (
    <>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
      />
      {/* Существующий контент страницы */}
    </>
  );
};

export default Shell; 