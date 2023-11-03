import '../App.css';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import COLOR from '../utility/Color';
import ChatRequireButton from '../components/ChatRequireButton';
import ChatInput from '../components/ChatInput';

const Chat = () => {
  const style1={
    position: 'absolute',
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: '420px',
    height : "100vh",
  };

  const styles = {
    Wrapper: {
      position: 'relative',
      background: `${COLOR.POTZ_PINK_200}`,
      width: '100%',
      height: '100%',
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
  };

  return (
    <>
      <Container className='background'>
        <Row className='row1'>
          <Col className='col1'>
            <div className='side_container'></div>
          </Col>
          <Col className='col2'>
            <div className='potz_container'>
              <div className='contents_container' style={style1}>

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

              </div>
            </div>
          </Col>
          <Col className='col3'>
            <div className='side_container'></div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Chat;
