import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isFetching: false,
  error: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
    case 'get_user_info_start':
      return {
        ...state,
        user: null,
        isFetching: true,
        error: false,
      };
    case 'LOGIN_SUCCESS':
    case 'SIGNUP':
    case 'get_user_info_success':
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case 'LOGIN_FAILURE':
    case 'get_user_info_failure':
      return {
        ...state,
        user: null,
        isFetching: false,
        error: true,
      };
    case 'LOGOUT':
      return { ...state, user: null, isFetching: false, error: false };
    default:
      throw new Error('unkown action');
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

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
        dispatch({ type: 'SIGNUP', payload: data });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function login(email, password) {
    dispatch({ type: 'LOGIN_START' });
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
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'LOGIN_FAILURE', payload: error });
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
      dispatch({ type: 'LOGOUT' });
      localStorage.clear();
    } catch (error) {
      console.error(error);
    }
  }

  async function getUserInfo() {
    dispatch({ type: 'get_user_info_start' });
    try {
      const res = await fetch('http://localhost:5000/auth/', {
        credentials: 'include',
      });
      const data = await res.json();
      // console.log(data);
      if (res.ok) {
        dispatch({ type: 'get_user_info_success', payload: data });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: 'get_user_info_failure' });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        signUp,
        login,
        logout,
        getUserInfo,
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
