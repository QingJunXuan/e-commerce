<template>
  <el-row>
    <el-row>
      <el-card style="height: 50px;width: 100%;margin-top: -7px;border-bottom: 2px solid #ddd">
        <p style="text-align:left;margin-top:-7px">
          您现在浏览的是
          <span style="color:#0066cc;font-weight:bold">{{' '+name+' '}}</span>相关信息
        </p>
      </el-card>
    </el-row>
    <el-row style="padding-top:60px;padding-bottom:60px">
      <el-col :span="20" :offset="2">
        <el-col :span="9">
          <img style="height: 360px;width: 260px;" :src="book.picture">
        </el-col>
        <el-col :span="13" style="text-align:left;margin-top:-15px">
          <div>
            <p style="font-size: 25px;color: rgb(53, 52, 52);font-weight: bold;">{{book.name}}&nbsp;
              <i :class="{'el-icon-star-off':isOff,'el-icon-star-on':isOn}" @click="collect"></i>
            </p>
            <p style="margin-top: -15px;font-size: 16px;color: #646462ec;text-align: left;">{{book.subtitle}}</p>
            <hr style="width:800px;background-color:#535351ec;margin-left:-20px">
            <el-row style="font-size:13px">
              <el-col :span="8">
                作者：
                <span style="color:#0066cc">{{book.author}}</span>
              </el-col>
              <el-col :span="8">
                出版社：
                <span style="color:#0066cc">{{book.press}}</span>
              </el-col>
              <el-col :span="8">
                出版时间：
                <span style="color:#0066cc">{{book.presstime}}</span>
              </el-col>
            </el-row>
            <div style="font-size: 15px;background-color:rgb(241,241,241);height:85px;margin:0 -15px">
              <p style="padding-top:10px;padding-left:15px">售价：</p>
              <span style="font-size: 20px;color: rgb(233, 43, 10);padding-left:15px;">
                ￥
                <span style="font-size:30px">{{+book.nowprice}}</span>
              </span>
              <span style="font-size: 15px;color: #4e5c99ec;text-decoration: line-through;padding-left: 10px;">{{"￥"+book.preprice}}</span>
            </div>
            <el-row style="font-size:15px;">
              <el-col :span="6">
                <p>
                  库存:
                  <span style="color:cadetblue;font-weight:bold;font-size:17px">{{book.stock}}</span> 件
                </p>
              </el-col>
              <el-col :span="6">
                <p>
                  月销:
                  <span
                    style="color:cadetblue;font-weight:bold;font-size:17px"
                  >{{book.monthsales}}</span> 件
                </p>
              </el-col>
            </el-row>
            <el-row style="padding-top:20px;">
              <el-col :span="8">
                <el-button class="addShopCart" @click="addBook">
                  <i class="el-icon-sold-out" style="margin-left:-10px"></i> 加入购物车
                </el-button>
              </el-col>
              <el-col :span="7">
                <el-button class="buy" @click="buy">立即购买</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-col>
    </el-row>
    <el-row>
      <el-row>
        <el-col :span="3" :offset="3">
          <p style="height:27px;background-color:rgb(241,241,241);font-size:20px;margin-top:16px">书 籍 信 息</p>
        </el-col>
        <el-col :span="15">
          <p style="height:27px;background-color:rgb(241,241,241);border-left:4px solid #487A6F"></p>
          <P style="font-size:15px;font-weight:bold;text-align:left;">
            <el-row>
              <el-col :span="6" :offset="2">
                书名：
                <span style="font-weight:100">{{book.name}}</span>
              </el-col>
              <el-col :span="6" :offset="2">
                页数：
                <span style="font-weight:100">{{book.page}}</span>
              </el-col>
              <el-col :span="6" :offset="2">
                ISBN：
                <span style="font-weight:100">{{book.isbn}}</span>
              </el-col>
            </el-row>
            <el-row style="padding-top:20px">
              <el-col :span="6" :offset="2">
                分类：
                <span style="font-weight:100">{{book.type}}</span>
              </el-col>
              <el-col :span="6" :offset="2">
                出版社：
                <span style="font-weight:100">{{book.press}}</span>
              </el-col>
              <el-col :span="6" :offset="2">
                出版时间：
                <span style="font-weight:100">{{book.presstime}}</span>
              </el-col>
            </el-row>
          </P>
          <p style="height:3px;background-color:rgb(220,220,220)"></p>
        </el-col>
      </el-row>
      <el-row style="padding-top:20px">
        <el-col :span="3" :offset="3">
          <p style="height:27px;background-color:rgb(241,241,241);font-size:20px;margin-top:16px">内 容 简 介</p>
        </el-col>
        <el-col :span="15">
          <p style="height:27px;background-color:rgb(241,241,241);border-left:4px solid #487A6F"></p>
          <P style="font-size:15px;text-align:left;margin:0 35px">
            {{book.introduction}}
          </P>
          <p style="height:3px;background-color:rgb(220,220,220)"></p>
        </el-col>
      </el-row>
      <el-row style="padding-top:20px">
        <el-col :span="3" :offset="3">
          <p style="height:27px;background-color:rgb(241,241,241);font-size:20px;margin-top:16px">目 录</p>
        </el-col>
        <el-col :span="15">
          <p style="height:27px;background-color:rgb(241,241,241);border-left:4px solid #487A6F"></p>
          <P style="font-size:15px;text-align:left;margin:0 35px">
            {{book.catelog}}
          </P>
          <p style="height:3px;background-color:rgb(220,220,220)"></p>
        </el-col>
      </el-row>
    </el-row>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      totalPage: 1,
      book: {},
      isOff:true,
      isOn:false,
    };
  },
  created() {
    this.getDetail();
  },
  watch:{
    $route(to,from){
      if(to.path=="/bookDetail") this.getDetail();
    }},
  methods: {
    getDetail() {
      this.name = this.$route.query.bookName;
      this.$axios
        .get("/api/getBookByName", {
          params: {
            name: this.name,
            page: 1
          }
        })
        .then(resp => {
          this.totalPage = resp.data.pop();
          this.book = resp.data[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    addBook(){
      //传后端user_id+book_id
      if(localStorage.getItem("name")){
      this.$axios
        .post("/api/addBookToCart", {
          userid:localStorage.getItem('userid'),
          bookid:this.book.id,
          num:1
        })
        .then(resp => {
					console.log("TCL: addBook -> resp", resp)
        })
        .catch(err => {
          console.log(err);
        });
      }else{
        this.$router.push('/login')
      }
    },
    buy(){
      //传后端user_id+book_id
      if(localStorage.getItem("name")){
      this.$axios
        .post("/api/addBookToCart", {
          userid:localStorage.getItem('userid'),
          bookid:this.book.id,
          num:1
        })
        .then(resp => {
          console.log("TCL: buy -> resp", resp)
          this.$router.push({
            path:'/cart',
            query:{bookid:this.book.id}
          })
        })
        .catch(err => {
          console.log(err);
        });
      }else{
        this.$router.push('/login')
      }
    },
    collect(){
      if(localStorage.getItem("name")){
        if(this.isOff==true){
          this.isOff=false
          this.isOn=true
        }else{
          this.isOff=true
          this.isOn=false
        }
      }else{
        this.$router.push('/login')
      }
    },
  }
};
</script>
<style scope>
.addShopCart {
  width: 150px;
  height: 40px;
  font-size: 18px;
  font-weight: bold;
  background-color: rgb(248, 74, 74);
  color: #fff;
}
.addShopCart:hover {
  background-color: rgb(252, 53, 53);
  color: #fff;
}
.buy {
  width: 130px;
  height: 40px;
  font-size: 18px;
  font-weight: bold;
  background-color: rgb(252, 247, 247);
  color: rgb(248, 91, 91);
  border: 1px solid red;
}
.buy:hover {
  background-color: rgb(255, 218, 218);
  color: rgb(248, 91, 91);
  border: 1px solid red;
}
.el-icon-star-on{
  color: gold
}
</style>