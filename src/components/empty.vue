<template>
  <div class="empty">
    <img :src="img" :style="{'height':height+'px','width':width+'px'}" />
    <slot name="describe" class="describe" >
    </slot>
<!--    <img :src="src" :style="{'height':height+'px','width':width+'px'}" />-->
  </div>
</template>
<script>
export default {
  name: "empty.vue",

  props:{
    width:{
      type:Number,
      default:80,
    },
    height:{
      type:Number,
      default: 100
    },

    image:{
      type:String,
      default: 'normal',
    }

  },
  data:{
    img:''

  },mounted() {

    switch (this.image) {
      case 'error':
        this.img = require("../assets/empty-folder.png");
        break;
      case 'network':
        this.img = require("../assets/empty-folder.png");
        break;
      case 'normal':
        this.img = require("../assets/empty-folder.png") ;
        break;
      default:
        this.img = this.image;

    }

    console.log("aaa",this.img)

  }
}
</script>

<style scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 10px 10px;
  font-size: 14px;
  color: #9f9f9f ;
}
.empty img{
  width: 80px;
  height: 150px;
  padding: 10px;
}



</style>
