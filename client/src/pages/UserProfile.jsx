import '../App.css';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import COLOR from '../utility/Color';
import { NavBar4 } from '../components/NavBars';
import Font from '../utility/Font';

//contents_container 안에 UI 구현 하시면 됩니다!

function UserProfile() {
  const MySetting = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    width: 100%;
    height: 61.83px;
    justify-content: space-between;
    border-top: 0.46px solid ${COLOR.GRAY300};
  `;

  const styles = {
    Wrapper: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    profileTitle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: '70px',
      justifyContent: 'space-between',
    },
    myProfile: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '171.33px',
      justifyContent: 'space-between',
      marginTop: '28px',
      marginBottom: '28px',
    },
    myProfile2: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: '70px',
      justifyContent: 'space-between',
    },

    profileImg: {
      width: '70px',
      height: '70px',
      backgroundColor: `${COLOR.POTZ_PINK_200}`,
      borderRadius: '50%',
    },
    savingNotification: {
      width: '100%',
      height: '78px',
      background: `${COLOR.GRAY_100}`,
      borderRadius: '9.33333px',
    },

    myBigData: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '0px',
      width: '100%',
      height: '74.67px',
      justifyContent: 'space-between',
      borderTop: `9.33px solid ${COLOR.POTZ_PINK_100}`,
      borderBottom: `9.33px solid ${COLOR.POTZ_PINK_100}`,
    },

    myBankAccount: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '0px',
      width: '100%',
      height: '91px',
      justifyContent: 'space-between',
    },
    navBar: {
      width: '100%',
    },
  };
  const Fonts = {
    FontLarge: {
      fontFamily: `${Font.FontKor}`,
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '18.6667px',
      lineHeight: '150%',
      color: '#000000',
    },
    FontMedium: {},
  };

  return (
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className='side_container'></div>
        </Col>
        <Col className='col2'>
          <div className='potz_container'>
            <div className='contents_container'>
              <div style={styles.Wrapper}>
                <div style={styles.profileTitle}>
                  <div style={{}}>마이 팟즈</div>
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
                <div style={styles.myProfile}>
                  <div style={styles.myProfile2}>
                    <div style={styles.profileImg}></div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '276.5px',
                      }}
                    >
                      <div>김기성</div>
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
                  </div>
                  <div style={styles.savingNotification}>
                    김기성님! 이번 달 팟즈로 배달비 100000000원을 절약했어요.
                  </div>
                </div>

                <div style={styles.myBigData}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <img
                      style={{ width: '60.67px' }}
                      src='/images/graphicImg/heart1.png'
                    ></img>
                    <div>내 맛집 빅데이터</div>
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
                </div>

                <div style={styles.myBankAccount}>
                  <div>
                    <div>간편 입력 계좌 번호</div>
                    <div>1234-12345-1234-1234 김기성</div>
                  </div>

                  <svg
                    width='64'
                    height='44'
                    viewBox='0 0 64 44'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g filter='url(#filter0_d_60_13456)'>
                      <rect
                        x='8.33301'
                        y='5.41797'
                        width='46.6667'
                        height='26.8333'
                        rx='13.4167'
                        fill='#FF7971'
                      />
                    </g>
                    <g filter='url(#filter1_d_60_13456)'>
                      <ellipse
                        cx='40.4956'
                        cy='18.835'
                        rx='9.45946'
                        ry='8.75'
                        fill='white'
                      />
                    </g>
                    <defs>
                      <filter
                        id='filter0_d_60_13456'
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
                          result='effect1_dropShadow_60_13456'
                        />
                        <feBlend
                          mode='normal'
                          in='SourceGraphic'
                          in2='effect1_dropShadow_60_13456'
                          result='shape'
                        />
                      </filter>
                      <filter
                        id='filter1_d_60_13456'
                        x='22.8695'
                        y='5.41829'
                        width='35.2523'
                        height='33.8333'
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
                          result='effect1_dropShadow_60_13456'
                        />
                        <feBlend
                          mode='normal'
                          in='SourceGraphic'
                          in2='effect1_dropShadow_60_13456'
                          result='shape'
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <MySetting>
                  <div>내 공동체 관리</div>
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
                </MySetting>

                <MySetting>
                  <div>알림 설정</div>
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
                </MySetting>
                <MySetting>
                  <div>참여 내역</div>
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
                </MySetting>
                <MySetting>
                  <div>결제 내역</div>
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
                </MySetting>
                <MySetting>
                  <div>이벤트 및 공지사항</div>
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
                </MySetting>
                <div style={styles.myBigData}></div>

                <NavBar4 style={styles.navBar} />
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

export default UserProfile;
