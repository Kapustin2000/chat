import userApi from '../../services/api/userApi';
import axios from '../../services/api/axios_conf';
import { socketInit } from './socket.js';

export const setUser = (data) => ({
  type: 'SET_USER',
  payload: data,
});

export const getUserAction = () => (dispatch) => {
  return userApi
    .getUser()
    .then((data) => {
      if (data) {
        dispatch(setUser(data));
      }
      return data;
    })
    .then((data) => {
      if (data) {
        dispatch(socketInit());
      }
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const loginAction = (credentials) => (dispatch) => {
  return userApi
    .login(credentials)
    .then(({ data }) => {
      const access_token = data?.access_token;
      window.localStorage.TOKEN = access_token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      return data;
    })
    .then((data) => {
      dispatch(getUserAction());
      return data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const registerAction = (data) => (dispatch) => {
  return userApi
    .register(data)
    .then((data) => data)
    .catch((err) => err);
};

export const logoutAction = () => ({
  type: 'LOGOUT',
  payload: null,
});
