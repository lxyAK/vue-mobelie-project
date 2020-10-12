import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 当加载 index 文件的时候,直接获取 localStorage 中的数据,如果没有则获取一个空数组
const car = JSON.parse(localStorage.getItem('car') || '[]')

export default new Vuex.Store({
  // 得到一个数据仓储对象 store
  state: {
    // 大家可以把 state 想象成组件中的 data , 专门用来存储数据的
    count: 0,
    car: car
  },
  mutations: {
    addToCar (state, goodsToShopCar) {
      // 点击加入购物车,把商品信息,保存到 store 中的 car 上
      // 分析:
      // 1. 如果购物车中,之前已经有这个对应的商品了,那么只需要更新数量
      // 2. 如果没有,则直接把商品数据, push 到 car 中即可

      // 设置一个标识符,判断购物车中是否有对应的商品了,默认没有找到
      var flag = false

      state.car.some((item) => {
        // 遍历数组中的元素,然后判断,找到后 return true 终止
        if (item.id === goodsToShopCar.id) {
          item.count += parseInt(goodsToShopCar.count)
          // 找到了就修改标识符,防止执行 push
          flag = true
          return true
        }
      })

      // 如果最终, 循环完毕, 得到的 flag 还是 false, 则把商品数据直接 push 到 car 中
      if (!flag) {
        state.car.push(goodsToShopCar)
      }

      // 存储到 localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsCount (state, goodsToShopCar) {
      // 修改购物车中商品的数量值，并同步到 store 中，覆盖之前的数量值
      state.car.some((item) => {
        // 通过id匹配到需要修改的商品
        if (item.id === goodsToShopCar.id) {
          item.count = parseInt(goodsToShopCar.count)
          return true
        }
      })
      // 修改完之后，把最新购物车数据保存到本地
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeGoodsFromCarById (state, id) {
      state.car.some((item, index) => {
        // 根据 id 来匹配需要删除的商品,用索引去删除
        if (item.id === id) {
          state.car.splice(index, 1)
          return true
        }
      })
      // 修改完之后，把最新购物车数据保存到本地
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelectedById (state, info) {
      // 循环遍历 car 中的商品，根据 id 匹配商品,修改其 selected 属性
      state.car.some((item) => {
        if (item.id === info.id) {
          item.selected = info.selected
        }
      })
      // 修改完之后，把最新购物车数据保存到本地
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    getShopCarCount (state) {
      var currentShopCarCount = 0
      // 把 car 中的数据包装一下
      state.car.forEach((item) => {
        // 循环 car 中每个元素 , 获取他们的 count , 存到currentShopCarCount中
        currentShopCarCount += item.count
      })
      return currentShopCarCount
    },
    getGoodsCount (state) {
      var o = {}
      state.car.forEach((item) => {
        // 把每项商品的id作为 o 对象中的属性的键，商品的数量作为属性的值
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected (state) {
      var o = {}
      state.car.forEach((item) => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount (state) {
      // 包装一个对象，循环判断商品的 selected 值，如果为true则,把商品的数量和价格添加到这个对象中
      var o = {
        count: 0,
        amount: 0
      }
      state.car.forEach(item => {
        if (item.selected === true) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})
