import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Font from '../utility/Font';
import COLOR from '../utility/Color';
import CategorySearch from '../components/categorySearch';
import logoImg from '../../public/images/Logo/Potz_Logo.png';
import { useChat } from '../contexts/ChatContext';

const Divider = styled.div`
  margin-top: 40px;
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

const Particiate = styled.div`
  background-color: ${COLOR.POTZ_PINK_100};
  height: 60px;
  width: 100%;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 80px;
  font-family: ${Font.FontKor};
  font-weight: 700;
  color: ${COLOR.GRAY_400};
`;

const ButtonWrap = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  transition: all 0.2s ease;
  cursor: grab;

  &:hover {
    transform: scale(1.18);
    border-radius: 4px;
  }
`;

const EnterStyle = styled.div`
  marginright: 28px;
  cursor: grab;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.04);
    border-color: ${COLOR.POTZ_PINK_100};
  }
`;

const backgroundStyle = {
  fontFamily: Font.FontKor,
  backgroundColor: COLOR.WHITE,
};

const fontColored = {
  color: COLOR.POTZ_PINK_DEFAULT,
};

const BackIcon = () => {
  return (
    <svg
      width='30'
      height='30'
      viewBox='0 0 29 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M18.7501 22.1673L10.5834 14.0007L18.7501 5.83398'
        stroke='white'
        strokeWidth='1.75'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

const SaleIcon = () => {
  return (
    <svg
      width='29'
      height='28'
      viewBox='0 0 29 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M23.9658 10.6703L24.8061 11.5103C25.4714 12.1636 25.8332 13.0503 25.8332 13.9836C25.8449 14.9169 25.4831 15.8048 24.8295 16.4686C24.8217 16.4771 24.8139 16.4847 24.8062 16.4922C24.8023 16.4959 24.7984 16.4997 24.7945 16.5036L23.9658 17.3319C23.6391 17.6586 23.4523 18.1019 23.4523 18.5698V19.7703C23.4523 21.7069 21.8767 23.2831 19.9394 23.2831H18.7373C18.2704 23.2831 17.8269 23.4686 17.5002 23.7953L16.6599 24.6353C15.9713 25.3248 15.0726 25.6619 14.174 25.6619C13.2753 25.6619 12.3766 25.3248 11.6881 24.6481L10.8361 23.7953C10.5093 23.4686 10.0658 23.2831 9.59896 23.2831H8.39686C6.45949 23.2831 4.88392 21.7069 4.88392 19.7703V18.5698C4.88392 18.1019 4.69719 17.6586 4.3704 17.3203L3.5301 16.4919C2.1646 15.1281 2.15293 12.8986 3.51843 11.5231L4.3704 10.6703C4.69719 10.3436 4.88392 9.90026 4.88392 9.42193V8.23193C4.88392 6.29526 6.45949 4.72143 8.39686 4.72143H9.59896C10.0658 4.72143 10.5093 4.53359 10.8361 4.20693L11.6764 3.36693C13.0419 1.99143 15.271 1.99143 16.6482 3.35643L17.5002 4.20693C17.8269 4.53359 18.2704 4.72143 18.7373 4.72143H19.9394C21.8767 4.72143 23.4523 6.29526 23.4523 8.23193V9.43476C23.4523 9.90026 23.6391 10.3436 23.9658 10.6703ZM11.1627 18.0194C11.4428 18.0194 11.6995 17.9144 11.8862 17.716L17.8851 11.7205C18.2819 11.3239 18.2819 10.6694 17.8851 10.2727C17.4883 9.8772 16.8464 9.8772 16.4496 10.2727L10.4507 16.2694C10.0539 16.666 10.0539 17.3194 10.4507 17.716C10.6375 17.9144 10.8942 18.0194 11.1627 18.0194ZM16.1462 16.993C16.1462 17.5647 16.6014 18.0197 17.1733 18.0197C17.7335 18.0197 18.1886 17.5647 18.1886 16.993C18.1886 16.4342 17.7335 15.978 17.1733 15.978C16.6014 15.978 16.1462 16.4342 16.1462 16.993ZM11.1746 9.98226C11.7348 9.98226 12.1899 10.4373 12.1899 10.9973C12.1899 11.5701 11.7348 12.0239 11.1746 12.0239C10.6144 12.0239 10.1475 11.5701 10.1475 10.9973C10.1475 10.4373 10.6144 9.98226 11.1746 9.98226Z'
        fill='white'
      />
    </svg>
  );
};

const BurgerIcon = () => {
  return (
    <svg
      width='29'
      height='28'
      viewBox='0 0 29 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.5003 6.10189C12.5003 5.79539 12.5608 5.49192 12.6781 5.20878C12.7955 4.92565 12.9675 4.6684 13.1843 4.45173C13.401 4.23506 13.6584 4.06321 13.9416 3.94599C14.2248 3.82877 14.5283 3.76848 14.8348 3.76855C15.1413 3.76863 15.4447 3.82908 15.7279 3.94644C16.011 4.0638 16.2682 4.23578 16.4849 4.45256C16.7016 4.66933 16.8734 4.92667 16.9907 5.20986C17.1079 5.49305 17.1682 5.79656 17.1681 6.10305C17.1679 6.72205 16.9219 7.31563 16.4841 7.75321C16.0463 8.1908 15.4526 8.43654 14.8336 8.43639C14.2146 8.43623 13.621 8.19019 13.1834 7.75239C12.7458 7.31458 12.5001 6.72088 12.5003 6.10189ZM12.5003 14.0014C12.5003 13.3826 12.7461 12.7891 13.1837 12.3515C13.6213 11.9139 14.2148 11.6681 14.8336 11.6681C15.4524 11.6681 16.0459 11.9139 16.4835 12.3515C16.9211 12.7891 17.1669 13.3826 17.1669 14.0014C17.1669 14.6202 16.9211 15.2137 16.4835 15.6513C16.0459 16.0889 15.4524 16.3347 14.8336 16.3347C14.2148 16.3347 13.6213 16.0889 13.1837 15.6513C12.7461 15.2137 12.5003 14.6202 12.5003 14.0014ZM12.5003 21.8997C12.5003 21.5932 12.5608 21.2898 12.6781 21.0066C12.7955 20.7235 12.9675 20.4662 13.1843 20.2496C13.401 20.0329 13.6584 19.861 13.9416 19.7438C14.2248 19.6266 14.5283 19.5663 14.8348 19.5664C15.1413 19.5665 15.4447 19.6269 15.7279 19.7443C16.011 19.8616 16.2682 20.0336 16.4849 20.2504C16.7016 20.4672 16.8734 20.7245 16.9907 21.0077C17.1079 21.2909 17.1682 21.5944 17.1681 21.9009C17.1679 22.5199 16.9219 23.1135 16.4841 23.551C16.0463 23.9886 15.4526 24.2344 14.8336 24.2342C14.2146 24.2341 13.621 23.988 13.1834 23.5502C12.7458 23.1124 12.5001 22.5187 12.5003 21.8997Z'
        fill='white'
      />
    </svg>
  );
};

const LinkIcon = () => {
  return (
    <svg
      width='29'
      height='29'
      viewBox='0 0 29 29'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_568_11680)'>
        <path
          d='M19.283 14.6671L22.5829 11.3672C22.5829 11.3672 24.2328 9.71732 21.7579 7.24245C19.283 4.76759 17.6331 6.41749 17.6331 6.41749C17.6331 6.41749 15.1582 8.89237 13.5083 10.5423C11.8584 12.1922 11.8584 13.8421 12.6834 14.6671'
          stroke='white'
          strokeWidth='2.33333'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M9.38354 14.6669L6.08371 17.9667C6.08371 17.9667 4.4338 19.6167 6.90867 22.0915C9.38355 24.5664 11.0335 22.9165 11.0335 22.9165C11.0335 22.9165 13.0959 20.8541 14.7458 19.2042C16.3957 17.5543 16.8082 15.4919 15.9832 14.6669'
          stroke='white'
          strokeWidth='2.33333'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_568_11680'>
          <rect
            width='28'
            height='28'
            fill='white'
            transform='translate(0.333313 0.666016)'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const EnterIcon = () => {
  return (
    <svg
      width='151'
      height='48'
      viewBox='0 0 151 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='0.833374'
        y='0.832031'
        width='149.333'
        height='46.6667'
        rx='11.6667'
        fill='#FF7971'
      />
      <path
        d='M30.1257 21.47V21.75C30.1257 24.3447 31.003 26.9767 33.4297 28.2647L32.123 30.094C30.5924 29.2913 29.603 27.9287 28.987 26.3047C28.4084 28.0967 27.4004 29.6087 25.851 30.486L24.4697 28.638C26.915 27.2193 27.7924 24.4007 27.7924 21.75V21.47H25.0484V19.4727H27.7924V17.1393H30.1257V19.4727H32.851V21.47H30.1257ZM37.331 16.5607H39.6644V33.7527H37.331V25.166H35.931V32.9873H33.635V16.8407H35.931V23.15H37.331V16.5607ZM56.2389 16.5793V26.9953H53.7562V16.5793H56.2389ZM52.3376 23.878L52.5616 25.782C50.1349 26.174 47.9882 26.23 44.3669 26.23H42.8922V17.774H51.1616V19.7153H45.3376V21.0407H50.6576V22.9447H45.3376V24.2887C48.3056 24.27 50.1909 24.1953 52.3376 23.878ZM50.4336 31.886C52.6736 31.886 53.8496 31.4567 53.8496 30.5047C53.8496 29.5713 52.6736 29.1233 50.4336 29.1233C48.2122 29.1233 47.0176 29.5713 47.0176 30.5047C47.0176 31.4567 48.2122 31.886 50.4336 31.886ZM50.4336 27.238C54.0736 27.238 56.3136 28.4513 56.3136 30.5047C56.3136 32.5953 54.0736 33.79 50.4336 33.79C46.7936 33.79 44.5722 32.5953 44.5722 30.5047C44.5722 28.4513 46.7936 27.238 50.4336 27.238ZM73.6453 24.3447L72.5253 26.2487C70.584 25.7447 69.2586 24.6807 68.4746 23.2993C67.728 24.8113 66.3653 25.9873 64.368 26.5473L63.2293 24.6433C65.9173 23.8967 67.1493 22.086 67.2053 20.2193H63.8453V18.278H67.2053V16.5233H69.6693V18.278H73.0666V20.2193H69.6693C69.744 21.918 70.9386 23.6353 73.6453 24.3447ZM68.1386 29.2913V31.6433H74.4853V29.2913H68.1386ZM65.712 33.566V27.3687H76.8933V33.566H65.712ZM79.1706 20.6113V22.6273H76.8933V26.6407H74.4293V16.5793H76.8933V20.6113H79.1706ZM89.5665 25.4273H92.4972V22.0673H89.5105C89.6225 22.6273 89.6785 23.2433 89.6785 23.8967C89.6785 24.438 89.6412 24.9607 89.5665 25.4273ZM85.2358 27.8167C86.5052 27.8167 87.3638 26.454 87.3638 23.8967C87.3638 21.358 86.5052 19.9953 85.2358 19.9953C83.9852 19.9953 83.1265 21.358 83.1265 23.8967C83.1265 26.454 83.9852 27.8167 85.2358 27.8167ZM92.4972 16.5607H94.9612V33.8087H92.4972V27.4247H88.9878C88.2225 29.1047 86.8972 30.0753 85.2358 30.0567C82.6785 30.0567 80.7932 27.686 80.7932 23.8967C80.7932 20.126 82.6785 17.774 85.2358 17.774C86.7852 17.774 88.0732 18.614 88.8385 20.0887H92.4972V16.5607ZM102.669 28.246C103.826 28.246 104.666 27.462 104.666 26.1367C104.666 24.8487 103.826 24.046 102.669 24.046C101.512 24.046 100.653 24.8487 100.653 26.1553C100.653 27.462 101.512 28.246 102.669 28.246ZM102.669 22.0487C105.152 22.0487 107 23.7473 107 26.1367C107 28.5633 105.152 30.262 102.669 30.262C100.168 30.262 98.301 28.5633 98.301 26.1367C98.301 23.7473 100.168 22.0487 102.669 22.0487ZM103.882 16.878V19.118H107.616V21.078H97.6104V19.118H101.418V16.878H103.882ZM113.664 23.2993V25.334H111.2V33.7713H108.736V16.5793H111.2V23.2993H113.664ZM115.828 18.3527H124.078C124.078 23.6167 122.305 27.91 116.201 30.8593L114.913 28.918C119.3 26.8087 121.204 24.1207 121.558 20.3127H115.828V18.3527ZM126.71 16.5607H129.193V33.7527H126.71V16.5607Z'
        fill='white'
      />
    </svg>
  );
};

const imgContainer = {
  maxHeight: '420px',
  marginBottom: '20px',
};

const TopStyle = {
  position: 'relative',
  bottom: '410px',
  left: '0px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const linkStyle = {
  position: 'relative',
  bottom: '100px',
  left: '0px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const fontStyle = {
  fontSize: '16px',
  color: COLOR.GRAY_500,
  display: 'flex',
  gap: '16px',
};

const fontStyleLink = {
  fontSize: '16px',
  color: COLOR.WHITE,
  textDecoration: 'underline',
  marginBottom: '2px',
  cursor: 'grab',
};

const fontStyleLink2 = {
  fontSize: '16px',
  color: COLOR.GRAY_300,
  textDecoration: 'underline',
  marginBottom: '2px',
  cursor: 'grab',
};

const navStyles = {
  boxShadow: '0px 0px 23.33334px 0px rgba(0, 0, 0, 0.11)',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-around',
  background: COLOR.WHITE,
  paddingTop: '12px',
  paddingBottom: '12px',
};

const navFontContainer = {
  display: 'flex',
  flexDirection: 'column',
  fontFamily: Font.FontKor,
};

const marginLeftStyle = {
  marginLeft: '20px',
};

const marginRightStyle = {
  marginRight: '20px',
};

const marginBottomStyle = {
  marginBottom: '20px',
};

const paddingStyle = {
  padding: '12px',
  borderRadius: '50%',
};

const storeFont = {
  fontWeight: '700',
  fontSize: '24px',
  marginBottom: '12px',
};

const fontStyle1 = {
  fontFamily: Font.FontKor,
  fontSize: '16px',
  color: COLOR.GRAY_400,
};

const fontStyle2 = {
  marginLeft: '8px',
  color: COLOR.GRAY_500,
};

const fontStyle3 = {
  fontSize: '19px',
  fontWeight: '700',
};

const fontStyle4 = {
  display: 'flex',
  gap: '8px',
  fontSize: '14px',
  color: COLOR.GRAY_400,
};

const coloredFont = {
  marginRight: '4px',
  color: COLOR.POTZ_PINK_DEFAULT,
};

function Detail() {
  // 화면 너비 측정을 위한 state 변수 // 디폴트는 420px
  const [displayWidth, setdisplayWidth] = useState(window.innerWidth);

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

  const location = useLocation();
  const navigate = useNavigate();
  const { setSelectedPot } = useChat();

  const { postDatas } = location.state;
  console.log('해당 포스트 데이터', postDatas);

  const orderDatas = postDatas.deliveryPot.orders;
  console.log('주문 데이터', orderDatas);
  const categoryId = postDatas.category.id;

  const [categoryPostData, setCategoryPostData] = useState();
  const [totalFee, setTotalFee] = useState();

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

  useEffect(() => {
    const calcTotalFee = () => {
      let total = 0;

      orderDatas.forEach((order) => {
        const price = order.price * order.quantity;
        total += price;
      });

      return total;
    };

    const totalFeeResult = calcTotalFee();
    console.log('모인 금액', totalFeeResult);

    setTotalFee(totalFeeResult);
  }, [orderDatas]);

  useEffect(() => {
    async function fetchCategoryPostData() {
      try {
        const response = await fetch(
          `http://localhost:5000/categories/${categoryId}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        const data = await response.json();
        console.log('해당 카테고리 데이터', data);
        setCategoryPostData(data);
      } catch (error) {
        console.error(error);
      }
    }

    // 비동기 함수를 useEffect 내부에서 직접 호출
    fetchCategoryPostData();
  }, [categoryId]);

  const enterChatRoom = async () => {
    const potId = postDatas.deliveryPot.id;
    try {
      const res = await fetch(
        `http://localhost:5000/delivery-pots/${potId}/join`,
        {
          method: 'PATCH',
          credentials: 'include',
        }
      );
      if (!res.ok) {
        throw new Error('enter chat room error');
      }
      const data = await res.json();
      setSelectedPot(data);
      navigate(`/chats/${postDatas.id}`, {
        state: { storeName: postDatas.storeName },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='potz_container' style={backgroundStyle}>
      <div style={imgContainer}>
        <img
          width={420}
          height={420}
          src={`http://localhost:5000${postDatas.imageUrl}`}
        />
        <div style={TopStyle}>
          <ButtonWrap onClick={() => navigate(-1)} style={marginLeftStyle}>
            <BackIcon />
          </ButtonWrap>
          <div style={{ display: 'flex' }}>
            <ButtonWrap>
              <SaleIcon />
            </ButtonWrap>
            <ButtonWrap style={marginRightStyle}>
              <BurgerIcon />
            </ButtonWrap>
          </div>
        </div>
        <div style={linkStyle}>
          <LinkIcon />
          <a style={fontStyleLink} href={postDatas.orderLink}>
            <span>배달앱 링크 바로가기</span>
          </a>
        </div>
      </div>
      <div>
        <div className='contents_container'>
          <div style={storeFont}>
            <span>{postDatas.storeName}</span>
          </div>
          <div style={marginBottomStyle}>
            <div style={fontStyleLink2}>
              <span>{postDatas.category.name}</span>
            </div>
            <div style={fontStyle}>
              <span>만날 장소</span>
              <span>{postDatas.meetingLocation}</span>
            </div>
            <div style={fontStyle}>
              <span>모인 금액</span>
              <div>
                {totalFee ? <span>{totalFee}</span> : <span>0</span>}
                <span>원</span>
              </div>
            </div>
          </div>

          <Particiate>
            {postDatas.author.profile ? (
              <img
                width={46}
                height={46}
                src={
                  'http://localhost:5000/' + postDatas.author.profile.imageUrl
                }
                style={paddingStyle}
              />
            ) : (
              <img width={38} height={38} src={logoImg} style={paddingStyle} />
            )}
            <div>
              <span style={fontColored}>
                {postDatas.deliveryPot.participants.length}
              </span>
              <span style={fontColored}>/</span>
              <span style={fontColored}>{postDatas.recruitment}</span>
              <span>명 참여중</span>
            </div>
          </Particiate>
        </div>
        <Divider>
          <hr />
        </Divider>
        <div className='contents_container'>
          <div style={fontStyle1}>
            <span>지금 모집중인</span>
            <span style={fontStyle2}>{postDatas.category.name}</span>
          </div>
        </div>
        {categoryPostData ? (
          <CategorySearch categoryPostData={categoryPostData}></CategorySearch>
        ) : null}
        <div style={navbarStyle}>
          <nav style={navStyles}>
            <div style={navFontContainer}>
              <div style={fontStyle3}>
                <span style={coloredFont}>
                  {postDatas.deliveryFees?.[0]?.fee ? (
                    Math.round(
                      postDatas.deliveryFees[0].fee /
                        postDatas.deliveryPot.participants.length
                    )
                  ) : (
                    <span>무료</span>
                  )}
                </span>
                {postDatas.deliveryFees?.[0]?.fee ? (
                  <span>원씩 배달</span>
                ) : (
                  <span>배달</span>
                )}
              </div>
              <div style={fontStyle4}>
                <span>현재 배달비</span>
                <span>
                  {postDatas.deliveryFees?.[0]?.fee ? (
                    postDatas.deliveryFees[0].fee
                  ) : (
                    <span>무료</span>
                  )}
                </span>
              </div>
            </div>
            <EnterStyle onClick={enterChatRoom}>
              <EnterIcon />
            </EnterStyle>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Detail;
