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
              <el-col :span="8" :offset="3">
                <p class="name" @click="bookDetail(book.name)">{{book.name}}</p>
                <p class="author">{{book.author}}</p>
                <p class="price">{{"￥"+book.nowprice}}</p>
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
<style>
</style>
