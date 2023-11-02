import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import AboutSample from './pages/AboutSample';
import FetchTest from './pages/FetchTest';
import ComponentsTest from './components/ComponentsTest';
import Chat from './pages/Chat';

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
    path: '/components',
    element: <ComponentsTest />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
