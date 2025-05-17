import { CookieSettings } from '../types/cookie.types';
import { API_URL } from '../config';

interface DeviceInfo {
  type: string;
  os: string;
  browser: string;
}

interface LocationInfo {
  city: string;
  country: string;
}

interface ConsentData {
  action: 'accept' | 'reject';
  preferences: CookieSettings['consents'];
  user: string;
  device: DeviceInfo;
  location: LocationInfo;
  publicIP: string;
  timestamp: string;
}

// Функция для получения публичного IP адреса
async function getPublicIP(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.warn('Не удалось получить публичный IP:', error);
    return 'Неизвестно';
  }
}

// Функция для определения типа устройства и браузера
function getDeviceInfo(): DeviceInfo {
  if (typeof window === 'undefined') {
    return { type: 'Неизвестно', os: 'Неизвестно', browser: 'Неизвестно' };
  }

  const ua = navigator.userAgent;
  let type = 'Компьютер';
  let os = 'Неизвестно';
  let browser = 'Неизвестно';

  // Определяем тип устройства
  if (/mobile/i.test(ua)) {
    type = 'Мобильный телефон';
  } else if (/tablet/i.test(ua) || /ipad/i.test(ua)) {
    type = 'Планшет';
  }

  // Определяем ОС
  if (/windows/i.test(ua)) {
    os = 'Windows';
  } else if (/macintosh|mac os/i.test(ua)) {
    os = 'MacOS';
  } else if (/android/i.test(ua)) {
    os = 'Android';
  } else if (/iphone|ipad|ipod/i.test(ua)) {
    os = 'iOS';
  } else if (/linux/i.test(ua)) {
    os = 'Linux';
  }

  // Определяем браузер
  if (/chrome/i.test(ua)) {
    browser = 'Chrome';
  } else if (/firefox/i.test(ua)) {
    browser = 'Firefox';
  } else if (/safari/i.test(ua)) {
    browser = 'Safari';
  } else if (/edge/i.test(ua)) {
    browser = 'Edge';
  } else if (/opera/i.test(ua)) {
    browser = 'Opera';
  }

  return { type, os, browser };
}

// Функция для получения геолокации
async function getLocationInfo(): Promise<LocationInfo> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      city: data.city || 'Неизвестно',
      country: data.country_name || 'Неизвестно'
    };
  } catch (error) {
    console.warn('Не удалось получить информацию о местоположении:', error);
    return {
      city: 'Неизвестно',
      country: 'Неизвестно'
    };
  }
}

// const getUserAgent = () => {
//   if (typeof window === 'undefined') return '';
//   return navigator.userAgent;
// }

export const sendConsentToBackend = async (consent: CookieSettings): Promise<void> => {
  try {
    const [device, location, publicIP] = await Promise.all([
      getDeviceInfo(),
      getLocationInfo(),
      getPublicIP()
    ]);

    const consentData: ConsentData = {
      action: consent.accepted ? 'accept' : 'reject',
      preferences: consent.consents,
      user: 'anonymous',
      device,
      location,
      publicIP,
      timestamp: new Date().toISOString()
    };

    const response = await fetch(`${API_URL}/logs/cookie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(consentData)
    });

    if (!response.ok) {
      throw new Error(`Failed to send consent to backend: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to send consent to backend:', error);
    throw error; // Пробрасываем ошибку дальше для обработки
  }
}; 