<template>
<!--  <fox-preview-image v-model="visiable" :src="image" z-index="9000"></fox-preview-image>-->
<!--  <div class="c"-->
  <div class="container">
    <div class="header">
      <div class="title">
        <i class="" @click="back"><</i>
        <input type="text" placeholder="不能为空">
        <i class=""></i>
      </div>
    </div>
    <div class="main">
      <div class="preview">

        <div class="item" v-for="(item,i) in files" @click="image=item.url">
          <img :src="item.preUrl">
          <span>{{item.name}}</span>
        </div>

        <div class="add">
          <span>+</span>
        </div>
      </div>

      <fox-preview-image class="content" :src="images" :visiable="visiable" :index="index"></fox-preview-image>

      <div class="option">
        <i> +</i>
        <i> +</i>
        <i> +</i>
      </div>
    </div>
  </div>

</template>

<script>
import FoxPreviewImage from "../components/preview-image";
import {mapState} from 'vuex'
export default {
  name: "imgPreview",
  components: {FoxPreviewImage},
  data(){
    return{
      visiable:true,
     // image:['https://img.zcool.cn/community/014de75542b5750000019ae936d00b.jpg@1280w_1l_0o_100sh.jpg','https://img.zcool.cn/community/014de75542b5750000019ae936d00b.jpg@1280w_1l_0o_100sh.jpg']
    }
  },methods:{
    back(){
      this.$router.go(-1);
    }
  },
  mounted() {

  },
  computed:{
    ...mapState('file',{files:'reviewFiles',index:'reviewIndex'}),
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

.search-wrap-input:focus +.search-wrap-button
{
  outline: 1px solid #d8d8d8 ;
  background-color: #fbfbfb;
}

.item{
  display: flex;
  flex-direction: column;
  padding: 15px 0 15px 0;
  align-items: center;
  font-size: 13px;
  box-sizing: border-box;
  flex-shrink: 0; /**防止被压缩**/
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
  width: 50px;
  height: 50px;
  padding: 2px;
}

</style>
