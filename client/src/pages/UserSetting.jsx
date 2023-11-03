import styled from 'styled-components';
import { NavBar4 } from '../components/NavBars';

const UserSetting = () => {
    const Setting = styled.div`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0px;
        
        position: absolute;
        width: 420px;
        height: 61.83px;
    `;
  const styles = {
    Wrapper: {
        position: 'relative',
        width: '420px',
        height: '100vh',
    },
    TopMenu: {
        width: '420px',
        height: '70px',
        fontFamily: 'Noto Sans CJK KR',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '18.6667px',
        lineHeight: '150%',
    },
    Content: {
        width: '420px',
        height: '723.33px',
    },
    NavBar: {
        width: '420px',
        height: '56px',
        left: '0px',
        bottom: '0px',
    }

  }
  return (
    <>
        <div style={styles.Wrapper}>
            <div style={styles.TopMenu}>

            </div>
            <div style={styles.Content}>
                <Setting></Setting>
            </div>
            <div style={styles.NavBar}>
                <NavBar4/>
            </div>
        </div>
    </>
  );
};

export default UserSetting;
