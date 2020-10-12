<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}{{id}}</h3>
    <p class="subtitle">
      <span>发表时间:{{photoinfo.add_time | dateFormat}}</span>
      <span>点击:{{photoinfo.click}}次</span>
    </p>
    <hr />
    <!-- 缩略图区域 -->
    <div class="thumbsImages">
      <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
    </div>

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 评论子组件 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
// 导入评论组件
import comment from '../subcomponents/comment.vue'
import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      // 把路由传递过来的 id 保存到当前组件的 data 中
      id: this.$route.params.id,
      // 设置一个空对象,方便接受数据
      photoinfo: {},
      slide1: [] // 存放缩略图的空数组
    }
  },
  methods: {
    // 用于获取图片详情页面中的详细描述信息
    getPhotoInfo () {
      this.axios({
        method: 'get',
        url: '/api/getimageInfo/',
        params: { id: this.id }
      }).then((result) => {
        // console.log(result);
        if (result.data.status === 0) {
          // 获取数据成功
          this.photoinfo = result.data.message[0]
        }
      })
    },
    getThumbsImages () {
      this.axios({
        method: 'get',
        url: '/api/getthumimages/',
        params: {
          id: this.id
        }
      }).then((result) => {
        // console.log(result);
        if (result.data.status === 0) {
          // 循环每个图片的数据，添加宽和高
          result.data.message.forEach((element) => {
            element.w = 600
            element.h = 800
            element.msrc = element.img_url
            element.src = element.img_url
          })
          this.slide1 = result.data.message
        } else {
          Toast('获取图片失败')
        }
      })
    },
    handleClose () {
      console.log('close event')
    }
  },
  created () {
    this.getPhotoInfo()
    this.getThumbsImages()
  },
  components: {
    'comment-box': comment
  }
}
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
}

.thumbsImages {
  ::v-deep .my-gallery {
    //deep深层作用选择器
    display: flex;
    flex-wrap: wrap; //默认换行
    figure {
      width: 30%;
      margin: 5px;
      img {
        width: 100%;
        box-shadow: 0 0 8px #999;
        border-radius: 5px;
      }
    }
  }
}
</style>
