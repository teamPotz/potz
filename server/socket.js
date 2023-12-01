import { Server } from 'socket.io';
import { readMessage } from './services/messages.js';

export default function (server, app) {
  const io = new Server(server, {
    cors: { origin: 'http://localhost:5173' },
  });

  app.set('io', io);
  const chat = io.of('/chat');
  const room = io.of('/room');
  const community = io.of('/community');

  // chat namespace
  chat.on('connection', (socket) => {
    console.log(`${socket.id} connected to chat namespace`);
    // console.log(socket.request.headers.referer);

    // 채팅방 입장
    socket.on('join', ({ potId, user }) => {
      socket.join(potId);
      console.log(`${socket.id}(${user.name}, ${user.id}) joined pot ${potId}`);
    });

    socket.on('readMessage', async ({ potId, messageId, userId }) => {
      console.log('read', { potId, messageId, userId });

      try {
        const message = await readMessage(messageId, userId);

        chat.to(potId).emit('updateCount', {
          messageId,
          readBy: message.readBy,
        });
      } catch (error) {
        console.error(error);
      }
    });

    // 채팅방 퇴장
    socket.on('exit', ({ potId, user }) => {
      socket.leave(potId);
      console.log(`${socket.id} leaved pot ${potId}`);

      // 채팅방에서 사용자 제거
      // usersByRoom[potId] = usersByRoom[potId].filter(
      //   (user) => user.socketId !== socket.id
      // );

      // room.emit('updateUserlist', 'hihi');
      // console.log(usersByRoom);
      // room.emit('updateUserlist', usersByRoom);

      // 방에서 나간 사용자에게 현재 사용자 목록 전송
      // io.to(room).emit('updateUserList', usersByRoom[room]);

      // socket.to(potId).emit('message', {
      //   sender: 'system',
      //   content: `${user.name}님이 퇴장하셨습니다`,
      // });
    });

    // 연결 종료
    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected from chat namespace`);
      // removeUser(socket.id);
      // console.log('users', users);

      // 사용자가 속한 모든 방에서 나가게 함
      // for (const room in usersByRoom) {
      //   usersByRoom[room] = usersByRoom[room].filter(
      //     (user) => user.socketId !== socket.id
      //   );
      // }

      // room.emit('updateUserlist', usersByRoom);
      // console.log(usersByRoom);

      // const participants = socket.adapter.rooms.get(potId).size;
      // console.log({ potId, participants });
      // room.emit('participants', { potId, participants });

      // socket.to(socket.potId).emit('exit', {
      //   sender: 'system',
      //   content: `${socket.name}님이 퇴장하셨습니다.`,
      // });
    });
  });

  // room namespace
  room.on('connection', (socket) => {
    console.log(`${socket.id} connected to room namespace`);

    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected from room namespace`);
    });
  });

  // community namespace
  community.on('connection', (socket) => {
    console.log(`${socket.id} connected to community namespace`);

    socket.on('join', ({ communityId, user }) => {
      socket.join(communityId);
      console.log(
        `${socket.id}(${user.name}, ${user.id}) joined community ${communityId}`
      );
    });

    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected from community namespace`);
    });
  });

  // io.on('connection', (socket) => {
  //   console.log('a user connected', socket.id);
  //   socket.on('disconnect', () => {
  //     console.log('user disconnected', socket.id);
  //   });
  // });
}
