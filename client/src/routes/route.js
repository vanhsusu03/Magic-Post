import { createWebHistory, createRouter } from 'vue-router';

// import pages and components
import Home from '../pages/Home.vue';
import AboutUs from '../pages/AboutUs.vue';
import Contact from '../pages/Contact.vue';
import LeaderManageAccount from '../components/LeaderManageAccount.vue';
import Login from '../pages/Login.vue';
import CustomerSearching from '../components/CustomerSearching.vue';
import ManagerHome from '../pages/ManagerHome.vue';
import store from '@/store/index';

const routes = [
    { path: "/", name: "Home", component: Home }, 
    { path: "/manager", name: "ManagerHome", component: ManagerHome }, 
    { path: "/aboutus", name: "About Us", component: AboutUs }, 
    { path: "/customer/searching", name: "CustomerSearching", component: CustomerSearching}, 
    { path: "/contact", name: "Contact", component: Contact },
    { path: "/leader/manage/account", name: "LeaderManageAccount", component: LeaderManageAccount},
    { path: "/login", name: "Login", component: Login}
    //addition in here
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;