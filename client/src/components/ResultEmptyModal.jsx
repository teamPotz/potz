import styled from 'styled-components';
import COLOR from '../utility/Color';
import ButtonSm from '../components/ui/ButtonSM';

const ResultEmptyModal = ({ categoryImg, categoryName }) => {
  return (
    <div className='potz_container' style={backgroundStyle}>
      <div style={potzContainerStyle}>
        <ModalContainer>
          <ModalWrapper>
            <div>
              <span style={coloredFont}>{categoryName}</span>
              <span style={fontStyle}>카테고리가 비어있어요.</span>
            </div>
            <div>
              <img
                src={`${import.meta.env.VITE_APP_API_URL}/${categoryImg}`}
              ></img>
            </div>
            <span style={fontStyle2}>새로운 모집글을 작성해보세요.</span>
            <ButtonSm
              backgroundColor={COLOR.POTZ_PINK_DEFAULT}
              hoverColor={COLOR.POTZ_PINK_600}
              fontColor={COLOR.WHITE}
            >
              글 작성하러 가기
            </ButtonSm>
          </ModalWrapper>
        </ModalContainer>
      </div>
    </div>
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
  fontSize: '16px',
  fontWeight: '600',
  color: COLOR.GRAY_400,
};

const fontStyle2 = {
  fontSize: '14px',
  fontWeight: '300',
  color: COLOR.GRAY_500,
};

const potzContainerStyle = {
  position: 'relative', // potz_container를 relative로 설정합니다.
  minHeight: '100vh', // 최소 높이를 화면 높이(100vh)로 설정합니다.
  width: '100%',
};

const backgroundStyle = {
  backgroundColor: COLOR.POTZ_PINK_100,
};

const coloredFont = {
  fontSize: '16px',
  fontWeight: '700',
  color: COLOR.POTZ_PINK_DEFAULT,
  marginRight: '8px',
};

export default ResultEmptyModal;
