import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLOR from '../../utility/Color';
import coptyUrlToClipboard from '../../utility/coptyUrlToClipboard';

const PostDetailMenu = ({ setVisible, postId, isAuthor }) => {
  const [displayWidth, setdisplayWidth] = useState('420');
  const navigate = useNavigate();

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

  const containerStyle = {
    maxWidth: displayWidth ? `${displayWidth}px` : '420px', // 이 줄 수정
  };

  const editHandler = () => {
    if (!isAuthor) {
      alert('글 작성자만 수정할 수 있습니다.');
      return;
    }
    navigate(`/posts/${postId}/update`);
  };

  const deletePost = async () => {
    if (!isAuthor) {
      alert('글 작성자만 삭제할 수 있습니다.');
      return;
    }
    if (!confirm('게시글을 삭제하실 건가요?')) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/posts/${postId}`,
        {
          method: 'PATCH',
          credentials: 'include',
        }
      );
      const data = await response.json();
      alert('게시글이 삭제되었습니다.');
      navigate(`/community/${localStorage.getItem('communityDataID')}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={containerStyle}>
      <SelectWrapper displayWidth={displayWidth}>
        <div style={btnStyle}>
          <ButtonWrap onClick={() => setVisible(false)}>
            <CloseIcon />
          </ButtonWrap>
        </div>

        {isAuthor && (
          <>
            <div onClick={editHandler} style={fontStyle}>
              수정하기
            </div>
            <div onClick={deletePost} style={fontStyle}>
              삭제
            </div>
          </>
        )}

        <div onClick={coptyUrlToClipboard} style={fontStyle}>
          공유하기
        </div>
      </SelectWrapper>
    </div>
  );
};

const ButtonWrap = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  transition: all 0.2s ease;
  cursor: pointer;

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
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: '700',
  cursor: 'pointer',
};

export default PostDetailMenu;
