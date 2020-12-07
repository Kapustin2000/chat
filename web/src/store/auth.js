import axios from 'axios';
import cookie from 'js-cookie';

export default {
    namespaced: true,

    state: {
        user: null,
        token: null,
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        SET_TOKEN(state, token) {
            state.token = token;
        }
    },
    actions: {
        login(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('auth/login', credentials)
                    .then((response) => {
                        let { token } = response.data;
                        context.commit('SET_TOKEN', token);
                        cookie.set('TOKEN', token, { expires: 120 });
                    })
                    .then(resolve)
                    .then(() => {
                        context.dispatch('fetchUser');
                    })
                    .catch(err => {
                        reject(err);
                    })
            });
        },
        fetchUser(context) {
            return new Promise((resolve, reject) => {
                axios.get('/user')
                    .then(response => {
                        let user = response.data;
                        context.commit('SET_USER', user);
                    })
                    .then(resolve)
                    .catch(err => {
                        reject(err);
                    })
            });
        }
    },
    modules: {
    },
    getters: {
        user: state => state.user
    }
}
