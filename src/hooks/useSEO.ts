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

    // Replace dynamic parameters if they exist
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`;
        title = title.replace(placeholder, value);
        description = description.replace(placeholder, value);
        keywords = keywords.replace(placeholder, value);
      });
    }

    // Добавляем LKE Group GmbH в ключевые слова, если их еще нет
    if (!keywords.includes('LKE Group GmbH')) {
      keywords = `${keywords}, LKE Group GmbH, GoldenDie`;
    }

    return {
      title,
      description,
      keywords
    };
  };

  return getSEOData();
}; 