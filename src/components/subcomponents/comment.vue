<template>
  <div class="cmt-container">
    <h3>评论子组件</h3>
    <hr />
    <textarea placeholder="请输入要BB的内容,最多120个字" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComments">发表评论</mt-button>

    <div class="cmt-list" v-for="(item, i) in comments" :key="item.add_time">
      <div class="cmt-item">
        <div class="cmt-title">
          第{{ i + 1 }}楼&nbsp;&nbsp;用户:{{
          item.user_name
          }}&nbsp;&nbsp;发表时间:{{ item.add_time | dateFormat }}
        </div>
        <div class="cmt-body">{{ item.content }}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      // 创建一个空数据，方便存储评论的数据
      comments: [],
      pageIndex: 1, // 默认显示第一页数据
      msg: '' // 做好评论的双向数据绑定
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async getComments () {
      try {
        const res = await this.axios.get(
          '/api/getcomments/' + this.id + '?pageindex=' + this.pageIndex
        )
        // console.log(res);
        this.comments = this.comments.concat(res.data.user_comments)
      } catch (error) {
        Toast('获取数据失败')
      }
    },
    getMore () {
      this.pageIndex++
      this.getComments()
    },
    postComments () {
      // 校验
      if (this.msg.trim().length === 0) {
        return Toast('内容不能为空!')
      }
      this.axios({
        method: 'post',
        url: '/api/postcomments/',
        params: { id: this.$route.params.id },
        data: { content: this.msg.trim(), add_time: Date.now() }
        // 这里必须传递时间过去,不能使用服务端的默认时间,会跟客户端渲染页面的时间产生冲突
      }).then(result => {
        console.log(result.data)
        if (result.status === 200) {
          // 判断是否提交成功
          // 手动拼接一个新数据对象
          var cmt = {
            user_name: '匿名用户',
            add_time: Date.now(),
            content: this.msg.trim()// vue-axios 中 this 不指向 vue ,需要用到箭头函数来指向调用者 vue
          }
          // 添加到 data 中的 comments 中
          this.comments.unshift(cmt)
          this.msg = ''
        }
      })
    }
  },
  // 定义父组件传递过来的数据
  props: ['id']
}
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 14px;
      line-height: 35px;
      .cmt-title {
        background-color: #cccccc;
      }
      .cmt-body {
        text-indent: 2em;
      }
    }
  }
}
</style>
