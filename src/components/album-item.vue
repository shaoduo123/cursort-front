<template>
  <div class="album-item">
  <div v-if="file.type=='FOLDER'" class="album-item">
    <div class="album-item-bg" style="background-image: url('../assets/ablum-bg.png');">
      <div class="album-item-cover-wrap">
        <img src="../assets/default-cover.png" class="cover">
      </div>
    </div>
  </div>
  <div v-else class="photo-item">
    <div class="photo-item-img">
      <img :src="file.preUrl">
    </div>
    <div class="photo-item-option">
      <span>操作</span>
      <span>删除</span>
    </div>
  </div>
    </div>
</template>

<script>
export default {
  name: "album-item",
  props:{
    file:{},
  }
}
</script>

<style scoped>
.album-item {
  width: 110px;
  height: 110px;
  padding: 10px;
}
.album-item:hover{
  border-radius: 5px;
  background-color: ;
}

.album-item-bg{

  width: 85px;
  height: 82px;
  background-repeat:no-repeat;
  background-size:100% 100%;
  -moz-background-size:100% 100%;

  margin-left: 20px;
}

.album-item-cover-wrap {
  width: 80px;
  height: 80px;
  background: #e7e7e7;;
  margin-left: -20px;
  border-radius: 10px;
}

.cover{
  width: 60px;
  height: 60px;
  background-image: url("../assets/default-cover.png") ;
  background-repeat:no-repeat;
  background-size:100% 100%;
  -moz-background-size:100% 100%;
}


.album-item-cover-wrap:hover{
  box-shadow: 0 8px 22px 0 rgb(0 0 0 / 20%);
}

.photo-item{
  width: 80px;
  height: 80px;
  padding: 10px;
}


.photo-item-img{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.photo-item-img img{
  width: 100%;
  bject-fit: cover;
}

.photo-item-option{
  width: 100%;
  margin-top: -160px;
  display: flex;
  justify-content:space-between;
  box-sizing: border-box;
  padding: 10px;
  visibility: hidden;

}
.photo-item-option span:nth-child(1){
  border-radius: 4px;
  background-color: #d2d2d2;
  font-size: 12px;
  padding: 2px 5px;
}

.photo-item-option span:nth-child(2){
  border-radius: 4px;
  background-color: red;
  font-size: 12px;
  padding: 2px 5px;
  color: white;
}

.photo-item-img:hover {
  box-shadow: 0 8px 22px 0 rgb(0 0 0 / 20%);
  border-radius: 25px;
}

.photo-item-img:hover +.photo-item-option{
  visibility: visible;
}
</style>
