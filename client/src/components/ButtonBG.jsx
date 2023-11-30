import styled from 'styled-components';

//<ButtonBg backgroundColor={COLOR.YELLOW} hoverColor = {COLOR.POTZ_PINK_DEFAULT} fontColor={COLOR.WHITE}>children</ButtonBg>

const ButtonBgStyle = styled.button`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  border: none;
  border-radius: 12px;
  display: flex;
  width: 100%;
  height: 46.667px;
  padding: 9.333px 18.667px;
  justify-content: center;
  align-items: center;
  gap: 11.667px;
  background-color: ${(props) => props.backgroundcolor};
  color: ${(props) => props.fontcolor};
  cursor: grab;

  // 호버 상태 스타일
  &:hover {
    background-color: ${(props) =>
      props.disabled ? props.backgroundColor : props.hovercolor};
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
    // background: var(--button-bg-color, #025ce2);
  }
`;

const ButtonBg = (props) => {
  const {
    backgroundColor,
    fontColor,
    hoverColor,
    children,
    onClick,
    isDisabled,
  } = props;

  return (
    <ButtonBgStyle
      backgroundcolor={backgroundColor}
      fontcolor={fontColor}
      hovercolor={hoverColor}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </ButtonBgStyle>
  );
};

export default ButtonBg;
