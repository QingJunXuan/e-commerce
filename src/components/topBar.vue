<template>
  <el-row>
    <div class="app-header">
      <div class="app-header-inner">
        <el-col :span="4">
          <!-- 给logo图片添加路由,点击跳转到首页 -->
          <router-link :to="{path: '/'}">
            <img class="header-img" src="../assets/logo.png">
          </router-link>
        </el-col>
        <el-col :span="12">
          <!--搜索框-->
          <div style="margin-top: 30px;">
            <el-input placeholder="请输入内容" v-model="search">
              <!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
              </el-select>-->
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <ul>
            <li v-show="userName!==''" @click="user">{{userName}}</li>
            <li v-show="userName ==''" @click="log">登录/注册</li>
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
      userName: '',
      search:'',

    };
  },
  methods: {
    user() {},
    log() {this.userName='xuan'},
    myList() {},
    shoppingCart() {}
  }
};
</script>

<style>
.app-header {
  width: 100%;
  height: 80px;
  background:#ddd;
  margin-left: -1px;
  padding-right: 4px;
  border-bottom: 4px solid rgb(183, 183, 183);
  /*固定上边栏*/
  position: fixed;
  top: 0px;
  z-index: 9999;
}
.app-header-inner {
  width: 90%;
  margin: 0 auto;
}
.app-header .app-header-inner .header-img {
  width: 80px;
  height: 70px;
  margin-top: 5px;
  border-radius: 20px;
}
.app-header .app-header-inner .el-input {
  width: 380px;
}

.app-header .app-header-inner ul {
  float: right;
}
.app-header .app-header-inner ul li {
  display: inline-block;
  line-height: 100px;
  font-size: 16px;
  font-family: "Courier New", Courier, monospace;
  cursor: pointer;
}
.app-header .app-header-inner ul li:hover {
  color: #f60;
}
</style>
