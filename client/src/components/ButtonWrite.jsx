import styled from 'styled-components';
import COLOR from '../utility/Color';

const ButtonWrite = () => {
  const ButtonWrapper = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${COLOR.POTZ_PINK_DEFAULT};
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: none;
    cursor: grab;
    &:hover {
      background: ${COLOR.POTZ_PINK_600};
    }
  `;

  const WriteIcon = () => {
    return (
      <svg
        width='22'
        height='26'
        viewBox='0 0 22 26'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M20.7698 8.50963L9.02406 24.0721C8.48501 24.7789 7.69061 25.1764 6.83946 25.1911L2.15818 25.25C1.90284 25.25 1.69005 25.0733 1.63331 24.823L0.569379 20.0968C0.384964 19.2282 0.569379 18.3301 1.10844 17.6381L9.43545 6.5956C9.5773 6.41892 9.83265 6.39094 10.0029 6.52198L13.5067 9.3783C13.7337 9.5697 14.0458 9.67276 14.3721 9.6286C15.0672 9.54026 15.5353 8.89243 15.4644 8.20044C15.4218 7.84708 15.2516 7.55261 15.0246 7.33176C14.9537 7.27287 11.62 4.53434 11.62 4.53434C11.4073 4.35766 11.3647 4.03375 11.5349 3.81437L12.8542 2.06083C14.0742 0.455988 16.202 0.308755 17.9185 1.70747L19.8903 3.31231C20.6989 3.96013 21.238 4.81408 21.4224 5.7122C21.6352 6.70013 21.4082 7.6704 20.7698 8.50963Z'
          fill='white'
        />
      </svg>
    );
  };

  return (
    <ButtonWrapper>
      <WriteIcon></WriteIcon>
    </ButtonWrapper>
  );
};

export default ButtonWrite;
