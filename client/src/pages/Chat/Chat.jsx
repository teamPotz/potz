import { useState, useEffect } from 'react';
import GoBack from '../../components/goBack.jsx';
import ChatMenu from '../../components/chat/ChatMenu.jsx';
import ChatInput from '../../components/chat/ChatInput.jsx';
import MessageContainer from '../../components/chat/messages/MessageContainer.jsx';
import COLOR from '../../utility/Color.js';

import { useAuth } from '../../contexts/AuthContext.jsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { socket } from '../../../socket.js';
import OrderModal from '../../components/chat/OrderModal.jsx';
import { useChat } from '../../contexts/ChatContext.jsx';
// import { io } from 'socket.io-client';

function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const [isPotMaster, setIsPotMaster] = useState(false);
  const [isLoadingGetMessage, setIsLoadingGetMessage] = useState(false);
  const [isLoadingSendMessage, setisLoadingSendMessage] = useState(false);
  const [openMenuBar, setOpenMenuBar] = useState(false);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [orderFormData, setOrderFormData] = useState({
    file: null,
    menuName: '',
    quantity: 0,
    price: 0,
  });

  const { state } = useLocation();
  const { potId } = useParams();
  const { user } = useAuth();
  const { leavePot, setSelectedPot } = useChat();
  const navigate = useNavigate();

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

  async function sendTextMessage() {
    if (!newMessage) return;
    if (isLoadingSendMessage) return;

    try {
      setisLoadingSendMessage(true);
      const res = await fetch('http://localhost:5000/messages/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          potId: +potId,
          type: 'text',
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

  async function sendOrderMessage() {
    const { file, menuName, quantity, price } = orderFormData;

    if (!menuName || !quantity || !price) {
      alert('이미지 외 모든 필드를 작성해주세요.');
      return;
    }
    if (!Number.isInteger(+quantity) || !Number.isInteger(+price)) {
      alert('금액과 숫자는 정수로 적어주세요');
      return;
    }

    const formData = new FormData();
    formData.append('potId', potId);
    formData.append('menuName', menuName);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('image', file);

    try {
      const res = await fetch('http://localhost:5000/orders/', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('send order message error');
      }
      const data = await res.json();
      setOpenOrderModal(false);
      setOrderFormData({
        file: null,
        menuName: '',
        quantity: 0,
        price: 0,
      });
      // setPreviewImage(null);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(orderFormData);
  }, [orderFormData]);

  async function handleOrderFileChange(e) {
    const file = e.target.files[0];
    setOrderFormData((prev) => ({ ...prev, file }));
  }

  async function handleOrderFormChange(e) {
    const { name, value } = e.target;
    setOrderFormData((prev) => ({ ...prev, [name]: value }));
  }

  function setConfirmOrder(orderId) {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === orderId && message.type === 'order'
          ? { ...message, orderConfirmed: true }
          : message
      )
    );
  }

  async function confirmOrder(orderId) {
    if (!isPotMaster) {
      return alert('메뉴 확인은 방장만 할 수 있습니다.');
    }
    try {
      const res = await fetch(
        `http://localhost:5000/orders/${orderId}/order-confirm`,
        {
          method: 'PATCH',
          credentials: 'include',
        }
      );
      if (!res.ok) {
        throw new Error('confirm order error');
      }
      const data = await res.json();
      setConfirmOrder(data.id);
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect(() => {
  //   socket.connect();
  //   socket.on('connect', () => setIsConnected(true));
  //   socket.on('disconnect', () => setIsConnected(false));
  //   socket.emit('join', { potId, user });

  //   socket.on('message', (data) => {
  //     console.log('message', data);
  //     setMessages((prevMessages) => [...prevMessages, data]);
  //   });

  //   // return () => {
  //   //   socket.off('connect', () => setIsConnected(true));
  //   //   socket.disconnect();
  //   // };
  // }, []);

  useEffect(() => {
    async function connectRoom() {
      await fetchMessages();

      // socket.connect();
      // socket.emit('setUserId', user.id);
      // socket.on('connect', () => setIsConnected(true));
      // socket.on('disconnect', () => setIsConnected(false));

      socket.on('message', (data) => {
        console.log('message', data);
        setMessages((prevMessages) => [...prevMessages, data]);
      });
      socket.emit('join', { potId, user });
    }

    connectRoom();

    return () => setSelectedPot(null);
  }, []);

  // check PotMaster
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
        setIsPotMaster(data.potMasterId === user.id);
      } catch (error) {
        console.error(error);
      }
    }
    getPotMasterId();
  }, [potId, user]);

  {
    /* <button onClick={() => socket.connect()}>Connect</button> */
    /* <button onClick={() => socket.disconnect()}>disConnect</button> */
  }

  return (
    <div
      className='potz_container'
      style={{ backgroundColor: COLOR.POTZ_PINK_200 }}
    >
      <GoBack text={state?.storeName} />

      {/* test buttons */}
      <div style={{ position: 'fixed', top: '70px' }}>
        <div>
          <button>메뉴요청</button>
          <button>정산요청</button>
          <button>수령요청</button>
        </div>
        <div>
          <button onClick={() => setOpenOrderModal(true)}>메뉴 선택</button>
          <button onClick={() => setOpenOrderModal(true)}>입금 인증</button>
          <button
            onClick={() => {
              leavePot(potId, user, socket);
              navigate(-1);
            }}
          >
            퇴장
          </button>
        </div>
      </div>

      <div>
        <MessageContainer
          messages={messages}
          isMenuBarOpened={openMenuBar}
          isPotMaster={isPotMaster}
          confirmOrder={confirmOrder}
        />
      </div>

      {openMenuBar && (
        <ChatMenu isPotMaster={isPotMaster} leavePot={leavePot} />
      )}

      <ChatInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendTextMessage}
        isConnected={isConnected}
        toggleMenuBar={() => setOpenMenuBar((prev) => !prev)}
      />

      {openOrderModal && (
        <OrderModal
          closeModal={() => setOpenOrderModal(false)}
          orderFormData={orderFormData}
          handleFileChange={handleOrderFileChange}
          handleFormChange={handleOrderFormChange}
          sendOrderMessage={sendOrderMessage}
        />
      )}
    </div>
  );
}

export default Chat;
