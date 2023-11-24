import { useNavigate } from 'react-router-dom';
import COLOR from '../utility/Color';
import ButtonBg from '../components/ButtonBG';
import Logo from '../components/ui/Logo';

function Login() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/user-interests');
  };

  const style1 = {
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
  };

  const style3 = {
    display: 'flex',
    flexDirection: 'column',
    gap: '13px',
  };

  return (
    <div className='potz_container'>
      <div className='contents_container' style={style1}>
        <Logo />
        <div className='btn_container' style={style3}>
          <div
            onClick={() =>
              (window.location.href = 'http://localhost:5000/auth/login/kakao')
            }
          >
            <ButtonBg
              backgroundColor={COLOR.YELLOW}
              hoverColor={COLOR.YELLOW_100}
              fontColor={COLOR.WHITE}
            >
              카카오톡으로 시작
            </ButtonBg>
          </div>
          <div onClick={handleNavigate}>
            <ButtonBg
              backgroundColor={COLOR.POTZ_PINK_500}
              hoverColor={COLOR.POTZ_PINK_DEFAULT}
              fontColor={COLOR.WHITE}
            >
              구글 계정으로 시작
            </ButtonBg>
          </div>
          <div onClick={() => navigate('/local-login')}>
            <ButtonBg
              backgroundColor={COLOR.POTZ_PINK_200}
              hoverColor={COLOR.POTZ_PINK_300}
              fontColor={COLOR.BLACK}
            >
              비회원으로 둘러보기
            </ButtonBg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
