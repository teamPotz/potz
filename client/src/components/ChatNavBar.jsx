import COLOR from '../utility/Color';
import ChatInput from './ChatInput';
import ChatRequireButton from './ChatRequireButton';

function ChatNavBar(props) {
  const styles = {
    Wrapper: {
      position: 'fixed',
      bottom: 0,
      width: '420px',
      height: '190.17px',
    },
    ChatBox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      gap: '56px',
      position: 'absolute',
      width: '100%',
      height: '128.33px',
      left: '0px',
      bottom: '61.83px',
      background: `${COLOR.WHITE}`,
      boxShadow: '0px 26.8333px 61.8333px rgba(0, 0, 0, 0.11)',
    },
    RequireButtonBox: {
      display: 'flex',
      alignItems: 'center',
      padding: '0px',
      gap: '9.33px',
      width: '70px',
      height: '100%',
    },
    ChatInputBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: '420px',
      height: '61.83px',
      bottom: '0',
      background: `${COLOR.WHITE}`,
    },
  };

  return (
    <>

          {props.isBangJang ? (
                 <div style={styles.Wrapper}>
                 <div style={styles.ChatBox}>
              <div style={styles.RequireButtonBox}>
                <ChatRequireButton
                  imageURL={'images/components/icon-coin-mono.png'}
                  text={'정산 요청'}
                ></ChatRequireButton>
              </div>

              <div style={styles.RequireButtonBox}>
                <ChatRequireButton
                  imageURL={'images/components/Union.png'}
                  text={'메뉴 요청'}
                ></ChatRequireButton>
              </div>

              <div style={styles.RequireButtonBox}>
                <ChatRequireButton
                  imageURL={'images/components/Arrow - Right Square.png'}
                  text={'수령 요청'}
                ></ChatRequireButton>
              </div>
            </div>
            </div>
          ) : (
            <div style={styles.Wrapper}>
            <div style={styles.ChatBox}>
            <div style={styles.RequireButtonBox}>
              <ChatRequireButton
                imageURL={'images/components/Union.png'}
                text={'메뉴 요청'}
              ></ChatRequireButton>
            </div>
            </div>
            </div>
          )}
        <div style={styles.ChatInputBox}>
          <ChatInput />
        </div>
 
    </>
  );
}

export default ChatNavBar;
