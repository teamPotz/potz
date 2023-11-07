import ButtonSm from './ButtonSM';
import COLOR from '../utility/Color';

function SelectMenu() {
  const styles = {
    background: {
      width: '277.67px',
      height: '308px',
      padding: '11.6667px 18.6667px 18.6667px',
      backgroundColor: `${COLOR.WHITE}`,
      borderRadius: '14px',

      boxSizing: 'border-box',
    },
    box: {
      width: '100%',
      height: '100%',
      gap: '11.67px',
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      width: '113.17px',
      height: '28px',
      display: 'flex',
      flexDirection: 'row',
      gap: '11.67px',
    },
    content: {
      width: '240.33px',
      height: '148.17px',
      boxSizing: 'border-box',
      border: `1.16667px solid #EDEDED`,
      borderRadius: '9.33333px',
    },
  };
  return (
    <div style={styles.background}>
      <div style={styles.box}>
        <div style={styles.title}>
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
              d='M25.8497 8.37977C25.3834 7.8321 24.9171 7.58208 24.206 7.58208H8.46244C8.0894 7.58208 7.7863 7.29633 7.75133 6.91415L7.52984 4.24722C7.49486 3.84242 7.20342 3.51024 6.80707 3.43762L4.02673 3.01019C3.54877 2.93757 3.09413 3.26022 3.01252 3.74717C2.93092 4.22341 3.25733 4.68774 3.72364 4.77108L5.48393 5.08064L6.55643 18.0593C6.68466 19.6309 7.96699 20.8441 9.51745 20.8441H22.2359C23.7164 20.8441 24.9754 19.738 25.1852 18.2367L26.2927 10.4264C26.3976 9.71324 26.316 8.92745 25.8497 8.37977ZM7.55916 24.5356C7.55916 23.5355 8.35188 22.7259 9.33112 22.7259C10.2987 22.7259 11.0914 23.5355 11.0914 24.5356C11.0914 25.5238 10.2987 26.3334 9.33112 26.3334C8.35188 26.3334 7.55916 25.5238 7.55916 24.5356ZM20.6739 24.5356C20.6739 23.5355 21.4666 22.7259 22.4459 22.7259C23.4134 22.7259 24.2062 23.5355 24.2062 24.5356C24.2062 25.5238 23.4134 26.3334 22.4459 26.3334C21.4666 26.3334 20.6739 25.5238 20.6739 24.5356Z'
              fill='#FFAAA5'
            />
          </svg>
          <div>메뉴 선정</div>
        </div>
        <div style={styles.content}></div>
        <div>총 금액 8500원</div>
        <div>
          <ButtonSm
            backgroundColor={COLOR.POTZ_PINK_DEFAULT}
            hoverColor={COLOR.POTZ_PINK_600}
            fontColor={COLOR.WHITE}
          >
            메뉴 확인
          </ButtonSm>
        </div>
      </div>
    </div>
  );
}

export default SelectMenu;
