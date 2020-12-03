import { createStore } from 'vuex'
import Auth from './auth';
import Todo from './todo';
import Chat from './chat';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
      Auth,
      Todo,
      Chat
  }
})
