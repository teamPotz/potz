import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Font from '../utility/Font';
import COLOR from '../utility/Color';
import ButtonSm from '../components/ButtonSM';
import TagPlaceSM from './TagPlaceSM';

const ModalContainer = styled.div`
  height: calc(100vh - 200px);
  display: flex;
  align-items: center;
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

const EnterCommunityModal = () => {
  let location = useLocation();
  let { communityData } = location.state;
  console.log('해당 커뮤니티 데이터', communityData);

  const fontStyle = {
    fontFamily: Font.FontKor,
    fontSize: '24px',
    fontWeight: '700',
    color: COLOR.GRAY_500,
  };

  const fontStyle2 = {
    fontFamily: Font.FontKor,
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

  return (
    <ModalContainer>
      {communityData ? (
        <ModalWrapper>
          <div style={fontStyle}>{communityData.name}</div>
          <div style={fontStyle2}>
            <span>멤버 수</span>
            <span style={fontColored}>{communityData.memberCount}</span>
            {communityData.communityTypes.split(',').map((type, index) => (
              <TagPlaceSM key={index}>{type}</TagPlaceSM>
            ))}
          </div>
          <div>
            {/* 공동체 사진으로 넣기 */}
            <img
              width={150}
              height={150}
              src={`http://localhost:5000/${communityData.imageUrl}`}
            ></img>
          </div>
          <span style={fontStyle2}>
            공동체에 가입해서 배달비를 나누어보세요.
          </span>
          <div
            onClick={() => {
              // alert('가입완료');
              //로그인한 유저를 communityData.id의 커뮤니티 member에 update하기
              //로그인한 유저의 정보를 GET해오는데, 이때 가입한 커뮤니티 순서를 joinedAt 순서 중 1번을 받아오기
              //가입한 커뮤니티 1번의 id를 기준으로 Home에서 fetch하기
            }}
          >
            <ButtonSm
              backgroundColor={COLOR.POTZ_PINK_DEFAULT}
              hoverColor={COLOR.POTZ_PINK_600}
              fontColor={COLOR.WHITE}
            >
              공동체 가입하기
            </ButtonSm>
          </div>
          <div>
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

export default EnterCommunityModal;
