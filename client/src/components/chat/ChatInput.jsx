import styled from 'styled-components';
import COLOR from '../../utility/Color';
import Font from '../../utility/Font';
// import DeleteImg from '../../../public/images/components/delete-icon.png';
// import SendImg from '../../../public/images/components/send-icon.png';

const chatInputBoxStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  width: '420px',

  height: '61.83px',
  bottom: '0',
  background: `${COLOR.WHITE}`,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18.67px;
  position: relative;
  width: 420px;
  height: 62.33px;
  margin: 28px;
  margin-top: 0px;
`;

const DeleteButton = styled.img.attrs({
  src: 'images/components/Frame 10964.png',
  alt: 'deletebutton',
})`
  cursor: pointer;
  width: 28px;
  height: 28px;
  transition: 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

const Input = styled.input`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 9.33333px 14px 9.33333px 14px;
  gap: 105px;
  width: 290.67px;
  height: 43.67px;
  background: ${COLOR.GRAY_100};
  border-radius: 50.1667px;
  border: none;

  transition: 0.2s;
  &:focus {
    outline: none;
    background: ${COLOR.GRAY_200};
  }

  width: 262.667px;
  height: 25px;
  font-family: ${Font.FontKor};
  font-style: normal;
  font-weight: 400;
  font-size: 16.3333px;
  line-height: 150%;
  display: flex;
  align-items: center;
  color: ${COLOR.GRAY_500};
`;

const SendButton = styled.img.attrs({
  src: 'images/components/send-icon.png',
  alt: 'sendbutton',
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 11.67px;
  cursor: pointer;
  width: 28px;
  height: 28px;
  transition: 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

function ChatInput({ newMessage, setNewMessage, sendMessage, isConnected }) {
  return (
    // <div style={styles.ChatInputBox}>
    //   <Wrapper>
    //     <DeleteButton />
    //     <Input
    //       type='text'
    //       placeholder='메시지를 입력하세요'
    //       value={newMessage}
    //       onChange={(e) => setNewMessage(e.target.value)}
    //       disabled={!isConnected}
    //     />
    //     <SendButton onClick={sendMessage} />
    //   </Wrapper>
    // </div>
    <div style={chatInputBoxStyle}>
      <DeleteButton />
      <Input
        type='text'
        placeholder='메시지를 입력하세요'
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        disabled={!isConnected}
      />
      <SendButton onClick={sendMessage} />
    </div>
  );
}

export default ChatInput;
