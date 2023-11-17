import TagFood from './TagFood';
import styled from 'styled-components';
import COLOR from '../utility/Color';
import { useNavigate } from 'react-router-dom';

const FoodWrapper = styled.div`
  padding-bottom: 18px;
  width: 100%;
  height: 100%;
  cursor: grab;
  background-color: ${COLOR.WHITE};
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${COLOR.POTZ_PINK_300};
  }
`;

const CategoryBtn = (props) => {
  let navigate = useNavigate();
  let { category } = props;
  console.log('카테고리 별 데이터', category);

  return (
    <FoodWrapper
      onClick={() => {
        navigate('/category-search', {
          state: { category: category },
        });
      }}
    >
      <img
        width={108}
        height={108}
        src={'http://localhost:5000/' + category.imageUrl}
      ></img>
      <TagFood>{category.name}</TagFood>
    </FoodWrapper>
  );
};

export default CategoryBtn;
