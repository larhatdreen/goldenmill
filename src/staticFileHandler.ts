// Функция для проверки, является ли текущий URL статическим файлом
export const isStaticFile = (url: string): boolean => {
  // Список статических файлов, которые не должны обрабатываться React Router
  const staticFiles = [
    '/robots.txt',
    '/sitemap.xml',
    '/site.webmanifest',
    '/favicon.ico',
    '/logo.svg',
    '/logo_mini.svg',
    '/icon.svg'
  ];
  
  return staticFiles.some(file => url.endsWith(file));
};

const getPath = () => {
  if (typeof window === 'undefined') return '';
  const url = window.location.pathname;
  return url;
}

// Функция для проверки, нужно ли рендерить React-приложение
export const shouldRenderApp = (): boolean => {
  const url = getPath();
  return !isStaticFile(url);
}; 