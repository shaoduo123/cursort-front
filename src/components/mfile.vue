<template>
  <div class="content-wrap">
    <div class="option-bar">
<!--      <span class="title">-->
<!--        全部图片{{currFile.name}}-->
<!--      </span>-->
      <floder-nav class="title" :floder="currFile" @back="onBack" @backRoot="onBackRoot" @navSelect="onNavSelect"></floder-nav>
      <div class="review">
        <i class="iconfont icon-gengduo2 icon-option-style" ></i>
        <i class="iconfont icon-shezhi icon-option-style"></i>
      </div>
    </div>
    <div class="file-list">
      <div class="head">
        <div class="item-file">文件名</div>
        <div class="item-attribute">属性</div>
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
            <span>{{ item.num }}</span>
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
  </div>
</template>

<script>
import store from "./mfile"
import global from "../store/store"
import $ from 'jquery'
import dad from '../assets/js/jquery.dad.min'
import {mapActions, mapState, mapMutations} from "vuex";
import FloderNav from "./floder-nav";
export default {
  name: "mfile",
  components: {FloderNav},
  store,
  global,
  data(){
    return{
      // fileList:[
      //   {
      //     id:'1',
      //     name:'文件夹1',
      //     father:'',
      //     type:'FOLDER',
      //     num:'1',
      //     create_time:'2021-09-01 12:00:00',
      //     check:false
      //   },
      //   {
      //     id:'2',
      //     name:'文件夹2',
      //     father:'',
      //     type:'FOLDER',
      //     num:'1',
      //     create_time:'2021-09-01 12:05:00',
      //     check:false
      //   },
      //   {
      //     id:'3',
      //     name:'文件夹3',
      //     father:'',
      //     num:'2',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'4',
      //     name:'文件夹4',
      //     father:'',
      //     type:'FOLDER',
      //     num:'3',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   },
      //   {
      //     id:'5',
      //     name:'文件夹5',
      //     father:'',
      //     num:'4',
      //     type:'FOLDER',
      //     create_time:'2021-09-01 12:10:00',
      //     check:false
      //   }
      // ],
      checkedList:[],
      checkboxChooseAll:false,
      checkboxIsShow:false,
      loop:0, //定时器
      forbiddenChildePointerEvents:false,
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
  },
  mounted(){
    console.log("file-store",this.$store)
    this.getRootFolder()
      .then((resp) => {
        //如果没有东西就为空
        if(this.rootFile==null)
          return false ;

        var payload = {
           folderId:this.rootFile.id,
           count:99999,
           page:1
        }
        this.getFiles(payload).then((resp) => {

        }).catch((error) => {
          this.$layer.msg(error, {icon: 0});
        });

      })
      .catch((error) => {
        this.$layer.msg(error, {icon: 0});
      });

    //this.$store.commit("setChooseStatus",{checkboxIsShow:false})
    //this.store.commit("setChooseStatus",{checkboxIsShow:false})
  },computed:{
    ...mapState("file",{fileList:'fileList',currFile:'currFile',rootFile:'rootFile'})
  },
  methods:{
    ...mapActions("file",{getRootFolder:'getRootFolder',getFiles:'getFiles',getReviewFiles:'getFilesByFloder'}),
    ...mapMutations("file", { setChooseStatus: "setChooseStatus",setImage:"setImage",setReviewFiles:"setReviewFiles",setCurrFile:"setCurrFile"}),
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
      console.log("点击了",item.name);
      if(this.checkboxIsShow){
        item.check = !item.check;
        return false;
      }
      if(item.type =='FOLDER'){

        let payload = {
          folderId:item.id,
          count:10,
          page:1
        }
        this.getFiles(payload).then((resp) => {
          this.setCurrFile(item);
        }).catch((error) => {
          this.$layer.msg(error, {icon: 0});
        });

      }else {
        let reviewFiles = [] ;
        let index = 0 ;
        let i = 0 ;
        this.fileList.forEach(function (ite){
          if(ite.type.split('/')[0] =='image'){
            reviewFiles.push(ite) ;

            if(item.id == ite.id){
              console.log("clickindex:",i);
              index =  i ;
            }
            i++ ;
          }
        });
        let payload = {
          reviewFiles:reviewFiles,
          index:index,
        }
        this.setReviewFiles(payload),
        this.$router.push({name:'review'});

/*        this.getReviewFiles(item.fatherId)
          .then((res) => {
            this.$router.push({name:'review'});
        })
          .catch((error) => {
            this.$layer.msg(error, {icon: 0});
          });*/
      }

    },updateCheckIds(newFiles){
      var checkedIds =[];
      newFiles.forEach(function(item) {
        if(item.check){
          checkedIds.push(item.id);
        }
      });
      this.$store.commit('file/setCheckIds',{'checkedIds':checkedIds});
    },onDragstart(item,event){
        this.forbiddenChildePointerEvents = true;
        console.log(this.forbiddenChildePointerEvents)
        //console.log(item.name,event)
    },onDragend(item,event){
      this.forbiddenChildePointerEvents = false;
      console.log(this.forbiddenChildePointerEvents)
    },onDragover(item,event){
      this.movedEvent = event ;
      event.preventDefault();
    },onDrop(item,event){
      event.preventDefault();
      console.log(item.name,event)
      event.currentTarget.style.border = "0 dotted red";
    },onDragEnter(item,event){
      //event.target.style.border = "3px dotted red";
      //event.target 是当前元素
      //event.currentTarget 是绑定事件的元素
      event.currentTarget.style.border = "2px dotted grey";
      event.currentTarget.style.boxSizing = 'border-box';
    },onDragLeave(item,event){
      event.currentTarget.style.border = "0 dotted red";
    },open(){
      // this.setImage("");
    },onBack(floder){
        console.log("mfile-onBack",floder)
        this.onItemClick(floder);
    },onBackRoot(floder) {
        this.onItemClick(floder);
    },onNavSelect(floder) {
        this.onItemClick(floder);
    }
  }
}


</script>

<style scoped>

 .content-wrap{
  flex-grow: 1; /**承包剩余空间**/
  /*flex-direction: column;*/
  /*display: flex;*/
  /*overflow-y: scroll;*/
  /**哪个孩子需要滚动，就让其父亲设置为不能滚动，孩子的高度（或宽度）超过父亲，即可滚动了
  但孩子需要设置 overflow-y:scorll 并且孩子的高度是100%
  **/
  overflow: hidden;

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

}

 .content-wrap .option-bar .title{
  width: 400px;
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
  padding: 5px 40px 5px 50px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
   flex-grow: 1;
  /*height: 80%; !**去掉后不能滚动了**!*/
  overflow-y: scroll; /**滚动的前提是让父亲滚动禁止**!*/
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
}


/**拖拽特效**/

</style>
