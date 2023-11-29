import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailContents from './detailContents';

function Detail() {
  const [postDatas, setPostDatas] = useState();
  const postID = useParams();

  console.log('포스트 아이디', postID);

  useEffect(() => {
    if (postID.id !== null) {
      const fetchCommunityData = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/posts/${postID.id}`,
            {
              method: 'GET',
              credentials: 'include',
            }
          );
          const data = await response.json();
          console.log('포스트 데이터', data);
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
      {postDatas ? console.log('포스트 데이터즈', postDatas) : null}
      {postDatas ? (
        <DetailContents postDatas={postDatas}></DetailContents>
      ) : null}
    </div>
  );
}

export default Detail;
