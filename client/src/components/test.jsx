import ChatInput from "./ChatInput";
import ChatRequireButton from "./ChatRequireButton";

const Test = () => {
    return(
        <>
            <ChatInput/>
            <ChatRequireButton image={"images/components/icon-coin-mono.png"} text={'정산 요청'}></ChatRequireButton>
            <ChatRequireButton image={"images/components/Union.png"} text={'메뉴 요청'}></ChatRequireButton>
            <ChatRequireButton image={"images/components/Arrow - Right Square.png"} text={'수령 요청'}></ChatRequireButton>
        </>
    )
}

export default Test;