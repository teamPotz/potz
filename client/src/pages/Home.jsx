import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import COLOR from '../utility/Color';
import NavBarHomePage from '../components/NavBarHomePage';
import HomeContents from '../components/HomeContentsComp';
import ButtonWrite from '../components/ButtonWrite';
import ShareCommunityModal from '../components/shareCommunityModal';
import NavBar from '../components/ui/NavBar';
import { socket } from '../../socket';
import { useAuth } from '../contexts/AuthContext';

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

function Home() {
  let navigate = useNavigate();
  const [communityDatas, setCommunityDatas] = useState();
  const [postDatas, setPostDatas] = useState();

  const communityId = localStorage.getItem('communityDataID');

  // 화면 너비 측정을 위한 state 변수 // 디폴트는 420px
  const [displayWidth, setdisplayWidth] = useState(window.innerWidth);

  const { user } = useAuth();

  // useEffect(() => {
  //   socket.connect();

  //   socket.emit('setUserId', user.id);
  // }, []);

  useEffect(() => {
    const ReSizeHandler = () => {
      setdisplayWidth(window.innerWidth);
    };

    //윈도우 리사이즈가 일어나면 콜백 호출
    window.addEventListener('resize', ReSizeHandler);

    return () => {
      window.removeEventListener('resize', ReSizeHandler);
    };
  }, []);

  //커뮤니티 데이터
  useEffect(() => {
    if (communityId !== null) {
      console.log('커뮤니티 아이디 num', communityId);
      const fetchCommunityData = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/communities/${communityId}`,
            {
              method: 'GET',
              credentials: 'include',
            }
          );
          const data = await response.json();
          console.log('홈 데이터', data);
          setCommunityDatas(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchCommunityData();
    }
  }, [communityId]);

  //post 데이터
  useEffect(() => {
    if (communityId !== null) {
      console.log('커뮤니티 아이디 num', communityId);
      const fetchCommunityData = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/posts?communityId=${communityId}`,
            {
              method: 'GET',
              credentials: 'include',
            }
          );

          const data = await response.json();
          console.log('포스트 데이터', data);
          setPostDatas(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchCommunityData();
    }
  }, [communityId]);

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

  return (
    <div className='potz_container' style={backgroundStyle}>
      <div style={potzContainerStyle}>
        {communityDatas ? console.log('communityDatas', communityDatas) : null}
        {communityDatas ? (
          <NavBarHomePage communityDatas={communityDatas} />
        ) : null}

        {/* 만약 컨텐츠 데이터 개수가 1개도 없을 경우 공동체 공유 모달창 띄우기 */}
        <div style={homeContentesContainer}>
          {postDatas ? (
            postDatas.length === 0 ? (
              <ShareCommunityModal />
            ) : null
          ) : null}
          {postDatas ? <HomeContents postDatas={postDatas} /> : null}
        </div>

        <div style={navbarStyle}>
          <div
            style={btnStyle}
            onClick={() =>
              navigate('/create-post', { state: { communityId: communityId } })
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

export default Home;
