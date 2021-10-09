<template>
  <div class="header-warp">
    <div class="option">
<!--      <tool :showOpt="showFlag" :curr-floder="currFile.id" class="tool"></tool>-->

      <div class="tool" v-if="pasteFlag!=0">
        <mbutton type="primary" icon="icon-zuhe" @click.native="pasteFlag==1?copyFiles():((pasteFlag==2)?moveFiles():false)" >粘贴到此</mbutton>
        <mbutton type="light" icon="icon-cuowu" @click.native="showHidePaste(0)" >取消</mbutton>
      </div>
      <div class="tool" v-else-if="showFlag">
        <mbutton type="light" icon="icon-xiazai3" @click.native="download()">下载</mbutton>
        <mbutton type="light" icon="icon-zuhe" @click.native="showHidePaste(1)" >复制</mbutton>
        <mbutton type="light" icon="icon-jianqie" @click.native="showHidePaste(2)" >移动</mbutton>
        <mbutton type="light" icon="icon-shanchu" @click.native="delFiles(111)">删除</mbutton>
      </div>
      <div class="tool" v-else>

        <file-upload
          ref="upload"
          v-model="files"
          class="file-upload"
          :headers="{'Authorization':token}"
          :data="{'CURRENT_FILE_ID':currFile.id}"
          post-action="/api/file/upload"
          :multiple="multiple"
          @input-file="inputFile"
          @input-filter="inputFilter">
          <mbutton icon="icon-shangchuan" type="primary"> 文件上传 </mbutton>
        </file-upload>

        <mbutton icon="icon-wenjianjia" type="light" @click.native="newFloder()">新建文件夹</mbutton>
      </div>
    </div>
    <div class="blank-arae">
      <!--aa-->
    </div>
    <div class="more">

      <popover @open="handleOpen" :mvisible="uploadPopoverVisible"  :trigger="'click'" @popend="uploadPopoverVisible= !uploadPopoverVisible" :width="300" :height="300">
        <i class="iconfont icon-shangchuan icon-style" slot="button" ></i>
        <div  slot="content"  >
          <div class="dialog-content-title">
            <span>{{files.length}}个上传任务</span>
            <span>全部清空</span>
          </div>
          <div class="dialog-content-items">

            <div v-for="(item,i) in files" class="dialog-content-item">
              <div class="dialog-content-item-filename">
                <img :src="item.thumb">
                <div class="dialog-content-item-filename-title">
                  <span>{{item.name}}</span>
                  <span>{{item.sizeM}}M</span>
                </div>
              </div>
              <div class="dialog-content-item-option">
                <i v-if="item.success" class="iconfont icon-gou"></i>
                <i v-else class="iconfont icon-cha"></i>
              </div>
            </div>

          </div>

        </div>
      </popover>

      <i class="iconfont icon-tongzhi1 icon-style" @click="openPopover()"></i>
      <i class="iconfont icon-tequan icon-style"></i>
      <i class="iconfont icon-shezhi1 icon-style"></i>
      <span>{{userInfo.name}}</span>
<!--      <span>{{checkIds}}</span>-->
    </div>
  </div>
</template>

<script>
import Mbutton from "./mbutton";
import Tool from "./tool";
import store from "../store/store";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Popover from "./popover";
import  FileUpload from  "vue-upload-component"
import util from '../utils/util';

export default {
  name: "mheader",
  components: {Popover, Tool, Mbutton,'file-upload':FileUpload},
  store,
  data(){
    return{
      uploadPopoverVisible : false,
      files:[],
      multiple:true,
      pasteFlag:0,
    }
  },mounted() {

  },computed:{

    /**等价于将$store.state.file.chooseStatus 映射到 一个名为 showFlag的computed中
     *
     * 映射到了一个compute**/
    ...mapState("file",{
      showFlag:"chooseStatus",
      currFile:"currFile",
      //checkIds:"checkedIds", //map也可以这样接
    }),
    ...mapState({userInfo:'userInfo',token:'token'}),
    // ...mapState("file",{uploadFiles:'uploadFiles'}),

    ...mapGetters("file",{
      checkIds:"checkIds",
    })

    /**以下被 mapstate mapgetters 和 mapaction 以及 mapstatus替代**/
   // showFlag:{
   //        get(){
   //          //两种拿到兄弟数据的方式， 一个是通过 $store.state.file.chooseStatus; 拿到
   //          //另外一种是通过getter拿到
   //          return this.$store.state.file.chooseStatus;
   //        }
   //      },
    // username:{
    //   get(){
    //      return this.$store.state.userInfo.name;
    //   },
    // },
    // checkedIds:{
    //   get(){
    //     return this.$store.getters["file/checkIds"];
    //   },
    // },
    // testGetter(){
    // //  console.log('拿到自己组件的getter', this.$store.getters.test)
    //   console.log('拿到兄弟或其他组件的getter', this.$store.getters["file/test"])
    //   return this.$store.getters["file/test"];
    // }
 },watch:{
    checkedIds:{
      handler(newVal,oldVal){
        console.log('header拿到选中的id', newVal)
      }
    },
    files(val){
      console.log("上传",val)
      this.$refs.upload.active = false
      this.$refs.upload.active = true ; //自动开始上传
      this.uploadPopoverVisible = true;
      val.forEach((item)=>{
        item.sizeM = (item.size/1024/1024).toFixed(3)
        //item.thumb = require('@/assets/'+this.util.pickType(item.type));
        let thumbName  = util.pickType(item.type) ;
        item.thumb = require('../assets/'+thumbName) ;
      })


    }
  },methods:{
    ...mapMutations('file',{setShowFlag:'setChooseStatus',setSourceIds:'setSourceIds'}),
    ...mapActions('file',{dels:'delFiles',createFolder:'createFolder',copy:'copy',cut:'cut'}),
    handleOpen(){
      // alert("aaa")
      console.log("打开了")
      this.$emit("end")
    },
    openPopover(){
      this.uploadPopoverVisible = !this.uploadPopoverVisible;
    },
    copyFiles(){
      console.log("copying")
      this.copy().then((res)=>{
        this.$layer.msg(res);
        this.$emit("end")
      }).catch((error)=>{
        this.$layer.msg(error);
      });
      this.$emit("end")
      this.pasteFlag=0;
    },
    delFiles(){
      console.log(this)
      this.$layer.confirm('确定要删除吗？',{
          title: '删除',
          shade: false,
          tips: [1, '#c00'],
          btn: ['确定', '取消'],
          icon: 3
        },
        layerid => {
          this.$layer.msg('正在拼命删除中');
          this.$layer.close(layerid);
           debugger;
           this.dels()
             .then(res => {
               this.$layer.msg('删除成功！');
               console.log("mheader-delFiles",res)
               this.$emit("end")
           })
             .catch(error =>{
               this.$layer.msg('删除失败！');
               console.log("mheader-delFiles",error)
           })
        },
        layerid => {
          this.$layer.msg('取消删除');
          this.$layer.close(layerid);
        }
      );
    },
    moveFiles(){
      console.log("moving")
      this.cut().then((res)=>{
        this.$layer.msg(res);
        this.$emit("end")
      }).catch((error)=>{
        this.$layer.msg(error);
      });

      this.pasteFlag=0;
    },
    download(fileId){

    },
    upload(){

    },showHidePaste(flag){
      //flag=1 是复制，flag=2是移动 ，flag=0是 不显示粘贴按钮
      this.pasteFlag = flag ;
      this.setSourceIds(this.checkIds);
      this.setShowFlag({checkboxIsShow:false});
    },
    newFloder(){
      //例子1
      this.$layer.prompt({title: '新建文件夹', formType: 1,area: ['200px', '170px'],shade: false},
        (abc,layerid) => {
          this.createFolder(abc)
          .then(res=>{
            this.$layer.msg(res);
          })
          .catch(error=>{
            this.$layer.msg(error);
          })
          ;
          this.$layer.close(layerid);
      }, layerid => {
        //  this.$layer.msg('取消删除');
          this.$layer.close(layerid);
        });
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
  }
}
</script>

<style scoped>

.header-warp{
  display: flex;
  flex-direction: row; /**水平显示**/
  align-items: center;
  padding: 20px 50px 18px 40px;
  border-bottom:1px solid #d8d8d8;
}

.header-warp .option{
  height: 100%;
  /*background-color: blue;*/
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.tool{
  display: flex;
  flex-direction: row;
  align-items: center;
}


.header-warp .blank-arae{
  flex-grow: 1; /**自适应**/
  background-color: blueviolet;
  z-index: 1000;
  min-width: 200px; /**伸缩盒的底线。。。**/
}
 .header-warp .more{
  /*background-color: red;*/
  display: flex;
  align-items: center;
  font-size: 14px;
   white-space:nowrap; /*禁止自动换行*/
}
/** 设置.more 下的所有 i 和兄弟 span 节点 的padding值**/
.header-warp .more > i + span{
  padding: 0 10px 0 10px;
}

.header-warp .more > i{
  padding: 0 8px 0 8px;
}
.header-warp .more .iconfont{
  padding: 0 8px 0 8px;
}


.header-warp .more > span:hover {
  background-color: #d2d2d2;
}
.header-warp .more > i:hover {
  background-color: #d2d2d2;
}

.iconfont:hover{
  background-color: #d2d2d2;
}

.icon-style{
  font-size: 25px;
  color: #999999;
}



.dialog-content-title{
  width: 100%;
  height: 40px;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  border-bottom: 1px solid #fbfbfb;
  align-items: center;
  box-sizing: border-box;
}

.dialog-content-items{
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
}
.dialog-content-item{
  width: 100%;
  height: 72px;
  display: flex;
  border-bottom: 1px solid #f2f6fd;
  flex-shrink: 0;
}


.dialog-content-item-filename{
  display: flex;
  flex: 3;
}

.dialog-content-item-filename img{
  height: 30px;
  width: 30px;
  align-self: center;
  padding: 20px 20px;

}

.dialog-content-item-filename-title{
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 10px;

}
.dialog-content-item-filename-title span:nth-child(1){
  font-size: 14px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  max-width: 150px;

}

.dialog-content-item-filename-title span:nth-child(2){
  font-size: 12px;
  color: #d8d8d8;
}

.dialog-content-item-option{
  display: flex;
  flex: 1;
  align-self: center;
  justify-content: center;
}

.dialog-content-item-option i{
  width: 28px;
  height: 28px;
  font-size: 22px;
}

.icon-gou{
  color: green;
}

.icon-cha{
  color: #df5000;
}


.dialog-content-item-option i:hover{
  background-color: #ffffff;
  font-size: 22px;
}
</style>
