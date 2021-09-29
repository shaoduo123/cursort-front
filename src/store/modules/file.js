import axios from "../../assets/js/http";

export default {
  state:{
    chooseStatus:false, //文件选中的状态，选中状态需要联动其他组件 显示响应的操作
    checkedIds:[],
    testStr:"文字来自文件组件",
    rootFile:{},
    currFile:{}, //当前文件夹或文件
    fileList:[],
    reviewFiles:[], //查看页面
    reviewIndex:0,  //查看的第几张图片
    uploadFiles:[], //上传列表
  },
  mutations:{
    setChooseStatus(state,payload){
      state.chooseStatus = payload.checkboxIsShow;
      console.log("--setChooseStatus",state.chooseStatus)
    },
    setCheckIds(state,payload){
      state.checkedIds = payload.checkedIds;
      console.log(state.checkedIds) ;
    },
    setFileList(state,payload){
      /**初始化选择为false**/
      payload.forEach(function(item) {
        item.check = false;
      });
      state.fileList = payload ;
    },
    setCurrFile(state,payload){
      state.currFile = payload;
    },
    setRootFile(state,payload){
      state.rootFile = payload;
    },
    setImage(state,payload){
   //   state.visiable = true ;
   //   state.image = 'https://img.zcool.cn/community/014de75542b5750000019ae936d00b.jpg@1280w_1l_0o_100sh.jpg';
    },
    setReviewFiles(state,payload){
      state.reviewFiles = payload.reviewFiles;
      state.reviewIndex = payload.index;
    },
    setUploadFiles(state,payload){
      state.reviewFiles = payload;
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
    getRootFolder({commit,state,dispatch}){
      return new Promise((resolve, reject) => {
        axios.get('/api/file/getRoot')
          .then(function (response) {
          debugger;
          if (response.data.code == 0) {
            var rootFloder = response.data.data;
            //dispatch('testLogin', userInfo, {root: true});
            commit('setCurrFile',rootFloder);
            commit('setRootFile',rootFloder);
            resolve(response.data.msg);
          } else {
            reject(response.data.msg);
          }
        })
          .catch(function (error) {
            reject(error);
          });
      });
    },
    getFiles({commit,state,dispatch},payload){
      let folderId = payload.folderId ;
      let count = payload.count ;
      let page = payload.page ;
      return new Promise((resolve, reject) => {
        axios.get('/api/file/list', {
          params:{
            fileId: folderId,
            count: count,
            page: page
          }
        }).then(function (response) {
          debugger;
          if (response.data.code == 0) {
            var fileList = response.data.data;
            //dispatch('testLogin', userInfo, {root: true});

            commit('setFileList',fileList);
            resolve(response.data.msg);
          } else {
            reject(response.data.msg);
          }
        })
          .catch(function (error) {
            reject(error);
          });
      });
  },
 /*   getFilesByFloder({commit,state,dispatch},payload){
      let folderId = payload.folderId ;
      return new Promise((resolve,reject)=>{
        axios.get('/api/file/getFilesById',{
          params:{
            folderId: folderId,
          }
        }).then(function (res){
          if(res.data.code == 0 ){
           let fileList =  res.data.data ;
            commit('setReviewFiles',fileList);
            resolve(res.data.msg);
          }else{
            reject(res.data.msg);
          }
        }).catch(function (error){
          reject(error);
        })
      })
    }*/
  },
  namespaced:true

  /**有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数：
   * 如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它，所以getters 的意义在于此。
   * getters 实际上相当于计算属性，把store中的某一个状态拿出来
   * 在vue类中使用计算属性 去拿 store.getters.xxxx来取值**/

}
