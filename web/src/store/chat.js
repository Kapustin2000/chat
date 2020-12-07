import io from 'socket.io-client';
import axios from 'axios';
import cookie from 'js-cookie';

export default {
    namespaced: true,

    state: {
        socket: io('http://localhost:8080', {
                auth: {
                    token:  `Bearer ${cookie.get('TOKEN')}`
                        //(context) => { return (context.rootState.Auth.token || "no token"); }
                }
        }),
        messages: [],
    },
    mutations: {
        SET_MESSAGES(state, messages) {
            state.messages = messages;
        },
        ADD_MESSAGE(state, message) {
            state.messages = [...state.messages, message];
        }
    },
    actions: {
        send(context, message) {
            return new Promise((resolve, reject) => {
                axios.post('/chat', message)
                    .then(resolve)
                    .catch(err => {
                        reject(err);
                    })
            });
        },
        fetchMessages(context) {
            return  new Promise((resolve, reject) => {
                axios.get('/chat')
                    .then(response => {
                        let messages = response.data;
                        context.commit('SET_MESSAGES', messages);
                    })
                    .then(resolve)
                    .catch(err => {
                        reject(err);
                    })
            });
        },
        initChat(context) {

            let { getters } = context;

            context.dispatch('fetchMessages');

            getters.socket.on('MESSAGE', (data) => {
                context.commit('ADD_MESSAGE', data);
            })
        }
    },
    modules: {
    },
    getters: {
        socket: state => state.socket,
        messages: state => state.messages
    }
}
