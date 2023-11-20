import '../../App.css';
import COLOR from '../../utility/Color';
import ButtonBg from '../../components/ButtonBG';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingPage from '../LoadingPage';
import { useEffect } from 'react';

const style1 = {
  display: 'inline-flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '100%',
};

const style3 = {
  display: 'flex',
  flexDirection: 'column',
  gap: '13px',
};

function LinkSample() {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className='contents_container' style={style1}>
      <div>
        <div>{user.name}님 안녕하세요</div>
        <div>email : {user.email}</div>
      </div>
      <ul>
        <li>
          <Link to='/home'>home</Link>
        </li>
        <li>
          <Link to='/find-community'>공동체 찾기</Link>
        </li>
        <li>
          <Link to='/create-community'>공동체 만들기</Link>
        </li>
        <li>
          <Link to='/search'>검색</Link>
        </li>
        <li>
          <Link to='/create-post'>글 쓰기</Link>
        </li>
        <li>
          <Link to='/chatrooms'>chat rooms</Link>
        </li>
      </ul>

      <div className='btn_container' style={style3}>
        <div onClick={() => logout()}>
          <ButtonBg
            backgroundColor={COLOR.POTZ_PINK_200}
            hoverColor={COLOR.POTZ_PINK_300}
            fontColor={COLOR.BLACK}
          >
            logout
          </ButtonBg>
        </div>
      </div>
    </div>
  );
}

export default LinkSample;
