<template>
  <div class="m">

    <a href="JavaScript:;" class="item" @click="goto('file')">
      <i class="iconfont icon-tupian icon-style" ></i>
      <span>最近图片</span>
    </a>
    <a href="JavaScript:;" class="item" >
      <i class="iconfont icon-wenjianjia icon-style" ></i>
      <span>我的相册</span>
    </a>
    <a href="JavaScript:;" class="item" >
      <i class="iconfont icon-gongjuxiang icon-style" ></i>
      <span>工具箱</span>
    </a>
    <a href="JavaScript:;" class="item" @click="goto('recycle')">
      <i class="iconfont icon-shanchu icon-style"></i>
      <span>回收站</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "mymenu",
  methods: {
    goto(val) {
      console.log(val)
      debugger
      this.$router.push({
        name: val
      });
    }
  }
}
</script>

<style scoped>
.item{
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  color: #5a5a5a;
  hidefoucs:true;
  outline:0;
  font-size: 14px;
  border-left:5px solid transparent;
}
.item:hover{
  background-color: #19bcaa;
}
/**点击item**/
.item:focus {
  border-left:5px solid #19bcaa;
  background: #e8f8f7;
  color: #19bcaa;
}

.item i{
  margin-left: 30px;
}
.item span{
  margin-left: 15px;
}

.icon-style{
  font-size: 20px;
}

</style>
