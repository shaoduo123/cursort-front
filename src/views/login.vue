<template>
  <div class="container">
    <div class="header-wrap">
      <div class="header-logo">
        <img src="../assets/logo.png">
      </div>
      <div class="header-menu">
        <a href="#">关于我们</a>
        <a href="#">使用助手</a>
        <a href="#">官方微博</a>
        <a href="#">问题反馈</a>
        <a href="#" class="a-vip">会员中心</a>
      </div>
    </div>
    <div class="content-wrap">
      <div class="content-show">
        <img class="banner" src="../assets/bg3.jpg" />
        <div class="banner-describe">
          <p><img src="../assets/leftquote.png"> 在线预览</p>
          <p>文件即开即看 <img src="../assets/rightquote.png"></p>
        </div>
      </div>
      <mlogin class="content-login"></mlogin>

    </div>
  </div>
</template>
<script>
import Mlogin from "../components/login/mlogin";
export default {
  components: {Mlogin}
}
</script>
<style scoped>
.container{
  display: flex; /*使用柔性布局*/
  width: 100%;
  height: 100%;
  flex-direction: column;
  /*background-color: green;*/
}

.header-wrap{
  /*background-color: red;*/
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0 20px 0 20px;
}

.header-wrap .header-logo{
  display: flex;
  flex: 1;
  padding: 10px 10px 10px 10px;
}

.header-wrap .header-menu{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
.header-wrap .header-menu a{
  display: flex;
  flex: 1;
  padding: 0 10px 0 10px;
}

.content-wrap{
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  /*background-color: green;*/
}
.content-wrap .content-show{
  display: flex;
  flex: 3;
  /*border: 1px solid red ;*/
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.content-wrap .content-show .banner{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
}


.banner-describe{
  font-size: 30px;
  color: white;
}

.content-login{
  display: flex;
  flex: 2;
  /*border: 1px solid red ;*/
  align-items: center;
  justify-content: center;
}

.a-vip{
  border-radius: 20px;
  background: linear-gradient(-139deg, rgb(240, 215, 163) 0px, rgb(239, 203, 133) 100%) rgb(240, 215, 163);
  padding: 4px 10px;
  color: rgb(51, 51, 51);
}


</style>
