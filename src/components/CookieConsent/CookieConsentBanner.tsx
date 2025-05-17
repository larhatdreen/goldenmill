import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CookieSettings } from '../../types/cookie.types';
import { setCookieConsent, getCookieConsent } from '../../utils/cookie.utils';
import { consentManager } from '../../services/consent-manager';
import { sendConsentToBackend } from '../../services/consent.service';
import { logConsent } from '../../services/consent.logger';
import { getURLWithLang } from '../../functions/get-url-with-lang';
import { LanguagesEnum } from '../translation/i18n';
import { useTheme } from '../../hooks/useTheme';
import { scrollToTop } from '../../utils/scrollToTop';

const COOKIE_VERSION = '1.0';

export const CookieConsentBanner = () => {
  const { t, i18n } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);
  const currentLang = i18n.language as LanguagesEnum;
  const theme = useTheme();
  const isDark = theme.name === 'dark';

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
      {/* className={`bg-gradient-to-r 
          ${isDark
            ? 'from-[#1A1B1C] via-[#28292a] to-[#1A1B1C] border-[transparent]'
            : 'from-[#F8F8F9] via-[#E9E9EA] to-[#F8F8F9] border-[#82653F]'}
          backdrop-blur-sm border-t relative`}
      > */}
        <button
          onClick={() => setShowBanner(false)}
          className="absolute top-3 right-3 text-[#605C54] hover:text-gray-400 transition-colors duration-300 p-1 opacity-50 hover:opacity-100 z-10"
          // className={`absolute top-3 right-3 transition-colors duration-300 p-1 opacity-50 hover:opacity-100 z-10 ${
          //   isDark 
          //     ? 'text-[#605C54] hover:text-gray-400' 
          //     : 'text-[#B0AFAE] hover:text-[#82653E]'
          // }`}
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
        <div className="max-w-7xl mx-auto p-3 pr-12 pb-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-col items-center sm:items-start gap-3 w-full sm:w-auto">
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <p className="text-[#A19F9B] text-xs font-normal">
                {/* className={`text-xs font-normal ${
                  isDark 
                    ? 'text-[#A19F9B]' 
                    : 'text-[#605C54]'}`}> */}
                  {t('cookie.simpleDescription')}
                </p>
                <p className="text-[#605C54] text-[10px]">
                {/* className={`text-[10px] ${
                  isDark 
                    ? 'text-[#605C54]' 
                    : 'text-[#A19F9B]'}`> */}
                  {t('cookie.privacyNote')}{' '}
                  <Link 
                    to={getURLWithLang('cookie-policy', currentLang)}
                    className="text-[#82653E] hover:text-[#9E7B4F] transition-colors duration-300 underline opacity-75 hover:opacity-100"
                    onClick={e => {
                      if (!e.ctrlKey && !e.metaKey) {
                        scrollToTop(1000);
                      }
                      e.stopPropagation();
                    }}
                  >
                    {t('cookie.learnMore')}
                  </Link>
                </p>
              </div>
            </div>
            <button
              onClick={handleAccept}
              className="relative overflow-hidden px-4 py-2 rounded-lg text-xs bg-[#544B3C] hover:bg-[#3D3629] text-[#D5CDBD] font-normal transform transition-all duration-300 hover:scale-105 opacity-75 hover:opacity-100 whitespace-nowrap w-full sm:w-auto flex justify-center"
            //   className={`relative overflow-hidden px-4 py-2 rounded-lg text-xs font-normal transform transition-all duration-300 hover:scale-105 opacity-75 hover:opacity-100 whitespace-nowrap w-full sm:w-auto flex justify-center ${
            //     isDark 
            //       ? 'bg-[#544B3C] hover:bg-[#3D3629] text-[#D5CDBD]' 
            //       : 'bg-[#E9E6E1] hover:bg-[#D5CDBD] text-[#2A3242]'}`}>
              >
              <span className="relative z-10">{t('cookie.accept')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 