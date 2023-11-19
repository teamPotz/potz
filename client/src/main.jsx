import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import AppLayout from './components/ui/AppLayout.jsx';
import MakeCommunity from './pages/MakeCommunityPage.jsx';
import ChooseFeature from './pages/ChooseFeaturePage.jsx';
import NamingCommunity from './pages/NamingCommunity.jsx';
import Home from './pages/Home.jsx';
import ChooseInterest from './pages/ChooseInterest.jsx';
import FindLocation from './pages/FindLocationPage.jsx';
import Detail from './pages/Detail.jsx';
import SearchPage from './pages/Search.jsx';
import Alarm from './pages/Alarm.jsx';
import CategoryPage from './pages/Category.jsx';
import Login from './pages/loginPage.jsx';
import LoginPage from './pages/LocalLogin/LoginPage.jsx';
import LinkSample from './pages/LocalLogin/LinkSample.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import CategorySearch from './pages/CategorySearchPage.jsx';
import ChooseCommunity from './pages/ChooseCommunityPage.jsx';
import LikedList from './pages/LikedListPage.jsx';
import SearchResult from './pages/SearchResult.jsx';
import Post from './pages/Post';
import LandingMap from './pages/LandingMap';
import Chat from './pages/Chat/Chat.jsx';
import ChatRooms from './pages/Chat/ChatRooms.jsx';

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
          <AppLayout />
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
        path: '/community-lists',
        element: <ChooseCommunity />,
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
        path: '/result',
        element: <SearchResult />,
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
      {
        path: '/post',
        element: <Post />,
      },
      {
        path: '/getaddress',
        element: <LandingMap />,
      },
      {
        path: '/create-community',
        element: <MakeCommunity />,
      },
      { path: '/chatrooms', element: <ChatRooms /> },
      { path: '/chat/:potId', element: <Chat /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
