<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/**设置总体高度，缺一不可**/
html,body,#app {
  height:100%;
  width:100%;
  padding:0;
  margin: 0;
  box-sizing: border-box;
  cursor:default/**鼠标光标为正常，小手为 pointer **/
}

a{
  text-decoration: none; /**去掉下划线**/
  white-space:nowrap; /*禁止自动换行*/
  color: white;
}
</style>
