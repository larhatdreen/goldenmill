import { consentConfig } from '../config/consent.config';
import { apiConfig } from '../config/api.config';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const getApiUrl = (endpoint: string): string => {
  const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3002' 
    : consentConfig.backendUrl;
  return `${baseUrl}${endpoint}`;
};

const shouldMockResponse = (): boolean => {
  return apiConfig?.mockResponses ?? process.env.NODE_ENV === 'development';
};

const shouldLogRequests = (): boolean => {
  return apiConfig?.logRequests ?? process.env.NODE_ENV === 'development';
};

export const api = {
  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      if (shouldMockResponse()) {
        console.log(`[API] POST ${endpoint}:`, data);
        return { success: true, data: data as T };
      }

      const response = await fetch(getApiUrl(endpoint), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return { success: true, data: result };
    } catch (error) {
      if (shouldLogRequests()) {
        console.warn(`API Error (${endpoint}):`, error);
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};

