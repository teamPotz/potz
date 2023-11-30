import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import COLOR from '../../../utility/Color.js';
import TextMessage from './TextMessage.jsx';
import OrderMessage from './OrderMessage.jsx';
import OrderConfirmMessage from './OrderConfirmMessage.jsx';
import DepositMessage from './DepositMessage.jsx';
import DepositConfirmMessage from './DepositConfirmMessage.jsx';
import { useAuth } from '../../../contexts/AuthContext.jsx';

const MessageContainerWrapper = styled.div`
  background-color: ${COLOR.POTZ_PINK_200};
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
  // margin-bottom: ${(props) => (props.ismenubaropend ? '142px' : '10px')};
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  padding-top: 74px;
  padding-bottom: 74px;
  // height: 100vh;
`;

function MessageContainer({
  messages,
  isMenuBarOpened,
  isPotMaster,
  confirmOrder,
  confirmDeposit,
}) {
  const scrollRef = useRef();
  const { user } = useAuth();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [messages]);

  return (
    <MessageContainerWrapper ismenubaropend={isMenuBarOpened.toString()}>
      {messages.map((message) => {
        switch (message.type) {
          case 'SYSTEM':
            return <div key={message.id}>{message.content.message}</div>;
          case 'TEXT':
            return (
              <div ref={scrollRef}>
                <TextMessage
                  key={message.id}
                  message={message}
                  own={message.sender.id === user.id}
                />
              </div>
            );
          case 'REQUEST':
            return <div key={message.id}>{message.content.message}</div>;
          case 'ORDER':
            return (
              <div ref={scrollRef}>
                <OrderMessage
                  key={message.id}
                  message={message}
                  isPotMaster={isPotMaster}
                  confirmOrder={confirmOrder}
                  own={message.sender.id === user.id}
                />
              </div>
            );
          case 'ORDER_CONFIRM':
            return (
              <div ref={scrollRef}>
                <OrderConfirmMessage
                  key={message.id}
                  sender={message.sender}
                  own={message.sender.id === user.id}
                />
              </div>
            );
          case 'DEPOSIT':
            return (
              <div ref={scrollRef}>
                <DepositMessage
                  key={message.id}
                  message={message}
                  isPotMaster={isPotMaster}
                  confirmDeposit={confirmDeposit}
                  own={message.sender.id === user.id}
                />
              </div>
            );
          case 'DEPOSIT_CONFIRM':
            return (
              <div ref={scrollRef}>
                <DepositConfirmMessage
                  key={message.id}
                  sender={message.sender}
                  own={message.sender.id === user.id}
                />
              </div>
            );
          default:
            return null;
        }
      })}
    </MessageContainerWrapper>
  );
}

export default MessageContainer;
