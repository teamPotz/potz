import '../App.css';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import PostMap from './postMap';
import COLOR from '../utility/Color';
import { useNavigate } from 'react-router';
import Font from '../utility/Font';

function LandingMap() {
  const [value, setValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const styles = {
    wrapperInput: {
      width: '420px',
      height: '70px',
      backgroundColor: 'transparent',
      position: 'fixed',
      top: 0,
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
    },
    inputBox: {
      display: 'flex',
      width: '420px',
      flexDirection: 'row',
      margin: '28px',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    form: {
      display: 'flex',
      flexDirection: 'row',
      width: '300.667px',
      height: '46.667px',
      borderRadius: '11.667px',
      backgroundColor: `${COLOR.POTZ_PINK_100}`,
      opacity: 0.8,
      alignItems: 'center',
      paddingLeft: '14px',
      gap: '14px',
    },
    input: {
      border: 'none',
      width: '100%',
      backgroundColor: 'transparent',
      font: `${Font.FontKor}`,
      fontSize: '15px',
      fontStyle: 'normal',
      fontWeight: 500,
    },
    button: {
      border: 'none',
      backgroundColor: 'transparent',
    }
  };

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
              <div style={styles.wrapperInput}>
                <div style={styles.inputBox}>
                  <svg onClick={() => {navigate(-1)}}
                    width='29'
                    height='28'
                    viewBox='0 0 29 28'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M18.7498 22.1673L10.5832 14.0007L18.7498 5.83398'
                      stroke='black'
                      strokeWidth='1.75'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>

                    <form onSubmit={submitKeyWord} style={styles.form}>
                      <button type='submit' style={styles.button}>
                      <svg
                        width='28'
                        height='28'
                        viewBox='0 0 28 28'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <circle
                          cx='12.25'
                          cy='12.2503'
                          r='7.58333'
                          stroke='#808080'
                          strokeWidth='1.75'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M22.7146 23.9521C23.0563 24.2938 23.6103 24.2938 23.9521 23.9521C24.2938 23.6103 24.2938 23.0563 23.9521 22.7146L22.7146 23.9521ZM23.9521 22.7146L18.1187 16.8813L16.8813 18.1187L22.7146 23.9521L23.9521 22.7146Z'
                          fill='#808080'
                        />
                      </svg>
                      </button>
                      
                      <input
                        onChange={(e) => {
                          e.preventDefault();
                          setValue(e.target.value);
                        }}
                        style={styles.input}
                        placeholder='선택할 가게를 검색하세요.'
                      ></input>
                    </form>
                </div>
              </div>
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
