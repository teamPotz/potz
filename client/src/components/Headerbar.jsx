import styled from 'styled-components';
import Font from '../utility/Font';
import COLOR from '../utility/Color';
import React from 'react';

import { useState } from 'react';

const HeaderWrapper = styled.div`
  width: 420px;
  height: 70px;
  background-color: ${COLOR.WHITE};
  filter: drop-shadow(0px 1.16667px 2.33333px rgba(0, 0, 0, 0.08));
`;

const WriteFrame = styled.div`
  padding: 21px 304.5px 21px 19.83px;
  width: 95.7px;
  height: 28px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 11.667px;
  background-color: ${COLOR.WHITE};
  color: ${COLOR.GRAY_500};
`;

const BackIcon = () => (
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

const BackButton = styled.button`
  width: 28px;
  height: 28px;
  background: ${COLOR.WHITE};
  border: none;
  transition: all 0.2s ease;
  cursor: grab;

  &:hover {
    background-color: ${COLOR.GRAY_100};
    transform: scale(1.18);
    border-radius: 4px;
  }
`;

const fontStyle = {
  fontStyle: Font.FontKor,
  fontSize: '18px',
  fontWeight: '700',
  lineHeight: '150%',
  color: `${COLOR.BLACK}`,
};

const backgroundStyle = {
  width: '420px',
  height: '100%',
  backgroundColor: `${COLOR.WHITE}`,
};

const style1 = {
  gap: '11.67px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  justifycontent: 'center',
};

function Headerbar() {
  let [Content, setContent] = useState('글쓰기');

  return (
    <HeaderWrapper>
      <WriteFrame>
        <BackButton>
          <BackIcon />
        </BackButton>
        <div className="potz_container" style={backgroundStyle}>
          <div className="contents_container" style={style1}>
            <span style={fontStyle}>{Content}</span>
          </div>
        </div>
      </WriteFrame>
    </HeaderWrapper>
  );
}

export default Headerbar;
