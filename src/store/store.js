import Vue from 'vue'
import Vuex from 'vuex'
import State from './state.js'
import Mutations from './mutations.js'
import Actions from './actions'
import getters from './getters'

import Search from './modules/search'
import File from './modules/file'
import Login from './modules/login'

Vue.use(Vuex);
/**
 * 分模块全局组册模块的store
 * 全局注册所有组件的store，以便于在项目任何vue中获取各组件的store值
 * 任意位置获取方式：this.$store.search.state.xxxx
 */
export default new Vuex.Store({
  state:{
    userInfo:{
      id:'',
      name:'少多',
      phone:'',
      mail:'',
      vip:'',
      create_time:'',
      balance:'',
      last_time:'',//最后访问时间
      token:'',
    }
  },
  Mutations,
  actions:{
    testLogin({ commit, dispatch, state},payload){
      state.userInfo.id = payload.userId;
      state.userInfo.token = payload.token;
      console.log("我到了user的testlogin",state.userInfo.id)

    }
  },
  getters,
  modules:{
    search:Search,
    file:File,
    login:Login
  }
  ,
  namespaced:true,
})
