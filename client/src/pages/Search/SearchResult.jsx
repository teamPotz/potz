import { useLocation } from 'react-router-dom';
import COLOR from '../../utility/Color';
import GoBack from '../../components/ui/GoBackNavbar';
import SearchEmptyModal from '../../components/search/SearchEmptyModal';
import SearchResultItem from '../../components/search/SearchResultItem';

function SearchResult() {
  const location = useLocation();
  const { result, searchVal } = location.state;

  return (
    <div className='potz_container' style={backgroundStyle}>
      <div style={potzContainerStyle}>
        <GoBack text={searchVal} />

        <div style={homeContentesContainer}>
          {result.length < 1 ? (
            <SearchEmptyModal searchVal={searchVal} />
          ) : (
            <SearchResultItem result={result} />
          )}
        </div>
      </div>
    </div>
  );
}

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

export default SearchResult;
