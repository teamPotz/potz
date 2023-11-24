import styled from 'styled-components';
import COLOR from '../../utility/Color.js';
import OrderMessage from '../../components/chat/messages/OrderMessage.jsx';
import TextMessage from '../../components/chat/messages/TextMessage.jsx';
import OrderConfirmMessage from '../../components/chat/messages/OrderConfirmMessage.jsx';

const MessageContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
  margin-bottom: ${(props) => (props.ismenubaropend ? '142px' : '10px')};
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  padding-top: 74px;
  padding-bottom: 60px;
  background-color: ${COLOR.POTZ_PINK_200};
`;

// const scroll = document.querySelector('.potz_container');
// useEffect(() => {
//   scroll.scrollTop = scroll.scrollHeight;
// }, [messages]);

function MessageContainer({
  messages,
  isMenuBarOpened,
  isPotMaster,
  confirmOrder,
}) {
  return (
    <MessageContainerWrapper ismenubaropend={isMenuBarOpened.toString()}>
      {messages.map((message) => {
        switch (message.type) {
          case 'text':
            return (
              <TextMessage key={`m-${message.id}`} content={message.content} />
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
