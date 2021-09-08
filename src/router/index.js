import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/views/main'
import Login from '@/views/login'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'Main',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Main
    },
  ]
})



