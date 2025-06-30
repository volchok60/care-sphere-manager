
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from '@/contexts/RouterContext';
import { MainLayout } from '@/components/layout/MainLayout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Patients from '@/pages/Patients';
import Appointments from '@/pages/Appointments';
import Documents from '@/pages/Documents';
import Messages from '@/pages/Messages';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';

interface Route {
  path: string;
  component: React.ComponentType;
  requiresAuth?: boolean;
  requiredRole?: string;
}

const routes: Route[] = [
  { path: '/login', component: Login },
  { path: '/', component: Dashboard, requiresAuth: true },
  { path: '/patients', component: Patients, requiresAuth: true },
  { path: '/appointments', component: Appointments, requiresAuth: true },
  { path: '/documents', component: Documents, requiresAuth: true },
  { path: '/messages', component: Messages, requiresAuth: true },
  { path: '/settings', component: Settings, requiresAuth: true, requiredRole: 'admin' },
];

export const Router: React.FC = () => {
  const { currentPath } = useRouter();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Find matching route
  const matchedRoute = routes.find(r => r.path === currentPath);
  
  // If no route is found, show NotFound
  if (!matchedRoute) {
    return <NotFound />;
  }

  // Handle authentication requirements
  if (matchedRoute.requiresAuth && !user) {
    return <Login />;
  }

  // Handle role requirements
  if (matchedRoute.requiredRole && user?.role !== matchedRoute.requiredRole && user?.role !== 'admin') {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const Component = matchedRoute.component;

  // Wrap authenticated routes with MainLayout
  if (matchedRoute.requiresAuth && user) {
    return (
      <MainLayout>
        <Component />
      </MainLayout>
    );
  }

  return <Component />;
};
