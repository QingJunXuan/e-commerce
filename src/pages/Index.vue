<template>
  <el-row style="margin-top:35px">
    <!-- 轮播图 -->
    <el-row>
      <slides></slides>
    </el-row>
    <!-- 分类+畅销榜 -->
    <el-row style="margin-top: 20px;">
      <el-col :span="16" :offset="1">
        <type></type>
      </el-col>
      <el-col :span="5" :offset="1">
        <hot-books></hot-books>
      </el-col>
    </el-row>
    <!-- 打折商品+新书榜 -->
    <el-row style="margin-top: 20px;">
      <el-col :span="16" :offset="1">
        <Sale></Sale>
      </el-col>
      <el-col :span="5" :offset="1">
        <new-books></new-books>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <!-- 编辑推荐 -->
      <el-col :span="22" :offset="1">
        <recommend></recommend>
      </el-col>
    </el-row>
    <el-row style="margin-top: 40px;">
      <!-- 猜你喜欢 -->
      <el-col :span="22" :offset="1">
        <for-user></for-user>
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
import Slides from "../components/Slides.vue";
import hotBooks from "../components/index/hotBooks.vue";
import newBooks from "../components/index/newBooks.vue";
import Type from "../components/index/Type.vue";
import Sale from "../components/index/Sale.vue";
import Recommend from "../components/index/Recommend.vue";
import forUser from "../components/index/forUser.vue";

export default {
  name: "index",
  components: {
    Slides,
    hotBooks,
    newBooks,
    Type,
    Sale,
    Recommend,
    forUser
  },
};



</script>

<style >

</style>