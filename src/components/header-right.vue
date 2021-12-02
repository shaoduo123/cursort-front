<!--header 用户部分抽取出来作为一个组件-->
<template>
  <div class="more">
    <popover @open="handleOpen" :mvisible="uploadPopoverVisible"  :trigger="'click'" @popend="uploadPopoverVisible= !uploadPopoverVisible" :width="300" :height="300" :top="60">
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
    <!--      <i class="iconfont icon-shezhi1 icon-style"></i>-->
    <popover @open="handleOpen" :mvisible="profileVisible"  :trigger="'hover'" :width="120" :height="76"  :top="60" :visibleArrow="true">
      <span slot="button">{{userInfo.name}}</span>
      <div  slot="content"  >
        <div class="profile-list">
          <div class="profile-item">
            <span>修改资料</span>
          </div>
          <div class="profile-item">
            <span>退出</span>
          </div>
        </div>
      </div>
    </popover>
    <!--      <span>{{checkIds}}</span>-->
  </div>
</template>

<script>
import Mbutton from "./mbutton";
import Tool from "./tool";
import store from "../store/store";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Popover from "./popover";
import util from '../utils/util';
export default {
  name: "header-right",
  data(){
    return{
      profileVisible: false,
      files: [],
      uploadPopoverVisible: false,
    }
  },
  computed:{
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
  },


}
</script>

<style scoped>

</style>
