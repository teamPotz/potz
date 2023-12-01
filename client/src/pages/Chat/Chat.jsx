import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import COLOR from '../../utility/Color.js';
import ChatMenu from '../../components/chat/ChatMenu.jsx';
import ChatInput from '../../components/chat/ChatInput.jsx';
import MessageContainer from '../../components/chat/messages/MessageContainer.jsx';
import OrderModal from '../../components/chat/OrderModal.jsx';
import DepositModal from '../../components/chat/DepositModal.jsx';
import UserAccountUpdateModal from '../../components/userAccountUpdateModal.jsx';
import { useChat } from '../../contexts/ChatContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { socket } from '../../../socket.js';

const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

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
  const [deliveryPot, setDeliveryPot] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoadingGetMessage, setIsLoadingGetMessage] = useState(false);
  const [isLoadingSendMessage, setisLoadingSendMessage] = useState(false);
  const [openMenuBar, setOpenMenuBar] = useState(false);

  // modals
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [orderFormData, setOrderFormData] = useState(initialOrderData);
  const [openDepositModal, setOpenDepositModal] = useState(false);
  const [depositFormData, setDepositFormData] = useState(initialDepositData);
  const [openAccountModal, setOpenAccountModal] = useState(false);

  const { potId } = useParams();
  const { user } = useAuth();
  const { leavePot } = useChat();
  const navigate = useNavigate();

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

  // order messages
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

  // deposit messages
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

  // set pot status
  async function setStatus(status) {
    if (!isPotMaster) {
      return alert('방장만 할 수 있습니다.');
    }

    if (
      status === 'DEPOSIT_REQUEST' &&
      (!user.profile?.bankName ||
        !user.profile?.accountNumber ||
        !user.profile?.accountHolderName)
    ) {
      alert('계좌정보를 먼저 등록해주세요.');
      setOpenAccountModal(true);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/delivery-pots/${potId}/status`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ status }),
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message);
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  async function closePot() {
    if (!isPotMaster) {
      return alert('방장만 할 수 있습니다.');
    }
    if (!confirm(`${deliveryPot?.post.storeName}의 모집을 마감하시겠습니까?`)) {
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/delivery-pots/${potId}/close`,
        {
          method: 'PATCH',
          credentials: 'include',
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message);
      }
      const data = await res.json();
      setDeliveryPot((prev) => ({ ...prev, closed: data.closed }));
      console.log(data);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  // socket
  useEffect(() => {
    socket.connect();
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
    socket.on('updateCount', ({ messageId, readBy }) => {
      console.log({ messageId, readBy });
      setMessages((prevMessages) =>
        prevMessages.map((m) => (m.id === messageId ? { ...m, readBy } : m))
      );
    });

    // 메시지 전부 읽음(방 진입 시)
    socket.on('updateCountAll', (userId) => {
      console.log(userId);
      setMessages((prevMessages) =>
        prevMessages.map((m) => ({
          ...m,
          readBy: [...new Set([...m.readBy, userId])],
        }))
      );
    });

    // 방 정보 업데이트
    socket.on('updatePot', (data) => {
      console.log(data);
      setDeliveryPot((prev) => ({ ...prev, ...data }));
    });

    socket.emit('join', { potId, user });
    return () => {
      socket.disconnect();
      setIsConnected(false);
    };
  }, [potId, user]);

  // enter pot
  useEffect(() => {
    async function enterPot() {
      try {
        const res = await fetch(
          `http://localhost:5000/delivery-pots/${potId}/join`,
          {
            method: 'PATCH',
            credentials: 'include',
          }
        );
        if (!res.ok) {
          throw new Error('enter chat room error');
        }
        const data = await res.json();
        console.log(data);
        setDeliveryPot(data);
        socket.emit('join', { potId, user });
      } catch (error) {
        console.error(error);
      }
    }
    enterPot();
  }, [potId, user]);

  useEffect(() => {
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
    fetchMessages();
  }, [potId]);

  const isPotMaster = useMemo(
    () => deliveryPot?.potMaster.id === user.id,
    [deliveryPot, user]
  );

  return (
    <>
      <TopNavBarWrapper>
        <div style={{ display: 'flex' }} onClick={() => navigate(-1)}>
          <BackArrowIcon />
          <div style={{ display: 'flex', marginRight: '0.6rem' }}>
            <img
              style={{
                height: '36px',
                width: '36px',
                borderRadius: '0.8rem',
                objectFit: 'cover',
              }}
              src={
                deliveryPot?.post.imageUrl
                  ? `http://localhost:5000/images/${deliveryPot?.post.imageUrl}`
                  : `${PF}Logo/Potz_Logo.png`
              }
            />
          </div>
          <div>
            <div>{deliveryPot?.post.storeName}</div>
            <div style={{ fontSize: '0.8rem', color: COLOR.GRAY_400 }}>
              방장 : {deliveryPot?.potMaster.name}
            </div>
          </div>
        </div>
        <div
          style={{
            color: deliveryPot?.closed
              ? `${COLOR.GRAY_200}`
              : `${COLOR.POTZ_PINK_500}`,
            cursor: deliveryPot?.closed ? 'default' : 'pointer',
            paddingRight: '20px',
          }}
          onClick={!deliveryPot?.closed && closePot}
        >
          {deliveryPot?.closed ? '마감됨' : '마감'}
        </div>
      </TopNavBarWrapper>

      <div
        className='potz_container'
        style={{ backgroundColor: COLOR.POTZ_PINK_200 }}
      >
        {/* test buttons */}
        <div style={{ position: 'fixed', top: '70px' }}>
          <div>
            <button onClick={() => setOpenOrderModal(true)}>메뉴 선택</button>
            <button onClick={() => setOpenDepositModal(true)}>입금 인증</button>
            <button
              onClick={() => {
                leavePot(potId, user, socket);
                navigate('/');
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
          <ChatMenu
            isPotMaster={isPotMaster}
            setStatus={setStatus}
            setOpenOrderModal={setOpenOrderModal}
            setOpenDepositModal={setOpenDepositModal}
          />
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
        {openAccountModal && (
          <UserAccountUpdateModal
            setVisible={setOpenAccountModal}
            user={user}
          />
        )}
      </div>
    </>
  );
}

const TopNavBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 420px;
  height: 70px;
  box-shadow: 0px 1px 2.3px rgba(0, 0, 0, 0.08);
  background-color: ${COLOR.WHITE};
  position: fixed;
  top: 0;
  font-style: normal;
  font-weight: 700;
  font-size: 18.6px;
  font-color: ${COLOR.BLACK};
  z-index: 100;
  & svg {
    cursor: pointer;
    margin: 18px;
    margin-right: 14px;
    &:hover {
      transform: scale(1.18);
      transition: 0.2s ease-in-out;
    }
  }
  & div {
    // margin-top: 3px;
    align-self: center;
  }
`;

const BackArrowIcon = () => {
  return (
    <svg
      width='28'
      height='28'
      viewBox='0 0 28 28'
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
  );
};

export default Chat;
