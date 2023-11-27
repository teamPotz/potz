import { useState, useEffect } from 'react';
import COLOR from '../../utility/Color';
import { useNavigate } from 'react-router-dom';
import ButtonBg from '../../components/ButtonBG';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../components/ui/Logo';

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

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');

  const navigate = useNavigate();
  const { user, login, signUp } = useAuth();

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);

  async function handleSignUp() {
    if (!signUpEmail || !signUpPassword || !signUpName) {
      alert('please fill the all fields');
      return;
    }
    signUp(signUpEmail, signUpPassword, signUpName);
  }

  async function handleLogin() {
    if (!email || !password) {
      alert('please fill the all fields');
      return;
    }
    login(email, password);
  }

  return (
    <div className='potz_container'>
      <div className='contents_container' style={style1}>
        <Logo />
        <div className='btn_container' style={style3}>
          <input
            type='email'
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <div onClick={handleLogin}> */}
          <ButtonBg
            backgroundColor={COLOR.POTZ_PINK_200}
            hoverColor={COLOR.POTZ_PINK_300}
            fontColor={COLOR.BLACK}
            onClick={handleLogin}
          >
            로그인
          </ButtonBg>
          {/* </div> */}
        </div>
        <div className='btn_container' style={style3}>
          <input
            type='email'
            placeholder='email'
            onChange={(e) => setSignUpEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            onChange={(e) => setSignUpPassword(e.target.value)}
          />
          <input
            type='text'
            placeholder='name'
            onChange={(e) => setSignUpName(e.target.value)}
          />
          {/* <div onClick={handleSignUp}> */}
          <ButtonBg
            backgroundColor={COLOR.POTZ_PINK_200}
            hoverColor={COLOR.POTZ_PINK_300}
            fontColor={COLOR.BLACK}
            onClick={handleSignUp}
          >
            회원가입
          </ButtonBg>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
