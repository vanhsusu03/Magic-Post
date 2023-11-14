<template>
  <Header></Header>
  <RouterView></RouterView>
</template>

<script>
import "./assets/general_css/style.css";
import Header from './components/Header.vue';
export default {
  name: 'App',
  components: {
    Header,
  }
}
</script>

<style></style>
