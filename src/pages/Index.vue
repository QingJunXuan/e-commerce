<template>
  <el-row>
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
        <collapse></collapse>
      </el-col>
    </el-row>
    <!-- 打折商品+新书榜 -->
    <el-row style="margin-top: 20px;">
      <el-col :span="16" :offset="1">
          <Sale></Sale>
      </el-col>
      <el-col :span="5" :offset="1">
        <collapse></collapse>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <!-- 编辑推荐 -->
      <el-col :span="22" :offset="1">
        <recommend></recommend>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <!-- 猜你喜欢 -->
      <el-col :span="22" :offset="1">
        <el-card><for-user></for-user></el-card>
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
import Slides from '../components/Slides.vue';
import Collapse from '../components/Collapse.vue';
import Type from '../components/Type.vue';
import Sale from '../components/Sale.vue';
import Recommend from '../components/Recommend.vue';
import forUser from '../components/forUser.vue';

export default {
  name: 'index',
  components: {
    Slides,
    Collapse,
    Type,
    Sale,
    Recommend,
    forUser,
  }
};
</script>
<style >
/* .el-row{
  
} */
</style>


