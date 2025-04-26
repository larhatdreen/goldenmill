/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COOKIE_ENCRYPTION_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 