import styled from 'styled-components';
import COLOR from '../../utility/Color';
import NotificationBell from '../../components/ui/NotificationBell';

const statusInfo = {
  MENU_REQUEST: '메뉴 골라주세요',
  DEPOSIT_REQUEST: '정산해요',
  PICKUP_REQUEST: '배달 왔어요',
};

function PotStatus({ status }) {
  return (
    <Wrapper>
      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <NotificationBell counter={status.length} />

        <FontMd color={status.length > 0 ? COLOR.BLACK : COLOR.GRAY_400}>
          방장 요청사항 {status.length > 0 ? `${status.length}개` : '없음'}
        </FontMd>
      </div>

      <div style={{ display: 'flex', gap: '6px' }}>
        {status
          .sort((a, b) => b.id - a.id)
          .map((s) => (
            <StatusMessage key={s.id}>{statusInfo[s.status]}</StatusMessage>
          ))}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  // margin-left: 28px;
  height: 30px;
  display: flex;
  align-items: center;
  gap: 9px;
`;

const FontMd = styled.p`
  font-style: normal;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.color}; //${COLOR.BLACK}; ${COLOR.GRAY_400};
`;

const StatusMessage = styled.div`
  background: ${COLOR.POTZ_PINK_200};
  color: ${COLOR.POTZ_PINK_DEFAULT};
  height: 30px;
  padding: 2px 10px;
  border-radius: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  white-space: nowrap;
`;

export default PotStatus;
