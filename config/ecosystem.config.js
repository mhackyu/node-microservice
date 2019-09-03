require('dotenv').config();

module.exports = {
  apps: [{
    name: process.env.APP_NAME,
    script: './server.js',
    output: './logs/out.log',
    error: './logs/error.log',
    log: './logs/combined.outerr.log',
    merge_logs: true,
    env: {
      NODE_ENV: 'development'
    },
    env_test: {
      NODE_ENV: 'test'
    },
    env_staging: {
      NODE_ENV: 'staging'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}