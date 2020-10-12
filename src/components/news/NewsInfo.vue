<template>
  <div class="newsInfo-container">
    <h3 class="title">{{newsinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{newsinfo.add_time | dateFormat}}</span>
      <span>点击：{{newsinfo.click}}次</span>
    </p>
    <hr>

    <div class="content">
      {{ newsinfo.content }}
    </div>
    <!-- 父组件向子组件传递数据 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
export default {
  data () {
    return {
      // 监听路由传递过来的id，保存到 data 中，方便发送 get 请求时给服务端发送对应的 id
      id: this.$route.params.id,
      newsinfo: {}
    }
  },
  created () {
    this.getnewsinfo()
  },
  methods: {
    async getnewsinfo () {
      try {
        const res = await this.axios.get('/api/getnewsinfo/' + this.id)
        // console.log(res);
        this.newsinfo = res.data // 将数据保存在 data 中
      } catch (err) {
        // eslint-disable-next-line no-undef
        Toast('获取数据失败')
      }
    }
  },
  components: {
    'comment-box': comment
  }
}
</script>

<style lang="scss" scoped>
.newsInfo-container {
  padding: 0px 5px;
  .title{
    font-size: 18px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle{
    display: flex;
    justify-content:space-between ;
    color: #226aff;
  }
  .content{
    font-size: 14px;
  }
}
</style>
