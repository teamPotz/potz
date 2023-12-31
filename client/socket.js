import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  import.meta.env.NODE_ENV === 'production'
    ? undefined
    : 'http://localhost:5000';

export const socket = io(`${URL}/chat`, { autoConnect: false });
export const roomSocket = io(`${URL}/room`, { autoConnect: false });
export const communitySocket = io(`${URL}/community`, { autoConnect: false });
