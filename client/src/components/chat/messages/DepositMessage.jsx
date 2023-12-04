import styled from 'styled-components';
import COLOR from '../../../utility/Color';
import ButtonBg from '../../ui/ButtonBG';

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

const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

const Title = ({ children }) => {
  return (
    <div style={styles.title}>
      <img src={`${PF}icons/money.svg`} />
      <FontBig>{children}</FontBig>
    </div>
  );
};

const DepositImage = ({ imageUrl }) => {
  return (
    <img
      style={styles.imageStyle}
      src={`${import.meta.env.VITE_APP_API_URL}/images/${imageUrl}`}
      onClick={() =>
        window.open(
          `${import.meta.env.VITE_APP_API_URL}/images/${imageUrl}`,
          '_blank'
        )
      }
    />
  );
};

const maskName = (name) => {
  if (name.length <= 2) {
    return name;
  }

  return name[0] + '*'.repeat(name.length - 2) + name.at(-1);
};

function DepositMessage({ message, own, isPotMaster, confirmDeposit }) {
  const {
    id: depositId,
    depositor,
    amount,
    imageUrl,
    depositConfirmed,
  } = message.content;

  return (
    <MessageWrapper $own={own}>
      <Title>{message.sender.name}님의 입금 인증</Title>
      {imageUrl && <DepositImage imageUrl={imageUrl} />}
      <div>입금자 {maskName(depositor)}</div>
      <div>입금액 {new Intl.NumberFormat('ko-kr').format(+amount)}원</div>
      {isPotMaster && (
        <ButtonBg
          backgroundColor={COLOR.POTZ_PINK_DEFAULT}
          hoverColor={COLOR.POTZ_PINK_600}
          fontColor={COLOR.WHITE}
          onClick={() => confirmDeposit(depositId, message.id)}
          isDisabled={depositConfirmed}
        >
          {depositConfirmed ? '확인 완료' : '입금 확인'}
        </ButtonBg>
      )}
    </MessageWrapper>
  );
}

export default DepositMessage;
