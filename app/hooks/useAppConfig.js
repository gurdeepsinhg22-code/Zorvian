'use client';

import { useMemo } from 'react';
import { appConfig, APP_NAME, APP_DESCRIPTION } from '../../lib/config/app';

export function useAppConfig() {
  return useMemo(() => ({
    name: appConfig.name,
    description: appConfig.description,
    version: appConfig.version,
    apiBaseUrl: appConfig.apiBaseUrl,
    isDevelopment: appConfig.isDevelopment,
    isProduction: appConfig.isProduction,
  }), []);
}

export function useAppName() {
  return useMemo(() => APP_NAME, []);
}

export function useAppDescription() {
  return useMemo(() => APP_DESCRIPTION, []);
}
