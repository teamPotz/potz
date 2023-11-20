import '../App.css';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import HomeContents from '../components/HomeContentsComp';
import COLOR from '../utility/Color';
import GoBack from '../components/goBack';
import ResultEmptyModal from '../components/ResultEmptyModal';

function CategorySearch() {
  const location = useLocation();
  let { category } = location.state;
  console.log('해당 카테고리 데이터 1', category);

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
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className='side_container'></div>
        </Col>
        <Col className='col2'>
          <div className='potz_container' style={backgroundStyle}>
            <div style={potzContainerStyle}>
              <GoBack text={category.name}></GoBack>
              <div style={homeContentesContainer}>
                {/* 만약 컨텐츠 데이터 개수가 1개도 없을 경우 공동체 공유 모달창 띄우기 */}
                {category.posts.length < 1 ? (
                  <ResultEmptyModal category={category}></ResultEmptyModal>
                ) : null}
                {category ? (
                  <HomeContents communityDatas={category}></HomeContents>
                ) : null}
              </div>
            </div>
          </div>
        </Col>
        <Col className='col3'>
          <div className='side_container'></div>
        </Col>
      </Row>
    </Container>
  );
}

export default CategorySearch;
