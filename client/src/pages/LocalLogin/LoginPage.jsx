import '../../App.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import COLOR from '../../utility/Color';
import { useNavigate } from 'react-router-dom';
import ButtonBg from '../../components/ButtonBG';
import { useAuth } from '../../contexts/AuthContext';

const style3 = {
  display: 'flex',
  flexDirection: 'column',
  gap: '13px',
};

const styles2 = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '100px',
  marginBottom: '10px',
};

const style1 = {
  display: 'inline-flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '100%',
};

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');

  const navigate = useNavigate();
  const { isAuthenticated, signUp, login, getUserInfo } = useAuth();

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (isAuthenticated) navigate('/link', { replace: true });
  }, [isAuthenticated, navigate]);

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
    <Container className='background'>
      {/* <button onClick={getUserInfo}>auth</button> */}
      <Row className='row1'>
        <Col className='col1'>
          <div className='side_container'></div>
        </Col>
        <Col className='col2'>
          <div className='potz_container'>
            <div className='contents_container' style={style1}>
              <div className='logo_container' style={styles2}>
                <svg
                  width='186'
                  height='92'
                  viewBox='0 0 186 92'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g clipPath='url(#clip0_197_11763)'>
                    <path
                      d='M17.1693 40.8652C23.474 40.8652 28.1872 42.2485 31.3089 45.0457C34.4306 47.8429 35.9915 51.7774 35.9915 56.9415C35.9915 59.2469 35.6548 61.46 35.0121 63.5503C34.3694 65.6405 33.2982 67.5463 31.8598 69.2062C30.3907 70.866 28.4626 72.1878 26.0448 73.1714C23.627 74.1243 20.6583 74.6161 17.1387 74.6161H13.4355V91.3686H12.3643C5.5394 91.3686 -0.00012207 85.7435 -0.00012207 78.7966V40.8652H17.1693ZM16.8939 51.9004H14.5373C13.2519 51.9004 12.1807 52.9455 12.1807 54.2672V61.1527C12.1807 62.4437 13.2213 63.5195 14.5373 63.5195H16.037C17.812 63.5195 19.3423 63.0584 20.6277 62.1363C21.9131 61.2141 22.5864 59.6157 22.5864 57.2796C22.5864 55.6812 22.1274 54.3902 21.2092 53.3758C20.2911 52.3922 18.8526 51.9004 16.8939 51.9004Z'
                      fill='#FF7971'
                    />
                    <path
                      d='M87.5886 65.7336C87.5886 70.8977 86.7622 75.4162 85.1095 79.2585C83.4569 83.1009 80.8554 86.0825 77.2746 88.2342C73.6938 90.3859 69.1031 91.4617 63.4411 91.4617C57.871 91.4617 53.3108 90.3859 49.73 88.2342C46.1492 86.0825 43.5172 83.1009 41.8339 79.2278C40.1506 75.3547 39.2937 70.8362 39.2937 65.6721C39.2937 60.508 40.1506 56.0202 41.8645 52.1779C43.5784 48.3663 46.2105 45.3847 49.7606 43.2637C53.3414 41.1428 57.9016 40.0977 63.5329 40.0977C69.1949 40.0977 73.7857 41.1428 77.3358 43.2637C80.886 45.3847 83.4875 48.3663 85.1095 52.2086C86.7622 56.051 87.5886 60.5695 87.5886 65.7336ZM53.4333 65.7336C53.4333 70.2521 54.1984 73.7871 55.7592 76.3384C57.3201 78.8897 59.8603 80.1807 63.4411 80.1807C67.1443 80.1807 69.7458 78.8897 71.2148 76.3384C72.6839 73.7871 73.449 70.2521 73.449 65.7336C73.449 61.215 72.7145 57.6494 71.2148 55.0366C69.7458 52.4238 67.1443 51.1328 63.5023 51.1328C59.8297 51.1328 57.2589 52.4238 55.7286 55.0366C54.1984 57.6494 53.4333 61.215 53.4333 65.7336Z'
                      fill='#808080'
                    />
                    <path
                      d='M115.315 90.7241H101.879V53.7457H89.7899V40.8662H127.434V41.6039C127.434 48.3049 122.017 53.7457 115.345 53.7457V90.7241H115.315Z'
                      fill='#808080'
                    />
                    <path
                      d='M159.531 90.7241H129.874V82.4247L151.359 51.7784H130.364V40.8662H167.978V49.1656L146.493 79.8119H170.365C170.365 85.8674 165.498 90.7241 159.531 90.7241Z'
                      fill='#808080'
                    />
                  </g>
                  <path
                    d='M185.5 17.1511C185.494 15.7524 185.297 14.3972 184.935 13.1105C184.714 12.3334 184.02 11.7988 183.222 11.7988H158.611C157.813 11.7988 157.119 12.3334 156.898 13.1105C156.53 14.4097 156.333 15.7773 156.333 17.1946C156.333 25.3504 162.861 31.9583 170.917 31.9583C170.935 31.9583 170.947 31.9583 170.966 31.9583V34.9235C170.966 35.6508 171.727 36.1232 172.366 35.7875C174.785 34.5256 179.796 31.374 182.921 25.5804C184.548 23.1995 185.5 20.3089 185.5 17.1946C185.5 17.1884 185.494 17.1697 185.5 17.1511C185.494 17.1573 185.494 17.1573 185.5 17.1511Z'
                    fill='#FF7971'
                  />
                  <path
                    d='M159.932 9.51094H181.896C182.535 9.51094 182.903 8.7712 182.516 8.25525C180.367 5.40197 177.211 3.36302 173.582 2.68544V1.39245C173.582 0.627847 172.962 0 172.207 0H169.486C168.731 0 168.111 0.627847 168.111 1.39245V2.71031C164.537 3.41897 161.436 5.43927 159.312 8.25525C158.925 8.7712 159.293 9.51094 159.932 9.51094Z'
                    fill='#FF7971'
                  />
                  <defs>
                    <clipPath id='clip0_197_11763'>
                      <rect
                        width='175'
                        height='51.3333'
                        fill='white'
                        transform='translate(0 40.0977)'
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
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
                <div onClick={handleLogin}>
                  <ButtonBg
                    backgroundColor={COLOR.POTZ_PINK_200}
                    hoverColor={COLOR.POTZ_PINK_300}
                    fontColor={COLOR.BLACK}
                  >
                    로그인
                  </ButtonBg>
                </div>
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
                <div onClick={handleSignUp}>
                  <ButtonBg
                    backgroundColor={COLOR.POTZ_PINK_200}
                    hoverColor={COLOR.POTZ_PINK_300}
                    fontColor={COLOR.BLACK}
                  >
                    회원가입
                  </ButtonBg>
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

export default LoginPage;
