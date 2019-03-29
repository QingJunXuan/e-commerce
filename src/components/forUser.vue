<template>
<el-tabs value="tab">
  <el-tab-pane
    label="猜你喜欢"
    name="tab" 
  >
     <el-row :gutter="10">
          <el-col :span="6" v-for="num in 4" :key="num">
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
