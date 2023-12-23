import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import COLOR from '../../utility/Color';
import HomeTopNavBar from '../../components/home/HomeTopNavBar';
import HomeContents from '../../components/home/HomeContents';
import ButtonWrite from '../../components/ui/ButtonWrite';
import ShareCommunityModal from '../../components/community/shareCommunityModal';
import NavBar from '../../components/ui/NavBar';
import { useAuth } from '../../contexts/AuthContext';
import { communitySocket } from '../../../socket';

function Home() {
  const navigate = useNavigate();
  const [communityDatas, setCommunityDatas] = useState();
  const [postDatas, setPostDatas] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const { id: communityId } = useParams();
  const { user } = useAuth();

  localStorage.setItem('communityDataID', communityId);

  // 화면 너비 측정을 위한 state 변수 // 디폴트는 420px
  const [displayWidth, setdisplayWidth] = useState(window.innerWidth);
  const navbarStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
    alignItems: 'end',
    position: 'fixed',
    bottom: 0,
    maxWidth: '420px',
    width: displayWidth ? displayWidth : '420px',
  };
  useEffect(() => {
    const ReSizeHandler = () => setdisplayWidth(window.innerWidth);

    //윈도우 리사이즈가 일어나면 콜백 호출
    window.addEventListener('resize', ReSizeHandler);

    return () => {
      window.removeEventListener('resize', ReSizeHandler);
    };
  }, []);

  // socket
  useEffect(() => {
    communitySocket.connect();

    communitySocket.emit('join', { communityId, user });

    communitySocket.on('newPost', (data) => {
      // console.log('newPost', data);
      setPostDatas((prev) => [data, ...prev]);
    });

    return () => communitySocket.disconnect();
  }, [communityId, user]);

  // 커뮤니티 데이터
  useEffect(() => {
    if (communityId == null) return;

    const fetchCommunityData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/communities/${communityId}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        const data = await response.json();
        // console.log('홈 데이터', data);
        setCommunityDatas(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCommunityData();
  }, [communityId]);

  // post 데이터
  useEffect(() => {
    if (communityId == null) return;

    const fetchPostData = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_APP_API_URL
          }/communities/${communityId}/posts`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        const data = await response.json();
        // console.log('포스트 데이터', data);
        setPostDatas(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostData();
  }, [communityId]);

  // get notifications
  useEffect(() => {
    async function getNotifications() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/users/notification`,
          { credentials: 'include' }
        );
        if (!res.ok) {
          throw new Error('get notification error');
        }
        const data = await res.json();
        // console.log(data);
        setNotifications(data);
      } catch (error) {
        console.error(error);
      }
    }
    getNotifications();
  }, []);

  return (
    <div className='potz_container' style={backgroundStyle}>
      <div style={potzContainerStyle}>
        {communityDatas ? (
          <HomeTopNavBar
            communityDatas={communityDatas}
            notifications={notifications}
          />
        ) : null}

        <div style={homeContentesContainer}>
          {/* 만약 컨텐츠 데이터 개수가 1개도 없을 경우 공동체 공유 모달창 띄우기 */}
          {postDatas?.length <= 0 && <ShareCommunityModal />}

          <HomeContents postDatas={postDatas} setPostDatas={setPostDatas} />
        </div>

        <div style={navbarStyle}>
          <div
            style={btnStyle}
            onClick={() =>
              navigate('/posts/create', { state: { communityId: communityId } })
            }
          >
            <ButtonWrite />
          </div>
          <NavBar />
        </div>
      </div>
    </div>
  );
}

const potzContainerStyle = {
  position: 'relative',
  minHeight: '100vh',
  width: '100%',
};

const btnStyle = {
  marginRight: '28px',
  zIndex: '100',
};

const homeContentesContainer = {
  marginBottom: '50px',
};

const backgroundStyle = {
  backgroundColor: COLOR.POTZ_PINK_100,
};

export default Home;
