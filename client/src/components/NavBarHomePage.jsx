import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import COLOR from '../utility/Color';
import Font from '../utility/Font';
import styled from 'styled-components';
import TagPlaceSM from './TagPlaceSM';

const NavBarWrapper = styled.div`
  width: 100%;
  background-color: ${COLOR.WHITE};
  height: 70px;
  box-shadow: 0px 1.5px 2.7px 0px rgba(0, 0, 0, 0.09);
  display: flex;
`;

const ButtonMenu = styled.button`
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

const ButtonAlert = styled.button`
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

const ButtonSearch = styled.button`
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

const MenuIcon = () => {
  return (
    <svg
      width='29'
      height='28'
      viewBox='0 0 29 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.5 13.999H21.5'
        stroke='#373737'
        strokeWidth='1.75'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.5 18.083H21.5'
        stroke='#373737'
        strokeWidth='1.75'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.5 9.91602H21.5'
        stroke='#373737'
        strokeWidth='1.75'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

const AlertIcon = () => {
  return (
    <svg
      width='29'
      height='28'
      viewBox='0 0 29 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M22.3246 10.263C22.3246 11.7283 22.7119 12.5919 23.5641 13.5872C24.21 14.3204 24.4163 15.2616 24.4163 16.2827C24.4163 17.3026 24.0812 18.2708 23.4099 19.0569C22.531 19.9993 21.2915 20.6009 20.0265 20.7055C18.1933 20.8617 16.3589 20.9933 14.5003 20.9933C12.6404 20.9933 10.8072 20.9146 8.97405 20.7055C7.70787 20.6009 6.46836 19.9993 5.59062 19.0569C4.91926 18.2708 4.58301 17.3026 4.58301 16.2827C4.58301 15.2616 4.79056 14.3204 5.43524 13.5872C6.31415 12.5919 6.67591 11.7283 6.67591 10.263V9.766C6.67591 7.80371 7.16523 6.52059 8.17284 5.26449C9.67092 3.43263 12.0723 2.33398 14.4481 2.33398H14.5524C16.9793 2.33398 19.4583 3.48551 20.9309 5.39609C21.8863 6.62634 22.3246 7.85542 22.3246 9.766V10.263ZM11.0857 23.4048C11.0857 22.8173 11.6249 22.5482 12.1235 22.433C12.7067 22.3097 16.2606 22.3097 16.8438 22.433C17.3424 22.5482 17.8816 22.8173 17.8816 23.4048C17.8526 23.9641 17.5244 24.4599 17.0711 24.7748C16.4832 25.2331 15.7933 25.5233 15.0721 25.6279C14.6732 25.6796 14.2813 25.6808 13.8963 25.6279C13.174 25.5233 12.4841 25.2331 11.8973 24.7737C11.4428 24.4599 11.1147 23.9641 11.0857 23.4048Z'
        fill='#373737'
      />
    </svg>
  );
};

const SearchIcon = () => {
  return (
    <svg
      width='29'
      height='28'
      viewBox='0 0 29 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_272_12349)'>
        <circle
          cx='12.7498'
          cy='12.2503'
          r='7.58333'
          stroke='#373737'
          strokeWidth='1.75'
          strokeLinejoin='round'
        />
        <path
          d='M23.2146 23.9521C23.5563 24.2938 24.1103 24.2938 24.4521 23.9521C24.7938 23.6103 24.7938 23.0563 24.4521 22.7146L23.2146 23.9521ZM24.4521 22.7146L18.6187 16.8813L17.3813 18.1187L23.2146 23.9521L24.4521 22.7146Z'
          fill='#373737'
        />
      </g>
      <defs>
        <clipPath id='clip0_272_12349'>
          <rect
            width='28'
            height='28'
            fill='white'
            transform='translate(0.5)'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const style1 = {
  marginLeft: '28px',
  width: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '7px',
};

const buttonContainer = {
  display: 'flex',
  marginRight: '28px',
  gap: '4px',
};

const style2 = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  marginBottom: '4px',
  cursor: 'grab',
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

const fontStyle2 = {
  width: 'auto',
  fontStyle: Font.FontKor,
  fontSize: '12px',
  fontWeight: '700',
  display: 'flex',
  gap: '4px',
};

const fontColored = {
  color: COLOR.POTZ_PINK_DEFAULT,
  marginRight: '12px',
};

const NavBarHomePage = (props) => {
  let { communityDatas } = props;
  console.log('네비게이션바 데이터', communityDatas);

  let [Name, setName] = useState('더샵 하버뷰 1동 주민 모임');
  let [Members, setMembers] = useState(120);
  let navigate = useNavigate();

  let clickHandler1 = () => {
    navigate('/category');
  };

  let clickHandler2 = () => {
    navigate('/alarm');
  };

  let clickHandler3 = () => {
    navigate('/search');
  };

  return (
    <NavBarWrapper>
      <div style={style1}>
        <div>
          <div style={style2}>
            <span style={fontStyle}>{communityDatas.name}</span>
          </div>
          <div style={fontStyle2}>
            <span>멤버 수</span>
            <span style={fontColored}>{communityDatas._count.members}</span>
            {communityDatas.communityTypes.map((type) => (
              <TagPlaceSM key={type.id}>{type.name}</TagPlaceSM>
            ))}
          </div>
        </div>
        <div style={buttonContainer}>
          <ButtonMenu onClick={clickHandler1}>
            <MenuIcon />
          </ButtonMenu>
          <ButtonAlert onClick={clickHandler2}>
            <AlertIcon />
          </ButtonAlert>
          <ButtonSearch onClick={clickHandler3}>
            <SearchIcon />
          </ButtonSearch>
        </div>
      </div>
    </NavBarWrapper>
  );
};

export default NavBarHomePage;
