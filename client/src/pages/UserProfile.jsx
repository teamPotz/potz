import COLOR from '../utility/Color';
import styled from 'styled-components';
import Font from '../utility/Font';
import NavBar from '../components/ui/NavBar';
import { useAuth } from '../contexts/AuthContext';
import ButtonBg from '../components/ButtonBG';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Box = styled.div`
  display: flex;
  flex-direction: ${(props) => props.align};
  align-items: center;
  width: 100%;
  height: ${(props) => props.height};
  justify-content: space-between;
  background-color: ${COLOR.WHITE};
  gap: 21px;
  div {
    margin: 28px;
  }
  p {
    margin: 0px;
  }
`;
const Profile1 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 21px;
  align-items: center;
  height: 70px;
  margin: 28px;
  div {
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 276.5px;
  }
`;
const Profile2 = styled.div`
  display: flex;
  width: 363.33px;
  height: 78px;
  transform: translateY(-46px);
  background-color: ${COLOR.GRAY_100};
  border-radius: 9.33333px;
  div {
    margin: 0px;
    padding: 14px 35px 14px 16.3333px;
  }
`;
const FontBig = styled.p`
  font-family: ${Font.FontKor};
  font-style: normal;
  font-weight: 700;
  font-size: 18.6667px;
  color: ${COLOR.BLACK};
  margin: 0;
  white-space: nowrap;
`;
const FontMd = styled.span`
  font-family: ${Font.FontKor};
  font-style: normal;
  font-weight: ${(props) => props.weight};
  font-size: 16.3333px;
  color: ${(props) => props.color};
  margin: 0;
  white-space: nowrap;
`;
const FontSm = styled.span`
  font-family: ${Font.FontKor};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: ${COLOR.GRAY_500};
  margin: 0;
  white-space: nowrap;
`;
const styles = {
  background: {
    backgroundColor: `${COLOR.POTZ_PINK_100}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '9.33px',
  },
  topBar: {
    width: '420px',
    position: 'fixed',
    top: 0,
    boxShadow: '0px 1.16667px 2.33333px rgba(0, 0, 0, 0.08)',
  },
  content: {
    marginTop: '60.67px',
  },
  navBar: {
    position: 'fixed',
    bottom: 0,
    width: '420px',
  },
  verticalAlign: {
    display: 'flex',
    alignItems: 'center',
  },
  contentBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5px',
  },
};

const text = [
  '내 공동체 관리',
  '알림 설정',
  '참여 내역',
  '결제 내역',
  '이벤트 및 공지사항',
];

function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  // 화면 너비 측정을 위한 state 변수 // 디폴트는 420px
  const [displayWidth, setdisplayWidth] = useState(window.innerWidth);

  useEffect(() => {
    const ReSizeHandler = () => {
      setdisplayWidth(window.innerWidth);
    };

    //윈도우 리사이즈가 일어나면 콜백 호출
    window.addEventListener('resize', ReSizeHandler);

    return () => {
      window.removeEventListener('resize', ReSizeHandler);
    };
  }, []);

  const navbarStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
    alignItems: 'end',
    position: 'fixed',
    bottom: 0,
    maxWidth: '420px',
    width: displayWidth ? displayWidth : '420px',
  };

  return (
    <div className='potz_container' style={styles.background}>
      <div className='contents_container'></div>
      <div style={styles.topBar}>
        <Box height={'70px'}>
          <div>
            <FontBig>마이 팟즈</FontBig>
          </div>
          <div>
            {' '}
            <svg
              width='29'
              height='28'
              viewBox='0 0 29 28'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M24.1351 15.844C24.5524 16.0657 24.8743 16.4157 25.1008 16.7657C25.542 17.489 25.5062 18.3757 25.077 19.1573L24.2424 20.5573C23.8013 21.304 22.9786 21.7707 22.1321 21.7707C21.7148 21.7707 21.2498 21.654 20.8682 21.4207C20.5582 21.2223 20.2006 21.1523 19.819 21.1523C18.6387 21.1523 17.6491 22.1207 17.6133 23.2757C17.6133 24.6173 16.5164 25.6673 15.1453 25.6673H13.5238C12.1407 25.6673 11.0438 24.6173 11.0438 23.2757C11.02 22.1207 10.0304 21.1523 8.85002 21.1523C8.45656 21.1523 8.09888 21.2223 7.80081 21.4207C7.41928 21.654 6.94236 21.7707 6.53699 21.7707C5.67854 21.7707 4.85587 21.304 4.41472 20.5573L3.59205 19.1573C3.1509 18.399 3.12706 17.489 3.5682 16.7657C3.75897 16.4157 4.11665 16.0657 4.52203 15.844C4.85587 15.6807 5.07048 15.4123 5.27317 15.0973C5.86931 14.094 5.51162 12.7757 4.49818 12.1807C3.31782 11.5157 2.93629 10.034 3.61589 8.87898L4.41472 7.50232C5.10625 6.34732 6.58468 5.93898 7.77696 6.61565C8.81425 7.17565 10.1615 6.80232 10.7696 5.81065C10.9604 5.48398 11.0677 5.13398 11.0438 4.78398C11.02 4.32898 11.1511 3.89732 11.3777 3.54732C11.8188 2.82398 12.6176 2.35732 13.488 2.33398H15.1691C16.0514 2.33398 16.8502 2.82398 17.2914 3.54732C17.506 3.89732 17.6491 4.32898 17.6133 4.78398C17.5895 5.13398 17.6968 5.48398 17.8875 5.81065C18.4956 6.80232 19.8429 7.17565 20.8921 6.61565C22.0724 5.93898 23.5628 6.34732 24.2424 7.50232L25.0412 8.87898C25.7328 10.034 25.3512 11.5157 24.1589 12.1807C23.1455 12.7757 22.7878 14.094 23.3959 15.0973C23.5866 15.4123 23.8013 15.6807 24.1351 15.844ZM10.96 14.012C10.96 15.8436 12.4742 17.302 14.346 17.302C16.2179 17.302 17.6964 15.8436 17.6964 14.012C17.6964 12.1803 16.2179 10.7103 14.346 10.7103C12.4742 10.7103 10.96 12.1803 10.96 14.012Z'
                fill='#373737'
              />
            </svg>
          </div>
        </Box>
      </div>
      <div style={styles.content}>
        <Box height={'227.33px'} align={'column'}>
          <Profile1>
            <img
              src='./images/graphicImg/testProfile.png'
              style={{ width: '70px' }}
            />
            <div>
              <span>
                <FontBig>{user.name}</FontBig>
                <FontSm color={`${COLOR.GRAY_500}`}>인천 연수구</FontSm>
              </span>
              <svg
                width='29'
                height='29'
                viewBox='0 0 29 29'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M10.25 6.16764L18.4167 14.3343L10.25 22.501'
                  stroke='#373737'
                  strokeWidth='1.75'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          </Profile1>
          <Profile2>
            <div>
              <FontMd weight={500} color={`${COLOR.GRAY_400}`}>
                {user.name}님! <p></p>이번 달 팟즈로{' '}
                <FontMd weight={500} color={`${COLOR.POTZ_PINK_DEFAULT}`}>
                  배달비 26000원
                </FontMd>
                을 절약했어요.
              </FontMd>
            </div>
          </Profile2>
        </Box>
      </div>
      <Box height={'74.67px'}>
        <div style={styles.verticalAlign}>
          {' '}
          <img
            style={{ width: '60.67px', height: '60.67px' }}
            src='/images/graphicImg/heart1.png'
          ></img>
          <FontMd weight={700} color={`${COLOR.BLACK}`}>
            내 맛집 빅데이터
          </FontMd>
        </div>
        <div>
          <svg
            width='29'
            height='29'
            viewBox='0 0 29 29'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.25 6.5026L18.4167 14.6693L10.25 22.8359'
              stroke='#FF4C41'
              strokeWidth='1.75'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </Box>

      <div style={styles.contentBox}>
        <Box height={'91px'}>
          <div>
            <FontMd color={COLOR.BLACK} weight={400}>
              간편 입력 계좌 번호
            </FontMd>
            <FontMd color={COLOR.GRAY_400} weight={400}>
              1234-12345-1234-1234{user.name}
            </FontMd>
          </div>
          <div>
            <img
              src='/images/graphicImg/toggleButton.png'
              style={{ width: '46.67px' }}
            ></img>
          </div>
        </Box>

        {text.map((text) => {
          return (
            <>
              <Box height={'61.83px'}>
                <div>
                  <FontMd weight={400} color={COLOR.BLACK}>
                    {text}
                  </FontMd>
                </div>
                <div>
                  <svg
                    width='29'
                    height='29'
                    viewBox='0 0 29 29'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M10.249 6.08463L18.4157 14.2513L10.249 22.418'
                      stroke='#A8A8A8'
                      strokeWidth='1.75'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              </Box>
            </>
          );
        })}
      </div>
      <div className='contents_container'>
        <div
          onClick={() => {
            logout();
            localStorage.removeItem('communityDataID');
            navigate('/');
          }}
        >
          <ButtonBg
            backgroundColor={COLOR.POTZ_PINK_DEFAULT}
            hoverColor={COLOR.POTZ_PINK_600}
            fontColor={COLOR.WHITE}
          >
            로그아웃
          </ButtonBg>
        </div>
      </div>

      <Box height={'200px'}></Box>
      <div style={navbarStyle}>
        <NavBar />
      </div>
    </div>
  );
}

export default UserProfile;
