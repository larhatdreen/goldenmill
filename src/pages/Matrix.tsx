import React from 'react';
import SEO from '../components/SEO';
import { useSEO } from '../hooks/useSEO';

const Matrix: React.FC = () => {
  const seoData = useSEO('matrix');

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

export default Matrix; 