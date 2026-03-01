import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types';

// API Configuration - works in both dev and production
const getApiBase = () => {
  const isProd = import.meta.env?.PROD || import.meta.env?.MODE === 'production';
  if (isProd) {
    const apiUrl = import.meta.env?.VITE_API_URL;
    return apiUrl ? `${apiUrl}/auth` : '/api/auth';
  }
  // In development, talk directly to backend on :5000 to avoid any proxy header issues
  return 'http://localhost:5000/api/auth';
};

const API_BASE = getApiBase();

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string, role?: string, rememberMe?: boolean) => Promise<void>;
  signup: (userData: any, rememberMe?: boolean) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback(() => {
    localStorage.removeItem('osf_token');
    // Don't remove remembered email/role on logout - user might want to stay remembered
    setUser(null);
  }, []);

  const checkSession = useCallback(async () => {
    const token = localStorage.getItem('osf_token');
    const rememberedEmail = localStorage.getItem('osf_remembered_email');
    
    // If no token but email is remembered, try to auto-login
    if (!token && rememberedEmail) {
      setIsLoading(false);
      return;
    }
    
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        logout();
      }
    } catch (err) {
      console.error('Session check failed:', err);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = async (email: string, password?: string, role?: string, rememberMe: boolean = false) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('osf_token', data.token);
      if (rememberMe) {
        localStorage.setItem('osf_remembered_email', email);
        if (role) localStorage.setItem('osf_remembered_role', role);
      } else {
        localStorage.removeItem('osf_remembered_email');
        localStorage.removeItem('osf_remembered_role');
      }
      setUser(data.user);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const signup = async (userData: any, rememberMe: boolean = true) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData) 
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      localStorage.setItem('osf_token', data.token);
      if (rememberMe) {
        localStorage.setItem('osf_remembered_email', userData.email);
        localStorage.setItem('osf_remembered_role', userData.role || 'client');
      }
      setUser(data.user);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

