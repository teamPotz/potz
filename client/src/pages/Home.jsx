import '../App.css';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import NavBarHomePage from '../components/NavBarHomePage';
import HomeContents from '../components/HomeContentsComp';
//contents_container 안에 UI 구현 하시면 됩니다!

function Home() {
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
    },
  ];

  return (
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className='side_container'></div>
        </Col>
        <Col className='col2'>
          <div className='potz_container'>
            <NavBarHomePage></NavBarHomePage>
            <div>
              {testDatas.map((testData, index) => {
                return (
                  <HomeContents key={index} testData={testData}></HomeContents>
                );
              })}
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
