<template>
  <div class="nav">
    <div v-if="floder.name != '/'">
      <span @click="onBack ">返回上一级</span>
      <i class="nav-separator">|</i>
    </div>

    <template v-for="(item,i) in floderList">
      <span v-if="item.name == '/' || item.faterId == ''" @click="onBackRoot">全部</span>
      <div  v-else>
      <i class="nav-separator" >></i>
      <span  @click="onNavSelect(item)">{{ item.name }}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "floder-nav",
  props:{
    floder:{},
  },
  data(){
    return{
      floderList:[],
    }
  },methods:{
    onBack(){
      this.$emit('back',this.floderList[this.floderList.length-2]); //为什么要-2 因为当前是length-1 上一个就是-2
      if(this.floderList.length>1){
        this.floderList.pop() ;
        this.floderList.pop() ;
      }
    },
    onNavSelect(item){
      this.$emit('navSelect',item);
      // this.floderList.forEach((item)=> {
      //   if(item.id == this.floder.id){
      //     return false;
      //   }
      // });
      for(var i = this.floderList.length-1;i>=0;i--){
         if(this.floderList[i].id!=item.id){
            this.floderList.pop() ;
         }
      }
    },
    onBackRoot(){
      this.$emit('backRoot',this.floderList[0]);
      //全部pop掉
      if(this.floderList.length==1){
        return false;
      }

      for(var i = this.floderList.length-1;i>=0;i--){
          this.floderList.pop() ;
      }
    }
  },computed:{

  },watch:{
    // floderList(newVal,oldVal){
    //   console.log("floder-nav-watch-floderList",newVal);
    // }
    floder(val){
      this.floderList.forEach((item)=> {
        if(item.id == this.floder.id){
          return false;
        }
      });
      this.floderList.push(this.floder) ;
    }
  }
}
</script>

<style scoped>

.nav{
  font-size: 14px;
  width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
}
.nav span {
  padding: 0 3px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  max-width: 100px;
  cursor:pointer;
  transition: border-color .3s,background-color .3s,color .3s;
}

.nav span:hover{
  background-color: #f2f6fd;
  border-radius: 5px;

}

.nav-separator{
  color: #cccccc;
  cursor:default !important;
  padding: 0 3px;
  font-style: normal;
}



</style>
