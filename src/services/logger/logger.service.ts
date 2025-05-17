import { CookieSettings } from '../../types/cookie.types';
import { consentConfig } from '../../config/consent.config';
import { api } from '../../utils/api.utils';

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'none';

interface LogEntry {
  timestamp: number;
  level: LogLevel;
  type: 'consent' | 'geolocation' | 'error';
  data: any;
  userId?: string;
  sessionId: string;
}

class Logger {
  private static instance: Logger;
  private logQueue: LogEntry[] = [];
  private readonly batchSize = 10;
  private readonly flushInterval = 5000; // 5 seconds

  private constructor() {
    this.startPeriodicFlush();
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private startPeriodicFlush(): void {
    setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  private async flush(): Promise<void> {
    if (this.logQueue.length === 0) return;

    try {
      const logsToSend = this.logQueue.splice(0, this.batchSize);
      const response = await api.post('/api/logs', logsToSend);
      
      if (!response.success) {
        // Возвращаем логи обратно в очередь при ошибке
        this.logQueue.unshift(...logsToSend);
        console.warn('Failed to send logs:', response.error);
      }
    } catch (error) {
      console.error('Failed to send logs:', error);
      this.logQueue.unshift(...this.logQueue);
    }
  }

  private getSessionId(): string {
    if (typeof window === 'undefined') return '';
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = generateSessionId();
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  private getBrowserInfo() {
    if (typeof window === 'undefined') return { userAgent: '', language: '' };
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
    };
  }

  logConsent(consent: CookieSettings): void {
    const currentLogLevel = consentConfig?.logLevel || 'none';
    if (currentLogLevel === 'none') return;

    const logEntry: LogEntry = {
      timestamp: Date.now(),
      level: 'info',
      type: 'consent',
      data: {
        ...consent,
        ...this.getBrowserInfo(),
      },
      sessionId: this.getSessionId(),
    };

    this.logQueue.push(logEntry);

    // Если очередь достигла размера пакета, отправляем логи
    if (this.logQueue.length >= this.batchSize) {
      this.flush();
    }

    // Дублируем в консоль в режиме разработки
    if (currentLogLevel === 'debug') {
      console.log('Consent logged:', logEntry);
    }
  }

  logGeolocation(position: GeolocationPosition): void {
    const currentLogLevel = consentConfig?.logLevel || 'none';
    if (currentLogLevel === 'none') return;

    const logEntry: LogEntry = {
      timestamp: Date.now(),
      level: 'info',
      type: 'geolocation',
      data: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
      },
      sessionId: this.getSessionId(),
    };

    this.logQueue.push(logEntry);
  }

  logError(error: Error): void {
    const currentLogLevel = consentConfig?.logLevel || 'none';
    if (currentLogLevel === 'none') return;

    const logEntry: LogEntry = {
      timestamp: Date.now(),
      level: 'error',
      type: 'error',
      data: {
        message: error.message,
        stack: error.stack,
      },
      sessionId: this.getSessionId(),
    };

    this.logQueue.push(logEntry);
    this.flush(); // Ошибки отправляем сразу
  }
}

export const logger = Logger.getInstance(); 