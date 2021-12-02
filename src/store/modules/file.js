import axios from "../../assets/js/http";
import qs from "qs";

export default {
  state:{
    chooseStatus:false, //文件选中的状态，选中状态需要联动其他组件 显示响应的操作
    checkedIds:[], //选中的文件夹ids
    sourceIds:[], //准备复制和粘贴的源文件ids
    targetId:{}, //目标文件夹（粘贴或者拷贝的到的目标文件夹）id
    testStr:"文字来自文件组件",
    rootFile:{}, // 根目录文件，（即将废弃，取而代之是currFile）
    currFile:{}, //当前文件夹或文件
    fileList:[], //文件目录列表
    reviewFiles:[], //查看页面时相册的图片
    reviewIndex:0,  //查看的第几张图片
    keyword:{},
    refreshstate:false,
   // uploadPopoverVisible:false, //上传弹出框
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
    clearFileList(state,payload){
      state.fileList = [];
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
    setReviewIndex(state,payload){
      console.log("aaaaaaa",payload)
      state.reviewIndex = payload ;
    },
    setTargetId(state,payload){
      state.targetId = payload ;
    },
    setSourceIds(state,payload){
      state.sourceIds = payload ;
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
    async createRoot({commit,state,dispatch}){
      return new Promise((resolve, reject) => {
        axios.get('/api/file/getRoot')
          .then(function (response) {
            if (response.data.code == 0) {
              var rootFloder = response.data.data;
              //dispatch('testLogin', userInfo, {root: true});
              if(rootFloder==null){
                dispatch("createRoot") ;
              }
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
    async getRootFolder({commit,state,dispatch}){
      return new Promise((resolve, reject) => {
        axios.get('/api/file/getRoot',{
          params:{
            CURRENT_FILE_ID:state.currFile.id,
          }
        })
          .then(function (response) {
          if (response.data.code == 0) {
            var rootFloder = response.data.data;
            //dispatch('testLogin', userInfo, {root: true});
            if(rootFloder==null){
              dispatch("createRoot") ;
            }
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
    async getFiles({commit,state,dispatch},payload){
      debugger;
      let folderId = payload.folderId ;
      let count = payload.count ;
      let page = payload.page ;
      return new Promise((resolve, reject) => {
        axios.get('/api/file/list', {
          params:{
            fileId: folderId,
            count: count,
            page: page,
          }
        }).then(function (response) {
          debugger;
          if (response.data.code == 0) {
            var fileList = response.data.data;
            if(state.fileList.length == 0 && page == '1')
            {
              commit('setFileList',fileList);
              resolve("加载成功");
            }else{
              debugger;
              if(fileList.length == 0){
                reject("没有数据了");
              }
              fileList.forEach((item)=>{
                state.fileList.push(item);
              })
              resolve("加载成功");

              //commit('setFileList',state.fileList);
            }

            //dispatch('testLogin', userInfo, {root: true});


          } else {
            reject(response.data.msg);
          }
        })
          .catch(function (error) {
            reject(error);
          });
      });
  },
    async getCurrFiles({commit,state,dispatch},payload){
      return new Promise((resolve, reject) => {
        let folderId = payload.folderId;
        let count = payload.count;
        let page = payload.page;
        if (folderId == null || folderId == "" || typeof folderId == 'undefined') {

           dispatch('getRootFolder')
            .then((resp) => {
              //如果没有东西就为空
              console.log("state", state)
              if (state.currFile == null)
                return false;

              var p = {
                folderId: state.currFile.id,
                count: count,
                page: page,
              }
              dispatch('getFiles', p)
                .then((resp) => {
                  resolve(resp);
                }).catch((error) => {
                reject(error);
              });

            })
            .catch((error) => {
              reject(error);
            });
        } else {

          var p = {
            folderId: state.currFile.id,
            count: count,
            page: page
          }
          dispatch('getFiles', payload).then((resp) => {
            resolve(resp);
          }).catch((error) => {
            reject(error);
          });
        }
      });
    },

    delFiles({commit,state,dispatch}){
      //let data  = qs.stringify({ fileIds: state.checkedIds }, {indices: true}) ;
      let ids = ""
      state.checkedIds.forEach((item)=>{
        ids +=item+","
      })
      // let data = {
      //   fileIds:state.checkedIds
      // }
       console.log("file-delFiles",ids);

      //get请求不是长久之计策，get有最大传输数据限制，后期要改成post请求
      return new Promise((resolve,reject)=>{
        axios.get('/api/file/dels',{
          params:{
            ids:ids
          }
        }
        )
          .then(function (res) {
            if(res.data.code == 0 ){
              resolve(res.data.msg) ;
            }else{
              reject("删除失败！");
            }
          })
          .catch(function (error){
            reject(error);
          })
      });
    },createFolder({commit,state,dispatch},payload){
      let folderName = payload;
      return new Promise((resolve,reject)=>{
        axios.get('/api/file/createFolder',{
            params:{
              CURRENT_FILE_ID:state.currFile.id,
              folderName:folderName
            }
          }
        )
          .then(function (res) {
            if(res.data.code == 0 ){
              resolve(res.data.msg) ;
            }else{
              reject(res.data.msg) ;
            }
          })
          .catch(function (error){
            reject(error);
          })
      })
    },copy({commit,state,dispatch}){
      state.targetId = state.currFile.id;
      let ids = ""
      state.sourceIds.forEach((item)=>{
        ids +=item+","
      })
      debugger;
      return new Promise((resolve,reject)=>{
        axios.get('/api/file/copys',{
          params:{
            sourceFileIds:ids,
            toFolderId:state.targetId
          }
        }).then(function (res){
          if(res.data.code ==0 ){
            resolve(res.data.msg) ;
          }else{
            reject(res.data.msg) ;
          }
        }).catch((error)=>{
          reject(error) ;
        })
      })
    },cut({commit,state,dispatch}){
      state.targetId = state.currFile.id;
      let ids = ""
      state.sourceIds.forEach((item)=>{
        ids +=item+","
      })
      return new Promise((resolve,reject)=>{
        axios.get('/api/file/cuts',{
          params:{
            sourceFileIds:ids,
            toFolderId:state.targetId
          }
        }).then(function (res){
          if(res.data.code ==0 ){
            resolve(res.data.msg) ;
          }else{
            reject(res.data.msg) ;
          }
        }).catch((error)=>{
          reject(error) ;
        })
      })
    },rename({commit,state,dispatch},payload){
      let newName = payload ;
      let fileId = state.checkedIds[0] ;
      return new Promise((resolve,reject)=>{
        axios.get('/api/file/rename',{
          params:{
            fileId:fileId,
            newName:newName,
            CURRENT_FILE_ID:state.currFile.id,
          }
        }).then(function (res){
          if(res.data.code ==0 ){
            resolve(res.data.msg) ;
          }else{
            reject(res.data.msg) ;
          }
        }).catch((error)=>{
          reject(error) ;
        })
      })
    }
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
