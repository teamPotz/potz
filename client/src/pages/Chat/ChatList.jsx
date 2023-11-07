import '../../App.css';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import COLOR from '../../utility/Color';
import Font from '../../utility/Font';
import { NavBar3 } from '../../components/NavBars';

//contents_container 안에 UI 구현 하시면 됩니다!

function ChatList() {
  const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 28px;
    width: 392px;
    height: 70px;
    box-shadow: 0px 1.16667px 2.33333px rgba(0, 0, 0, 0.08);
    background-color: ${COLOR.WHITE};
    position: fixed;
    top: 0;
    font-family: ${Font.FontKor};
    font-style: normal;
    font-weight: 700;
    font-size: 18.6667px;
    line-height: 150%;
    font-color: ${COLOR.BLACK};
  `;

  const Chat = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: 147px;
    background: ${COLOR.WHITE};
    border-radius: 9.33333px;
    box-sizing: border-box;
    gap: 16.33px;
  `;

  const Content1 = styled.div`
    margin-left: 28px;
    margin-top: 14px;
    width: 368.67px;
    height: 70px;
    display: flex;
    flex-direction: row;
    gap: 14px;
    box-sizing: content-box;
  `;
  const Content2 = styled.div`
    margin-left: 28px;
    width: 330.17px;
    height: 30.33px;
    display: flex;
    flex-direction: row;
    gap: 9.33px;
  `;

  const FontBg = styled.p`
    font-family: ${Font.FontKor};
    font-style: normal;
    font-weight: 500;
    font-size: 16.3333px;
    color: ${COLOR.BLACK};
  `;

  const styles = {
    background: {
      backgroundColor: `${COLOR.GRAY_100}`,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '9.33px',
      marginTop: '-5px',
      marginBottom: '69.33px',
    },
    navBar: {
      position: 'fixed',
      bottom: 0,
      width: '420px',
    },
    space: {
      display: 'flex',
      width: '280px',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  };

  return (
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className='side_container'></div>
        </Col>
        <Col className='col2'>
          <div className='potz_container' style={styles.background}>
            <Title>배달팟 채팅 목록</Title>
            <div
              style={{
                marginTop: '70px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: '28px',
                paddingRight: '28px',
                backgroundColor: 'white',
                height: '30.33px',
              }}
            >
              <div>지금 참여중인 배달팟 채팅 4</div>
              <svg
                width='7'
                height='6'
                viewBox='0 0 7 6'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M3.51469 2.3038L5.86667 4.94845C5.99115 5.08759 6.15954 5.16569 6.33507 5.16569C6.51059 5.16569 6.67899 5.08759 6.80347 4.94845C6.86574 4.879 6.91517 4.79637 6.9489 4.70533C6.98263 4.61429 7 4.51665 7 4.41802C7 4.3194 6.98263 4.22175 6.9489 4.13072C6.91517 4.03968 6.86574 3.95705 6.80347 3.8876L3.98641 0.720007C3.92465 0.649985 3.85117 0.594407 3.7702 0.556479C3.68924 0.518551 3.6024 0.499023 3.51469 0.499023C3.42698 0.499023 3.34014 0.518551 3.25918 0.556479C3.17821 0.594407 3.10473 0.649984 3.04297 0.720007L0.192687 3.8876C0.13111 3.95741 0.082393 4.0402 0.0493291 4.13122C0.0162657 4.22224 -0.000494666 4.3197 1.0777e-05 4.41802C-0.000494675 4.51634 0.0162657 4.61381 0.0493291 4.70483C0.082393 4.79585 0.13111 4.87864 0.192687 4.94845C0.317171 5.08759 0.485564 5.16569 0.66109 5.16569C0.836615 5.16569 1.00501 5.08759 1.12949 4.94845L3.51469 2.3038Z'
                  fill='#808080'
                />
              </svg>
            </div>
            <div className='contents_container'></div>
            <div style={styles.content}>
              <Chat>
                <Content1>
                  <img
                    style={{ width: '70px' }}
                    src='/images/graphicImg/testImg.png'
                  />
                  <div>
                    <div style={styles.space}>
                      <div>누들박스</div>
                      <div>12</div>
                    </div>
                    <div>10명 참여중 | 1분 전</div>
                  </div>
                </Content1>
                <Content2>
                <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.1581 10.2621C22.1581 11.7273 22.5454 12.591 23.3976 13.5862C24.0434 14.3194 24.2498 15.2606 24.2498 16.2817C24.2498 17.3016 23.9147 18.2698 23.2434 19.0559C22.3645 19.9983 21.125 20.5999 19.86 20.7045C18.0268 20.8608 16.1924 20.9924 14.3338 20.9924C12.4739 20.9924 10.6407 20.9136 8.80755 20.7045C7.54137 20.5999 6.30186 19.9983 5.42411 19.0559C4.75276 18.2698 4.4165 17.3016 4.4165 16.2817C4.4165 15.2606 4.62406 14.3194 5.26874 13.5862C6.14764 12.591 6.50941 11.7273 6.50941 10.2621V9.76503C6.50941 7.80274 6.99872 6.51961 8.00633 5.26351C9.50441 3.43165 11.9057 2.33301 14.2816 2.33301H14.3859C16.8128 2.33301 19.2918 3.48453 20.7644 5.39512C21.7198 6.62537 22.1581 7.85444 22.1581 9.76503V10.2621ZM10.9192 23.4038C10.9192 22.8163 11.4584 22.5472 11.9569 22.4321C12.5402 22.3087 16.0941 22.3087 16.6773 22.4321C17.1759 22.5472 17.715 22.8163 17.715 23.4038C17.6861 23.9631 17.3579 24.459 16.9046 24.7739C16.3167 25.2321 15.6268 25.5224 14.9056 25.6269C14.5067 25.6786 14.1148 25.6798 13.7298 25.6269C13.0075 25.5224 12.3176 25.2321 11.7308 24.7727C11.2763 24.459 10.9482 23.9631 10.9192 23.4038Z" fill="#A8A8A8"/>
</svg>
<div>방장 요청사항</div> <div>2개</div>
                </Content2>
              </Chat>
              <Chat></Chat>
              <Chat></Chat>
              <Chat></Chat>
              <Chat></Chat>
              <Chat></Chat>
              <Chat></Chat>
              <Chat></Chat>
            </div>
            <div style={styles.navBar}>
              <NavBar3></NavBar3>
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

export default ChatList;