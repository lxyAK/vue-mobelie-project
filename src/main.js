// 导入 vue
import Vue from 'vue'
// 导入 App 组件
import App from './App.vue'
// 导入store
import store from './store'
// 导入mint-ui
import './plugins/mint-ui'

import router from './router'

// 引入 qs 插件
import qs from 'qs'

import axios from 'axios'

// 缩略图插件
import VuePreview from 'vue-preview'
// Vue.use(preview, {
// mainClass: 'pswp--minimal--dark',
// barsSize: {top: 0, bottom: 0},
// captionEl: false,
// fullscreenEl: false,
// shareEl: false,
// bgOpacity: 0.85,
// tapToClose: true,
// tapToToggleControls: false
// })

// 导入 moment.js 格式化时间
import moment from 'moment'

// 导入 MUI
import './lib/dist/css/mui.min.css'
import './lib/dist/css/icons-extra.css'

Vue.prototype.$qs = qs
// 配置请求的基准URL地址
// axios.defaults.baseURL = 'http://127.0.0.1:3000'
// axios设置请求拦截器
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorizatior = sessionStorage.getItem('token') // 设置响应头
  return config
}, err => {
  console.log(err)
})
Vue.prototype.axios = axios
Vue.use(VuePreview)
// 定义全局过滤器
Vue.filter('dateFormat', function (dateStr, pettern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dateStr).format(pettern)
})

new Vue({
  // 挂载路由
  router,
  // 挂载 vuex
  store,
  render: h => h(App)
}).$mount('#app')
