const path = require('path');
const fs = require('fs');

// Список статических файлов, которые должны обрабатываться напрямую
const staticFiles = [
  '/robots.txt',
  '/sitemap.xml',
  '/site.webmanifest',
  '/favicon.ico',
  '/logo.png',
  '/logo_mini.png',
  '/icon.svg'
];

// Middleware для обработки статических файлов
const staticFileMiddleware = (req, res, next) => {
  const url = req.url;
  
  console.log(`[StaticFileMiddleware] Проверка URL: ${url}`);
  
  // Проверяем, является ли запрошенный URL статическим файлом
  if (staticFiles.some(file => url === file)) {
    const filePath = path.join(__dirname, '..', 'public', url);
    
    console.log(`[StaticFileMiddleware] Обнаружен статический файл: ${url}, путь: ${filePath}`);
    
    // Проверяем, существует ли файл
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // Файл не найден, продолжаем обработку запроса
        console.log(`[StaticFileMiddleware] Статический файл не найден: ${filePath}`);
        return next();
      }
      
      // Определяем Content-Type на основе расширения файла
      let contentType = 'text/plain';
      if (url.endsWith('.xml')) {
        contentType = 'application/xml';
      } else if (url.endsWith('.json') || url.endsWith('.webmanifest')) {
        contentType = 'application/json';
      } else if (url.endsWith('.ico')) {
        contentType = 'image/x-icon';
      } else if (url.endsWith('.png')) {
        contentType = 'image/png';
      } else if (url.endsWith('.svg')) {
        contentType = 'image/svg+xml';
      }
      
      console.log(`[StaticFileMiddleware] Отправка файла ${url} с Content-Type: ${contentType}`);
      
      // Отправляем файл с правильным Content-Type
      res.setHeader('Content-Type', contentType);
      fs.createReadStream(filePath).pipe(res);
    });
  } else {
    // Не статический файл, продолжаем обработку запроса
    console.log(`[StaticFileMiddleware] URL ${url} не является статическим файлом, продолжаем обработку`);
    next();
  }
};

module.exports = staticFileMiddleware; 