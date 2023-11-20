import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import COLOR from '../utility/Color';
import Font from '../utility/Font';
import CommunityComp from '../components/Community';
import { useState } from 'react';

//contents_container 안에 UI 구현 하시면 됩니다!

function ChooseCommunity() {
  const testDatas = [
    {
      communityName: '영어마을 기숙사',
      memNum: 220,
      recentContentsNum: 260,
      placeTag: ['학원', '교내 시설'],
      imgSrc:
        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      communityName: '대학교 기숙사',
      memNum: 353,
      recentContentsNum: 422,
      placeTag: ['교내 시설', '기숙사'],
      imgSrc:
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      communityName: '더샵하버뷰 1동',
      memNum: 113,
      recentContentsNum: 102,
      placeTag: ['아파트'],
      imgSrc:
        'https://images.unsplash.com/photo-1523192193543-6e7296d960e4?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      communityName: '디지털역 1번 출구',
      memNum: 121,
      recentContentsNum: 62,
      placeTag: ['지하철역'],
      imgSrc:
        'https://images.unsplash.com/photo-1523268266866-5dbd36907f00?auto=format&fit=crop&q=80&w=2071&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      communityName: '타운 상가 가게 직원들 모임',
      memNum: 121,
      recentContentsNum: 62,
      placeTag: ['상가', '직장'],
      imgSrc:
        'https://images.unsplash.com/photo-1523268266866-5dbd36907f00?auto=format&fit=crop&q=80&w=2071&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      communityName: '송도 단독주택끼리 뭉쳐요',
      memNum: 220,
      recentContentsNum: 260,
      placeTag: ['주택가'],
      imgSrc:
        'https://images.unsplash.com/photo-1430285561322-7808604715df?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      communityName: '자이 아파트 3동 배달 모임',
      memNum: 21,
      recentContentsNum: 12,
      placeTag: ['아파트'],
      imgSrc:
        'https://images.unsplash.com/photo-1580216643062-cf460548a66a?auto=format&fit=crop&q=80&w=1227&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  const [CommunityNum, SetCommunityNum] = useState(15);

  const backgroundStyle = {
    background: COLOR.POTZ_PINK_100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
  };

  const contentsStyle = {
    marginTop: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '36px',
    height: '100vh',
  };

  const fontStyle = {
    marginLeft: '30px',
    fontFamily: Font.FontKor,
    fontSize: '24px',
    fontWeight: '700',
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

  const fontStyle3 = {
    color: COLOR.POTZ_PINK_DEFAULT,
  };

  return (
    <div className='potz_container' style={backgroundStyle}>
      <div style={contentsStyle}>
        <div style={fontStyle}>
          <span>수현님 근처에</span>
          <br></br>
          <span style={fontStyle3}>{CommunityNum}</span>
          <span>개의 배달 공동체가 있네요.</span>
          <br></br>
          <span style={fontStyle2}>
            원하는 공동체에서 배달비를 나누어 보세요.
          </span>
        </div>
        <div>
          {testDatas.map((testData, index) => {
            return (
              <CommunityComp testData={testData} key={index}></CommunityComp>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ChooseCommunity;
