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
import PreloadComponents from './components/PreloadComponents'
import { useSEO } from './hooks/useSEO'

function App() {
  const location = useLocation();
  const defaultLanguage = 'de';
  const seoData = useSEO('home');

  // Проверяем, является ли текущий URL статическим файлом
  if (isStaticFile(location.pathname)) {
    return null; // Не рендерим приложение для статических файлов
  }

  // Функция для определения языка из URL
  const getLanguageFromPath = () => {
    const pathParts = location.pathname.split('/');
    if (pathParts[1] && ['en', 'de', 'ru'].includes(pathParts[1])) {
      return pathParts[1];
    }
    return defaultLanguage;
  };

  // Функция для перенаправления на правильный языковой маршрут
  const getRedirectPath = () => {
    const currentLang = getLanguageFromPath();
    // Если язык не определен, используем дефолтный язык
    const lang = currentLang || defaultLanguage;
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
      <PreloadComponents />
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
