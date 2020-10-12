<template>
  <div class="goodsinfo-container">
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- 轮播图 -->
          <cmt-swiper :lunbotuList="goodsImgs" :isFull="false"></cmt-swiper>
          <!-- 轮播图 end -->
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <!-- 半场动画钩子函数 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}{{counts}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{goodsInfo.sell_price}}</span>
          </p>
          <p>
            购买数量：
            <!-- + - 数量子组件 -->
            <cmt-numbox @getcount="getSelectedCount" :max="goodsInfo.stock_quantity"></cmt-numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <!-- 设置加入购物车按钮 -->
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsInfo.goods_no}}</p>
          <p>库存情况：{{goodsInfo.stock_quantity}}</p>
          <p>上架事件：{{goodsInfo.add_time}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="default" size="large" @click="goDesc(id)" plain>图文介绍</mt-button>
        <mt-button type="danger" size="large" @click="goComments(id)" plain>商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
// 导入轮播图组件
import swiper from '../subcomponents/swiper.vue'
// 导入numbox 组件
import numbox from './Goodsinfo_numbox.vue'
import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      counts: this.$store.state.count,
      id: this.$route.params.id, // 把路由参数对象的id挂载到data中方便后期调用
      goodsImgs: [], // 存放商品轮播图片
      goodsInfo: {}, // 存放商品信息
      ballFlag: false,
      selectedCount: 1 // 保存用户选中的商品数量，默认认为用户买1个
    }
  },
  created () {
    // console.log(this.$route.params.id);
    this.getLunbotu()
    this.getGoodsinfo()
  },
  methods: {
    getLunbotu () {
      this.axios({
        method: 'get',
        url: '/api/getgoodsimg',
        params: {
          id: this.id
        }
      })
        .then((result) => {
          // console.log(result);
          this.goodsImgs = result.data.message
        })
        // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          Toast('获取商品失败')
        })
    },
    // 获取商品参数价格标题等信息
    getGoodsinfo () {
      this.axios({
        url: '/api/goods/getinfo',
        params: {
          id: this.id
        },
        method: 'get'
      })
        .then((result) => {
          if (result.data.status === 0) {
            this.goodsInfo = result.data.message[0]
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          Toast('获取商品失败')
        })
    },
    goDesc (id) {
      this.$router.push({ name: 'goodsdesc', params: { id } })
    },
    goComments (id) {
      this.$router.push({ name: 'Goodscomments', params: { id } })
    },
    addToShopCar () {
      // 小球半场动画 开关
      this.ballFlag = !this.ballFlag
      // { id:商品id , count:购买数量 , price: 商品价格 , selected : true 默认结算被选中}
      // 拼接出一个要保存到 store 中 car 数组的商品信息对象
      var goodsToShopCar = {
        id: this.goodsInfo.id,
        count: this.selectedCount,
        price: this.goodsInfo.sell_price,
        selected: true
      }
      // 组件调用 mutations 中的方法, 修改共享的数据
      this.$store.commit('addToCar', goodsToShopCar)
    },
    beforeEnter (el) {
      // 设置小球起始的位置
      el.style.transform = 'translate(0px,0px)'
    },
    enter (el, done) {
      // eslint-disable-next-line no-unused-expressions
      el.offsetWidth // 保证有动画

      // 小球动画优化思路:
      // 1. 先分析导致动画不准确的本质原因：我们把小球最终位移到的位置，已经局限在了某一分辨率下，滚动条未滚动的情况下；
      // 2. 只要分辨率和测试的时候不一样，或者滚动条有一定的滚动距离后，问题就出现了
      // 3. 因此，我们经过分析，得到结论；不能把位置的坐标固定死，而是应该根据不同的情况，动态计算这个坐标。
      // 4. 分析怎么来实现？
      // 5. 经过分析，得出解题思路：先得到购物车徽标的坐标，再得到小球的坐标，然后对应求差，得到的结果就是最后位移的距离
      // 6. 如果获取 徽标和小球的位置？？？  domObject.getBoundingClientRect() dom对象的这个方法可以获取

      // 获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect()
      // 使用 DOM 获取徽标在页面中的位置
      const badgePostion = document
        .getElementById('badge')
        .getBoundingClientRect()
      // 位移的距离
      const xDist = badgePostion.left - ballPosition.left
      const yDist = badgePostion.top - ballPosition.top
      console.log(xDist, yDist)

      el.style.transform = `translate(${xDist}px,${yDist}px)`
      el.style.transition = 'all 0.5s cubic-bezier(1,-0.53,.58,.76)'
      // 设置一个 贝塞尔
      done()
    },
    afterEnter (el) {
      this.ballFlag = !this.ballFlag
    },
    getSelectedCount (count) {
      // 【父组件给子组件传递方法，子组件用$emit可以传值给父组件】当子组件把选中的数量传递给父组件的时候，把选中的值保存到data上
      this.selectedCount = count
      console.log('父组件拿到的数量值' + this.selectedCount)
    }
  },

  components: {
    'cmt-swiper': swiper,
    'cmt-numbox': numbox
  }
}
</script>

<style lang="scss" scope>
.goodsinfo-container {
  background-color: #eeeeee;
  overflow: hidden;
  .now_price {
    font-size: 18px;
    font-weight: 700;
    color: red;
  }
  .mint-button--small {
    width: 95px;
  }
  .mint-button--primary {
    background-color: #fec82c;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 10px 0;
    }
  }
}
.ball {
  width: 18px;
  height: 18px;
  border-radius: 50px;
  position: absolute;
  top: 388px;
  left: 150px;
  background-color: red;
  z-index: 11;
}
</style>
