import styled from 'styled-components';
import COLOR from '../../utility/Color';
import ButtonBg from '../ui/ButtonBG';

function UpdateAccountModal({ setVisible, user }) {
  async function userAccountUpdate(bankName, account, accountOwner) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/users/update-account`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ bankName, account, accountOwner }),
        }
      );
      const data = await res.json();
      // console.log(data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={backgroundStyle}>
      <div onClick={() => setVisible(false)}>
        <IconClose />
      </div>
      <OrderMessageWrapper>
        <form
          style={formStyle}
          onSubmit={(e) => {
            e.preventDefault();

            const bankName = e.target.querySelector(
              'input[name="bankName"]'
            ).value;
            const account = e.target.querySelector(
              'input[name="account"]'
            ).value;
            const accountOwner = e.target.querySelector(
              'input[name="accountOwner"]'
            ).value;

            if (!bankName || !account || !accountOwner) {
              alert('입력창을 모두 채워주세요.');
              return;
            }

            userAccountUpdate(bankName, account, accountOwner);
          }}
        >
          <div>
            <div
              style={{
                fontSize: '20px',
                fontWeight: '700',
                marginBottom: '12px',
                marginTop: '24px',
              }}
            >
              간편 입력 계좌번호 등록
            </div>
            <label style={lableStyle}>계좌번호</label>
            <input
              name='account'
              placeholder='계좌번호를 입력해주세요.'
              style={inputStyle}
            />
            <label style={lableStyle}>은행</label>

            <input
              name='bankName'
              placeholder='입력하신 계좌번호의 은행.'
              style={inputStyle}
            />
            <label style={lableStyle}>예금주명</label>

            <input
              name='accountOwner'
              placeholder='입력하신 계좌번호의 예금주명'
              style={inputStyle}
            />
          </div>
          <ButtonBg
            type='submit'
            backgroundColor={COLOR.POTZ_PINK_DEFAULT}
            hoverColor={COLOR.POTZ_PINK_600}
            fontColor={COLOR.WHITE}
          >
            저장
          </ButtonBg>
        </form>
      </OrderMessageWrapper>
    </div>
  );
}

const OrderMessageWrapper = styled.div`
  color: ${COLOR.GRAY_500};
  font-weight: 500;
  width: 277px;
  max-height: 600px;
  padding: 0px 24px 18px 24px;
  background-color: ${COLOR.WHITE};
  border-radius: 14px;
  gap: 11.67px;
  display: flex;
  flex-direction: column;
  margin-left: ${(props) => (props.own ? 'auto' : 'none')};
  z-index: 1000;
  border: ${COLOR.POTZ_PINK_300} 2px solid;
  overflow: auto;
`;

const IconClose = () => {
  return (
    <div style={{ cursor: 'pointer' }}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='32'
        height='32'
        viewBox='0 0 57 58'
        fill='none'
      >
        <path
          d='M3 55L54 4'
          stroke='white'
          strokeWidth='5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M3 3.48242L54 54.4824'
          stroke='white'
          strokeWidth='5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  );
};

const backgroundStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: COLOR.BLACK_OPACITY_300,
  zIndex: 1000,
};

const formStyle = {
  marginTop: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
};

const lableStyle = {
  marginBottom: '12px',
};

const inputStyle = {
  width: '90%',
  border: 'none',
  background: COLOR.POTZ_PINK_200,
  paddingTop: '12px',
  paddingBottom: '12px',
  paddingLeft: '12px',
  borderRadius: '12px',
};

export default UpdateAccountModal;
