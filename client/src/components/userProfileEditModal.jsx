import styled from 'styled-components';
import COLOR from '../utility/Color';
import Font from '../utility/Font';
import ButtonBg from './ButtonBG';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderMessageWrapper = styled.div`
  font-family: ${Font.FontKor};
  color: ${COLOR.GRAY_500};
  font-weight: 500;
  width: 277px;
  max-height: 308px;
  padding: 32px 24px 32px;
  background-color: ${COLOR.WHITE};
  border-radius: 14px;
  gap: 11.67px;
  display: flex;
  flex-direction: column;
  margin-left: ${(props) => (props.own ? 'auto' : 'none')};
  z-index: 1000;
  border: ${COLOR.POTZ_PINK_300} 2px solid;
`;

const IconClose = () => {
  return (
    <div style={{ cursor: 'pointer' }}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='32'
        height='32'
        viewBox='0 0 57 58'
        fill='none'
      >
        <path
          d='M3 55L54 4'
          stroke='white'
          strokeWidth='5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M3 3.48242L54 54.4824'
          stroke='white'
          strokeWidth='5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  );
};

const backgroundStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: COLOR.BLACK_OPACITY_300,
  zIndex: 1000,
};

const profilfeImgStyle = {
  borderRadius: '50%',
  width: '100px',
  height: '100px',
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
};

const fontStyle = {
  fontSize: '24px',
  fontFamily: Font.FontKor,
  fontWeight: '700',
};

const formStyle = {
  marginTop: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
};

const lableStyle = {
  marginBottom: '12px',
};

const inputStyle = {
  width: '90%',
  border: 'none',
  background: COLOR.POTZ_PINK_200,
  paddingTop: '12px',
  paddingBottom: '12px',
  paddingLeft: '12px',
  borderRadius: '12px',
};

function UserProfileEditModal(props) {
  let { setVisible, user } = props;
  let [selectImg, setSelectImg] = useState();
  let navigate = useNavigate();

  //프로필 편집데이터 전송
  async function userProfileModal(formData) {
    console.log('formData', formData);
    try {
      const res = await fetch(`http://localhost:5000/users/update-profile`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  console.log(user);

  return (
    <div style={backgroundStyle}>
      <div
        onClick={() => {
          setVisible(false);
        }}
      >
        <IconClose></IconClose>
      </div>
      <OrderMessageWrapper>
        <div style={containerStyle}>
          {selectImg ? (
            <img style={profilfeImgStyle} src={selectImg}></img>
          ) : (
            <img
              style={profilfeImgStyle}
              src={
                user.profile.imageUrl.startsWith('https')
                  ? user.profile.imageUrl
                  : `http://localhost:5000/${user.profile.imageUrl}`
              }
            ></img>
          )}
          <div style={fontStyle}>{user.name}</div>
        </div>

        <form
          style={formStyle}
          onSubmit={(e) => {
            e.preventDefault();
            const file = e.target.image.files[0];
            const userName = e.target.querySelector(
              'input[name="userName"]'
            ).value;

            console.log('file, userName', file, userName);

            if (!file || !userName) {
              alert('파일 선택과 입력창을 모두 채워주세요.');
              return;
            } else {
              const formData = new FormData();
              formData.append('image', file);
              formData.append('userName', userName);

              userProfileModal(formData);
            }
          }}
          encType='multipart/form-data'
        >
          <div>
            <label style={lableStyle}>프로필 이미지 변경</label>
            <input
              name='image'
              type='file'
              accept='image/*'
              onChange={(e) => {
                e.preventDefault();
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  setSelectImg(reader.result);
                };
                if (image) {
                  reader.readAsDataURL(image);
                }
              }}
            ></input>
          </div>
          <div>
            <label style={lableStyle}>프로필 이름 변경</label>
            <input
              name='userName'
              placeholder={user.name}
              style={inputStyle}
            ></input>
          </div>
          <ButtonBg
            type='submit'
            backgroundColor={COLOR.POTZ_PINK_DEFAULT}
            hoverColor={COLOR.POTZ_PINK_600}
            fontColor={COLOR.WHITE}
          >
            저장
          </ButtonBg>
        </form>
      </OrderMessageWrapper>
    </div>
  );
}

export default UserProfileEditModal;
