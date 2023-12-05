import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthorizeUser() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/users/user-info`,
          { credentials: 'include' }
        );
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
          navigate('/community/find');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div>
      <div></div>
    </div>
  );
}

export default AuthorizeUser;
