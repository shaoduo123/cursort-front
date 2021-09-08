// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'

//导入icon素材
import iconfont from './assets/icon/iconfont.css'

//导入vue-layer弹窗组件
import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css';
import Router from "vue-router";



Vue.config.productionTip = false;
Vue.prototype.$layer = layer(Vue);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


/**路有权限控制**/
router.beforeEach((to, from, next) => {
  debugger;
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    console.log("main.js",store.state)
    if (store.state.token) { // 通过vuex state获取当前的token是否存在

      next();
    } else {
      next({
        path: '/login',
       // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});
