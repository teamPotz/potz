import COLOR from '../../../utility/Color';

function UserIcon({ fill, width, height }) {
  return (
    <svg
      width={width || '29'}
      height={height || '28'}
      viewBox='0 0 29 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M20.6762 8.50639C20.6762 11.9329 17.9288 14.6805 14.4999 14.6805C11.0721 14.6805 8.32357 11.9329 8.32357 8.50639C8.32357 5.07986 11.0721 2.3335 14.4999 2.3335C17.9288 2.3335 20.6762 5.07986 20.6762 8.50639ZM14.4998 25.6667C9.43927 25.6667 5.1665 24.8442 5.1665 21.6708C5.1665 18.4963 9.46612 17.703 14.4998 17.703C19.5616 17.703 23.8332 18.5255 23.8332 21.6988C23.8332 24.8734 19.5336 25.6667 14.4998 25.6667Z'
        fill={fill || COLOR.GRAY_300}
      />
    </svg>
  );
}

export default UserIcon;
