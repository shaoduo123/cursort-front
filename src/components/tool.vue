<template>
  <div class="tool" v-if="showOpt">
    <mbutton type="light" icon="icon-xiazai3" @click.native="download()">下载</mbutton>
    <mbutton type="light" icon="icon-zuhe" @click.native="copyFiles(1,1)" >复制</mbutton>
    <mbutton type="light" icon="icon-jianqie" @click.native="moveFiles()" >移动</mbutton>
    <mbutton type="light" icon="icon-shanchu" @click.native="delFiles(111)">删除</mbutton>
  </div>
  <div class="tool" v-else>
    <mbutton icon="icon-shangchuan" type="primary">上传图片</mbutton>
    <mbutton icon="icon-wenjianjia" type="light">新建文件夹</mbutton>
  </div>
</template>

<script>
import Mbutton from "./mbutton";

export default {
  name: "tool",
  components: {Mbutton},
  props:{
    showOpt:false
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

    }
  }
}
</script>

<style scoped>
.tool{
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
