<!--登录，注册框-->
<template>
  <div class="content">
    <div class="login-by-pass"  v-if="showType=='0'">
      <div class="content-login">
        <div class="login-wrap">
          <div class="login-code">
            <div class="login-code-ic" @click="changeType(2)">
            </div>
          </div>
          <div class="login-top">
            <h3>账号密码登录</h3>
            <span @click="changeType(1)" >短信快捷登录></span>
          </div>
          <div class="login-middle">
            <input class="username" type="text" v-model="phone" placeholder="手机号/用户名"/>
            <input class="password" type="password" v-model="password" placeholder="密码"/>
            <a class="button line-space " href="#" @click="doLogin()">登录</a>
            <a class="forget-password" href="#">11</a>
          </div>
          <div class="login-footer">
            <a href="#" @click="changeType(2)" >忘记密码？</a>
            <a class="to-register" @click="changeType(3)">立即注册</a>
          </div>
        </div>
      </div>
    </div>
    <div class="login-by-phone"  v-if="showType=='1'">
      <div class="content-login">
        <div class="login-wrap">
          <div class="login-code">
            <div class="login-code-ic" @click="changeType(2)">
            </div>
          </div>
          <div class="login-top">
            <h3>手机号登录</h3>
            <span @click="changeType(0)">用户密码登录 ></span>
          </div>
          <div class="login-middle">
            <input class="username" type="text" placeholder="手机号" v-model="phone"/>
            <div class="msg-code">
              <input class="code"  type="text" placeholder="验证码"/>
              <a class="button" :class="{'msg-disable':msgDisable}" href="#" @click="sendMsg()">{{sendMsgText}}</a>
            </div>
            <a class="button line-space" href="#">登录</a>
            <a class="forget-password" href="#">忘记密码？</a>
          </div>
          <div class="login-footer">
            <a href="#" @click="changeType(2)" >扫一扫登录</a>
            <a class="to-register" @click="showType = 3 ">立即注册</a>
          </div>
        </div>
      </div>
    </div>
    <div class="login-by-code login-wrap" v-if="showType=='2'">
      <div class="login-code" >
        <div class="login-pc-ic" @click="changeType(0)">
        </div>
      </div>
      <div class="login-top">
        <h3>扫码登录</h3>
      </div>
      <div class="login-middle center">
        <img src="src/assets/code.png">
        <span>使用移动客户端扫码认证登录</span>
      </div>
      <div class="login-footer">
        <a href="#" @click="changeType(1)">密码登录</a>
        <a class="to-register" @click="changeType(3)">注册</a>
      </div>
    </div>
    <div class="register" @click="changeType(3)" v-if="showType=='3'">
      <div class="content-login">
        <div class="login-wrap">
          <div class="login-code">
            <div class="login-code-ic" @click="changeType(2)">
            </div>
          </div>
          <div class="login-top">
            <h3>用户注册</h3>
            <span @click="changeType(0)">密码登录></span>
          </div>
          <div class="login-middle">
            <input class="username" type="text" placeholder="手机号"/>
            <input class="password" type="password" placeholder="请设置您的密码"/>
            <div class="msg-code">
              <input class="code" type="text" placeholder="验证码"/>
              <a class="button  " href="#">发送验证码</a>
              </div>
            <a class="button line-space" href="#">立即注册</a>
          </div>
          <div class="login-footer">
            <a href="#">忘记密码？</a>
            <a class="to-register" @click="changeType(2)">已有密码，即刻登录</a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import store from './store';
export default {
  name:'mlogin',
  store,
  data(){
    return{
      showType:0,
      msgOverTime:10,
      msgTimerCount:0,
      sendMsgText:'发送验证码',
      msgDisable:false,
      phone:'',
      password:'',
    }
  },methods:{
    changeType(type){
      this.showType = type;
    },
    sendMsg(){
      if(this.msgTimerCount==0){
        //this.$store.dispatch("") ;
        if(!this.checkPhoneNumber(this.phone)){
          return false;
        }
        var _this = this;
        var timer = setInterval(function (){
          _this.msgTimerCount =_this.msgTimerCount+1 ;
          _this.sendMsgText = '重新发送('+(_this.msgOverTime-_this.msgTimerCount)+')';
          _this.msgDisable=true;
          console.log(_this.msgTimerCount);
          if(_this.msgTimerCount==_this.msgOverTime){
            _this.msgTimerCount = 0 ;
            _this.msgDisable = false;
            _this.sendMsgText='重新发送';
            clearInterval(timer);
          }
        },1000);
      }else{
        this.$layer.msg('请在'+this.msgOverTime+'秒后重试', {icon: 2});
      }
    },checkPhoneNumber(phone){
      var mobile_mode=/^1[34578]\d{9}$/;
      if(phone.length==0){
        this.$layer.msg('手机号不能为空', {icon: 0});
        return false;
      }
      if(!mobile_mode.test(phone)){
        this.$layer.msg('手机号格式错误', {icon: 0});
        return false;
      }
      return true;
    },doLogin(){
        let loginVo ={
          phone : this.phone,
          password: this.password,
        }
        this.$store.dispatch('login',{'loginVo':loginVo});
    }
  }
}
</script>
<style>

.line-space{
  margin-top: 30px;
}
.center{
  align-items: center;
}

.login-wrap{
  width: 340px;
  margin-left: -100px;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 50px;

}

.login-code{
  display: flex;
  height: 10px;
  justify-content: flex-end;
}
.login-wrap .login-code-ic{
  width: 45px;
  height: 45px;
  margin-right: 0;
  background:#ffffff url("../../assets/login-code-ic.png");
  background-size: contain;
  cursor: pointer;
}

 .login-wrap .login-top{
  padding: 10px 20px 10px 20px;
  /*background-color: red;*/
  display: flex;
  flex-direction: row;
  align-items: center;
}

 .login-wrap .login-top h3{

}
 .login-wrap .login-top span{
  font-size: 15px;
  flex:1;
}

 .login-wrap .login-middle{
  padding: 10px 20px 20px 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
  /*background-color: green;*/
}

 .login-wrap .login-middle input{
  height: 26px;
  padding: 7px 10px;
  margin-top: 10px;
  border: 1px solid #d2d2d2 ;
}

.login-middle input:focus{
  outline: 1px solid #d8d8d8 ;
}

 .button{
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #19bcaa;
}

.button:hover{
  opacity: 80%;
}

.forget-password {
  margin-top: 20px;
  font-size: 14px;
}

.login-footer {
  background-color: #61c8c2;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 14px;
  padding: 0 20px 0 20px;
}

.login-footer a:nth-child(1) {
  display: flex;
  flex:1;
}

/**注册**/
.msg-code{
  display: flex;
  align-items: center;
}

.msg-disable{
  background-color: #ffffff ;
  border:1px solid #d2d2d2;
  color: #d2d2d2;
  pointer-events:none;
}


.msg-code input{
  flex: 2;
}
.msg-code a{
  flex: 1;
  margin-top: 10px;
  font-size: 12px;
  margin-left: 10px;
}

/**通过二维码登录**/
.login-by-code {
  font-size: 14px;
}

.login-by-code img{
  width: 180px;
  height: 180px;
}

.login-pc-ic{
  width: 45px;
  height: 45px;
  margin-right: 0;
  background:#ffffff url("../../assets/login-pc-ic.png");
  background-size: contain;
  cursor: pointer;
}

</style>
