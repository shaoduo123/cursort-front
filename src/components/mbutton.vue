<template>
  <div class="button" :class="type">
    <i class="iconfont" :class="icon"></i>
    <slot><a href="">{{name}}</a></slot>
  </div>
</template>

<script>
export default {
  name: "mbutton",
  props:{
    icon:String,
    type:{
      type:String,
      default:"Default"
    }
  },created() {
    //console.log(this.icon,this.type)
  }
}
</script>

<style scoped>
.button{
  height: 40px;
  align-items: center;
  display: flex;
  border: 1px #d8d8d8 solid ;
  margin-left: 10px;
  background-color: #19bcaa;
  color: #ffffff;
  padding:0 10px 0 10px;
  white-space:nowrap; /*禁止自动换行*/
  cursor:default/**鼠标光标为正常，小手为 pointer **/
}

.button:hover{
  opacity:80%;
}

.default{
  background-color: #19bcaa;
}

.light{
  color: #5a5a5a!important;
  background: #ffffff !important;
}

.danger{
  background: #df5000 !important;
}

.primary{
  background-color: #19bcaa!important;
}




</style>
