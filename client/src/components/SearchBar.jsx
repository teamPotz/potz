import styled from "styled-components";
import COLOR from "../utility/Color";
import Font from "../utility/Font";

const SearchBar = () => {

    const InputWrapper = styled.div `
        display :flex;
        background-color : ${COLOR.POTZ_PINK_100};
        border : none;
        width: 100%;
        height: 46px;
        flex-shrink: 0;
        border-radius: 12px;
        align-items: center;
    `
    const SearchIconWrapper = styled.div`
        margin-left : 20px;
        margin-top : 4px;
    `
    const SearchIcon = () => {
        return(
            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12.9163" cy="12.5833" r="7.58333" stroke="#808080" stroke-width="1.75" stroke-linejoin="round"/>
                <path d="M23.3811 24.2855C23.7228 24.6273 24.2768 24.6273 24.6186 24.2855C24.9603 23.9438 24.9603 23.3898 24.6186 23.0481L23.3811 24.2855ZM24.6186 23.0481L18.7852 17.2148L17.5478 18.4522L23.3811 24.2855L24.6186 23.0481Z" fill="#808080"/>
            </svg>
        )
    }
    const InputSearch = styled.input `
        font-family: ${Font.FontKor};
        font-size: 14px;
        font-weight: 400;
        margin-left : 18px;
        width : 75%;
        border : none;
        background-color : ${COLOR.POTZ_PINK_100};
        color : ${COLOR.GRAY_400};
        &:focus {
            outline: none;
        }
    `

    return(
        <InputWrapper>
            <SearchIconWrapper><SearchIcon></SearchIcon></SearchIconWrapper>
            <InputSearch></InputSearch>
        </InputWrapper>
    )
}

export default SearchBar;