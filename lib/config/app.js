// Centralized application configuration from environment variables
// Next.js loads .env, .env.local, .env.development automatically - no manual loading needed
export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || process.env.APP_NAME || 'Zorvian Digital Solutions Admin',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || process.env.APP_DESCRIPTION || 'Admin Portal',
  version: process.env.APP_VERSION || '1.0.0',
  env: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  // Use backend URL everywhere so API requests go to backend (default local backend: :3001)
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
};

export const APP_NAME = appConfig.name;
export const APP_DESCRIPTION = appConfig.description;
export const APP_VERSION = appConfig.version;
export const API_BASE_URL = appConfig.apiBaseUrl;
