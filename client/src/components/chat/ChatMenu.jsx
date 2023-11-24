import COLOR from '../../utility/Color';
import ChatRequireButton from './ChatRequireButton';

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

function PotMasterMenu() {
  return (
    <>
      <div style={styles.RequireButtonBox}>
        <ChatRequireButton
          imageURL={'images/components/icon-coin-mono.png'}
          title={'정산 요청'}
          onClick={() => console.log('hi')}
        />
      </div>

      <div style={styles.RequireButtonBox}>
        <ChatRequireButton
          imageURL={'images/components/Union.png'}
          title={'메뉴 요청'}
          onClick={() => console.log('bye')}
        />
      </div>

      <div style={styles.RequireButtonBox}>
        <ChatRequireButton
          imageURL={'images/components/Arrow - Right Square.png'}
          title={'수령 요청'}
        />
      </div>
    </>
  );
}

function UserMenu() {
  return (
    <>
      <div style={styles.RequireButtonBox}>
        <ChatRequireButton
          imageURL={'images/components/Union.png'}
          title='메뉴 선택하기'
        />
      </div>
      <div style={styles.RequireButtonBox}>
        <ChatRequireButton
          imageURL={'images/components/Union.png'}
          title='입금 인증하기'
        />
      </div>
    </>
  );
}

function ChatMenu({ isPotMaster }) {
  return (
    <div style={styles.Wrapper}>
      <div style={styles.ChatBox}>
        {isPotMaster ? <PotMasterMenu /> : <UserMenu />}
      </div>
    </div>
  );
}

export default ChatMenu;
