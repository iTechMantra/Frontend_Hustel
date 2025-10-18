// src/components/RequireAuth.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getCurrentRole, isAuthenticated } from '../services/authService';
import { translate } from '../services/translationService';

export default function RequireAuth({ children, requiredRole }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('RequireAuth: Checking authentication for role:', requiredRole);
        const isAuthVal = await isAuthenticated();
        const currentUserVal = await getCurrentUser();
        const currentRoleVal = await getCurrentRole();
        console.log('RequireAuth: Auth check results:', { isAuthVal, currentUserVal, currentRoleVal });

        if (!isAuthVal || !currentUserVal) {
          console.log('RequireAuth: Not authenticated, redirecting to login for role:', requiredRole);
          // Not authenticated, redirect to appropriate login
          if (requiredRole === 'user') {
            navigate('/user/login');
          } else if (requiredRole === 'doctor') {
            navigate('/doctor/login');
          } else if (requiredRole === 'asha') {
            navigate('/asha/login');
          } else if (requiredRole === 'phc_staff') {
            navigate('/phc/login');
          } else if (requiredRole === 'anm') {
            navigate('/anm/login');
          } else if (requiredRole === 'pharmacy') {
            navigate('/pharmacy/login');
          } else if (requiredRole === 'admin') {
            navigate('/admin/login');
          } else {
            navigate('/');
          }
          return;
        }

        if (requiredRole && currentRoleVal !== requiredRole) {
          console.log('RequireAuth: Role mismatch - required:', requiredRole, 'current:', currentRoleVal);
          // Wrong role, redirect to appropriate dashboard
          if (currentRoleVal === 'user') {
            navigate('/user/dashboard');
          } else if (currentRoleVal === 'doctor') {
            navigate('/doctor/dashboard');
          } else if (currentRoleVal === 'asha') {
            navigate('/asha/dashboard');
          } else if (currentRoleVal === 'phc_staff') {
            navigate('/phc/dashboard');
          } else if (currentRoleVal === 'anm') {
            navigate('/anm/dashboard');
          } else if (currentRoleVal === 'pharmacy') {
            navigate('/pharmacy/dashboard');
          } else if (currentRoleVal === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
          return;
        }

        console.log('RequireAuth: Authorization successful for role:', requiredRole);
        setAuthorized(true);
      } catch (error) {
        console.error('Error checking authentication:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, requiredRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{translate('Checking authentication...')}</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {translate('Access Denied')}
          </h1>
          <p className="text-gray-600 mb-4">
            {translate('You do not have permission to access this page')}
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {translate('Go Home')}
          </button>
        </div>
      </div>
    );
  }

  return children;
}