import { useState, useEffect } from 'react';
import LikedComp from '../components/LikedComp';
import COLOR from '../utility/Color';
import Font from '../utility/Font';
import NavBar from '../components/ui/NavBar';

function LikedList() {
  let communityId = localStorage.getItem('communityDataID');
  let [postDatas, setPostDatas] = useState();
  // 화면 너비 측정을 위한 state 변수 // 디폴트는 420px
  const [displayWidth, setdisplayWidth] = useState(window.innerWidth);
  useEffect(() => {
    const ReSizeHandler = () => {
      setdisplayWidth(window.innerWidth);
    };

    //윈도우 리사이즈가 일어나면 콜백 호출
    window.addEventListener('resize', ReSizeHandler);

    return () => {
      window.removeEventListener('resize', ReSizeHandler);
    };
  }, []);

  useEffect(() => {
    if (communityId !== null) {
      console.log('커뮤니티 아이디 num', communityId);
      const fetchCommunityData = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/posts/liked?communityId=${communityId}`,
            { credentials: 'include' }
          );

          const data = await response.json();
          console.log('좋아요한 post 데이터', data);
          setPostDatas(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchCommunityData();
    }
  }, [communityId]);

  //좋아요 취소한 게시글 state 업데이트
  const getDeletedData = (data) => {
    console.log('받아온 삭제 게시물 데이터', data);
    if (data) {
      //받아온 삭제 게시물 postDatas에서 찾기
      const foundPost = findLikeStateByPostId(data);
      console.log('찾은 포스트', foundPost);

      //받아온 삭제 게시물 postDatas에서 제거하기
      const updatedPostDatas = postDatas.filter(
        (postData) => postData.id !== data.postId
      );
      setPostDatas(updatedPostDatas);
    }
  };

  //받아온 삭제 게시물 postDatas에서 찾기
  const findLikeStateByPostId = (data) => {
    return postDatas.find((postData) => postData.id === data.postId);
  };

  const potzContainerStyle = {
    position: 'relative', // potz_container를 relative로 설정합니다.
    minHeight: '100vh', // 최소 높이를 화면 높이(100vh)로 설정합니다.
    width: '100%',
  };

  const navbarStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
    alignItems: 'end',
    position: 'fixed',
    bottom: 0,
    maxWidth: '420px',
    width: displayWidth ? displayWidth : '420px',
  };

  const TopNav = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '70px',
    boxShadow: '0px 1.16px 2.3px 0px rgba(0, 0, 0, 0.06)',
  };

  const homeContentesContainer = {
    marginLeft: '28px',
    display: 'grid',
    gridTemplateColumns: ' repeat( auto-fit, minmax(160px, 1fr))',
    marginBottom: '90px',
  };

  const backgroundStyle = {
    backgroundColor: COLOR.WHITE,
  };

  const fontStyle = {
    display: 'flex',
    gap: '16px',
    marginTop: '14px',
    marginLeft: '28px',
    fontFamily: Font.FontKor,
    fontSize: '14px',
    fontWeight: '700',
    color: COLOR.GRAY_400,
  };

  const alertStyle = {
    marginTop: '40px',
    fontFamily: Font.FontKor,
    fontWeight: '700',
    color: COLOR.POTZ_PINK_DEFAULT,
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
    background: COLOR.WHITE,
  };

  return (
    <div className='potz_container' style={backgroundStyle}>
      <div style={potzContainerStyle}>
        <nav style={TopNav}>
          <span
            style={{
              fontFamily: Font.FontKor,
              fontSize: '18px',
              fontWeight: '700',
              marginLeft: '28px',
            }}
          >
            찜해둔 배달팟
          </span>
        </nav>
        <div style={fontStyle}>
          <div>
            <span>찜한 배달팟이</span>
            {postDatas ? (
              <span style={{ marginLeft: '4px' }}>
                {postDatas.length}개 있어요!
              </span>
            ) : null}
          </div>
        </div>
        <div style={homeContentesContainer}>
          {/* 찜 한 가게 데이터가 없는 경우 */}
          {postDatas && postDatas.length < 1 ? (
            <div style={alertStyle}>🍣 아직 찜 하신 가게가 없어요 🍣</div>
          ) : null}
          {/* 찜 한 가게 데이터가 있는 경우 */}
          {postDatas &&
            postDatas.map((postData, index) => {
              return (
                <LikedComp
                  key={index}
                  getDeletedData={getDeletedData}
                  postData={postData}
                ></LikedComp>
              );
            })}
        </div>
        <div style={navbarStyle}>
          <NavBar />
        </div>
      </div>
    </div>
  );
}

export default LikedList;
