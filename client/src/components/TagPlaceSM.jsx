import styled from 'styled-components';
import COLOR from '../utility/Color';
import Font from '../utility/Font';

const TagPlaceSM = (props) => {
  let { children } = props;
  const TagPlaceStyle = styled.button`
    font-family: ${Font.FontKor};
    font-size: 10px;
    font-weight: 500;
    border: none;
    border-radius: 4px;
    display: flex;
    padding: 1.167px 4.667px;
    align-items: flex-start;
    gap: 4.667px;
    background-color: ${COLOR.POTZ_PINK_200};
    color: ${COLOR.POTZ_PINK_DEFAULT};
    height: 20px;
    cursor: grab;

    // 호버 상태 스타일
    &:hover {
      background-color: ${COLOR.POTZ_PINK_300};
    }
  `;

  return <TagPlaceStyle>{children}</TagPlaceStyle>;
};
export default TagPlaceSM;
