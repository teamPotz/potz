import '../../App.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import COLOR from '../../utility/Color.js';
import Font from '../../utility/Font.js';
import styled from 'styled-components';
import GoBack from '../../components/goBack.jsx';
// import SelectMenu from '../../components/selectMenu';
// import CheckMenu from '../../components/ckeckMenu';
import ChatNavBar from '../../components/chat/ChatNavBar.jsx';
import ChatInput from '../../components/chat/ChatInput.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';

import { useLocation, useParams } from 'react-router-dom';

import { socket } from '../../../socket.js';
import LoadingPage from '../LoadingPage.jsx';
// import { io } from 'socket.io-client';

const MessageBox = styled.div`
  background-color: ${(props) =>
    props.isMyMessage ? `${COLOR.POTZ_PINK_500}` : `${COLOR.WHITE}`};
  border-radius: 14px 14px 14px 14px;
  width: auto;
  max-width: 276.5px;
  padding: 4.66667px 14px;
  margin-left: ${(props) => (props.isMyMessage ? 'auto' : 'none')};
  margin-right: ${(props) => (props.isMyMessage ? 'none' : 'auto')};
  font-family: ${Font.FontKor};
  font-style: normal;
  font-weight: 400;
  font-size: 16.3333px;
  color: ${(props) =>
    props.isMyMessage ? `${COLOR.WHITE}` : `${COLOR.BLACK}`};
  & > div {
    font-size: 14px;
    margin-right: ${(props) => (props.isMyMessage ? 'auto' : 'none')};
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.isMyMessage ? 'none' : 'flex-end')};
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
    width: '420px',
    height: '61.83px',
    bottom: '0',
    background: `${COLOR.WHITE}`,
  },
  Content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '9.33px',
    marginTop: '91px',
    marginBottom: '211.17px',
  },
};

function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const [isPotMaster, setIsPotMaster] = useState(false);
  const [isLoadingGetMessage, setIsLoadingGetMessage] = useState(false);
  const [isLoadingSendMessage, setisLoadingSendMessage] = useState(false);

  const { user } = useAuth();
  const { potId } = useParams();
  const { state } = useLocation();

  async function fetchMessages() {
    setIsLoadingGetMessage(true);
    try {
      const res = await fetch(`http://localhost:5000/messages/${potId}`, {
        credentials: 'include',
      });
      const data = await res.json();
      // console.log(data);
      setMessages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingGetMessage(false);
    }
  }

  async function sendMessage(e) {
    // if (e.key !== 'Enter' || !newMessage) return;

    try {
      setisLoadingSendMessage(true);
      const res = await fetch('http://localhost:5000/messages/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          potId: +potId,
          content: newMessage,
        }),
      });
      if (!res.ok) {
        throw new Error('send message error');
      }
      // const data = await res.json();
      const data = await res.json();
      // console.log(data);
      // setMessages((prevMessages) => [...prevMessages, data]);
    } catch (error) {
      console.error(error);
    } finally {
      setisLoadingSendMessage(false);
      setNewMessage('');
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    socket.connect();
    socket.emit('join', { potId, user });
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    socket.on('join', (data) => {
      console.log(data);
    });
    socket.on('message', (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('exit', (data) => {
      console.log(data);
    });

    return () => {
      socket.off('connect', () => setIsConnected(true));
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const scroll = document.querySelector('.potz_container');
    scroll.scrollTop = scroll.scrollHeight;
  }, [messages]);

  if (!user) {
    return <LoadingPage />;
  }

  return (
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className='side_container'></div>
        </Col>

        <Col className='col2'>
          <div className='potz_container' style={styles.background}>
            <GoBack text={state?.storeName}></GoBack>

            <div className='contents_container' style={styles.Content}>
              {/* <button onClick={() => socket.connect()}>Connect</button>
              <button onClick={() => socket.disconnect()}>disConnect</button> */}

              {/* <input onChange={(e) => setValue(e.target.value)} /> */}
              {/* <button type='submit' disabled={isLoading}>
              {/* Submit */}
              {/* </button> */}
              {messages &&
                messages.map((message) => (
                  <MessageBox key={message.id}>{message.content}</MessageBox>
                ))}
            </div>
            {/* <MessageBox isMyMessage={true}>
                안녕하세요
                <div>
                  11:51
                  <svg
                    width='13'
                    height='10'
                    viewBox='0 0 13 10'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M4.61751 7.95284L2.03616 5.37149C1.9078 5.24752 1.73589 5.17892 1.55745 5.18047C1.37901 5.18202 1.20832 5.2536 1.08214 5.37978C0.955962 5.50596 0.884389 5.67665 0.882838 5.85509C0.881288 6.03353 0.949884 6.20544 1.07385 6.33379L4.13635 9.39629C4.26398 9.52388 4.43705 9.59555 4.61751 9.59555C4.79796 9.59555 4.97104 9.52388 5.09866 9.39629L12.5848 1.91018C12.7087 1.78183 12.7773 1.60992 12.7758 1.43148C12.7742 1.25304 12.7027 1.08235 12.5765 0.956166C12.4503 0.829986 12.2796 0.758412 12.1012 0.756862C11.9227 0.755311 11.7508 0.823908 11.6225 0.947876L4.61751 7.95284Z'
                      fill='white'
                    />
                  </svg>
                </div>
              </MessageBox>

              <MessageBox isMyMessage={false}>
                반가워요<div>12:14</div>
              </MessageBox>
              
              <SelectMenu isMyMessage={true}></SelectMenu>
              <MessageBox isMyMessage={false}>
                2000원 더 모이면 3000원 할인 쿠폰을 사용할 수 있다는데 어떻게
                하실래요?<div>12:15</div>
              </MessageBox>
              <CheckMenu isMyMessage={false}></CheckMenu>
              <MessageBox isMyMessage={false}>
                반가워요<div>12:14</div>
              </MessageBox>
              <SelectMenu isMyMessage={true}></SelectMenu>
              <MessageBox isMyMessage={false}>
                2000원 더 모이면 3000원 할인 쿠폰을 사용할 수 있다는데 어떻게
                하실래요?<div>12:15</div>
              </MessageBox>
              <CheckMenu isMyMessage={false}></CheckMenu> */}
            {/* <ChatNavBar isBangJang={isPotMaster} /> */}
            <div style={styles.ChatInputBox}>
              <input
                type='text'
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                // onKeyDown={sendMessage}
                disabled={!isConnected}
              />
              <button onClick={sendMessage}>send</button>
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

export default Chat;
