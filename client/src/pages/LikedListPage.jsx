import '../App.css';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import LikedComp from '../components/LikedComp';
import { NavBar2 } from '../components/NavBars';
import COLOR from '../utility/Color';
import Font from '../utility/Font';

function LikedList() {
  let [likedNum, setLikedNum] = useState(30);

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

  //테스트용 데이터
  const testDatas = [
    {
      store: '디저트123 송도점 ',
      price: 230,
      link: '쿠팡이츠.link',
      imgSrc: '../../public/images/graphicImg/testImg.png',
      memNum: 8,
      limitNum: 10,
      meetPlace: '아파트 정문',
      category: '# 카페 디저트',
      sale: [1],
      crown: true,
      heart: false,
    },
    {
      store: '커플케이크 하버뷰점',
      price: 600,
      link: '배달의 민족.link',
      imgSrc: '../../public/images/graphicImg/testImg2.png',
      memNum: 10,
      limitNum: 15,
      meetPlace: '아파트 정문',
      category: '# 카페 디저트',
      sale: [],
      crown: true,
      heart: false,
    },
    {
      store: '프루츠 후르츠',
      price: 900,
      link: '배달의 민족.link',
      imgSrc: '../../public/images/graphicImg/testImg3.png',
      memNum: 10,
      limitNum: 15,
      meetPlace: '아파트 정문',
      category: '# 카페 디저트',
      sale: [1],
      crown: false,
      heart: false,
    },
    {
      store: '샐러디 연세대점',
      price: 420,
      link: '배달의 민족.link',
      imgSrc: '../../public/images/graphicImg/testImg4.png',
      memNum: 10,
      limitNum: 15,
      meetPlace: '아파트 정문',
      category: '# 샐러드',
      sale: [],
      crown: true,
      heart: false,
    },
    {
      store: '연어와 육회',
      price: 600,
      link: '배달의 민족.link',
      imgSrc: '../../public/images/graphicImg/testImg5.png',
      memNum: 10,
      limitNum: 15,
      meetPlace: '아파트 정문',
      category: '# 일식 초밥',
      crown: false,
      sale: [],
    },
    {
      store: '디저트123 송도점',
      price: 230,
      link: '쿠팡이츠.link',
      imgSrc: '../../public/images/graphicImg/testImg.png',
      memNum: 8,
      limitNum: 10,
      meetPlace: '아파트 정문',
      category: '# 카페 디저트',
      sale: [1],
      crown: true,
      heart: false,
    },
    {
      store: '프루츠 후르츠',
      price: 900,
      link: '배달의 민족.link',
      imgSrc: '../../public/images/graphicImg/testImg3.png',
      memNum: 10,
      limitNum: 15,
      meetPlace: '아파트 정문',
      category: '# 카페 디저트',
      sale: [1],
      crown: false,
      heart: false,
    },
  ];

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

  const TopNav = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '70px',
    boxShadow: '0px 1.16px 2.3px 0px rgba(0, 0, 0, 0.06)',
  };

  const homeContentesContainer = {
    marginLeft: '28px',
    display: 'grid',
    gridTemplateColumns: ' repeat( auto-fit, minmax(160px, 1fr))',
    marginBottom: '90px',
  };

  const backgroundStyle = {
    backgroundColor: COLOR.WHITE,
  };

  const fontStyle = {
    display: 'flex',
    gap: '16px',
    marginTop: '14px',
    marginLeft: '28px',
    fontFamily: Font.FontKor,
    fontSize: '14px',
    fontWeight: '700',
    color: COLOR.GRAY_400,
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
              <nav style={TopNav}>
                <span
                  style={{
                    fontFamily: Font.FontKor,
                    fontSize: '18px',
                    fontWeight: '700',
                    marginLeft: '28px',
                  }}
                >
                  찜해둔 배달팟
                </span>
              </nav>
              <div style={fontStyle}>
                <div>
                  <span>찜한 배달팟</span>
                  <span style={{ marginLeft: '4px' }}>{likedNum}</span>
                </div>
                <span>카테고리별 보기</span>
                <span>편집</span>
              </div>
              <div style={homeContentesContainer}>
                {/* 찜 한 가게 데이터가 없는 경우 */}
                {testDatas.length < 1 ? (
                  <div
                    style={{
                      marginTop: '40px',
                      fontFamily: Font.FontKor,
                      fontWeight: '700',
                      color: COLOR.POTZ_PINK_DEFAULT,
                      display: 'flex',
                      justifyContent: 'center',
                      padding: '20px',
                      background: COLOR.WHITE,
                    }}
                  >
                    🍣 아직 찜 하신 가게가 없어요 🍣
                  </div>
                ) : null}
                {/* 찜 한 가게 데이터가 있는 경우 */}
                {testDatas.map((testData, index) => {
                  return (
                    <LikedComp key={index} testData={testData}></LikedComp>
                  );
                })}
              </div>
              <div style={navbarStyle}>
                <NavBar2></NavBar2>
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

export default LikedList;
