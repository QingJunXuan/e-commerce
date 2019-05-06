<template>
  <el-tabs value="tab" type="border-card" style="margin-right:-40px;height:505px">
    <el-tab-pane label="折扣商品" name="tab">
      <el-row :gutter="10">
        <el-col :span="6" v-for="(book,bIndex) in books" :key="bIndex">
          <el-card class="myCard" shadow="hover">
            <el-row>
              <el-col :span="12">
                <img class="cardImg" :src="book.picture" @click="bookDetail(book.name)">
              </el-col>
              <el-col :span="9" :offset="2">
                <p class="name" @click="bookDetail(book.name)">{{book.name}}</p>
                <p class="author">{{book.author}}</p>
                <p class="price">{{"￥"+book.nowprice}}<span style="font-size: 8px;color: #4e5c99ec;text-decoration: line-through;padding-left: 10px;">{{"￥"+book.preprice}}</span></p>
                <p class="intro">{{book.introduction}}</p>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        layout="prev, pager, next"
        :page-count="totalPage"
        :current-page="currentPage"
        style="text-align:center"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      totalPage: 2,
      books: [
        {
          id: 1,
          type: "文学",
          name: "这里是书名",
          picture: "/img.jpg",
          author: "这里是作者",
          nowprice: "$10.00",
          introduction: "简介"
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
        },
        {
          id: 6,
          type: "生活",
          name: "这里是书名",
          picture: "/img.jpg",
          author: "这里是作者",
          nowprice: "$10.00"
        }
      ]
    };
  },
  created() {
    this.$axios
      .get("/api/getDiscountBooks", {
        params: {
          page: this.currentPage
        }
      })
      .then(resp => {
        this.totalPage = resp.data.pop();
        this.books = resp.data;
        console.log(resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    bookDetail(name) {
      this.$router.push({
        path:'/bookDetail',
        query:{
          bookName:name
        }
      })
    },
    handleCurrentChange: function(val) {
      this.currentPage = val;
      console.log(this.currentPage);
      this.getBooksByPage();
    },
    getBooksByPage() {
      this.$axios
        .get("/api/getDiscountBooks", {
          params: {
            page: this.currentPage
          }
        })
        .then(resp => {
          resp.data.pop();
          this.books = resp.data;
          console.log(resp.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.myCard {
  height: 180px;
  margin-bottom: 20px;
}
.cardImg {
  height: 140px;
  width: 100px;
  margin-left: -10px;
  cursor: pointer;
}
.name {
  text-align: left;
  font-size: 13px;
  color: rgb(14, 13, 13);
  height: 20px;
  text-align: left;
  width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: -5px;
  cursor: pointer;
}
p.name:hover {
  color: brown;
  text-decoration: underline;
}
.author {
  text-align: left;
  width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  color: rgb(137, 137, 137);
  /* color:cadetblue; */
}
.price {
  text-align: left;
  font-size: 12px;
  color: rgb(233, 43, 10);
  margin-bottom: -5px;
}
.intro {
  font-size: 10px;
  color: #535351ec;
  text-align: left;
  height: 45px;
  width: 80px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: -5px;
}
</style>