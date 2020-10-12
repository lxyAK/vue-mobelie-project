<template>
  <div class="goods-list">
    <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="getGoodsData(item.id)">
      <img :src="item.img_url" />
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">${{ item.sell_price }}</span>
          <span class="old">${{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>

    <!-- 加载更多区域 -->
    <mt-button type="danger" size="large">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  // 往组件内部挂载一些私有数据
  data () {
    return {
      pageindex: 0, // 分页的页数默认
      goodsList: [] // 存放商品信息的空数组
    }
  },

  // vue 的生命周期钩子函数
  mounted () {
    // 绑定listenBottomOut方法，启动事件监听
    window.addEventListener('scroll', this.listenBottomOut)
    // 预先加载一遍
    this.getGoodsList()
  },

  methods: {
    // 触底触发函数
    listenBottomOut () {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      const clientHeight = document.documentElement.clientHeight
      const scrollHeight = document.documentElement.scrollHeight
      console.log('当页面卷曲出去的高度+页面可见区域：' + (scrollTop + clientHeight))
      console.log('页面正文全文高度:' + scrollHeight)
      // 当页面卷曲出去的高度+页面可见区域 >= 页面正文全文高度的时候;调用 获取更多 方法
      if (scrollTop + clientHeight >= scrollHeight) {
        this.getMore()
        console.log(this.pageindex)
      }
    },
    getGoodsList () {
      // 获取商品列表数据的方法,需要传递参数
      this.axios({
        method: 'get',
        url: '/api/getgoods',
        params: {
          pageindex: this.pageindex
        }
      }).then(
        (result) => {
          // console.log(result);
          if (result.data.status == 0) {
            // 新老数据拼接
            this.goodsList = this.goodsList.concat(result.data.message)
          }
        },
        (err) => {
          Toast('获取商品失败')
          console.log(err)
        }
      )
    },
    getMore () {
      this.pageindex++
      this.getGoodsList()
    },
    getGoodsData (id) {
      // 设置路由导航,并传递当前商品的id
      this.$router.push({ name: 'goodsinfo', params: { id } })
    }
  },

  // vue 的生命周期钩子函数
  destroyed () {
    // 离开页面取消监听
    window.removeEventListener('scroll', this.listenBottomOut, false)
  }
}
</script>

<style lang="scss" scope>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 270px;
    img {
      width: 100%;
    }
    .title {
      // bottom: 0;
      word-break: break-all;
      overflow: hidden;
      line-height: 18px;
      text-overflow: ellipsis;
      height: 35px;
      font-size: 14px;
    }

    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
