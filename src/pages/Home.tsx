import React from 'react';
import SEO from '../components/SEO';
import { useSEO } from '../hooks/useSEO';

const Home: React.FC = () => {
  const seoData = useSEO('home');

  return (
    <>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
      />
      {/* Остальной контент страницы */}
    </>
  );
};

export default Home; 