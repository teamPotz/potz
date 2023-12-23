import styled from 'styled-components';
import COLOR from '../../utility/Color';
import TagFood from '../TagFood';
import { useNavigate } from 'react-router-dom';

const CategoryBtn = ({ category }) => {
  const navigate = useNavigate();
  // console.log('카테고리 별 데이터', category);

  return (
    <FoodWrapper
      onClick={() => {
        const fetchSearchData = async () => {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_APP_API_URL}/posts/category?categoryId=${
                category.id
              }&communityId=${localStorage.getItem('communityDataID')}`,
              {
                method: 'GET',
                credentials: 'include',
              }
            );
            const data = await response.json();
            // console.log('검색 데이터', data);
            navigate('/search/result', {
              state: {
                result: data,
                searchVal: category.name,
              },
            });
          } catch (error) {
            console.error(error);
          }
        };
        fetchSearchData();
      }}
    >
      <img width={108} height={108} src={category.imageUrl} />
      <TagFood>{category.name}</TagFood>
    </FoodWrapper>
  );
};

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

export default CategoryBtn;
