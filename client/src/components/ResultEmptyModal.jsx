import styled from 'styled-components';
import Font from '../utility/Font';
import COLOR from '../utility/Color';
import ButtonSm from '../components/ButtonSM';
import ModalImg from '../../public/images/graphicImg/ModalIMG.png';

const ResultEmptyModal = (props) => {
  let { category } = props;
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
    fontSize: '16px',
    fontWeight: '600',
    color: COLOR.GRAY_400,
  };

  const fontStyle2 = {
    fontFamily: Font.FontKor,
    fontSize: '14px',
    fontWeight: '300',
    color: COLOR.GRAY_500,
  };

  const coloredFont = {
    fontFamily: Font.FontKor,
    fontSize: '16px',
    fontWeight: '700',
    color: COLOR.POTZ_PINK_DEFAULT,
    marginRight: '8px',
  };
  return (
    <ModalContainer>
      <ModalWrapper>
        <div>
          <span style={coloredFont}>{category.name}</span>
          <span style={fontStyle}>카테고리가 비어있어요.</span>
        </div>
        <div>
          <img src={'http://localhost:5000/' + category.imageUrl}></img>
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
  );
};

export default ResultEmptyModal;
