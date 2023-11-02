import React, { useState } from "react";
import styled from 'styled-components';
import COLOR from "../utility/Color";
import ChatRequireButton from "../components/ChatRequireButton";
import ChatInput from "../components/ChatInput";

const Chat = () => {
    const Wrapper = styled.div`
        position: relative;    
        width: 420px;
        height: 100vh;
        background: ${COLOR.POTZ_PINK_200};
    `;

    const ChatBox = styled.div`
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        gap: 56px;
        position: absolute;
        width: 420px;
        height: 128.33px;
        left: 0px;
        bottom: 61.83px;
        background: #FFFFFF;
        box-shadow: 0px 26.8333px 61.8333px rgba(0, 0, 0, 0.11);
    `;

    const RequireButtonBox = styled.div`
        display: flex;
        align-items: center;
        padding: 0px;
        gap: 9.33px;
        width: 70px;
        height: 100%;
    `;

    const ChatInputBox = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 420px;
        height: 61.83px;
        left: 0px;
        bottom: 0px;
        background: #FFFFFF;
    `;

    return(
        <>
            <Wrapper>
                    <ChatBox>
                        <RequireButtonBox>
                            <ChatRequireButton imageURL={"images/components/icon-coin-mono.png"} text={'정산 요청'}></ChatRequireButton>
                        </RequireButtonBox>

                        <RequireButtonBox>
                            <ChatRequireButton imageURL={"images/components/Union.png"} text={'메뉴 요청'}></ChatRequireButton>
                        </RequireButtonBox>

                        <RequireButtonBox>
                            <ChatRequireButton imageURL={"images/components/Arrow - Right Square.png"} text={'수령 요청'}></ChatRequireButton> 
                        </RequireButtonBox>
                    </ChatBox>

                    <ChatInputBox>
                        <ChatInput/>
                    </ChatInputBox>
                                    
            </Wrapper>
        </>
    )
}

export default Chat;