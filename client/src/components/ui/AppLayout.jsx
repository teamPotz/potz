import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import '../../App.css';

function AppLayout() {
  return (
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className='side_container'></div>
        </Col>

        <Col className='col2'>
          <div className='potz_container'>
            <Outlet />
          </div>
        </Col>

        <Col className='col3'>
          <div className='side_container'></div>
        </Col>
      </Row>
    </Container>
  );
}

export default AppLayout;
