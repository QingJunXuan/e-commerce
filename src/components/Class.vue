<template>
  <el-tabs v-model="tabKey" type="border-card">
    <el-tab-pane 
    v-for="item in items" 
    :key="item.id" 
    :label="item.title" 
    :name="item.id"
    >
        <el-row :gutter="10">
          <el-col :span="6" v-for="num in 8" :key="num">
              <el-card class="myCard"></el-card>
          </el-col>
        </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      tabKey: "1",
      items: [
        {
          title: "文学",
          id: "1"
        },
        {
          title: "人文社科",
          id: "2"
        },
        {
          title: "科技",
          id: "3"
        },
        {
          title: "小说",
          id: "4"
        },
        {
          title: "励志",
          id: "5"
        },
        {
          title: "生活",
          id: "6"
        }
      ]
    };
  }
};
</script>

<style>
/* .myCard{
    height: 200px;
    margin-bottom: 20px;
} */
</style>