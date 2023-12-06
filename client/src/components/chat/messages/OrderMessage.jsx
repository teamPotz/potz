import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import COLOR from '../../../utility/Color';
import CartIcon from '../assets/CartIcon';
import ButtonBg from '../../ui/ButtonBG';

function OrderMessage({ message, own, isPotMaster, confirmOrder }) {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [message]);

  const {
    id: orderId,
    price,
    imageUrl,
    menuName,
    quantity,
    orderConfirmed,
  } = message.content;

  return (
    <MessageWrapper $own={own} ref={scrollRef}>
      <Title>{message.sender.name}님의 메뉴 선정</Title>
      {imageUrl && <MenuImage imageUrl={imageUrl} />}
      <div>{menuName}</div>
      <div>
        총 금액 {new Intl.NumberFormat('ko-kr').format(+price * +quantity)}원
      </div>
      {isPotMaster && (
        <ButtonBg
          backgroundColor={COLOR.POTZ_PINK_DEFAULT}
          hoverColor={COLOR.POTZ_PINK_600}
          fontColor={COLOR.WHITE}
          onClick={() => confirmOrder(orderId, message.id)}
          isDisabled={orderConfirmed}
        >
          {orderConfirmed ? '확인 완료' : '메뉴 확인'}
        </ButtonBg>
      )}
    </MessageWrapper>
  );
}

const FontBig = styled.p`
  font-style: normal;
  font-weight: 550;
  font-size: 16px;
  color: ${COLOR.BLACK};
  margin: 0;
`;

const styles = {
  title: {
    height: '28px',
    display: 'flex',
    flexDirection: 'row',
    gap: '11.67px',
    alignItems: 'center',
  },
  imageStyle: {
    objectFit: 'cover',
    width: '240.33px',
    height: '148.17px',
    boxSizing: 'border-box',
    border: `1.16667px solid #EDEDED`,
    borderRadius: '10px',
    cursor: 'pointer',
  },
};

const MessageWrapper = styled.div`
  background-color: ${COLOR.WHITE};
  width: 278px;
  max-height: 400px;
  padding: 12px 18px 18px;
  border-radius: 14px;
  box-sizing: border-box;
  gap: 12px;
  display: flex;
  flex-direction: column;
  margin-left: ${(props) => (props.$own ? 'auto' : 'none')};
`;

const Title = ({ children }) => {
  return (
    <div style={styles.title}>
      <CartIcon fill={COLOR.POTZ_PINK_400} />
      <FontBig>{children}</FontBig>
    </div>
  );
};

const MenuImage = ({ imageUrl }) => {
  return (
    <img
      style={styles.imageStyle}
      src={imageUrl}
      onClick={() => window.open(imageUrl, '_blank')}
    />
  );
};

export default OrderMessage;
