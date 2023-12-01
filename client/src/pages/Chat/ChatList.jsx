import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import timeAgoFormat from '../../utility/timeAgo.js';
import COLOR from '../../utility/Color';
import PotStatus from '../../components/chat/PotStatus.jsx';
import NavBar from '../../components/ui/NavBar';
import { roomSocket } from '../../../socket.js';
const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

function ChatList() {
  const [deliveryPots, setDeliveryPots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getDeliveryPots() {
      try {
        const res = await fetch('http://localhost:5000/delivery-pots', {
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error('get delivery pots error');
        }
        const data = await res.json();
        console.log(data);
        setDeliveryPots(data);
      } catch (error) {
        console.error(error);
      }
    }
    getDeliveryPots();
  }, []);

  useEffect(() => {
    roomSocket.connect();

    // 마지막 메시지
    roomSocket.on('updateLastMessage', ({ potId, message }) => {
      console.log('lastMessage', { potId, message });

      setDeliveryPots((prevPots) => [
        ...prevPots.map((p) =>
          p.id === +potId
            ? {
                ...p,
                messages: [message],
                _count: {
                  ...p._count,
                  messages: p._count.messages + 1,
                },
              }
            : p
        ),
      ]);
    });

    // 참여자 수
    roomSocket.on('updateUserList', ({ potId, participants, message }) => {
      console.log('updateList', { potId, participants, message });
      setDeliveryPots((prevPots) => [
        ...prevPots.map((p) =>
          p.id === +potId
            ? {
                ...p,
                messages: [message],
                _count: {
                  ...p._count,
                  participants,
                },
              }
            : p
        ),
      ]);
    });

    // 방장 요청사항
    roomSocket.on('updateStatus', ({ potId, status }) => {
      console.log('status', { potId, status });
      setDeliveryPots((prevPots) => [
        ...prevPots.map((p) =>
          p.id === +potId
            ? {
                ...p,
                status: [...p.status, status],
              }
            : p
        ),
      ]);
    });

    return () => roomSocket.disconnect();
  }, []);

  // 화면 너비 측정을 위한 state 변수 // 디폴트는 420px
  const [displayWidth, setdisplayWidth] = useState(window.innerWidth);

  useEffect(() => {
    const ReSizeHandler = () => {
      setdisplayWidth(window.innerWidth);
    };

    //윈도우 리사이즈가 일어나면 콜백 호출
    window.addEventListener('resize', ReSizeHandler);

    return () => {
      window.removeEventListener('resize', ReSizeHandler);
    };
  }, []);

  const navbarStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
    alignItems: 'end',
    position: 'fixed',
    bottom: 0,
    maxWidth: '420px',
    width: displayWidth ? displayWidth : '420px',
  };

  return (
    <div className='potz_container' style={styles.background}>
      <Title>배달팟 채팅 목록</Title>
      <div style={styles.sideTitle}>
        <FontMd color={`${COLOR.GRAY_400}`}>
          지금 참여 중인 배달팟 채팅 {deliveryPots.length}
        </FontMd>
        <FoldButton />
      </div>

      <div style={styles.content}>
        {deliveryPots.map((pot) => (
          <Chat
            key={pot.id}
            onClick={() =>
              navigate(`/chats/${pot.id}`, {
                state: { storeName: pot.post.storeName },
              })
            }
          >
            <Content1>
              <img
                style={{
                  width: '70px',
                  height: '100%',
                  borderRadius: '0.8rem',
                }}
                src={
                  pot.post.imageUrl
                    ? `http://localhost:5000/images/${pot.post.imageUrl}`
                    : `${PF}Logo/Potz_Logo.png`
                }
              />
              <div>
                <div style={styles.space}>
                  <FontBig>{pot.post.storeName}</FontBig>
                  {pot._count.messages > 0 && (
                    <UnreadCounter>{pot._count.messages}</UnreadCounter>
                  )}
                </div>

                <div style={styles.rowFlex}>
                  <GreenDot />
                  <FontMd color={`${COLOR.GRAY_400}`}>
                    <span>{pot._count.participants}명 참여중</span>
                    <span>
                      {pot.messages.length > 0 &&
                        ` | ` +
                          timeAgoFormat(pot.messages.at(0).createdAt, 'ko')}
                    </span>
                  </FontMd>
                </div>

                <div
                  style={{
                    ...styles.rowFlex,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <FontMd color={`${COLOR.GRAY_400}`}>
                    {pot.messages.length > 0 && lastMessage(pot.messages.at(0))}
                  </FontMd>
                </div>
              </div>
            </Content1>

            <PotStatus status={pot.status} />
          </Chat>
        ))}
      </div>
      <div style={navbarStyle}>
        <NavBar />
      </div>
    </div>
  );
}

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 28px;
  width: 392px;
  height: 70px;
  box-shadow: 0px 1.16667px 2.33333px rgba(0, 0, 0, 0.08);
  background-color: ${COLOR.WHITE};
  position: fixed;
  top: 0;
  font-style: normal;
  font-weight: 700;
  font-size: 18.6667px;
  line-height: 150%;
  font-color: ${COLOR.BLACK};
`;
const Chat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 147px;
  background: ${COLOR.WHITE};
  border-radius: 9.33333px;
  box-sizing: border-box;
  gap: 16.33px;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    transition: 0.2s ease-in-out;
    backgound-color: ${COLOR.POTZ_PINK_100};
  }
`;
const Content1 = styled.div`
  margin-left: 28px;
  margin-top: 14px;
  height: 70px;
  display: flex;
  flex-direction: row;
  gap: 14px;
  box-sizing: content-box;
`;
const GreenDot = styled.div`
  width: 4.67px;
  height: 4.67px;
  background-color: ${COLOR.GREEN};
  border-radius: 50%;
`;
const UnreadCounter = styled.div`
  width: 30px;
  height: 18px;
  background-color: ${COLOR.POTZ_PINK_DEFAULT};
  border-radius: 0.8rem;
  font-style: normal;
  font-weight: 700;
  font-size: 0.74rem;
  color: ${COLOR.WHITE};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FontBig = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 16.3333px;
  color: ${COLOR.BLACK};
  margin: 0;
`;
const FontMd = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: ${(props) => props.color};
`;
const styles = {
  background: {
    backgroundColor: `${COLOR.POTZ_PINK_100}`,
  },
  sideTitle: {
    marginTop: '70px',
    paddingTop: '4px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '28px',
    paddingRight: '28px',
    backgroundColor: 'white',
    height: '30.33px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '9.33px',
    marginTop: '-5px',
    marginBottom: '69.33px',
  },
  navBar: {
    position: 'fixed',
    bottom: 0,
    width: '420px',
  },
  space: {
    display: 'flex',
    width: '280px',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowFlex: {
    display: 'flex',
    flexDirection: 'row',
    gap: '7px',
    alignItems: 'center',
    height: '21px',
  },
};

const FoldButton = () => {
  return (
    <svg
      width='7'
      height='6'
      viewBox='0 0 7 6'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.51469 2.3038L5.86667 4.94845C5.99115 5.08759 6.15954 5.16569 6.33507 5.16569C6.51059 5.16569 6.67899 5.08759 6.80347 4.94845C6.86574 4.879 6.91517 4.79637 6.9489 4.70533C6.98263 4.61429 7 4.51665 7 4.41802C7 4.3194 6.98263 4.22175 6.9489 4.13072C6.91517 4.03968 6.86574 3.95705 6.80347 3.8876L3.98641 0.720007C3.92465 0.649985 3.85117 0.594407 3.7702 0.556479C3.68924 0.518551 3.6024 0.499023 3.51469 0.499023C3.42698 0.499023 3.34014 0.518551 3.25918 0.556479C3.17821 0.594407 3.10473 0.649984 3.04297 0.720007L0.192687 3.8876C0.13111 3.95741 0.082393 4.0402 0.0493291 4.13122C0.0162657 4.22224 -0.000494666 4.3197 1.0777e-05 4.41802C-0.000494675 4.51634 0.0162657 4.61381 0.0493291 4.70483C0.082393 4.79585 0.13111 4.87864 0.192687 4.94845C0.317171 5.08759 0.485564 5.16569 0.66109 5.16569C0.836615 5.16569 1.00501 5.08759 1.12949 4.94845L3.51469 2.3038Z'
        fill='#808080'
      />
    </svg>
  );
};

const lastMessage = (message) => {
  let lastMessage;

  switch (message.type) {
    case 'SYSTEM':
    case 'REQUEST':
      lastMessage = message.content.message;
      break;
    case 'TEXT':
      lastMessage = `${message.sender.name}: ${message.content.message}`;
      break;
    case 'ORDER':
      lastMessage = `${message.sender.name}님의 메뉴 선택`;
      break;
    case 'ORDER_CONFIRM':
      lastMessage = `${message.sender.name}님의 메뉴 확인 완료!`;
      break;
    case 'DEPOSIT':
      lastMessage = `${message.sender.name}님의 입금 인증`;
      break;
    case 'DEPOSIT_CONFIRM':
      lastMessage = `${message.sender.name}님의 입금 확인 완료!`;
      break;
    default:
      break;
  }

  return lastMessage;
};

export default ChatList;
