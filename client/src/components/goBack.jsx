import styled from "styled-components";
import COLOR from "../utility/Color";
import Font from "../utility/Font";

// 사용법 <GoBack text={'뒤로 가기'}></GoBack>

function GoBack(props){
    const GoBackButtonStyle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    width: 420px;
    height: 70px;
    box-shadow: 0px 1.16667px 2.33333px rgba(0, 0, 0, 0.08);
    background-color: ${COLOR.WHITE};
    position: fixed;
    top: 0;
    font-family: ${Font};
    font-style: normal;
    font-weight: 700;
    font-size: 18.6667px;
    line-height: 150%;
    font-color: ${COLOR.BLACK};
    & svg {
        margin: 28px;
        margin-right: 14px;
    }
    & div {
      align-self: center;
    }
  `;
    return(
        <>
            <GoBackButtonStyle>
                    <svg
                    width='29'
                    height='28'
                    viewBox='0 0 29 28'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    >
                    <path
                        d='M18.7495 22.1673L10.5828 14.0007L18.7495 5.83398'
                        stroke='black'
                        strokeWidth='1.75'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                    </svg>
                    <div>
                    {props.text}
                    </div>
            </GoBackButtonStyle>
        </>
    )
}

export default GoBack;