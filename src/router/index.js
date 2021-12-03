import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/views/main'
import Login from '@/views/login'
import review from "../views/review";
import File from '@/components/mfile' ;
import Recycle from '@/views/recycle' ;

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/review',
      name: 'review',
      component: review
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/',
      name: 'main',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Main,
      redirect:'/file',  //默认子路由，默认是开启此路由页面
      children: [
        {
          path: '/file',
          name: 'file',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          },
          component: File
        },
        {
          path: '/recycle',
          name: 'recycle',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Recycle
        },
      ]
    },


  ]
})



