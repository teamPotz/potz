import { Server } from 'socket.io';
import { getParticipantsByPotId } from './services/deliveryPots.js';
import { getSocketId, setSocketId } from './services/users.js';

export default function (server, app) {
  const io = new Server(server, {
    cors: { origin: 'http://localhost:5173' },
  });
  app.set('io', io);
  const chat = io.of('/chat');

  let users = [];

  function addUser(userId, socketId) {
    const userExists = users.some((user) => user.userId === userId);
    if (userExists) return;

    users.push({ userId, socketId });
  }

  function removeUser(socketId) {
    users = users.filter((user) => user.socketId === socketId);
  }

  chat.on('connection', (socket) => {
    // console.log(socket.request.headers.referer);
    app.set('socket', socket);
    console.log(`${socket.id} connected to chat namespace`);

    socket.on('setUserId', (userId) => {
      addUser(userId, socket.id);
      console.log('users', users);
    });

    socket.on('join', async ({ potId, user }) => {
      socket.join(potId);
      console.log(`${socket.id}(${user.name}, ${user.id}) joined pot ${potId}`);
    });

    socket.on('exit', ({ potId, user }) => {
      socket.leave(potId);
      console.log(`${socket.id} leaved pot ${potId}`);

      // socket.to(potId).emit('message', {
      //   sender: 'system',
      //   content: `${user.name}님이 퇴장하셨습니다`,
      // });
    });

    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected`);
      removeUser(socket.id);
      console.log('users', users);
      // todo : 연결상태 종료
      // socket.to(socket.potId).emit('exit', {
      //   sender: 'system',
      //   content: `${socket.name}님이 퇴장하셨습니다.`,
      // });
    });
  });

  // io.on('connection', (socket) => {
  //   console.log('a user connected', socket.id);
  //   socket.on('disconnect', () => {
  //     console.log('user disconnected', socket.id);
  //   });
  // });
}
