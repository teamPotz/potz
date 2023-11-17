import { useRef } from 'react';
import styled from 'styled-components';
import LikedComp from './LikedComp';

//12개까지 검색한 키워드 저장
const testDatas = [
  {
    store: '디저트123 송도점 ',
    price: 230,
    link: '쿠팡이츠.link',
    imgSrc: '../../public/images/graphicImg/testImg.png',
    memNum: 8,
    limitNum: 10,
    meetPlace: '아파트 정문',
    category: '# 카페 디저트',
    sale: [1],
    crown: true,
    heart: false,
  },
  {
    store: '커플케이크 하버뷰점',
    price: 600,
    link: '배달의 민족.link',
    imgSrc: '../../public/images/graphicImg/testImg2.png',
    memNum: 10,
    limitNum: 15,
    meetPlace: '아파트 정문',
    category: '# 카페 디저트',
    sale: [],
    crown: true,
    heart: false,
  },
  {
    store: '프루츠 후르츠',
    price: 900,
    link: '배달의 민족.link',
    imgSrc: '../../public/images/graphicImg/testImg3.png',
    memNum: 10,
    limitNum: 15,
    meetPlace: '아파트 정문',
    category: '# 카페 디저트',
    sale: [1],
    crown: false,
    heart: false,
  },
  {
    store: '샐러디 연세대점',
    price: 420,
    link: '배달의 민족.link',
    imgSrc: '../../public/images/graphicImg/testImg4.png',
    memNum: 10,
    limitNum: 15,
    meetPlace: '아파트 정문',
    category: '# 샐러드',
    sale: [],
    crown: true,
    heart: false,
  },
  {
    store: '연어와 육회',
    price: 600,
    link: '배달의 민족.link',
    imgSrc: '../../public/images/graphicImg/testImg5.png',
    memNum: 10,
    limitNum: 15,
    meetPlace: '아파트 정문',
    category: '# 일식 초밥',
    crown: false,
    sale: [],
  },
  {
    store: '디저트123 송도점',
    price: 230,
    link: '쿠팡이츠.link',
    imgSrc: '../../public/images/graphicImg/testImg.png',
    memNum: 8,
    limitNum: 10,
    meetPlace: '아파트 정문',
    category: '# 카페 디저트',
    sale: [1],
    crown: true,
    heart: false,
  },
  {
    store: '프루츠 후르츠',
    price: 900,
    link: '배달의 민족.link',
    imgSrc: '../../public/images/graphicImg/testImg3.png',
    memNum: 10,
    limitNum: 15,
    meetPlace: '아파트 정문',
    category: '# 카페 디저트',
    sale: [1],
    crown: false,
    heart: false,
  },
];

const CategorySearch = (props) => {
  let { categoryPostData } = props;
  console.log('카테고리별 포스트 데이터', categoryPostData.posts);

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
      {categoryPostData.posts.map((postData, index) => {
        return <LikedComp key={index} postData={postData}></LikedComp>;
      })}
    </CategorySearchStyle>
  );
};

export default CategorySearch;
