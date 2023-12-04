import styled from 'styled-components';
import COLOR from '../../../utility/Color';
import CartIcon from '../assets/CartIcon';

const categoryIcons = {
  1: '/images/graphicImg/CategoryBurger.png',
  2: '/images/graphicImg/CategoryCafe.png',
  3: '/images/graphicImg/CategoryKoreanFood.png',
  4: '/images/graphicImg/CategorySushi.png',
  5: '/images/graphicImg/CategoryChinese.png',
  6: '/images/graphicImg/CategoryPizza.png',
  7: '/images/graphicImg/CategoryChiken.png',
  8: '/images/graphicImg/CategorySalad.png',
};

function OrderConfirmMessage({ sender, categoryId, own }) {
  return (
    <MessageWrapper $own={own}>
      <div style={styles.box}>
        <div style={styles.title}>
          <CartIcon fill={COLOR.POTZ_PINK_400} />
          <FontBig>메뉴 확인</FontBig>
        </div>
        <div style={styles.content}>
          <img
            src={categoryIcons[categoryId]}
            style={{
              objectFit: 'contain',
              width: '100%',
              height: '124px',
            }}
          />
        </div>
        <div>
          <span style={{ color: COLOR.POTZ_PINK_DEFAULT }}>{sender.name}</span>
          님의 배달 메뉴 확인 완료!
        </div>
      </div>
    </MessageWrapper>
  );
}

const MessageWrapper = styled.div`
  background-color: ${COLOR.WHITE};
  width: 278px;
  height: 220px;
  padding: 12px 18px 18px;
  border-radius: 14px;
  box-sizing: border-box;
  margin-left: ${(props) => (props.$own ? 'auto' : 'none')};
`;

const FontBig = styled.p`
  font-style: normal;
  font-weight: 550;
  font-size: 16px;
  color: ${COLOR.BLACK};
  margin: 0;
`;

const styles = {
  box: {
    width: '100%',
    height: '100%',
    gap: '6px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export default OrderConfirmMessage;
