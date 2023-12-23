import styled from 'styled-components';
import COLOR from '../../utility/Color';
import ButtonSm from '../ui/ButtonSM';
import ModalImg from '../../../public/images/graphicImg/ModalIMG.png';
import coptyUrlToClipboard from '../../utility/coptyUrlToClipboard';

const ShareCommunityModal = () => {
  return (
    <ModalContainer>
      <ModalWrapper>
        <div style={fontStyle}>아직 게시글이 없어요😥</div>
        <div>
          <img src={ModalImg} />
        </div>
        <span style={fontStyle2}>이 공동체의 존재를 주변에 알려주세요!</span>
        <div onClick={coptyUrlToClipboard}>
          <ButtonSm
            backgroundColor={COLOR.POTZ_PINK_DEFAULT}
            hoverColor={COLOR.POTZ_PINK_600}
            fontColor={COLOR.WHITE}
          >
            공동체 공유하기
          </ButtonSm>
        </div>
      </ModalWrapper>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  height: calc(100vh - 200px);
  display: flex;
  align-items: center;
`;
const ModalWrapper = styled.div`
  margin-left: 28px;
  background: ${COLOR.WHITE};
  width: calc(100% - 56px);
  height: 354px;
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
};

export default ShareCommunityModal;
