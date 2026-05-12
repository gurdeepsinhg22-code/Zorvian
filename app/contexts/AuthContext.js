'use client';

import { createContext, useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../lib/services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

const formatUser = (rawUser) => {
  if (!rawUser) return null;
  const { first_name, last_name, name, permissions, roles, ...rest } = rawUser;
  const safeFirst = typeof first_name === 'string' ? first_name.trim() : '';
  const safeLast = typeof last_name === 'string' ? last_name.trim() : '';
  const computedName = name || [safeFirst, safeLast].filter(Boolean).join(' ').trim();
  return {
    ...rest,
    first_name: safeFirst || undefined,
    last_name: safeLast || undefined,
    name: computedName || rawUser.email || '',
    permissions: permissions || [],
    roles: roles || [],
    rolePermissions: rawUser.rolePermissions || {},
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const router = useRouter();
  const initialized = useRef(false);

  const persistAuthState = useCallback((newToken, rawUser) => {
    if (typeof window !== 'undefined') {
      const formatted = formatUser(rawUser);
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(formatted));
      setToken(newToken);
      setUser(formatted);
    }
  }, []);

  const clearAuthState = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const init = async () => {
      if (typeof window === 'undefined') {
        setLoading(false);
        return;
      }
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedToken && storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            setToken(storedToken);
            setUser(formatUser(parsed));
            const response = await authService.getCurrentUser();
            if (response.success && response.data?.user) {
              persistAuthState(storedToken, response.data.user);
            } else {
              clearAuthState();
            }
          } catch (e) {
            clearAuthState();
          }
        }
      } catch (err) {
        clearAuthState();
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [persistAuthState, clearAuthState]);

  const login = useCallback(async (credentials) => {
    try {
      const response = await authService.login(credentials);
      if (response.success && (response.data?.user || response.user)) {
        const userData = response.data?.user || response.user;
        const newToken = response.data?.token || response.token;
        persistAuthState(newToken, userData);
        return { success: true, user: formatUser(userData) };
      }
      return { success: false, error: response.message || 'Login failed.' };
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Login failed.';
      return { success: false, error: msg };
    }
  }, [persistAuthState]);

  const logout = useCallback(async () => {
    clearAuthState();
    authService.logout().catch(() => {});
    if (typeof window !== 'undefined') window.location.href = '/admin';
  }, [clearAuthState]);

  const hasRedirectedRef = useRef(false);
  useEffect(() => {
    if (loading) return;
    const isAuth = user && token;
    const isLoginPage = typeof window !== 'undefined' && window.location.pathname === '/admin';
    if (isAuth && isLoginPage && !hasRedirectedRef.current) {
      hasRedirectedRef.current = true;
      router.replace('/dashboard');
    }
    if (!isAuth) hasRedirectedRef.current = false;
  }, [loading, user, token, router]);

  const hasRole = useCallback((role) => {
    if (!user) return false;
    const roles = user.roles || [];
    const legacy = user.role;
    if (Array.isArray(role)) return role.some((r) => roles.includes(r) || legacy === r);
    return roles.includes(role) || legacy === role;
  }, [user]);

  const hasPermission = useCallback((resource, action) => {
    if (!user) return false;
    const slug = typeof resource === 'string' && action ? `${resource}:${action}` : resource;
    const perms = user.permissions || [];
    return perms.includes(slug);
  }, [user]);

  const refreshUser = useCallback(async () => {
    try {
      const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!storedToken) return;
      const response = await authService.getCurrentUser();
      if (response.success && response.data?.user) {
        persistAuthState(storedToken, response.data.user);
      }
    } catch (e) {
      // ignore
    }
  }, [persistAuthState]);

  const value = useMemo(() => ({
    user,
    token,
    loading,
    login,
    logout,
    refreshUser,
    isAuthenticated: !!token && !!user,
    hasRole,
    hasPermission,
  }), [user, token, loading, login, logout, refreshUser, hasRole, hasPermission]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
