import { CookieSettings } from '../types/cookie.types';

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
      const storedConsent = localStorage.getItem('userConsent');
      return storedConsent ? JSON.parse(storedConsent) : defaultConsent;
    } catch {
      return defaultConsent;
    }
  }

  updateConsent(settings: CookieSettings): void {
    // Сохраняем согласия
    try {
      localStorage.setItem('userConsent', JSON.stringify(settings));
      
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