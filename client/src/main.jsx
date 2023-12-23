import './index.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import AppLayout from './components/ui/AppLayout.jsx';
import Login from './pages/Login/LoginPage.jsx';
import LocalLoginPage from './pages/Login/LocalLoginPage.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import AuthorizeUser from './pages/authorize.jsx';
import Home from './pages/Home/Home.jsx';
import CreateCommunity from './pages/Community/CreateCommunity.jsx';
import CommunityTypes from './pages/Community/CommunityTypes.jsx';
import CommunityLoaction from './pages/Community/CommunityLocation.jsx';
import NamingCommunity from './pages/Community/NamingCommunity.jsx';
import JoinCommunity from './pages/Community/JoinCommunity.jsx';
import ChooseInterest from './pages/ChooseInterest.jsx';
import CommunityList from './pages/Community/CommunityList.jsx';
import FindCommuinty from './pages/Community/FindCommunity.jsx';
import CategoryPage from './pages/Home/Category.jsx';
import Likes from './pages/Likes.jsx';
import Search from './pages/Search/Search.jsx';
import SearchResult from './pages/Search/SearchResult.jsx';
import Detail from './pages/Post/Detail.jsx';
import CreatePost from './pages/Post/CreatePost.jsx';
import PostLocation from './pages/Post/PostLocation.jsx';
import UpdatePost from './pages/Post/UpdatePost.jsx';
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
        element: <FindCommuinty />,
      },
      {
        path: '/community/location',
        element: <CommunityLoaction />,
      },
      {
        path: '/community/create',
        element: <CreateCommunity />,
      },
      {
        path: '/community/types',
        element: <CommunityTypes />,
      },
      {
        path: '/community/name',
        element: <NamingCommunity />,
      },
      {
        path: '/community/list',
        element: <CommunityList />,
      },
      {
        path: '/community/join',
        element: <JoinCommunity />,
      },
      {
        path: '/community/:id',
        element: <Home />,
      },
      {
        path: '/user-interests',
        element: <ChooseInterest />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/search/result',
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
        path: '/posts/location',
        element: <PostLocation />,
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
        path: '/likes',
        element: <Likes />,
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
