import { useState, useEffect } from 'react';
import LikedComp from '../components/LikedComp';
import COLOR from '../utility/Color';
import Font from '../utility/Font';
import NavBar from '../components/ui/NavBar';

function LikedList() {
  let [likedNum, setLikedNum] = useState(30);

  // 화면 너비 측정을 위한 state 변수 // 디폴트는 420px
  const [displayWidth, setdisplayWidth] = useState(window.innerWidth);
  useEffect(() => {
    const ReSizeHandler = () => {
      setdisplayWidth(window.innerWidth);
    };

    //윈도우 리사이즈가 일어나면 콜백 호출
    window.addEventListener('resize', ReSizeHandler);

    return () => {
      window.removeEventListener('resize', ReSizeHandler);
    };
  }, []);

  //테스트용 데이터
  const postDatas = [
    {
      storeName: '디저트36 송도점',
      imageUrl: '/sample-images/pot-1.png',
      id: 1,
      storeAddress: '인천 연수구 인천타워대로 241',
      orderLink: 'https://baemin.me/jDQWwYtpw',
      category: {
        id: 2,
        name: '카페·디저트',
        imageUrl: '/sample-images/category/category-cafe.png',
        displayOrder: 2,
        createdAt: '2023-11-16T05:40:59.804Z',
        updatedAt: '2023-11-16T05:40:59.804Z',
      },
      recruitment: 10,
      meetingLocation: '아파트 정문',
      deliveryFees: [
        {
          id: 1,
          minAmount: 30000,
          maxAmount: null,
          fee: 3500,
          postId: 1,
        },
        {
          id: 2,
          minAmount: 18000,
          maxAmount: 30000,
          fee: 4000,
          postId: 1,
        },
        {
          id: 3,
          minAmount: 13000,
          maxAmount: 18000,
          fee: 4500,
          postId: 1,
        },
      ],
      deliveryDiscounts: [
        {
          id: 1,
          minAmount: 0,
          discount: 1500,
          discountRate: null,
          maxDiscountAmount: null,
          postId: 1,
        },
        {
          id: 2,
          minAmount: 15000,
          discount: 1000,
          discountRate: null,
          maxDiscountAmount: null,
          postId: 1,
        },
        {
          id: 3,
          minAmount: 100000,
          discount: 5000,
          discountRate: null,
          maxDiscountAmount: null,
          postId: 1,
        },
        {
          id: 4,
          minAmount: 0,
          discount: null,
          discountRate: 0.1,
          maxDiscountAmount: 2000,
          postId: 1,
        },
        {
          id: 5,
          minAmount: 19000,
          discount: null,
          discountRate: 0.2,
          maxDiscountAmount: 2000,
          postId: 1,
        },
        {
          id: 6,
          minAmount: 49000,
          discount: null,
          discountRate: 0.25,
          maxDiscountAmount: 2000,
          postId: 1,
        },
      ],
      likedByUsers: [
        {
          id: 1,
          userId: 1,
          postId: 1,
          liked: true,
          createdAt: '2023-11-16T05:41:00.185Z',
          updatedAt: '2023-11-16T05:41:00.185Z',
        },
      ],
      communityId: 7,
      deliveryPot: {
        participants: [
          {
            id: 1,
            email: 'test@test.com',
            password: '1234',
            name: '테스터1',
            createdAt: '2023-11-16T05:40:59.768Z',
            updatedAt: '2023-11-16T05:40:59.768Z',
          },
          {
            id: 2,
            email: 'test2@test.com',
            password: '1234',
            name: '테스터2',
            createdAt: '2023-11-16T05:40:59.783Z',
            updatedAt: '2023-11-16T05:40:59.783Z',
          },
        ],
        orders: [
          {
            id: 1,
            deliveryPotId: 1,
            userId: 1,
            menuName: '회오리 오므라이스',
            quantity: 1,
            price: 8500,
            imageUrl: null,
            depositConfirmed: false,
            createdAt: '2023-11-16T05:41:00.229Z',
            updatedAt: '2023-11-16T05:41:00.229Z',
          },
          {
            id: 2,
            deliveryPotId: 1,
            userId: 2,
            menuName: '아이스 아메리카노',
            quantity: 2,
            price: 4500,
            imageUrl: null,
            depositConfirmed: false,
            createdAt: '2023-11-16T05:41:00.239Z',
            updatedAt: '2023-11-16T05:41:00.239Z',
          },
        ],
      },
      author: {
        profile: {
          imageUrl: '/sample-images/user-1.png',
        },
        createdDeliveryPots: [
          {
            id: 1,
            potMasterId: 1,
            postId: 1,
            createdAt: '2023-11-16T05:41:00.101Z',
            updatedAt: '2023-11-16T05:41:00.101Z',
          },
          {
            id: 2,
            potMasterId: 1,
            postId: 2,
            createdAt: '2023-11-16T05:41:00.142Z',
            updatedAt: '2023-11-16T05:41:00.142Z',
          },
        ],
      },
    },
    {
      storeName: '커플 케이크 하버뷰점',
      imageUrl: '/sample-images/pot-2.png',
      id: 2,
      storeAddress: '인천 연수구 센트럴로 160',
      orderLink: 'https://baemin.me/jDQWwYtpw',
      category: {
        id: 2,
        name: '카페·디저트',
        imageUrl: '/sample-images/category/category-cafe.png',
        displayOrder: 2,
        createdAt: '2023-11-16T05:40:59.804Z',
        updatedAt: '2023-11-16T05:40:59.804Z',
      },
      recruitment: 10,
      meetingLocation: '아파트 정문',
      deliveryFees: [
        {
          id: 4,
          minAmount: 30000,
          maxAmount: null,
          fee: 3500,
          postId: 2,
        },
        {
          id: 5,
          minAmount: 18000,
          maxAmount: 30000,
          fee: 4000,
          postId: 2,
        },
        {
          id: 6,
          minAmount: 13000,
          maxAmount: 18000,
          fee: 4500,
          postId: 2,
        },
      ],
      deliveryDiscounts: [],
      likedByUsers: [],
      communityId: 7,
      deliveryPot: {
        participants: [
          {
            id: 1,
            email: 'test@test.com',
            password: '1234',
            name: '테스터1',
            createdAt: '2023-11-16T05:40:59.768Z',
            updatedAt: '2023-11-16T05:40:59.768Z',
          },
        ],
        orders: [],
      },
      author: {
        profile: {
          imageUrl: '/sample-images/user-1.png',
        },
        createdDeliveryPots: [
          {
            id: 1,
            potMasterId: 1,
            postId: 1,
            createdAt: '2023-11-16T05:41:00.101Z',
            updatedAt: '2023-11-16T05:41:00.101Z',
          },
          {
            id: 2,
            potMasterId: 1,
            postId: 2,
            createdAt: '2023-11-16T05:41:00.142Z',
            updatedAt: '2023-11-16T05:41:00.142Z',
          },
        ],
      },
    },
  ];

  const potzContainerStyle = {
    position: 'relative', // potz_container를 relative로 설정합니다.
    minHeight: '100vh', // 최소 높이를 화면 높이(100vh)로 설정합니다.
    width: '100%',
  };

  const navbarStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
    alignItems: 'end',
    position: 'fixed',
    bottom: 0,
    maxWidth: '420px',
    width: displayWidth ? displayWidth : '420px',
  };

  const TopNav = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '70px',
    boxShadow: '0px 1.16px 2.3px 0px rgba(0, 0, 0, 0.06)',
  };

  const homeContentesContainer = {
    marginLeft: '28px',
    display: 'grid',
    gridTemplateColumns: ' repeat( auto-fit, minmax(160px, 1fr))',
    marginBottom: '90px',
  };

  const backgroundStyle = {
    backgroundColor: COLOR.WHITE,
  };

  const fontStyle = {
    display: 'flex',
    gap: '16px',
    marginTop: '14px',
    marginLeft: '28px',
    fontFamily: Font.FontKor,
    fontSize: '14px',
    fontWeight: '700',
    color: COLOR.GRAY_400,
  };

  return (
    <div className='potz_container' style={backgroundStyle}>
      <div style={potzContainerStyle}>
        <nav style={TopNav}>
          <span
            style={{
              fontFamily: Font.FontKor,
              fontSize: '18px',
              fontWeight: '700',
              marginLeft: '28px',
            }}
          >
            찜해둔 배달팟
          </span>
        </nav>
        <div style={fontStyle}>
          <div>
            <span>찜한 배달팟</span>
            <span style={{ marginLeft: '4px' }}>{postDatas.length}</span>
          </div>
          <span>카테고리별 보기</span>
          <span>편집</span>
        </div>
        <div style={homeContentesContainer}>
          {/* 찜 한 가게 데이터가 없는 경우 */}
          {postDatas.length < 1 ? (
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
              🍣 아직 찜 하신 가게가 없어요 🍣
            </div>
          ) : null}
          {/* 찜 한 가게 데이터가 있는 경우 */}
          {/* {postDatas.map((postData, index) => {
            return <LikedComp key={index} postData={postData}></LikedComp>;
          })} */}
        </div>
        <div style={navbarStyle}>
          <NavBar />
        </div>
      </div>
    </div>
  );
}

export default LikedList;
