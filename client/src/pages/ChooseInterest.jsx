import '../App.css';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import COLOR from '../utility/Color';
import Font from '../utility/Font';
import { useState } from 'react';
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

function ChooseInterest() {
  let [userName, setUserName] = useState('수현');

  const backgroundStyle = {
    backgroundColor: COLOR.POTZ_PINK_200,
  };

  const style1 = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingTop: '60px',
    paddingBottom: '28px',
    height: '100%',
  };
  const textBoxStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginTop: '28px',
    marginBottom: '28px',
  };
  const fontStyle = {
    fontFamily: Font.FontKor,
    fontSize: '24px',
    fontWeight: '700',
    margin: '0',
    padding: '0',
    color: COLOR.GRAY_500,
    marginBottom: '16x',
  };
  const buttonStyle = {
    backgroundColor: COLOR.POTZ_PINK_200,
    border: 'none',
    color: COLOR.POTZ_PINK_DEFAULT,
    fontSize: '20px',
    fontWeight: '700',
    marginTop: '4px',
    cursor: 'grab',
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
            <div className='contents_container' style={style1}>
              <div style={textBoxStyle}>
                <div style={fontStyle}>
                  <span>{userName}님이 관심가는</span>
                  <br></br>
                  <span>분야를 알려주세요!</span>
                  <br></br>
                </div>
                <div>
                  <button style={buttonStyle}>SKIP</button>
                </div>
              </div>
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

export default ChooseInterest;
