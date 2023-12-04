import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLOR from '../utility/Color';
import TagPlaceSM from './TagPlaceSM';
import HomeAlert from './homeAlertModal';
import HomeDiscountModal from './homeDiscountModal';
const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

const HomeContents = ({ postDatas, setPostDatas }) => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [contentPostId, setContentPostId] = useState();
  const [discountPostId, setDiscountPostId] = useState();

  const navigate = useNavigate();

  const handleLikeToggle = async (postId) => {
    try {
      // 서버로 좋아요 데이터 업데이트
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/posts/${postId}/like`,
          {
            method: 'PATCH',
            credentials: 'include',
          }
        );
        const data = await response.json();
        console.log('좋아요 업데이트', data);

        // update post state
        setPostDatas((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, liked: data.liked } : post
          )
        );

        alert('찜 목록을 수정했어요.😋');
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={homeContentesContainer}>
      {postDatas.map((post) => {
        return (
          <HomeContentsWrapper
            key={post.id}
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            <div>
              <div style={tagStyle}>
                <TagPlaceSM>{post.category}</TagPlaceSM>
              </div>
              <img
                width={112}
                height={112}
                style={imgStyle}
                src={
                  post.imageUrl
                    ? `${import.meta.env.VITE_APP_API_URL}/images/${
                        post.imageUrl
                      }`
                    : `${PF}Logo/Potz_Logo.png`
                }
              />
            </div>
            <div style={fontWrapper}>
              <div style={fontContainer}>
                <div style={textOverflow}>
                  <span style={fontStyle1}>{post.storeName}</span>
                </div>
                <div style={fontStyle2}>
                  <span style={coloredfont}>
                    {post.deliveryFeePerPerson ? (
                      <span>
                        {new Intl.NumberFormat('ko-kr').format(
                          post.deliveryFeePerPerson
                        )}
                      </span>
                    ) : (
                      <span>무료</span>
                    )}
                  </span>
                  {post.deliveryFeePerPerson ? (
                    <span>원씩 배달</span>
                  ) : (
                    <span>배달</span>
                  )}
                </div>
                <div style={fontStyle3}>
                  {post.orderLink ? (
                    <a style={linkStyle} href={post.orderLink}>
                      <span>배달 앱 링크 바로가기</span>
                    </a>
                  ) : null}
                </div>
              </div>
              <div style={fontstyle4}>
                <div>
                  <span>{post.participantsCount}</span>
                  <span>/</span>
                  <span>{post.recruitment}</span>
                  <span>명</span>
                </div>
                <div>
                  <span>{post.meetingLocation}</span>
                </div>
              </div>
            </div>

            <div style={buttonContainer}>
              <ButtonContainer
                onClick={(e) => {
                  e.stopPropagation();
                  handleLikeToggle(post.id);
                }}
              >
                <HeartIcon fill={post.liked && COLOR.POTZ_PINK_DEFAULT} />
              </ButtonContainer>

              <ButtonContainer
                onClick={(event) => {
                  event.stopPropagation();
                  setVisible2(!visible2);
                  setDiscountPostId(post.id);
                }}
              >
                <SaleIcon />
              </ButtonContainer>

              {/* 우선은 2회 이상 만든 사람에게 왕관 붙여줌 */}
              <ButtonContainer
                onClick={(event) => {
                  event.stopPropagation();
                  console.log('ButtonContainer clicked', !visible);
                  console.log('방장 경력');
                  setContentPostId(post.id);
                  setVisible(!visible);
                }}
              >
                {post.potMasterHistoryCount >= 1 ? <CrownIcon /> : null}
              </ButtonContainer>
            </div>
          </HomeContentsWrapper>
        );
      })}

      {visible ? (
        <HomeAlert
          setVisible={setVisible}
          potMasterHistoryCount={
            postDatas.find((post) => post.id === contentPostId)
              ?.potMasterHistoryCount
          }
        />
      ) : null}

      {visible2 ? (
        <HomeDiscountModal
          setVisible2={setVisible2}
          discountInfo={
            postDatas.find((post) => post.id === discountPostId)
              ?.nextDiscountInfos
          }
          totalOrderPrice={
            postDatas.find((post) => post.id === discountPostId)
              ?.totalOrderPrice
          }
          nextDeliveryFeeInfo={
            postDatas.find((post) => post.id === discountPostId)
              ?.nextDeliveryFeeInfo
          }
        />
      ) : null}
    </div>
  );
};

const HomeContentsWrapper = styled.div`
  height: 150px;
  border: 1px solid ${COLOR.GRAY_100};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: grab;
  background: ${COLOR.WHITE};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    backgound-color: ${COLOR.POTZ_PINK_100};
  }
`;

const ButtonContainer = styled.button`
  display: flex;
  width: 36px;
  height: 36px;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: ${COLOR.WHITE};
  cursor: grab;
  transition: all 0.6s ease;
  &:hover {
    svg path {
      transform: scale(1.1);
    }
  }
`;

const HeartIcon = ({ fill }) => {
  return (
    <svg
      width='28'
      height='28'
      viewBox='0 0 28 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.7213 25.1148C13.4983 25.6281 14.5005 25.6281 15.2763 25.1148C17.7438 23.4861 23.1163 19.593 25.431 15.2366C28.4818 9.48965 24.899 3.75781 20.1623 3.75781C17.4626 3.75781 15.8386 5.16831 14.9403 6.38048C14.8324 6.52894 14.6909 6.64976 14.5274 6.73307C14.3638 6.81638 14.1829 6.85981 13.9994 6.85981C13.8158 6.85981 13.6349 6.81638 13.4714 6.73307C13.3079 6.64976 13.1664 6.52894 13.0585 6.38048C12.1601 5.16831 10.5361 3.75781 7.83646 3.75781C3.09979 3.75781 -0.483041 9.48965 2.56896 15.2366C4.88129 19.593 10.2561 23.4861 12.7213 25.1148'
        fill={fill || '#EDEDED'}
      />
    </svg>
  );
};

const SaleIcon = () => {
  return (
    <svg
      width='28'
      height='28'
      viewBox='0 0 28 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M23.7987 10.6703L24.639 11.5103C25.3043 12.1636 25.6661 13.0503 25.6661 13.9836C25.6777 14.9169 25.3159 15.8048 24.6624 16.4686C24.6546 16.4771 24.6468 16.4847 24.639 16.4922C24.6351 16.4959 24.6313 16.4997 24.6274 16.5036L23.7987 17.3319C23.4719 17.6586 23.2852 18.1019 23.2852 18.5698V19.7703C23.2852 21.7069 21.7096 23.2831 19.7723 23.2831H18.5702C18.1033 23.2831 17.6598 23.4686 17.333 23.7953L16.4927 24.6353C15.8042 25.3248 14.9055 25.6619 14.0068 25.6619C13.1082 25.6619 12.2095 25.3248 11.5209 24.6481L10.669 23.7953C10.3422 23.4686 9.89869 23.2831 9.43185 23.2831H8.22975C6.29238 23.2831 4.71681 21.7069 4.71681 19.7703V18.5698C4.71681 18.1019 4.53007 17.6586 4.20329 17.3203L3.36298 16.4919C1.99749 15.1281 1.98582 12.8986 3.35131 11.5231L4.20329 10.6703C4.53007 10.3436 4.71681 9.90026 4.71681 9.42193V8.23193C4.71681 6.29526 6.29238 4.72143 8.22975 4.72143H9.43185C9.89869 4.72143 10.3422 4.53359 10.669 4.20693L11.5093 3.36693C12.8748 1.99143 15.1039 1.99143 16.4811 3.35643L17.333 4.20693C17.6598 4.53359 18.1033 4.72143 18.5702 4.72143H19.7723C21.7096 4.72143 23.2852 6.29526 23.2852 8.23193V9.43476C23.2852 9.90026 23.4719 10.3436 23.7987 10.6703ZM10.9959 18.0194C11.276 18.0194 11.5327 17.9144 11.7195 17.716L17.7183 11.7205C18.1151 11.3239 18.1151 10.6694 17.7183 10.2727C17.3215 9.8772 16.6796 9.8772 16.2828 10.2727L10.2839 16.2694C9.88713 16.666 9.88713 17.3194 10.2839 17.716C10.4707 17.9144 10.7274 18.0194 10.9959 18.0194ZM15.9792 16.993C15.9792 17.5647 16.4343 18.0197 17.0062 18.0197C17.5664 18.0197 18.0216 17.5647 18.0216 16.993C18.0216 16.4342 17.5664 15.978 17.0062 15.978C16.4343 15.978 15.9792 16.4342 15.9792 16.993ZM11.0072 9.98226C11.5674 9.98226 12.0226 10.4373 12.0226 10.9973C12.0226 11.5701 11.5674 12.0239 11.0072 12.0239C10.447 12.0239 9.98014 11.5701 9.98014 10.9973C9.98014 10.4373 10.447 9.98226 11.0072 9.98226Z'
        fill='#FFCECB'
      />
    </svg>
  );
};
const CrownIcon = () => {
  return (
    <svg
      width='28'
      height='28'
      viewBox='0 0 28 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4.88999 22.0452C4.88999 22.3547 5.01291 22.6514 5.2317 22.8702C5.45049 23.089 5.74724 23.2119 6.05666 23.2119H21.9432C22.2526 23.2119 22.5493 23.089 22.7681 22.8702C22.9869 22.6514 23.1098 22.3547 23.1098 22.0452V20.5869H4.88999V22.0452ZM23.2883 13.4749C20.7387 14.7928 17.6052 13.9637 16.0409 11.5573L15.0237 9.9924C14.9128 9.8217 14.761 9.68142 14.5821 9.58431C14.4032 9.4872 14.2029 9.43633 13.9993 9.43633C13.7958 9.43633 13.5954 9.4872 13.4166 9.58431C13.2377 9.68142 13.0859 9.8217 12.975 9.9924L11.9577 11.5573C10.3934 13.9637 7.25998 14.7928 4.71032 13.4749C4.50564 13.3693 4.27529 13.3236 4.04579 13.3432C3.8163 13.3627 3.597 13.4467 3.41314 13.5855C3.22929 13.7242 3.08837 13.9121 3.00661 14.1274C2.92484 14.3427 2.90556 14.5768 2.95099 14.8026L4.88999 20.5869H23.1098L25.0477 14.8026C25.2518 13.7969 24.1995 13.0036 23.2883 13.4749ZM13.9993 8.4524C14.4851 8.4524 14.951 8.25942 15.2945 7.91591C15.638 7.57241 15.831 7.10652 15.831 6.62073C15.831 6.13494 15.638 5.66905 15.2945 5.32555C14.951 4.98204 14.4851 4.78906 13.9993 4.78906C13.5135 4.78906 13.0476 4.98204 12.7041 5.32555C12.3606 5.66905 12.1677 6.13494 12.1677 6.62073C12.1677 7.10652 12.3606 7.57241 12.7041 7.91591C13.0476 8.25942 13.5135 8.4524 13.9993 8.4524ZM26.1677 9.43706C25.6819 9.43706 25.216 9.63004 24.8725 9.97355C24.529 10.317 24.336 10.7829 24.336 11.2687C24.336 11.7545 24.529 12.2204 24.8725 12.5639C25.216 12.9074 25.6819 13.1004 26.1677 13.1004C26.6534 13.1004 27.1193 12.9074 27.4628 12.5639C27.8063 12.2204 27.9993 11.7545 27.9993 11.2687C27.9993 10.7829 27.8063 10.317 27.4628 9.97355C27.1193 9.63004 26.6534 9.43706 26.1677 9.43706ZM3.66382 11.2687C3.66382 10.7829 3.47084 10.317 3.12734 9.97355C2.78383 9.63004 2.31794 9.43706 1.83215 9.43706C1.34637 9.43706 0.880475 9.63004 0.536971 9.97355C0.193467 10.317 0.000488281 10.7829 0.000488281 11.2687C0.000488281 11.7545 0.193467 12.2204 0.536971 12.5639C0.880475 12.9074 1.34637 13.1004 1.83215 13.1004C2.31794 13.1004 2.78383 12.9074 3.12734 12.5639C3.47084 12.2204 3.66382 11.7545 3.66382 11.2687Z'
        fill='#FFB571'
      />
    </svg>
  );
};

const textOverflow = {
  width: '124px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const imgStyle = {
  marginLeft: '28px',
  borderRadius: '12px',
};

const fontWrapper = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '112px',
};

const fontStyle1 = {
  fontSize: '14px',
  fontWeight: '700',
};

const fontStyle2 = {
  fontSize: '18px',
  fontWeight: '800',
};

const fontStyle3 = {
  fontSize: '14px',
  fontWeight: '400',
  textDecoration: 'underline',
};

const fontstyle4 = {
  display: 'flex',
  fontSize: '14px',
  fontWeight: '400',
  gap: '8px',
};

const fontContainer = {
  color: COLOR.GRAY_500,
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const coloredfont = {
  color: COLOR.POTZ_PINK_DEFAULT,
  marginRight: '4px',
};

const buttonContainer = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '120px',
  marginRight: '28px',
};

const tagStyle = {
  position: 'relative',
  top: '28px',
  left: '36px',
};

const homeContentesContainer = {
  marginBottom: '50px',
};

const linkStyle = {
  color: COLOR.GRAY_300,
};

export default HomeContents;
