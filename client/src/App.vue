<template>
  <Header></Header>
  <router-view></router-view>
  <!-- <DeliveryCenterManage></DeliveryCenterManage> -->
  <Footer></Footer>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App" /> -->
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import "./assets/general_css/style.css";
import Login from './pages/Login.vue';
import Footer from './components/Footer.vue';
import CustomerSearching from './components/CustomerSearching.vue';
import Header from './components/Header.vue';
import Home from './pages/Home.vue';
import LeaderManageAccount from './components/LeaderManageAccount.vue';
import WarehouseManage from './components/WarehouseManage.vue';
import DeliveryCenterManage from './components/DeliveryCenterManage.vue';
export default {
  name: 'App',
  components: {
    Header,
    DeliveryCenterManage,
    WarehouseManage,
    Footer
}
}
</script>

<style></style>
