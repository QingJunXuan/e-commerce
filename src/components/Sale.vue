<template>
<el-tabs value="tab" type="border-card">
  <el-tab-pane
    label="折扣商品"
    name="tab" 
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
      }
    },
  }
</script>
<style>
.myCard{
    height: 210px;
    margin-bottom: 16px;
}
</style>
