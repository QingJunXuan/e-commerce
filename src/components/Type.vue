<template>
  <el-tabs v-model="tabKey" type="border-card" @tab-click="tabClick">
    <el-tab-pane v-for="(item,index) in types" :key="index" :label="item.type" :name="item.id">
      
        <el-row :gutter="10">
          <el-col :span="6" v-for="(book,bIndex) in books" :key="bIndex">
            <el-card class="myCard" shadow="hover">
              <el-row>
                <el-col :span="12">
                  <img class="cardImg" :src="book.picture" @click="bookDetail">
                </el-col>
                <el-col :span="10" :offset="2">
                  <p class="p1" @click="bookDetail">{{book.name}}</p>
                  <p class="p2">{{book.author}}</p>
                  <p class="p3">{{"￥"+book.nowprice}}</p>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      <el-pagination layout="prev, pager, next" :total="50" page-size="8">
      </el-pagination>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tabKey: "1",
      types: [
        {
          id: "1",
          type: "历史"
        },
        {
          id: "2",
          type: "科幻"
        },
        {
          id: "3",
          type: "教育"
        }
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
  filter: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 2) {
        return value.slice(0, 1) + "...";
      }
      return value;
    }
  },
  methods: {
    tabClick() {
      axios
        .get("/api/getBookByType", {
          params: {
            type: "历史"
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
    bookDetail() {}
  }
};
</script>

<style>
.myCard {
  height: 200px;
  margin-bottom: 20px;
}
.cardImg {
  height: 150px;
  width: 120px;
}
/* .text_slice {
	width: 100px;
	display: block;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
} */
.p1 {
  text-align: left;
  color: rgb(14, 13, 13);
  height: 40px;
  width: 100px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
p.p1:hover {
  color: brown;
  text-decoration: underline;
}
.p2 {
  text-align: left;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: rgb(137, 139, 141);
}
.p3 {
  text-align: left;
  color: rgb(233, 43, 10);
}
/* .p2{
text-align: right;
color:rgb(78, 78, 78);
height:20px;
text-overflow: -o-ellipsis-lastline;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
} */
</style>