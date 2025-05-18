import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './components/translation/i18n';

interface HelmetContext {
  helmet: HelmetServerState;
}

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

  return { appHtml: appHtml, helmet: helmetContext.helmet };
}