interface ApiConfigType {
  mockResponses: boolean;
  logRequests: boolean;
  endpoints: {
    consent: string;
    logs: string;
    location: string;
  };
}

const configs: Record<string, ApiConfigType> = {
  development: {
    mockResponses: true,
    logRequests: true,
    endpoints: {
      consent: '/api/consent',
      logs: '/api/logs',
      location: '/api/location',
    },
  },
  production: {
    mockResponses: false,
    logRequests: false,
    endpoints: {
      consent: '/api/v1/consent',
      logs: '/api/v1/logs',
      location: '/api/v1/location',
    },
  },
};

export const apiConfig: ApiConfigType = configs[process.env.NODE_ENV || 'development'];

// Проверка на undefined
if (!apiConfig) {
  throw new Error(`Invalid environment: ${process.env.NODE_ENV}`);
} 