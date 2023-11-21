import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EnterCommunityModal from '../components/EnterCommunityModal';
import NavBarHomePage from '../components/NavBarHomePage';
import ButtonWrite from '../components/ButtonWrite';
import COLOR from '../utility/Color';
import NavBar from '../components/ui/NavBar';

function Entercommunity() {
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

  const potzContainerStyle = {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
  };

  const homeContentesContainer = {
    marginBottom: '50px',
  };

  const backgroundStyle = {
    backgroundColor: COLOR.POTZ_PINK_100,
  };

  return (
    <div className='potz_container' style={backgroundStyle}>
      <div style={potzContainerStyle}>
        <div style={homeContentesContainer}>
          <EnterCommunityModal></EnterCommunityModal>
        </div>
      </div>
    </div>
  );
}

export default Entercommunity;
