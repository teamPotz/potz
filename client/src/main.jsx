import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
import CategorySearch from './pages/CategorySearchPage.jsx';
import ChooseCommunity from './pages/ChooseCommunityPage.jsx';
import LikedList from './pages/LikedListPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
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
    path: '/community-lists',
    element: <ChooseCommunity />,
  },
  {
    path: '/home',
    element: <Home />,
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
  {
    path: '/category-search',
    element: <CategorySearch />,
  },
  {
    path: '/liked-list',
    element: <LikedList />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
