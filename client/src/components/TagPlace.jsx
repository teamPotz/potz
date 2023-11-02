import styled from "styled-components";
import COLOR from "../utility/Color";
import Font from "../utility/Font";

const TagPlace = styled.button `
    font-family: ${Font.FontKor};
    font-size: 14px;
    font-weight: 500;
    border : none;
    display: flex;
    height: 28px;
    width : auto;
    padding: 10px 12px;
    justify-content: center;
    align-items: center;
    border-radius: 12x;
    background-color: ${COLOR.POTZ_PINK_100};
    box-shadow: 0px 3.5px 8.16667px 0px rgba(0, 0, 0, 0.07);
    color : ${COLOR.POTZ_PINK_DEFAULT};
    
    // 호버 상태 스타일
    &:hover {
        background-color: ${COLOR.POTZ_PINK_200};
    }
`
export default TagPlace;