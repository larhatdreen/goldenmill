import { CookieSettings } from '../types/cookie.types';

// Безопасное получение данных из localStorage
const getStoredData = (key: string): any => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const data = window.localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }
  return null
}

// Безопасное сохранение данных в localStorage
const setStoredData = (key: string, value: any): void => {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}

interface ConsentManager {
  initialize(): void;
  getConsent(): CookieSettings;
  updateConsent(settings: CookieSettings): void;
}

class CustomConsentManager implements ConsentManager {
  private static instance: CustomConsentManager;
  private initialized = false;

  private constructor() {}

  static getInstance(): CustomConsentManager {
    if (!CustomConsentManager.instance) {
      CustomConsentManager.instance = new CustomConsentManager();
    }
    return CustomConsentManager.instance;
  }

  initialize(): void {
    if (this.initialized) return;
    
    // Инициализация менеджера согласий
    console.log('Consent manager initialized');
    this.initialized = true;
  }

  getConsent(): CookieSettings {
    // Получаем согласия из localStorage или cookie
    const defaultConsent: CookieSettings = {
      accepted: false,
      timestamp: Date.now(),
      version: '1.0',
      consents: {
        necessary: true,
        analytics: false,
        marketing: false,
        functional: false,
        geolocation: false,
      },
    };

    try {
      const storedConsent = getStoredData('userConsent');
      return storedConsent || defaultConsent;
    } catch {
      return defaultConsent;
    }
  }

  updateConsent(settings: CookieSettings): void {
    // Сохраняем согласия
    try {
      setStoredData('userConsent', settings);
      
      // Применяем настройки
      if (settings.consents.analytics) {
        this.enableAnalytics();
      }
      if (settings.consents.marketing) {
        this.enableMarketing();
      }
      // и т.д.
    } catch (error) {
      console.error('Failed to update consent:', error);
    }
  }

  private enableAnalytics(): void {
    // Инициализация аналитики
    console.log('Analytics enabled');
  }

  private enableMarketing(): void {
    // Инициализация маркетинговых инструментов
    console.log('Marketing enabled');
  }
}

export const consentManager = CustomConsentManager.getInstance(); 