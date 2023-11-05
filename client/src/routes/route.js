import { createWebHistory, createRouter } from "vue-router";

// import pages and components
import Home from '../pages/Home.vue';


import store from '@/store/index';

const routes = [
    { path: "/", name: "Home", component: Home },
    //addition in here
]

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;
