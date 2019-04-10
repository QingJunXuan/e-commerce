<template>
  <el-tabs value="tab" type="border-card">
    <el-tab-pane label="编辑推荐" name="tab">
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
    bookDetail(name) {this.$router.push({
        path:'/bookDetail',
        query:{
          bookName:name
        }
      })}
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

<style>
.myCard_3 {
  height: 180px;
  margin-bottom: 20px;
}
.cardImg_3 {
  height: 150px;
  width: 110px;
  cursor: pointer;
}
.name_3 {
  text-align: left;
  color: rgb(14, 13, 13);
  height: 20px;
  text-align: left;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: -5px;
  cursor: pointer;
}
p.name_3:hover {
  color: rgb(240, 232, 232);
  text-decoration: underline;
}
.author_3 {
  text-align: left;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: rgb(137, 139, 141);
}
.price_3 {
  text-align: left;
  font-size: 14px;
  color: rgb(233, 43, 10);
  margin-bottom: -5px;
}
.intro_3 {
  font-size: 10px;
  color: #535351ec;
  text-align: left;
  height: 40px;
  width: 100px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: -5px;
}
</style>