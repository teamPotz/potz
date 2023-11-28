import styled from 'styled-components';
import GoBack from '../components/goBack';
import { useAuth } from '../contexts/AuthContext';
import Font from '../utility/Font';
import COLOR from '../utility/Color';
import LikedComp from '../components/LikedComp';
import { useEffect, useState } from 'react';

const PaddingTop = styled.div`
  padding-top: ${(props) => props.padding};
`;

const FontBg = styled.span`
  font-family: ${Font.FontKor};
  font-size: 23.333px;
  font-style: normal;
  font-weight: 700;
  color: ${(props) => props.color};
`;

const FontSm = styled.span`
  font-family: ${Font.FontKor};
  font-size: 18.667px;
  font-style: normal;
  font-weight: 500;
  color: ${COLOR.GRAY_300};
`;
const styles = {
  background: {
    marginTop: '70px',
  },
  bigImg: {
    width: '367.5px',
    height: '367.5px',
    borderRadius: '151.667px',
    objectFit: 'cover',
  },
  homeContentesContainer: {
    marginLeft: '28px',
    display: 'grid',
    gridTemplateColumns: ' repeat( auto-fit, minmax(160px, 1fr))',
    marginBottom: '90px',
  },
};

  //카테고리 배열에서 최빈 카테고리 구하는 함수
  const findFrequency = (arr) => {
    const frequency = {};
    arr.forEach(element => {
      frequency[element] = (frequency[element] || 0) + 1;
    });

    let mode;
    let maxFrequency = 0;

    for(const key in frequency) {
      if(frequency[key] > maxFrequency){
        mode = key;
        maxFrequency = frequency[key];
      }
    }
    return mode;
  }

function MyBigData() {
  const [orders, setOrders] = useState([]);
  const [average, setAverage] = useState('');
  const [orderCategory, setOrderCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');
  const [postDatas, setPostDatas] = useState([]);
  const categories = [
    '버거·샌드위치',
    '카페·디저트',
    '한식',
    '초밥·회',
    '중식·아시안',
    '피자',
    '치킨',
    '샐러드',
  ];

  //랜덤 데이터 두개 추출
  const getRandomArray = (arr) => {
    const shuffleArray = arr.sort(() => Math.random() - 0.5);
    const randomArray = shuffleArray.splice(0, 2);
    return randomArray;
  }

  useEffect(() => {
    const fetchUserOrderData = async() => {
      try {
        const response = await fetch('http://localhost:5000/users/user-order', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        setOrders(data[0].orders);
        console.log('지금까지 주문한 데이터: ', orders);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserOrderData();
  }, []);

  //지금까지 주문한 카테고리 이력의 배열
  useEffect(() => {
    console.log(orderCategory);
    setOrderCategory(prev => {
      const newCategory = orders.map(order => order.categoryId);
      return [...prev, ...newCategory];
    })
    setSelectCategory(findFrequency(orderCategory));
  },[orders]);

  //지금까지 주문 데이터 평균
  useEffect(() => {
    let sum = 0;
    orders.map(order => {
      sum += order.price * order.quantity;
    })
    setAverage(sum / orders.length);
  }, [orders])


  useEffect(() => {
    const getCategoriesData = async() => {
      try {
        const res = await fetch(`http://localhost:5000/categories/${selectCategory}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await res.json();
        setPostDatas(data.posts);
      } catch (error) {
        console.log(error);
      }
    }
    getCategoriesData();
  }, [selectCategory]);

  useEffect(() => {
    if (postDatas) {
      // console.log(postDatas);
      // console.log(postDatas.length);
      getRandomArray(postDatas);
    }
  }, [postDatas]);

  const { user } = useAuth();

  return (
    <div className='potz_container'>
      <GoBack text={'내 맛집 빅데이터'}></GoBack>
      <div className='contents_container' style={styles.background}>
        <PaddingTop padding='37.33px'>
          <FontBg>{user.name}님의 선호 카테고리는</FontBg>
          <br></br> <FontBg color={COLOR.POTZ_PINK_DEFAULT}>{categories[selectCategory - 1]}</FontBg>
          <FontBg> 네요!</FontBg>
        </PaddingTop>

        <PaddingTop padding='24.5px'>
          <img style={styles.bigImg} src='public/images/graphicImg/categorySushi.png'></img>
        </PaddingTop>

        <PaddingTop padding='23.33px'>
          <FontSm>평균 {average}원을 선택했어요.</FontSm>
          <p></p>
          <FontBg>비슷한 가격대의 우리동네</FontBg>
          <br></br>
          <FontBg color={COLOR.POTZ_PINK_DEFAULT}>{categories[selectCategory - 1]}</FontBg>
          <FontBg> 맛집을 추천할게요.</FontBg>
        </PaddingTop>

        <PaddingTop padding='46.67px'>
          <div style={styles.homeContentesContainer}>
            {/* {postDatas.length < 1 ? (
              <div
                style={{
                  marginTop: '40px',
                  fontFamily: Font.FontKor,
                  fontWeight: '700',
                  color: COLOR.POTZ_PINK_DEFAULT,
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '20px',
                  background: COLOR.WHITE,
                }}
              >
                🍣 현재 선호카테고리에 가게가 없네요.. 🍣
              </div>
            ) : null}

            {postDatas.map((postData, index) => {
              return <LikedComp key={index} postData={postData}></LikedComp>;
            })} */}
          </div>
        </PaddingTop>
      </div>
    </div>
  );
}

export default MyBigData;
