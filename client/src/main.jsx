import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import AboutSample from './pages/AboutSample';
import FetchTest from './pages/FetchTest';
import Post from './pages/Post';
import LandingMap from './pages/LandingMap';
import MakeCommunity from './pages/MakeCommunityPage.jsx';
import ChooseFeature from './pages/ChooseFeaturePage.jsx';
import NamingCommunity from './pages/NamingCommunity.jsx';
import Home from './pages/Home.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/about',
    element: <AboutSample />,
  },
  {
    path: '/fetch',
    element: <FetchTest />,
  },
  {
    path: '/post',
    element: <Post/>,
  },
  {
    path: '/getaddress',
    element: <LandingMap/>,
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
    path: '/home',
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
