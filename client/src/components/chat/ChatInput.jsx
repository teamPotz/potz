import styled from 'styled-components';
import COLOR from '../../utility/Color';

const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

const SendIcon = () => {
  return (
    <svg
      width='23'
      height='22'
      viewBox='0 0 23 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M21.6271 8.97464L3.70612 0.497881C1.87766 -0.366992 -0.110059 1.34545 0.474734 3.28176L2.39188 9.62964C2.4475 9.8138 2.63865 9.91737 2.83103 9.91737L10.5827 9.91737C11.2963 9.91737 11.8747 10.4397 11.8747 11.084C11.8747 11.7284 11.2963 12.2507 10.5827 12.2507H2.83103C2.63865 12.2507 2.4475 12.3543 2.39188 12.5384L0.474751 18.8863C-0.110044 20.8226 1.8777 22.535 3.70616 21.6701L21.6271 13.1932C23.408 12.3508 23.408 9.81699 21.6271 8.97464Z'
        fill='#FF7971'
      />
    </svg>
  );
};

function ChatInput({
  newMessage,
  setNewMessage,
  sendMessage,
  isConnected,
  isMenuBarOpened,
  toggleMenuBar,
}) {
  return (
    <div style={chatInputBoxStyle}>
      <Wrapper>
        <SideButton onClick={toggleMenuBar}>
          <img
            src={`${PF}icons/close.svg`}
            style={{
              rotate: isMenuBarOpened ? '' : '45deg',
              transition: '0.2s ease-in-out',
            }}
          />
        </SideButton>
        <Input
          type='text'
          placeholder='메시지를 입력하세요'
          maxLength='200'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          disabled={!isConnected}
        />
        <SideButton onClick={sendMessage}>
          <SendIcon />
        </SideButton>
      </Wrapper>
    </div>
  );
}

const chatInputBoxStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
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
  // gap: 16.67px;
  gap: 6px;
  position: relative;
  width: 420px;
  height: 62.33px;
  margin: 28px;
  margin-top: 0px;
`;

const Input = styled.input`
  background: ${COLOR.GRAY_100};
  color: ${COLOR.GRAY_500};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 14px 10px 14px;
  gap: 105px;
  width: 291.67px;
  height: 25px;
  border-radius: 50px;
  border: none;
  font-style: normal;
  font-weight: 400;
  font-size: 16.3333px;
  line-height: 150%;

  transition: 0.2s;
  &:focus {
    outline: none;
    background: ${COLOR.GRAY_200};
  }
`;

const SideButton = styled.button`
  background-color: ${COLOR.WHITE};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

export default ChatInput;
