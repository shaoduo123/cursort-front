import axios from "../../assets/js/http";
import qs from "qs";
export default {
  namespaced:true, //必须写，让组件能够按照命名空间的方式获取
  state:{
    space:{
      restSize:0,
      totalSize:0,
      percent:0
    },

  },
  mutations:{
    setSpace(state,payload){
      state.space = payload;
      console.log("--setSpace",state.space) ;
    }
  },
  getters:{

  },
  actions:{
      async getSpaceSize({commit,state,dispatch}){
        return new Promise((resolve,reject) =>{
          axios.get('/api/file/getRestSpace').then(
            (response)=>{
              if(response.data.code == 0 ){
                var space = response.data.data ;
                commit('setSpace',space) ;
                resolve(response.data.msg) ;
              }else{
                reject(response.data.msg) ;
              }
            }
          ).catch((error)=>{
            reject(error) ;
          })
        })
      }
  },
}
