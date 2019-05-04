<template>
    <el-row  class="personal_info">
        <!--header-->
        <el-row>
            <top-bar></top-bar>
        </el-row>
        <el-container >
            <el-aside width="450px">
                <el-row>
                    <div class=""><img class="image" src="../assets/logo.png" /></div>
                </el-row>
            </el-aside>
            <el-main>
                <el-row :gutter="20">
                    <el-col :span="4" :offset="1" ><div type="text">昵称：胡群{{username}}</div></el-col>
                    <el-col :span="6" ><div class="">邮箱：123456@qq.com{{mailbox}}</div></el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="4" :offset="1"><div class="">年龄：不详{{age}}</div></el-col>
                    <el-col :span="4" ><div class="">性别：不详{{sex}}</div></el-col>
                    
                </el-row>
                <el-col :gutter="20">
                    <el-col :span="6" :offset="1">
                        <div class="">
                            个性标签：
                            <el-tag>唱跳{{hobby}}</el-tag>
                            <el-tag type="success">Rap{{hobby}}</el-tag>
                            <el-tag type="danger">篮球{{hobby}}</el-tag>
                        </div>
                    </el-col>
                </el-col>
                <el-button type="primary" icon="el-icon-edit" class="edit" @click="edit_info()">编辑</el-button>
            </el-main>
        </el-container>
        <el-container class="tabs">
            <el-aside width="330px"></el-aside>
            <el-main>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="我的订单" name="first">我的订单</el-tab-pane>
                    <el-tab-pane label="我的收藏" name="second">我的收藏</el-tab-pane>
                    <el-tab-pane label="购物车" name="third">购物车</el-tab-pane>
                    <el-tab-pane label="我的地址" name="fourth">我的地址</el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
        
    </el-row>

</template>
<script>
import topBar from "../components/topBar.vue";

export default {
  name: "Personal",
  data() {
      return {
        activeName: 'second'
      };
    },
  components: {
    topBar
  },
  methods:{
      //编辑个人信息
      edit_info(){
          this.$router.push({
              path:"/edit_info"
          })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
  }
};
</script>

<style>
  .personal_info {
      background: rgb(248, 255, 205);
  }
  .image {
      height:120px;
      width:100px;
      margin-left:350px;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .edit {
      margin-left: 450px;
  }
  .tabs {
      background: rgb(248, 255, 205);
  }
</style>