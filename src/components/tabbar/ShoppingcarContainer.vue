<template>
  <div class="shopCar-container">
    <div class="goods-list">
      <!-- 商品列表区域 -->
      <div class="mui-card" v-for="(item,i) in goodsList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <!-- 复选框组件 -->
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <img :src="item.img_url" />

            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <!-- numbox 组件 -->
                <numbox :initCount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></numbox>
                <a href="#" @click="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计(不含运费)</p>
            <p>
              已勾选商品
              <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，总价
              <span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
    <!-- {{this.$store.getters.getGoodsSelected}} -->
  </div>
</template>

<script>
// 导入ShopCar_numbox 组件
import numbox from './ShopCar_numbox.vue'

import qs from 'qs'

export default {
  data () {
    return {
      // 创建一个空数组，用于存放商品列表
      goodsList: []
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      // console.log(this.$store.getters.getGoodsCount);
      // 先从 store 中获取所有商品的id，然后判断是否存在商品,存在则放入一个 idArr 数组中
      var idArr = []
      this.$store.state.car.forEach((item) => idArr.push(item.id))
      // 如果没有商品，则不执行后面代码
      if (idArr.length <= 0) return
      // console.log(idArr);
      // 如果有商品，则请求商品的列表数据
      this.axios({
        method: 'get',
        params: {
          ids: idArr
        },
        paramsSerializer: function (params) {
          console.log(qs.stringify(params, { arrayFormat: 'repeat' }))
          return qs.stringify(params, { arrayFormat: 'repeat' })
        },
        url: '/api/goods/getshopcarlist/'
      })
        .then((result) => {
          if (result.data.status === 0) {
            this.goodsList = result.data.message
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    remove (id, index) {
      this.goodsList.splice(index, 1) // 根据索引的位置进行删除
      this.$store.commit('removeGoodsFromCarById', id)
    },
    selectedChanged (id, value) {
      // console.log(id+'----'+value);
      // 每当点击开关，把最新的开关状态同步到 store 中
      this.$store.commit('updateGoodsSelectedById', { id, selected: value })
    }
  },
  components: { numbox }
}
</script>

<style lang="scss" scoped>
.shopCar-container {
  background-color: #eeeeee;
  overflow: hidden;
  .goods-list {
    img {
      width: 60px;
      height: 60px;
    }
    .mui-card-content-inner {
      display: flex;
      align-items: center;
      .info {
        h1 {
          font-size: 13px;
          margin-bottom: 10px;
        }
        .price {
          color: red;
          font-weight: 700;
        }
      }
    }
  }
  .jiesuan {
    display: flex; //flex布局
    justify-content: space-between; //等距分布
    align-items: center; //纵向居中
    .red {
      color: red;
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>
