import '../App.css';
import { useRef } from 'react';
import styled from 'styled-components';
import Font from '../utility/Font';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import COLOR from '../utility/Color';
import SearchBar from '../components/SearchBar';
import TagFoodSM from '../components/TagFoodSM';
import {
  BurgerSM,
  ChickenSM,
  CafeSM,
  PizzaSM,
  SushiSM,
  ChineseFoodSM,
  KoreanFoodSM,
  SaladSM,
} from '../components/Search_category';

function SearchPage() {
  //12개까지 검색한 키워드 저장
  const TestDatas = [
    '떡볶이 세트',
    '짜장면',
    '순대국밥',
    '떡볶이 세트',
    '짜장면',
    '순대국밥',
    '마늘 떡볶이',
    '돈코츠 라멘',
    '떡볶이 세트',
    '짜장면',
    '순대국밥',
  ];

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

    return (
      <CategorySearchStyle
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        ref={scroll}
      >
        <BurgerSM />
        <ChickenSM />
        <CafeSM />
        <PizzaSM />
        <SushiSM />
        <ChineseFoodSM />
        <KoreanFoodSM />
        <SaladSM />
      </CategorySearchStyle>
    );
  };

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
    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
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
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className='side_container'></div>
        </Col>
        <Col className='col2'>
          <div className='potz_container' style={backgroundStyle}>
            <div className='contents_container' style={style1}>
              <div style={TopStyle}>
                <BackButton>
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
                    <GoButton>
                      <GoIcon></GoIcon>
                    </GoButton>
                  </div>
                  <span style={fontStyle2}>전체 삭제</span>
                </div>
                <div style={tagContainer}>
                  {TestDatas.map((TestData, index) => {
                    return (
                      <TagFoodSM key={index} style={tagstyle}>
                        {TestData}
                      </TagFoodSM>
                    );
                  })}
                </div>
                <div style={style}>
                  <span style={fontStyle}>카테고리로 검색해봐요.</span>
                  <GoButton>
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
        </Col>
        <Col className='col3'>
          <div className='side_container'></div>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchPage;