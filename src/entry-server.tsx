import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './components/translation/i18n.ts';

interface HelmetContext {
  helmet: HelmetServerState;
}

// Функция для очистки классов контейнера
const cleanContainerClasses = (html: string): string => {
  // Находим div с классом min-h-screen и удаляем все его классы
  return html.replace(
    /<div class="[^"]*min-h-screen[^"]*">/g,
    '<div>'
  );
};

export async function render(url: string) {
  const helmetContext: HelmetContext = {} as HelmetContext;
  const appHtml = ReactDOMServer.renderToString(
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </Provider>
  );

  // Очищаем классы контейнера
  const cleanedHtml = cleanContainerClasses(appHtml);

  return { appHtml: cleanedHtml, helmet: helmetContext.helmet };
}