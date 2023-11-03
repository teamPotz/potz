import '../App.css';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import COLOR from '../utility/Color';
import Font from '../utility/Font';
import TagPlace from '../components/TagPlace';
import PlacesImg from '../../public/images/graphicImg/Places.png';

//contents_container 안에 UI 구현 하시면 됩니다!

function ChooseFeature() {
  const style1 = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
  };
  const textBoxStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginTop: '28px',
  };
  const fontStyle = {
    fontFamily: Font.FontKor,
    fontSize: '24px',
    fontWeight: '700',
    margin: '0',
    padding: '0',
    color: COLOR.GRAY_500,
  };
  const buttonStyle = {
    backgroundColor: COLOR.WHITE,
    border: 'none',
    color: COLOR.POTZ_PINK_DEFAULT,
    fontSize: '20px',
    fontWeight: '700',
    marginTop: '4px',
    cursor: 'grab',
  };
  const TgaWrappers = {
    marginBottom: '80px',
  };
  const TagContainer = {
    display: 'flex',
    gridGap: '16px',
    marginBottom: '18px',
  };
  const imgStyle = {
    position: 'relative',
    bottom: '20px',
    right: '28px',
  };
  return (
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className='side_container'></div>
        </Col>
        <Col className='col2'>
          <div className='potz_container'>
            <div className='contents_container' style={style1}>
              <div style={textBoxStyle}>
                <div style={fontStyle}>
                  <span>만드실 공동체의 특징을</span>
                  <br></br>
                  <span>하나 이상 선택해주세요.</span>
                  <br></br>
                </div>
                <div>
                  <button style={buttonStyle}>Next</button>
                </div>
              </div>
              <div style={TgaWrappers}>
                <div style={TagContainer}>
                  <TagPlace>주택가</TagPlace>
                  <TagPlace>학원</TagPlace>
                  <TagPlace>교내 시설</TagPlace>
                </div>
                <div style={TagContainer}>
                  <TagPlace>아파트</TagPlace>
                  <TagPlace>기숙사</TagPlace>
                  <TagPlace>지하철 역</TagPlace>
                </div>
                <div style={TagContainer}>
                  <TagPlace>상가</TagPlace>
                  <TagPlace>직장</TagPlace>
                </div>
              </div>
              <div style={imgStyle}>
                <img src={PlacesImg} width={420}></img>
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

export default ChooseFeature;
