import '../App.css';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import COLOR from '../utility/Color';
import styled from 'styled-components';
import { NavBar4 } from '../components/NavBars';

//contents_container 안에 UI 구현 하시면 됩니다!

function UserProfile() {
  const Profile = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${COLOR.WHITE};
    height: 171.33px;
    & > div{
      margin: 14px;
    }
    & > div:first-child{
      display: flex;
      flex-direction: row;
      height: 70px;
      & > img{
        width: 70px;
        height: 70px;
        borderRadius: '50%',
      }
      & > div:last-child{
        display: flex;
        flex-direction: row;
        width: 276.5px;
        justify-content: space-between;
        
      }
    }
    & > div:last-child{
      height: 78px;
      background-color: ${COLOR.GRAY_100};
      border-radius: 9.33333px;

    }
  `;
  const MyBigData = styled.div`
    display: flex;
    flex-direction: row;
    alignitems: center;
    width: 100%;
    height: 74.67px;
    justify-content: space-between;
    background-color: ${COLOR.WHITE};
    & div {
      display: flex;
      flex-direction: row;
      margin: 28px;
    }
  `;
  const MySetting = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 61.83px;
    justify-content: space-between;
    background-color: ${COLOR.WHITE};
    & div {
      margin: 28px;
    }
  `;

  const styles = {
    background: {
      backgroundColor: `${COLOR.POTZ_PINK_100}`,
      display: 'flex',
      flexDirection: 'column',
      gap: '9.33px',
    },
    profileTitle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: '70px',
      justifyContent: 'space-between',
      backgroundColor: `${COLOR.WHITE}`
    },
    myBankAccount: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '0px',
      width: '100%',
      height: '91px',
      justifyContent: 'space-between',
      backgroundColor: `${COLOR.WHITE}`,
    },
  };

  const gap = {
    gapSm: {
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

  return (
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className='side_container'></div>
        </Col>
        <Col className='col2'>
          <div className='potz_container' style={styles.background}>
            <div className='contents_container'></div>
            <div style={styles.profileTitle}>
                  <div>마이 팟즈</div>
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
            <Profile>
              <div>
                <img src='/images/graphicImg/testProfile.png'/>
              <div>김기성<svg
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
                      </svg></div>
                      
              </div>
              <div>
                김기성님!<br></br>이번 달 팟즈로 배달비 100000000원을 절약했어요.
              </div>
            </Profile>
            <MyBigData>
              <div>
                <img
                  style={{ width: '60.67px', height: '60.67px' }}
                  src='/images/graphicImg/heart1.png'
                ></img>
                내 맛집 빅데이터
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
            </MyBigData>

            <div style={gap.gapSm}>
              <div style={styles.myBankAccount}>
                <div style={{ margin: '28px' }}>
                  <div>간편 입력 계좌 번호</div>
                  <div>1234-12345-1234-1234 김기성</div>
                </div>

                <div style={{ margin: '28px' }}>
                  <img
                    src='/images/graphicImg/toggleButton.png'
                    style={{ width: '46.67px' }}
                  ></img>
                </div>
              </div>

              {text.map((text) => {
                return (
                  <>
                    <MySetting>
                      <div>{text}</div>
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
                    </MySetting>
                  </>
                );
              })}
            </div>

            <div style={styles.myBigData}></div>
            <NavBar4 style={styles.navBar} />
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
