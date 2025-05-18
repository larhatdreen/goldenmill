module.exports = {
  apps: [
    {
      name: 'goldenmill-server',
      script: './server/dist/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
        DATABASE_URL: process.env.DATABASE_URL,
        JWT_SECRET: process.env.JWT_SECRET,
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_USER: process.env.SMTP_USER,
        SMTP_PASS: process.env.SMTP_PASS,
        EMAIL_FROM: process.env.EMAIL_FROM,
        VITE_API_URL: process.env.VITE_API_URL
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'goldenmill-ssr',
      script: './server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3005
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
} 