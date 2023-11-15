import styled from 'styled-components';
import Font from '../utility/Font';
import COLOR from '../utility/Color';

const DeliveryComp = () => {
  const styles = {
    Wrapper: {
      position: 'relative',
      bottom: 0,
      width:'419px',
      height: '84.9px',
    },
    DeliveryFrameBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '0px',
      gap: '4.85px',
      width: '136.86px',
      height: '55.79px',
    },
    DeliveryTextBox1: {
      display: 'flex',
      flexDirection: 'row',
      alignItem: 'flex-start',
      padding: '0px',
      gap: '7.28px',
      width: '136.86px',
      height: '29.11',
    },
    DeliveryTextBox2: {
      display: 'flex',
      flexDirection: 'row',
      alignItem: 'flex-start',
      padding: '0px',
      gap: '4.85px',
      width: '129.78px',
      height: '21.83px',
    }, 
    ChatButtonBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent:'center',
      alignItems: 'center',
      padding: '9.70297px 19.4059px',
      gap: '12.13px',
      width: '154.81px',
      height: '48.51px',
      background: `${POTZ_PINK_DEFAULT}`,
      borderRadius: '12.1287px',
    },
    DeliveryFont1: {
      width:'75px',
      height: '29px',
      font:`${Font.FontKor}`,
      font-style: no
    }
  }

  

  return (
    <>
    </>
  );
};

export default DeliveryComp;