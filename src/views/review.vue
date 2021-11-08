<template>
<!--  <fox-preview-image v-model="visiable" :src="image" z-index="9000"></fox-preview-image>-->
<!--  <div class="c"-->
  <div class="container" v-if="reRender">
    <div class="header">
      <div class="title">
        <i class="" @click="back"><</i>
        <input type="text" placeholder="不能为空" v-model="files[index].name">
        <i class="iconfont icon-zhengque confirm"></i>
      </div>
    </div>
    <div class="main">
      <div class="preview">

        <!--    tabindex可以使 div具有focus 否则 focus不生效  @click="image=item.url"  -->
        <div class="item" v-for="(item,i) in files"  :id="('item-'+i)" :tabindex="i" @click="changeIndex(i)">
          <img :src="item.preUrl">
          <span>{{item.name}}</span>
        </div>

        <file-upload
          ref="upload"
          v-model="uploadFiles"
          class="add"
          :headers="{'Authorization':token}"
          :data="{'CURRENT_FILE_ID':currFile.id}"
          post-action="/api/file/upload"
          :multiple=true
          @input-file="inputFile"
          @input-filter="inputFilter">
          <span>+</span>
        </file-upload>
<!--        <div class="add">-->
<!--          <span>+</span>-->
<!--        </div>-->
      </div>

      <fox-preview-image class="content" :src="images" :visiable="visiable" :index="index" @change="changeIndex"></fox-preview-image>

      <div class="option">
        <i class="iconfont icon-fenxiang icon-option-style"></i>
        <i class="iconfont icon-xiazai icon-option-style"></i>
        <i class="iconfont icon-shoucang icon-option-style"></i>
        <i class="iconfont icon-shanchu icon-option-style"></i>
      </div>
    </div>
  </div>

</template>

<script>
import FoxPreviewImage from "../components/preview-image";
import  FileUpload from  "vue-upload-component" ;
import {mapActions, mapMutations, mapState} from 'vuex';
import $ from 'jquery'
export default {
  name: "imgPreview",
  components: {FoxPreviewImage,FileUpload},
  data(){
    return{
      visiable:true,
      uploadFiles:[],
      reRender:true,
     // image:['https://img.zcool.cn/community/014de75542b5750000019ae936d00b.jpg@1280w_1l_0o_100sh.jpg','https://img.zcool.cn/community/014de75542b5750000019ae936d00b.jpg@1280w_1l_0o_100sh.jpg']
    }
  },
  mounted() {
    this.init();
  },
  updated() {
    this.changeIndex(this.index);
  },
  // beforeUpdate() {
  //   this.changeIndex(this.reviewIndex)
  // },
  watch:{
    uploadFiles(val){
      console.log("上传",val)
      this.$refs.upload.active = false
      this.$refs.upload.active = true ; //自动开始上传
    }
  },
  methods:{
    ...mapMutations('file',{setReviewFiles:'setReviewFiles',setReviewIndex:'setReviewIndex',clearFileList:'clearFileList'}),
    ...mapActions('file',{getCurrFiles:'getCurrFiles'}),
    back(){
      this.$router.go(-1);
    },
    init(){

      let index = this.index;
      var payload = {
        folderId:this.currFile.id,
        count:99999,
        page:1
      }
       //clear
      this.clearFileList();
      //去数据库中查询一遍数据
      this.getCurrFiles(payload).then((resp) => {
        let reviewFiles = [] ;
        let i = 0 ;
        this.fileList.forEach(function (ite){
          if(ite.type.split('/')[0] =='image'){
            reviewFiles.push(ite) ;
            i++ ;
          }
        });
        let payload = {
          reviewFiles:reviewFiles,
          index:index
        }
        this.setReviewFiles(payload);
      }).catch((error) => {
        this.$layer.msg(error, {icon: 0});
      });

    },

    changeIndex(ind){

      console.log("changeIndex",ind);
      this.setReviewIndex(ind) ;

      document.getElementById("item-"+ind).scrollIntoView();
      document.getElementById("item-"+ind).focus(); //手动聚焦
    },
    /**
     * Has changed
     * @param  Object|undefined   newFile   只读
     * @param  Object|undefined   oldFile   只读
     * @return undefined
     */
    inputFile: function (newFile, oldFile) {
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // 获得相应数据
        console.log('response', newFile.response)
        if (newFile.xhr) {
          //  获得响应状态码
          console.log('status', newFile.xhr.status)
          this.init();
        }
      }
    },
    /**
     * Pretreatment
     * @param  Object|undefined   newFile   读写
     * @param  Object|undefined   oldFile   只读
     * @param  Function           prevent   阻止回调
     * @return undefined
     */
    inputFilter: function (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // 过滤不是图片后缀的文件
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          return prevent()
        }
      }

      // 创建 blob 字段 用于图片预览
      newFile.blob = ''
      let URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
    }
  },

  computed:{
    ...mapState('file',{files:'reviewFiles',index:'reviewIndex',currFile:'currFile',fileList:'fileList'}),
    ...mapState({token:'token'}),
    images(){
      let imgs = [];
      this.files.forEach((item)=>{
        imgs.push(item.url);

      })
      return imgs ;
    }
  }

}
</script>

<style scoped>
.container{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.header{
  display: flex;
  height: 54px;
  width: 100%;
  background-color: white;
  padding:  0 20px 0 20px;
  box-sizing:border-box; /**防止padding溢出**/
  align-items: center;
  border-bottom:1px solid #dcdcdc;
}


.main{
  display: flex;
  flex-direction: row;
  flex: 1;
  /*background-color: red;*/
  overflow-y: hidden;
}
.main .preview{
  width: 200px;
  height: 100%;
  /*background-color: green;*/
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing:border-box; /**防止padding溢出**/
  overflow-y: auto;
  padding: 10px 0 50px 0;
  border-right:1px solid #dcdcdc;
  scroll-behavior: smooth;  /*滚动的时候平滑过渡*/
}

.main .content{
  display: flex;
  flex:1 ;
  /*background-color: yellow;*/
}
.main .option{
  display: flex;
  width:60px ;
  background: #f1f1f1;
  border-left:1px solid #dcdcdc;
}
.title input{
  border: white;
}

.title input:focus{
  outline: 1px solid #d8d8d8 ;
  background-color: #fbfbfb;
}

.title input:focus + i {
  visibility: visible;
}



.search-wrap-input:focus +.search-wrap-button
{
  outline: 1px solid #d8d8d8 ;
  background-color: #fbfbfb;
}

.item{
  display: flex;
  flex-direction: column;
  padding: 15px 20px 15px 20px;
  align-items: center;
  font-size: 13px;
  box-sizing: border-box;
  flex-shrink: 0; /**防止被压缩**/
  width: 100%;
}

.item span{
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0px 10px;

}
.item img{
  width: 100px;
  height: 80px;
}
.add{
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #d8d8d8;
  font-size: 30px;
  color: #5a5a5a;
  /*flex-shrink: 0;*/
  flex-shrink: 0; /**防止被压缩**/
}

.option{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.option i{
  font-size: 22px;
  padding: 18px;
}

.option i:hover{
background-color: #cccccc;
}

.item:focus{
  border-left:5px solid #19bcaa;
  background: #e8f8f7;
  color: #19bcaa;
  outline-width: 0;
}

.confirm{
  margin-left: 10px;
  color: darkseagreen;
  font-weight: bold;
  visibility: hidden;
}


</style>
