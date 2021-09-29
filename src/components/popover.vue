<template>
  <div class="container" ref="popover">
    <slot name="button" >
    </slot>
    <div class="dialog" :style="popoverStyle" v-if="mvisible">
      <i v-if="visibleArrow" class="dialog-triangle"></i>
      <div class="dialog-content">
        <slot name="content">
        <!-- 此处书写内容 -->
        </slot>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "popover",
  data(){
    return{
      button:undefined,
      popoverStyle:{
        width: this.width+'px',
        height:this.height+'px'
      }
    }
  },
  mounted() {

    if (this.$slots.button) {
      this.button = this.$slots.button[0].elm  //以此方式获取slot的dom
    }

    if(this.trigger=='hover'){
      // this.button.addEventListener('mouseenter',this.open) ;
      // this.button.addEventListener('mouseleave',this.close) ;
      if(this.$refs.popover){
        this.$refs.popover.addEventListener('mouseenter',this.open);
        this.$refs.popover.addEventListener('mouseleave',this.close) ;
      }
    }else{
      this.button.addEventListener('click', this.changeDisplay, false)
    }


    // if (this.button) {
    //   this.$slots.button.addEventListener('click', this.changeDisplay, false)
    // }
  },
  beforeDestroy() {
    if(this.trigger=='hover'){
      // this.button.removeEventListener('mouseenter',this.open,false) ;
      // this.button.removeEventListener('mouseleave',this.close,false) ;
      if(this.$refs.popover){
        this.$refs.popover.addEventListener('mouseenter',this.open);
        this.$refs.popover.addEventListener('mouseleave',this.close) ;
      }
    }else{
      this.button.removeEventListener('click', this.changeDisplay, false)
    }
    // if (this.button) {
    //   this.$slots.button.removeEventListener('click', this.changeDisplay, false)
    // }
  },
  props:{
    trigger:{
      type:String,
      default:'hover',
    },
    visibleArrow:{
      type:Boolean,
      default:true
    },
    mvisible:{
      type:Boolean,
      default:false
    },
    width: {
      type:Number,
      default:200,
    },
    height: {
      type:Number,
      default:100,
    }

  },methods: {
    open() {
      this.mvisible =true;
    },
    close() {
      this.mvisible =false;
    },
    changeDisplay() {
      this.mvisible = !this.mvisible;
    }
  },computed:{
    // visible(newVal,oldVal) {
    //   if(this.visible){
    //     this.$emit('open');
    //   }
    // }
  }
}
</script>

<style scoped>
.container{
  display: flex;
  align-items: center;
  justify-content: center;

}
.dialog{
  position: absolute;
  width: 460px;
  height: 408px;
  background-color: #fff;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 16%);
  border-radius: 8px;
  top:70px;
  margin-left: -20px;
  transition: border-color .3s,background-color .3s,color .3s;
}
.dialog-triangle{
  width: 0;
  height: 0;
  line-height: 0;
  font-size: 0;
  border: 10px solid #fff;
  border-color: transparent transparent #fffffe;
  position: absolute;
  top: -20px;
}

.dialog-content{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
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
</style>
