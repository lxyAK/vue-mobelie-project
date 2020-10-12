<template>
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="max">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      value="1"
      @change="countChange"
      ref="numbox"
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
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
      // 每当文本框的数据被修改的时候，立即把最新的数据通过，事件调用，传递给父组件
      console.log(this.$refs.numbox.value)
      this.$emit('getcount', parseInt(this.$refs.numbox.value))
    }
  },
  props: ['max'],
  watch: {
    max: function (newValue, oldValue) {
      console.log(newValue)
      // MUI 封装的API ，根据类样式设置标签内文本数的最大值
      mui('.mui-numbox').numbox().setOption('max', newValue)
    }
  }
}
</script>

<style lang="scss" scope>
</style>
