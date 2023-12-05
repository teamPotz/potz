import styled from 'styled-components';
import COLOR from '../utility/Color';
import Font from '../utility/Font';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonWrap = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  transition: all 0.2s ease;
  cursor: grab;

  &:hover {
    transform: scale(1.18);
    border-radius: 4px;
  }
`;

const CloseIcon = () => {
  return (
    <svg
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.0002 1.83398L1.3335 13.5007M1.3335 1.83398L13.0002 13.5007'
        stroke='black'
        strokeWidth='2.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  padding-top: 16px;
  padding-bottom: 32px;
  max-width: 420px;
  width: 100%;
  height: 128px;
  border-radius: 0px 0px 28px 28px;
  background-color: ${COLOR.WHITE};
  position: absolute;
  box-shadow: 0px 3.5px 8.16667px 0px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const btnStyle = {
  width: '94%',
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'end',
};

const fontStyle = {
  marginLeft: '32px',
  fontFamily: Font.FontKor,
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: '700',
  cursor: 'pointer',
};

const SelectComp = (props) => {
  let { setVisible, postId } = props;
  let [displayWidth, setdisplayWidth] = useState('420');
  let navigate = useNavigate();

  useEffect(() => {
    const ReSizeHandler = () => {
      setdisplayWidth(window.innerWidth);
    };

    //윈도우 리사이즈가 일어나면 콜백 호출
    window.addEventListener('resize', ReSizeHandler);

    return () => {
      window.removeEventListener('resize', ReSizeHandler);
    };
  }, []);

  const deleteHandler = () => {
    let deleteOrNot = confirm('게시글을 삭제하실 건가요?');
    if (deleteOrNot) {
      deletePost(postId);
    } else {
      return;
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/posts/${postId}`,
        {
          method: 'PATCH',
          credentials: 'include',
        }
      );
      const data = await response.json();
      console.log('삭제한 포스트', data);
      alert('게시글이 삭제되었습니다.');
      navigate(`/community/${localStorage.getItem('communityDataID')}`);
    } catch (error) {
      console.error(error);
    }
  };

  const editHandler = () => {
    navigate(`/posts/${postId}/update`);
  };

  const containerStyle = {
    maxWidth: displayWidth ? `${displayWidth}px` : '420px', // 이 줄 수정
  };

  return (
    <div style={containerStyle}>
      <SelectWrapper displayWidth={displayWidth}>
        <div style={btnStyle}>
          <ButtonWrap
            onClick={() => {
              setVisible(false);
            }}
          >
            <CloseIcon></CloseIcon>
          </ButtonWrap>
        </div>
        <div style={fontStyle} onClick={editHandler}>
          수정하기
        </div>
        <div onClick={deleteHandler} style={fontStyle}>
          삭제
        </div>
      </SelectWrapper>
    </div>
  );
};

export default SelectComp;
