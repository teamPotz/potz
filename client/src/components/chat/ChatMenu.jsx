import COLOR from '../../utility/Color';
import ChatRequireButton from './ChatRequireButton';
const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

function PotMasterMenu({ setStatus }) {
  return (
    <>
      <div style={styles.RequireButtonBox}>
        <ChatRequireButton
          title='메뉴 요청'
          imageUrl={PF + 'components/cart.png'}
          onClick={() => setStatus('MENU_REQUEST')}
        />
      </div>
      <div style={styles.RequireButtonBox}>
        <ChatRequireButton
          title='입금 요청'
          imageUrl={PF + 'components/money.png'}
          onClick={() => setStatus('DEPOSIT_REQUEST')}
        />
      </div>
      <div style={styles.RequireButtonBox}>
        <ChatRequireButton
          title='수령 요청'
          imageUrl={PF + 'components/right-arrow.png'}
          onClick={() => setStatus('PICKUP_REQUEST')}
        />
      </div>
    </>
  );
}

function UserMenu({ setOpenOrderModal, setOpenDepositModal }) {
  return (
    <>
      <div style={styles.RequireButtonBox}>
        <ChatRequireButton
          imageUrl={PF + 'components/cart.png'}
          title='메뉴 선택하기'
          onClick={() => setOpenOrderModal(true)}
        />
      </div>
      <div style={styles.RequireButtonBox}>
        <ChatRequireButton
          imageUrl={PF + 'components/money.png'}
          title='입금 인증하기'
          onClick={() => setOpenDepositModal(true)}
        />
      </div>
    </>
  );
}

function ChatMenu({
  isPotMaster,
  setStatus,
  setOpenOrderModal,
  setOpenDepositModal,
}) {
  return (
    <div style={styles.Wrapper}>
      <div style={styles.ChatBox}>
        {isPotMaster ? (
          <PotMasterMenu setStatus={setStatus} />
        ) : (
          <UserMenu
            setOpenOrderModal={setOpenOrderModal}
            setOpenDepositModal={setOpenDepositModal}
          />
        )}
      </div>
    </div>
  );
}

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

export default ChatMenu;
