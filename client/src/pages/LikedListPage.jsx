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
          const response = await fetch('http://localhost:5000/posts/liked', {
            method: 'GET',
            credentials: 'include',
          });

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
            <span>찜한 배달팟</span>
            {postDatas ? (
              <span style={{ marginLeft: '4px' }}>{postDatas.length}</span>
            ) : null}
          </div>
          <span>카테고리별 보기</span>
          <span>편집</span>
        </div>
        <div style={homeContentesContainer}>
          {/* 찜 한 가게 데이터가 없는 경우 */}
          {postDatas && postDatas.length < 1 ? (
            <div
              style={{
                marginTop: '40px',
                fontFamily: Font.FontKor,
                fontWeight: '700',
                color: COLOR.POTZ_PINK_DEFAULT,
                display: 'flex',
                justifyContent: 'center',
                padding: '20px',
                background: COLOR.WHITE,
              }}
            >
              🍣 아직 찜 하신 가게가 없어요 🍣
            </div>
          ) : null}
          {/* 찜 한 가게 데이터가 있는 경우 */}
          {postDatas &&
            postDatas.map((postData, index) => {
              return <LikedComp key={index} postData={postData}></LikedComp>;
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
