import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import COLOR from '../utility/Color';
import Font from '../utility/Font';

const InputField = styled.input`
  border: 2px ${COLOR.POTZ_PINK_DEFAULT} solid;
  background-color: ${COLOR.POTZ_PINK_100};
  width: calc(100% - 30px);
  font-size: 16px;
  height: 46px;
  padding-left: 20px;
  border-radius: 50px;
`;

const ButtonSubmitStyle = styled.input`
  font-family: ${Font.FontKor};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  border: none;
  border-radius: 12px;
  display: flex;
  width: 100%;
  height: 46.667px;
  padding: 9.333px 18.667px;
  justify-content: center;
  align-items: center;
  gap: 11.667px;
  background-color: ${COLOR.POTZ_PINK_DEFAULT};
  color: ${COLOR.WHITE};
  cursor: grab;

  // 호버 상태 스타일
  &:hover {
    background-color: ${COLOR.POTZ_PINK_600};
  }
`;

const InputFileStyle = styled.div`
  background-color: ${COLOR.POTZ_PINK_200};
  width: 175px;
  height: 175px;
  border-radius: 14px;
  cursor: grab;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputStyle = styled.input`
  background-color: ${COLOR.WHITE};
  border: ${COLOR.POTZ_PINK_DEFAULT} 2px solid;
  border-radius: 50px;
  color: ${COLOR.POTZ_PINK_DEFAULT};
  font-family: ${Font.FontKor};
  font-weight: 700;
  cursor: grab;
  padding: 6px;
  &:hover {
    background-color: ${COLOR.POTZ_PINK_300};
  }
`;

function NamingCommunity(props) {
  //컨텍스트 api
  const location = useLocation();
  const navigate = useNavigate();

  console.log('state', location.state.data);

  const [file, setFile] = useState('');
  const [imgUrl, setImgUrl] = useState();
  let [count, setCount] = useState(0);

  let { communityType, user1 } = props;

  let userDatas = [user1];
  let communityTypes = [communityType];

  const [formDatas, setFormDatas] = useState({
    name: '',
    communityTypes: location.state.data,
    members: userDatas,
    longitude: null,
    latitude: null,
    posts: 0,
    imageUrl: null,
  });

  useEffect(() => {
    const getGeolocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormDatas((prevFormDatas) => ({
            ...prevFormDatas,
            latitude,
            longitude,
          }));
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    };
    getGeolocation();
  }, []);

  useEffect(() => {
    async function fetchUserDatas() {
      try {
        const response = await fetch('http://localhost:5000/user');
        const data = await response.json();
        console.log(data);
        setFormDatas({
          ...formDatas,
          members: data,
        });
        console.log('폼데이터', formDatas);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserDatas();
  }, []);

  console.log(communityTypes);

  const inputChangeHandler = (e) => {
    setFormDatas((formData) => ({
      ...formData,
      name: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (count < 1) {
      alert('먼저 이미지 저장 버튼을 눌러서 이미지를 업로드해주세요.');
    } else {
      if (formDatas.longitude !== null && formDatas.latitude !== null) {
        console.log(formDatas);
        try {
          const response = await fetch('http://localhost:5000/communities', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formDatas),
          });

          if (response.ok) {
            //새로 생성된 커뮤니티 데이터 받아서 넘겨주기
            const responseData = await response.json();
            console.log('새로 생성된 커뮤니티', responseData);
            localStorage.setItem('communityDataID', responseData.id);
            navigate(`/community/${responseData.id}`);
            console.log('폼 데이터 및 파일 전송 완료🚀');
          }
        } catch (error) {
          console.error('에러:', error);
        }
      } else {
        alert('위치 정보를 먼저 가져와주세요.');
      }
    }
  };

  const InputFile = () => {
    const ImgIcon = () => {
      return (
        <svg
          width='42'
          height='43'
          viewBox='0 0 42 43'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M13.4158 38.666H28.5824C34.5154 38.666 38.5 34.5043 38.5 28.3118V14.0203C38.5 7.82771 34.5154 3.66602 28.5842 3.66602H13.4158C7.48457 3.66602 3.5 7.82771 3.5 14.0203V28.3118C3.5 34.5043 7.48457 38.666 13.4158 38.666ZM14.873 19.416C12.4604 19.416 10.5 17.453 10.5 15.041C10.5 12.629 12.4604 10.666 14.873 10.666C17.2839 10.666 19.246 12.629 19.246 15.041C19.246 17.453 17.2839 19.416 14.873 19.416ZM34.6864 26.3009C35.2724 27.8035 34.968 29.6094 34.3415 31.0976C33.5989 32.8674 32.177 34.2075 30.3856 34.7926C29.5902 35.0527 28.756 35.1665 27.9237 35.1665H13.1751C11.7075 35.1665 10.4088 34.8143 9.34413 34.1587C8.67718 33.747 8.55928 32.797 9.05377 32.1812C9.88086 31.1518 10.6974 30.1187 11.521 29.0767C13.0907 27.0829 14.1483 26.505 15.3238 27.0124C15.8007 27.2219 16.2793 27.5362 16.7721 27.8685C18.0849 28.7606 19.9097 29.9869 22.3136 28.6559C23.9586 27.7346 24.9127 26.1542 25.7435 24.778L25.7574 24.755C25.8163 24.6584 25.8746 24.5618 25.9328 24.4656L25.9329 24.4655C26.2121 24.0035 26.4876 23.5477 26.7992 23.1278C27.1899 22.6022 28.6381 20.9588 30.514 22.1291C31.7089 22.8659 32.7137 23.8628 33.7889 24.9301C34.199 25.3383 34.4911 25.8024 34.6864 26.3009Z'
            fill='#FF7971'
          />
        </svg>
      );
    };

    const filestyle = {
      display: 'none',
    };

    const onChange = (e) => {
      const selectedFile = e.target.files[0];

      if (selectedFile) {
        const imageUrl = URL.createObjectURL(selectedFile);
        setFile(selectedFile);
        setImgUrl(imageUrl);
      }
    };

    const onSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();

      //FormData 객체에 새로운 필드 추가 //multer에서 다룰
      formData.append('image', file);

      if (!file) {
        alert('먼저 이미지 파일을 선택해주세요.');
      } else {
        try {
          setCount(count + 1);
          const response = await fetch(
            'http://localhost:5000/communities/photo',
            {
              method: 'POST',
              body: formData,
              credentials: 'include',
            }
          );

          if (response.ok) {
            const data = await response.json();
          } else {
            console.log('서버 응답 오류:', response.statusText);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    return (
      <form style={formStyle2} onSubmit={onSubmit}>
        <label>
          <InputFileStyle>
            {imgUrl ? (
              <img
                src={imgUrl}
                alt='Preview'
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              />
            ) : (
              <ImgIcon />
            )}

            <input
              type='file'
              style={filestyle}
              name='image'
              accept='image/*'
              onChange={onChange}
            ></input>
          </InputFileStyle>
        </label>
        <InputStyle type='submit' value={'이미지 저장'}></InputStyle>
      </form>
    );
  };

  const style1 = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '60px',
    height: '100vh',
  };

  const formStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  };

  const formStyle2 = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const inputStyles = {
    position: 'relative',
    bottom: '430px',
  };

  return (
    <div className='potz_container'>
      <div className='contents_container'>
        <div style={style1}>
          <InputFile></InputFile>
          <form onSubmit={submitHandler} style={formStyle}>
            <InputField
              style={inputStyles}
              onChange={inputChangeHandler}
              placeholder='공동체 이름 입력'
              value={formDatas.name}
            ></InputField>
            {/* 수정된 부분: ButtonSubmitStyle을 <input>으로 변경 */}
            <ButtonSubmitStyle type='submit' value='공동체 만들기' />
          </form>
        </div>
      </div>
    </div>
  );
}

export default NamingCommunity;
