import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { CookieSettings } from '../types/cookie.types';

const COOKIE_KEY = 'user_cookie_consent';
const ENCRYPTION_KEY = import.meta.env.VITE_COOKIE_ENCRYPTION_KEY || 'default-key';

export const encryptData = (data: any): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

export const decryptData = (encryptedData: string): any => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    return null;
  }
};

export const setCookieConsent = (settings: CookieSettings): void => {
  const encryptedData = encryptData(settings);
  Cookies.set(COOKIE_KEY, encryptedData, { expires: 365, sameSite: 'strict' });
};

export const getCookieConsent = (): CookieSettings | null => {
  const encryptedData = Cookies.get(COOKIE_KEY);
  if (!encryptedData) return null;
  return decryptData(encryptedData);
};

export const removeCookieConsent = (): void => {
  Cookies.remove(COOKIE_KEY);
}; 