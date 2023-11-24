<template>
  <Header></Header>
  <LeaderManageAccount></LeaderManageAccount>
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
export default {
  name: 'App',
  components: {
    HelloWorld,
    Login,
    Footer,
    CustomerSearching,
    Header,
    Home,
    LeaderManageAccount
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
