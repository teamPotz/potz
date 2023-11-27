import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { user, isFetching, getUserInfo } = useAuth();

  useEffect(() => {
    if (!user && !isFetching) {
      getUserInfo();
    }
  }, [getUserInfo, isFetching, user]);

  return user && !isFetching ? (
    children || <Outlet />
  ) : (
    <Navigate to={'/login'} replace />
  );
}

export default ProtectedRoute;
