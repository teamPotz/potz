import COLOR from '../../utility/Color';
import ChatRequireButton from './ChatRequireButton';
import styled from 'styled-components';

const styles = {
  Wrapper: {
    position: 'fixed',
    bottom: 0,
    width: '420px',
    height: '190.17px',
  },
  ChatBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '56px',
    position: 'absolute',
    width: '100%',
    height: '128.33px',
    left: '0px',
    bottom: '61.83px',
    background: `${COLOR.WHITE}`,
    boxShadow: '0px 26.8333px 61.8333px rgba(0, 0, 0, 0.11)',
  },
  RequireButtonBox: {
    display: 'flex',
    alignItems: 'center',
    padding: '0px',
    gap: '9.33px',
    width: '70px',
    height: '100%',
  },
};

const navbarStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
  alignItems: 'end',
  position: 'fixed',
  bottom: 0,
  maxWidth: '420px',
  width: '420px',
};

//nav bar wrappers
const NavBarWrapper = styled.div`
  padding-top: 4px;
  padding-bottom: 4px;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLOR.WHITE};
  border: 1px ${COLOR.GRAY_100} solid;
  border-radius: 16px 16px 0px 0px;
  box-shadow: 0px -36px 57px 0px rgba(255, 255, 255, 0.8);
`;

function ChatMenu({ isPotMaster }) {
  return (
    <div style={styles.Wrapper}>
      <div style={styles.ChatBox}>
        {isPotMaster ? (
          <>
            <div style={styles.RequireButtonBox}>
              <ChatRequireButton
                imageURL={'images/components/icon-coin-mono.png'}
                text={'정산 요청'}
              ></ChatRequireButton>
            </div>

            <div style={styles.RequireButtonBox}>
              <ChatRequireButton
                imageURL={'images/components/Union.png'}
                text={'메뉴 요청'}
              ></ChatRequireButton>
            </div>

            <div style={styles.RequireButtonBox}>
              <ChatRequireButton
                imageURL={'images/components/Arrow - Right Square.png'}
                text={'수령 요청'}
              ></ChatRequireButton>
            </div>
          </>
        ) : (
          <div style={styles.RequireButtonBox}>
            <ChatRequireButton
              imageURL={'images/components/Union.png'}
              text={'메뉴 요청'}
            ></ChatRequireButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMenu;
