<template>
  <el-card class="box-card" shadow="hover">
    <el-row>
      <el-row>
        <span class="title">{{title}}</span>
        <button @click="test">test</button>
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
      title: "新 书 榜",
      books: null
    };
  },
  methods: {
    test() {
      this.$axios
        .get("/api/getNewBooks")
        .then(resp => {
          this.books = resp.data;
          console.log(resp.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    bookDetail(name) {this.$router.push({
        path:'/bookDetail',
        query:{
          bookName:name
        }
      })}
  },
  created() {
    console.log(this.activeName);
    this.$axios
      .get("/api/getNewBooks")
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