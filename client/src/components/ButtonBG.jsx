import styled from "styled-components"
import Font from "../utility/Font"

//backgroundColor, fontColor, hoverColor, children props가 필요합니다.
//사용 예시:
//<ButtonBg backgroundColor={COLOR.YELLOW} hoverColor = {COLOR.POTZ_PINK_DEFAULT} fontColor={COLOR.WHITE}>children</ButtonBg>

const ButtonBg = (props) => {
    let {backgroundColor, fontColor, hoverColor, children} = props;

    const ButtonBgStyle = styled.button `
        font-family: ${Font.FontKor};
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        border : none;
        border-radius: 12px;
        display: flex;
        width: 100%;
        height: 46.667px;
        padding: 9.333px 18.667px;
        justify-content: center;
        align-items: center;
        gap: 11.667px;
        background-color : ${backgroundColor};
        color : ${fontColor};

        // 호버 상태 스타일
        &:hover {
            background-color: ${hoverColor};
        }
    `
    return(
        <ButtonBgStyle>{children}</ButtonBgStyle>
    )
}

export default ButtonBg;