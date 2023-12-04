import styled from 'styled-components';
import COLOR from '../../utility/Color';
import TagPlaceSM from '../TagPlaceSM';
import logoImg from '../../../public/images/Logo/Potz_Logo.png';
import { useNavigate } from 'react-router-dom';

const CategoryListComp = ({ postData }) => {
  const navigate = useNavigate();

  return (
    <LikedCompWrapper onClick={() => navigate(`/posts/${postData.id}`)}>
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
          src={
            postData.imageUrl
              ? `http://localhost:5000/images/${postData.imageUrl}`
              : logoImg
          }
        />
      </div>
      <div>
        <div style={textOverflow}>
          <span style={fontStyle1}>{postData.storeName}</span>
        </div>
        <div style={fontStyle3}>
          <div>
            <span>{postData.participantsCount}</span>
            <span>/</span>
            <span>{postData.recruitment} 명</span>
          </div>
          <div>
            <span>{postData.meetingLocation}</span>
          </div>
        </div>
        <div style={fontStyle2}>
          <span style={coloredfont}>
            {postData.appliedDeliveryFeeInfo ? (
              <span>
                {' '}
                {new Intl.NumberFormat('ko-kr').format(
                  postData.deliveryFeePerPerson
                )}{' '}
              </span>
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

const LikedCompWrapper = styled.div`
  height: 100%;
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  cursor: grab;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.04);
  }
`;
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
const imgStyle = {
  display: 'flex',
  marginBottom: '4px',
  borderRadius: '12px',
};

export default CategoryListComp;
