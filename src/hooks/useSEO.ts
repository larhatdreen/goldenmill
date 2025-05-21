import { useTranslation } from 'react-i18next';

interface SEOData {
  title: string;
  description: string;
  keywords: string;
}

export const useSEO = (page: string, params?: { [key: string]: string }) => {
  const { t } = useTranslation();

  const getSEOData = (): SEOData => {
    const basePath = `seo.${page}`;
    let title = t(`${basePath}.title`);
    let description = t(`${basePath}.description`);
    let keywords = t(`${basePath}.keywords`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`;
        title = title.replace(placeholder, value);
        description = description.replace(placeholder, value);
        keywords = keywords.replace(placeholder, value);
      });

      if (params.categoryKey) {
        const categoryLabel = t(`products.categories.${params.categoryKey}`);
        title = title.replace('{{category}}', categoryLabel);
        description = description.replace('{{category}}', categoryLabel);
        keywords = keywords.replace('{{category}}', categoryLabel);
      }
    }

    if (!keywords.includes('LKE Group GmbH')) {
      keywords = `${keywords}, LKE Group GmbH, GoldenMill`;
    }

    return { title, description, keywords };
  };

  return getSEOData();
};