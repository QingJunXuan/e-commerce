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
                    <el-col :span="4" :offset="1" ><div type="text">昵称：cxk{{username}}</div></el-col>
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
            <el-aside width="300px"></el-aside>
            <el-main>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="我的订单" name="first">
                        <el-container style="height:500px;boder:1px">
                            <el-header style="text-align:centenr;font-size:12px">
                                空
                            </el-header>
                            <el-main>
                                <el-table :data="tableData">
                                    <el-table-column prop="image" label="图片" width="140px"></el-table-column>
                                    <el-table-column prop="bookName" label="书名" width="100px"></el-table-column>
                                    <el-table-column prop="date" label="时间" width="140px"></el-table-column>
                                </el-table>
                            </el-main>
                        </el-container>
                    </el-tab-pane>
                    <el-tab-pane label="我的收藏" name="second">
                        <el-row v-for="(item,i) in items" :key=i>
                        <div>
                                <el-col width="150px;">
                                    <el-row>
                                        <img class="image" src="../assets/logo.png" prop="image" style="margin-left:20px;"/>
                                    </el-row>
                                </el-col>
                                <el-col>
                                    <el-row :gutter="20">
                                        <el-col :span="4" :offset="1" >书名：ECHO{{item.bookName}}</el-col>
                                        <el-col :span="4" ><div class="">日期：2019.5.6{{item.date}}</div></el-col>
                                    </el-row>
                                    <el-row :gutter="20">
                                        <el-col :span="4" :offset="1"><div class="">作者：XXX{{item.author}}</div></el-col>
                                        <el-col :span="4"><div class="">价格: 50rmb{{item.price}}</div></el-col>
                                    </el-row>
                                    <el-row>
                                        <el-button type="primary" icon="el-icon-error" class="delete" @click="delete_info()">删除</el-button>
                                    </el-row>
                                </el-col>
                        </div>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="购物车" name="third">
                        <el-row v-for="(o,i) in 5" :key=i>
                        <el-button>
                            <el-container>
                                <el-aside width="150px;">
                                    <el-row>
                                        <img class="image" src="../assets/logo.png" prop="image" style="margin-left:20px;"/>
                                    </el-row>
                                </el-aside>
                                <el-main>
                                    <el-row :gutter="20">
                                        <el-col :span="4" :offset="1" >书名：ECHO{{i.bookName}}</el-col>
                                        <el-col :span="4" ><div class="">日期：2019.5.6{{i.date}}</div></el-col>
                                    
                                    </el-row>
                                    <el-row :gutter="20">
                                        <el-col :span="4" :offset="1"><div class="">作者：XXX{{i.author}}</div></el-col>
                                        <el-col :span="4"><div class="">价格: 50rmb{{i.price}}</div></el-col>
                                    </el-row>
                                    <el-row :gutter="20">
                                        
                                        <el-button type="primary" icon="el-icon-goods" class="buy" @click="buy_info()">购买</el-button>
                                        <el-button type="primary" icon="el-icon-error" class="delete" @click="buy_info()">删除</el-button>
                                        
                                    </el-row>
                                    
                                </el-main>
                            </el-container>
                        </el-button>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="我的地址" name="fourth">
                        我的地址
                    </el-tab-pane>
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
        activeName: 'second',
        tableData: Array(20).fill(items),
        items:[
          {
            id:1,
            image :"../assets/logo.png",
            bookName:"ECHO",
            date:"2019-5-7",
            author:"XXX"
          },
          {
            id:2,
            image :"../assets/logo.png",
            bookName:"ECHO",
            date:"2019-5-7",
            author:"XXX"
          },
          {
            id:3,
            image :"../assets/logo.png",
            bookName:"ECHO",
            date:"2019-5-7",
            author:"XXX"
          },
          ]
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
      delete_info(){
          this.$router.push({
              path:"/delete_info"
          })
      },
      buy_info(){
          this.$router.push({
              path:"/buy_info"
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
  .delete {
      margin-left: 453px;

  }
  .buy {
      margin-left: 370px;
  }
  .tabs {
      background: rgb(248, 255, 205);
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 30px;
  }
</style>