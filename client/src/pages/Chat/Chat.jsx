import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import COLOR from '../../utility/Color.js';
import GoBack from '../../components/goBack.jsx';
import ChatMenu from '../../components/chat/ChatMenu.jsx';
import ChatInput from '../../components/chat/ChatInput.jsx';
import MessageContainer from '../../components/chat/messages/MessageContainer.jsx';
import OrderModal from '../../components/chat/OrderModal.jsx';
import DepositModal from '../../components/chat/DepositModal.jsx';

import { useChat } from '../../contexts/ChatContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { socket } from '../../../socket.js';
// import { io } from 'socket.io-client';

const initialOrderData = {
  file: null,
  menuName: '',
  quantity: null,
  price: null,
};

const initialDepositData = {
  file: null,
  depositor: '',
  amount: null,
};

function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const [isPotMaster, setIsPotMaster] = useState(false);
  const [isLoadingGetMessage, setIsLoadingGetMessage] = useState(false);
  const [isLoadingSendMessage, setisLoadingSendMessage] = useState(false);
  const [openMenuBar, setOpenMenuBar] = useState(false);

  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [orderFormData, setOrderFormData] = useState(initialOrderData);

  const [openDepositModal, setOpenDepositModal] = useState(false);
  const [depositFormData, setDepositFormData] = useState(initialDepositData);

  const { state } = useLocation();
  const { potId } = useParams();
  const { user } = useAuth();
  const { joinPot, leavePot } = useChat();
  const navigate = useNavigate();

  async function fetchMessages() {
    setIsLoadingGetMessage(true);
    try {
      const res = await fetch(
        `http://localhost:5000/delivery-pots/${potId}/messages`,
        { credentials: 'include' }
      );
      const data = await res.json();
      // console.log(data);
      setMessages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingGetMessage(false);
    }
  }

  // text message
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
          type: 'TEXT',
          content: { message: newMessage },
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

  // order message
  async function handleOrderFormChange(e) {
    const { type, name, value } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      setOrderFormData((prev) => ({ ...prev, file }));
    }

    setOrderFormData((prev) => ({ ...prev, [name]: value }));
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
      setOrderFormData(initialOrderData);
    } catch (error) {
      console.error(error);
    }
  }

  async function confirmOrder(orderId, messageId) {
    if (!isPotMaster) {
      return alert('메뉴 확인은 방장만 할 수 있습니다.');
    }
    try {
      const res = await fetch(
        `http://localhost:5000/orders/${orderId}/confirm`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ messageId }),
        }
      );
      if (!res.ok) {
        throw new Error('confirm order error');
      }
      const data = await res.json();

      // update message
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === messageId
            ? {
                ...message,
                content: { ...message.content, orderConfirmed: true },
              }
            : message
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  // deposit message
  async function handleDepositFormChange(e) {
    const { type, name, value } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      setDepositFormData((prev) => ({ ...prev, file }));
    }

    setDepositFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function sendDepositMessage() {
    const { file, depositor, amount } = depositFormData;

    if (!depositor || !amount) {
      alert('이미지 외 모든 필드를 작성해주세요.');
      return;
    }
    if (!Number.isInteger(+amount)) {
      alert('입금액은 정수로 적어주세요');
      return;
    }

    const formData = new FormData();
    formData.append('potId', potId);
    formData.append('depositor', depositor);
    formData.append('amount', amount);
    formData.append('image', file);

    try {
      const res = await fetch('http://localhost:5000/deposits/', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('send deposit message error');
      }
      const data = await res.json();
      setOpenDepositModal(false);
      setDepositFormData(initialDepositData);
    } catch (error) {
      console.error(error);
    }
  }

  async function confirmDeposit(orderId, messageId) {
    if (!isPotMaster) {
      return alert('입금 확인은 방장만 할 수 있습니다.');
    }
    try {
      const res = await fetch(
        `http://localhost:5000/deposits/${orderId}/confirm`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ messageId }),
        }
      );
      if (!res.ok) {
        throw new Error('confirm deposit error');
      }
      const data = await res.json();

      // update message
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === messageId
            ? {
                ...message,
                content: { ...message.content, depositConfirmed: true },
              }
            : message
        )
      );
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
      await joinPot(potId, user, socket);
      await fetchMessages();

      socket.connect();
      // socket.emit('setUserId', user.id);
      socket.on('connect', () => setIsConnected(true));
      socket.on('disconnect', () => setIsConnected(false));

      // 메시지 수신
      socket.on('message', (data) => {
        console.log('message', data);
        setMessages((prevMessages) => [...prevMessages, data]);

        // 읽음 처리 emit
        socket.emit('readMessage', {
          potId,
          messageId: data.id,
          userId: user.id,
        });
      });

      // 메시지 읽음
      socket.on('updateCount', ({ messageId, readBy, readCount }) => {
        console.log({ messageId, readBy, readCount });
        // update message
        setMessages((prevMessages) =>
          prevMessages.map((m) => (m.id === messageId ? { ...m, readBy } : m))
        );
      });

      // 메시지 전부 읽음(방 진입 시)
      socket.on('updateCountAll', (userId) => {
        console.log(userId);
        // update message
        setMessages((prevMessages) =>
          prevMessages.map((m) => ({
            ...m,
            readBy: [...new Set([...m.readBy, userId])],
          }))
        );
      });

      socket.emit('join', { potId, user });
    }

    connectRoom();

    return () => {
      //  setSelectedPot(null);
      socket.disconnect();
      setIsConnected(false);
    };
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
          <button onClick={() => setOpenDepositModal(true)}>입금 인증</button>
          <button
            onClick={() => {
              leavePot(potId, user, socket);
              navigate('/chats', { state: 'exit' });
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
          confirmDeposit={confirmDeposit}
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
        isMenuBarOpened={openMenuBar}
        toggleMenuBar={() => setOpenMenuBar((prev) => !prev)}
      />

      {openOrderModal && (
        <OrderModal
          closeModal={() => setOpenOrderModal(false)}
          formData={orderFormData}
          handleFormChange={handleOrderFormChange}
          sendOrderMessage={sendOrderMessage}
        />
      )}

      {openDepositModal && (
        <DepositModal
          closeModal={() => setOpenDepositModal(false)}
          formData={depositFormData}
          handleFormChange={handleDepositFormChange}
          sendDepositMessage={sendDepositMessage}
        />
      )}
    </div>
  );
}

export default Chat;
