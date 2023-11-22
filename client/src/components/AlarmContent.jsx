//alarmcontent.jsx

import styled from 'styled-components';
import Font from '../utility/Font';
import COLOR from '../utility/Color';
import React from 'react';

const contentPostData = [
  {
    id: 1,
    alarmtitle: '카테고리 알림',
    content: '일식 • 회 🍤 카테고리 모집글이 올라왔어요.',
    subcontent: '클릭해서 카테고리로 이동해보세요!',
  },
  {
    id: 2,
    alarmtitle: '키워드 알림',
    content: '떡군이네 떡볶이 키워드 모집글이 올라왔어요.',
    subcontent: '클릭해서 카테고리로 이동해보세요!',
  },
  {
    id: 3,
    alarmtitle: '카테고리 알림',
    content: '피자🍕 카테고리 모집글이 올라왔어요.',
    subcontent: '클릭해서 카테고리로 이동해보세요!',
  },
  {
    id: 4,
    alarmtitle: '방장 요청',
    content: '방장의 요청사항이 있어요!',
    subcontent: '수현님 정산해요💰',
  },
  {
    id: 5,
    alarmtitle: '카테고리 알림',
    content: '버거🍔 카테고리 모집글이 올라왔어요.',
    subcontent: '클릭해서 카테고리로 이동해보세요!',
  },
];

const AlarmContent = (props) => {
  //let { contentPostData } = props;
  console.log('컨텐트 포스트 데이터', contentPostData.posts);

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

  const RightButton = styled.button`
    display: flex;
    width: 36px;
    height: 36px;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: ${COLOR.WHITE};
    transition: all 0.2s ease;
    cursor: grab;
    &:hover {
      background-color: ${COLOR.GRAY_100};
    }
  `;
  //framebox
  const AlarmBox = styled.div`
    margin: 0px auto;
    margin-top: 9.33px;
    width: 364px;
    height: 144px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    /* gap: 8px; */
    position: relative;
    border-radius: 7px;
    background-color: ${COLOR.WHITE};
    color: ${COLOR.GRAY_200};
    cursor: grab;
    box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.07);
  `;

  const AlarmMessage = styled.div`
    width: 86.7px;
    height: 21px;
    background: ${COLOR.POTZ_PINK_200};
    border-radius: 10px;
    color: ${COLOR.POTZ_PINK_DEFAULT};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    font-family: ${Font.FontKor};
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 150%;
    cursor: grab;
    &:hover {
      background: ${COLOR.GRAY_200};
    }
  `;

  const AlarmFont1 = styled.div`
    /* width: 290px;
    height: 21px; */

    /* 본문/14_Medium */
    font-family: ${Font.FontKor};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: -0.6px;
    color: ${COLOR.BLACK};
  `;

  const AlarmFont2 = styled.div`
    /* width: 220px;
    height: 18px; */

    /* 제목/설명/12_Medium */

    font-family: ${Font.FontKor};
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
    /* identical to box height, or 18px */
    display: flex;
    align-items: center;
    text-align: center;

    /* Grey/2 */
    color: ${COLOR.GRAY_200};
  `;

  const styles = {
    background: {
      backgroundColor: `${COLOR.WHITE}`,
    },
    sideCategory1: {
      /* Frame 10919 */
      /* Auto layout */
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '16.333px 18.667px',
      gap: '11.67px',
      width: '327px',
      height: '81px',
    },

    sideCategory2: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '0px',
      gap: '212.33px',
      width: '327px',
      height: '28px',
    },
    line: {
      /* line */
      width: '326.67px',
      height: '0px',
      borderBottom: '0.58px solid',
      background: `${COLOR.GRAY_100}`,
    },

    rowFlex: {
      display: 'flex',
      flexDirection: 'row',
      gap: '7px',
      alignItems: 'center',
      height: '21px',
    },
  };

  // CategoryIcon 컴포넌트가 JSX를 반환하도록 수정합니다.

  return (
    <>
      {contentPostData.map((message, index) => {
        return (
          <AlarmBox key={index}>
            <div style={styles.sideCategory1}>
              <div style={styles.sideCategory2}>
                <AlarmMessage>{message.alarmtitle}</AlarmMessage>
                <RightButton>
                  <RightButtonIcon />
                </RightButton>
              </div>
              <div style={styles.line}></div>
              <AlarmFont1>{message.content}</AlarmFont1>
              <AlarmFont2>{message.subcontent}</AlarmFont2>
            </div>
          </AlarmBox>
        );
      })}
    </>
  );
};

export default AlarmContent;
