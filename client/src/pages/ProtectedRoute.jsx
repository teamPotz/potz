import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { user, getUserInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      await getUserInfo();
      setIsLoading(false);
    }

    fetchUser();
  }, []);

  if (isLoading) return null;

  return user ? children || <Outlet /> : <Navigate to={'/login'} replace />;
}

export default ProtectedRoute;
