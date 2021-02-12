const io = require('socket.io-client');

const socketInit = () => ({
  type: 'INIT_SOCKET',
  payload: io('https://api.chat.coelix.online', {
    auth: {
      token: `Bearer ${window.localStorage.TOKEN}`,
      //(context) => { return (context.rootState.Auth.token || "no token"); }
    },
  }),
});

export { socketInit };
