//사용하실 때 import { NavBar1, NavBar2, NavBar3, NavBar4 } from ~~ 하시면 됩니다!

import styled from 'styled-components';
import COLOR from '../utility/Color';
import { useNavigate } from 'react-router-dom';

//nav bar icons
const HomeIcon = () => {
  return (
    <svg
      width='29'
      height='28'
      viewBox='0 0 29 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11.1571 24.2357V20.6684C11.1571 19.7577 11.9007 19.0195 12.818 19.0195H16.1712C16.6117 19.0195 17.0342 19.1932 17.3457 19.5025C17.6572 19.8117 17.8322 20.2311 17.8322 20.6684V24.2357C17.8294 24.6143 17.9789 24.9784 18.2476 25.247C18.5163 25.5157 18.8819 25.6668 19.2633 25.6668H21.551C22.6194 25.6696 23.645 25.2501 24.4015 24.5011C25.158 23.7521 25.5832 22.735 25.5832 21.6743V11.5115C25.5831 10.6547 25.2006 9.84198 24.5386 9.29228L16.7562 3.12201C15.4024 2.04015 13.4628 2.07508 12.1495 3.20497L4.54468 9.29228C3.85137 9.82577 3.43698 10.6409 3.4165 11.5115V21.6639C3.4165 23.8747 5.22178 25.6668 7.44871 25.6668H9.68418C10.4763 25.6668 11.12 25.0324 11.1257 24.2461L11.1571 24.2357Z'
        fill='#A8A8A8'
      />
    </svg>
  );
};

const HeartIcon = () => {
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
        d='M13.2213 25.1153C13.9983 25.6286 15.0005 25.6286 15.7763 25.1153C18.2438 23.4866 23.6163 19.5935 25.931 15.2371C28.9818 9.49014 25.399 3.7583 20.6623 3.7583C17.9626 3.7583 16.3386 5.1688 15.4403 6.38097C15.3324 6.52943 15.1909 6.65025 15.0274 6.73356C14.8638 6.81687 14.6829 6.8603 14.4994 6.8603C14.3158 6.8603 14.1349 6.81687 13.9714 6.73356C13.8079 6.65025 13.6664 6.52943 13.5585 6.38097C12.6601 5.1688 11.0361 3.7583 8.33646 3.7583C3.59979 3.7583 0.0169593 9.49014 3.06896 15.2371C5.38129 19.5935 10.7561 23.4866 13.2213 25.1153'
        fill='#A8A8A8'
      />
    </svg>
  );
};

const ChatIcon = () => {
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
        d='M2.8335 14.0177C2.8335 7.8718 7.74516 2.3335 14.5235 2.3335C21.1502 2.3335 26.1668 7.76665 26.1668 13.9826C26.1668 21.1918 20.2868 25.6668 14.5002 25.6668C12.5868 25.6668 10.4635 25.1527 8.76016 24.1479C8.16516 23.7857 7.6635 23.5169 7.02183 23.7273L4.66516 24.4283C4.07016 24.6153 3.5335 24.1479 3.7085 23.5169L4.49016 20.8997C4.6185 20.5375 4.59516 20.1519 4.4085 19.8481C3.40516 18.002 2.8335 15.9806 2.8335 14.0177ZM9.09817 15.5248C8.2815 15.5248 7.60483 14.8472 7.60483 14.0293C7.60483 13.1997 8.26983 12.5337 9.09817 12.5337C9.9265 12.5337 10.5915 13.1997 10.5915 14.0293C10.5915 14.8472 9.9265 15.5132 9.09817 15.5248ZM12.9836 14.0177C12.9836 14.8473 13.6486 15.5133 14.4769 15.525C15.3052 15.525 15.9702 14.8473 15.9702 14.0294C15.9702 13.1998 15.3052 12.5338 14.4769 12.5338C13.6602 12.5222 12.9836 13.1998 12.9836 14.0177ZM18.3619 14.0293C18.3619 14.8472 19.0269 15.5248 19.8553 15.5248C20.6836 15.5248 21.3486 14.8472 21.3486 14.0293C21.3486 13.1997 20.6836 12.5337 19.8553 12.5337C19.0269 12.5337 18.3619 13.1997 18.3619 14.0293Z'
        fill='#A8A8A8'
      />
    </svg>
  );
};

const MyPageIcon = () => {
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
        d='M20.6762 8.50639C20.6762 11.9329 17.9288 14.6805 14.4999 14.6805C11.0721 14.6805 8.32357 11.9329 8.32357 8.50639C8.32357 5.07986 11.0721 2.3335 14.4999 2.3335C17.9288 2.3335 20.6762 5.07986 20.6762 8.50639ZM14.4998 25.6667C9.43927 25.6667 5.1665 24.8442 5.1665 21.6708C5.1665 18.4963 9.46612 17.703 14.4998 17.703C19.5616 17.703 23.8332 18.5255 23.8332 21.6988C23.8332 24.8734 19.5336 25.6667 14.4998 25.6667Z'
        fill='#A8A8A8'
      />
    </svg>
  );
};

//nav bar wrappers
const NavBarWrapper = styled.div`
  padding-top: 4px;
  padding-bottom: 4px;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLOR.WHITE};
  border: 1px ${COLOR.GRAY_100} solid;
  border-radius: 16px 16px 0px 0px;
  box-shadow: 0px -36px 57px 0px rgba(255, 255, 255, 0.8);
`;

//nav bar buttons wrappers
const ButtonHome = styled.button`
  margin-left: 28px;
  background-color: ${COLOR.WHITE};
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  cursor: grab;

  &:hover {
    background-color: ${COLOR.GRAY_100};
  }
`;

const ButtonHeart = styled.button`
  background-color: ${COLOR.WHITE};
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  cursor: grab;

  &:hover {
    background-color: ${COLOR.GRAY_100};
  }
`;

const ButtonChat = styled.button`
  background-color: ${COLOR.WHITE};
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  cursor: grab;

  &:hover {
    background-color: ${COLOR.GRAY_100};
  }
`;

const ButtonMyPage = styled.button`
  margin-right: 28px;
  background-color: ${COLOR.WHITE};
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  cursor: grab;

  &:hover {
    background-color: ${COLOR.GRAY_100};
  }
`;

//nav bars
export const NavBar1 = () => {
  let navigate = useNavigate();

  const HomeIconClicked = () => {
    return (
      <svg
        width='29'
        height='28'
        viewBox='0 0 29 28'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M11.1571 24.2357V20.6684C11.1571 19.7577 11.9007 19.0195 12.818 19.0195H16.1712C16.6117 19.0195 17.0342 19.1932 17.3457 19.5025C17.6572 19.8117 17.8322 20.2311 17.8322 20.6684V24.2357C17.8294 24.6143 17.9789 24.9784 18.2476 25.247C18.5163 25.5157 18.8819 25.6668 19.2633 25.6668H21.551C22.6194 25.6696 23.645 25.2501 24.4015 24.5011C25.158 23.7521 25.5832 22.735 25.5832 21.6743V11.5115C25.5831 10.6547 25.2006 9.84198 24.5386 9.29228L16.7562 3.12201C15.4024 2.04015 13.4628 2.07508 12.1495 3.20497L4.54468 9.29228C3.85137 9.82577 3.43698 10.6409 3.4165 11.5115V21.6639C3.4165 23.8747 5.22178 25.6668 7.44871 25.6668H9.68418C10.4763 25.6668 11.12 25.0324 11.1257 24.2461L11.1571 24.2357Z'
          fill='black'
        />
      </svg>
    );
  };

  return (
    <NavBarWrapper>
      <ButtonHome
        onClick={() => {
          navigate('/home');
        }}
      >
        <HomeIconClicked></HomeIconClicked>
      </ButtonHome>
      <ButtonHeart
        onClick={() => {
          navigate('/liked-list');
        }}
      >
        <HeartIcon></HeartIcon>
      </ButtonHeart>
      <ButtonChat>
        <ChatIcon></ChatIcon>
      </ButtonChat>
      <ButtonMyPage>
        <MyPageIcon></MyPageIcon>
      </ButtonMyPage>
    </NavBarWrapper>
  );
};

export const NavBar2 = () => {
  let navigate = useNavigate();
  const HeartIconClicked = () => {
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
          d='M13.2213 25.1153C13.9983 25.6286 15.0005 25.6286 15.7763 25.1153C18.2438 23.4866 23.6163 19.5935 25.931 15.2371C28.9818 9.49014 25.399 3.7583 20.6623 3.7583C17.9626 3.7583 16.3386 5.1688 15.4403 6.38097C15.3324 6.52943 15.1909 6.65025 15.0274 6.73356C14.8638 6.81687 14.6829 6.8603 14.4994 6.8603C14.3158 6.8603 14.1349 6.81687 13.9714 6.73356C13.8079 6.65025 13.6664 6.52943 13.5585 6.38097C12.6601 5.1688 11.0361 3.7583 8.33646 3.7583C3.59979 3.7583 0.0169593 9.49014 3.06896 15.2371C5.38129 19.5935 10.7561 23.4866 13.2213 25.1153'
          fill='black'
        />
      </svg>
    );
  };

  return (
    <NavBarWrapper>
      <ButtonHome
        onClick={() => {
          navigate('/home');
        }}
      >
        <HomeIcon></HomeIcon>
      </ButtonHome>
      <ButtonHeart
        onClick={() => {
          navigate('/liked-list');
        }}
      >
        <HeartIconClicked></HeartIconClicked>
      </ButtonHeart>
      <ButtonChat>
        <ChatIcon></ChatIcon>
      </ButtonChat>
      <ButtonMyPage>
        <MyPageIcon></MyPageIcon>
      </ButtonMyPage>
    </NavBarWrapper>
  );
};

export const NavBar3 = () => {
  const ChatIconClicked = () => {
    return (
      <svg
        width='28'
        height='28'
        viewBox='0 0 28 28'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M2.3335 14.0177C2.3335 7.8718 7.24516 2.3335 14.0235 2.3335C20.6502 2.3335 25.6668 7.76665 25.6668 13.9826C25.6668 21.1918 19.7868 25.6668 14.0002 25.6668C12.0868 25.6668 9.9635 25.1527 8.26016 24.1479C7.66516 23.7857 7.1635 23.5169 6.52183 23.7273L4.16516 24.4283C3.57016 24.6153 3.0335 24.1479 3.2085 23.5169L3.99016 20.8997C4.1185 20.5375 4.09516 20.1519 3.9085 19.8481C2.90516 18.002 2.3335 15.9806 2.3335 14.0177ZM8.59817 15.5248C7.7815 15.5248 7.10483 14.8472 7.10483 14.0293C7.10483 13.1997 7.76983 12.5337 8.59817 12.5337C9.4265 12.5337 10.0915 13.1997 10.0915 14.0293C10.0915 14.8472 9.4265 15.5132 8.59817 15.5248ZM12.4836 14.0177C12.4836 14.8473 13.1486 15.5133 13.9769 15.525C14.8052 15.525 15.4702 14.8473 15.4702 14.0294C15.4702 13.1998 14.8052 12.5338 13.9769 12.5338C13.1602 12.5222 12.4836 13.1998 12.4836 14.0177ZM17.8619 14.0293C17.8619 14.8472 18.5269 15.5248 19.3553 15.5248C20.1836 15.5248 20.8486 14.8472 20.8486 14.0293C20.8486 13.1997 20.1836 12.5337 19.3553 12.5337C18.5269 12.5337 17.8619 13.1997 17.8619 14.0293Z'
          fill='black'
        />
      </svg>
    );
  };

  return (
    <NavBarWrapper>
      <ButtonHome>
        <HomeIcon></HomeIcon>
      </ButtonHome>
      <ButtonHeart>
        <HeartIcon></HeartIcon>
      </ButtonHeart>
      <ButtonChat>
        <ChatIconClicked></ChatIconClicked>
      </ButtonChat>
      <ButtonMyPage>
        <MyPageIcon></MyPageIcon>
      </ButtonMyPage>
    </NavBarWrapper>
  );
};

export const NavBar4 = () => {
  const IconMyPageClicked = () => {
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
          d='M20.6762 8.50639C20.6762 11.9329 17.9288 14.6805 14.4999 14.6805C11.0721 14.6805 8.32357 11.9329 8.32357 8.50639C8.32357 5.07986 11.0721 2.3335 14.4999 2.3335C17.9288 2.3335 20.6762 5.07986 20.6762 8.50639ZM14.4998 25.6667C9.43927 25.6667 5.1665 24.8442 5.1665 21.6708C5.1665 18.4963 9.46612 17.703 14.4998 17.703C19.5616 17.703 23.8332 18.5255 23.8332 21.6988C23.8332 24.8734 19.5336 25.6667 14.4998 25.6667Z'
          fill='#131313'
        />
      </svg>
    );
  };
  return (
    <NavBarWrapper>
      <ButtonHome>
        <HomeIcon></HomeIcon>
      </ButtonHome>
      <ButtonHeart>
        <HeartIcon></HeartIcon>
      </ButtonHeart>
      <ButtonChat>
        <ChatIcon></ChatIcon>
      </ButtonChat>
      <ButtonMyPage>
        <IconMyPageClicked></IconMyPageClicked>
      </ButtonMyPage>
    </NavBarWrapper>
  );
};
