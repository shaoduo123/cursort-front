<template>
  <div class="main">
    <mheader @end="reload"></mheader>
    <div class="content-wrap">
      <div class="option-bar">
        <!--      <span class="title">-->
        <!--        全部图片{{currFile.name}}-->
        <!--      </span>-->
        <div class="title">全部</div>
        <div class="review">
          <i class="iconfont icon-shuaxin2 icon-option-style" @click="reload"></i>
          <i class="iconfont icon-shezhi icon-option-style" @click="viewMode = !viewMode"></i>
        </div>
      </div>



    <my-scroll :on-pull="getList" :loaded="loaded" :scroll-state="scrollState" ref="myScroll" class="file-list" >
      <template v-if = "viewMode">

        <div v-if="fileList.length>0"  class="file-list" slot="scrollList">
          <div class="head" >
            <div class="item-file">文件名</div>
            <div class="item-attribute">大小</div>
            <div class="item-time">修改日期</div>
            <div class="item-check">
              <input type="checkbox" class="checkbox-all-choose"  v-model="checkboxChooseAll"/>
            </div>
          </div>

          <div class="data-list">
            <div class="item"  :class="{'item-choose':item.check,'forbidden-child-pointer-events': forbiddenChildePointerEvents}" :draggable="!checkboxIsShow" @dragstart="onDragstart(item,$event)" @dragenter="onDragEnter(item,$event)" @dragleave="onDragLeave(item,$event)" @dragend="onDragend(item,$event)" @dragover="onDragover(item,$event)" @drop="onDrop(item,$event)"  v-for="(item,i) in fileList" @touchstart="onItemLongClick(item)" @touchend="onItemTouchEnd()">
              <div class="item-file"  @click="onItemClick(item)">
                <img v-if="item.type== 'FOLDER' " src="../assets/floder.png" width="42" height="42" />
                <img v-else :src="item.preUrl" width="42" height="42" />
                <span>{{ item.name }}</span>
              </div>
              <div class="item-attribute" click="onItemClick(item)">
                <i class="iconfont icon-gengduo1 icon-style"></i>
                <span>{{ item.size }}</span>
              </div>
              <div class="item-time">
                <div class="share">
                  <a><i class="iconfont icon-fenxiang icon-option-style"></i></a>
                  <a><i class="iconfont icon-xiazai icon-option-style"></i></a>
                  <a><i class="iconfont icon-shoucang icon-option-style"></i></a>
                  <a><i class="iconfont icon-shanchu icon-option-style"></i></a>
                </div>
                <span>{{item.createTime}}</span>
              </div>
              <input type="checkbox" class="file-checkbox" v-model="item.check"  :class="{'checkboxshow': checkboxIsShow}" />
            </div>
          </div>

        </div>
        <!--    <div  class="file-list" slot="scrollList">-->
        <!--      <empty image="normal">-->
        <!--        <span slot="describe">-->
        <!--          空空如也-->
        <!--        </span>-->
        <!--      </empty>-->
        <!--    </div>-->
      </template>
      <template v-else  >
        <div class="album-list" slot="scrollList" >
          <album-item  :file="itm" v-for="(itm,index) in fileList" :key="index" @click.native="onItemClick(itm)">
          </album-item>
        </div>
      </template>
    </my-scroll>
  </div>
  </div>

</template>

<script>
import store from "@/store/store"
import $ from 'jquery'
import dad from '../assets/js/jquery.dad.min'
import {mapActions, mapState, mapMutations} from "vuex";
import Mheader from "@/components/mheader";
import Mfooter from "@/components/mfooter";
import FloderNav from "@/components/floder-nav";
import empty from "@/components/empty";
import MyScroll from "@/components/mscroll";
import AlbumItem from "@/components/album-item";

export default {
  name: "recycle",
  store,
  components: {
    AlbumItem,
    MyScroll,
    Mheader,
    Mfooter,
    FloderNav,
    empty
  },
  data(){
    return {
      viewMode:true,
    }
  },
  watch:{
    fileList:{
      handler(newVal,oldVal){
        this.showChecked(newVal);
        this.updateCheckIds(newVal);
      },
      deep: true,
    },
    checkboxChooseAll:{
      handler(newVal,oldVal){
        this.checkedAll();
      },
    },
    chooseStatus(val){
      //监听如果没有选中的状态，则就全重置
      if(val==false){
        this.fileList.forEach(function(item) {
          item.check = false;
        });
      }
      // this.checkedAll();
    }
  },
  mounted(){
    this.init();

    //this.$store.commit("setChooseStatus",{checkboxIsShow:false})
    //this.store.commit("setChooseStatus",{checkboxIsShow:false})
  }
  ,computed:{
    ...mapState("recycle",{fileList:'fileList',currFile:'currFile',rootFile:'rootFile',chooseStatus:"chooseStatus"})
  },
  methods:{
    ...mapActions("recycle",{getRootFolder:'getRootFolder',getFiles:'getFiles',getReviewFiles:'getFilesByFloder',getRecycles:'getRecycles'}),
    ...mapMutations("recycle", { setChooseStatus: "setChooseStatus",setImage:"setImage",setReviewFiles:"setReviewFiles",setCurrFile:"setCurrFile",clearFileList:'clearFileList'}),
    checkedAll(){
      var _this = this;
      this.fileList.forEach(function(item) {
        item.check = _this.checkboxChooseAll;
      });

    },
    showChecked(newVal){
      var _this = this;
      var checkedCount = 0 ;
      newVal.forEach(function(item) {
        if(item.check){
          checkedCount++ ;
        }
      });

      if(checkedCount==0){
        this.checkboxIsShow =false;//停止显示每条itemcheckbox
        this.checkboxChooseAll =false; //取消全选
        console.log("mfile-store",this.$store)

        //_this.$store.commit("file/setChooseStatus",{checkboxIsShow:false})
        this.setChooseStatus({checkboxIsShow:false});
      }else{
        _this.checkboxIsShow =true;
        this.setChooseStatus({checkboxIsShow:true});
        //_this.$store.commit("file/setChooseStatus",{checkboxIsShow:true})
      }
    },
    onItemLongClick(item){
      clearInterval(this.loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(function() {
        console.log("长按了",item.name);

      }.bind(this), 1000);  // 这里的1000是指需要长按的时间，单位为ms
    },
    onItemTouchEnd(){
      clearInterval(this.loop);
      console.log("取消长按");
    },
    onItemClick(item){

    },updateCheckIds(newFiles){
      var checkedIds =[];
      newFiles.forEach(function(item) {
        if(item.check){
          checkedIds.push(item.id);
        }
      });
      this.$store.commit('recycle/setCheckIds',{'checkedIds':checkedIds});
    },open(){
      // this.setImage("");
    },reload(){
      //alert("我到了")
      this.clearFileList();
      this.$forceUpdate();
      this.getList();
    },init(){
      this.fileList = [] ;
      this.page= 1 ;
      this.limit =  10;
      debugger ;
      console.log("file-store",this.$store)
      this.$refs.myScroll.setState(1);
      var payload = {
        count:this.limit,
        page:this.page
      }
      this.getRecycles(payload).then((resp) => {
        this.$refs.myScroll.setState(2);
        this.page++;
        this.loaded= false;
      }).catch((error) => {
        this.$refs.myScroll.setState(3)
        this.$layer.msg(error, {icon: 0});
      });

    },getList(){
      this.$refs.myScroll.setState(1);
      let _this = this;
      var payload = {
        folderId:this.currFile.id,
        count:this.limit,
        page:this.page
      }
      this.getCurrFiles(payload).then((resp) => {

        _this.page++;
        _this.loaded= false;
        _this.$refs.myScroll.setState(2);
      }).catch((error) => {
        this.$refs.myScroll.setState(3);
        this.loaded= false;
        this.$layer.msg(error, {icon: 0});
      });
    }
  }
}
</script>

<style scoped>

.main{
  /*background-color: coral;*/
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow:hidden; /**超出禁止显示了**/
}
.content-wrap{
  width: 100%;
  flex-grow: 1;
  min-height: 200px;
  overflow:hidden; /**超出禁止显示了**/
  /*height: calc(100% - 120px);*/
  /* !**承包剩余空间**!*/
  /*flex-direction: column;*/
  /*display: flex;*/
  /*overflow-y: scroll;*/
  /**哪个孩子需要滚动，就让其父亲设置为不能滚动，孩子的高度（或宽度）超过父亲，即可滚动了
  但孩子需要设置 overflow-y:scorll 并且孩子的高度是100%
  **/

  /**不能选中文本，蓝色的选文字的背景*/
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}

.content-wrap .option-bar{
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  /*padding: 5px 40px 5px 40px;*/
  padding: 10px 0px 10px 0px;
  box-sizing: border-box;
}

.content-wrap .option-bar .title{
  width: 50px;
  margin-left: 40px;
  margin-right: auto; /**自动撑开**/
}

.content-wrap .option-bar .review{
  display: flex;
  padding-right: 50px;
}
.content-wrap .option-bar .review .checkbox-all-choose{
  margin-top: 5px;
  width: 15px;
  height: 15px;
}
.content-wrap .option-bar .review i:hover{
  background-color: #d8d8d8;
}

.content-wrap .file-list{
  width: 100%;
  padding: 5px 20px 5px 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: calc(100% - 40px);
  /*height: 80%; !**去掉后不能滚动了**!*/
  /*overflow-y: scroll;*/ /**滚动的前提是让父亲滚动禁止**!*/
}
.file-list .head{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  padding: 10px 0 10px 0;
}

.file-list .item{
  height: 60px;
  background-color: white;
  border-top: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  font-size: 14px;
  transition: border-color .3s,background-color .3s,color .3s;
  flex-shrink: 0;
}

.file-list .item input[type=checkbox]{
  visibility: hidden;
}
.file-list .item:hover{
  padding: 0 0 0 0;
  background-color: #e8f8f7;
}

/**当选中，item背景状态**/
.item-choose{
  padding: 0 0 0 0;
  background-color: #e8f8f7 !important;
}

.checkboxshow{
  visibility:visible !important;
}

.file-list .item:hover input[type=checkbox]{
  visibility:visible;
}

.file-list .item:hover .share{
  display: block;
}

/**item-time下的span不让显示**/
.file-list .item:hover .item-time>span{
  display: none;
}
/**操纵dom元素的子元素上添加元素穿透，这样做禁止item下所有子元素的dragleave干扰 父亲元素移动**/
/*.file-list .item >*{*/
/*  pointer-events: none;*/
/*}*/

.forbidden-child-pointer-events >* {
  pointer-events: none;
}

.item-file{
  display: flex;
  flex: 3;
  align-items: center;

}
.item-file img{
  padding-right: 20px;
  margin-left: 5px;
}
.item-file span{
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}
.item-attribute{
  flex: 1;
  display: flex;
  align-items: center;
}
.item-time {
  flex: 2;
}

.item-time .share{
  /*菜单默认情况下不显示*/
  display: none;

}

.item-time span{
  color: #a1a1a1;
}

.icon-style{
  font-size: 18px;
}
.icon-option-style {
  font-size: 20px;
  color: #404040;
  padding: 5px;
}
.footer{
}


.album-list{
  display: flex !important;
  width: 100%;
  flex-direction: row !important;
  flex-wrap: wrap!important; /**自动换行**/
  align-content: flex-start!important;
  flex-shrink: 0!important;
  /*justify-content: space-between;*/
}
</style>
