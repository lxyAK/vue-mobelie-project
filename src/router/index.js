// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

// Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

// const router = new VueRouter({
//   routes
// })

// export default router

// 导入 vue
import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'

// 导入组件
import HomeContainer from '../components/tabbar/HomeContainer.vue'
import MemberContainer from '../components/tabbar/MemberContainer.vue'
import SearchContainer from '../components/tabbar/SearchContainer.vue'
import ShoppingcarContainer from '../components/tabbar/ShoppingcarContainer.vue'
import Newslist from '../components/news/Newslist.vue'
import NewsInfo from '../components/news/NewsInfo.vue'
import Photolist from '../components/photos/Photolist.vue'
import Photoinfo from '../components/photos/Photoinfo.vue'
import Goodslist from '../components/goods/Goodslist2.vue'
import Goodsinfo from '../components/goods/Goodsinfo.vue'
import Goodsdesc from '../components/goods/Goodsdesc.vue'
import Goodscomments from '../components/goods/Goodscomments.vue'
// 安装路由
Vue.use(VueRouter)

// 创建路由规则
var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/search', component: SearchContainer },
    { path: '/shoppingcar', component: ShoppingcarContainer },
    { path: '/home/newslist', component: Newslist },
    { path: '/home/newsInfo/:id', component: NewsInfo },
    { path: '/home/photolist', component: Photolist },
    { path: '/home/photoinfo/:id', component: Photoinfo },
    { path: '/home/goodslist', component: Goodslist },
    { path: '/home/goodsinfo/:id', component: Goodsinfo, name: 'goodsinfo' },
    { path: '/home/goodsdesc/:id', component: Goodsdesc, name: 'goodsdesc' },
    { path: '/home/Goodscomments/:id', component: Goodscomments, name: 'Goodscomments' }
  ],
  linkActiveClass: 'mui-active'
})

// 把路由对象暴露出去
export default router
