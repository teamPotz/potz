import '../App.css';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import PostMap from './postMap';
import COLOR from '../utility/Color';
import { useNavigate } from 'react-router';
import Font from '../utility/Font';
import styled from 'styled-components';
import UserLocationMap from './userLocationMap';

const Input = styled.input`
  border: none;
  width: 100%;
  background-color: transparent;
  font: ${Font.FontKor};
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  &:focus {
    outline: none;
  }
`;

function UserLoactionLandingMap() {
  const [value, setValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const [currentLocation, setCurrentLocation] = useState();
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
    },
  };

  const submitKeyWord = (e) => {
    e.preventDefault();
    setKeyword(value);
    console.log(keyword);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const geocoder = new window.kakao.maps.services.Geocoder();
          const result = await new Promise((resolve, reject) => {
            geocoder.coord2Address(longitude, latitude, (data, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                resolve(data[0].address.address_name);
              } else {
                reject(status);
              }
            });
          });

          console.log(result);
          setCurrentLocation(result);
        } catch (error) {
          console.error('error:', error);
        }
      });
    }
  }, []);

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
                  <svg
                    onClick={() => {
                      navigate(-1);
                    }}
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

                    <Input
                      placeholder='내 위치를 검색해보세요.'
                      onChange={(e) => {
                        e.preventDefault();
                        setValue(e.target.value);
                      }}
                    ></Input>
                  </form>
                </div>
              </div>
              {currentLocation ? (
                <UserLocationMap
                  currentLocation={currentLocation}
                  searchKeyword={keyword}
                ></UserLocationMap>
              ) : null}
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

export default UserLoactionLandingMap;
