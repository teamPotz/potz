import COLOR from '../../utility/Color';

function NotificationBell({ counter }) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      <div style={{ display: 'flex' }}>
        <BellIcon fill={counter > 0 && COLOR.BLACK} />
      </div>
      {counter > 0 && <RedDot />}
    </div>
  );
}

const RedDot = () => {
  return (
    <div
      style={{
        position: 'absolute',
        right: '1px',
        top: '-2px',
        width: '6px',
        height: '6px',
        margin: '2px',
        borderRadius: '50%',
        border: '2.4px solid white',
        fontSize: '9px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: COLOR.POTZ_PINK_DEFAULT,
        color: COLOR.WHITE,
      }}
    />
  );
};

const BellIcon = ({ fill }) => {
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
        d='M22.1581 10.2621C22.1581 11.7273 22.5454 12.591 23.3976 13.5862C24.0434 14.3194 24.2498 15.2606 24.2498 16.2817C24.2498 17.3016 23.9147 18.2698 23.2434 19.0559C22.3645 19.9983 21.125 20.5999 19.86 20.7045C18.0268 20.8608 16.1924 20.9924 14.3338 20.9924C12.4739 20.9924 10.6407 20.9136 8.80755 20.7045C7.54137 20.5999 6.30186 19.9983 5.42411 19.0559C4.75276 18.2698 4.4165 17.3016 4.4165 16.2817C4.4165 15.2606 4.62406 14.3194 5.26874 13.5862C6.14764 12.591 6.50941 11.7273 6.50941 10.2621V9.76503C6.50941 7.80274 6.99872 6.51961 8.00633 5.26351C9.50441 3.43165 11.9057 2.33301 14.2816 2.33301H14.3859C16.8128 2.33301 19.2918 3.48453 20.7644 5.39512C21.7198 6.62537 22.1581 7.85444 22.1581 9.76503V10.2621ZM10.9192 23.4038C10.9192 22.8163 11.4584 22.5472 11.9569 22.4321C12.5402 22.3087 16.0941 22.3087 16.6773 22.4321C17.1759 22.5472 17.715 22.8163 17.715 23.4038C17.6861 23.9631 17.3579 24.459 16.9046 24.7739C16.3167 25.2321 15.6268 25.5224 14.9056 25.6269C14.5067 25.6786 14.1148 25.6798 13.7298 25.6269C13.0075 25.5224 12.3176 25.2321 11.7308 24.7727C11.2763 24.459 10.9482 23.9631 10.9192 23.4038Z'
        fill={fill || COLOR.GRAY_500}
      />
    </svg>
  );
};

export default NotificationBell;
