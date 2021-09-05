<template>
  <div class="progress">
    <!-- 进度条 -->
    <div class="progress-container">
      <div class="progress-box">
        <div class="progress-bar" style="width: 20%;"></div>
      </div>
      <div class="progressbar-text">20%</div>
    </div>
    <span>已用3.12MB/512MB</span>
  </div>
</template>

<script>
export default {
  name: "mprogress"
}
</script>

<style scoped>
.progress{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex:1;
}
/** 进度条**/
.progress-container {
  display:table;
  position:relative;
  width: 80%;
}
.progress-container .progress-box,.progress-container .progressbar-text {
  display:table-cell;
  vertical-align:middle;
}
.progress-container .progress-box {
  width:100%;
  height:5px;
  position:relative;
}
.progress-container .progress-box .progress-bar {
  height:inherit;
  background-color:#19bcaa;
}
.progress-container .progress-box .progress-bar:after {
  content:" ";
  z-index:-1;
  width:100%;
  height:inherit;
  left:0;
  position:absolute;
  background-color: #d2d2d2;
}
.progress-container .progress-box .progress-bar,.progress-container .progress-box .progress-bar:after {
  -webkit-border-radius:50%;
  -moz-border-radius:999rem;
  border-radius:999rem;
}
.progress-container .progressbar-text {
  color:#475669;
  padding-left:10px;
  font-size: 12px;
}

/**
    **二维码结束**
 */
</style>
