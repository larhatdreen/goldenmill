import MainSection from './components/MainSection.tsx'
import Section1 from './components/Section1.tsx'
import Section2 from './components/Section2.tsx'
import Section3 from './components/Section3.tsx'
import Section4 from './components/Section4.tsx'
import Section5 from './components/Section5.tsx'
import Section6 from './components/Section6.tsx'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import About from './components/About.tsx'
import Contacts from './components/Contacts.tsx'
import PageNotFound from './pages/PageNotFound.tsx'
import PrivacyPolicy from './components/PrivacyPolicy.tsx'
import CookiePolicy from './components/CookiePolicy.tsx'
import Section1Mixer from './components/Section1Mixer.tsx'
import Section2Mixer from './components/Section2Mixer.tsx'
import Section3Mixer from './components/Section3Mixer.tsx'
import ServiceInformation from './components/ServiceInformation.tsx'
import { Wrapper } from './components/Wrapper.tsx'
import { NavigateProvider } from './components/NavigateProvider.tsx'
import { HelmetWrapper } from './components/helmet-wrapper/helmet-wrapper.tsx'
import { Suspense } from 'react'
import { CookieConsentBanner } from './components/CookieConsent/CookieConsentBanner'
import SpareParts from './components/SpareParts'
import AdminPanel from './components/admin/AdminPanel'
import ProductLanding from './components/ProductLanding'
import { isStaticFile } from './staticFileHandler'
import SEO from './components/SEO'
import ThemeBodySync from './components/ThemeBodySync'
import { useSEO } from './hooks/useSEO'
import { useGeolocation, getLanguageFromCoordinates } from './hooks/useGeolocation'
import { LOCAL_STORAGE_LANGUAGE_KEY, LanguagesEnum } from './components/translation/i18n'

// Безопасное получение языка из localStorage
const getStoredLanguage = (): LanguagesEnum | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const stored = window.localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY)
    if (stored && Object.values(LanguagesEnum).includes(stored as LanguagesEnum)) {
      return stored as LanguagesEnum
    }
  }
  return null
}

// Безопасное сохранение языка в localStorage
const setStoredLanguage = (language: LanguagesEnum): void => {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, language)
  }
}

function App() {
  const location = useLocation();
  const { latitude, longitude } = useGeolocation();
  const seoData = useSEO('home');

  // Проверяем, является ли текущий URL статическим файлом
  if (isStaticFile(location.pathname)) {
    return null; // Не рендерим приложение для статических файлов
  }

  // Функция для определения языка из URL, localStorage или геолокации
  const getLanguageFromPath = (): LanguagesEnum => {
    const pathParts = location.pathname.split('/');
    if (pathParts[1] && Object.values(LanguagesEnum).includes(pathParts[1] as LanguagesEnum)) {
      return pathParts[1] as LanguagesEnum;
    }
    
    // Проверяем сохраненный язык в localStorage
    const savedLanguage = getStoredLanguage();
    if (savedLanguage) {
      return savedLanguage;
    }
    
    // Если есть координаты, используем их для определения языка
    if (latitude && longitude) {
      const geoLanguage = getLanguageFromCoordinates(latitude, longitude);
      // Сохраняем определенный по геолокации язык
      setStoredLanguage(geoLanguage);
      return geoLanguage;
    }
    
    return LanguagesEnum.ENGLISH; // Дефолтный язык
  };

  // Функция для перенаправления на правильный языковой маршрут
  const getRedirectPath = () => {
    const currentLang = getLanguageFromPath();
    // Если язык не определен, используем дефолтный язык
    const lang = currentLang || LanguagesEnum.ENGLISH;
    return `/${lang}/granulator`;
  };

  return (
    <>
      <ThemeBodySync />
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
      />
      <div className='min-h-screen flex flex-col items-center'>
        <HelmetWrapper />
        <Suspense fallback='loading'>
          <Routes>
            {/* Редирект с корневого пути на языковой маршрут */}
            <Route
              path='/'
              element={<Navigate to={getRedirectPath()} replace />}
            />

            {/* Редирект с языкового пути на granulator */}
            <Route
              path=':lang'
              element={
                <NavigateProvider>
                  <Navigate to={getRedirectPath()} replace />
                </NavigateProvider>
              }
            />

            {/* Языковые маршруты */}
            <Route path=':lang'>
              <Route
                path='granulator'
                element={
                  <Wrapper>
                    <MainSection type='Granulator' />
                    <Section1 />
                    <Section2 />
                    <Section3 />
                    <Section4 />
                    <Section5 />
                    <Section6 />
                  </Wrapper>
                }
              />
              <Route
                path='mixer'
                element={
                  <Wrapper>
                    <MainSection type='Mixer' />
                    <Section1Mixer />
                    <Section2Mixer />
                    <Section3Mixer />
                  </Wrapper>
                }
              />
              <Route
                path='about'
                element={
                  <Wrapper>
                    <About />
                  </Wrapper>
                }
              />
              <Route
                path='contacts'
                element={
                  <Wrapper>
                    <Contacts />
                  </Wrapper>
                }
              />
              <Route
                path='serviceinformation'
                element={
                  <Wrapper>
                    <ServiceInformation />
                  </Wrapper>
                }
              />
              <Route
                path='privacypolicy'
                element={
                  <Wrapper>
                    <PrivacyPolicy />
                  </Wrapper>
                }
              />
              <Route
                path='cookie-policy'
                element={
                  <Wrapper>
                    <CookiePolicy />
                  </Wrapper>
                }
              />
              <Route
                path='spare-parts'
                element={
                  <Wrapper>
                    <SpareParts />
                  </Wrapper>
                }
              />
              <Route
                path='product/:id'
                element={
                  <Wrapper>
                    <ProductLanding />
                  </Wrapper>
                }
              />
              <Route
                path='admin'
                element={<AdminPanel />}
              />
            </Route>

            {/* Админ маршруты - вне языковых маршрутов */}
            <Route path='admin'>
              <Route path='login' element={<AdminPanel />} />
              <Route index element={<AdminPanel />} />
            </Route>

            {/* 404 для неизвестных маршрутов */}
            <Route
              path='*'
              element={
                <Wrapper>
                  <PageNotFound />
                </Wrapper>
              }
            />
          </Routes>
        </Suspense>
        <CookieConsentBanner />
      </div>
    </>
  );
}

export default App;
