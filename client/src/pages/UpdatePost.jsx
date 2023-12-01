//글쓴이만 글을 수정할 수 있어요
import COLOR from '../utility/Color';
import GoBack from '../components/goBack';
import styled from 'styled-components';
import ButtonBg from '../components/ButtonBG';
import TagFood from '../components/TagFood';
import Font from '../utility/Font';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const Button = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 9px;
  border-bottom: 0.58px solid ${COLOR.GRAY_200};
  justify-content: ${(props) => props.spacebetween};
  transition: all 0.2s ease;
`;

const ShopInput = styled.input`
  border: none;
  height: 30px;
  width: ${(props) => props.width};
  placeholder: ${(props) => props.placeholder};
  &::placeholder {
    color: ${COLOR.GRAY_500};
  }
  font-family: ${Font.FontKor};
  font-style: normal;
  font-weight: 700;
  font-size: 18.67px;
  color: ${COLOR.GRAY_500};
  &:focus {
    outline: none;
    &::placeholder {
      color: ${COLOR.BLACK};
    }
  }
`;
const Input = styled.input`
  border: none;
  height: 30px;
  width: ${(props) =>
    props.width
      ? props.width
      : `calc(35px + ${props.value ? props.value.length * 2 : 0}px)`};
  placeholder: ${(props) => props.placeholder};
  &::placeholder {
    color: ${COLOR.POTZ_PINK_300};
  }
  font-family: ${Font.FontKor};
  font-style: normal;
  font-weight: 700;
  font-size: 16.33px;
  color: ${COLOR.POTZ_PINK_400};
  &:focus {
    outline: none;
    &::placeholder {
      color: ${COLOR.POTZ_PINK_400};
    }
  }
`;
const LinkInput = styled.input`
  border: none;
  height: 30px;
  width: 364px;
  placeholder: ${(props) => props.placeholder};
  &::placeholder {
    color: ${COLOR.GRAY_300};
  }
  font-family: ${Font.FontKor};
  font-style: normal;
  font-weight: 700;
  font-size: 16.33px;
  color: ${COLOR.GRAY_400};
  &:focus {
    outline: none;
    &::placeholder {
      color: ${COLOR.GRAY_400};
    }
  }
`;

const ImgInput = styled.div`
  border: none;
  width: 65.33px;
  height: 65.33px;
  background-image: url(${(props) => (props.img ? props.img : 'none')});
  background-color: ${COLOR.POTZ_PINK_100};
  background-size: cover;
  border-radius: 9.33333px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${COLOR.POTZ_PINK_200};
    cursor: pointer;
  }
`;

const FontMd = styled.span`
  font-family: ${Font.FontKor};
  font-style: normal;
  font-weight: 400;
  font-size: 16.33px;
  color: ${COLOR.GRAY_500};
`;
const FontSm = styled.span`
  font-family: ${Font.FontKor};
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: ${COLOR.GRAY_400};
  &:hover {
    font-size: 14.3px;
    color: ${COLOR.GRAY_500};
    cursor: pointer;
  }
`;

function UpdatePost() {
  const BASE_URL = 'http://localhost:5000';
  const screenHeight = window.innerHeight - 98;
  const [selectImg, setSelectImg] = useState(undefined);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const myInputRef = useRef(null);

  //데이터 받아와서 바인딩
  const [getData, setGetData] = useState({
    storeName: '',
    storeAddress: '',
    recruitment: '',
    orderLink: '',
    meetingLocation: '',
    imageUrl: '',
    deliveryFees: [{ minAmount: '', fee: '' }],
    deliveryDiscounts: [{ minAmount: '', discount: '' }],
    categoryId: '',
  });
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`${BASE_URL}/posts/${id}/update`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await res.json();
        setGetData(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [id]);

  const [address, setAddress] = useState('');

  useEffect(() => {
    if (getData) {
      console.log(getData);
      setAddress(getData.storeAddress);
      setCategoryid(getData.categoryId);
      setCategory(categories[getData.categoryId - 1]);
      setDeliveryFeeCount(getData.deliveryFees.length);
      setdeliveryDiscountCount(getData.deliveryDiscounts.length);
    }
  }, [getData]);

  //데이터 업데이트 전송
  async function updatePost(
    storeName,
    storeAddress,
    orderLink,
    categoryId,
    recruitment,
    meetingLocation,
    deliveryFees,
    deliveryDiscounts,
    file
  ) {
    const formData = new FormData();
    formData.append('storeName', storeName);
    formData.append('storeAddress', storeAddress);
    formData.append('orderLink', orderLink);
    formData.append('categoryId', categoryId);
    formData.append('recruitment', recruitment);
    formData.append('meetingLocation', meetingLocation);
    formData.append('deliveryFees', deliveryFees);
    formData.append('deliveryDiscounts', deliveryDiscounts);
    formData.append('image', file);
    try {
      const res = await fetch(`${BASE_URL}/posts/${id}/update`, {
        method: 'PATCH',
        body: formData,
        credentials: 'include',
      });
      const data = await res.json();
      alert('수정이 완료되었습니다.');
      navigate(`/posts/${id}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  let searchedAddress = false;
  let name = false;
  if (location.state !== null) {
    name = location.state.name;
    searchedAddress = location.state.address;
  }

  const [toggleLimit, setToggleLimit] = useState(true);
  const [toggleMeetingLocation, setToggleMeetingLocation] = useState(true);

  const [category, setCategory] = useState('카테고리');
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
  const [toggled, setToggled] = useState(false);
  const [categoryid, setCategoryid] = useState('');

  const categoryHandler = (e) => {
    e.preventDefault();
    setToggled(false);
    setCategory(e.target.textContent);
    setCategoryid(categories.indexOf(e.target.textContent) + 1);
  };

  //배달비, 할인 관련 로직
  //배달비, 할인 갯수
  const [deliveryFeeCount, setDeliveryFeeCount] = useState(1);
  const [deliveryDiscountCount, setdeliveryDiscountCount] = useState(1);
  const [values1, setValues1] = useState([]);
  const [values2, setValues2] = useState([]);

  const deliveryFeeChange = (e, number) => {
    e.preventDefault();
    if (e.target.name === `deliveryFeeHeader${number}`) {
      setValues1((prevValues) => [e.target.value, prevValues[1]]);
    }
    if (e.target.name === `deliveryFeeFooter${number}`) {
      setValues1((prevValues) => [prevValues[0], e.target.value]);
      if (values1[0] && values1[1]) {
        setValues1([]);
        if (deliveryFeeCount === number) {
          setDeliveryFeeCount(deliveryFeeCount + 1);
        }
      }
    }
  };

  const deliveryDiscountsChange = (e, number) => {
    e.preventDefault();
    if (e.target.name === `deliveryDiscountsHeader${number}`) {
      setValues2((prevValues) => [e.target.value, prevValues[1]]);
    }
    if (e.target.name === `deliveryDiscountsFooter${number}`) {
      setValues2((prevValues) => [prevValues[0], e.target.value]);
      if (values2[0] && values2[1]) {
        setValues2([]);
        if (deliveryDiscountCount === number) {
          setdeliveryDiscountCount(deliveryDiscountCount + 1);
        }
      }
    }
  };

  const processData = (name, e) => {
    let data = [];

    if (name === 'deliveryFee') {
      for (let i = 0; i < deliveryFeeCount; i++) {
        data.push([
          e.target[`deliveryFeeHeader${i}`].value,
          e.target[`deliveryFeeFooter${i}`].value,
        ]);
      }
    }
    if (name === 'deliveryDiscount') {
      for (let i = 0; i < deliveryDiscountCount; i++) {
        data.push([
          e.target[`deliveryDiscountsHeader${i}`].value,
          e.target[`deliveryDiscountsFooter${i}`].value,
        ]);
      }
    }

    for (let i = 0; i < data.length - 1; i++) {
      data[i].push(data[i + 1][0]);
    }
    return JSON.stringify(data);
  };

  function checkNumberic(arr) {
    const isNumeric = (str) => {
      return !isNaN(str);
    };
    return JSON.parse(arr).every((innerArr) => innerArr.every(isNumeric));
  }

  const styles = {
    background: {
      backgroundColor: `${COLOR.WHITE}`,
      height: '100%',
    },
    container: {
      marginTop: '70px',
      height: screenHeight,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  };

  return (
    <div className='potz_container' style={styles.background}>
      <GoBack text={'글 수정하기'}></GoBack>

      <div className='contents_container'>
        <form
          style={styles.container}
          encType='multipart/form-data'
          onSubmit={(e) => {
            e.preventDefault();
            const storeName = name ? name : e.target.storeName.value;
            const storeAddress = searchedAddress
              ? searchedAddress
              : address
              ? address
              : null;
            const orderLink = e.target.orderLink.value;
            const categoryId = categoryid;
            const recruitment = e.target.recruitment.value;
            const meetingLocation = e.target.meetingLocation.value;
            const deliveryFees = processData('deliveryFee', e);
            const deliveryDiscounts = processData('deliveryDiscount', e);
            const file = e.target.image.files[0];

            if (
              checkNumberic(deliveryFees) &&
              checkNumberic(deliveryDiscounts)
            ) {
              if (!isNaN(recruitment)) {
                if (
                  storeName &&
                  storeAddress &&
                  orderLink &&
                  categoryId &&
                  recruitment &&
                  meetingLocation &&
                  (deliveryFees || deliveryDiscounts)
                ) {
                  updatePost(
                    storeName,
                    storeAddress,
                    orderLink,
                    categoryId,
                    recruitment,
                    meetingLocation,
                    deliveryFees,
                    deliveryDiscounts,
                    file
                  );
                } else {
                  alert('모든 내용을 입력해주세요.');
                }
              } else {
                alert('마감 인원수에는 숫자만 입력 가능합니다.');
              }
            } else {
              alert('배달비에는 숫자만 입력 가능합니다.');
            }
          }}
        >
          <div>
            <Button height={'112px'}>
              <input
                ref={myInputRef}
                style={{ display: 'none' }}
                name='image'
                type='file'
                accept='image/*'
                onChange={(e) => {
                  e.preventDefault();
                  const image = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setSelectImg(reader.result);
                  };
                  if (image) {
                    reader.readAsDataURL(image);
                  }
                }}
              ></input>
              <ImgInput
                img={selectImg}
                onClick={() => {
                  myInputRef.current.click();
                }}
              >
                {selectImg ? (
                  <div />
                ) : getData.imageUrl ? (
                  <img
                    style={{
                      border: 'none',
                      width: '65.33px',
                      height: '65.33px',
                      objectFit: 'cover',
                      borderRadius: '9.33333px',
                    }}
                    src={`http://localhost:5000/images/${getData.imageUrl}`}
                  />
                ) : (
                  <svg
                    width='21'
                    height='20'
                    viewBox='0 0 21 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M6.41858 19.7992H14.9119C18.2344 19.7992 20.4657 17.4687 20.4657 14.0008V5.99761C20.4657 2.52977 18.2344 0.199219 14.9129 0.199219H6.41858C3.09708 0.199219 0.865723 2.52977 0.865723 5.99761V14.0008C0.865723 17.4687 3.09708 19.7992 6.41858 19.7992ZM7.23355 9.01979C5.88248 9.01979 4.78467 7.9205 4.78467 6.56979C4.78467 5.21909 5.88248 4.11979 7.23355 4.11979C8.58364 4.11979 9.68243 5.21909 9.68243 6.56979C9.68243 7.9205 8.58364 9.01979 7.23355 9.01979ZM18.3293 12.8753C18.6574 13.7168 18.4869 14.7281 18.1361 15.5615C17.7202 16.5526 16.924 17.303 15.9208 17.6307C15.4753 17.7763 15.0082 17.84 14.5421 17.84H6.28292C5.46104 17.84 4.73377 17.6428 4.13756 17.2757C3.76407 17.0451 3.69805 16.5131 3.97496 16.1683C4.43813 15.5918 4.89539 15.0133 5.35659 14.4298C6.23562 13.3132 6.82788 12.9896 7.48618 13.2738C7.75324 13.3911 8.02128 13.5671 8.29721 13.7532C9.03237 14.2528 10.0543 14.9395 11.4004 14.1941C12.3216 13.6782 12.8559 12.7932 13.3212 12.0225L13.329 12.0096C13.362 11.9555 13.3946 11.9015 13.4272 11.8475C13.5836 11.5888 13.7379 11.3336 13.9124 11.0984C14.1312 10.8041 14.9422 9.88374 15.9927 10.5391C16.6618 10.9517 17.2245 11.51 17.8267 12.1077C18.0563 12.3363 18.2199 12.5962 18.3293 12.8753Z'
                      fill='#FF7971'
                    />
                  </svg>
                )}
              </ImgInput>
              <div>
                <ShopInput
                  name='storeName'
                  placeholder='가게 이름'
                  defaultValue={
                    name ? name : getData ? getData.storeName : null
                  }
                ></ShopInput>
                <div>
                  <svg
                    width='15'
                    height='14'
                    viewBox='0 0 15 14'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M8.10926 12.1238C9.22839 10.7769 11.1629 8.05514 11.1629 5.33338C11.1629 4.05689 10.2055 1.50391 7.33338 1.50391C4.46127 1.50391 3.50391 4.05689 3.50391 5.33338C3.50391 8.05514 5.43837 10.7769 6.5575 12.1238C6.96928 12.6193 7.69748 12.6193 8.10926 12.1238ZM7.33338 6.60987C8.03837 6.60987 8.60987 6.03836 8.60987 5.33338C8.60987 4.62839 8.03837 4.05688 7.33338 4.05688C6.6284 4.05688 6.05689 4.62839 6.05689 5.33338C6.05689 6.03836 6.6284 6.60987 7.33338 6.60987Z'
                      fill='#808080'
                    />
                  </svg>
                  <FontSm
                    onClick={() =>
                      navigate('/getaddress', {
                        state: {
                          routeName: `/update-post/${id}`,
                        },
                      })
                    }
                  >
                    {searchedAddress
                      ? searchedAddress
                      : address
                      ? address
                      : '지도로 주소 검색하기'}
                  </FontSm>
                </div>
              </div>
            </Button>
            <Button height={'74.67px'}>
              <LinkInput
                name='orderLink'
                placeholder='관련 링크 붙여넣기'
                defaultValue={getData.orderLink}
              ></LinkInput>
            </Button>
            <Button
              spacebetween={'space-between'}
              height={toggled ? '150.67px' : '74.67px'}
            >
              {toggled ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', gap: '7px' }}>
                    <TagFood id='1' onClick={categoryHandler}>
                      버거·샌드위치
                    </TagFood>
                    <TagFood id='2' onClick={categoryHandler}>
                      카페·디저트
                    </TagFood>
                  </div>
                  <div style={{ display: 'flex', gap: '7px' }}>
                    <TagFood id='3' onClick={categoryHandler}>
                      한식
                    </TagFood>
                    <TagFood id='4' onClick={categoryHandler}>
                      초밥·회
                    </TagFood>
                    <TagFood id='5' onClick={categoryHandler}>
                      중식·아시안
                    </TagFood>
                  </div>
                  <div style={{ display: 'flex', gap: '7px' }}>
                    <TagFood id='6' onClick={categoryHandler}>
                      피자
                    </TagFood>
                    <TagFood id='7' onClick={categoryHandler}>
                      치킨
                    </TagFood>
                    <TagFood id='8' onClick={categoryHandler}>
                      샐러드
                    </TagFood>
                  </div>
                </div>
              ) : (
                <TagFood
                  onClick={(e) => {
                    e.preventDefault();
                    setToggled(true);
                  }}
                >
                  {category}
                </TagFood>
              )}
            </Button>

            <Button height={'74.67px'}>
              {toggleLimit ? (
                <svg
                  width='28'
                  height='29'
                  viewBox='0 0 28 29'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M20.1757 8.6729C20.1757 12.0994 17.4283 14.847 13.9994 14.847C10.5716 14.847 7.82308 12.0994 7.82308 8.6729C7.82308 5.24636 10.5716 2.5 13.9994 2.5C17.4283 2.5 20.1757 5.24636 20.1757 8.6729ZM13.9993 25.8332C8.93879 25.8332 4.66602 25.0107 4.66602 21.8373C4.66602 18.6628 8.96563 17.8695 13.9993 17.8695C19.0611 17.8695 23.3327 18.692 23.3327 21.8653C23.3327 25.0399 19.0331 25.8332 13.9993 25.8332Z'
                    fill='#FF7971'
                  />
                </svg>
              ) : (
                <svg
                  width='28'
                  height='29'
                  viewBox='0 0 28 29'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M20.1757 8.67485C20.1757 12.1014 17.4283 14.8489 13.9994 14.8489C10.5716 14.8489 7.82308 12.1014 7.82308 8.67485C7.82308 5.24831 10.5716 2.50195 13.9994 2.50195C17.4283 2.50195 20.1757 5.24831 20.1757 8.67485ZM13.9993 25.8352C8.93879 25.8352 4.66602 25.0127 4.66602 21.8393C4.66602 18.6648 8.96563 17.8714 13.9993 17.8714C19.0611 17.8714 23.3327 18.6939 23.3327 21.8673C23.3327 25.0418 19.0331 25.8352 13.9993 25.8352Z'
                    fill='#A8A8A8'
                  />
                </svg>
              )}
              <Input
                name='recruitment'
                width='320px'
                placeholder='마감 인원 수'
                defaultValue={getData.recruitment}
                onChange={(e) => {
                  e.preventDefault();
                  if (e.target.value) setToggleLimit(true);
                  else setToggleLimit(false);
                }}
              ></Input>
            </Button>
            <Button height={'74.67px'}>
              {toggleMeetingLocation ? (
                <svg
                  width='28'
                  height='29'
                  viewBox='0 0 28 29'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M14.7892 24.725C16.6198 22.6526 21 17.1154 21 11.5781C21 9.24479 19.25 4.57812 14 4.57812C8.75 4.57812 7 9.24479 7 11.5781C7 17.1154 11.3802 22.6526 13.2108 24.725C13.6373 25.2079 14.3627 25.2079 14.7892 24.725ZM14 13.9113C15.2887 13.9113 16.3333 12.8666 16.3333 11.578C16.3333 10.2893 15.2887 9.24463 14 9.24463C12.7113 9.24463 11.6667 10.2893 11.6667 11.578C11.6667 12.8666 12.7113 13.9113 14 13.9113Z'
                    fill='#FF7971'
                  />
                </svg>
              ) : (
                <svg
                  width='28'
                  height='29'
                  viewBox='0 0 28 29'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M14.7892 24.727C16.6198 22.6546 21 17.1173 21 11.5801C21 9.24675 19.25 4.58008 14 4.58008C8.75 4.58008 7 9.24675 7 11.5801C7 17.1173 11.3802 22.6546 13.2108 24.727C13.6373 25.2099 14.3627 25.2099 14.7892 24.727ZM14 13.9132C15.2887 13.9132 16.3333 12.8686 16.3333 11.5799C16.3333 10.2913 15.2887 9.24658 14 9.24658C12.7113 9.24658 11.6667 10.2913 11.6667 11.5799C11.6667 12.8686 12.7113 13.9132 14 13.9132Z'
                    fill='#A8A8A8'
                  />
                </svg>
              )}

              <Input
                name='meetingLocation'
                width='320px'
                placeholder='만날 장소'
                defaultValue={getData.meetingLocation}
                onChange={(e) => {
                  e.preventDefault();
                  if (e.target.value) setToggleMeetingLocation(true);
                  else setToggleMeetingLocation(false);
                }}
              ></Input>
            </Button>
            <Button height={`${74.67 + 34.33 * deliveryFeeCount}px`}>
              <svg
                width='28'
                height='29'
                viewBox='0 0 28 29'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M21.0003 15.9552H18.6542L17.8142 19.0107C17.7409 19.2839 17.579 19.5251 17.354 19.6965C17.1289 19.868 16.8534 19.9599 16.5705 19.958H16.5693C15.9813 19.958 15.482 19.5765 15.3268 19.0107L14.0003 14.1947L12.675 19.0107C12.6017 19.2839 12.4399 19.5251 12.2148 19.6965C11.9898 19.868 11.7142 19.9599 11.4313 19.958C10.8433 19.958 10.344 19.5777 10.1877 19.0118L9.34649 15.9552H7.00033C6.72185 15.9552 6.45478 15.8445 6.25786 15.6476C6.06095 15.4507 5.95033 15.1836 5.95033 14.9052C5.95033 14.6267 6.06095 14.3596 6.25786 14.1627C6.45478 13.9658 6.72185 13.8552 7.00033 13.8552H8.76899L8.03283 11.1812C7.99211 11.047 7.97868 10.906 7.99333 10.7666C8.00797 10.6271 8.0504 10.492 8.11811 10.3692C8.18581 10.2465 8.27742 10.1385 8.38754 10.0517C8.49765 9.96486 8.62404 9.90099 8.75923 9.86382C8.89443 9.82665 9.03571 9.81693 9.17472 9.83525C9.31373 9.85356 9.44767 9.89953 9.56863 9.97045C9.68959 10.0414 9.79512 10.1358 9.879 10.2481C9.96287 10.3605 10.0234 10.4885 10.057 10.6247L11.4313 15.6157L12.7567 10.8008C12.8296 10.5273 12.9913 10.2857 13.2164 10.114C13.4415 9.94232 13.7172 9.85028 14.0003 9.85233C14.5883 9.85233 15.0888 10.2338 15.244 10.8008L16.5705 15.6157L17.9437 10.6247C17.9802 10.4917 18.0426 10.3672 18.1272 10.2583C18.2119 10.1494 18.3171 10.0583 18.437 9.99009C18.5569 9.9219 18.689 9.87798 18.8259 9.86085C18.9627 9.84371 19.1016 9.8537 19.2346 9.89024C19.3676 9.92678 19.492 9.98916 19.6009 10.0738C19.7098 10.1585 19.8009 10.2637 19.8691 10.3836C19.9373 10.5035 19.9813 10.6356 19.9984 10.7724C20.0155 10.9093 20.0055 11.0482 19.969 11.1812L19.2317 13.8552H21.0003C21.2788 13.8552 21.5459 13.9658 21.7428 14.1627C21.9397 14.3596 22.0503 14.6267 22.0503 14.9052C22.0503 15.1836 21.9397 15.4507 21.7428 15.6476C21.5459 15.8445 21.2788 15.9552 21.0003 15.9552ZM14.0003 1.66699C6.91283 1.66699 1.16699 7.41283 1.16699 14.5003C1.16699 21.589 6.91283 27.3337 14.0003 27.3337C21.0878 27.3337 26.8337 21.589 26.8337 14.5003C26.8337 7.41283 21.0878 1.66699 14.0003 1.66699Z'
                  fill='#FF7971'
                />
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[...Array(deliveryFeeCount + 1).keys()].map((count) => {
                  return (
                    <div key={count}>
                      <Input
                        name={`deliveryFeeHeader${count}`}
                        width='58px'
                        placeholder='얼마'
                        defaultValue={getData.deliveryFees[count]?.minAmount}
                        onChange={(e) => deliveryFeeChange(e, count)}
                      ></Input>
                      <FontMd>이상 주문 시 배달비</FontMd>
                      <Input
                        name={`deliveryFeeFooter${count}`}
                        width='58px'
                        placeholder='얼마'
                        defaultValue={getData.deliveryFees[count]?.fee}
                        onChange={(e) => deliveryFeeChange(e, count)}
                      ></Input>
                    </div>
                  );
                })}
              </div>
            </Button>
            <Button height={`${74.67 + 34.33 * deliveryDiscountCount}px`}>
              <svg
                width='28'
                height='29'
                viewBox='0 0 28 29'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M23.7997 11.0033L24.64 11.8433C25.3052 12.4966 25.667 13.3833 25.667 14.3166C25.6787 15.2499 25.3169 16.1378 24.6633 16.8016C24.6556 16.8102 24.6478 16.8177 24.64 16.8252C24.6361 16.8289 24.6322 16.8327 24.6283 16.8366L23.7997 17.6649C23.4729 17.9916 23.2862 18.4349 23.2862 18.9028V20.1033C23.2862 22.0399 21.7106 23.6161 19.7732 23.6161H18.5711C18.1043 23.6161 17.6608 23.8016 17.334 24.1283L16.4937 24.9683C15.8051 25.6578 14.9065 25.9949 14.0078 25.9949C13.1092 25.9949 12.2105 25.6578 11.5219 24.9811L10.6699 24.1283C10.3432 23.8016 9.89966 23.6161 9.43283 23.6161H8.23072C6.29336 23.6161 4.71778 22.0399 4.71778 20.1033V18.9028C4.71778 18.4349 4.53105 17.9916 4.20426 17.6533L3.36396 16.8249C1.99846 15.4611 1.98679 13.2316 3.35229 11.8561L4.20426 11.0033C4.53105 10.6766 4.71778 10.2333 4.71778 9.75493V8.56493C4.71778 6.62827 6.29336 5.05443 8.23072 5.05443H9.43283C9.89966 5.05443 10.3432 4.8666 10.6699 4.53993L11.5102 3.69993C12.8757 2.32443 15.1049 2.32443 16.482 3.68943L17.334 4.53993C17.6608 4.8666 18.1043 5.05443 18.5711 5.05443H19.7732C21.7106 5.05443 23.2862 6.62827 23.2862 8.56493V9.76777C23.2862 10.2333 23.4729 10.6766 23.7997 11.0033ZM10.9962 18.3524C11.2763 18.3524 11.533 18.2474 11.7198 18.049L17.7186 12.0535C18.1154 11.6569 18.1154 11.0024 17.7186 10.6057C17.3218 10.2102 16.6799 10.2102 16.2831 10.6057L10.2843 16.6024C9.88745 16.999 9.88745 17.6524 10.2843 18.049C10.471 18.2474 10.7278 18.3524 10.9962 18.3524ZM15.9795 17.326C15.9795 17.8977 16.4347 18.3527 17.0065 18.3527C17.5667 18.3527 18.0219 17.8977 18.0219 17.326C18.0219 16.7672 17.5667 16.311 17.0065 16.311C16.4347 16.311 15.9795 16.7672 15.9795 17.326ZM11.0082 10.3153C11.5684 10.3153 12.0235 10.7703 12.0235 11.3303C12.0235 11.9031 11.5684 12.3569 11.0082 12.3569C10.448 12.3569 9.98112 11.9031 9.98112 11.3303C9.98112 10.7703 10.448 10.3153 11.0082 10.3153Z'
                  fill='#FF7971'
                />
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[...Array(deliveryDiscountCount + 1).keys()].map((count) => {
                  return (
                    <div key={count}>
                      <Input
                        name={`deliveryDiscountsHeader${count}`}
                        width='58px'
                        placeholder='얼마'
                        defaultValue={
                          getData.deliveryDiscounts[count]?.minAmount
                        }
                        onChange={(e) => deliveryDiscountsChange(e, count)}
                      ></Input>
                      <FontMd>이상 주문 시</FontMd>
                      <Input
                        name={`deliveryDiscountsFooter${count}`}
                        width='58px'
                        placeholder='얼마'
                        defaultValue={
                          getData.deliveryDiscounts[count]?.discount
                        }
                        onChange={(e) => deliveryDiscountsChange(e, count)}
                      ></Input>
                      <FontMd>할인</FontMd>
                    </div>
                  );
                })}
              </div>
            </Button>
          </div>

          <div>
            <ButtonBg
              type='submit'
              backgroundColor={COLOR.POTZ_PINK_DEFAULT}
              hoverColor={COLOR.POTZ_PINK_600}
              fontColor={COLOR.WHITE}
            >
              수정하기
            </ButtonBg>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePost;
