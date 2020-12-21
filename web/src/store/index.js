import { createStore } from 'vuex'
import Auth from './auth';
import Todo from './todo';
import Chat from './chat';
import Game from './game';


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
      Chat,
      Game
  }
})
