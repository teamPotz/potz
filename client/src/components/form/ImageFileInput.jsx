import styled from 'styled-components';
import COLOR from '../../utility/Color';

const InputFileStyle = styled.div`
  background-color: ${COLOR.POTZ_PINK_100};
  width: ${(props) => props.width || '100px'};
  height: ${(props) => props.height || '100px'};
  border-radius: 14px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${COLOR.POTZ_PINK_200};
  }
`;

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

function ImageFileInput({ file, onChange, width, height }) {
  return (
    <label>
      <InputFileStyle width={width} height={height}>
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt='preview'
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
          style={{ display: 'none' }}
          name='image'
          accept='image/*'
          onChange={onChange}
        />
      </InputFileStyle>
    </label>
  );
}

export default ImageFileInput;
