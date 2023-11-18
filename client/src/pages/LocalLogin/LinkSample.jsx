import '../../App.css';
import { Container, Row, Col } from 'react-bootstrap';
import COLOR from '../../utility/Color';
import ButtonBg from '../../components/ButtonBG';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingPage from '../LoadingPage';

const style3 = {
  display: 'flex',
  flexDirection: 'column',
  gap: '13px',
};

const style1 = {
  display: 'inline-flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '100%',
};

function LinkSample() {
  const { user, logout } = useAuth();

  if (!user) {
    return <LoadingPage />;
  }

  return (
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className='side_container'></div>
        </Col>
        <Col className='col2'>
          <div className='potz_container'>
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
          </div>
        </Col>
        <Col className='col3'>
          <div className='side_container'></div>
        </Col>
      </Row>
    </Container>
  );
}

export default LinkSample;
