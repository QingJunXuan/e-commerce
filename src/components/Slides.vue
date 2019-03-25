<template>
  <el-carousel :interval="4500" type="card" height="310px" indicator-position="outside">
    <el-carousel-item v-for="item in items" :key="item">
      <img :src="item" width="630" height="310"/>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data(){
    return{
      items:{
        img1:'./static/images/image-1.jpg',
        img2:'./static/images/image-2.jpg',
        img3:'./static/images/image-3.jpg',
        img4:'./static/images/image-4.jpg',
        img5:'./static/images/image-5.jpg',
        img6:'./static/images/image-6.jpg',
        img7:'./static/images/image-7.jpg',

        }
    }
  }
}
</script>

<style>

 

 
</style>