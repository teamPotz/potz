import COLOR from '../../../utility/Color';
import styled from 'styled-components';
import Font from '../../../utility/Font';
import CartIcon from '../assets/CartIcon';

const FontBig = styled.p`
  font-family: ${Font.FontKor};
  font-style: normal;
  font-weight: 550;
  font-size: 16px;
  color: ${COLOR.BLACK};
  margin: 0;
`;

function OrderConfirmMessage({ user, isMyMessage }) {
  const styles = {
    background: {
      width: '275.33px',
      height: '221px',
      padding: '11.6667px 18.6667px 18.6667px',
      backgroundColor: `${COLOR.WHITE}`,
      borderRadius: '14px',
      boxSizing: 'border-box',
      marginLeft: isMyMessage ? 'auto' : 'none',
    },
    box: {
      width: '100%',
      height: '100%',
      gap: '11.67px',
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      width: '113.17px',
      height: '28px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '11.67px',
    },
    content: {
      width: '240.33px',
      height: '148.17px',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center',
      // border: `1.16667px solid #EDEDED`,
      // borderRadius: '9.33333px',
    },
  };

  return (
    <div style={styles.background}>
      <div style={styles.box}>
        <div style={styles.title}>
          <CartIcon fill={COLOR.POTZ_PINK_400} />
          <FontBig>메뉴 확인</FontBig>
        </div>
        <div style={styles.content}>
          <img src='/images/graphicImg/CategoryBurger.png' />
        </div>
        <div>
          <span style={{ color: COLOR.POTZ_PINK_DEFAULT }}>{user.name}</span>
          님의 배달 메뉴 확인 완료!
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmMessage;
