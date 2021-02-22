const io = require('socket.io-client');

const socketInit = () => ({
  type: 'INIT_SOCKET',
  payload: io('http://mesichon.net/api', {
    auth: {
      token: `Bearer ${window.localStorage.TOKEN}`,
      //(context) => { return (context.rootState.Auth.token || "no token"); }
    },
  }),
});

export { socketInit };
