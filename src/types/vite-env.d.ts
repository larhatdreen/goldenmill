/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Server Configuration
  readonly PORT: string;
  
  // API URL
  readonly VITE_API_URL: string;
  readonly API_URL: string;
  
  // Database Configuration
  readonly DATABASE_URL: string;
  
  // JWT Configuration
  readonly JWT_SECRET: string;
  
  // SMTP Configuration
  readonly SMTP_HOST: string;
  readonly SMTP_PORT: string;
  readonly SMTP_SECURE: string;
  readonly SMTP_USER: string;
  readonly SMTP_PASS: string;
  readonly SMTP_FROM: string;
  readonly SMTP_TO: string;
  
  // File Upload Configuration
  readonly MAX_FILE_SIZE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface FormData {
  entries(): IterableIterator<[string, FormDataEntryValue]>;
}

interface Headers {
  entries(): IterableIterator<[string, string]>;
} 