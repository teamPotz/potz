import COLOR from '../../utility/Color';
import ChatButton from './ChatButton';
import CartIcon from './assets/CartIcon';
import MoneyIcon from './assets/MoneyIcon';
import PaperIcon from './assets/PaperIcon';
import BagIcon from './assets/BagIcon';
import LeaveIcon from './assets/LeavIcon';

function ChatMenu({
  isPotMaster,
  status,
  setStatus,
  setOpenOrderModal,
  setOpenDepositModal,
  leavePot,
}) {
  return (
    <div style={menuStyle}>
      {isPotMaster ? (
        <PotMasterMenu
          status={status}
          setStatus={setStatus}
          setOpenOrderModal={setOpenOrderModal}
          leavePot={leavePot}
        />
      ) : (
        <UserMenu
          setOpenOrderModal={setOpenOrderModal}
          setOpenDepositModal={setOpenDepositModal}
          leavePot={leavePot}
        />
      )}
    </div>
  );
}

function PotMasterMenu({ status, setStatus, setOpenOrderModal, leavePot }) {
  return (
    <>
      <ChatButton
        title='메뉴선정 요청'
        icon={<PaperIcon fill={COLOR.GRAY_500} />}
        onClick={() => setStatus('MENU_REQUEST')}
        isCompleted={status.some((s) => s.status === 'MENU_REQUEST')}
      />
      <ChatButton
        title='입금 요청'
        icon={<MoneyIcon fill={COLOR.GRAY_500} />}
        onClick={() => setStatus('DEPOSIT_REQUEST')}
        isCompleted={status.some((s) => s.status === 'DEPOSIT_REQUEST')}
      />
      <ChatButton
        title='수령 요청'
        icon={<BagIcon fill={COLOR.GRAY_500} />}
        onClick={() => setStatus('PICKUP_REQUEST')}
        isCompleted={status.some((s) => s.status === 'PICKUP_REQUEST')}
      />
      <ChatButton
        title='메뉴 선택하기(방장)'
        icon={<CartIcon fill={COLOR.GRAY_500} />}
        onClick={() => setOpenOrderModal(true)}
      />
      <ChatButton
        title='배달팟 탈퇴'
        icon={<LeaveIcon fill={COLOR.GRAY_500} />}
        onClick={leavePot}
      />
    </>
  );
}

function UserMenu({ setOpenOrderModal, setOpenDepositModal, leavePot }) {
  return (
    <>
      <ChatButton
        icon={<CartIcon fill={COLOR.GRAY_500} />}
        title='메뉴 선택하기'
        onClick={() => setOpenOrderModal(true)}
      />
      <ChatButton
        icon={<MoneyIcon fill={COLOR.GRAY_500} />}
        title='입금 인증하기'
        onClick={() => setOpenDepositModal(true)}
      />
      <ChatButton
        icon={<LeaveIcon fill={COLOR.GRAY_500} />}
        title='배달팟 탈퇴'
        onClick={leavePot}
      />
    </>
  );
}

const menuStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  alignItems: 'center',
  justifyItems: 'center',
  padding: '18px 10px',
  rowGap: '30px',
  boxSizing: 'border-box',
  bottom: '54px',
  background: `${COLOR.WHITE}`,
  width: '420px',
  position: 'fixed',
  boxShadow: '0px 26px 62x rgba(0, 0, 0, 0.11)',
  borderRadius: '0.6rem 0.6rem 0 0',
};

export default ChatMenu;
