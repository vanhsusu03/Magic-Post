import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/route.js';
import store from './store';
import "@/axios";

createApp(App).use(router).use(store).mount('#app')
