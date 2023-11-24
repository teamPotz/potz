import styled from 'styled-components';
import Font from '../utility/Font';

const ButtonBgStyle = styled.button`
  font-family: ${Font.FontKor};
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
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.fontColor};
  cursor: grab;

  // 호버 상태 스타일
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

const ButtonBg = (props) => {
  const { backgroundColor, fontColor, hoverColor, children, onClick } = props;

  return (
    <ButtonBgStyle
      backgroundColor={backgroundColor}
      fontColor={fontColor}
      hoverColor={hoverColor}
      onClick={onClick}
    >
      {children}
    </ButtonBgStyle>
  );
};

export default ButtonBg;
