import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLOR from '../../utility/Color';
import TagPlaceSM from '../TagPlaceSM';

const CommunityComp = ({ communityData }) => {
  const navigate = useNavigate();

  return (
    <CommunityWrapper
      onClick={() => {
        navigate('/community/enter', {
          state: {
            communityData: communityData,
          },
        });
      }}
    >
      <div>
        <img
          style={imgStyle}
          width={92}
          height={92}
          src={`${import.meta.env.VITE_APP_API_URL}/${communityData.imageUrl}`}
        />
      </div>
      <div style={style1}>
        <span style={fontStyle1}>{communityData.name}</span>
        <div style={fontStyle2}>
          <div>
            <span>멤버수</span>
            <span style={fontBold}>{communityData.memberCount}</span>
          </div>
          <div>
            <span>글 수</span>
            <span style={fontBold}>{communityData.postCount}</span>
          </div>
        </div>
        <div style={style2}>
          {communityData.communityTypes.split(',').map((type, index) => {
            return <TagPlaceSM key={index}>{type}</TagPlaceSM>;
          })}
        </div>
      </div>
    </CommunityWrapper>
  );
};

const imgStyle = {
  marginLeft: '28px',
  borderRadius: '8px',
};
const style1 = {
  height: '92px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
};
const style2 = {
  display: 'flex',
  gap: '9px',
};
const fontStyle1 = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '180px',
  height: '30px',
  fontSize: '18px',
  fontWeight: 700,
};
const fontStyle2 = {
  display: 'flex',
  gap: '16px',
  fontSize: '14px',
  fontWeight: '400',
  color: COLOR.GRAY_400,
};
const fontBold = {
  fontWeight: '500',
  color: COLOR.BLACK,
  marginLeft: '4px',
};

const CommunityWrapper = styled.div`
  cursor: grab;
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  gap: 36px;
  background: ${COLOR.WHITE};
  margin-bottom: 10px;
  &:hover {
    background: ${COLOR.POTZ_PINK_100};
  }
`;

export default CommunityComp;
