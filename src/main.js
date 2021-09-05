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
