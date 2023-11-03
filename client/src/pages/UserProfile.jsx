import '../App.css';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import COLOR from '../utility/Color';
import { NavBar1, NavBar2, NavBar3, NavBar4 } from '../components/NavBars';

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
            height: '93.33px',
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
        }

    }
  return (
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className="side_container"></div>
        </Col>
        <Col className='col2'>
            <div className="potz_container">
              <div className='contents_container'>

                <div style={styles.Wrapper}>
                    <div style={styles.myProfile}>
                        <div style={styles.myProfile2}>
                            <div style={styles.profileImg}></div>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '276.5px'}}>
                                <div>김기성</div> 
                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.249 6.08463L18.4157 14.2513L10.249 22.418" stroke="#A8A8A8" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <div style={styles.savingNotification}>
                            김기성님!
                            이번 달 팟즈로 배달비 100000000원을 절약했어요.
                        </div>
                    </div>

                    <div style={styles.myBigData}>
                        <div style={{display: 'flex', flexDirection: 'row', }}>
                            <img style={{width: '60.67px'}}src='/images/graphicImg/heart1.png'></img>
                            <div>내 맛집 빅데이터</div>
                        </div>
                        <div>
                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.25 6.5026L18.4167 14.6693L10.25 22.8359" stroke="#FF4C41" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                        </div>
                    </div>

                    <div style={styles.myBankAccount}>
                        <div>
                            <div>간편 입력 계좌 번호</div><div>1234-12345-1234-1234 김기성</div>
                        </div>

                            <svg width="64" height="44" viewBox="0 0 64 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_60_13456)">
                            <rect x="8.33301" y="5.41797" width="46.6667" height="26.8333" rx="13.4167" fill="#FF7971"/>
                            </g>
                            <g filter="url(#filter1_d_60_13456)">
                            <ellipse cx="40.4956" cy="18.835" rx="9.45946" ry="8.75" fill="white"/>
                            </g>
                            <defs>
                            <filter id="filter0_d_60_13456" x="0.166341" y="0.751302" width="63.0003" height="43.1663" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="3.5"/>
                            <feGaussianBlur stdDeviation="4.08333"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_60_13456"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_60_13456" result="shape"/>
                            </filter>
                            <filter id="filter1_d_60_13456" x="22.8695" y="5.41829" width="35.2523" height="33.8333" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="3.5"/>
                            <feGaussianBlur stdDeviation="4.08333"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_60_13456"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_60_13456" result="shape"/>
                            </filter>
                            </defs>
                            </svg>

                    </div>
                    <MySetting><div>내 공동체 관리</div>
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.249 6.08463L18.4157 14.2513L10.249 22.418" stroke="#A8A8A8" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </MySetting>

                    <MySetting><div>알림 설정</div>
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.249 6.08463L18.4157 14.2513L10.249 22.418" stroke="#A8A8A8" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </MySetting>
                    <MySetting><div>참여 내역</div>
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.249 6.08463L18.4157 14.2513L10.249 22.418" stroke="#A8A8A8" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </MySetting>
                    <MySetting><div>결제 내역</div>
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.249 6.08463L18.4157 14.2513L10.249 22.418" stroke="#A8A8A8" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </MySetting>
                    <MySetting><div>이벤트 및 공지사항</div>
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.249 6.08463L18.4157 14.2513L10.249 22.418" stroke="#A8A8A8" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </MySetting>
                    <div style={styles.myBigData}></div>

                    <NavBar4 style={styles.navBar}/>
                </div>

              </div>
            </div>
        </Col>
        <Col className='col3'>
          <div className="side_container"></div>
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfile;