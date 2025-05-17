import { useEffect } from 'react';

const PreloadComponents = () => {
  useEffect(() => {
    // Предварительная загрузка компонентов
    const preloadComponents = async () => {
      const components = [
        () => import('./Granulator1'),
        () => import('./Granulator2'),
        () => import('./Granulator3'),
        () => import('./Mixer1'),
        () => import('./Mixer2'),
        () => import('./Mixer3'),
        () => import('./Mixer4')
      ];

      // Загружаем компоненты с низким приоритетом
      components.forEach(component => {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'modulepreload';
        preloadLink.href = component.toString();
        document.head.appendChild(preloadLink);
      });
    };

    // Запускаем предварительную загрузку после загрузки страницы
    if (typeof window !== 'undefined') {
      window.requestIdleCallback(() => {
        preloadComponents();
      });
    }
  }, []);

  return null;
};

export default PreloadComponents; 