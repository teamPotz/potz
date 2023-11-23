import styled from 'styled-components';
import COLOR from '../utility/Color';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  min-width: 90px;
  height: 90px;
  cursor: grab;
  background-color: ${COLOR.POTZ_PINK_100};
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

const CategoryBtnSM = (props) => {
  let navigate = useNavigate();
  let { category } = props;
  console.log('카테고리 별 데이터', category);

  return (
    <Wrapper
      onClick={() => {
        navigate('/category-search', {
          state: {
            categoryID: category.id,
            categoryName: category.name,
            categoryImg: category.imageUrl,
          },
        });
      }}
    >
      <img
        width={80}
        height={80}
        src={'http://localhost:5000/' + category.imageUrl}
      ></img>
    </Wrapper>
  );
};

export default CategoryBtnSM;
