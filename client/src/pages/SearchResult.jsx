import { useLocation } from 'react-router-dom';
import COLOR from '../utility/Color';
import GoBack from '../components/ui/GoBackNavbar';
import SearchEmptyModal from '../components/SearchEmptyModal';
import SearchResultComp from '../components/SearchResultComp';

function SearchResult() {
  const location = useLocation();
  let { result, searchVal } = location.state;
  console.log('해당 검색결과 데이터 ', result);
  console.log('검색 키워드', searchVal);

  const potzContainerStyle = {
    position: 'relative', // potz_container를 relative로 설정합니다.
    minHeight: '100vh', // 최소 높이를 화면 높이(100vh)로 설정합니다.
    width: '100%',
  };
  const homeContentesContainer = {
    marginTop: '70px',
    marginBottom: '50px',
  };

  const backgroundStyle = {
    backgroundColor: COLOR.POTZ_PINK_100,
  };

  return (
    <div className='potz_container' style={backgroundStyle}>
      <div style={potzContainerStyle}>
        <GoBack text={searchVal}></GoBack>
        <div style={homeContentesContainer}>
          {/* 만약 컨텐츠 데이터 개수가 1개도 없을 경우 공동체 공유 모달창 띄우기 */}
          {result.length < 1 ? (
            <SearchEmptyModal searchVal={searchVal}></SearchEmptyModal>
          ) : (
            <SearchResultComp result={result}></SearchResultComp>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
