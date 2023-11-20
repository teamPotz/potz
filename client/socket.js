import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  import.meta.env.NODE_ENV === 'production'
    ? undefined
    : 'http://localhost:5000/chat';

export const socket = io(URL, { autoConnect: false });
