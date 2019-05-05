<template>
  <el-row class="back">
    <el-col :span="16" :offset="2" class="backImg">
      <img src="../assets/images/image-1.jpg"/>
    </el-col>
    <el-col :span="4" :offset="1" style="text-align:center;osition:relative;">
      <el-card class="box-card">
        <el-row style="margin-top:30px;">
          <img src="../assets/logo.png" alt="logo" height="60" />
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="18">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              class="form"
            >
              <!-- <el-form-item prop="email">
                <el-input
                  v-model="ruleForm.email"
                  placeholder="邮箱"
                  style="width:240px"
                ></el-input>
              </el-form-item> -->
              <el-form-item prop="name">
                <el-input
                  v-model="ruleForm.name"
                  placeholder="用户名"
                  style="width:240px"
                ></el-input>
              </el-form-item>
              <el-form-item label prop="password">
                <el-input
                  type="password"
                  v-model="ruleForm.password"
                  placeholder="密码"
                  style="width:240px"
                  @keyup.enter.native="handleLogin()"
                ></el-input>
              </el-form-item>
              <el-row type="flex" justify="end">
                <el-col :span="4">
                  <el-button type="text" @click="toForgetPsw">忘记密码?</el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-button
                  type="primary"
                  @click="handleLogin()"
                  style="margin-top:20px;width:80%"
                  plain
                  >登陆</el-button>
              </el-row>
              <el-row
                type="flex"
                justify="center"
                align="middle"
                style="margin-top:20px"
              >
                <el-col :span="7">
                  <div style="height:30px;line-height:30px">没有账户?</div>
                </el-col>
                <el-col :span="3" :offset="0">
                  <el-button type="text" @click="toRegister">注册</el-button>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import qs from "qs";
import md5 from "js-md5";

export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        name: "",
        password: ""
      },
      //vedioCanPlay: false,
      fixStyle: "",
      rules: {
        name:[
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
        ],
        email: [
          {
            required: true,
            message: "请输入登陆邮箱",
            trigger: "blur"
          },
          {
            pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
            message: "请输入合法邮箱"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "密码长度为6~20",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleLogin() {
      console.log(this.ruleForm, "login");
      this.$refs.ruleForm.validate(valid => {
        let that = this;
        //if(valid){this.toHome()}
        if (valid) {
          //that.logining = true;

          that.$axios
            .post(
              "/api/login",
              {
                name: this.ruleForm.name,
                password: this.ruleForm.password
              },
              { emulateJSON: false }
            )
            .then(
              response => {
                console.log(response.data);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userid",response.data.userid)
                localStorage.setItem("username", this.ruleForm.name);
                //that.logining = false;
                 that.$notify({
                  title: "登录成功",
                  message: "页面即将跳转",
                  type: "success",
                  duration: 2000
                });
                setTimeout(function() {
                  that.toHome()
                }, 2000);
              },
              response => {
                console.log("登录失败：", response);
                //that.logining = false;
                that.$notify.error({
                  title: "登录失败",
                  message: "用户名密码不匹配或网络错误",
                  duration: 2000
                });
              }
            );
        }
      });
    },
    toHome() {
      this.$router.push({
        path: "/",
        query: {
          login:true,
          name:this.ruleForm.name}
      });
    },
    toForgetPsw() {
      this.$router.push("/forgetpsw");
    },
    toRegister() {
      this.$router.push("/register");
    }
  }
};
</script>

<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.backImg {
  position: relative;
  top: 25%;
}
.back {
  height: 590px;
}
.form {
  margin-top: 10px;
  margin-bottom: 20px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 350px;
  font-size: 14px;
  background: rgb(250, 245, 219);
  position: absolute;
  top: 300px;
  transform: translate(-50%, -50%);
  border: 0;
}
.homepage-hero-module,
.homepage-hero-module {
  border-right: none;
  border-left: none;
  position: relative;
}
/*footer*/
.app-footer {
  width: 100%;
  height: 60px;
  background: #ddd;
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