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
import { useNavigate } from 'react-router-dom';

//contents_container 안에 UI 구현 하시면 됩니다!

function ChooseInterest() {
  const navigate = useNavigate();

  let [userName, setUserName] = useState('수현');

  const navigateHandler = () => {
    navigate('/find-community');
  };

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
            <button onClick={navigateHandler} style={buttonStyle}>
              SKIP
            </button>
          </div>
        </div>
        <div style={categoryContainer}>
          <div style={category}>
            <Burger navigateHandler={navigateHandler}></Burger>
            <Cafe navigateHandler={navigateHandler}></Cafe>
          </div>
          <div style={category}>
            <KoreanFood navigateHandler={navigateHandler}> </KoreanFood>
            <Sushi navigateHandler={navigateHandler}></Sushi>
          </div>
          <div style={category}>
            <ChineseFood navigateHandler={navigateHandler}></ChineseFood>
            <Pizza navigateHandler={navigateHandler}></Pizza>
          </div>
          <div style={category}>
            <Chicken navigateHandler={navigateHandler}></Chicken>
            <Salad navigateHandler={navigateHandler}></Salad>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseInterest;
