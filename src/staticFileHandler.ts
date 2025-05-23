// Функция для проверки, является ли текущий URL статическим файлом
export const isStaticFile = (url: string): boolean => {
  // Список статических файлов, которые не должны обрабатываться React Router
  const staticFiles = [
    '/robots.txt',
    '/sitemap.xml',
    '/site.webmanifest',
    '/favicon.ico',
    '/favicon.png',
    '/favicon.svg',
    '/logo.svg',
    '/logo_mini.svg',
  ];
  
  return staticFiles.some(file => url.endsWith(file));
};

// Функция для проверки, нужно ли рендерить React-приложение
export const shouldRenderApp = (): boolean => {
  const url = window.location.pathname;
  return !isStaticFile(url);
}; 