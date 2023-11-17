import '../App.css';
import Font from '../utility/Font';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import COLOR from '../utility/Color';
import { useState, useRef } from 'react';
import AlarmContent from '../components/AlarmContent';

//contents_container 안에 UI 구현 하시면 됩니다!

function Alarm() {
  let [Name1, setName1] = useState('알람');

  // const [displayWidth, setdisplayWidth] = useState(window.innerWidth);

  // useEffect(() => {
  //   const ReSizeHandler = () => {
  //     setdisplayWidth(windows.innerWidth);
  //   };

  //   //윈도우 리사이즈가 일어나면 콜백 호출
  //   window.addEventListener('resize', ReSizeHandler);

  //   return () => {
  //     window.removeEventListener('resize', ReSizeHandler);
  //   };
  // }, []);

  const Title = styled.div`
    margin-top: 18px;
    margin-bottom: 18px;
    background-color: ${COLOR.POTZ_PINK_100};
    height: 10px;
    width: 100%;
    & > hr {
      background: ${COLOR.GRAY_200};
      height: 1px;
      border: 0;
    }
  `;

  const backgroundStyle = {
    backgroundColor: COLOR.WHITE,
  };

  const BackButton = styled.button`
    width: 28px;
    height: 28px;
    background: ${COLOR.WHITE};
    border: none;
    transition: all 0.2s ease;
    cursor: grab;

    &:hover {
      transform: scale(1.18);
      border-radius: 4px;
    }
  `;

  const BackIcon = () => {
    return (
      <svg
        width="11"
        height="20"
        viewBox="0 0 11 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.75 18.1673L1.58333 10.0007L9.75 1.83398"
          stroke="black"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const ButtonDelete = styled.button`
    display: flex;
    width: 36px;
    height: 36px;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: ${COLOR.WHITE};
    cursor: grab;

    &:hover {
      background-color: ${COLOR.GRAY_100};
    }
  `;

  const DeleteIcon = () => {
    return (
      <svg
        width="29"
        height="28"
        viewBox="0 0 29 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M24.1683 6.11647C24.6222
            6.11647 25 6.4933 25 6.9728V7.41612C25 7.88395 24.6222 8.27245 24.1683
            8.27245H4.83283C4.37784 8.27245 4 7.88395 4 7.41612V6.9728C4 6.4933
            4.37784 6.11647 4.83283 6.11647H8.23449C8.92549 6.11647 9.52685 5.62531
            9.6823 4.93232L9.86044 4.13666C10.1373 3.05283 11.0484 2.33301 12.0912
            2.33301H16.9089C17.9402 2.33301 18.8616 3.05283 19.1282 4.07949L19.3188
            4.93115C19.4731 5.62531 20.0745 6.11647 20.7666 6.11647H24.1683ZM22.4399
            22.3229C22.795 19.0131 23.4168 11.1498 23.4168 11.0705C23.4395 10.8301
            23.3612 10.6026 23.2058 10.4195C23.039 10.248 22.8279 10.1465 22.5953
            10.1465H6.41302C6.17929 10.1465 5.9569 10.248 5.80259 10.4195C5.646
            10.6026 5.56885 10.8301 5.5802 11.0705C5.58228 11.0851 5.60459 11.362
            5.64189 11.8251C5.8076 13.8822 6.26911 19.6117 6.56734 22.3229C6.77838
            24.3202 8.08889 25.5755 9.98715 25.621C11.452 25.6548 12.9611 25.6665
            14.5042 25.6665C15.9577 25.6665 17.4338 25.6548 18.944 25.621C20.9081
            25.5872 22.2175 24.354 22.4399 22.3229Z"
          fill="#373737"
        />
      </svg>
    );
  };

  const RightButtonIcon = () => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.5 5L15.5 12L8.5 19"
          stroke="#808080"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  };

  const style1 = {
    marginLeft: '28px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    justifycontent: 'space-between',
  };

  const TopStyle = {
    marginTop: '18px',
    display: 'flex',
    width: '100%',
    gap: '12px',
    alignItems: 'center',
  };

  const fontStyle = {
    width: '170px',
    fontStyle: Font.FontKor,
    fontSize: '18px',
    fontWeight: '800',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const styles = {
    background: {
      backgroundColor: `${COLOR.GRAY_100}`,
    },
    sideCategory1: {
      /* Frame 10919 */
      /* Auto layout */
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '14px',
      width: '280px',
      height: '38px',
    },

    sideCategory2: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '0px',
      gap: '182px',
      width: '280px',
      height: '24px',
    },
    line: {
      /* Line 63 */
      width: '280px',
      height: '0px',
      border: '0.25px solid',
    },

    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '9.33px',
      marginTop: '-5px',
      marginBottom: '69.33px',
    },
    space: {
      display: 'flex',
      width: '280px',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rowFlex: {
      display: 'flex',
      flexDirection: 'row',
      gap: '7px',
      alignItems: 'center',
      height: '21px',
    },
  };

  return (
    <Container className="background">
      <Row className="row1">
        <Col className="col1">
          <div className="side_container"></div>
        </Col>
        <Col className="col2">
          <div className="potz_container" style={backgroundStyle}>
            <div className="contents_container" style={style1}>
              <div style={TopStyle}>
                <BackButton>
                  <BackIcon></BackIcon>
                </BackButton>
                <div style={style1}>
                  <span style={fontStyle}>{Name1}</span>
                </div>
                <ButtonDelete>
                  <DeleteIcon></DeleteIcon>
                </ButtonDelete>
              </div>
            </div>
            <Title />

            <div className="contents_container"></div>
            <div style={styles.content}>
              <AlarmContent />
            </div>
          </div>
        </Col>
        <Col className="col3">
          <div className="side_container"></div>
        </Col>
      </Row>
    </Container>
  );
}

export default Alarm;
