
import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouteConfig {
  path: string;
  component: React.ComponentType;
  requiresAuth?: boolean;
  requiredRole?: string;
}

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  goBack: () => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode; routes: RouteConfig[] }> = ({ 
  children, 
  routes 
}) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate, goBack }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (context === undefined) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
