import COLOR from '../../../utility/Color';

function CartIcon({ fill }) {
  return (
    <svg
      width='29'
      height='29'
      viewBox='0 0 29 29'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M25.8497 8.37977C25.3834 7.8321 24.9171 7.58208 24.206 7.58208H8.46244C8.0894 7.58208 7.7863 7.29633 7.75133 6.91415L7.52984 4.24722C7.49486 3.84242 7.20342 3.51024 6.80707 3.43762L4.02673 3.01019C3.54877 2.93757 3.09413 3.26022 3.01252 3.74717C2.93092 4.22341 3.25733 4.68774 3.72364 4.77108L5.48393 5.08064L6.55643 18.0593C6.68466 19.6309 7.96699 20.8441 9.51745 20.8441H22.2359C23.7164 20.8441 24.9754 19.738 25.1852 18.2367L26.2927 10.4264C26.3976 9.71324 26.316 8.92745 25.8497 8.37977ZM7.55916 24.5366C7.55916 23.5365 8.35188 22.7269 9.33112 22.7269C10.2987 22.7269 11.0914 23.5365 11.0914 24.5366C11.0914 25.5248 10.2987 26.3344 9.33112 26.3344C8.35188 26.3344 7.55916 25.5248 7.55916 24.5366ZM20.6739 24.5366C20.6739 23.5365 21.4666 22.7269 22.4459 22.7269C23.4134 22.7269 24.2062 23.5365 24.2062 24.5366C24.2062 25.5248 23.4134 26.3344 22.4459 26.3344C21.4666 26.3344 20.6739 25.5248 20.6739 24.5366Z'
        fill={fill || COLOR.POTZ_PINK_400}
      />
    </svg>
  );
}

export default CartIcon;
