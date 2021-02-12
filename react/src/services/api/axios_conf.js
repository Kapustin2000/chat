import axios from 'axios';
import store from '../../store/store';
import { logoutAction } from '../../store/actions/user';
const axiosInstance = axios.create({
  baseURL: 'https://api.chat.coelix.online/api',
  responseType: 'json',
});

let access_token = window.localStorage.TOKEN;
axiosInstance.defaults.headers.common[
  'Authorization'
] = `Bearer ${access_token}`;

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(logoutAction());
    }
    return error;
  }
);

export default axiosInstance;
