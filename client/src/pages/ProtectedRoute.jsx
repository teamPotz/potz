import { useNavigate, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

function ProtectedRoute({ children }) {
  // const { isAutenticated } = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAutenticated) navigate('/login');
  // }, [isAutenticated, navigate]);
  // return isAutenticated ? children : null;

  const [isAutenticated, setIsAutenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function checkAuth() {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/auth/', {
        credentials: 'include',
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setIsAutenticated(true);
      }
    } catch (error) {
      console.error(error);
      setIsAutenticated(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return <div className=''>Loading...</div>;
  }

  return isAutenticated ? children || <Outlet /> : <Navigate to={'/login'} />;
}

export default ProtectedRoute;
