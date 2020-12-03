import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Todo from '@/views/Todo.vue'
import Chat from '@/views/chat/Chat.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
  },
  {
      path: '/todo',
      name: 'Todo',
      component: Todo
  },
  {
      path: '/chat',
      name: 'chat',
      component: Chat
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
