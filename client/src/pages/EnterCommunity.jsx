import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EnterCommunityModal from '../components/EnterCommunityModal';
import NavBarHomePage from '../components/NavBarHomePage';
import HomeContents from '../components/HomeContentsComp';
import ButtonWrite from '../components/ButtonWrite';
import COLOR from '../utility/Color';
import ShareCommunityModal from '../components/shareCommunityModal';
import NavBar from '../components/ui/NavBar';

function Entercommunity() {
  const location = useLocation();
  const testId = 1;
  //유저가 가입되어 있는 커뮤니티 아이디들 중, 가장 마지막으로 가입한 아이디 받아오기
  // let { communityDataID } = location.state;
  // console.log('해당 커뮤니티 아이디', communityDataID);

  const navigate = useNavigate();
  const [communityDatas, setCommunityDatas] = useState(null);

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
    async function fetchCommunityData() {
      try {
        const response = await fetch(
          `http://localhost:5000/communities/${testId}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        const data = await response.json();
        console.log('해당 커뮤니티 데이터', data);
        setCommunityDatas(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCommunityData();
  }, []);

  const potzContainerStyle = {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
  };

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

  return (
    <div className='potz_container' style={backgroundStyle}>
      <div style={potzContainerStyle}>
        {/* {communityDatas ? (
          <NavBarHomePage communityDatas={communityDatas} />
        ) : null} */}
        <div style={homeContentesContainer}>
          <EnterCommunityModal></EnterCommunityModal>
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

export default Entercommunity;
