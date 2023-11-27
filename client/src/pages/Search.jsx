import '../App.css';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Font from '../utility/Font';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import COLOR from '../utility/Color';
import SearchBar from '../components/SearchBar';
import TagFoodSM from '../components/TagFoodSM';
import CategoryBtnSM from '../components/CategoryBtnSM';

const Divider = styled.div`
  margin-top: 18px;
  margin-bottom: 18px;
  background-color: ${COLOR.POTZ_PINK_100};
  height: 10px;
  width: 100%;
  & hr {
    background: ${COLOR.GRAY_200};
    height: 1px;
    border: 0;
  }
`;

const CategorySearchStyle = styled.div`
  margin-top: 14px;
  margin-bottom: 48px;
  margin-left: 28px;
  overflow: auto;
  width: 100%;
  display: flex;
  gap: 14px;

  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BackButton = styled.button`
  width: 28px;
  height: 28px;
  background: ${COLOR.WHITE};
  border: none;
  transition: all 0.2s ease;
  cursor: grab;

  &:hover {
    transform: scale(1.18);
    border-radius: 4px;
  }
`;

const GoButton = styled.button`
  width: 14px;
  height: 14px;
  background: ${COLOR.WHITE};
  border: none;
  transition: all 0.2s ease;
  cursor: grab;

  &:hover {
    transform: scale(1.18);
    border-radius: 4px;
  }
`;

function SearchPage() {
  //테스트용 유저 아이디
  let navigate = useNavigate();
  let [categoryData, setCategoryData] = useState();
  let [searchHistory, setSearchHistory] = useState();

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const response = await fetch('http://localhost:5000/categories', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        console.log('카테고리 전체 데이터', data);
        setCategoryData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategoryData();
  }, []);

  useEffect(() => {
    async function fetchSearchHistoryData() {
      try {
        const response = await fetch('http://localhost:5000/search-history', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        console.log('전체 검색어 데이터', data);
        setSearchHistory(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSearchHistoryData();
  }, []);

  const clickHandler = () => {
    deleteSearchHistory();
  };

  async function deleteSearchHistory() {
    try {
      const response = await fetch(`http://localhost:5000/search-history/`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        console.log('검색 기록 삭제 성공');
        location.reload();
      }
    } catch (error) {
      console.error('검색 기록 삭제 중 에러남:', error);
    }
  }

  const backgroundStyle = {
    backgroundColor: COLOR.WHITE,
  };

  //카테고리 좌 우 드래그로 스크롤 구현
  const CategorySearch = () => {
    //DOM 요소의 가로 스크롤 길이를 저장하기 위해 DOM 참조
    const scroll = useRef(null);
    //마우스 드래그 중인지 여부 저장
    const Drag = useRef(false);
    //드래그 시작 지점
    const X = useRef();

    const onDragStart = (e) => {
      e.preventDefault();
      Drag.current = true;
      //드래그 시작 지점 재정의
      //마우스 이벤트 객체에서의 마우스의 X 좌표 +  scroll 객체가 참조하는 DOM 요소의 가로 스크롤 위치
      X.current = e.pageX + scroll.current.scrollLeft;
    };

    const onDragEnd = (e) => {
      Drag.current = false;
      //드래그 시작 지점 재정의
      X.current -= e.pageX;
    };

    const onDragMove = (e) => {
      if (Drag.current) {
        //scroll 객체가 참조하는 DOM의 현재 가로 스크롤 길이 좌표 정의
        scroll.current.scrollLeft = X.current - e.pageX;
      }
    };

    return (
      <CategorySearchStyle
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        ref={scroll}
      >
        {categoryData
          ? categoryData.map((category) => (
              <div key={category.id}>
                <CategoryBtnSM category={category}></CategoryBtnSM>
              </div>
            ))
          : null}
      </CategorySearchStyle>
    );
  };

  const BackIcon = () => {
    return (
      <svg
        width='11'
        height='20'
        viewBox='0 0 11 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M9.75 18.1673L1.58333 10.0007L9.75 1.83398'
          stroke='black'
          strokeWidth='1.75'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    );
  };

  const GoIcon = () => {
    return (
      <svg
        width='29'
        height='29'
        viewBox='0 0 29 29'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M11.9517 9.5689L16.7156 14.3328L11.9517 19.0967'
          stroke='#373737'
          strokeWidth='1.75'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    );
  };

  const fontStyle = {
    marginTop: '2px',
    fontFamily: Font.FontKor,
    fontWeight: '700',
  };

  const fontStyle2 = {
    fontFamily: Font.FontKor,
    color: COLOR.GRAY_400,
    fontSize: '14px',
    cursor: 'grab',
    background: 'none',
    border: 'none',
  };

  const style1 = {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
  };

  const TopStyle = {
    marginTop: '18px',
    display: 'flex',
    width: '100%',
    gap: '12px',
    alignItems: 'center',
  };

  const style = {
    display: 'flex',
    alignItems: 'start',
  };

  const recentResultStyle = {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  };

  const tagContainer = {
    marginTop: '24px',
    marginBottom: '48px',
    display: 'grid',
    gap: '14px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
  };

  const tagstyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
  };

  const imgContainerStyle = {
    marginBottom: '18px',
  };

  const imgContainer = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const imgStyles = {
    marginTop: '18px',
    borderRadius: '4px',
    width: '48%',
    height: '130px',
    objectFit: 'cover',
    cursor: 'grab',
  };

  return (
    <div className='potz_container' style={backgroundStyle}>
      <div className='contents_container' style={style1}>
        <div style={TopStyle}>
          <BackButton
            onClick={() => {
              navigate(-1);
            }}
          >
            <BackIcon></BackIcon>
          </BackButton>
          <SearchBar></SearchBar>
        </div>
      </div>
      <div>
        <Divider>
          <hr></hr>
        </Divider>
        <div className='contents_container'>
          <div style={recentResultStyle}>
            <div style={style}>
              <span style={fontStyle}>최근 검색어</span>
            </div>
            <button onClick={clickHandler} style={fontStyle2}>
              전체 삭제
            </button>
          </div>
          <div style={tagContainer}>
            {searchHistory
              ? searchHistory.slice(0, 12).map((search) => {
                  return (
                    <TagFoodSM
                      onClick={() => {
                        const fetchSearchData = async () => {
                          try {
                            console.log('search.keyword' + search.keyword);
                            const response = await fetch(
                              `http://localhost:5000/posts/search?key=${
                                search.keyword
                              }&communityId=${localStorage.getItem(
                                'communityDataID'
                              )}`,
                              {
                                method: 'GET',
                                credentials: 'include',
                              }
                            );
                            const data = await response.json();
                            console.log('검색 데이터', data);
                            navigate('/result', {
                              state: {
                                result: data,
                                searchVal: search.keyword,
                              },
                            });
                          } catch (error) {
                            console.error(error);
                          }
                        };
                        fetchSearchData();
                      }}
                      key={search.id}
                      style={tagstyle}
                    >
                      {search.keyword}
                    </TagFoodSM>
                  );
                })
              : null}
          </div>
          <div style={style}>
            <span style={fontStyle}>카테고리로 검색해보세요.</span>
            <GoButton
              onClick={() => {
                navigate('/category');
              }}
            >
              <GoIcon></GoIcon>
            </GoButton>
          </div>
        </div>
        <CategorySearch></CategorySearch>
        <div className='contents_container'>
          <div style={style}>
            <span style={fontStyle}>나의 PICK 맛집</span>
            <GoButton>
              <GoIcon></GoIcon>
            </GoButton>
          </div>
          <div style={imgContainerStyle}>
            <div style={imgContainer}>
              <img
                style={imgStyles}
                src='https://images.unsplash.com/photo-1508737804141-4c3b688e2546?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              ></img>
              <img
                style={imgStyles}
                src='https://images.unsplash.com/photo-1612198790700-0ff08cb726e5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              ></img>
            </div>
            <div style={imgContainer}>
              <img
                style={imgStyles}
                src='https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              ></img>
              <img
                style={imgStyles}
                src='https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              ></img>
            </div>
            <div style={imgContainer}>
              <img
                style={imgStyles}
                src='https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              ></img>
              <img
                style={imgStyles}
                src='https://plus.unsplash.com/premium_photo-1677000666414-70458d618524?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              ></img>
            </div>
            <div style={imgContainer}>
              <img
                style={imgStyles}
                src='https://images.unsplash.com/photo-1508737804141-4c3b688e2546?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              ></img>
              <img
                style={imgStyles}
                src='https://images.unsplash.com/photo-1612198790700-0ff08cb726e5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
