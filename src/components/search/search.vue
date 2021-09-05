<template>

    <div class="search-warp">
      <input type="text" class="search-wrap-input" placeholder="搜索内容" />
      <a href="#" class="search-wrap-button" >
        <img src="../../assets/search.png">
      </a>
<!-- <span> 拿出本vue的store{{this.$store.state.test}}</span>-->
<!--  调用全局的store，可以拿出兄弟组件 <span>{{global.state.file.testStr}}</span>   -->
<!--      <span>{{ global.state.file.testStr }}</span>-->
  </div>
</template>

<script>
import store from './store'
import global from '../../store/store'
import brother from '../file/store/options'
export default {
  name: "search",
  props:{
    keyword:String,
  },
  mounted() {
    // console.log("global",global)
    // console.log("self-store",this.$store.state.test)
    // console.log("global-store1",global.state.file.testStr)
    // console.log("brother-store",brother.state.testStr)
    // console.log("search-commit",this.$store);
    //console.log("aaaaaaa",this.$store);
    console.log("search-store",this.$store);
    //this.$store.commit('setTest',{test:"searchaaa"})
  },
  methods:{
  doSearch(){

  }
},store,global,brother
}
</script>

<style scoped>

.search-warp{
  margin-top:10px;
  display: flex; /*使用柔性布局*/
  justify-content: center;  /*在主轴上居中，主轴默认是水平方向*/
  flex-wrap:nowrap; /*不允许换行言外，之意就是一行*/

}
.search-wrap-input{
  width: 135px;
  height: 30px;
  padding-left:20px;
  border: none;
  box-sizing: border-box; /*解决宽高 不准确的问题*/
  background-color: #eeeeee;
  outline:none; /*取消点击焦点框*/
}

.search-wrap-input:focus
{
  outline: 1px solid #d8d8d8 ;
  background-color: #fbfbfb;
}
/**点击input 后边的div边框联动，的写法
这个就是css选择器的使用情况了，假设悬浮元素是a，样式改变元素是b,俩个元素之间的关系就是b是a的子元素就可以使用 a:hover>b{…}。
还有就是b刚好是a的同级元素并且是紧接着的，就可以a:hover+b{…}
还有就是b这一类的元素都是a的同级元素并且是a元素之后的就可以a:hover~b{…}还有就自己去看吧。
**/
.search-wrap-input:focus +.search-wrap-button
{
  outline: 1px solid #d8d8d8 ;
  background-color: #fbfbfb;
}
.search-wrap-button{
  width: 30px;
  height: 30px;
  background-color: #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
  outline:none; /*取消点击焦点框*/
}

.search-wrap-button img{
  width: 16px;
  height: 16px;

}
</style>
