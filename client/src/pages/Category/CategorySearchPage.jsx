import { useLocation } from 'react-router-dom';
import ResultContentsComp from '../../components/ResultContentsComp.jsx';
import COLOR from '../../utility/Color.js';
import GoBack from '../../components/ui/GoBackNavbar.jsx';
import ResultEmptyModal from '../../components/ResultEmptyModal.jsx';
import { useEffect, useState } from 'react';

function CategorySearch() {
  const location = useLocation();
  const { categoryID, categoryName, categoryImg } = location.state;
  const communityId = localStorage.getItem('communityDataID');
  const [categoryDatas, setCategoryDatas] = useState();
  // console.log('해당 카테고리 데이터들', categoryID, categoryName, categoryImg);

  useEffect(() => {
    async function fetchCategoryPostData() {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_APP_API_URL
          }/posts/category?categoryId=${categoryID}&communityId=${communityId}`,
          {
            credentials: 'include',
          }
        );
        const data = await response.json();
        console.log('해당 카테고리 데이터', data);
        setCategoryDatas(data);
      } catch (error) {
        console.error(error);
      }
    }

    // 비동기 함수를 useEffect 내부에서 직접 호출
    fetchCategoryPostData();
  }, [categoryID, communityId]);

  return (
    <div className='potz_container' style={backgroundStyle}>
      <div style={potzContainerStyle}>
        <GoBack text={categoryName}></GoBack>
        <div style={homeContentesContainer}>
          {/* 만약 컨텐츠 데이터 개수가 1개도 없을 경우 공동체 공유 모달창 띄우기 */}
          {categoryDatas && categoryDatas.length < 1 ? (
            <ResultEmptyModal
              categoryImg={categoryImg}
              categoryName={categoryName}
            ></ResultEmptyModal>
          ) : null}
          {categoryDatas ? (
            <ResultContentsComp postDatas={categoryDatas}></ResultContentsComp>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const potzContainerStyle = {
  position: 'relative', // potz_container를 relative로 설정합니다.
  height: '100vh', // 최소 높이를 화면 높이(100vh)로 설정합니다.
  width: '100%',
};
const homeContentesContainer = {
  marginTop: '70px',
  marginBottom: '50px',
};

const backgroundStyle = {
  backgroundColor: COLOR.POTZ_PINK_100,
};

export default CategorySearch;
