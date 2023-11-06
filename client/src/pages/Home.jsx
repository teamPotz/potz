import '../App.css';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Nav, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import NavBarHomePage from '../components/NavBarHomePage';
import HomeContents from '../components/HomeContentsComp';
import { NavBar1, NavBar2, NavBar3, NavBar4 } from '../components/NavBars';
import ButtonWrite from '../components/ButtonWrite';

function Home() {
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

  const btnStyle = {
    marginRight: '28px',
    zIndex: '100',
  };

  const homeContentesContainer = {
    marginBottom: '50px',
  };

  return (
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className='side_container'></div>
        </Col>
        <Col className='col2'>
          <div className='potz_container'>
            <div style={potzContainerStyle}>
              <NavBarHomePage></NavBarHomePage>
              <div style={homeContentesContainer}>
                {testDatas.map((testData, index) => {
                  return (
                    <HomeContents
                      key={index}
                      testData={testData}
                    ></HomeContents>
                  );
                })}
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
