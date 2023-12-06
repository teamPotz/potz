import styled from 'styled-components';
import COLOR from '../../utility/Color';
import { useNavigate } from 'react-router-dom';

const CategoryBtnSM = ({ category }) => {
  const navigate = useNavigate();
  // console.log('카테고리 별 데이터', category);

  return (
    <Wrapper
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
            console.log('검색 데이터', data);
            navigate('/result', {
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
      <img width={80} height={80} src={category.imageUrl} />
    </Wrapper>
  );
};

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

export default CategoryBtnSM;
