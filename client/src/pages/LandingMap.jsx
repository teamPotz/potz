import '../App.css';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import PostMap from './postMap';

function LandingMap() {
  const [value, setValue] = useState('');
  const [keyword, setKeyword] = useState('');

  const submitKeyWord = (e) => {
    e.preventDefault();
    setKeyword(value);
    console.log(keyword);
  };
  return (
    <>
      <Container className='background'>
        <Row className='row1'>
          <Col className='col1'>
            <div className='side_container'></div>
          </Col>
          <Col className='col2'>
            <div className='potz_container'>
              <form onSubmit={submitKeyWord}>
                <input
                  onChange={(e) => {
                    e.preventDefault();
                    setValue(e.target.value);
                  }}
                ></input>
                <button>검색</button>
              </form>
              <PostMap searchKeyword={keyword}></PostMap>
              <div className='contents_container'></div>
            </div>
          </Col>
          <Col className='col3'>
            <div className='side_container'></div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LandingMap;
