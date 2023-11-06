import styled from 'styled-components';
import Font from '../utility/Font';
import COLOR from '../utility/Color';
import ButtonSm from '../components/ButtonSM';
import ModalImg from '../../public/images/graphicImg/ModalIMG.png';

const ShareCommunityModal = () => {
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
        <div style={fontStyle}>새로운 공동체를 만들었어요!</div>
        <div>
          <img src={ModalImg}></img>
        </div>
        <span style={fontStyle2}>이 소식을 이웃들에게도 공유해주세요!</span>
        <ButtonSm
          backgroundColor={COLOR.POTZ_PINK_DEFAULT}
          hoverColor={COLOR.POTZ_PINK_600}
          fontColor={COLOR.WHITE}
        >
          공동체 공유하기
        </ButtonSm>
      </ModalWrapper>
    </ModalContainer>
  );
};

export default ShareCommunityModal;
