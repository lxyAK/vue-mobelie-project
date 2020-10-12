<template>
  <div>
    <!-- 轮播图 -->
    <swiper-cmt :lunbotuList = "lunbotuList" :isFull="true"></swiper-cmt>
    <!-- 轮播图 end -->

    <!-- 六宫格 star -->

      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newslist">
            <img src="../../assets/img/menu6.png" alt="">
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/photolist">
            <img src="../../assets/img/menu5.png" alt="">
            <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/goodslist">
            <img src="../../assets/img/menu3.png" alt="">
            <div class="mui-media-body">商品购买</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../assets/img/menu4.png" alt="">
            <div class="mui-media-body">留言专区</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../assets/img/menu2.png" alt="">
            <div class="mui-media-body">视频专区</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../assets/img/menu1.png" alt="">
            <div class="mui-media-body">联系我们</div>
          </a>
        </li>
      </ul>
    <!-- 六宫格 end -->
  </div>
</template>

<script>
// import axios from 'axios';
// const axiosInstance = axios.create({
//   headers: { "Content-Type": "application/json;charset=utf-8" }, // 设置传输内容的类型和编码
//   withCredentials: true, // 指定某个请求应该发送凭据。允许客户端携带跨域cookie，也需要此配置
// });
import { Toast } from 'mint-ui'
// 导入轮播图组件
import swiper from '../subcomponents/swiper.vue'

export default {
  // name: "Home",
  data () {
    return {
      lunbotuList: []
    }
  },
  created () {
    this.getlunbo()
  },
  methods: {
    async getlunbo () {
      try {
        const res = await this.axios.get('/api/getlunbotu')
        // console.log(res);
        this.lunbotuList = res.data // 将数据保存在数组中
      } catch (err) {
        Toast('获取数据失败')
      }
    }
  },
  components: {
    'swiper-cmt': swiper
  }
}
</script>

<style lang="scss" scoped>

.mui-grid-view.mui-grid-9 {
  background-color: #ffffff;
  border:none;
  img{
    width: 60px;
    height: 60px;
  }
  .mui-media-body {
    font-size: 13px;
  }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
  border: 0px;
}
</style>
