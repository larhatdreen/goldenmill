import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { CookieSettings } from '../../types/cookie.types';
import { setCookieConsent, getCookieConsent } from '../../utils/cookie.utils';
import { consentManager } from '../../services/consent-manager';
import { sendConsentToBackend } from '../../services/consent.service';
import { logConsent } from '../../services/consent.logger';
import { getURLWithLang } from '../../functions/get-url-with-lang';
import { ParamsType } from '../NavigateProvider';
import { LOCAL_STORAGE_LANGUAGE_KEY, LanguagesEnum } from '../translation/i18n';

const COOKIE_VERSION = '1.0';

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

export const CookieConsentBanner = () => {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);
  const { lang } = useParams<ParamsType>();
  const currentLang = (lang || getStoredLanguage() || 'en') as LanguagesEnum;

  useEffect(() => {
    const existingConsent = getCookieConsent();
    if (!existingConsent || existingConsent.version !== COOKIE_VERSION) {
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  useEffect(() => {
    consentManager.initialize();
  }, []);

  const handleAccept = () => {
    const settings: CookieSettings = {
      accepted: true,
      timestamp: Date.now(),
      version: COOKIE_VERSION,
      consents: {
        necessary: true,
        analytics: true,
        marketing: true,
        functional: true,
        geolocation: true,
      },
    };
    
    setCookieConsent(settings);
    consentManager.updateConsent(settings);
    sendConsentToBackend(settings);
    logConsent(settings);
    
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 animate-slideUp z-50">
      <div className="bg-gradient-to-r from-[#1A1B1C] via-[#28292a] to-[#1A1B1C] backdrop-blur-sm border-t border-[#2C2D2F] relative">
        <button
          onClick={() => setShowBanner(false)}
          className="absolute top-3 right-3 text-[#605C54] hover:text-gray-400 transition-colors duration-300 p-1 opacity-50 hover:opacity-100 z-10"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
        <div className="max-w-7xl mx-auto p-3 pr-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-col items-center sm:items-start gap-3 w-full sm:w-auto">
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <p className="text-[#A19F9B] text-xs font-normal">
                  {t('cookie.simpleDescription')}
                </p>
                <p className="text-[#605C54] text-[10px]">
                  {t('cookie.privacyNote')}{' '}
                  <Link 
                    to={getURLWithLang('cookie-policy', currentLang)}
                    className="text-[#82653E] hover:text-[#9E7B4F] transition-colors duration-300 underline opacity-75 hover:opacity-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {t('cookie.learnMore')}
                  </Link>
                </p>
              </div>
            </div>
            <button
              onClick={handleAccept}
              className="relative overflow-hidden px-4 py-2 rounded-lg text-xs bg-[#544B3C] hover:bg-[#3D3629] text-[#D5CDBD] font-normal transform transition-all duration-300 hover:scale-105 opacity-75 hover:opacity-100 whitespace-nowrap w-full sm:w-auto flex justify-center"
            >
              <span className="relative z-10">{t('cookie.accept')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 