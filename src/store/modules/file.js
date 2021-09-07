
export default {
  state:{
    chooseStatus:false, //文件选中的状态，选中状态需要联动其他组件 显示响应的操作
    checkedIds:[],
    testStr:"文字来自文件组件",
    currFile:{}, //当前文件夹或文件
  },
  mutations:{
    setChooseStatus(state,payload){
      state.chooseStatus = payload.checkboxIsShow;
      console.log("--setChooseStatus",state.chooseStatus)
    },
    setCheckIds(state,payload){
      state.checkedIds = payload.checkedIds;
      console.log(state.checkedIds) ;
    }
  },
  getters:{
    test: state => {
      return '来自mfile的文字';
    },
    checkIds(state){ //暴露选中的id
      return state.checkedIds;
    },
    chooseStatus(state){ //暴露选中状态
      return state.chooseStatus;
    }
  },
  actions:{

  },
  namespaced:true

  /**有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数：
   * 如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它，所以getters 的意义在于此。
   * getters 实际上相当于计算属性，把store中的某一个状态拿出来
   * 在vue类中使用计算属性 去拿 store.getters.xxxx来取值**/

}
