import '../App.css';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import COLOR from '../utility/Color';
import Font from '../utility/Font';
import ButtonBg from '../components/ButtonBG';
import HeartHandsImg from '../../public/images/graphicImg/heartHands.png';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

//contents_container 안에 UI 구현 하시면 됩니다!

const style1 = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '100%',
};
const styles2 = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
};
const style3 = {
  display: 'flex',
  flexDirection: 'column',
  gap: '13px',
};
const fontStyle = {
  fontFamily: Font.FontKor,
  fontSize: '24px',
  fontWeight: '700',
  margin: '0',
  padding: '0',
  color: COLOR.GRAY_500,
};
const fontStyle2 = {
  fontFamily: Font.FontKor,
  fontSize: '16px',
  fontWeight: '300',
  margin: '0',
  padding: '0',
  color: COLOR.GRAY_400,
};

function MakeCommunity() {
  const navigate = useNavigate();
  const { user, getUserInfo } = useAuth();

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className='side_container'></div>
        </Col>
        <Col className='col2'>
          <div className='potz_container'>
            <div className='contents_container' style={style1}>
              <div className='text_container' style={fontStyle}>
                <span>앗, {user?.name}님 근체에</span>
                <br></br>
                <span>아직 공동체가 없어요. 😅</span>
                <br></br>
                <span style={fontStyle2}>
                  이웃들과 함께 할 공동체를 만들어보세요!
                </span>
              </div>
              <div className='img_container' style={styles2}>
                <img style={styles2} width={300} src={HeartHandsImg} />
              </div>
              <div className='btn_container' style={style3}>
                <div
                  onClick={() => {
                    navigate('/community-types');
                  }}
                >
                  <ButtonBg
                    backgroundColor={COLOR.POTZ_PINK_DEFAULT}
                    hoverColor={COLOR.POTZ_PINK_600}
                    fontColor={COLOR.WHITE}
                  >
                    직접 공동체 만들기
                  </ButtonBg>
                </div>
                <ButtonBg
                  backgroundColor={COLOR.POTZ_PINK_200}
                  hoverColor={COLOR.POTZ_PINK_300}
                  fontColor={COLOR.POTZ_PINK_DEFAULT}
                >
                  다시 검색해 보기
                </ButtonBg>
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

export default MakeCommunity;
