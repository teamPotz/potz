import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
    case 'signUp':
    case 'get_user_info':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'logout':
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error('unkown action');
  }
}

function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function signUp(email, password, name) {
    try {
      const res = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        dispatch({ type: 'signUp', payload: data });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function login(email, password) {
    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        throw new Error('failed to login');
      }
      const data = await res.json();
      console.log(data);
      dispatch({ type: 'login', payload: data });
    } catch (error) {
      console.error(error);
    }
  }

  async function logout() {
    try {
      const res = await fetch('http://localhost:5000/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('failed to logout');
      }
      const data = await res.json();
      console.log(data);
      dispatch({ type: 'logout' });
      localStorage.clear();
    } catch (error) {
      console.error(error);
    }
  }

  async function getUserInfo() {
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:5000/auth/', {
        credentials: 'include',
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        dispatch({ type: 'get_user_info', payload: data });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: 'logout' });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signUp,
        login,
        logout,
        getUserInfo,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthContext was used outside AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
