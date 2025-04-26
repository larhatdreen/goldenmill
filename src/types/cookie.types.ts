export interface CookieConsent {
  necessary: boolean; // Обязательные куки
  analytics: boolean; // Аналитика
  marketing: boolean; // Маркетинг
  functional: boolean; // Функциональные куки
  geolocation: boolean; // Геолокация
}

export interface CookieSettings {
  accepted: boolean;
  timestamp: number;
  version: string;
  consents: CookieConsent;
}

export interface ConsentLog {
  timestamp: number;
  action: 'accept' | 'reject' | 'update';
  settings: CookieSettings;
  userId?: string;
  sessionId: string;
} 