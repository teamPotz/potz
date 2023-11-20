import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBarHomePage from '../components/NavBarHomePage';
import HomeContents from '../components/HomeContentsComp';
import { NavBar1 } from '../components/NavBars';
import ButtonWrite from '../components/ButtonWrite';
import COLOR from '../utility/Color';
import ShareCommunityModal from '../components/shareCommunityModal';

function Home() {
  const location = useLocation();
  let testcommunityDataID = 1;
  //실제로는 로그인~커뮤니티 선택 하면서 커뮤니티 아이디 데이터 넘겨받기
  // let { communityDataID } = location.state;
  // console.log('해당 커뮤니티 아이디', communityDataID);

  let [communityDatas, setCommunityDatas] = useState(null);

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
          `http://localhost:5000/communities/${testcommunityDataID}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        const data = await response.json();
        setCommunityDatas(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCommunityData();
  }, [testcommunityDataID]);

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
        {communityDatas ? (
          <NavBarHomePage communityDatas={communityDatas} />
        ) : null}
        <div style={homeContentesContainer}>
          {/* 만약 컨텐츠 데이터 개수가 1개도 없을 경우 공동체 공유 모달창 띄우기 */}
          {communityDatas ? (
            communityDatas.posts.length < 1 ? (
              <ShareCommunityModal></ShareCommunityModal>
            ) : null
          ) : null}
          {communityDatas ? (
            <HomeContents communityDatas={communityDatas}></HomeContents>
          ) : null}
        </div>
        <div style={navbarStyle}>
          <div style={btnStyle}>
            <ButtonWrite></ButtonWrite>
          </div>
          <NavBar1></NavBar1>
        </div>
      </div>
    </div>
  );
}

export default Home;
