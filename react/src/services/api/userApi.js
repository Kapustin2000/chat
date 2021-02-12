import axios from '../api/axios_conf';

const userApi = {
  login: async ({ mail, pass }) => {
    try {
      const data = await axios.post('/auth/login', {
        email: mail,
        password: pass,
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  register: ({ mail, pass, name }) => {
    return axios.post('/auth/reg', {
      email: mail,
      password: pass,
      name,
    });
  },
  getUser: () => {
    return axios
      .get('/user')
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  setChatInfo: (id) => {
    return axios
      .post('/client/chat/join', { type: id })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log('Response error');
      });
  },
};

export default userApi;
