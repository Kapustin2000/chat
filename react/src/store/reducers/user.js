import axios from '../../services/api/axios_conf';

const initialState = {
  data: null,
};

const user = function (state = initialState, { type, payload }) {
  switch (type) {
    case 'SET_USER':
      return {
        data: payload,
      };
    case 'LOGOUT':
      if (window.localStorage.TOKEN) {
        delete window.localStorage.TOKEN;
      }
      if (axios.defaults.headers.common['Authorization']) {
        axios.defaults.headers.common['Authorization'] = null;
      }
      return {
        data: null,
      };
    default:
      return state;
  }
};

export default user;
