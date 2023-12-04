import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import COLOR from '../../../utility/Color.js';
import TextMessage from './TextMessage.jsx';
import OrderMessage from './OrderMessage.jsx';
import OrderConfirmMessage from './OrderConfirmMessage.jsx';
import DepositMessage from './DepositMessage.jsx';
import DepositConfirmMessage from './DepositConfirmMessage.jsx';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import SystemMessage from './SystemMessage.jsx';

function MessageContainer({
  messages,
  isMenuBarOpened,
  isPotMaster,
  confirmOrder,
  confirmDeposit,
  categoryId,
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
          case 'REQUEST':
            return (
              <div key={message.id} ref={scrollRef}>
                <SystemMessage key={message.id} message={message} />
              </div>
            );
          case 'TEXT':
            return (
              <div
                key={message.id}
                ref={scrollRef}
                style={{
                  width: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems:
                    message.sender.id === user.id ? 'flex-end' : 'flex-start',
                }}
              >
                <TextMessage
                  message={message}
                  own={message.sender.id === user.id}
                />
              </div>
            );
          case 'ORDER':
            return (
              <div key={message.id} ref={scrollRef}>
                <OrderMessage
                  message={message}
                  isPotMaster={isPotMaster}
                  confirmOrder={confirmOrder}
                  own={message.sender.id === user.id}
                />
              </div>
            );
          case 'ORDER_CONFIRM':
            return (
              <div key={message.id} ref={scrollRef}>
                <OrderConfirmMessage
                  sender={message.sender}
                  categoryId={categoryId}
                  own={message.sender.id === user.id}
                />
              </div>
            );
          case 'DEPOSIT':
            return (
              <div key={message.id} ref={scrollRef}>
                <DepositMessage
                  message={message}
                  isPotMaster={isPotMaster}
                  confirmDeposit={confirmDeposit}
                  own={message.sender.id === user.id}
                />
              </div>
            );
          case 'DEPOSIT_CONFIRM':
            return (
              <div key={message.id} ref={scrollRef}>
                <DepositConfirmMessage
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

export default MessageContainer;
