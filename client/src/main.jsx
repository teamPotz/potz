import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import './App.css';
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
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import CategorySearch from './pages/CategorySearchPage.jsx';
import ChooseCommunity from './pages/ChooseCommunityPage.jsx';
import LikedList from './pages/LikedListPage.jsx';
import SearchResult from './pages/SearchResult.jsx';
import LandingMap from './pages/LandingMap';
import Chat from './pages/Chat/Chat.jsx';
import CreatePost from './pages/CreatePost.jsx';
import UpdatePost from './pages/UpdatePost.jsx';
import UserLoactionLandingMap from './pages/UserLocationLanding.jsx';
import ChatList from './pages/Chat/ChatList.jsx';
import UserProfile from './pages/UserProfile.jsx';
import Entercommunity from './pages/EnterCommunity.jsx';
import { ChatProvider } from './contexts/ChatContext.jsx';
import AuthorizeUser from './pages/authorize.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        {/* <ProtectedRoute> */}
        <AppLayout />
        {/* </ProtectedRoute> */}
      </AuthProvider>
    ),
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/local-login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <AuthProvider>
        <ChatProvider>
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        </ChatProvider>
      </AuthProvider>
    ),
    children: [
      {
        path: '/authorize',
        element: <AuthorizeUser />,
      },
      {
        path: '/community/:id',
        element: <Home />,
      },
      {
        path: '/posts/:id',
        element: <Detail />,
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
        path: '/enter-community',
        element: <Entercommunity />,
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
        path: '/create-post',
        element: <CreatePost />,
      },
      {
        path: '/update-post/:id',
        element: <UpdatePost />,
      },
      {
        path: '/getaddress',
        element: <LandingMap />,
      },
      {
        path: '/create-community',
        element: <MakeCommunity />,
      },
      {
        path: '/user-location',
        element: <UserLoactionLandingMap />,
      },
      {
        path: '/my-page',
        element: <UserProfile />,
      },
      { path: '/chats/', element: <ChatList /> },
      { path: '/chats/:potId', element: <Chat /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
