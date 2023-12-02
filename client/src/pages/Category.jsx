import { useState, useEffect } from 'react';
import COLOR from '../utility/Color';
import GoBack from '../components/goBack';
import CategoryBtn from '../components/CategoryBtn';

function CategoryPage() {
  const [categoryData, setCategoryData] = useState();

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const response = await fetch('http://localhost:5000/categories', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        console.log('카테고리 전체 데이터', data);
        setCategoryData(data);
      } catch (error) {
        console.error(error);
      }
    }

    // 비동기 함수를 useEffect 내부에서 직접 호출
    fetchCategoryData();
  }, []);

  const backgroundStyle = {
    backgroundColor: COLOR.POTZ_PINK_100,
  };

  const style1 = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: '100px',
    height: 'auto',
    marginBottom: '0px',
  };

  const categoryContainer = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(40%, auto))',
    gap: '12px',
  };

  const marginstyle = {
    marginBottom: '20px',
  };

  return (
    <div className='potz_container' style={backgroundStyle}>
      <nav>
        <GoBack text={'카테고리'}></GoBack>
      </nav>
      <div className='contents_container' style={style1}>
        <div style={categoryContainer}>
          {categoryData
            ? categoryData.map((category) => (
                <div key={category.id} style={marginstyle}>
                  <CategoryBtn category={category}></CategoryBtn>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
