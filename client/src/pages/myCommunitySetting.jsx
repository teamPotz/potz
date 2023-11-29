import GoBack from '../components/goBack';
import COLOR from '../utility/Color';
import { useAuth } from '../contexts/AuthContext';
import CommunityComp from '../components/Community';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Font from '../utility/Font';

const EditBar = styled.div`
    margin-top: 70px;
    padding: 24px;
    padding-top: 12px;
    padding-bottom: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const FontSm = styled.span`
  font-family: ${Font.FontKor};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  color: ${props => props.color};
`;

const styles = {
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
};

//데이터 수정
const DataProcess = (communities) => {
  let arr = [];
  communities.map((community) => {
    arr.push(community.community);
  });
  return arr;
};
const correctTypes = (communities) => {
  communities.map((community) => {
    let types = [];
    community.communityTypes.map((type) => {
      types.push(type.communityType.name);
    });
    const str = types.join(', ');
    console.log(str);
    community.communityTypes = str;
  });
  console.log('수정한 커뮤니티 데이터', communities);
  return communities;
};

function MyCommunitySettings() {
  let [communityDatas, setCommunityDatas] = useState();

  useEffect(() => {
    async function fetchCommunityData() {
      try {
        const response = await fetch(
          `http://localhost:5000/users/user-communities-info`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        const data = await response.json();
        console.log('유저의 커뮤니티 데이터', data[0].communities);
        const array = correctTypes(DataProcess(data[0].communities));
        setCommunityDatas(array);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCommunityData();
  }, []);

  return (
    <div
      className='potz_container'
      style={{ backgroundColor: `${COLOR.POTZ_PINK_100}` }}
    >
      <GoBack text='내 공동체 관리' />
      <EditBar><FontSm>내 공동체 수 {communityDatas?.length}</FontSm><FontSm>편집</FontSm></EditBar>
      <div style={styles.contentContainer}>
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
    </div>
  );
}

export default MyCommunitySettings;
