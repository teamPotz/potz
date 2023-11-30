import styled from 'styled-components';
import Font from '../utility/Font';
import COLOR from '../utility/Color';
import TagPlaceSM from './TagPlaceSM';
import { useNavigate } from 'react-router-dom';

const LikedCompWrapper = styled.div`
  height: 100%;
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  cursor: grab;
  transition: all 0.3s ease;
  font-family: ${Font.FontKor};

  &:hover {
    transform: scale(1.04);
  }
`;

const ButtonContainer = styled.button`
  display: flex;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  background-color: ${COLOR.BLACK_OPACITY_200};
  cursor: grab;
  &:hover {
    background: ${COLOR.POTZ_PINK_100};
  }
`;

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

const CategoryListComp = (props) => {
  let navigate = useNavigate();

  let { postData } = props;

  const textOverflow = {
    width: '124px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const fontStyle1 = {
    width: '100%',
    height: '30px',
    fontSize: '16px',
    fontWeight: '700',
  };

  const fontStyle2 = {
    fontSize: '18px',
    fontWeight: '700',
    marginTop: '8px',
  };

  const fontStyle3 = {
    display: 'flex',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '400',
    color: COLOR.GRAY_300,
  };

  const coloredfont = {
    color: COLOR.POTZ_PINK_DEFAULT,
    marginRight: '4px',
  };

  const tagStyle = {
    position: 'relative',
    top: '34px',
    left: '16px',
  };

  const linkStyle = {
    position: 'relative',
    top: '156px',
    left: '52px',
    textDecoration: 'underline',
    color: COLOR.WHITE,
    background: 'none',
    fontWeight: '600',
    fontSize: '12px',
  };

  const likedStyle = {
    position: 'relative',
    top: '62px',
    left: '102px',
    textDecoration: 'underline',
    color: COLOR.WHITE,
    background: 'none',
    fontWeight: '600',
    fontSize: '12px',
  };

  const imgStyle = {
    display: 'flex',
    marginBottom: '4px',
    borderRadius: '12px',
  };

  return (
    <LikedCompWrapper
      onClick={() => {
        navigate(`/posts/${postData.id}`);
      }}
    >
      <div>
        <a style={linkStyle} href={postData.orderLink}>
          <span>배달앱 바로가기</span>
        </a>
        <div style={tagStyle}>
          <TagPlaceSM>{postData.category}</TagPlaceSM>
        </div>
        <img
          width={150}
          height={150}
          style={imgStyle}
          src={`http://localhost:5000/images/${postData.imageUrl}`}
        ></img>
      </div>
      <div>
        <div style={textOverflow}>
          <span style={fontStyle1}>{postData.storeName}</span>
        </div>
        <div style={fontStyle3}>
          <div>
            <span>{postData.recruitment}</span>
            <span>/</span>
            <span>{postData.participantsCount}</span>
            <span>명</span>
          </div>
          <div>
            <span>{postData.meetingLocation}</span>
          </div>
        </div>
        <div style={fontStyle2}>
          <span style={coloredfont}>
            {postData.appliedDeliveryFeeInfo ? (
              <span> {postData.deliveryFeePerPerson} </span>
            ) : (
              <span>무료</span>
            )}
          </span>
          {postData.participantsCount ? (
            <span>원씩 배달</span>
          ) : (
            <span>배달</span>
          )}
        </div>
      </div>
    </LikedCompWrapper>
  );
};

export default CategoryListComp;
