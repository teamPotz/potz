import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostDetail from '../../components/post/PostDetail';

function Detail() {
  const [postDatas, setPostDatas] = useState();
  const postID = useParams();

  useEffect(() => {
    if (postID.id !== null) {
      const fetchCommunityData = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_APP_API_URL}/posts/${postID.id}`,
            { credentials: 'include' }
          );
          const data = await response.json();
          // console.log('포스트 데이터', data);
          setPostDatas(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchCommunityData();
    }
  }, [postID]);

  return (
    <div className='potz_container'>
      {postDatas && <PostDetail postDatas={postDatas} />}
    </div>
  );
}

export default Detail;
