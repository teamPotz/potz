import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import COLOR from '../../utility/Color.js';
import ChatMenu from '../../components/chat/ChatMenu.jsx';
import ChatInput from '../../components/chat/ChatInput.jsx';
import MessageContainer from '../../components/chat/messages/MessageContainer.jsx';
import OrderModal from '../../components/chat/OrderModal.jsx';
import DepositModal from '../../components/chat/DepositModal.jsx';
import UserAccountUpdateModal from '../../components/mypage/userAccountUpdateModal.jsx';
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
    if (isLoadingSendMessage) return;

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
      setisLoadingSendMessage(true);
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
    } finally {
      setisLoadingSendMessage(false);
    }
  }

  async function confirmOrder(orderId, messageId) {
    if (isLoadingSendMessage) return;
    if (!isPotMaster) {
      return alert('메뉴 확인은 방장만 할 수 있습니다.');
    }

    try {
      setisLoadingSendMessage(true);
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
    } finally {
      setisLoadingSendMessage(false);
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
    if (isLoadingSendMessage) return;
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
      setisLoadingSendMessage(true);
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
    } finally {
      setisLoadingSendMessage(false);
    }
  }

  async function confirmDeposit(orderId, messageId) {
    if (isLoadingSendMessage) return;
    if (!isPotMaster) {
      return alert('입금 확인은 방장만 할 수 있습니다.');
    }

    try {
      setisLoadingSendMessage(true);
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
    } finally {
      setisLoadingSendMessage(false);
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
      setDeliveryPot((prevPot) => ({ ...prevPot, status: data.status }));
      console.log('status', data);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  async function closePot() {
    if (!isPotMaster) {
      return alert('방장만 할 수 있습니다.');
    }
    if (
      !confirm(`${deliveryPot?.post?.storeName}의 모집을 마감하시겠습니까?`)
    ) {
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

  // 방장용 메뉴선택(선택 즉시 주문확정, 입금확정까지 되도록)
  async function orderPotMaster() {
    if (isLoadingSendMessage) return;
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
      setisLoadingSendMessage(true);
      const res = await fetch('http://localhost:5000/orders/pot-master', {
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
    } finally {
      setisLoadingSendMessage(false);
    }
  }

  async function leavPot() {
    if (isPotMaster) {
      alert('방장은 탈퇴할 수 없습니다.');
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/delivery-pots/${potId}/leave`,
        {
          method: 'PATCH',
          credentials: 'include',
        }
      );
      if (!res.ok) {
        throw new Error('leave pot error');
      }
      socket.emit('exit', { potId, user });
      const data = res.json();
      navigate('/');
    } catch (error) {
      console.error(error);
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
      console.log('updatePot', data);
      setDeliveryPot((prev) => ({ ...prev, ...data }));
    });

    // 방 정보 업데이트
    socket.on('updateOrder', (data) => {
      console.log('updateOrder', data);
      setDeliveryPot((prev) => ({ ...prev, orders: [...prev.orders, data] }));
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
      }
    }
    fetchMessages();
  }, [potId]);

  const isPotMaster = useMemo(
    () => deliveryPot?.potMaster?.id === user?.id,
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
                height: '42px',
                width: '42px',
                borderRadius: '0.8rem',
                objectFit: 'cover',
              }}
              src={
                deliveryPot?.post?.imageUrl
                  ? `http://localhost:5000/images/${deliveryPot?.post.imageUrl}`
                  : `${PF}Logo/Potz_Logo.png`
              }
            />
          </div>
          <div>
            <div>{deliveryPot?.post?.storeName}</div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.7rem',
                color: COLOR.GRAY_400,
                gap: '0.6rem',
                marginTop: '0.1rem',
              }}
            >
              <div style={{ maxWidth: '100px' }}>
                <img
                  src={PF + 'icons/crown.svg'}
                  style={{
                    height: '12px',
                    marginRight: '0.2rem',
                  }}
                />
                <span>{deliveryPot?.potMaster?.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={PF + 'icons/user.svg'}
                  style={{
                    height: '12px',
                    marginRight: '0.4rem',
                    filter:
                      'invert(75%) sepia(4%) saturate(108%) hue-rotate(30deg) brightness(90%) contrast(86%)',
                  }}
                />
                <span>{deliveryPot?._count.participants}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={PF + 'icons/money.svg'}
                  style={{
                    height: '12px',
                    marginRight: '0.2rem',
                    filter:
                      'invert(75%) sepia(4%) saturate(108%) hue-rotate(30deg) brightness(90%) contrast(86%)',
                  }}
                />
                <div>
                  {new Intl.NumberFormat('ko-kr').format(
                    deliveryPot?.orders?.reduce(
                      (acc, cur) =>
                        acc + Number(cur.price) * Number(cur.quantity),
                      0
                    )
                  )}
                  원
                </div>
              </div>
            </div>
          </div>
        </div>

        {isPotMaster ? (
          <div
            style={{
              color: deliveryPot?.closed
                ? `${COLOR.GRAY_200}`
                : `${COLOR.POTZ_PINK_500}`,
              cursor: deliveryPot?.closed ? 'default' : 'pointer',
              paddingRight: '20px',
            }}
            onClick={!deliveryPot?.closed ? closePot : null}
          >
            {deliveryPot?.closed ? '마감됨' : '마감'}
          </div>
        ) : (
          <div
            style={{
              color: deliveryPot?.closed
                ? `${COLOR.GRAY_200}`
                : `${COLOR.POTZ_PINK_500}`,
              paddingRight: '20px',
            }}
          >
            {deliveryPot?.closed ? '마감됨' : '모집 중'}
          </div>
        )}
      </TopNavBarWrapper>

      <div
        className='potz_container'
        style={{ backgroundColor: COLOR.POTZ_PINK_200 }}
      >
        <div>
          <MessageContainer
            messages={messages}
            isMenuBarOpened={openMenuBar}
            isPotMaster={isPotMaster}
            confirmOrder={confirmOrder}
            confirmDeposit={confirmDeposit}
            categoryId={deliveryPot?.post?.categoryId}
          />
        </div>
        {openMenuBar && (
          <ChatMenu
            isPotMaster={isPotMaster}
            status={deliveryPot?.status}
            setStatus={setStatus}
            setOpenOrderModal={setOpenOrderModal}
            setOpenDepositModal={setOpenDepositModal}
            leavePot={leavPot}
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
            sendOrderMessage={isPotMaster ? orderPotMaster : sendOrderMessage}
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
