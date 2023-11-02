import './App.css';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

//contents_container 안에 UI 구현 하시면 됩니다!

function Template() {
  return (
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className="side_container"></div>
        </Col>
        <Col className='col2'>
            <div className="potz_container">
              <div className='contents_container'>
                <div className="box">TEST box</div>
                <div className="box">TEST box</div>
                <div className="box">TEST box</div>
                <div className="box">TEST box</div>
                <div className="box">TEST box</div>
                <div className="box">TEST box</div>
                <div className="box">TEST box</div>
                <div className="box">TEST box</div>
                <div className="box">TEST box</div>
              </div>
            </div>
        </Col>
        <Col className='col3'>
          <div className="side_container"></div>
        </Col>
      </Row>
    </Container>
  );
}

export default Template;