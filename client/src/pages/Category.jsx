import '../App.css';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import COLOR from '../utility/Color';
import GoBack from '../components/goBack';

import { useState, useEffect } from 'react';
import {
  Burger,
  Cafe,
  KoreanFood,
  Sushi,
  Pizza,
  Salad,
  Chicken,
  ChineseFood,
} from '../components/Category_Food';

//contents_container 안에 UI 구현 하시면 됩니다!

function CategoryPage() {
  const [displayHeight, setdisplayHeight] = useState(window.innerHeight);

  useEffect(() => {
    const ReSizeHandler = () => {
      setdisplayHeight(window.innerHeight);
    };

    //윈도우 리사이즈가 일어나면 콜백 호출
    window.addEventListener('resize', ReSizeHandler);

    return () => {
      window.removeEventListener('resize', ReSizeHandler);
    };
  }, []);

  let [userName, setUserName] = useState('수현');

  const backgroundStyle = {
    backgroundColor: COLOR.POTZ_PINK_100,
  };

  const style1 = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: '100px',
    height: 'auto',
    marginBottom: '0px',
  };

  const categoryContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const category = {
    marginBottom: '28px',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  };

  return (
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className='side_container'></div>
        </Col>
        <Col className='col2'>
          <div className='potz_container' style={backgroundStyle}>
            <nav>
              <GoBack text={'카테고리'}></GoBack>
            </nav>
            <div className='contents_container' style={style1}>
              <div style={categoryContainer}>
                <div style={category}>
                  <Burger></Burger>
                  <Cafe></Cafe>
                </div>
                <div style={category}>
                  <KoreanFood> </KoreanFood>
                  <Sushi></Sushi>
                </div>
                <div style={category}>
                  <ChineseFood></ChineseFood>
                  <Pizza></Pizza>
                </div>
                <div style={category}>
                  <Chicken></Chicken>
                  <Salad></Salad>
                </div>
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

export default CategoryPage;
