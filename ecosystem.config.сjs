module.exports = {
  apps: [
    {
      name: 'goldenmill-server',
      script: './server/index.js',
      instances: 'max',
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      },
      max_memory_restart: '1G',
      exp_backoff_restart_delay: 100,
      watch: false,
      autorestart: true,
      merge_logs: true,
      error_file: 'logs/server-error.log',
      out_file: 'logs/server-out.log',
      time: true,
      min_uptime: '60s',
      max_restarts: 10,
      restart_delay: 4000,
      node_args: '--max-old-space-size=1024',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3002
      },
      env_staging: {
        NODE_ENV: 'staging',
        PORT: 3002
      },
      env_file: '.env.production'
    },
    {
      name: 'goldenmill-ssr',
      script: './src/entry-server.js',
      instances: 'max',
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3005
      },
      max_memory_restart: '1G',
      exp_backoff_restart_delay: 100,
      watch: false,
      autorestart: true,
      merge_logs: true,
      error_file: 'logs/ssr-error.log',
      out_file: 'logs/ssr-out.log',
      time: true,
      min_uptime: '60s',
      max_restarts: 10,
      restart_delay: 4000,
      node_args: '--max-old-space-size=1024',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3005
      },
      env_staging: {
        NODE_ENV: 'staging',
        PORT: 3005
      },
      env_file: '.env.production'
    }
  ]
} 