require('dotenv').config()

const defaultConfig = {
    APP_ENV: 'dev',
    APP_PORT: 4001,
    APP_CLIENT_URL: 'http://localhost:3000',
    APP_ALLOWED_ORIGINS: "*"
};

// APP_ALLOWED_ORIGINS should be an array with allowed origins
// ['http://localhost:3000', 'http://localhost:3200', ... ]

export const AppConfig = {
    APP_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    APP_ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    APP_CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
    APP_API_PREFIX: '/api/v1',
    APP_DEBUG: process.env.NODE_ENV !== 'production',
    APP_CORS_CREDENTIALS: true,
    APP_BODY_LIMIT: '10mb',
    APP_PARAMETER_LIMIT: 1000,
    APP_LOGGING_ENABLED: process.env.NODE_ENV !== 'test'
};