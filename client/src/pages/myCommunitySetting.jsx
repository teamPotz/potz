import GoBack from '../components/goBack';
import COLOR from '../utility/Color';
import CommunityComp from '../components/Community';
import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
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

const vibrationAnimation = keyframes`
  from {
    transform: rotate(0.5deg);
  }
  to {
    transform: rotate(-0.5deg);
  }
`;

const VibrationComp = styled.div`
  position: relative;
  & svg {
    display: ${(props) => (props.editBtn === '완료' ? '' : 'none')};
    position: absolute;
    top: 7px;
    right: 7px;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      trnasform: scale(1.18);
    }
  }
  animation: ${(props) =>
    props.editBtn === '완료'
      ? css`
          ${vibrationAnimation} 0.1s infinite
        `
      : 'none'};
`;

const FontSm = styled.span`
  font-family: ${Font.FontKor};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  transition: all 0.2s ease;
  color: ${(props) => props.color};
  ${(props) =>
    props.hover &&
    css`
      cursor: pointer;
      &:hover {
        transform: scale(1.18);
      }
    `}
`;

const styles = {
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
};

//데이터 수정
const DataProcess = (data) => {
  let types = [];
  data.communityTypes.map((type) => {
    types.push(type.name);
  });
  const str = types.join(', ');
  return str;
};

function MyCommunitySettings() {
  let [initialDatas, setInitialDatas] = useState();
  let [communityDatas, setCommunityDatas] = useState([]);
  let [editBtn, setEditBtn] = useState('편집');

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch('http://localhost:5000/users/user-info', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        setInitialDatas(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (initialDatas) {
      initialDatas[0].communities.map((community) => {
        async function fetchCommunityData() {
          try {
            const response = await fetch(
              `http://localhost:5000/communities/${community.communityId}`,
              {
                method: 'GET',
                credentials: 'include',
              }
            );
            const data = await response.json();
            console.log(data);
            data.communityTypes = DataProcess(data);
            setCommunityDatas((prev) => [...prev, data]);
          } catch (error) {
            console.error(error);
          }
        }
        fetchCommunityData();
      });
    }
  }, [initialDatas]);

  const deleteUserCommunity = async (communityId) => {
    try {
      const res = await fetch(
        'http://localhost:5000/users/user-community/delete',
        {
          method: 'PATCH',
          body: JSON.stringify({ communityId }),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();
      console.log('탈퇴할 커뮤니티 id', data);
      location.reload();
      alert('탈퇴가 완료되었습니다.');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className='potz_container'
      style={{ backgroundColor: `${COLOR.POTZ_PINK_100}` }}
    >
      <GoBack text='내 공동체 관리' />
      <EditBar>
        <FontSm>내 공동체 수 {communityDatas?.length}</FontSm>
        <FontSm
          onClick={() => setEditBtn(editBtn == '편집' ? '완료' : '편집')}
          hover={true}
        >
          {editBtn}
        </FontSm>
      </EditBar>
      <div style={styles.contentContainer}>
        {communityDatas
          ? communityDatas.map((communityData) => {
              return (
                <VibrationComp key={communityData.id} editBtn={editBtn}>
                  <svg
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(communityData.id);
                      deleteUserCommunity(communityData.id);
                    }}
                    width='29'
                    height='29'
                    viewBox='0 0 29 29'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M20 8.83203L8.33337 20.4987M8.33337 8.83203L20 20.4987'
                      stroke='black'
                      strokeWidth='2.33333'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <CommunityComp communityData={communityData}></CommunityComp>
                </VibrationComp>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default MyCommunitySettings;
