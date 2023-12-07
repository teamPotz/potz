import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import '../../App.css';
import leftImg from '../../../public/images/graphicImg/potzImg.png';
import qrImg from '../../../public/images/graphicImg/qrCode.png';

function AppLayout() {
  return (
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className='side_container'>
            <img src={qrImg} width={260} height={464}></img>
          </div>
        </Col>

        <Col className='col2'>
          <Outlet />
        </Col>

        <Col className='col3'>
          <div className='side_container'>
            <img width={260} height={464} src={leftImg}></img>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AppLayout;
