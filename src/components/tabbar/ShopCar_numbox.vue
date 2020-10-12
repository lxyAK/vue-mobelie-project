<template>
  <div
    class="mui-numbox"
    data-numbox-min="1"
    data-numbox-max="max"
    style="height:25px;padding:0px 25px;width:80px"
  >
    <button class="mui-btn mui-btn-numbox-minus" type="button" style="width:25px">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="initCount"
      @change="countChange"
      ref="numbox"
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button" style="width:25px">+</button>
  </div>
</template>

<script>
import mui from '../../lib/dist/js/mui.min.js'
export default {
  mounted () {
    // 初始化numbox组件,里面要放入类样式
    mui('.mui-numbox').numbox()
    // console.log(this.max);
  },
  methods: {
    countChange () {
      console.log(
        '当前修改的商品id：' + this.goodsId,
        '当前数量:' + this.$refs.numbox.value
      )
      // 调用 store 中的方法 根据商品的 id，修改商品的数量，并同步到本地 localstorage
      this.$store.commit('updateGoodsCount', {
        id: this.goodsId,
        count: this.$refs.numbox.value
      })
    }
  },
  props: ['initCount', 'goodsId']
}
</script>

<style lang="scss" scope>
</style>
