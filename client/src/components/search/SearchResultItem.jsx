import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLOR from '../../utility/Color';
import TagPlaceSM from '../TagPlaceSM';
import logoImg from '../../../public/images/logo.png';

const SearchResultItem = ({ result }) => {
  const navigate = useNavigate();
  // console.log('홈 컨텐츠 데이터', result);

  //postDatas 배열에서 좋아요 데이터와 id 데이터만 따로 추출해서 배열로 관리
  const [likeStates, setLikeStates] = useState(
    result.map((res) => ({ liked: res.liked, id: res.id }))
  );

  //postId와 일치하는 likeState 찾기
  const findLikeStateByPostId = (postId) => {
    return likeStates.find((likeState) => likeState.id === postId);
  };

  const handleLikeToggle = async (postId) => {
    // console.log(postId);
    try {
      //서버로 좋아요 데이터 업데이트
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/posts${postId}/like`,
          {
            method: 'PATCH',
            credentials: 'include',
          }
        );
        const data = await response.json();
        // console.log('좋아요 업데이트', data);
        alert('찜 목록을 수정했어요.😋');
      } catch (error) {
        console.error(error);
      }

      //화면 출력
      setLikeStates((prevLikeStates) =>
        prevLikeStates.map((prevState) =>
          //클릭한 버튼이 속한 post의 Id가 postDatas의 post Id와 같을 경우에 liked 값을 이전 값과 반대로 토글함
          prevState.id === postId
            ? { ...prevState, liked: !prevState.liked }
            : prevState
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={homeContentesContainer}>
      {result.map((res) => {
        const likeState = findLikeStateByPostId(res.id);
        return (
          <SearchResultItemWrapper
            key={res.id}
            onClick={() => navigate(`/posts/${res.id}`)}
          >
            <div>
              <div style={tagStyle}>
                <TagPlaceSM>{res.category}</TagPlaceSM>
              </div>
              <img
                width={112}
                height={112}
                style={imgStyle}
                src={res.imageUrl || logoImg}
              />
            </div>
            <div style={fontWrapper}>
              <div style={fontContainer}>
                <div style={textOverflow}>
                  <span style={fontStyle1}>{res.storeName}</span>
                </div>
                <div style={fontStyle2}>
                  <span style={coloredfont}>
                    {res.deliveryFeePerPerson ? (
                      <span>{res.deliveryFeePerPerson}</span>
                    ) : (
                      <span>무료</span>
                    )}
                  </span>
                  {res.deliveryFeePerPerson ? (
                    <span>원씩 배달</span>
                  ) : (
                    <span>배달</span>
                  )}
                </div>
                <div style={fontStyle3}>
                  {res.orderLink ? (
                    <a style={linkStyle} href={res.orderLink}>
                      <span>배달 앱 링크 바로가기</span>
                    </a>
                  ) : null}
                </div>
              </div>
              <div style={fontstyle4}>
                <div>
                  <span>{res.participantsCount}</span>
                  <span>/</span>
                  <span>{res.recruitment}</span>
                  <span>명</span>
                </div>
                <div>
                  <span>{res.meetingLocation}</span>
                </div>
              </div>
            </div>
            <div style={buttonContainer}>
              <ButtonContainer
                onClick={(e) => {
                  e.stopPropagation();
                  handleLikeToggle(res.id);
                }}
              >
                {/* findLikeStateByPostId 함수로 찾은 postid와 같은 id를 가진 객체 */}
                {likeStates && likeState.liked ? (
                  <HeartIconClicked />
                ) : (
                  <HeartIcon />
                )}
              </ButtonContainer>
            </div>
          </SearchResultItemWrapper>
        );
      })}
    </div>
  );
};

const SearchResultItemWrapper = styled.div`
  height: 150px;
  border: 1px solid ${COLOR.GRAY_100};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: grab;
  background: ${COLOR.WHITE};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.04);
    border-color: ${COLOR.POTZ_PINK_100};
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
  &:hover {
    background: ${COLOR.POTZ_PINK_100};
  }
`;

const HeartIcon = () => {
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
        fill='#EDEDED'
      />
    </svg>
  );
};

const HeartIconClicked = () => {
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
        d='M12.7213 25.1148C13.4983 25.6281 14.5005 25.6281 15.2763 25.1148C17.7438 23.4861 23.1163 19.593 25.431 15.2366C28.4818 9.48965 24.899 3.75781 20.1623 3.75781C17.4626 3.75781 15.8386 5.16831 14.9403 6.38048C14.8324 6.52894 14.6909 6.64976 14.5274 6.73307C14.3638 6.81638 14.1829 6.85981 13.9994 6.85981C13.8158 6.85981 13.6349 6.81638 13.4714 6.73307C13.3079 6.64976 13.1664 6.52894 13.0585 6.38048C12.1601 5.16831 10.5361 3.75781 7.83646 3.75781C3.09979 3.75781 -0.483041 9.48965 2.56896 15.2366C4.88129 19.593 10.2561 23.4861 12.7213 25.1148Z'
        fill='#FF7971'
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

export default SearchResultItem;
