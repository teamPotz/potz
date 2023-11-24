import { useState, useEffect } from 'react';
import COLOR from '../../utility/Color.js';
import GoBack from '../../components/goBack.jsx';
import ChatMenu from '../../components/chat/ChatMenu.jsx';
import ChatInput from '../../components/chat/ChatInput.jsx';
import MessageContainer from './MessageContainer.jsx';

import { useAuth } from '../../contexts/AuthContext.jsx';
import { useLocation, useParams } from 'react-router-dom';
// import { socket } from '../../../socket.js';
import { io } from 'socket.io-client';

const styles = {
  background: {
    backgroundColor: `${COLOR.POTZ_PINK_200}`,
    width: '420px',
    height: '100vh',
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
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const [isPotMaster, setIsPotMaster] = useState(false);
  const [isLoadingGetMessage, setIsLoadingGetMessage] = useState(false);
  const [isLoadingSendMessage, setisLoadingSendMessage] = useState(false);

  const { potId } = useParams();
  const { state } = useLocation();
  const { user } = useAuth();

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
    if (isLoadingSendMessage) return;
    // if (!(e.key === 'Enter' || e.type === 'click') || !newMessage) {
    if (!newMessage) {
      return;
    }

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
      const data = await res.json();
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
    const socket = io('http://localhost:5000/chat');
    socket.connect();
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    socket.emit('join', { potId, user });
    socket.on('join', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    socket.on('message', (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    socket.on('exit', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // return () => {
    //   socket.off('connect', () => setIsConnected(true));
    //   socket.disconnect();
    // };
  }, []);

  // useEffect(() => {
  //   const scroll = document.querySelector('.potz_container');
  //   scroll.scrollTop = scroll.scrollHeight;
  // }, [messages]);

  useEffect(() => {
    async function getPotMasterId() {
      try {
        const res = await fetch(
          `http://localhost:5000/delivery-pots/${potId}/pot-master`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );
        if (!res.ok) {
          throw new Error('get potMasterId error');
        }
        const data = await res.json();
        console.log('yoooo', data);
        setIsPotMaster(data.potMasterId === user.id);
      } catch (error) {
        console.error(error);
      }
    }
    getPotMasterId();
  }, [potId, user]);

  {
    /* <button onClick={() => socket.connect()}>Connect</button> */
  }
  {
    /* <button onClick={() => socket.disconnect()}>disConnect</button> */
  }
  {
    /*  todo : isMyMessage */
  }
  return (
    <div className='potz_container'>
      <GoBack text={state?.storeName} />
      <div style={styles.background}>
        <div className='contents_container' style={styles.Content}>
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
    </div>
  );
}

export default Chat;
