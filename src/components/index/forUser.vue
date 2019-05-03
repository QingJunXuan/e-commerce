<template>
  <el-tabs value="tab" type="border-card" @tab-click="test">
    <el-tab-pane label="猜你喜欢" name="tab">
      <el-row :gutter="10">
        <el-col :span="6" v-for="(book,bIndex) in books" :key="bIndex">
          <el-card class="myCard_3" shadow="hover">
            <el-row>
              <el-col :span="12">
                <img class="cardImg_3" :src="book.picture" @click="bookDetail(book.name)">
              </el-col>
              <el-col :span="10" :offset="2">
                <div style="margin-top:-10px">
                  <p class="name_3" @click="bookDetail(book.name)">{{book.name}}</p>
                  <p class="author_3">{{book.author}}</p>
                  <p class="price_3">{{"￥"+book.nowprice}}</p>
                  <p class="intro_3">{{book.introduction}}</p>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>


<script>
export default {
  data() {
    return {
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
  methods: {
    test() {
      this.$axios
        .get("/api/getCommonRecommendBooks")
        .then(resp => {
          this.books = resp.data;
          console.log(resp.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    bookDetail(name) {
      this.$router.push({
        path:'/bookDetail',
        query:{
          bookName:name
        }
      })
    }
  },
  created() {
    this.$axios
      .get("/api/getCommonRecommendBooks")
      .then(resp => {
        resp.data.pop();
        resp.data.pop();
        this.books = resp.data;
        console.log(resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>