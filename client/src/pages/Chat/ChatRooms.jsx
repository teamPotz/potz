import '../../App.css';
import { Container, Row, Col } from 'react-bootstrap';
// import { socket } from '../../../socket.js';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { Link } from 'react-router-dom';
import LoadingPage from '../LoadingPage.jsx';

function ChatRooms() {
  const { user } = useAuth();
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

  if (!user) {
    return <LoadingPage />;
  }

  // return (
  //   <>
  //     {user.name}&apos;s participating rooms
  //     <ul>
  //       {deliveryPots &&
  //         deliveryPots.map((pot) => (
  //           <li key={pot.id}>
  //             <Link
  //               to={`/chat/${pot.id}`}
  //               state={{ storeName: pot.post.storeName }}
  //             >
  //               {pot.post.storeName}
  //             </Link>
  //           </li>
  //         ))}
  //     </ul>
  //   </>
  // );

  return (
    <Container className='background'>
      <Row className='row1'>
        <Col className='col1'>
          <div className='side_container'></div>
        </Col>
        <Col className='col2'>
          <div className='potz_container'>
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
          </div>
        </Col>
        <Col className='col3'>
          <div className='side_container'></div>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatRooms;
