<template>
  <div class="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
//import index from "./pages/Index.vue";
//import topBar from "./components/topBar.vue";

export default {
  name: "App",
  components: {}
};
</script>

<style>
.app {
  margin-left: -7px;
  margin-right: -7px;
}
</style>
