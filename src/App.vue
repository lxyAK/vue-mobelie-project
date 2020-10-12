<template>
  <div class="app-container">
    <!-- Header 区域 -->
    <mt-header fixed title="特色商品">
      <div slot="left">
        <mt-button icon="back" @click="getBack" v-show="flag">返回</mt-button>
      </div>
    </mt-header>

    <!-- 中间 router-view 区域 -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- 底部 Tabbar 区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-items" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-items" to="/member">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
      <router-link class="mui-tab-items" to="/shoppingcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{$store.getters.getShopCarCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-items" to="/search">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      flag: false
    }
  },
  created () {
    this.flag = this.$route.path !== '/home'
  },
  methods: {
    getBack () {
      this.$router.go(-1) // 后退一步
    }
  },
  watch: {
    '$route.path': function (newValue) {
      console.log(newValue)
      this.flag = newValue !== '/home'
    }
  }
}
</script>

<style lang="scss" scoped>
.mint-header {
  z-index: 99;
}
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease;
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.mui-tab-items {
  display: table-cell;
  overflow: hidden;

  width: 1%;
  height: 50px;

  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: #929292;
}
.mui-bar-tab .mui-tab-items .mui-icon ~ .mui-tab-label {
  font-size: 11px;

  display: block;
  overflow: hidden;

  text-overflow: ellipsis;
}
.mui-bar-tab .mui-tab-items .mui-icon {
  top: 3px;

  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mui-tab-items.mui-active {
  color: #007aff;
}
</style>
