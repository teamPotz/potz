import styled from 'styled-components';
import Font from '../utility/Font';
import COLOR from '../utility/Color';
import TagPlaceSM from './TagPlaceSM';

const LikedComp = (props) => {
  //테스트용 데이터
  let { testData } = props;

  const LikedCompWrapper = styled.div`
    height: 256px;
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    cursor: grab;
    transition: all 0.3s ease;
    margin-bottom: 14px;
    font-family: ${Font.FontKor};

    &:hover {
      transform: scale(1.04);
    }
  `;

  const textOverflow = {
    width: '124px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const fontStyle1 = {
    width: '100%',
    height: '30px',
    fontSize: '16px',
    fontWeight: '700',
  };

  const fontStyle2 = {
    fontSize: '18px',
    fontWeight: '700',
    marginTop: '8px',
  };

  const fontStyle3 = {
    display: 'flex',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '400',
    color: COLOR.GRAY_300,
  };

  const coloredfont = {
    color: COLOR.POTZ_PINK_DEFAULT,
    marginRight: '4px',
  };

  const tagStyle = {
    position: 'relative',
    top: '34px',
    left: '16px',
  };

  const linkStyle = {
    position: 'relative',
    top: '158px',
    left: '52px',
    textDecoration: 'underline',
    color: COLOR.WHITE,
    background: 'none',
    fontWeight: '600',
    fontSize: '12px',
  };

  const imgStyle = {
    display: 'flex',
    marginBottom: '4px',
  };

  return (
    <LikedCompWrapper>
      <div>
        <div style={linkStyle}>
          <span>{testData.link}</span>
        </div>
        <div style={tagStyle}>
          <TagPlaceSM>{testData.category}</TagPlaceSM>
        </div>
        <img
          width={150}
          height={150}
          style={imgStyle}
          src={testData.imgSrc}
        ></img>
      </div>
      <div>
        <div style={textOverflow}>
          <span style={fontStyle1}>{testData.store}</span>
        </div>
        <div style={fontStyle3}>
          <div>
            <span>{testData.memNum}</span>
            <span>/</span>
            <span>{testData.limitNum}</span>
            <span>명</span>
          </div>
          <div>
            <span>{testData.meetPlace}</span>
          </div>
        </div>
        <div style={fontStyle2}>
          <span style={coloredfont}>{testData.price}</span>
          <span>원씩 배달</span>
        </div>
      </div>
    </LikedCompWrapper>
  );
};

export default LikedComp;
