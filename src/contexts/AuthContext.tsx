
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'doctor' | 'support';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah@clinic.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'michael@clinic.com',
    role: 'doctor',
  },
  {
    id: '3',
    name: 'Lisa Rodriguez',
    email: 'lisa@clinic.com',
    role: 'support',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user
    const storedUser = localStorage.getItem('healthcare_crm_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('healthcare_crm_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthcare_crm_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
