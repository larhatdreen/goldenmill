import { CookieSettings } from '../types/cookie.types';
import { logger } from './logger/logger.service';

export const logConsent = async (consent: CookieSettings): Promise<void> => {
  logger.logConsent(consent);
}; 