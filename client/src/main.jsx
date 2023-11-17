import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
// import App from './App.jsx';
import MakeCommunity from './pages/MakeCommunityPage.jsx';
import ChooseFeature from './pages/ChooseFeaturePage.jsx';
import NamingCommunity from './pages/NamingCommunity.jsx';
import Home from './pages/Home.jsx';
import ChooseInterest from './pages/ChooseInterest.jsx';
import Login from './pages/loginPage.jsx';
import FindLocation from './pages/FindLocationPage.jsx';
import Detail from './pages/Detail.jsx';
import SearchPage from './pages/Search.jsx';
import Alarm from './pages/Alarm.jsx';
import CategoryPage from './pages/Category.jsx';
import LoginPage from './pages/LocalLogin/LoginPage.jsx';

import { AuthProvider } from './contexts/AuthContext.jsx';
import LinkSample from './pages/LocalLogin/LinkSample.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    ),
  },
  {
    path: '/',
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <Outlet />
        </ProtectedRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: '/',
        element: <Login />,
      },
      { path: '/link', element: <LinkSample /> },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/user-interests',
        element: <ChooseInterest />,
      },
      {
        path: '/find-community',
        element: <FindLocation />,
      },
      {
        path: '/create-community',
        element: <MakeCommunity />,
      },
      {
        path: '/community-types',
        element: <ChooseFeature />,
      },
      {
        path: '/name-community',
        element: <NamingCommunity />,
      },
      {
        path: '/detail',
        element: <Detail />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/alarm',
        element: <Alarm />,
      },
      {
        path: '/category',
        element: <CategoryPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
