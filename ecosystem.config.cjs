module.exports = {
  apps: [
    {
      name: 'goldenmill-server',
      script: './server/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
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
      script: './src/entry-server.tsx',
      interpreter: 'tsx',
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