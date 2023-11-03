import styled from 'styled-components';
import COLOR from '../utility/Color';
import Font from '../utility/Font';

const TagPlace = (props) => {
  let { children } = props;
  const TagPlaceStyle = styled.button`
    font-family: ${Font.FontKor};
    font-size: 18px;
    font-weight: 500;
    border: none;
    display: flex;
    height: 28px;
    width: auto;
    max-width: 130px;
    height: 34px;
    padding: 10px 12px;
    justify-content: center;
    align-items: center;
    border-radius: 11px;
    background-color: ${COLOR.WHITE};
    box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.1);
    color: ${COLOR.POTZ_PINK_DEFAULT};

    // 호버 상태 스타일
    &:hover {
      background-color: ${COLOR.POTZ_PINK_200};
    }
  `;

  return <TagPlaceStyle>{children}</TagPlaceStyle>;
};
export default TagPlace;
