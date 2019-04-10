<template>
  <el-card class="box-card" shadow="hover">
    <el-row>
      <el-row>
        <span class="title">{{title}}</span>
      </el-row>
      <el-row style="padding-top:10px">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item v-for="(book,index) in books" :key="index" :name="book.id">
            <template slot="title">
              {{index+1+'  '+book.name}}
            </template>
            <el-row>
              <el-col :span="9">
                <img :src="book.picture" class="img" @click="bookDetail(book.name)">
              </el-col>
              <el-col :span="15">
                <div>
                  <p class="author_2">{{book.author}}</p>
                  <p class="price_2">{{"￥"+book.nowprice}}</p>
                  <p class="intro_2">{{book.introduction}}</p>
                </div>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-row>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      activeName: "",
      title: "畅 销 榜",
      books: null
    };
  },
  methods: {
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
    console.log(this.activeName);
    this.$axios
      .get("/api/getHotBooks")
      .then(resp => {
        this.books = resp.data.map(item => {
          item.id = item.id.toString();
          return item;
        });
        this.activeName = this.books[0].id;
        console.log(resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style>
.box-card {
  /* background-color: #e7cca4; */
  /* margin-top:20px; */
  margin-bottom: 20px;
  height: 505px;
}
.el-collapse-item .el-collapse-item__header {
  /* color: rgb(150, 139, 133); */
  font-size: 14px;
  height: 30px;
  padding-left: 0px;
  /* background-color: #ddd2bdec; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgb(137, 139, 141);
}
.el-collapse-item .el-collapse-item__wrap {
  height: 140px;
}
.title {
  font-size: 20px;
  font-weight: bold;
  font-family: "Courier New", Courier, monospace;
  color: rgb(241, 34, 7);
  margin-top: 5px;
}
.img {
  padding-top: 10px;
  height: 110px;
  width: 80px;
  cursor: pointer;
}
.price_2 {
  font-size: 12px;
  font-family: "Courier New", Courier, monospace;
  color: rgb(233, 43, 10);
  margin-bottom: -5px;
}
.author_2 {
  font-size: 12px;
  font-family: "Courier New", Courier, monospace;
  color: rgb(146, 146, 146);
  margin-bottom: -5px;
}
.intro_2 {
  font-size: 11px;
  color: #535351ec;
  height: 55px;
  text-align: center;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: -5px;
  padding-left: 5px;
}
</style>