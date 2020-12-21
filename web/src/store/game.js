import io from 'socket.io-client';
import axios from 'axios';
import cookie from 'js-cookie';

export default {
    namespaced: true,

    state: {
        io: null,
        messages: [],
    },
    mutations: {
        SETUP_IO(state, io) {
            state.io = io;
        }
    },
    actions: {
        initSocket(context) {

            let { getters } = context;

            context.commit('SETUP_IO', io('http://localhost:8080', {
                auth: {
                    token:  `Bearer ${cookie.get('TOKEN')}`
                    //(context) => { return (context.rootState.Auth.token || "no token"); }
                }
            }));


            getters.io.on('GAME_FOUND', (data) => {
                let token = { data };
                if(confirm("game found")) {
                    this.commit('accept', token);
                }
            });

            getters.io.on('GAME_STARTED', () => {
                alert("game started");
            });
        },
        accept(token) {
            return new Promise((resolve, reject) => {
                axios.post('/accept', {
                   token: token
                }).then(resolve)
                    .catch(err => {
                        reject(err);
                    })
            });
        },
        search() {
            return new Promise((resolve, reject) => {
                axios.post('/search')
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
        io: state => state.io,
        messages: state => state.messages
    }
}
