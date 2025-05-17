module.exports = {
  apps: [
    {
      name: 'goldenmill-ssr',
      script: 'server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      max_memory_restart: '1G',
      exp_backoff_restart_delay: 100
    }
  ]
} 