export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'none';

interface ConsentConfigType {
  backendUrl: string;
  cookieEncryption: boolean;
  logLevel: LogLevel;
}

const configs: Record<string, ConsentConfigType> = {
  development: {
    backendUrl: 'https://goldenmill.de/api',
    cookieEncryption: false,
    logLevel: 'debug',
  },
  production: {
    backendUrl: 'https://goldenmill.de/api',
    cookieEncryption: true,
    logLevel: 'error',
  },
  test: {
    backendUrl: 'https://goldenmill.de/api',
    cookieEncryption: false,
    logLevel: 'none',
  },
};

export const consentConfig: ConsentConfigType = configs[process.env.NODE_ENV || 'development'];

// Проверка на undefined
if (!consentConfig) {
  throw new Error(`Invalid environment: ${process.env.NODE_ENV}`);
} 