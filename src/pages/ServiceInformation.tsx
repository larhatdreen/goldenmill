import React from 'react';
import SEO from '../components/SEO';
import { useSEO } from '../hooks/useSEO';

const ServiceInformation: React.FC = () => {
  const seoData = useSEO('serviceInformation');

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

export default ServiceInformation; 