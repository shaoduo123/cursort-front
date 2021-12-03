import Vue from 'vue'
import Vuex from 'vuex'
import State from './state.js'
import Mutations from './mutations.js'
import Actions from './actions'
import getters from './getters'

import Search from './modules/search'
import File from './modules/file'
import Login from './modules/login'
import Menu from './modules/menu.js'
import Recycle from './modules/recycle.js'

Vue.use(Vuex);
/**
 * 分模块全局组册模块的store
 * 全局注册所有组件的store，以便于在项目任何vue中获取各组件的store值
 * 任意位置获取方式：this.$store.search.state.xxxx
 */
export default new Vuex.Store({
  state:{
    // userInfo:{
    //   id:'',
    //   name:'',
    //   phone:'',
    //   mail:'',
    //   vip:'',
    //   create_time:'',
    //   balance:'',
    //   last_time:'',//最后访问时间
    //   unread:0
    // },
    userInfo: JSON.parse((typeof (localStorage.getItem("userInfo"))=='undefined')?"null":localStorage.getItem("userInfo")),
    token: localStorage.getItem("Authorization")||"",
  },
  mutations:{
    setUserInfo(state,payload){
      state.userInfo = payload;
    },
    setToken(state,payload){
      state.token = payload;
    }
    },
  actions:{
    testLogin({ commit, dispatch, state},payload){
      commit('setUserInfo',payload);
    }
  },
  getters,
  modules:{
    search:Search,
    file:File,
    login:Login,
    menu:Menu,
    recycle:Recycle,
  }
  ,
  namespaced:true,
})
