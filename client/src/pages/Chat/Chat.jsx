import '../../App.css';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import COLOR from '../../utility/Color';
import ChatRequireButton from '../../components/ChatRequireButton';
import ChatInput from '../../components/ChatInput';
import styled from 'styled-components';

//contents_container 안에 UI 구현 하시면 됩니다!

function Chat() {
  const BangJang = false;    //props로 방장인지 아닌지 결정 이건 임시

  const GoBack = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    width: 420px;
    height: 70px;
    justify-content: space-between;
    box-shadow: 0px 1.16667px 2.33333px rgba(0, 0, 0, 0.08);
    background-color: ${COLOR.WHITE};
    position: fixed;
    top: 0;
    & div {
      margin: 28px;
    }
  `;
  const MyMessageBox = styled.div`
    background-color: ${COLOR.POTZ_PINK_500};
    border-radius: 14px 14px 14px 14px;
    width: auto;
    max-width: 276.5px;
    padding: 4.66667px 14px;
    margin-left: auto;
    & > div {
      margin-right: auto;
    }
  `;
  const OpponentMessageBox = styled.div`
    background-color: ${COLOR.WHITE};
    border-radius: 14px 14px 14px 14px;
    max-width: 276.5px;
    padding: 4.66667px 14px;
    margin-right: auto;
    & > div {
      display: flex;
      justify-content: flex-end;
    }
  `;

  const styles = {
    Wrapper: {
      position: 'fixed',
      bottom: 0,
      width: '420px',
      height: '190.17px',
    },
    background: {
      backgroundColor: `${COLOR.POTZ_PINK_200}`,
      width: '420px',
      height: '100vh',
    },
    ChatBox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      gap: '56px',
      position: 'absolute',
      width: '100%',
      height: '128.33px',
      left: '0px',
      bottom: '61.83px',
      background: `${COLOR.WHITE}`,
      boxShadow: '0px 26.8333px 61.8333px rgba(0, 0, 0, 0.11)',
    },
    RequireButtonBox: {
      display: 'flex',
      alignItems: 'center',
      padding: '0px',
      gap: '9.33px',
      width: '70px',
      height: '100%',
    },
    ChatInputBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: '100%',
      height: '61.83px',
      left: '0px',
      bottom: '0px',
      background: `${COLOR.WHITE}`,
    },
    Content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '9.33px',
      marginTop: '70px',
      marginBottom: '190.17px',
    },
  };

  return (
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className='side_container'></div>
        </Col>
        <Col className='col2'>
          <div className='potz_container' style={styles.background}>
            <GoBack>
              <div style={{ width: '214.67px' }}>
                <svg
                  width='29'
                  height='28'
                  viewBox='0 0 29 28'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M18.7495 22.1673L10.5828 14.0007L18.7495 5.83398'
                    stroke='black'
                    strokeWidth='1.75'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                버거킹 하버뷰점
              </div>
              <div>마감</div>
            </GoBack>

            {/* 받아온 데이터는 contents-container에 구현합니다. */}
            <div className='contents_container' style={styles.Content}>
              <MyMessageBox>
                안녕하세요.<div>11:51</div>
              </MyMessageBox>
              <OpponentMessageBox>반가워요</OpponentMessageBox>
            </div>

            {BangJang ? (
              <div style={styles.Wrapper}>
                <div style={styles.ChatBox}>
                  <div style={styles.RequireButtonBox}>
                    <ChatRequireButton
                      imageURL={'images/components/icon-coin-mono.png'}
                      text={'정산 요청'}
                    ></ChatRequireButton>
                  </div>

                  <div style={styles.RequireButtonBox}>
                    <ChatRequireButton
                      imageURL={'images/components/Union.png'}
                      text={'메뉴 요청'}
                    ></ChatRequireButton>
                  </div>

                  <div style={styles.RequireButtonBox}>
                    <ChatRequireButton
                      imageURL={'images/components/Arrow - Right Square.png'}
                      text={'수령 요청'}
                    ></ChatRequireButton>
                  </div>
                </div>
                <div style={styles.ChatInputBox}>
                  <ChatInput />
                </div>
              </div>
            ) : (
              <div style={styles.Wrapper}>
                <div style={styles.ChatBox}>
                  <div style={styles.RequireButtonBox}>
                    <ChatRequireButton
                      imageURL={'images/components/Union.png'}
                      text={'메뉴 전송'}
                    ></ChatRequireButton>
                  </div>
                </div>
                <div style={styles.ChatInputBox}>
                  <ChatInput />
                </div>
              </div>
            )}
          </div>
        </Col>
        <Col className='col3'>
          <div className='side_container'></div>
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
