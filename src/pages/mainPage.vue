<template>
  <el-row>
    <!--header-->
    <el-row>
      <top-bar></top-bar>
    </el-row>
    <!--content-->
    <el-row class="app-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-row>
    <!-- footer -->
    <el-row>
      <div class="app-footer">
        <p>@Copyright at 2019</p>
      </div>
    </el-row>
  </el-row>
</template>
<script>
import topBar from "../components/topBar.vue";

export default {
  name: "mainPage",
  components: {
    topBar
  },
};
</script>
<style >
.app-content {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 100px; */
}
/*footer*/
.app-footer {
  width: 100%;
  height: 60px;
  background: #ddd;
  margin-top: 80px;
  margin-left: -7px;
  margin-bottom: -7px;
  padding-right: 7px;
  border-bottom: 4px solid rgb(183, 183, 183);
}
.app-footer p {
  text-align: center;
  line-height: 60px;
}
</style>