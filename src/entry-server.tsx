import React from 'react';
import ReactDOMServer from 'react-dom/server';
// @ts-expect-error
import { StaticRouter } from 'react-router-dom/server.mjs';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './store/index.js';
import App from './App.js';
import './components/translation/i18n';

interface HelmetContext {
  helmet: HelmetServerState;
}

export function render(url: string) {
  const helmetContext: HelmetContext = {} as HelmetContext;
  const appHtml = ReactDOMServer.renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </Provider>
    </React.StrictMode>
  );

  return { appHtml, helmet: helmetContext.helmet };
}