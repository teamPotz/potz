import '../App.css';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import COLOR from '../utility/Color';
import Font from '../utility/Font';
import ButtonBg from '../components/ButtonBG';
import GraPhic from '../../public/images/graphicImg/Hands.png';
import { useNavigate } from 'react-router-dom';

//contents_container 안에 UI 구현 하시면 됩니다!

function FindLocation() {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate('');
  };

  const style1 = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
  };
  const styles2 = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  };
  const style3 = {};
  const fontStyle = {
    fontFamily: Font.FontKor,
    fontSize: '24px',
    fontWeight: '700',
    margin: '0',
    padding: '0',
    color: COLOR.GRAY_500,
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
              <div className='text_container' style={fontStyle}>
                <span>수현님 근처에 있는</span>
                <br></br>
                <span>배달 공동체를 찾아볼까요?</span>
              </div>
              <div className='img_container' style={styles2}>
                <img style={styles2} width={300} src={GraPhic} />
              </div>
              <div className='btn_container' style={style3}>
                <ButtonBg
                  backgroundColor={COLOR.POTZ_PINK_DEFAULT}
                  hoverColor={COLOR.POTZ_PINK_600}
                  fontColor={COLOR.WHITE}
                >
                  내 위치 검색
                </ButtonBg>
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

export default FindLocation;
