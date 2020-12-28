import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Chat from '@/views/chat/Chat.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    children: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        }
    ]
  },
  {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
  },
  {
      path: '/chat',
      name: 'chat',
      component: Chat,
      meta: {
          auth: true,
          roleAccess: 1
      }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
    const { auth, roleAccess, forUnauthorized } = to.meta;

    let user;
    const userFetched = store.getters['Auth/userFetched'];

    if(!userFetched)
        await store.dispatch('Auth/fetchUser');

    user = store.getters['Auth/user'];

    if(user && forUnauthorized) {
        console.log(user && forUnauthorized, 2);
        return next({ name: 'chat' });
    }

    if(!auth) {
        console.log(auth, 3);
        return next();
    }

    if(!user){
        console.log(" cam here, ", user);
        return next({ name: 'Login' });
    }

    console.log(roleAccess);

    return next();
});

export default router
