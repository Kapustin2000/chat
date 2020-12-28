import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import cookie from 'js-cookie';

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT || 'http://localhost:8080/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.request.use(config => {
    const token = cookie.get('TOKEN');

    if(token)
        config.headers.Authorization = `Bearer ${token}`;

    return config;
});

createApp(App).use(store).use(router).mount('#app');
