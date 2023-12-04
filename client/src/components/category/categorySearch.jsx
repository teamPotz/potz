import { useRef } from 'react';
import styled from 'styled-components';
import CategoryListComp from './CategoryComp';

const CategorySearch = (props) => {
  const { categoryPostData, displayWidth } = props;
  console.log('카테고리별 포스트 데이터', categoryPostData);
  console.log('화면 크기', displayWidth);

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
    margin-bottom: 88px;
    margin-left: 28px;
    margin-right: 56px;
    overflow: auto;
    max-width: 420px;
    width: ${displayWidth - 56}px;
    display: flex;
    gap: 14px;

    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  `;

  const backStyle = {
    width: displayWidth,
  };

  return (
    <div style={backStyle}>
      <CategorySearchStyle
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        ref={scroll}
      >
        {categoryPostData.map((postData, index) => {
          return <CategoryListComp key={index} postData={postData} />;
        })}
      </CategorySearchStyle>
    </div>
  );
};

export default CategorySearch;
