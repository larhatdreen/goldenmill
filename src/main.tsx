import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css';
import './components/translation/i18n.ts';
import { shouldRenderApp } from './staticFileHandler';

// Безопасная проверка для window
const isBrowser = typeof window !== 'undefined';

// Безопасное получение root элемента
const getRootElement = () => {
  if (!isBrowser) return null;
  return document.getElementById('root');
};

// Проверяем, нужно ли рендерить React-приложение
if (isBrowser && shouldRenderApp()) {
  console.log('shouldRenderApp:', shouldRenderApp(), 'Path:', window.location.pathname);
  const root = getRootElement();
  if (root) {
    ReactDOM.hydrateRoot(
      root,
      <React.StrictMode>
        <Provider store={store}>
          <HelmetProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </HelmetProvider>
        </Provider>
      </React.StrictMode>
    );
  }
} else if (isBrowser) {
  // Для статических файлов не рендерим React-приложение
  console.log('Static file requested, not rendering React app');
}