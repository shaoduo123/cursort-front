<template>
  <div class="header-warp">
    <div class="option">
      <tool :showOpt="showFlag" class="tool"></tool>
    </div>
    <div class="blank-arae">
      <!--aa-->
    </div>
    <div class="more">
      <i class="iconfont icon-tongzhi1 icon-style"></i>
      <i class="iconfont icon-tequan icon-style"></i>
      <i class="iconfont icon-shezhi1 icon-style"></i>
<!--      <span>{{global.state.userInfo.name}}</span>-->
      <span>{{username}}</span>
<!--      <span>{{testGetter}}</span>-->
    </div>
  </div>
</template>

<script>
import Mbutton from "./mbutton";
import Tool from "./tool";
import global from "../store/store"
import mfileStore from "./file/store"
import searchStore from "./search/store";
export default {
  name: "mheader",
  components: {Tool, Mbutton},
  global,
  mfileStore,
  searchStore,
  data(){
    return{
    }
  },mounted() {

  },computed:{
    showFlag:{
          get(){
            return mfileStore.state.chooseStatus
          },
          set(value){
            //this.$store.commit('setPhoneNumber',value)
          }
        },
    username:{
      get(){
         //console.log('aaaa',global.state.g.userInfo.name)
         return global.state.g.userInfo.name;
      },
    },
    checkedIds:{
      get(){
        return mfileStore.getters.checkIds;
      },
    },
    testGetter(){
      console.log('拿到自己组件的getter', this.$store.getters.test)
      console.log('拿到兄弟或其他组件的getter', mfileStore.getters.test)
      return mfileStore.getters.test;
    }
 },watch:{
    checkedIds:{
      handler(newVal,oldVal){
        console.log('header拿到选中的id', newVal)
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

.header-warp .more > span:hover {
  background-color: #d2d2d2;
}
.header-warp .more > i:hover {
  background-color: #d2d2d2;
}

.icon-style{
  font-size: 25px;
  color: #999999;
}
</style>
