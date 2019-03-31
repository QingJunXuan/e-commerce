<template>
  <!-- <div class="homepage-hero-module">
    <div class="video-container"> -->
      <el-row  class="back">
        <el-col :span="13" :offset="1" class="backImg"><img src="../assets/images/image-1.jpg"/></el-col>
        <el-col :span="9" :offset="1" style="  text-align:center;
  position:relative;">
          <el-card class="box-card LoginForm" style="width:350px;">
            <el-row style="margin-top:30px;">
              <img src="../assets/logo.png" alt="logo" height="60">
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="18">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form">
                  <el-form-item prop="email">
                    <el-input v-model="ruleForm.email" placeholder="邮箱"></el-input>
                  </el-form-item>
                  <el-form-item label prop="password">
                    <el-input type="password" v-model="ruleForm.password" placeholder="密码"></el-input>
                  </el-form-item>
                  <el-row type="flex" justify="end">
                    <el-col :span="4">
                      <el-button type="text" @click="toForgetPsw">忘记密码?</el-button>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-button
                      type="primary"
                      @click="handleLogin('ruleForm')"
                      style="margin-top:20px;width:80%"
                      plain
                    >登陆</el-button>
                  </el-row>
                  <el-row type="flex" justify="center" align="middle" style="margin-top:20px">
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
        email: "",
        password: ""
      },
      //vedioCanPlay: false,
      fixStyle: "",
      rules: {
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
            min: 8,
            max: 20,
            message: "密码长度为8~20",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    /*       canplay() {
        this.vedioCanPlay = true
      }, */
    handleLogin(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .get(
              "http://192.168.43.249:54468/api/Users/Login?Email=" +
                this.ruleForm.email +
                "&Password=" +
                md5(this.ruleForm.password).substr(0, 20)
            )
            .then(response => {
              if (response.data == "NotFound") {
                this.$message.error("邮箱不存在！请先注册一个账户！");
              } else if (response.data == "Error") {
                this.$message.error("密码错误！");
              } else {
                this.$store.commit("addCurrentUserId", this.ruleForm.email);
                this.$store.commit("addCurrentUserId_ID", response.data);
                console.log(this.$store.state.currentUserId_ID);
                this.$router.push("/main/user/" + this.ruleForm.email);
                this.axios
                  .get(
                    "http://192.168.43.249:54468/api/Users/GetUserInfo?email=" +
                      this.$store.state.currentUserId
                  )
                  .then(response => {
                    this.$store.commit(
                      "addCurrentUsername",
                      response.data.Username
                    );
                    this.$store.commit(
                      "addCurrentUserPassword",
                      response.data.Password
                    );
                    this.$store.commit("addCurrentUserBio", response.data.Bio);
                    this.$store.commit(
                      "addCurrentUserPhoto",
                      response.data.Photo
                    );
                    var exp = new Date();
                    exp.setTime(exp.getTime() + 1000 * 60 * 60 * 24); //这里表示保存24小时
                    this.document.cookie =
                      "Username=" +
                      response.data.Username +
                      ";Password=" +
                      response.data.Password +
                      ";Bio=" +
                      response.data.Bio +
                      ";Photo=" +
                      response.data.Photo +
                      ";expires=" +
                      exp.toGMTString();
                    console.log(this.$store.state);
                  });
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          return false;
        }
      });
    },
    toForgetPsw: function() {
      this.$router.push("/forgetpsw");
    },
    toRegister: function() {
      this.$router.push("/register");
    }
  },
};
</script>

<style scoped>
html,body{
  width:100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.backImg{
  position: relative;
  top: 25%;
}
.back{
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
  width: 500px;
  margin: -50px auto;
  font-size: 14px;
  background: rgb(255, 255, 255);
  position: absolute;
  top: 350px;
  left: 50%;
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