import styled from 'styled-components';
import GoBack from '../components/goBack';
import { useAuth } from '../contexts/AuthContext';
import Font from '../utility/Font';
import COLOR from '../utility/Color';
import { useEffect, useState } from 'react';
import BigdataStore from '../components/bigdataStore';

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

//주문 데이터 가격 평균값
const CalculateAvg = (datas) => {
  let orderPrices = [];
  datas.map((data) => {
    data.deliveryPot.orders.map((order) => {
      const price = order.price * order.quantity;
      orderPrices.push(price);
    });
  });
  let sum = 0;
  orderPrices.map((orderPrice) => {
    sum += orderPrice;
  });
  return sum / orderPrices.length;
};

//지금까지 주문한 카테고리 이력의 배열을 구하고 최빈 카테고리 구하기
const ModeCategory = (datas) => {
  let categoryHistoryArr = [];
  datas.map((data) => {
    categoryHistoryArr.push(data.deliveryPot.post.categoryId);
  });
  const value = findFrequency(categoryHistoryArr);
  return value;
};

//카테고리 배열에서 최빈 카테고리 구하는 함수
const findFrequency = (arr) => {
  const frequency = {};
  arr.forEach((element) => {
    frequency[element] = (frequency[element] || 0) + 1;
  });
  let mode;
  let maxFrequency = 0;
  for (const key in frequency) {
    if (frequency[key] > maxFrequency) {
      mode = key;
      maxFrequency = frequency[key];
    }
  }
  return mode;
};

//선택한 카테고리에서 랜덤 가게 두개 추출
const getRandomArray = (arr) => {
  const shuffleArray = arr.sort(() => Math.random() - 0.5);
  const randomArray = shuffleArray.splice(0, 2);
  return randomArray;
};

function MyBigData() {
  const [datas, setDatas] = useState([]);
  const [orderCategory, setOrderCategory] = useState([]);
  const [postDatas, setPostDatas] = useState([]);
  const [average, setAverage] = useState('');
  const [selectCategory, setSelectCategory] = useState('');

  useEffect(() => {
    const fetchUserOrderData = async () => {
      try {
        const response = await fetch('http://localhost:5000/users/user-order', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        const average = CalculateAvg(data[0].deliveryPotHistoryAsMember);
        const mode = ModeCategory(data[0].deliveryPotHistoryAsMember);
        console.log(
          '지금까지 주문한 데이터: ',
          data[0].deliveryPotHistoryAsMember
        );

        setDatas(data[0].deliveryPotHistoryAsMember);
        setAverage(average);
        setSelectCategory(mode);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserOrderData();
  }, []);

  //카테고리 이름, 이미지 가져오기
  const [categoryName, setCategoryName] = useState([]);
  useEffect(() => {
    const getCategoryName = async () => {
      try {
        const response = await fetch(`http://localhost:5000/categories`, {
          method: 'GET',
          credentials: 'include',
        });
        const categories = await response.json();
        setCategoryName([
          categories[selectCategory - 1].name,
          categories[selectCategory - 1].imageUrl,
        ]);
      } catch (error) {
        console.error(error);
      }
    };
    getCategoryName();
  }, [selectCategory]);

  //최빈 카테고리에서 랜덤 식당 가져오기
  useEffect(() => {
    if (selectCategory !== '') {
      const getCategoriesData = async () => {
        try {
          const res = await fetch(
            `http://localhost:5000/categories/${selectCategory}`,
            {
              method: 'GET',
              credentials: 'include',
            }
          );
          const data = await res.json();
          const selectStore = getRandomArray(data.posts);
          setPostDatas(selectStore);
        } catch (error) {
          console.log(error);
        }
      };
      getCategoriesData();
    }
  }, [selectCategory]);

  useEffect(() => {
    console.log(postDatas);
  }, [postDatas]);

  const { user } = useAuth();

  return (
    <div className='potz_container'>
      <GoBack text={'내 맛집 빅데이터'}></GoBack>
      <div className='contents_container' style={styles.background}>
        <PaddingTop padding='37.33px'>
          <FontBg>{user.name}님의 선호 카테고리는</FontBg>
          <br></br>{' '}
          <FontBg color={COLOR.POTZ_PINK_DEFAULT}>{categoryName[0]}</FontBg>
          <FontBg> 네요!</FontBg>
        </PaddingTop>

        <PaddingTop padding='24.5px'>
          <img
            style={styles.bigImg}
            src={`http://localhost:5000/${categoryName[1]}`}
          ></img>
        </PaddingTop>

        <PaddingTop padding='23.33px'>
          <FontSm>평균 {average}원을 선택했어요.</FontSm>
          <p></p>
          <FontBg>비슷한 가격대의 우리동네</FontBg>
          <br></br>
          <FontBg color={COLOR.POTZ_PINK_DEFAULT}>{categoryName[0]}</FontBg>
          <FontBg> 맛집을 추천할게요.</FontBg>
        </PaddingTop>

        <PaddingTop padding='46.67px'>
          <div style={styles.homeContentesContainer}>
            {postDatas && postDatas.length < 1 ? (
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
                🍣 현재 선호카테고리에 가게가 없어요.. 🍣
              </div>
            ) : null}

            {postDatas &&
              postDatas.map((postData, index) => {
                return (
                  <BigdataStore key={index} postData={postData}></BigdataStore>
                );
              })}
          </div>
        </PaddingTop>
      </div>
    </div>
  );
}

export default MyBigData;
