import './App.css';
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
import Notification from './pages/Notification.jsx';
import CategoryPage from './pages/Category.jsx';
import Login from './pages/loginPage.jsx';
import LoginPage from './pages/LocalLogin/LoginPage.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
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
import AuthorizeUser from './pages/authorize.jsx';
import MyBigData from './pages/myBigData.jsx';
import MyCommunitySettings from './pages/myCommunitySetting.jsx';
import MyOrderHistory from './pages/myOrderHistory.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/local-login/',
        element: <LoginPage />,
      },
    ],
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
        element: <AuthorizeUser />,
        index: true,
      },
      {
        path: '/community/find',
        element: <FindLocation />,
      },
      {
        path: '/community/create',
        element: <MakeCommunity />,
      },
      {
        path: '/community/types',
        element: <ChooseFeature />,
      },
      {
        path: '/community/name',
        element: <NamingCommunity />,
      },
      {
        path: '/community/lists',
        element: <ChooseCommunity />,
      },
      {
        path: '/community/enter',
        element: <Entercommunity />,
      },
      {
        path: '/community/:id',
        element: <Home />,
      },
      {
        path: '/getaddress',
        element: <LandingMap />,
      },
      {
        path: '/user-location',
        element: <UserLoactionLandingMap />,
      },
      {
        path: '/user-interests',
        element: <ChooseInterest />,
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
        path: '/category',
        element: <CategoryPage />,
      },
      {
        path: '/create-post',
        element: <CreatePost />,
      },
      {
        path: '/posts/:id',
        element: <Detail />,
      },
      {
        path: '/update-post/:id',
        element: <UpdatePost />,
      },
      {
        path: '/liked-list',
        element: <LikedList />,
      },
      {
        path: '/my-page',
        element: <UserProfile />,
      },
      {
        path: '/my-page/bigdata',
        element: <MyBigData />,
      },
      {
        path: '/my-page/communites',
        element: <MyCommunitySettings />,
      },
      {
        path: '/my-page/order-history',
        element: <MyOrderHistory />,
      },
      { path: '/chats/', element: <ChatList /> },
      { path: '/chats/:potId', element: <Chat /> },
      {
        path: '/notification',
        element: <Notification />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
