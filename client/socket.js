import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL =
//   import.meta.env.NODE_ENV === 'production'
//     ? undefined
//     : `${import.meta.env.VITE_APP_API_URL}`;
const URL = 'http://localhost:80';

export const socket = io(`${URL}/chat`, {
  autoConnect: false,
  path: '/socket.io',
});
export const roomSocket = io(`${URL}/room`, {
  autoConnect: false,
  path: '/socket.io',
});
export const communitySocket = io(`${URL}/community`, {
  autoConnect: false,
  path: '/socket.io',
});
