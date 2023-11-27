import styled from 'styled-components';
import COLOR from '../../utility/Color.js';
import OrderMessage from '../../components/chat/messages/OrderMessage.jsx';
import TextMessage from '../../components/chat/messages/TextMessage.jsx';
import OrderConfirmMessage from '../../components/chat/messages/OrderConfirmMessage.jsx';
import { useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';

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
          case 'text':
            return (
              <div ref={scrollRef}>
                <TextMessage
                  key={`m-${message.id}`}
                  content={message.content}
                  own={message.sender.id === user.id}
                />
              </div>
            );
          case 'order':
            return (
              <OrderMessage
                key={`o-${message.id}`}
                orderId={message.id}
                user={message.user}
                imageUrl={message.imageUrl}
                menuName={message.menuName}
                quantity={message.quantity}
                price={message.price}
                isPotMaster={isPotMaster}
                confirmOrder={confirmOrder}
                isOrderConfirmed={message.orderConfirmed}
              />
            );
          case 'order_confirm':
            return (
              <OrderConfirmMessage
                key={`oc-${message.id}`}
                user={message.user}
              />
            );
          default:
            return null;
        }
      })}
    </MessageContainerWrapper>
  );
}

export default MessageContainer;
