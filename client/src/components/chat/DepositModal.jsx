import styled from 'styled-components';
import COLOR from '../../utility/Color';
import Font from '../../utility/Font';
import BackNavBar from '../../components/ui/BackNavBar';
import ImageFileInput from '../form/ImageFileInput';
import ButtonBg from '../ButtonBG';
import MoneyIcon from './assets/MoneyIcon';

const UserIcon = ({ fill }) => {
  return (
    <svg
      width='29'
      height='28'
      viewBox='0 0 29 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M20.6762 8.50639C20.6762 11.9329 17.9288 14.6805 14.4999 14.6805C11.0721 14.6805 8.32357 11.9329 8.32357 8.50639C8.32357 5.07986 11.0721 2.3335 14.4999 2.3335C17.9288 2.3335 20.6762 5.07986 20.6762 8.50639ZM14.4998 25.6667C9.43927 25.6667 5.1665 24.8442 5.1665 21.6708C5.1665 18.4963 9.46612 17.703 14.4998 17.703C19.5616 17.703 23.8332 18.5255 23.8332 21.6988C23.8332 24.8734 19.5336 25.6667 14.4998 25.6667Z'
        fill={fill || '#A8A8A8'}
      />
    </svg>
  );
};

function DepositModal({
  closeModal,
  formData,
  handleFormChange,
  sendDepositMessage,
}) {
  return (
    <ModalBackground>
      <BackNavBar title='입금 인증하기' onClick={closeModal} />

      <ModalContainer>
        <div style={{ marginTop: '60px', marginBottom: '60px' }}>
          <ImageFileInput
            file={formData.file}
            onChange={handleFormChange}
            width='361px'
            height='224px'
          />
        </div>

        <div style={{ borderTop: `0.58px solid ${COLOR.GRAY_200}` }}>
          <Item>
            <UserIcon fill={COLOR.POTZ_PINK_500} />
            <FontMd color={COLOR.GRAY_500}>입금자명</FontMd>
            <Input
              placeholder='이름'
              name='depositor'
              value={formData.depositor}
              onChange={handleFormChange}
            />
          </Item>
          <Item>
            <MoneyIcon fill={COLOR.POTZ_PINK_500} />
            <FontMd color={COLOR.GRAY_500}>입금액</FontMd>
            <Input
              placeholder='얼마'
              name='amount'
              value={formData.amount}
              onChange={handleFormChange}
            />
          </Item>
        </div>
      </ModalContainer>

      <Footer>
        <ButtonBg
          backgroundColor={COLOR.POTZ_PINK_DEFAULT}
          hoverColor={COLOR.POTZ_PINK_600}
          fontColor={COLOR.WHITE}
          onClick={sendDepositMessage}
        >
          전송하기
        </ButtonBg>
      </Footer>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  height: 100vh;
  max-width: 420px;
  min-width: 420px;
  background-color: ${COLOR.WHITE};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: start;
  // flex: 1;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  margintop: 70px;
  height: 72vh;
  // padding: 25px;
`;

const Item = styled.div`
  width: 361px;
  height: 74.67px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 9px;
  border-bottom: 0.58px solid ${COLOR.GRAY_200};
`;

const FontMd = styled.span`
  font-family: ${Font.FontKor};
  font-style: normal;
  font-weight: 400;
  font-size: 16.33px;
  color: ${(props) => props.color};
`;

const Input = styled.input`
  border: none;
  height: 30px;
  width: 100px;
  placeholder: ${(props) => props.placeholder};
  &::placeholder {
    color: ${COLOR.POTZ_PINK_300};
  }
  font-family: ${Font.FontKor};
  font-style: normal;
  font-weight: 400;
  font-size: 16.33px;
  color: ${COLOR.POTZ_PINK_400};
  &:focus {
    outline: none;
    &::placeholder {
      color: ${COLOR.POTZ_PINK_400};
    }
  }
`;

const Footer = styled.div`
  align-items: flex-end;
  width: 361px;
  margin-bottom: 28px;
`;

export default DepositModal;