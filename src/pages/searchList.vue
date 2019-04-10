<template>
  <el-row>
    <el-row>
      <el-card class="headCard">
        <p style="text-align:left;margin-top:-7px">
          您现在浏览的是<span style="color:#0066cc;font-weight:bold">{{' '+name+' '}}</span>相关书目
        </p>
      </el-card>
    </el-row>
    <el-row style="margin-top:10px;width:98%;height:500px">
      <el-col :span="3" :offset="1" :style="leftheight">
        <p style="text-align:left;font-weight:bold">图书分类</p>
        <div
          v-for="(item,index) in items"
          :key="index"
          style="text-align:left;padding-left:10px;font-size:15px"
        >
          <p class="leftType">{{item.type}}</p>
        </div>
      </el-col>
      <el-col :span="1" :style="leftheight">
        <hr style="background-color: rgb(192, 190, 190);width:0.5px;height:350px;margin-left:0px">
      </el-col>
      <el-col :span="19" v-for="(book,index) in books" :key="index" style="margin-top:35px;">
        <el-row>
          <el-col :span="7">
            <img class="searchImg" :src="book.picture" @click="bookDetail(book.name)">
          </el-col>
          <el-col :span="7" style="text-align:left;margin-top:-15px">
            <div>
              <p class="name_4" @click="bookDetail(book.name)">{{book.name}}</p>
              <p class="author_4">{{book.author}}</p>
              <p class="price_4">
                {{"￥"+book.nowprice}}
                <span class="preprice">{{"￥"+book.preprice}}</span>
              </p>
              <p class="stock">
                库存
                <span style="color:cadetblue;font-weight:bold">{{book.stock}}</span>件
              </p>
              <p class="intro_4">
                <span style="font-size:14px;font-weight:bold">简介:</span>
                {{book.introduction}}
              </p>
            </div>
          </el-col>
        </el-row>
        <hr class="hr-row">
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="6" style="padding-top:15px">
        <el-pagination
          v-show="totalPage>1"
          layout="prev, pager, next,jumper"
          :page-count="totalPage"
          style="text-align:center"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      leftheight:{
          height:'500px'
      },
      count:'1',
      type: "书名",
      name: "测试",
      totalPage: 1,
      currentPage: 1,
      items: [
        { id: "1", type: "青春" },
        { id: "2", type: "历史" },
        { id: "3", type: "散文" },
        { id: "4", type: "悬疑" },
        { id: "5", type: "诗歌" },
        { id: "6", type: "小说" },
        { id: "7", type: "奇幻" },
        { id: "8", type: "励志" }
      ],
      books: [
        {
          id: 1,
          type: "文学",
          name: "这里是书名",
          picture: "/img.jpg",
          author: "这里是作者",
          nowprice: "$10.00"
        },
        {
          id: 2,
          type: "人文社科",
          name: "这里是书名",
          picture: "/img.jpg",
          author: "这里是作者",
          nowprice: "$10.00"
        },
        {
          id: 3,
          type: "科技",
          name: "这里是书名",
          picture: "/img.jpg",
          author: "这里是作者",
          nowprice: "$10.00"
        },
        {
          id: 4,
          type: "小说",
          name: "这里是书名",
          picture: "/img.jpg",
          author: "这里是作者",
          nowprice: "$10.00"
        },
        {
          id: 5,
          type: "励志",
          name: "这里是书名",
          picture: "/img.jpg",
          author: "这里是作者",
          nowprice: "$10.00"
        }
      ]
    };
  },
  created() {
    //this.name="测试";
    this.type = this.$route.query.select;
    this.name = this.$route.query.searchName;
    console.log(this.name);
    this.getBooksByPage();
  },
  methods: {
    bookDetail(val) {
      this.$router.push({
        path:'/bookDetail',
        query:{
          bookName:val
        }
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getBooksByPage();
    },
    getBooksByPage() {
      if (this.type == "1") {
        this.$axios
          .get("/api/getBookByName", {
            params: {
              name: this.name,
              page: this.currentPage
            }
          })
          .then(resp => {
            this.totalPage=resp.data.pop();
            this.books = resp.data;
            this.count=this.books.length;
            this.leftheight.height=(this.count)*263+'px';
          })
          .catch(err => {
            console.log(err);
          });
      }else if(this.type == "2"){
        this.$axios
        .get("/api/getBookByType", {
          params: {
            type: this.name,
            page: 1
          }
        })
        .then(resp => {
          this.totalPage = resp.data.pop();
          this.books = resp.data;
          this.count=this.books.length;
          this.leftheight.height=(this.count)*263+'px';
        })
        .catch(err => {
          console.log(err);
        });
    }
    }
  }
};
</script>
<style>
.headCard {
  height: 50px;
  width: 100%;
  margin-top: -7px;
  border-bottom: 2px solid #ddd;
}
.leftType{
    margin-bottom:-5px;
    cursor: pointer;
}
.leftType:hover{
    color: coral;
}
.searchImg {
  height: 240px;
  width: 175px;
  cursor: pointer;
}
.name_4 {
  font-size: 20px;
  color: #0066cc;
  cursor: pointer;
}
.author_4 {
  margin-top: -10px;
  font-size: 13px;
}
.price_4 {
  font-size: 17px;
  color: rgb(233, 43, 10);
}
.preprice {
  font-size: 13px;
  color: #4e5c99ec;
  text-decoration: line-through;
  padding-left: 5px;
}
.stock {
  font-size: 13px;
  margin-top: -13px;
  padding-left: 3px;
}
.intro_4 {
  font-size: 13px;
  color: #535351ec;
  text-align: left;
  height: 70px;
  width: 260px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
.hr-row {
  background-color: rgb(192, 190, 190);
}
</style>