import React from 'react';
import SEO from '../components/SEO';
import { useSEO } from '../hooks/useSEO';
import { useTranslation } from 'react-i18next';

interface ProductProps {
  product: {
    title: {
      ru: string;
      en: string;
      de: string;
    };
    description: {
      ru: string;
      en: string;
      de: string;
    };
    imageUrl: string;
  };
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language as 'ru' | 'en' | 'de';
  
  const seoData = useSEO('product', {
    productName: product.title[currentLanguage],
    productDescription: product.description[currentLanguage]
  });

  return (
    <>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        image={product.imageUrl}
      />
      {/* Существующий контент страницы */}
    </>
  );
};

export default Product; 