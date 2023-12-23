import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import COLOR from '../../utility/Color';
import TagPlaceSM from '../TagPlaceSM';
import NotificationBell from '../ui/NotificationBell';

const HomeTopNavBar = ({ communityDatas, notifications }) => {
  // console.log('네비게이션바 데이터', communityDatas);
  const navigate = useNavigate();

  return (
    <NavBarWrapper>
      <div style={style1}>
        <div>
          <div style={style2}>
            <span style={fontStyle}>{communityDatas.name}</span>
          </div>
          <div style={fontStyle2}>
            <span>멤버 수</span>
            {communityDatas._count ? (
              <span style={fontColored}>{communityDatas._count.members}</span>
            ) : (
              0
            )}
            {communityDatas.communityTypes.map((type) => (
              <TagPlaceSM key={type.id}>{type.name}</TagPlaceSM>
            ))}
          </div>
        </div>
        <div style={buttonContainer}>
          <ButtonMenu onClick={() => navigate('/category')}>
            <MenuIcon />
          </ButtonMenu>
          <ButtonAlert onClick={() => navigate('/notification')}>
            <NotificationBell counter={notifications.length} />
          </ButtonAlert>
          <ButtonSearch onClick={() => navigate('/search')}>
            <SearchIcon />
          </ButtonSearch>
        </div>
      </div>
    </NavBarWrapper>
  );
};

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
  fontSize: '18px',
  fontWeight: '800',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const fontStyle2 = {
  width: 'auto',
  fontSize: '12px',
  fontWeight: '700',
  display: 'flex',
  gap: '4px',
};

const fontColored = {
  color: COLOR.POTZ_PINK_DEFAULT,
  marginRight: '12px',
};

const NavBarWrapper = styled.div`
  width: 100%;
  background-color: ${COLOR.WHITE};
  height: 70px;
  box-shadow: 0px 1.5px 2.7px 0px rgba(0, 0, 0, 0.09);
  display: flex;
`;

const ButtonMenu = styled.button`
  display: flex;
  padding: 0px;
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
  padding: 0px;
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
  padding: 0px;
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

export default HomeTopNavBar;
