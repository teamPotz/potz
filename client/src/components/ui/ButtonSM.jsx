import styled from 'styled-components';
import Font from '../../utility/Font';

//backgroundColor, fontColor, hoverColor, children props가 필요합니다.
//사용 예시:
//<ButtonSm backgroundColor={COLOR.YELLOW} hoverColor = {COLOR.POTZ_PINK_DEFAULT} fontColor={COLOR.WHITE}>children</ButtonSm>

const ButtonSm = (props) => {
  let { backgroundColor, fontColor, hoverColor, children } = props;

  const ButtonStyle = styled.button`
    font-family: ${Font.FontKor};
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    border: none;
    border-radius: 12px;
    display: flex;
    width: 280px;
    height: 47px;
    padding: 9.333px 18.667px;
    justify-content: center;
    align-items: center;
    gap: 11px;
    background-color: ${backgroundColor};
    color: ${fontColor};
    cursor: grab;

    // 호버 상태 스타일
    &:hover {
      background-color: ${hoverColor};
    }
  `;
  return <ButtonStyle>{children}</ButtonStyle>;
};
export default ButtonSm;
