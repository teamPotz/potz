import '../../App.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import COLOR from '../../utility/Color.js';
import Font from '../../utility/Font.js';
import GoBack from '../../components/goBack.jsx';
import LoadingPage from '../LoadingPage.jsx';
import ChatMenu from '../../components/chat/ChatMenu.jsx';
import ChatInput from '../../components/chat/ChatInput.jsx';

import { useAuth } from '../../contexts/AuthContext.jsx';
import { useLocation, useParams } from 'react-router-dom';
import { socket } from '../../../socket.js';
import MessageContainer from './MessageContainer.jsx';
// import { io } from 'socket.io-client';

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

              {/*  todo : isMyMessage */}
              <MessageContainer messages={messages} isMyMessage={{}} />
            </div>

            <ChatMenu isPotMaster={isPotMaster} />
            <ChatInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessage={sendMessage}
              isConnected={isConnected}
            />
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
