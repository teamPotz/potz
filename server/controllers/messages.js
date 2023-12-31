import { createMessage } from '../services/messages.js';

export async function sendMessage(req, res, next) {
  try {
    const { type, potId, content } = req.body;

    if (!potId || !content) {
      res.status(400);
      throw new Error('no potId or content');
    }

    const message = await createMessage(
      null,
      type,
      potId,
      req.user.id,
      content
    );
    // console.log(message);

    const io = req.app.get('io');
    io.of('/chat').to(potId.toString()).emit('message', message);

    io.of('/room').emit('updateLastMessage', {
      potId,
      message,
    });

    console.log('message sent');
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
