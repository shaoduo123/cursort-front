import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import index from './options'

/**
 * 导入配置信息
 */
export default new Vuex.Store(index) ;

