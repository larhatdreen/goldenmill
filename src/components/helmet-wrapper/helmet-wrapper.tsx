import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const HelmetWrapper = () => {
  const location = useLocation();
  
  useEffect(() => {
    const path = location.pathname;
    let title = 'Golden Die';
    let description = 'Default description';

    // Определяем заголовок на основе пути
    if (path.includes('/matrix')) {
      title = 'Golden Die | Matrix';
      description = 'Matrix page description';
    } else if (path.includes('/shell')) {
      title = 'Golden Die | Shell';
      description = 'Shell page description';
    } else if (path.includes('/about')) {
      title = 'Golden Die | About';
      description = 'About page description';
    }
    // и т.д. для других путей

    // Обновляем мета-теги
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Другие мета-теги
    const metaTags = {
      'og:title': title,
      'og:description': description,
      'og:type': 'website',
      'og:url': window.location.href,
    };

    Object.entries(metaTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    });
  }, [location]);

  return null;
};
