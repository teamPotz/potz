import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

function ChatProvider({ children }) {
  const [joinedPots, setJoinedPots] = useState([]);
  const [selectedPot, setSelectedPot] = useState();
  const [notifications, setNotifications] = useState([]);

  async function getJoinedPots() {
    try {
      const res = await fetch('http://localhost:5000/delivery-pots/', {
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('get pots error');
      }
      const data = await res.json();
      console.log('potsssss', data);
      setJoinedPots(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function joinPot(potId, user, socket) {
    try {
      const res = await fetch(
        `http://localhost:5000/delivery-pots/${potId}/join`,
        {
          method: 'PATCH',
          credentials: 'include',
        }
      );
      if (!res.ok) {
        throw new Error('enter chat room error');
      }
      const data = await res.json();
      socket.emit('join', { potId: potId, user });
      // setSelectedPot(pot);
      // setJoinedPots((prevPots) =>
      // prevPots.find((p) => p.id === pot.id) ? prevPots : [...prevPots, pot]
      // );
    } catch (error) {
      console.error(error);
    }
  }

  async function leavePot(potId, user, socket) {
    try {
      const res = await fetch(
        `http://localhost:5000/delivery-pots/${potId}/leave`,
        {
          method: 'PATCH',
          credentials: 'include',
        }
      );
      if (!res.ok) {
        throw new Error('leave pot error');
      }
      socket.emit('exit', { potId, user });
      const data = res.json();
      setSelectedPot(null);
      setJoinedPots((prevPots) => [...prevPots.filter((p) => p.id !== potId)]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ChatContext.Provider
      value={{
        joinedPots,
        setJoinedPots,
        selectedPot,
        setSelectedPot,
        notifications,
        setNotifications,
        getJoinedPots,
        joinPot,
        leavePot,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('ChatContext was used outside ChatProvider');
  }
  return context;
}

export { ChatProvider, useChat };
