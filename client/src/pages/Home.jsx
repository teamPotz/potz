import '../App.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
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
          }
        );
        const data = await response.json();
        console.log('해당 커뮤니티 데이터', data);
        setCommunityDatas(data);
      } catch (error) {
        console.error(error);
      }
    }

    // 비동기 함수를 useEffect 내부에서 직접 호출
    fetchCommunityData();
  }, [testcommunityDataID]);

  const potzContainerStyle = {
    position: 'relative', // potz_container를 relative로 설정합니다.
    minHeight: '100vh', // 최소 높이를 화면 높이(100vh)로 설정합니다.
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
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className='side_container'></div>
        </Col>
        <Col className='col2'>
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
        </Col>
        <Col className='col3'>
          <div className='side_container'></div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
