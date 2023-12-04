import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import COLOR from '../../utility/Color';
import ButtonBg from '../../components/ui/ButtonBG';
import Logo from '../../components/ui/Logo';
import { useAuth } from '../../contexts/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { user, getUserInfo } = useAuth();

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className='potz_container'>
      <div className='contents_container' style={style1}>
        <Logo />
        <div className='btn_container' style={style3}>
          <ButtonBg
            backgroundColor={COLOR.YELLOW}
            hoverColor={COLOR.YELLOW_100}
            fontColor={COLOR.WHITE}
            onClick={() =>
              (window.location.href = 'http://localhost:5000/auth/kakao')
            }
          >
            카카오톡으로 시작
          </ButtonBg>
          <ButtonBg
            backgroundColor={COLOR.POTZ_PINK_500}
            hoverColor={COLOR.POTZ_PINK_DEFAULT}
            fontColor={COLOR.WHITE}
            onClick={() => {
              window.location.href = 'http://localhost:5000/auth/google';
            }}
          >
            구글 계정으로 시작
          </ButtonBg>
          <ButtonBg
            backgroundColor={COLOR.POTZ_PINK_200}
            hoverColor={COLOR.POTZ_PINK_300}
            fontColor={COLOR.BLACK}
            onClick={() => navigate('/local-login')}
          >
            비회원으로 둘러보기
          </ButtonBg>
        </div>
      </div>
    </div>
  );
}

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

export default LoginPage;
