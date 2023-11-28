import styled from 'styled-components';
import COLOR from '../../../utility/Color';
import Font from '../../../utility/Font';

const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

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
  font-family: ${Font.FontKor};
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
    gap: '12px',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    width: '114px',
    height: '28px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12px',
  },
  content: {
    width: '240px',
    height: '148px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
  },
};

function DepositConfirmMessage({ sender, own }) {
  return (
    <MessageWrapper $own={own}>
      <div style={styles.box}>
        <div style={styles.title}>
          <img
            src={`${PF}icons/money.svg`}
            style={{
              color: COLOR.POTZ_PINK_400,
              width: '24px',
              height: '24px',
            }}
          />
          <FontBig>입금확인</FontBig>
        </div>
        <div style={styles.content}>
          <img src={`${PF}icons/money.svg`} />
        </div>
        <div>
          <span style={{ color: COLOR.POTZ_PINK_DEFAULT }}>{sender.name}</span>
          님의 입금 확인 완료!
        </div>
      </div>
    </MessageWrapper>
  );
}

export default DepositConfirmMessage;
