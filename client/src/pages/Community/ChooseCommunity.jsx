import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLOR from '../../utility/Color';
import CommunityComp from '../../components/community/Community';
import MakeCommunity from './MakeCommunity';
import { useAuth } from '../../contexts/AuthContext';

function ChooseCommunity() {
  const navigate = useNavigate();
  const location = useLocation();
  const { latLon } = location.state;
  const [communityDatas, setCommunityDatas] = useState([]);
  const latitude = latLon.lat;
  const longitude = latLon.lng;
  const { user } = useAuth();

  useEffect(() => {
    async function fetchCommunityData() {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_APP_API_URL
          }/communities/search?latitude=${latitude}&longitude=${longitude}`,
          { credentials: 'include' }
        );
        const data = await response.json();
        setCommunityDatas(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCommunityData();
  }, [latitude, longitude]);

  return (
    <div className='potz_container' style={backgroundStyle}>
      {communityDatas && communityDatas.length < 1 ? (
        <MakeCommunity />
      ) : (
        <div style={contentsStyle}>
          <div style={fontStyle}>
            <span>{user.name}님 근처에</span>
            <br />
            {communityDatas.length > 0 ? (
              <span style={fontStyle3}>{communityDatas.length}</span>
            ) : null}

            <span>개의 배달 공동체가 있네요.</span>
            <br />
            <span style={fontStyle2}>
              원하는 공동체에서 배달비를 나누어 보세요.
            </span>
          </div>

          <div>
            {communityDatas.length > 0
              ? communityDatas.map((communityData) => {
                  return (
                    <CommunityComp
                      communityData={communityData}
                      key={communityData.id}
                    />
                  );
                })
              : null}
          </div>

          <ButtonNew
            onClick={() =>
              navigate('/community/types', {
                state: { latLon: latLon },
              })
            }
          >
            직접 공동체 만들기
          </ButtonNew>
        </div>
      )}
    </div>
  );
}

const ButtonNew = styled.button`
  border: none;
  background-color: ${COLOR.POTZ_PINK_100};
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  color: ${COLOR.GRAY_400};
  &:hover {
    color: ${COLOR.GRAY_500};
  }
`;

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
  fontSize: '24px',
  fontWeight: '700',
  color: COLOR.GRAY_500,
};

const fontStyle2 = {
  fontSize: '16px',
  fontWeight: '300',
  margin: '0',
  padding: '0',
  color: COLOR.GRAY_400,
};

const fontStyle3 = {
  color: COLOR.POTZ_PINK_DEFAULT,
};

export default ChooseCommunity;
