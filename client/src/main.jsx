import './App.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import AppLayout from './components/ui/AppLayout.jsx';
import Login from './pages/Login/LoginPage.jsx';
import LocalLoginPage from './pages/Login/LocalLoginPage.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import AuthorizeUser from './pages/authorize.jsx';
import Home from './pages/Home.jsx';
import MakeCommunity from './pages/Community/MakeCommunity.jsx';
import ChooseFeature from './pages/Community/ChooseTypes.jsx';
import NamingCommunity from './pages/Community/NamingCommunity.jsx';
import Entercommunity from './pages/Community/EnterCommunity.jsx';
import ChooseInterest from './pages/ChooseInterest.jsx';
import ChooseCommunity from './pages/Community/ChooseCommunity.jsx';
import FindLocation from './pages/Community/FindLocation.jsx';
import CategoryPage from './pages/Category/Category.jsx';
import LikedList from './pages/LikedListPage.jsx';
import SearchPage from './pages/Search.jsx';
import SearchResult from './pages/SearchResult.jsx';
import LandingMap from './pages/LandingMap';
import Detail from './pages/Post/Detail.jsx';
import CreatePost from './pages/Post/CreatePost.jsx';
import UpdatePost from './pages/Post/UpdatePost.jsx';
import UserLoactionLanding from './pages/UserLocationLanding.jsx';
import MyPage from './pages/MyPage/MyPage.jsx';
import MyBigData from './pages/MyPage/BigData.jsx';
import MyCommunities from './pages/MyPage/MyCommunities.jsx';
import MyOrderHistory from './pages/MyPage/MyOrders.jsx';
import Chat from './pages/Chat/Chat.jsx';
import ChatList from './pages/Chat/ChatList.jsx';
import Notification from './pages/Notification.jsx';

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
        element: <LocalLoginPage />,
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
        element: <UserLoactionLanding />,
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
        path: '/posts/create',
        element: <CreatePost />,
      },
      {
        path: '/posts/:id/update',
        element: <UpdatePost />,
      },
      {
        path: '/posts/:id',
        element: <Detail />,
      },
      {
        path: '/liked-list',
        element: <LikedList />,
      },
      {
        path: '/my-page',
        element: <MyPage />,
      },
      {
        path: '/my-page/bigdata',
        element: <MyBigData />,
      },
      {
        path: '/my-page/communites',
        element: <MyCommunities />,
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
