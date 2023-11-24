// import pages and components
import Home from '../pages/Home.vue';
import AboutUs from '../pages/AboutUs.vue';
import Contact from '../pages/Contact.vue';
//import store from '@/store/index';

const routes = [
    { path: "/", name: "Home", component: Home }, 
    { path: "/aboutus", name: "About Us", component: AboutUs }, 
    // { path: "/searching", name: "Home", component: Home }, 
    { path: "/contact", name: "Contact", component: Contact },
    //addition in here
]