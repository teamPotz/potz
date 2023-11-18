import '../App.css';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from '../components/Logo';

function LoadingPage() {
  return (
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className='side_container'></div>
        </Col>
        <Col className='col2'>
          <div className='potz_container'>
            <div className='contents_container'>
              <Logo />
              <div style={{ textAlign: 'center' }}>Loading...</div>
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

export default LoadingPage;
