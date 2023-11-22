import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import COLOR from '../utility/Color';
import NavBarHomePage from '../components/NavBarHomePage';
import HomeContents from '../components/HomeContentsComp';
import ButtonWrite from '../components/ButtonWrite';
import ShareCommunityModal from '../components/shareCommunityModal';
import NavBar from '../components/ui/NavBar';
import {
  useCommunityId,
  CommunityIdProvider,
} from '../contexts/communityIdContext';

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
  const [communityDatas, setCommunityDatas] = useState();
  const { communityDataID, setCommunityDataID } = useCommunityId();
  const location = useLocation();
  const navigate = useNavigate();
  const initialCommunityDataID = location.state?.communityDataID;

  useEffect(() => {
    const updateCommunityDataID = async () => {
      if (initialCommunityDataID) {
        console.log('아이디', initialCommunityDataID);
        setCommunityDataID(initialCommunityDataID);
        localStorage.setItem('communityDataID', initialCommunityDataID);
      }
    };

    updateCommunityDataID();
  }, [initialCommunityDataID, setCommunityDataID, communityDataID]);

  // 화면 너비 측정을 위한 state 변수 // 디폴트는 420px
  const [displayWidth, setdisplayWidth] = useState(window.innerWidth);

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

  useEffect(() => {
    if (communityDataID !== null) {
      console.log('커뮤니티 아이디 num', communityDataID);
      const fetchCommunityData = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/communities/${communityDataID}`,
            {
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
  }, [communityDataID]);

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
          {communityDatas ? (
            communityDatas.posts && communityDatas.posts.length === 0 ? (
              <ShareCommunityModal />
            ) : null
          ) : null}
          {communityDatas ? (
            communityDatas.posts && communityDatas.posts.length > 0 ? (
              <HomeContents communityDatas={communityDatas} />
            ) : null
          ) : null}
        </div>

        <div style={navbarStyle}>
          <div style={btnStyle} onClick={() => navigate('/create-post')}>
            <ButtonWrite />
          </div>
          <NavBar />
        </div>
      </div>
    </div>
  );
}

export default Home;
