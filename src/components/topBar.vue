<template>
  <el-row>
    <div class="app-header">
      <div class="app-header-inner">
        <el-col :span="6" style="padding-left:50px">
          <!-- 给logo图片添加路由,点击跳转到首页 -->
          <router-link :to="{path: '/'}">
            <img class="header-img" src="../assets/logo.png">
          </router-link>
        </el-col>
        <el-col :span="14" style="padding-left:10px">
          <!--搜索框-->
          <div style="margin-top: 20px;">
            <el-input placeholder="请输入内容" v-model="search" class="input-with-selct">
              <el-select v-model="select" slot="prepend">
                <el-option label="书名" value="1"></el-option>
                <el-option label="类型" value="2"></el-option>
                <el-option label="作者" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="searchf"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <ul>
            <li v-show="userName!==''" @click="user">{{userName}}</li>
            <li v-show="userName ==''" @click="userName='xuan'">登录/注册</li>
            <li v-show="userName!==''" @click="myList">我的订单</li>
            <li v-show="userName!==''" @click="shoppingCart">购物车</li>
          </ul>
        </el-col>
      </div>
    </div>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      select: "1",
      userName: "",
      search: ""
    };
  },
  methods: {
    searchf() {
      this.$router.push({
        path: "/searchList",
        query: {
          select: this.select,
          searchName: this.search
        }
      });
      //location.reload();
    },
    user() {},
    log() {
      this.$router.push({
        path: "/login"
      });
    },
    myList() {},
    shoppingCart() {}
  }
};
</script>

<style>
.app-header {
  width: 100%;
  height: 80px;
  background: #ddd;
  margin-left: 0px;
  padding-right: 0px;
  margin-top:-8px;
  border-bottom: 4px solid rgb(183, 183, 183);
  /*固定上边栏*/
}
.app-header-inner {
  width: 95%;
  margin: 0 auto;
}
.app-header .app-header-inner .header-img {
  width: 80px;
  height: 70px;
  margin-top: 5px;
  border-radius: 20px;
}
.el-input {
  width: 580px;
}
.el-select .el-input {
  width: 80px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.app-header .app-header-inner ul {
  float: right;
}
.app-header .app-header-inner ul li {
  display: inline-block;
  padding-top: 40px;
  font-size: 16px;
  font-family: "Courier New", Courier, monospace;
  cursor: pointer;
}
.app-header .app-header-inner ul li:hover {
  color: #f60;
}
</style>
