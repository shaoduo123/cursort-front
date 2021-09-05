<template>
  <div class="download-code">
    <img src="../assets/code.png" />
    <span>下载app</span>
  </div>
</template>

<script>
export default {
  name: "mcode"
}
</script>

<style scoped>

/**二维码**/
.download-code{
  display: flex;
  flex-direction: column; /**此时主轴是纵向**/
  align-items: center; /**交叉轴水平方向 居中**/
  flex:1;
}
img{
  width: 100px;
  height: 100px;
  padding: 10px 0 10px 0;
}

</style>
