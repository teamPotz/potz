import styled from 'styled-components';
import COLOR from '../utility/Color';
import Font from '../utility/Font';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import GoogleImg from '../../public/images/socialLogin/Google.png';

const ButtonBgStyle = styled.button`
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
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.fontColor};
  cursor: grab;

  // 호버 상태 스타일
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

const BtnGoogle = () => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
};

export default BtnGoogle;
