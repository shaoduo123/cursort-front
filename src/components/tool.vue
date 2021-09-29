<template>
  <div class="tool" v-if="showOpt">
    <mbutton type="light" icon="icon-xiazai3" @click.native="download()">下载</mbutton>
    <mbutton type="light" icon="icon-zuhe" @click.native="copyFiles(1,1)" >复制</mbutton>
    <mbutton type="light" icon="icon-jianqie" @click.native="moveFiles()" >移动</mbutton>
    <mbutton type="light" icon="icon-shanchu" @click.native="delFiles(111)">删除</mbutton>
  </div>
  <div class="tool" v-else>

      <file-upload
          ref="upload"
          v-model="files"
          class="file-upload"
          :headers="{'Authorization':token}"
          :data="{'CURRENT_FILE_ID':currFloder}"
          post-action="/api/file/upload"
          :multiple="multiple"
          @input-file="inputFile"
          @input-filter="inputFilter">
        <mbutton icon="icon-shangchuan" type="primary"> 文件上传 </mbutton>
      </file-upload>


    <mbutton icon="icon-wenjianjia" type="light">新建文件夹</mbutton>
  </div>
</template>

<script>
import Mbutton from "./mbutton";
import  FileUpload from  "vue-upload-component"
import {mapState} from "vuex";


export default {
  name: "tool",
  components: {Mbutton,'file-upload':FileUpload},
  data(){
    return{
      files:[],
      multiple:true,
    }
  },computed:{
    ...mapState({token:'token'}),
  },
  props:{
    showOpt:false,
    currFloder:'',
  },methods:{
    copyFiles(oldFileId,newFolderId){
      console.log("copy")
    },
    delFiles(fileId){
      console.log(this)
      this.$layer.confirm('确定要删除吗？',{
          title: '删除',
          shade: false,
          tips: [1, '#c00'],
          btn: ['确定', '取消'],
          icon: 3
        },
        layerid => {
          this.$layer.msg('执行了删除');
          this.$layer.close(layerid);
        },
        layerid => {
          this.$layer.msg('取消删除');
          this.$layer.close(layerid);
        }
      );
    },
    moveFiles(oldFileId,newFolderId){

    },
    download(fileId){

    },
    upload(){

    },
    newFloder(name,folderId){

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
  },watch:{
    files(val){
     console.log("上传",val)
      this.$refs.upload.active = false
      this.$refs.upload.active = true ; //开始上传

    }
  }
}
</script>

<style scoped>
/*.file-upload{*/
/*  width: 120px;*/
/*  height: 40px;*/
/*}*/
.tool{
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
