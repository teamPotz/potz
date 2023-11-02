import styled from "styled-components"
import COLOR from "../utility/Color"
import Font from "../utility/Font"

const ButtonBg = styled.button `
    font-family: ${Font.FontKor};
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    border : none;
    border-radius: 12px;
    display: flex;
    width: 364px;
    height: 46.667px;
    padding: 9.333px 18.667px;
    justify-content: center;
    align-items: center;
    gap: 11.667px;
    background-color : ${COLOR.POTZ_PINK_DEFAULT};
    color : ${COLOR.WHITE};

    // 호버 상태 스타일
    &:hover {
        background-color: ${COLOR.POTZ_PINK_600};${COLOR.POTZ_PINK_600};
    }
`

export default ButtonBg;