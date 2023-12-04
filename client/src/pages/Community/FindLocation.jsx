import { useNavigate } from 'react-router-dom';
import COLOR from '../../utility/Color';
import ButtonBg from '../../components/ui/ButtonBG';
import Graphic from '../../../public/images/graphicImg/Hands.png';
import { useAuth } from '../../contexts/AuthContext';

function FindLocation() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className='potz_container'>
      <div className='contents_container' style={style1}>
        <div className='text_container' style={fontStyle}>
          <span>
            {user.name}님 근처에 있는
            <br />
            배달 공동체를 찾아볼까요?
          </span>
        </div>
        <div className='img_container' style={styles2}>
          <img style={styles2} width={300} src={Graphic} />
        </div>
        <div
          className='btn_container'
          onClick={() => navigate('/user-location')}
        >
          <ButtonBg
            backgroundColor={COLOR.POTZ_PINK_DEFAULT}
            hoverColor={COLOR.POTZ_PINK_600}
            fontColor={COLOR.WHITE}
          >
            내 위치 검색
          </ButtonBg>
        </div>
      </div>
    </div>
  );
}

const style1 = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '100%',
};
const styles2 = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
};
const fontStyle = {
  fontSize: '24px',
  fontWeight: '700',
  margin: '0',
  padding: '0',
  color: COLOR.GRAY_500,
};

export default FindLocation;
