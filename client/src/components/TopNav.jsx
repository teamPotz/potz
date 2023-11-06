import COLOR from '../utility/Color';
import styled from 'styled-components';
import Font from '../utility/Font';

const TopNav = (props) => {
  let { children } = props;

  const TopNavWrapper = styled.nav`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 70px;
    font-family: ${Font.FontKor};
    font-weight: 700;
    font-size: 18px;
    background-color: ${COLOR.WHITE};
  `;

  const ButtonBack = styled.button`
    padding: 20px;
    border: none;
    cursor: grab;
    background-color: ${COLOR.WHITE};
    &:hover {
      background-color: ${COLOR.GRAY_100};
    }
  `;

  const BackIcon = () => {
    return (
      <svg
        width='29'
        height='28'
        viewBox='0 0 29 28'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M18.5837 22.1663L10.417 13.9997L18.5837 5.83301'
          stroke='black'
          strokeWidth='1.75'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    );
  };

  return (
    <TopNavWrapper>
      <ButtonBack>
        <BackIcon></BackIcon>
      </ButtonBack>
      <span>{children}</span>
    </TopNavWrapper>
  );
};

export default TopNav;
