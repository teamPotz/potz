import { useNavigate } from 'react-router-dom';
import COLOR from '../../utility/Color';
import ButtonBg from '../../components/ui/ButtonBG';
import HeartHandsImg from '../../../public/images/graphicImg/heartHands.png';
import { useAuth } from '../../contexts/AuthContext';

function MakeCommunity() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className='potz_container'>
      <div className='contents_container' style={style1}>
        <div className='text_container' style={fontStyle}>
          <span>앗, {user.name}님 근처에</span>
          <br />
          <span>아직 공동체가 없어요. 😅</span>
          <br />
          <span style={fontStyle2}>
            이웃들과 함께 할 공동체를 만들어보세요!
          </span>
        </div>

        <div className='img_container' style={styles2}>
          <img style={styles2} width={300} src={HeartHandsImg} />
        </div>

        <div className='btn_container' style={style3}>
          <ButtonBg
            backgroundColor={COLOR.POTZ_PINK_DEFAULT}
            hoverColor={COLOR.POTZ_PINK_600}
            fontColor={COLOR.WHITE}
            onClick={() => {
              navigate('/community/types');
            }}
          >
            직접 공동체 만들기
          </ButtonBg>
          <ButtonBg
            backgroundColor={COLOR.POTZ_PINK_200}
            hoverColor={COLOR.POTZ_PINK_300}
            fontColor={COLOR.POTZ_PINK_DEFAULT}
            onClick={() => navigate('/user-location')}
          >
            다시 검색해 보기
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
const style3 = {
  display: 'flex',
  flexDirection: 'column',
  gap: '13px',
};
const fontStyle = {
  fontSize: '24px',
  fontWeight: '700',
  margin: '0',
  padding: '0',
  color: COLOR.GRAY_500,
};
const fontStyle2 = {
  fontSize: '16px',
  fontWeight: '300',
  margin: '0',
  padding: '0',
  color: COLOR.GRAY_400,
};

export default MakeCommunity;
