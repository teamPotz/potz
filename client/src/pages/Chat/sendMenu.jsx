import '../../App.css';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import COLOR from '../../utility/Color';
import GoBack from '../../components/goBack';

//contents_container 안에 UI 구현 하시면 됩니다!

function SendMenu() {

  const styles = {
    background: {
      backgroundColor: `${COLOR.POTZ_PINK_100}`,
    },
  };
  return (
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className='side_container'></div>
        </Col>
        <Col className='col2'>
          <div className='potz_container' style={styles.background}>
            <GoBack text={'메뉴 전송하기'}></GoBack>
            <div className='contents_container'></div>
          </div>
        </Col>
        <Col className='col3'>
          <div className='side_container'></div>
        </Col>
      </Row>
    </Container>
  );
}

export default SendMenu;
