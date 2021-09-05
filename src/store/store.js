import Vue from 'vue'
import Vuex from 'vuex'
import State from './state.js'
import Mutations from './mutations.js'
import Actions from './actions'
import Search from '../components/search/store/options'
import Mfile from '../components/file/store/options'
import getters from './getters'

Vue.use(Vuex);
/**
 * 分模块全局组册模块的store
 * 全局注册所有组件的store，以便于在项目任何vue中获取各组件的store值
 * 任意位置获取方式：this.$store.search.state.xxxx
 */
export default new Vuex.Store({
  State,
  Mutations,
  Actions,
  getters,
  modules:{
    g:State,
    search:Search,
    file:Mfile,
  }
})
