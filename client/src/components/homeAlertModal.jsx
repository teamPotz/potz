import styled from 'styled-components';
import COLOR from '../utility/Color';
import Font from '../utility/Font';

const OrderMessageWrapper = styled.div`
  font-family: ${Font.FontKor};
  color: ${COLOR.GRAY_500};
  font-weight: 500;
  width: 277px;
  max-height: 308px;
  padding: 32px 24px 32px;
  background-color: ${COLOR.WHITE};
  border-radius: 14px;
  gap: 11.67px;
  display: flex;
  flex-direction: column;
  margin-left: ${(props) => (props.own ? 'auto' : 'none')};
  z-index: 1000;
  border: ${COLOR.POTZ_PINK_300} 2px solid;
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

const coloredFont = {
  color: COLOR.POTZ_PINK_600,
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

function HomeAlert(props) {
  let { setVisible, author } = props;

  console.log(author);

  return (
    <div style={backgroundStyle}>
      <div
        onClick={() => {
          setVisible(false);
        }}
      >
        <IconClose></IconClose>
      </div>
      <OrderMessageWrapper>
        <div>
          지금까지 <span style={coloredFont}>방장 경력</span>이
        </div>
        <div>
          총 <span style={coloredFont}>104</span>회인 방장님의 글이에요.
        </div>
      </OrderMessageWrapper>
    </div>
  );
}

export default HomeAlert;
