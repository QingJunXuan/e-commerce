<template>
  <div class="app">
    <!--header-->
    <top-bar></top-bar>
    <!--content-->
    <div class="app-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- footer -->
    <div class="app-footer">
      <p>@Copyright at 2019</p>
    </div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
//import index from "./pages/Index.vue";
import topBar from "./components/topBar.vue";

export default {
  name: "App",
  components: {
    topBar
  }
};
</script>

<style>
.app{
  margin-left: -7px;
  margin-right: -7px;
}
.app-content {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
}
/*footer*/
.app-footer {
  width: 100%;
  height: 60px;
  background: #ddd;
  margin-top: 80px;
  margin-left: -7px;
  padding-right:7px;
  border-bottom: 4px solid rgb(183, 183, 183);
}
.app-footer p{
  text-align: center;
  line-height: 60px;
}
</style>
