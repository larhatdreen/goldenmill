import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import './components/translation/i18n.ts'
import { HelmetProvider } from 'react-helmet-async'
import { shouldRenderApp } from './staticFileHandler'

// Проверяем, нужно ли рендерить React-приложение
if (shouldRenderApp()) {
  /* eslint-disable react/jsx-no-undef */
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  )
} else {
  // Для статических файлов не рендерим React-приложение
  console.log('Static file requested, not rendering React app');
}
