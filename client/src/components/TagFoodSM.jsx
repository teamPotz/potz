import styled from 'styled-components';
import COLOR from '../utility/Color';

const TagFoodSM = styled.button`
  font-size: 12px;
  font-weight: 400;
  border: none;
  display: flex;
  height: 28px;
  width: 100%;
  padding: 10px 12px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: ${COLOR.POTZ_PINK_100};
  box-shadow: 0px 3.5px 8.16667px 0px rgba(0, 0, 0, 0.03);
  color: ${COLOR.POTZ_PINK_DEFAULT};
  font-weight: 700;
  cursor: grab;

  // 호버 상태 스타일
  &:hover {
    background-color: ${COLOR.POTZ_PINK_DEFAULT};
    color: ${COLOR.WHITE};
  }
`;

export default TagFoodSM;
