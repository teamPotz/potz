import styled from 'styled-components';
import Font from '../utility/Font';
import COLOR from '../utility/Color';
import ButtonSm from '../components/ButtonSM';
import ModalImg from '../../public/images/graphicImg/ModalIMG.png';

const ModalContainer = styled.div`
  height: calc(100vh - 200px);
  display: flex;
  align-items: center;
`;
const ModalWrapper = styled.div`
  margin-left: 28px;
  background: ${COLOR.WHITE};
  width: calc(100% - 56px);
  height: 400px;
  border-radius: 14px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0px 3.5px 8.1px 0px rgba(0, 0, 0, 0.07);
`;

const EnterCommunityModal = () => {
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
  };

  return (
    <ModalContainer>
      <ModalWrapper>
        <div style={fontStyle}>공동체 이름</div>
        <div>
          {/* 공동체 사진으로 넣기 */}
          <img src={ModalImg}></img>
        </div>
        <span style={fontStyle2}>공동체에 가입해서 배달비를 나누어보세요.</span>
        <div>
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
    </ModalContainer>
  );
};

export default EnterCommunityModal;
