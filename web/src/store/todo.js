import axios from 'axios';

export default {
    namespaced: true,
    state: {
        todo: []
    },
    mutations: {
        SET_TODO(state, todo) {
            state.todo = todo;
        },
        CREATE_TODO(state, todo) {
            state.todo.push(todo);
        }
    },
    actions: {
        create(context, todo) {
                return new Promise((resolve, reject) => {
                    axios.post('/todo', todo)
                        .then(response => {
                            let todo = response.data;
                            context.commit('CREATE_TODO', todo);
                        })
                        .then(resolve)
                        .catch(err => {
                            reject(err);
                        })
                });
        },
        fetchTodo(context) {
            return new Promise((resolve, reject) => {
               axios.get('/todo')
                   .then(response => {
                       let todo = response.data;
                       context.commit('SET_TODO', todo);
                   })
                   .then(resolve)
                   .catch(err => {
                       reject(err);
                   })
            });
        }
    },
    getters: {
        todo: state => state.todo
    }
};
