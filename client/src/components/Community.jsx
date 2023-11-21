import styled from 'styled-components';
import Font from '../utility/Font';
import COLOR from '../utility/Color';
import { useNavigate } from 'react-router-dom';

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

const CommunityComp = (props) => {
  let navigate = useNavigate();
  let { communityData } = props;

  const imgStyle = {
    marginLeft: '28px',
    borderRadius: '8px',
  };
  const style1 = {
    height: '92px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    fontFamily: Font.FontKor,
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

  return (
    <CommunityWrapper
      onClick={() => {
        navigate('/home', {
          state: {
            communityDataID: communityData.id,
          },
        });
      }}
    >
      <div>
        <img
          style={imgStyle}
          width={92}
          height={92}
          src={'http://localhost:5000/' + communityData.imageUrl}
        ></img>
      </div>
      <div style={style1}>
        <span style={fontStyle1}>{communityData.name}</span>
        <div style={fontStyle2}>
          <div>
            <span>멤버수</span>
            <span style={fontBold}>{communityData.membersCount}</span>
          </div>
          <div>
            <span>글 수</span>
            <span style={fontBold}>{communityData.post_count}</span>
          </div>
        </div>
        <div style={style2}>
          {/* {communityData.communityTypes.map((type, index) => {
            return <TagPlaceSM key={index}>{type}</TagPlaceSM>;
          })} */}
        </div>
      </div>
    </CommunityWrapper>
  );
};

export default CommunityComp;
