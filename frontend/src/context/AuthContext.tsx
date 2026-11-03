import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('vytrix_token'));

  useEffect(() => {
    if (!token) {
      const demoToken = 'demo-user-token';
      localStorage.setItem('vytrix_token', demoToken);
      setToken(demoToken);
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem('vytrix_token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('vytrix_token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}