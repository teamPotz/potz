import styled from 'styled-components';
import COLOR from '../utility/Color';

function HomeDiscountModal({
  setVisible,
  discountInfo,
  totalOrderPrice,
  nextDeliveryFeeInfo,
}) {
  // console.log('다음 할인 정보', discountInfo);
  // console.log('전체 가격 정보', totalOrderPrice);

  return (
    <div style={backgroundStyle}>
      <div onClick={() => setVisible(false)}>
        <IconClose />
      </div>
      <Wrapper>
        <div style={fontStyle}>
          <span style={coloredFont2}>🎫쿠폰 할인 정보🎫</span>
          <br />
          {discountInfo ? (
            <div>
              <div>
                앞으로
                <span style={coloredFont}>
                  {new Intl.NumberFormat('ko-kr').format(
                    discountInfo.minAmount - totalOrderPrice
                  )}
                  원
                </span>
                만 주문비 채우면
              </div>

              <div>
                총
                {discountInfo.discount ? (
                  <span style={coloredFont}>
                    {new Intl.NumberFormat('ko-kr').format(
                      discountInfo.discount
                    )}
                    원
                  </span>
                ) : null}
                {discountInfo.discountRate ? (
                  <span style={coloredFont}>
                    {discountInfo.discountRate * 100} %
                  </span>
                ) : null}
                할인 쿠폰 적용
              </div>
            </div>
          ) : (
            <span>쿠폰 할인 정보가 없어요.</span>
          )}
        </div>
        <hr />
        <div style={fontStyle}>
          <span style={coloredFont2}>💰주문 금액별 배달비 할인 정보💰</span>
          <br></br>
          {nextDeliveryFeeInfo ? (
            <div>
              <div>
                <span>앞으로</span>
                <span style={coloredFont}>
                  {new Intl.NumberFormat('ko-kr').format(
                    nextDeliveryFeeInfo.minAmount - totalOrderPrice
                  )}
                  원
                </span>
                <span>만 주문비 채우면</span>
              </div>
              <div>
                <span>나누기 전 배달비</span>
                <span style={coloredFont}>
                  {new Intl.NumberFormat('ko-kr').format(
                    nextDeliveryFeeInfo.fee
                  )}
                  원
                </span>
                <span>으로 변경</span>
              </div>
            </div>
          ) : (
            <span>배달비 할인 정보가 없어요.</span>
          )}
        </div>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
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

const fontStyle = {
  color: COLOR.GRAY_400,
  fontWeight: '400',
};

const coloredFont = {
  color: COLOR.POTZ_PINK_600,
};

const coloredFont2 = {
  color: COLOR.GRAY_500,
  fontWeight: '700',
  fontSize: '18px',
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

export default HomeDiscountModal;
