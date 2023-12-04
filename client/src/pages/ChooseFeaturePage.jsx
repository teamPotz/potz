import { useState, useEffect } from 'react';
import COLOR from '../utility/Color';
import TagPlace from '../components/TagPlace';
import PlacesImg from '../../public/images/graphicImg/Places.png';

function ChooseFeature() {
  const [communityTypes, setCommunityTypes] = useState([]);
  const [userDatas, setUserDatas] = useState();

  useEffect(() => {
    async function fetchCommunityTypes() {
      try {
        const response = await fetch('http://localhost:5000/communities/types');
        const data = await response.json();
        setCommunityTypes(data);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCommunityTypes();
  }, []);

  const style1 = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
  };
  const textBoxStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginTop: '28px',
  };
  const fontStyle = {
    fontSize: '24px',
    fontWeight: '700',
    margin: '0',
    padding: '0',
    color: COLOR.GRAY_500,
  };
  const TgaWrappers = {
    marginBottom: '80px',
  };
  const TagContainer = {
    display: 'grid',
    gridTemplateColumns: 'repeat( 3, minmax(100px, 1fr))',
    gap: '16px',
    marginBottom: '18px',
  };
  const imgStyle = {
    position: 'relative',
    bottom: '20px',
    right: '28px',
  };

  return (
    <div className='potz_container'>
      <div className='contents_container' style={style1}>
        <div style={textBoxStyle}>
          <div style={fontStyle}>
            <span>만드실 공동체의 특징을</span>
            <br></br>
            <span>하나 이상 선택해주세요.</span>
            <br></br>
          </div>
        </div>
        <div style={TgaWrappers}>
          <div style={TagContainer}>
            {communityTypes.map((communityType) => {
              return (
                <div key={communityType.id}>
                  <TagPlace userDatas={userDatas}>{communityType}</TagPlace>
                </div>
              );
            })}
          </div>
        </div>
        <div style={imgStyle}>
          <img src={PlacesImg} width={420}></img>
        </div>
      </div>
    </div>
  );
}

export default ChooseFeature;
