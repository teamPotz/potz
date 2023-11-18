import { Server } from 'socket.io';

export default function (server, app) {
  const io = new Server(server, {
    cors: { origin: 'http://localhost:5173' },
  });
  app.set('io', io);
  const chat = io.of('/chat');

  chat.on('connection', (socket) => {
    console.log('a user connected chat', socket.id);
    // console.log(socket.request.headers.referer);

    socket.on('join', ({ potId, user }) => {
      // console.log(potId, user);
      console.log(potId);
      socket.potId = potId;
      socket.name = user.name;

      socket.join(potId);
      socket.to(potId).emit('join', {
        sender: 'system',
        content: `${user.name}님이 입장하셨습니다`,
      });
    });

    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected`);
      socket.to(socket.potId).emit('exit', {
        sender: 'system',
        content: `${socket.name}님이 퇴장하셨습니다.`,
      });
    });
  });

  // io.on('connection', (socket) => {
  //   console.log('a user connected', socket.id);
  //   socket.on('disconnect', () => {
  //     console.log('user disconnected', socket.id);
  //   });
  // });
}
