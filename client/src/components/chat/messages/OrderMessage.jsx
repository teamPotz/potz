import COLOR from '../../../utility/Color';
import styled from 'styled-components';
import Font from '../../../utility/Font';
import CartIcon from '../assets/CartIcon';
import ButtonBg from '../../ButtonBG';

const FontBig = styled.p`
  font-family: ${Font.FontKor};
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
    // height: '148.17px',
    boxSizing: 'border-box',
    border: `1.16667px solid #EDEDED`,
    borderRadius: '10px',
  },
};

const OrderMessageWrapper = styled.div`
  width: 277.67px;
  max-height: 308px;
  padding: 11.6667px 18.6667px 18.6667px;
  background-color: ${COLOR.WHITE};
  border-radius: 14px;
  box-sizing: border-box;
  gap: 11.67px;
  display: flex;
  flex-direction: column;
  margin-left: ${(props) => (props.isMyMessage ? 'auto' : 'none')};
`;

const Title = ({ children }) => {
  return (
    <div style={styles.title}>
      <CartIcon fill={COLOR.POTZ_PINK_400} />
      <FontBig>{children}</FontBig>
    </div>
  );
};

function OrderMessage({
  orderId,
  user,
  menuName,
  imageUrl,
  quantity,
  price,
  isMyMessage,
  isPotMaster,
  confirmOrder,
  isOrderConfirmed,
}) {
  return (
    <OrderMessageWrapper isMyMessage={isMyMessage}>
      <Title>{user.name}님의 메뉴 선정</Title>
      {imageUrl && (
        <img
          style={styles.imageStyle}
          src={`http://localhost:5000/images/${imageUrl}`}
        />
      )}
      <div>{menuName}</div>
      <div>총 금액 {+price * +quantity}원</div>
      {isPotMaster && (
        <ButtonBg
          backgroundColor={COLOR.POTZ_PINK_DEFAULT}
          hoverColor={COLOR.POTZ_PINK_600}
          fontColor={COLOR.WHITE}
          onClick={() => confirmOrder(orderId)}
          isDisabled={isOrderConfirmed}
        >
          {isOrderConfirmed ? '확인 완료' : '메뉴 확인'}
        </ButtonBg>
      )}
    </OrderMessageWrapper>
  );
}

export default OrderMessage;
