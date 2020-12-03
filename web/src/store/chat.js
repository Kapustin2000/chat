import io from 'socket.io-client';


export default {
    namespaced: true,

    state: {
        socket: io('http://localhost:8080'),
        messages: [
            {
                text: "I am new message"
            }
        ],
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
            context.commit('ADD_MESSAGE', message);
        },
        fetchMessages(context) {
            context.commit('SET_MESSAGES', []);
        },
        initChat({ getters}) {
            getters.socket.on('MESSAGE', (data) => {
                console.log(data);
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
