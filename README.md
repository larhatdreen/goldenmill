# GoldenMill

## Содержание
- [Установка](#установка)
- [Запуск](#запуск)
- [Деплой](#деплой)
- [Для переводчиков](#для-переводчиков)
- [Для SEO](#для-seo)

## Установка

```bash
yarn install
```

## Запуск

```bash
yarn dev
```

## Деплой

> Деплой берет все что находится в ветке master

```bash
git add .
git commit -m 'Ваш комментарий что изменили'
git push
```

## Для переводчиков

### Где хранятся переводы

В проекте есть три места с переводами:

1. Клиентские переводы (для интерфейса сайта):
   - `src/locales/` - основные переводы
   - `src/components/translation/` - дополнительные переводы

2. Серверные переводы (для email-сообщений):
   - `server/locales/` - переводы для email

### Как изменить перевод

#### Вариант 1: Если вы видите текст на сайте и хотите его изменить

1. На сайте:
   - Найдите текст, который нужно перевести
   - Выделите и скопируйте его (Cmd + C на Mac или Ctrl + C на Windows)

2. В редакторе кода:
   - Откройте проект
   - Откройте файлы переводов для всех языков:
     ```
     src/locales/ru/translation.json
     src/locales/en/translation.json
     src/locales/de/translation.json
     src/components/translation/ru.json
     src/components/translation/en.json
     src/components/translation/de.json
     ```
   - В каждом файле нажмите `Cmd + F` (Mac) или `Ctrl + F` (Windows)
   - Вставьте скопированный текст в поле поиска
   - Ищите строки вида: `"ключ": "ваш текст"`
   - Измените текст внутри кавычек после двоеточия
   - Сохраните файл (`Cmd + S` на Mac или `Ctrl + S` на Windows)

#### Вариант 2: Если вы знаете ключ перевода

1. В редакторе кода:
   - Откройте проект
   - Откройте файлы переводов для всех языков:
     ```
     src/locales/ru/translation.json
     src/locales/en/translation.json
     src/locales/de/translation.json
     src/components/translation/ru.json
     src/components/translation/en.json
     src/components/translation/de.json
     ```
   - В каждом файле нажмите `Cmd + F` (Mac) или `Ctrl + F` (Windows)
   - Введите ключ перевода в поле поиска (например: `"welcomeMessage"`)
   - Найдите строку с ключом
   - Измените текст после двоеточия на новый перевод
   - Сохраните файл

### Важные замечания

1. Поиск в файлах:
   - `Cmd + F` (Mac) или `Ctrl + F` (Windows) - поиск в текущем файле

2. Что нужно проверить:
   - Изменили ли вы перевод во всех языковых файлах (ru, en, de)
   - Правильно ли сохранили формат JSON (кавычки, запятые)
   - Не удалили ли случайно другие ключи
   - Работает ли перевод на сайте

3. Если перевод не отображается:
   - Проверьте, что вы изменили правильный ключ
   - Убедитесь, что сохранили все файлы
   - Перезапустите проект: `yarn dev`
   - Очистите кэш браузера

### Пример

1. Нашли на сайте: "Добро пожаловать"
2. Открываем файлы для всех языков:
   ```
   src/locales/ru/translation.json
   src/locales/en/translation.json
   src/locales/de/translation.json
   src/components/translation/ru.json
   src/components/translation/en.json
   src/components/translation/de.json
   ```
3. В каждом файле ищем строку вида:
   ```json
   "welcomeMessage": "Добро пожаловать"
   ```
4. Меняем текст внутри кавычек после двоеточия
5. Сохраняем все файлы
6. Проверяем на сайте

## Для SEO

### Структура проекта для SEO

Проект имеет следующую структуру для SEO-оптимизации:

1. Основные компоненты:
   - `src/components/SEO.tsx` - главный компонент SEO
   - `src/components/SEO/SEOHead.tsx` - компонент для мета-тегов
   - `src/hooks/useSEO.ts` - хук для работы с SEO-данными

2. Локализация:
   - `src/locales/` - основные переводы
     - `ru/translation.json`
     - `en/translation.json`
     - `de/translation.json`
   - `src/components/translation/` - дополнительные переводы
     - `ru.json`
     - `en.json`
     - `de.json`

3. Страницы с SEO:
   - `src/pages/Home.tsx`
   - `src/pages/About.tsx`
   - `src/pages/Contacts.tsx`
   - `src/pages/Product.tsx`
   - `src/pages/ServiceInformation.tsx`
   - `src/pages/PrivacyPolicy.tsx`
   - `src/pages/Granulator.tsx`
   - `src/pages/Mixer.tsx`

### Как работает SEO в проекте

1. Базовая структура:
   - Каждая страница использует компонент `SEO`
   - SEO-данные берутся из файлов переводов
   - Динамические данные подставляются через хук `useSEO`

2. Процесс работы:
   ```
   Страница -> useSEO -> translation.json -> SEO компонент -> Мета-теги
   ```

3. Многоязычность:
   - Автоматическое определение языка
   - Локализованные мета-теги
   - Alternate language links
   - x-default для поисковых систем

4. Структурированные данные:
   - Organization (компания)
   - WebPage (страница)
   - Product (товары)
   - BreadcrumbList (навигация)
   - ContactPoint (контакты)

### Как изменить SEO-данные

#### 1. Изменение базовых данных

1. Откройте файл перевода:
   ```
   src/locales/[язык]/translation.json
   ```

2. Найдите секцию "seo":
   ```json
   "seo": {
     "defaultTitle": "Заголовок",
     "defaultDescription": "Описание",
     "defaultKeywords": "ключевые слова"
   }
   ```

#### 2. Изменение данных для конкретной страницы

1. Откройте файл перевода
2. Найдите секцию страницы:
   ```json
   "seo": {
     "home": {
       "title": "Заголовок главной",
       "description": "Описание главной",
       "keywords": "ключевые слова"
     }
   }
   ```

#### 3. Добавление новой страницы

1. Создайте компонент страницы в `src/pages/`
2. Добавьте SEO-данные в файлы переводов
3. Используйте компонент SEO:
   ```tsx
   import SEO from '../components/SEO';
   import { useSEO } from '../hooks/useSEO';

   const NewPage = () => {
     const seoData = useSEO('newPage');
     return (
       <>
         <SEO 
           title={seoData.title}
           description={seoData.description}
           keywords={seoData.keywords}
         />
         {/* Контент страницы */}
       </>
     );
   };
   ```

### Важные замечания

1. Структура файлов:
   - Храните все переводы в соответствующих JSON-файлах
   - Не дублируйте SEO-данные в компонентах
   - Используйте хук useSEO для получения данных

2. Многоязычность:
   - Всегда добавляйте переводы для всех языков
   - Проверяйте корректность alternate links
   - Убедитесь в правильности x-default

3. Динамические страницы:
   - Используйте параметры в useSEO
   - Проверяйте корректность подстановки
   - Добавляйте все необходимые Schema.org данные

4. Проверка:
   - Тестируйте все языковые версии
   - Проверяйте валидность Schema.org
   - Тестируйте отображение в соцсетях
   - Проверяйте canonical URL





