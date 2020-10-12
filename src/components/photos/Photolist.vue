<template>
  <div class="photolist-container">
    <!-- <h3>图片组件</h3> -->
    <!-- 顶部滑动条 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id==0?'mui-active':'']"
            v-for="item in cate"
            :key="item.id"
            @click="getphotoListByCateId(item.id)"
          >{{ item.title }}</a>
          <!-- 把分类列表 cate 的id传递给 获取图片列表方法 -->
        </div>
      </div>
    </div>
    <!--图片列表区域-->
    <ul class="photo-list">
      <router-link v-for="item in photoList" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
        <!-- 延迟加载效果 -->
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 1.导入 mui 的js 文件
import mui from '../../lib/dist/js/mui.min.js'
import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      cate: [],
      photoList: []
    }
  },
  created () {
    this.getimgcategory()
    // 刷新直接加载图片 默认参数为0
    this.getphotoListByCateId(0)
  },
  methods: {
    getimgcategory () {
      this.axios.get('/api/getimgcategorf').then((res) => {
        // console.log(res.data);
        if (res.data.status === 0) {
          res.data.message.unshift({ title: '全部', id: 0 })
          this.cate = res.data.message
        }
      })
    },
    // 根据分类列表的 id 获取对应的图片数据
    getphotoListByCateId (cataId) {
      this.axios({
        method: 'get',
        url: '/api/getimages/',
        params: { id: cataId }
      }).then((result) => {
        // console.log(cataId);
        if (result.data.status === 0) {
          this.photoList = result.data.message
        } else {
          Toast('获取数据失败')
        }
      })
    }
  },
  mounted () {
    // 当组件中的 DOM 结构被渲染好并放到页面中去了,会执行这个钩子函数
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })
  }
}
</script>

<style lang="scss" scoped>
/* *{ */
/*   touch-action: pan-x; */
/* } */

.photo-list {
  padding: 0px;
  margin: 10px;
  li {
    background-color: #cccccc;
    list-style: none;
    text-align: center;
    box-shadow: 0 0 9px #999;
    position: relative;
    margin-bottom: 10px;
    img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      width: 100%;
      color: #ffffff;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba($color: #000000, $alpha: 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>
