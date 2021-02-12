const initialState = {
  io: null,
};

const socket = function (state = initialState, { type, payload }) {
  switch (type) {
    case 'INIT_SOCKET':
      return {
        io: payload,
      };
    case 'LOGOUT':
      return {
        io: null,
      };
    default:
      return state;
  }
};

export default socket;
