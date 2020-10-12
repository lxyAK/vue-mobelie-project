<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <!-- 跳转新闻详情的地址，附上对应的 id，路由规则中也绑定对应的 id -->
        <router-link :to="'/home/newsinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class="mui-ellipsis">
              <span>发表时间:{{ item.add_time | dateFormat }}</span>
              <!-- <span>{{ item.zhaiyao }}</span> -->
              <span>点击:{{ item.click }}次</span>
              </p>
            <span></span>
            <span></span>
          </div>
        </router-link>
      </li>
    </ul>
    <h3>新闻资讯组件</h3>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newslist: []
    }
  },
  created () {
    this.getnewslist()
  },
  methods: {
    async getnewslist () {
      try {
        const res = await this.axios.get('/api/getnewslist')
        // console.log(res);
        this.newslist = res.data // 将数据保存在数组中
      } catch (err) {
        // eslint-disable-next-line no-undef
        Toast('获取数据失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .mui-table-view {
    li{
      h1 {
        font-size: 14px;
      }
      .mui-ellipsis{
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        color: #226aff;
      }
    }
  }
</style>
