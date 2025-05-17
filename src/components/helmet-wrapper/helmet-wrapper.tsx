import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const getWindowHref = () => {
  if (typeof window === 'undefined') return '';
  return window.location.href;
}

const getDocument = () => {
  if (typeof document === 'undefined') return null;
  return document;
}

const updateMetaTag = (name: string, content: string) => {
  const doc = getDocument();
  if (!doc) return;

  let meta = doc.querySelector(`meta[name="${name}"]`);
  if (meta) {
    meta.setAttribute('content', content);
  } else {
    meta = doc.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    doc.head.appendChild(meta);
  }
}

const updateOgMetaTag = (property: string, content: string) => {
  const doc = getDocument();
  if (!doc) return;

  let meta = doc.querySelector(`meta[property="${property}"]`);
  if (meta) {
    meta.setAttribute('content', content);
  } else {
    meta = doc.createElement('meta');
    meta.setAttribute('property', property);
    meta.setAttribute('content', content);
    doc.head.appendChild(meta);
  }
}

export const HelmetWrapper = () => {
  const location = useLocation();
  
  useEffect(() => {
    const doc = getDocument();
    if (!doc) return;

    const path = location.pathname;
    let title = 'Golden Mill';
    let description = 'Default description';

    // Определяем заголовок на основе пути
    if (path.includes('/granulator')) {
      title = 'Golden Mill | Granulator';
      description = 'Granulator page description';
    } else if (path.includes('/mixer')) {
      title = 'Golden Mill | Mixer';
      description = 'Mixer page description';
    } else if (path.includes('/about')) {
      title = 'Golden Mill | About';
      description = 'About page description';
    }
    // и т.д. для других путей

    // Обновляем мета-теги
    doc.title = title;
    updateMetaTag('description', description);

    // Другие мета-теги
    const metaTags = {
      'og:title': title,
      'og:description': description,
      'og:type': 'website',
      'og:url': getWindowHref(),
    };

    Object.entries(metaTags).forEach(([property, content]) => {
      updateOgMetaTag(property, content);
    });
  }, [location]);

  return null;
};
