import COLOR from '../../utility/Color';
import Font from '../../utility/Font';
import CommunityComp from '../../components/community/Community';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MakeCommunity from './MakeCommunity';

const ButtonNew = styled.button`
  border: none;
  background-color: ${COLOR.POTZ_PINK_100};
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  font-family: ${Font.FontKor};
  color: ${COLOR.GRAY_400};
  &:hover {
    color: ${COLOR.GRAY_500};
  }
`;

function ChooseCommunity() {
  let navigate = useNavigate();
  let location = useLocation();
  let { latLon } = location.state;
  let [communityDatas, setCommunityDatas] = useState();
  let latitude = latLon.lat;
  let longitude = latLon.lng;
  console.log(latLon);

  useEffect(() => {
    async function fetchCommunityData() {
      try {
        const response = await fetch(
          `http://localhost:5000/communities/search?latitude=${latitude}&longitude=${longitude}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        const data = await response.json();
        setCommunityDatas(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCommunityData();
  }, []);

  const backgroundStyle = {
    background: COLOR.POTZ_PINK_100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
  };

  const contentsStyle = {
    marginTop: '100px',
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
    height: '100vh',
  };

  const fontStyle = {
    marginLeft: '30px',
    fontFamily: Font.FontKor,
    fontSize: '24px',
    fontWeight: '700',
    color: COLOR.GRAY_500,
  };

  const fontStyle2 = {
    fontFamily: Font.FontKor,
    fontSize: '16px',
    fontWeight: '300',
    margin: '0',
    padding: '0',
    color: COLOR.GRAY_400,
  };

  const fontStyle3 = {
    color: COLOR.POTZ_PINK_DEFAULT,
  };

  return (
    <div className='potz_container' style={backgroundStyle}>
      {communityDatas && communityDatas.length < 1 ? (
        <MakeCommunity></MakeCommunity>
      ) : (
        <div style={contentsStyle}>
          <div style={fontStyle}>
            <span>수현님 근처에</span>
            <br></br>
            {communityDatas ? (
              <span style={fontStyle3}>{communityDatas.length}</span>
            ) : null}

            <span>개의 배달 공동체가 있네요.</span>
            <br></br>
            <span style={fontStyle2}>
              원하는 공동체에서 배달비를 나누어 보세요.
            </span>
          </div>
          <div>
            {communityDatas
              ? communityDatas.map((communityData) => {
                  return (
                    <CommunityComp
                      communityData={communityData}
                      key={communityData.id}
                    ></CommunityComp>
                  );
                })
              : null}
          </div>
          <ButtonNew
            onClick={() => {
              navigate('/community/types', {
                state: { latLon: latLon },
              });
            }}
          >
            직접 공동체 만들기
          </ButtonNew>
        </div>
      )}
    </div>
  );
}

export default ChooseCommunity;
