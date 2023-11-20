import '../../App.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { Link } from 'react-router-dom';
import LoadingPage from '../LoadingPage.jsx';
// import { socket } from '../../../socket.js';

function ChatRooms() {
  const { user, isLoading } = useAuth();
  const [deliveryPots, setDeliveryPots] = useState([]);

  useEffect(() => {
    async function getDeliveryPots() {
      try {
        const res = await fetch('http://localhost:5000/delivery-pots', {
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error('get delivery pots error');
        }
        const data = await res.json();
        console.log(data);
        setDeliveryPots(data);
      } catch (error) {
        console.error(error);
      }
    }
    getDeliveryPots();
  }, []);

  // useEffect(() => {
  //   socket.connect();
  // }, [user]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className='contents_container'>
      {user.name}&apos;s participating rooms
      <ul>
        {deliveryPots &&
          deliveryPots.map((pot) => (
            <li key={pot.id}>
              <Link
                to={`/chat/${pot.id}`}
                state={{ storeName: pot.post.storeName }}
              >
                {pot.post.storeName}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ChatRooms;
