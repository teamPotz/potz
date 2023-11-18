import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import LoadingPage from './LoadingPage';

function ProtectedRoute({ children }) {
  const { getUserInfo, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      setIsLoading(true);
      try {
        await getUserInfo();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return isAuthenticated ? (
    children || <Outlet />
  ) : (
    <Navigate to={'/login'} replace />
  );
}

export default ProtectedRoute;
