import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import COLOR from '../../utility/Color';
import ButtonSm from '../ui/ButtonSM';
import TagPlaceSM from '../TagPlaceSM';
import logoImg from '../../../public/images/logo.png';

const EnterCommunityModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { communityData } = location.state;
  // console.log('해당 커뮤니티 데이터', communityData);
  const communityId = communityData.id;

  const clickHandler = () => {
    updateUserData();
    localStorage.setItem('communityDataID', communityId);
  };

  const updateUserData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/communities/${communityId}/join`,
        {
          method: 'PATCH',
          credentials: 'include',
        }
      );
      const data = await response.json();
      console.log('데이터', data);
      if (data.existingConnection) {
        alert('이미 가입된 커뮤니티네요! 해당 커뮤니티로 바로 이동하겠습니다.');
        navigate(`/community/${communityId}`);
      } else {
        alert('가입 완료되었습니다!');
        navigate(`/community/${communityId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalContainer>
      {communityData ? (
        <ModalWrapper>
          <div style={fontStyle}>{communityData.name}</div>
          <div style={fontStyle2}>
            <span>멤버 수</span>
            <span style={fontColored}>{communityData.memberCount}</span>
            <div style={tagStyle}>
              {communityData.communityTypes.split(',').map((type, index) => (
                <TagPlaceSM key={index}>{type}</TagPlaceSM>
              ))}
            </div>
          </div>
          <div>
            <img
              width={150}
              height={150}
              src={communityData.imageUrl || logoImg}
            />
          </div>
          <span style={fontStyle2}>
            공동체에 가입해서 배달비를 나누어보세요.
          </span>
          <div onClick={clickHandler}>
            <ButtonSm
              backgroundColor={COLOR.POTZ_PINK_DEFAULT}
              hoverColor={COLOR.POTZ_PINK_600}
              fontColor={COLOR.WHITE}
            >
              공동체 가입하기
            </ButtonSm>
          </div>
          <div
            onClick={() => {
              navigate(-1);
            }}
          >
            <ButtonSm
              backgroundColor={COLOR.POTZ_PINK_200}
              hoverColor={COLOR.POTZ_PINK_300}
              fontColor={COLOR.POTZ_PINK_600}
            >
              돌아가기
            </ButtonSm>
          </div>
        </ModalWrapper>
      ) : null}
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  margin-top: 70px;
`;

const ModalWrapper = styled.div`
  margin-left: 28px;
  background: ${COLOR.WHITE};
  width: calc(100% - 56px);
  height: 500px;
  border-radius: 14px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0px 3.5px 8.1px 0px rgba(0, 0, 0, 0.07);
`;

const fontStyle = {
  fontSize: '24px',
  fontWeight: '700',
  color: COLOR.GRAY_500,
};

const fontStyle2 = {
  fontSize: '16px',
  fontWeight: '300',
  color: COLOR.GRAY_500,
  display: 'flex',
  alignItems: 'center',
};

const fontColored = {
  color: COLOR.POTZ_PINK_DEFAULT,
  marginRight: '12px',
};

const tagStyle = {
  display: 'flex',
  gap: '12px',
};

export default EnterCommunityModal;
