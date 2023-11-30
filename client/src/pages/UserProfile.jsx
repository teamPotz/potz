import COLOR from '../utility/Color';
import styled from 'styled-components';
import Font from '../utility/Font';
import NavBar from '../components/ui/NavBar';
import { useAuth } from '../contexts/AuthContext';
import ButtonBg from '../components/ButtonBG';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfileEditModal from '../components/userProfileEditModal';

const Box = styled.div`
  display: flex;
  flex-direction: ${(props) => props.align};
  align-items: center;
  width: 100%;
  height: ${(props) => props.height};
  justify-content: space-between;
  background-color: ${COLOR.WHITE};
  div {
    margin: 28px;
    svg {
      cursor: grab;
      transition: all 0.2s ease;
      &:hover {
        transform: ${(props) => (props.noTransform ? 'none' : 'scale(1.18)')};
      }
    }
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
  filter: ${(props) => (props.blur ? 'blur(5px)' : 'none')};
  transition: 0.2s;
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
  ['내 공동체 관리', '/my-page/communites'],
  ['알림 설정'],
  ['참여 내역'],
  ['결제 내역'],
  ['이벤트 및 공지사항'],
];

function UserProfile() {
  const { user, logout } = useAuth();
  console.log(user);
  const navigate = useNavigate();
  // 화면 너비 측정을 위한 state 변수 // 디폴트는 420px
  const [displayWidth, setdisplayWidth] = useState(window.innerWidth);
  const [visible, setVisible] = useState(false);

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

  const [blur, setBlur] = useState(true);
  const blurHandler = () => {
    if (blur) {
      setBlur(false);
    } else {
      setBlur(true);
    }
  };

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

  const profileEditHandler = () => {
    setVisible(true);
  };

  return (
    <div className='potz_container' style={styles.background}>
      {visible ? (
        <UserProfileEditModal
          user={user}
          setVisible={setVisible}
        ></UserProfileEditModal>
      ) : null}
      <div className='contents_container'></div>
      <div style={styles.topBar}>
        <Box height={'70px'}>
          <div>
            <FontBig>마이 팟즈</FontBig>
          </div>
          <div></div>
        </Box>
      </div>
      <div style={styles.content}>
        <Box height={'227.33px'} align={'column'}>
          <Profile1>
            <img
              src={
                user.profile.imageUrl.startsWith('https')
                  ? user.profile.imageUrl
                  : `http://localhost:5000/${user.profile.imageUrl}`
              }
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <div>
              <span>
                <FontBig>{user.name}</FontBig>
                <FontSm color={`${COLOR.GRAY_500}`}>
                  {user.profile?.address}
                </FontSm>
              </span>
              <svg
                onClick={profileEditHandler}
                width='28'
                height='28'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M19.4437 8.51767L10.4945 20.5866C10.0838 21.1346 9.47856 21.4429 8.83007 21.4543L5.26337 21.5C5.06883 21.5 4.9067 21.363 4.86347 21.1689L4.05286 17.5037C3.91235 16.83 4.05286 16.1335 4.46357 15.5969L10.808 7.03332C10.916 6.8963 11.1106 6.87461 11.2403 6.97623L13.9099 9.19133C14.0828 9.33977 14.3206 9.4197 14.5692 9.38544C15.0988 9.31693 15.4555 8.81454 15.4014 8.27789C15.369 8.00386 15.2393 7.77549 15.0664 7.60422C15.0123 7.55855 12.4724 5.43479 12.4724 5.43479C12.3103 5.29778 12.2779 5.04658 12.4076 4.87645L13.4127 3.51656C14.3422 2.27199 15.9635 2.15781 17.2712 3.24253L18.7736 4.48709C19.3896 4.98949 19.8003 5.65174 19.9409 6.34824C20.103 7.11439 19.93 7.86684 19.4437 8.51767Z'
                  fill='black'
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
          <img
            style={{ width: '60.67px', height: '60.67px' }}
            src='/images/graphicImg/heart1.png'
          />
          <FontMd weight={700} color={`${COLOR.BLACK}`}>
            내 맛집 빅데이터
          </FontMd>
        </div>
        <div>
          <svg
            onClick={() => navigate('/my-page/bigdata')}
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
        <Box height={'91px'} noTransform={true}>
          <div>
            <FontMd color={COLOR.BLACK} weight={400}>
              간편 입력 계좌 번호
            </FontMd>
            <FontMd color={COLOR.GRAY_400} weight={400} blur={blur}>
              1234-12345-1234-1234 {user.name}
            </FontMd>
          </div>
          <div onClick={blurHandler} style={{ cursor: 'pointer' }}>
            <svg
              width='64'
              height='44'
              viewBox='0 0 64 44'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g filter='url(#filter0_d_60_13457)'>
                <rect
                  style={{ transition: 'all 0.2s ease' }}
                  x='8.33301'
                  y='5.41797'
                  width='46.6667'
                  height='26.8333'
                  rx='13.4167'
                  fill={blur ? COLOR.GRAY_300 : COLOR.POTZ_PINK_DEFAULT}
                />
              </g>
              <g filter='url(#filter1_d_60_13456)'>
                <ellipse
                  style={{ transition: 'all 0.2s ease' }}
                  cx={blur ? '23' : '40.4956'}
                  cy='18.835'
                  rx='9.45946'
                  ry='8.75'
                  fill='white'
                />
              </g>
              <defs>
                <filter
                  id='filter0_d_60_13457'
                  x='0.166341'
                  y='0.751302'
                  width='63.0003'
                  height='43.1663'
                  filterUnits='userSpaceOnUse'
                  colorInterpolationFilters='sRGB'
                >
                  <feFlood floodOpacity='0' result='BackgroundImageFix' />
                  <feColorMatrix
                    in='SourceAlpha'
                    type='matrix'
                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                    result='hardAlpha'
                  />
                  <feOffset dy='3.5' />
                  <feGaussianBlur stdDeviation='4.08333' />
                  <feComposite in2='hardAlpha' operator='out' />
                  <feColorMatrix
                    type='matrix'
                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0'
                  />
                  <feBlend
                    mode='normal'
                    in2='BackgroundImageFix'
                    result='effect1_dropShadow_60_13457'
                  />
                  <feBlend
                    mode='normal'
                    in='SourceGraphic'
                    in2='effect1_dropShadow_60_13457'
                    result='shape'
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </Box>

        {text.map((text) => {
          return (
            <>
              <Box height={'61.83px'}>
                <div>
                  <FontMd weight={400} color={COLOR.BLACK}>
                    {text[0]}
                  </FontMd>
                </div>
                <div>
                  <svg
                    onClick={() => navigate(text[1])}
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
        <ButtonBg
          backgroundColor={COLOR.POTZ_PINK_DEFAULT}
          hoverColor={COLOR.POTZ_PINK_600}
          fontColor={COLOR.WHITE}
          onClick={() => {
            logout();
            navigate('/');
          }}
        >
          로그아웃
        </ButtonBg>
      </div>

      <Box height={'200px'}></Box>
      <div style={navbarStyle}>
        <NavBar />
      </div>
    </div>
  );
}

export default UserProfile;
