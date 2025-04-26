import React from 'react';
import SEO from '../components/SEO';
import { useSEO } from '../hooks/useSEO';

const About: React.FC = () => {
  const seoData = useSEO('about');

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

export default About; 