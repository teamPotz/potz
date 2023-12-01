import styled from 'styled-components';
import GoBack from '../components/goBack';
import COLOR from '../utility/Color';
import Font from '../utility/Font';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const BoxComp = styled.div`
  width: 327px;
  height: 111px;
  padding: 16.333px 18.667px;
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: space-between;
  border-radius: 7px;
  background: ${COLOR.WHITE};
  box-shadow: 0px 3.5px 8.167px 0px rgba(0, 0, 0, 0.07);
`;

const FontBg = styled.div`
  font-family: ${Font.FontKor};
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
`;

const FontMd = styled.div`
  font-family: ${Font.FontKor};
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  display: flex;
  margin-left: auto;
`;

const FontSm = styled.span`
  font-family: ${Font.FontKor};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  color: ${(props) => props.color};
`;

const AlignColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const styles = {
  background: {
    backgroundColor: COLOR.POTZ_PINK_100,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '79.33px',
    gap: '9.33px',
  },
  image: {
    width: '80px',
    height: '80px',
    borderRadius: '4px',
    objectFit: 'cover',
    // backgroundColor: COLOR.POTZ_PINK_600,
  },
  alignDirectionCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  alignDirectionRow: {
    display: 'flex',
    flexDirection: 'Row',
  },
};

function MyOrderHistory() {
  const { user } = useAuth();
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const fetchUserOrderData = async () => {
      try {
        const response = await fetch('http://localhost:5000/users/user-order', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        console.log(data[0].deliveryPotHistoryAsMember);
        setMyOrders(myOrderdata(data[0].deliveryPotHistoryAsMember));
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserOrderData();
  }, []);

  //내 배달팟에서 내가 한 주문 필터링
  const myOrderdata = (datas) => {
    let arr = [];
    datas.map((data) => {
      data.deliveryPot.orders.map((order) => {
        if (order.userId === user.id) {
          arr.push(order);
        }
      });
    });
    return arr;
  };

  useEffect(() => {
    console.log('내가 한 주문', myOrders);
  }, [myOrders]);

  return (
    <div className='potz_container' style={styles.background}>
      <GoBack text='결제 내역'></GoBack>
      <div className='contents_container' style={styles.contentContainer}>
        {myOrders &&
          myOrders.map((myOrder, index) => {
            return (
              <BoxComp key={index}>
                <img src={myOrder.imageUrl} style={styles.image}></img>
                <AlignColumn>
                  <FontSm>주문날짜 : {myOrder.updatedAt}</FontSm>
                  <div>
                    <FontBg>{myOrder.menuName}</FontBg>
                    <FontSm color={COLOR.GRAY_400}>
                      갯수 {myOrder.quantity} | 주문가격 {myOrder.price}
                    </FontSm>
                  </div>
                  <FontMd>
                    총 결제 금액 : {myOrder.quantity * myOrder.price}원
                  </FontMd>
                </AlignColumn>
              </BoxComp>
            );
          })}
      </div>
    </div>
  );
}

export default MyOrderHistory;