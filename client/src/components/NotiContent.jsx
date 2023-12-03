import styled from 'styled-components';
import COLOR from '../utility/Color';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const emojiByCategoryId = {
  1: '🍔',
  2: '☕️',
  3: '🍚',
  4: '🍣',
  5: '🥡',
  6: '🍕',
  7: '🍗',
  8: '🥗',
};

function NotiContent({ notifications }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {notifications.map((noti) => {
        switch (noti.type) {
          case 'NEW_POST':
            return (
              <NotiMessage
                key={noti.id}
                onClick={() => navigate(`/posts/${noti.content.postId}`)}
                type='새 게시글'
                title={`${noti.content.communityName}에 모집글이 올라왔어요!`}
                subtitle={`${noti.content.storeName}${
                  emojiByCategoryId[noti.content.categoryId]
                } 게시글로 이동해보세요`}
              />
            );
          case 'NEW_REQUEST':
            return (
              <NotiMessage
                key={noti.id}
                onClick={() => navigate(`/chats/${noti.content.potId}`)}
                type='방장 요청'
                title={`방장의 요청사항이 있어요!`}
                subtitle={`${user.name}님 ${convertMessage(
                  noti.content.status
                )} `}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}

const convertMessage = (status) => {
  switch (status) {
    case 'MENU_REQUEST':
      return '메뉴를 골라주세요🤔';
    case 'DEPOSIT_REQUEST':
      return '정산해요💰';
    case 'PICKUP_REQUEST':
      return '배달이 완료되었어요!';
    default:
      return '';
  }
};

const NotiMessage = ({ onClick, type, title, subtitle }) => {
  return (
    <NotificationBox onClick={onClick}>
      <div style={styles.sideCategory1}>
        <div style={styles.sideCategory2}>
          <NotiType>{type}</NotiType>
          <RightButton>
            <RightArrowIcon />
          </RightButton>
        </div>

        <div style={styles.line}></div>

        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
      </div>
    </NotificationBox>
  );
};

const RightArrowIcon = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8.5 5L15.5 12L8.5 19'
        stroke='#808080'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

const RightButton = styled.button`
  display: flex;
  width: 36px;
  height: 36px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 0.6rem;
  background-color: ${COLOR.WHITE};
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: ${COLOR.GRAY_100};
  }
`;

const NotificationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0px auto;
  margin-top: 9.33px;
  width: 100%;
  height: 144px;
  gap: 8px;
  position: relative;
  border-radius: 8px;
  background-color: ${COLOR.WHITE};
  color: ${COLOR.GRAY_200};
  cursor: pointer;
  box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.07);
`;

const NotiType = styled.div`
  background: ${COLOR.POTZ_PINK_200};
  color: ${COLOR.POTZ_PINK_DEFAULT};
  width: 86.7px;
  height: 21px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 150%;
  cursor: pointer;
  // &:hover {
  // background: ${COLOR.GRAY_200};
  // }
`;

const Title = styled.div`
  /* width: 290px;
    height: 21px; */
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.6px;
  color: ${COLOR.BLACK};
`;

const SubTitle = styled.div`
  /* width: 220px;
    height: 18px; */
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  /* identical to box height, or 18px */
  display: flex;
  align-items: center;
  text-align: center;
  /* Grey/2 */
  color: ${COLOR.GRAY_400};
`;

const styles = {
  background: {
    backgroundColor: `${COLOR.WHITE}`,
  },
  sideCategory1: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: '16px 18px',
    gap: '11px',
    width: '100%',
    height: '81px',
  },

  sideCategory2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0px',
    width: '90%',
    height: '28px',
  },
  line: {
    width: '90%',
    height: '0px',
    borderBottom: '0.58px solid',
    color: `${COLOR.GRAY_100}`,
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '9.33px',
    marginTop: '-5px',
    marginBottom: '69.33px',
  },
  space: {
    display: 'flex',
    width: '280px',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowFlex: {
    display: 'flex',
    flexDirection: 'row',
    gap: '7px',
    alignItems: 'center',
    height: '21px',
  },
};
export default NotiContent;
