import { useEffect, useState } from 'react';
import PostMap from './postMap';
import COLOR from '../utility/Color';
import { useLocation, useNavigate } from 'react-router-dom';
import Font from '../utility/Font';
import styled from 'styled-components';

const Input = styled.input`
  border: none;
  width: 100%;
  background-color: transparent;
  font: ${Font.FontKor};
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  placeholder: '선택할 가게를 검색하세요.';
  &:focus {
    outline: none;
  }
`;

const SearchResult = styled.div`
  width: 420px;
  height: 97px;
  background: ${COLOR.WHITE};
  border-radius: 9.33333px;
  box-sizing: border-box;
  gap: 16.33px;
  transition: 0.2s;
  &: hover {
    transform: scale(1.04);
    cursor: pointer;
  }
`;

const ContentMargin = styled.div`
  padding: 28px;
  padding-top: 14px;
  padding-bottom: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Hover = styled.div`
  width: 29px;
  height: 28px;
  & svg {
    cursor: grab;
    transition: all 0.2s ease;
  }
  &:hover {
    transform: scale(1.18);
`;

const FontBg = styled.span`
  font-family: ${Font.FontKor};
  font-style: normal;
  font-weight: 600;
  font-size: 18.33px;
  color: ${COLOR.GRAY_500};
`;

const FontMd = styled.span`
  font-family: ${Font.FontKor};
  font-style: normal;
  font-weight: 500;
  font-size: 15.33px;
  color: ${COLOR.GRAY_500};
`;
const FontSm = styled.span`
  font-family: ${Font.FontKor};
  font-style: normal;
  font-weight: 500;
  font-size: 14.33px;
  color: ${COLOR.GRAY_500};
`;

const ButtonStyle = styled.button`
  font-family: ${Font.FontKor};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  display: flex;
  width: 100px;
  height: 47px;
  padding: 9.333px 18.667px;
  justify-content: center;
  align-items: center;
  gap: 11px;
  background-color: ${COLOR.POTZ_PINK_200};
  color: ${COLOR.POTZ_PINK_500};
  cursor: grab;

  // 호버 상태 스타일
  &:hover {
    background-color: ${COLOR.POTZ_PINK_300};
  }
`;

function LandingMap() {
  const screenHeight = window.innerHeight;
  const [value, setValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [searchResult, setSearchResult] = useState([]);
  const [latLon, setLatLon] = useState([]);

  const styles = {
    background: {
      backgroundColor: `${COLOR.POTZ_PINK_100}`,
    },
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
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft: '28px',
      marginRight: '28px'
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
    searchResultContainer: {
      marginTop: `${screenHeight}` * 0.705,
      display: 'flex',
      flexDirection: 'column',
      gap: '9.33px',
    },
  };

  const submitKeyWord = (e) => {
    e.preventDefault();
    setKeyword(value);
    console.log(keyword);
  };

  useEffect(() => {
    console.log(searchResult);
  }, [searchResult]);

  const sendDataHandler = (data) => {
    if (data !== 'ERROR') setSearchResult([...data]);
  };
  return (
    <>
      <div className='potz_container' style={styles.background}>
        <div style={styles.wrapperInput}>
          <div style={styles.inputBox}>
            <Hover>
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
            </Hover>


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
                placeholder='선택할 가게를 검색하세요.'
                onChange={(e) => {
                  e.preventDefault();
                  setValue(e.target.value);
                }}
              ></Input>
            </form>
          </div>
        </div>
        <div style={{ position: 'fixed', zIndex: 998 }}>
          <PostMap
            searchKeyword={keyword}
            routeName={location.state.routeName}
            sendData={sendDataHandler}
            latlon={latLon}
          ></PostMap>
        </div>
        <div className='contents_container'></div>
        <div style={styles.searchResultContainer}>
          {searchResult.map((result, i) => {
            return (
              <SearchResult
                key={i}
                onClick={() => {
                  setLatLon([result.y, result.x]);
                  console.log(result.x);
                  console.log(result.y);
                }}
              >
                <ContentMargin>
                  <Content>
                    <FontBg>{result.place_name}</FontBg>
                    <FontMd>{result.address_name}</FontMd>
                    <FontSm>{result.phone}</FontSm>
                  </Content>
                  <ButtonStyle
                    onClick={() => {
                      navigate(location.state.routeName, {
                        state: {
                          name: result.place_name,
                          address: result.address_name,
                          communityId: location.state.communityId,
                        },
                      });
                    }}
                  >
                    선택
                  </ButtonStyle>
                </ContentMargin>
              </SearchResult>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default LandingMap;
