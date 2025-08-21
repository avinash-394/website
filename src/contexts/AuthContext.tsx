import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { authAPI, getAvatarUrl } from '@/lib/api';

export interface User {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (name: string, email: string) => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.login(email, password);
      const userData = response.data.user;
      
      // Ensure avatar URL is absolute
      if (userData.avatar) {
        userData.avatar = getAvatarUrl(userData.avatar);
      }
      
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.signup(name, email, password);
      const userData = response.data.user;
      
      // Ensure avatar URL is absolute
      if (userData.avatar) {
        userData.avatar = getAvatarUrl(userData.avatar);
      }
      
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authAPI.logout();
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (name: string, email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.updateProfile(name, email);
      const userData = response.data.user;
      
      // Ensure avatar URL is absolute
      if (userData.avatar) {
        userData.avatar = getAvatarUrl(userData.avatar);
      }
      
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Profile update failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadAvatar = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.uploadAvatar(file);
      const userData = response.data.user;
      
      // Ensure avatar URL is absolute
      if (userData.avatar) {
        userData.avatar = getAvatarUrl(userData.avatar);
      }
      
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Avatar upload failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await authAPI.forgotPassword(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password reset failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize user from localStorage on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    const storedToken = localStorage.getItem('auth_token');
    
    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser);
        
        // Ensure avatar URL is absolute
        if (userData.avatar) {
          userData.avatar = getAvatarUrl(userData.avatar);
        }
        
        setUser(userData);
        
        // Optionally verify the token with the backend
        authAPI.getMe().then(response => {
          const updatedUserData = response.data.user;
          if (updatedUserData.avatar) {
            updatedUserData.avatar = getAvatarUrl(updatedUserData.avatar);
          }
          setUser(updatedUserData);
          localStorage.setItem('auth_user', JSON.stringify(updatedUserData));
        }).catch(() => {
          // Token is invalid, clear stored data
          authAPI.logout();
          setUser(null);
        });
      } catch {
        // Invalid stored data, clear it
        authAPI.logout();
      }
    }
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateProfile,
    uploadAvatar,
    resetPassword,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};