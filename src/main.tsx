import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import './components/translation/i18n.ts'
import { HelmetProvider } from 'react-helmet-async'
import { shouldRenderApp } from './staticFileHandler'
import { Provider } from 'react-redux'
import store from './store'

// Проверяем, нужно ли рендерить React-приложение
if (shouldRenderApp()) {
  /* eslint-disable react/jsx-no-undef */
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  )
} else {
  // Для статических файлов не рендерим React-приложение
  console.log('Static file requested, not rendering React app');
}