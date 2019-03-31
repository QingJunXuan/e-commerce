<template>
  <el-tabs v-model="activeName" type="border-card" @tab-click="tabClick" style="margin-right:-40px">
    <el-tab-pane
      v-for="(item,index) in types"
      :key="index"
      :label="item.type"
      :name="item.id"
      id="pane"
    >
      <el-row :gutter="10">
        <el-col :span="6" v-for="(book,bIndex) in books" :key="bIndex">
          <el-card class="myCard" shadow="hover">
            <el-row>
              <el-col :span="12">
                <img class="cardImg" :src="book.picture" @click="bookDetail(book.name)">
              </el-col>
              <el-col :span="8" :offset="3">
                <div>
                  <p class="name" @click="bookDetail(book.name)">{{book.name}}</p>
                  <p class="author">{{book.author}}</p>
                  <p class="price">{{"￥"+book.nowprice}}</p>
                  <p class="intro">{{book.introduction}}</p>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination layout="prev, pager, next" :total="50" style="text-align:center"></el-pagination>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activeName: "1",
      types: [
        { id: "1", type: "青春" },
        { id: "2", type: "历史" },
        { id: "3", type: "散文" },
        { id: "4", type: "悬疑" },
        { id: "5", type: "政治" },
        { id: "6", type: "小说" },
        { id: "7", type: "艺术" },
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
  methods: {
    tabClick() {
      console.log(this.activeName);
      var x = parseInt(this.activeName);
      var init = this.types[x - 1].type;
      console.log(init);
      axios
        .get("/api/getBookByType", {
          params: {
            type: init
          }
        })
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
        path: "/bookDetail",
        query: {
          name: name
        }
      });
      axios
        .get("/api/getBookByName", {
          params: {
            name: name
          }
        })
        .then(resp => {
          console.log(resp.data);
        });
    },
    preClick(){

    },
    nexClick(){
      
    }
  },
  created() {
    var x = parseInt(this.activeName);
    var init = this.types[x - 1].type;
    axios
      .get("/api/getBookByType", {
        params: {
          type: init
        }
      })
      .then(resp => {
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
.myCard {
  height: 180px;
  margin-bottom: 20px;
}
.cardImg {
  height: 140px;
  width: 100px;
  margin-left: -10px;
}
.name {
  text-align: left;
  font-size: 12px;
  color: rgb(14, 13, 13);
  height: 20px;
  text-align: left;
  width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: -5px;
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
  margin-bottom: -5px;
}
.price {
  text-align: left;
  color: rgb(233, 43, 10);
  margin-bottom: -5px;
}
.intro {
  font-size: 10px;
  color: #535351ec;
  text-align: left;
  height: 40px;
  width: 70px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: -5px;
}
</style>