/**
 * 如果不是store模块话，此文件意义不大，如果store模块化了， 全局的store 需要引进此文件的配置信息，
 * 具体到每个模块的store也需要引进此文件配置信息
 *
 * 1.该文件可以拆分成多个文件：state.js  mutations.js action.js getters js
 * state.js
 * mutations.js
 * action.js
 * getters.js
 *
 * state.js里是这样的
 * export default{
      test:"汉族"
 * }
 *  。。。以此类推。。。
 *  到最后组合如下
 *  import State from './state.js'
 *  import State from './Actions.js'
 *  import State from './Mutations.js'
 *  import State from './Getters.js'
 * export default{
 *   state:State,
 *   actions:Actions,
 *   mutations:Mutations,
 *   getters:Getters,
 * }
 *
 *======================================
 * 2.也可以拆分多个变量组装到一起
 * const state={
 *   test:"汉族"
 * }
 * const actions={
 *  ....
 * }
 *

 * .......
 *最后组合成如下
 * export default{
 *   state,
 *   actions,
 *   mutations,
 *   getters,
 * }
 *
 *
 */
export default {
  state:{
    test:"汉族"
  },
  mutations:{
    setTest(state,payload) {
      state.test = payload.test;
      console.log("--setTest")
    }
  },
  actions:{},
  getters:{
    testaa: state => {
      return 'aaaa';
    }
  }
  ,namespaced: true,//namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接

}
