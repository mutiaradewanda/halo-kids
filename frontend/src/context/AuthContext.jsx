import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService, { mapBackendRoleToFrontend } from '../api/authService';
import { TOKEN_STORAGE_KEY, SESSION_STORAGE_KEY, decodeJwt } from '../api/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getStoredSession());
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY) || null);
  const [isLoading, setIsLoading] = useState(false);

  // Sync session across tabs / window storage
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === SESSION_STORAGE_KEY) {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setUser(null);
        }
      }
      if (e.key === TOKEN_STORAGE_KEY) {
        setToken(e.newValue);
      }
    };

    const handleAuthExpired = () => {
      setUser(null);
      setToken(null);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('halokids:auth_expired', handleAuthExpired);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('halokids:auth_expired', handleAuthExpired);
    };
  }, []);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    try {
      const result = await authService.login(email, password);
      setUser(result.user);
      setToken(result.token);
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data) => {
    setIsLoading(true);
    try {
      const result = await authService.register(data);
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setToken(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!token) return null;
    try {
      const payload = decodeJwt(token);
      const role = payload?.role || user?.roleCode || 'masyarakat';
      const freshData = await authService.getMyProfile(role);
      const roleMeta = mapBackendRoleToFrontend(role);
      const updatedUser = {
        ...user,
        ...freshData,
        ...roleMeta,
      };
      setUser(updatedUser);
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err) {
      console.warn('Gagal memuat profil terbaru:', err);
      return user;
    }
  }, [token, user]);

  const value = {
    user,
    token,
    role: user?.role || 'Tamu',
    roleCode: user?.roleCode || 'tamu',
    roleMode: user?.roleMode || 'user',
    isLoggedIn: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshProfile,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
