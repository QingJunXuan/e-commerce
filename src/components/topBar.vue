<template>
  <el-row>
    <div class="app-header">
      <div class="app-header-inner">
        <el-col :span="3" :offset="1">
          <!-- 给logo图片添加路由,点击跳转到首页 -->
          <router-link :to="{ path: '/' }">
            <img class="header-img" src="../assets/logo.png" />
          </router-link>
        </el-col>
        <el-col :span="11" :offset="3" style="padding-left:10px">
          <!--搜索框-->
          <div style="margin-top: 20px;">
            <el-input
              placeholder="请输入内容"
              v-model="search"
              class="input-with-selct"
              @keyup.enter.native="searchf"
            >
              <el-select v-model="select" slot="prepend">
                <el-option label="书名" value="1"></el-option>
                <el-option label="类型" value="2"></el-option>
              </el-select>
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchf"
              ></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="4" :offset="2" style="font-size:20px">
          <ul>
            <li v-show="login" @click="toCart">购物车</li>
            <li>&nbsp;&nbsp;&nbsp;</li>
            <el-dropdown trigger="hover" v-show="login">
              <li class="el-dropdown-link">{{userName}}</li>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click="toPersonal">个人中心</el-dropdown-item>
                <el-dropdown-item divided @click.native="logoff" >退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <li v-show="login == false" @click="toLogin">登录/注册</li>
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
      login: false,
      select: "1",
      userName: "",
      search: ""
    };
  },
  created() {
    if (localStorage.getItem("name")) {
      this.login = true;
      this.userName = localStorage.getItem("name");
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.query.login) {
        const param1 = this.$route.query.login;
        this.login = param1;
        const param2 = this.$route.query.name;
        this.userName = param2;
      };
      if(to.path!='/searchList') this.search=""
    }
  },
  methods: {
    searchf() {
      if(this.search!=""){
      this.$router.push({
        path: "/searchList",
        query: {
          select: this.select,
          searchName: this.search
        }
      });
      }
      //location.reload();
    },
    toPersonal() {
      this.$router.push({
        path: "/personal"
      });
    },
    toLogin() {
      this.$router.push({
        path: "/login"
      });
    },
    logoff() {
      this.$confirm("确认登出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          localStorage.removeItem("name");
          localStorage.removeItem("token");
          location.reload();
          this.login = false;
        })
        .catch(() => {});
      //this.login = false;
    },
    toCart() {
      this.$router.push({
        path: "/cart"
      });
    }
  }
};
</script>
<style scoped>
.app-header {
  width: 100%;
  height: 90px;
  background: #ddd;
  margin-left: 0px;
  padding-right: 0px;
  margin-top: -8px;
  border-bottom: 2px solid rgb(183, 183, 183);
  /*固定上边栏*/
}
.app-header-inner {
  width: 95%;
  margin: 0 auto;
}
.app-header .app-header-inner .header-img {
  width: 80px;
  height: 70px;
  margin-top: 10px;
  border-radius: 20px;
}
.el-select{
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