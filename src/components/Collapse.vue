<template>
<el-card class="box-card" shadow="hover">
  <el-row>
    <el-row >
      <span class="title">{{title}}</span>
    </el-row>
    <el-row>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          v-for="(item,index) in items"
          :key="index"
          :title="index+1+item.title"
          :name="item.index"
        >
        <el-row >
          <el-col :span="9">
                <router-link :to="{path: '/bookDetail/',query:{book:item.tokey}}">
                  <img :src="item.src" id="img">
                </router-link>
          </el-col>
          <el-col :span="14">
              <div>
                <p class="price">{{item.price}}</p>
                <p class="text">{{item.text}}</p>
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
      activeName: '1',
        title: "畅 销 榜",
        items: [
          {
            index:'1',
            title: "《显微镜下的大明》",
            src: "../static/images/cover-1.jpg",
            price: "$5.00",
            tokey: "1",
            text:
              "   本书讲述的，是六个深藏于故纸堆中的明代基层政治事件。作者从明代的一系列罕见民间档案文书里，挖掘出这些尘封已久的故事。"
          },
          {
            title: "《显微镜下的大明》",
            src: "../static/images/cover-1.jpg",
            price: "$5.00",
            tokey: "2", 
            text:
              "   本书讲述的，是六个深藏于故纸堆中的明代基层政治事件。作者从明代的一系列罕见民间档案文书里，挖掘出这些尘封已久的故事。"
          },
          {
            title: "《显微镜下的大明》",
            src: "../static/images/cover-1.jpg",
            price: "$5.00",
            tokey: "3",
            text:
              "   本书讲述的，是六个深藏于故纸堆中的明代基层政治事件。作者从明代的一系列罕见民间档案文书里，挖掘出这些尘封已久的故事。"
          },
          {
            title: "《显微镜下的大明》",
            src: "../static/images/cover-1.jpg",
            price: "$5.00",
            tokey: "4",
            text:
              "   本书讲述的，是六个深藏于故纸堆中的明代基层政治事件。作者从明代的一系列罕见民间档案文书里，挖掘出这些尘封已久的故事。"
          },
          {
            title: "《显微镜下的大明》",
            src: "../static/images/cover-1.jpg",
            price: "$5.00",
            tokey: "5",
            text:
              "   本书讲述的，是六个深藏于故纸堆中的明代基层政治事件。作者从明代的一系列罕见民间档案文书里，挖掘出这些尘封已久的故事。"
          },
          {
            title: "《显微镜下的大明》",
            src: "../static/images/cover-1.jpg",
            price: "$5.00",
            tokey: "6",
            text:
              "   本书讲述的，是六个深藏于故纸堆中的明代基层政治事件。作者从明代的一系列罕见民间档案文书里，挖掘出这些尘封已久的故事。"
          },
          {
            title: "《显微镜下的大明》",
            src: "../static/images/cover-1.jpg",
            price: "$5.00",
            tokey: "7",
            text:
              "   本书讲述的，是六个深藏于故纸堆中的明代基层政治事件。作者从明代的一系列罕见民间档案文书里，挖掘出这些尘封已久的故事。"
          },
          {
            title: "《显微镜下的大明》",
            src: "../static/images/cover-1.jpg",
            price: "$5.00",
            tokey: "8",
            text:
              "   本书讲述的，是六个深藏于故纸堆中的明代基层政治事件。作者从明代的一系列罕见民间档案文书里，挖掘出这些尘封已久的故事。"
          },
          {
            title: "《显微镜下的大明》",
            src: "../static/images/cover-1.jpg",
            price: "$5.00",
            tokey: "9",
            text:
              "   本书讲述的，是六个深藏于故纸堆中的明代基层政治事件。作者从明代的一系列罕见民间档案文书里，挖掘出这些尘封已久的故事。"
          },
          {
            title: "《显微镜下的大明》",
            src: "../static/images/cover-1.jpg",
            price: "$5.00",
            tokey: "10",
            text:
              "   本书讲述的，是六个深藏于故纸堆中的明代基层政治事件。作者从明代的一系列罕见民间档案文书里，挖掘出这些尘封已久的故事。"
          },
        ]
      
    };
  }
};
</script>
<style>
.box-card{
  background-color:#e7cca4;
  /* margin-top:20px; */
  margin-bottom: 20px;
}
.el-collapse-item .el-collapse-item__header {
  color: rgb(150, 139, 133);
  font-size: 12px;
  height: 30px;
  padding-left: 10px;
  background-color:#ddd2bdec;
}
.el-collapse-item .el-collapse-item__wrap{
  height: 150px;
}
.title{
  font-size:20px;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
  color: rgb(105, 160, 68);
  margin-top: 5px;
}
#img {
  padding-top: 10px;
  width: 70%;
  height: 70%;
}
.price {
  font-size: 12px;
  font-family: "Courier New", Courier, monospace;
  color: goldenrod;
}
.text {
  font-size: 10px;
  font-family: "Courier New", Courier, monospace;
}
</style>
