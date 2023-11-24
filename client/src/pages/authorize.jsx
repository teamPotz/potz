import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthorizeUser() {
  let navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/users/user-info', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (data[0].communities.length > 0) {
          console.log('검색 데이터', data[0].communities);
          let communities = data[0].communities;
          const sortedCommunities = communities.sort(
            (a, b) => new Date(b.joinedAt) - new Date(a.joinedAt)
          );

          console.log('정렬 데이터', sortedCommunities);
          console.log(
            '가장 최신에 가입한 커뮤니티',
            sortedCommunities[0].communityId
          );
          localStorage.setItem(
            'communityDataID',
            sortedCommunities[0].communityId
          );
          navigate(`/community/${sortedCommunities[0].communityId}`);
        } else {
          navigate('/find-community');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <div></div>
    </div>
  );
}

export default AuthorizeUser;
