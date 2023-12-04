import { useNavigate } from 'react-router-dom';
import COLOR from '../utility/Color';
import {
  Burger,
  Cafe,
  KoreanFood,
  Sushi,
  Pizza,
  Salad,
  Chicken,
  ChineseFood,
} from '../components/category/Category_Food';
import { useAuth } from '../contexts/AuthContext';

function ChooseInterest() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate('/community/find');
  };

  return (
    <div className='potz_container' style={backgroundStyle}>
      <div className='contents_container' style={style1}>
        <div style={textBoxStyle}>
          <div style={fontStyle}>
            <span>{user.name}님이 관심가는</span>
            <br />
            <span>분야를 알려주세요!</span>
            <br />
          </div>
          <div>
            <button onClick={navigateHandler} style={buttonStyle}>
              SKIP
            </button>
          </div>
        </div>
        <div style={categoryContainer}>
          <div style={category}>
            <Burger navigateHandler={navigateHandler} />
            <Cafe navigateHandler={navigateHandler} />
          </div>
          <div style={category}>
            <KoreanFood navigateHandler={navigateHandler} />
            <Sushi navigateHandler={navigateHandler} />
          </div>
          <div style={category}>
            <ChineseFood navigateHandler={navigateHandler} />
            <Pizza navigateHandler={navigateHandler} />
          </div>
          <div style={category}>
            <Chicken navigateHandler={navigateHandler} />
            <Salad navigateHandler={navigateHandler} />
          </div>
        </div>
      </div>
    </div>
  );
}

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

export default ChooseInterest;
