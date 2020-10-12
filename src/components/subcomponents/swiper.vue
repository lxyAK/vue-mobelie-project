<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000" :speed="500">
      <!-- 谁用这个组件，谁就传递 lunbotuList 这个数组 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <a :href="item.href">
          <img :src="item.img_url" :class="{ full:isFull }" />
        </a>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 轮播图 end -->
  </div>
</template>

<script>
export default {
  // 定义 props 接收父组件的传值
  props: ['lunbotuList', 'isFull']
}
</script>

<style lang="scss" scope>
.mint-swipe {
  text-align: center;
  height: 200px;
  img {
    height: 100%;
  }
  .full {
    width: 100%;
  }
}
</style>
