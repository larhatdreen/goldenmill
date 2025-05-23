# Документация по SEO в проекте GoldenMill 

## Общая информация

В проекте реализована система SEO с двумя уровнями статических файлов и двумя компонентами для разных типов страниц. Динамической генерации sitemap нет, все файлы статические.

## Структура файлов

### 1. Статические файлы SEO

#### Основная директория (`/public`)
```
/public
├── robots.txt          # Правила для поисковых роботов
├── sitemap_index.xml   # Главный sitemap
├── sitemap_ru.xml      # Sitemap для русской версии
├── sitemap_de.xml      # Sitemap для немецкой версии
├── sitemap_en.xml      # Sitemap для английской версии
├── site.webmanifest    # PWA манифест
├── favicon.ico         # Favicon для старых браузеров
├── favicon.png         # Favicon для современных браузеров
├── favicon.svg         # Favicon в векторном формате
├── logo.svg           # Основной логотип
└── logo_mini.svg      # Мини-версия логотипа
```

#### Резервная директория (`/server/public`)
```
/server/public
├── robots.txt          # Резервные правила для роботов
├── sitemap_index.xml   # Резервный главный sitemap
├── sitemap_ru.xml      # Резервный sitemap для RU
├── sitemap_de.xml      # Резервный sitemap для DE
├── sitemap_en.xml      # Резервный sitemap для EN
├── products_sitemap.xml # Sitemap для продуктов
└── site.webmanifest    # Резервный PWA манифест
```

## Логика работы

### 1. Обработка запросов
1. Запрос приходит на Nginx
2. Nginx проверяет URL на соответствие паттерну SEO файлов
3. Если соответствует:
   - Сначала ищет в статических файлах (`/public`)
   - Если не находит, передает запрос на Node.js
4. Node.js ищет файл в своей директории (`/server/public`)
5. Результат возвращается клиенту с соответствующими заголовками кэширования

### 2. Приоритет файлов
- Файлы из `/public` имеют приоритет над файлами из `/server/public`
- При отсутствии файла в `/public`, используется файл из `/server/public`
- Если файл не найден нигде, возвращается 404

## Компоненты

### 1. `SEO.tsx`
Компонент для страниц продуктов. Содержит:
- Schema.org разметку для продуктов
- Расширенные мета-теги
- Мультиязычность
- PWA поддержку
- Open Graph теги
- Twitter Card теги

### 2. `SEOHead.tsx`
Компонент для обычных страниц. Содержит:
- Базовые мета-теги
- Мультиязычность
- Open Graph теги
- Twitter Card теги
- Canonical URLs

## Примеры использования

### 1. SEO.tsx для страницы продукта
```tsx
<SEO
  title="Название продукта"
  description="Описание продукта"
  product={{
    name: "Название продукта",
    description: "Описание продукта",
    image: "/images/product.jpg",
    price: "1000",
    availability: "InStock",
    brand: "GoldenMill"
  }}
/>
```

### 2. SEOHead.tsx для обычной страницы
```tsx
<SEOHead
  title="Заголовок страницы"
  description="Описание страницы"
  keywords="ключевые, слова, через, запятую"
/>
```

## Конфигурация Nginx

### Обработка SEO файлов
```nginx
# Статические SEO файлы
location ~ ^/(robots\.txt|sitemap.*\.xml|site\.webmanifest|favicon\.(ico|png|svg)|logo.*\.svg|icon\.svg)$ {
    try_files $uri @server_seo;
    expires 1d;
    add_header Cache-Control "public, no-transform";
}

# Резервная обработка
location @server_seo {
    proxy_pass http://localhost:3002;
    expires 1h;
    add_header Cache-Control "public, no-transform";
}
```

## Процесс деплоя

### 1. Бэкап существующих файлов
```yaml
- name: Backup existing SEO files
  script: |
    BACKUP_DIR="/var/www/goldenmill/prod/seo-backup-$(date +%Y%m%d-%H%M%S)"
    mkdir -p "$BACKUP_DIR/dist" "$BACKUP_DIR/server"
    cp -r /var/www/goldenmill/prod/dist/{robots.txt,sitemap*.xml,site.webmanifest,favicon.*} "$BACKUP_DIR/dist/"
    cp -r /var/www/goldenmill/prod/server/public/{robots.txt,sitemap*.xml,site.webmanifest} "$BACKUP_DIR/server/"
```

### 2. Деплой статических файлов
```yaml
- name: Deploy static SEO files
  source: "public/{robots.txt,sitemap*.xml,site.webmanifest,favicon.*}"
  target: "/var/www/goldenmill/prod/dist"
```

### 3. Деплой серверных файлов
```yaml
- name: Deploy server files
  source: "server/*"
  target: "/var/www/goldenmill/prod/server"
```

### 4. Верификация
- Проверка наличия файлов
- Проверка размеров
- Проверка доступности через Nginx
- Проверка логов

## Тестирование

### Скрипт проверки (`seo-check.sh`)
Скрипт проверяет:
- Зависимости
- Мета-теги
- Заголовки
- Изображения
- Многоязычность
- PWA
- Производительность

## Отладка

### 1. Проверка доступности файлов
```bash
# Проверка статических файлов
curl -I https://goldenmill.de/robots.txt
curl -I https://goldenmill.de/sitemap_index.xml
curl -I https://goldenmill.de/site.webmanifest

# Проверка серверных файлов
curl -I https://goldenmill.de/api/seo/robots.txt
```

### 2. Проверка кэширования
```bash
# Проверка заголовков кэширования
curl -I https://goldenmill.de/robots.txt | grep -i "cache-control"
curl -I https://goldenmill.de/sitemap_index.xml | grep -i "cache-control"
```


## Важные моменты

### 1. Две директории
- `/public` - основная директория
- `/server/public` - резервная директория
- Нет динамического sitemap

### 2. Два компонента
- `SEO.tsx` для продуктов
- `SEOHead.tsx` для обычных страниц

### 3. Кэширование
- Статические файлы: 1 день
- Серверные файлы: 1 час


## Мониторинг
- Регулярные проверки через `seo-check.sh`
- Мониторинг логов Nginx
- Проверка через инструменты Google Search Console

## Возможные проблемы

### 1. Дублирование файлов
- Файлы в `/public` и `/server/public` могут отличаться
- Приоритет у файлов из `/public`

### 2. Кэширование
- Статические файлы кэшируются на 1 день
- Серверные файлы кэшируются на 1 час
- При изменении файлов нужно учитывать время кэширования

### 3. Права доступа
- Все файлы должны быть доступны для чтения
- Nginx должен иметь доступ к файлам

## FAQ

- `/public` - основная директория для статических файлов
- `/server/public` - резервная директория на случай проблем с основной

### 2. Как обновить sitemap?
1. Обновить файлы в `/public`
2. Создать резервные копии в `/server/public`
3. Задеплоить изменения
4. Проверить доступность через Nginx

### 3. Что делать если файлы не обновляются?
1. Проверить права доступа
2. Проверить кэширование
3. Очистить кэш Nginx
4. Проверить логи на ошибки

## Рекомендации

### 1. Перед деплоем
- Проверить содержимое всех SEO файлов
- Убедиться, что все пути в sitemap корректны
- Проверить robots.txt на правильность правил

### 2. После деплоя
- Проверить доступность всех файлов
- Проверить кэширование
- Проверить логи на ошибки

### 3. Регулярно
- Проверять актуальность sitemap
- Обновлять robots.txt при необходимости
- Мониторить логи на ошибки

## Планы по развитию

### 1. Краткосрочные планы
- [ ] Добавить динамическую генерацию sitemap
- [ ] Улучшить мониторинг
- [ ] Добавить автоматические проверки

### 2. Долгосрочные планы
- [ ] Интеграция с Google Search Console
- [ ] Автоматическая оптимизация мета-тегов
- [ ] Улучшение Schema.org разметки

