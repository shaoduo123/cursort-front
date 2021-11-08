<template>
  <div class="container">
    <div class="silbar">
      <logo class="logo"/>
      <search :keyword="keyword" class="search"/>
      <m class="m" />
      <div class="remainder">
        <mcode></mcode>
        <mprogress></mprogress>
      </div>
    </div>

    <mfile class="mfile" ref="file"></mfile>

  </div>
</template>


<script>
import search from "../components/search";
import store from "../store/store.js"
import logo from "../components/logo";
import m from '../components/menu/mymenu'
import mcode from '../components/mcode'
import mprogress from "../components/mprogress";
import Mheader from "../components/mheader";
import Mfile from "../components/mfile";
import Mfooter from "../components/mfooter";
import FoxPreviewImage from "../components/preview-image";
import {mapActions, mapState} from 'vuex';
export default {
  components: {
    Mfooter,
    Mfile,
    Mheader,
    m,
    logo,
    search,
    mcode,
    mprogress,
    FoxPreviewImage
  },
  data(){
    return{
      keyword:'aaaa'
    }
  },
  created() {
    console.log("view/main",this.userInfo);
    console.log("view/main",this.token);
    //var aa = undefined;
    //权限检查
    if(this.token == "" ){
      this.$router.push('/login');
    }else if (this.userInfo.id ==''){
      this.$router.push('/login');
    }
  },
  methods:{
    ...mapActions("file",{getCurrFiles:'getCurrFiles'}),
    opend(){
      // this.$refs.file.reload();
      console.log("main-opend",'reload')
      debugger;
    }
  },
  mounted() {

  },
  computed:{
    ...mapState({userInfo:'userInfo',token:'token'}),
    ...mapState("file",{visiable:'visiable',image:'image',currFile:'currFile'})
  },
  store
}

</script>
<style scoped>


.container{
  display: flex; /*使用柔性布局*/
  flex-wrap:nowrap; /*不允许换行言外，之意就是一行*/
  width: 100%;
  height: 100%;
  /*background-color: green;*/
}

/**
    **********侧边栏开始*********
 */
.silbar{
  background-color: #fbfbfb;
  height: 100%;
  width: 275px;
  display: flex;
  flex-direction: column;
  z-index: 2;

}
.logo{
   /*background-color: blueviolet;*/
  flex:1;/*分配空间大小*/
  display: flex;
  justify-content: center;  /*在主轴上居中，主轴默认是水平方向*/
  align-items: center;      /*在交叉轴上居中，因为主轴是水平方向，所以交叉轴为垂直方向*/
}

.search{
  /*background-color: blue;*/
  flex:1;
}

/**
    **菜单开始**
 */
.m{
  /*background-color: dodgerblue;*/
  flex:5;
}

/**
    **二维码开始**
 */
.remainder{
  /*background-color: crimson;*/
  font-size: 12px;
  flex:3;
  display: flex;
  /*align-items: center;  !*在主轴上居中，主轴默认是水平方向*!*/
  flex-direction:column; /**主轴为垂直向下方向**/
}


.mfile{
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}



</style>
